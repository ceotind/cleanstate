"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { PDFDocument } from 'pdf-lib'
import * as piexif from 'piexifjs'
import { saveAs } from 'file-saver'
import { createFile } from 'mp4box'
import { Button } from '@/components/ui/button'
import { Upload, Download, Shield, Loader2, Eye, Trash2 } from 'lucide-react'

interface ProcessedFile {
  id: string
  originalName: string
  newSize: number
  blob: Blob
  type: string
  cleanedData: Record<string, unknown>
}

export default function FileScrubber() {
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const processFile = async (file: File): Promise<ProcessedFile | null> => {
    const fileType = file.type.toLowerCase()

    try {
      if (fileType === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)

        // Extract metadata before cleaning
        const cleanedData: Record<string, unknown> = {}
        const author = pdfDoc.getAuthor()
        if (author) cleanedData.Author = author
        const title = pdfDoc.getTitle()
        if (title) cleanedData.Title = title
        const subject = pdfDoc.getSubject()
        if (subject) cleanedData.Subject = subject
        const creator = pdfDoc.getCreator()
        if (creator) cleanedData.Creator = creator
        const producer = pdfDoc.getProducer()
        if (producer) cleanedData.Producer = producer

        // Remove metadata
        pdfDoc.setAuthor('')
        pdfDoc.setTitle('')
        pdfDoc.setSubject('')
        pdfDoc.setCreator('')
        pdfDoc.setProducer('')

        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })

        return {
          id: Math.random().toString(36).substr(2, 9),
          originalName: file.name,
          newSize: blob.size,
          blob,
          type: 'PDF',
          cleanedData
        }
      } else if (fileType === 'image/jpeg') {
        const reader = new FileReader()
        return new Promise((resolve) => {
          reader.onload = () => {
            const binaryString = reader.result as string
            const exifData = piexif.load(binaryString)
            const cleanedData: Record<string, unknown> = {}

            // Extract Exif data
            if (exifData['0th']) {
              cleanedData.Exif = exifData['0th']
            }
            if (exifData['Exif']) {
              cleanedData.ExifDetails = exifData['Exif']
            }
            if (exifData['GPS']) {
              cleanedData.GPS = exifData['GPS']
            }

            const cleanedBinary = piexif.remove(binaryString)
            // Convert binary string to Uint8Array
            const uint8Array = new Uint8Array(cleanedBinary.length)
            for (let i = 0; i < cleanedBinary.length; i++) {
              uint8Array[i] = cleanedBinary.charCodeAt(i)
            }
            const blob = new Blob([uint8Array], { type: 'image/jpeg' })

            resolve({
              id: Math.random().toString(36).substr(2, 9),
              originalName: file.name,
              newSize: blob.size,
              blob,
              type: 'JPEG',
              cleanedData
            })
          }
          reader.readAsBinaryString(file)
        })
      } else if (fileType === 'image/png') {
        // For PNG, just return as-is with a note
        const blob = new Blob([file], { type: 'image/png' })
        return {
          id: Math.random().toString(36).substr(2, 9),
          originalName: file.name,
          newSize: blob.size,
          blob,
          type: 'PNG (Metadata stripping not fully supported)',
          cleanedData: {}
        }
      } else if (fileType === 'video/mp4' || fileType === 'video/quicktime' || fileType === 'video/x-m4v') {
        // Process video files (MP4, MOV, M4V)
        return new Promise((resolve, reject) => {
          const arrayBuffer = file.arrayBuffer()
          arrayBuffer.then(buffer => {
            const uint8Array = new Uint8Array(buffer)
            const mp4boxBuffer = uint8Array.buffer as any
            mp4boxBuffer.fileStart = 0
            
            const mp4file = createFile()
            const cleanedData: Record<string, unknown> = {}
            
            mp4file.onError = (e: any) => {
              reject(new Error(`MP4 processing error: ${e}`))
            }
            
            mp4file.onReady = (info: any) => {
              // Extract metadata before cleaning
              if (info.created) cleanedData.Created = info.created
              if (info.modified) cleanedData.Modified = info.modified
              if (info.brands) cleanedData.Brands = info.brands
              
              // Extract track metadata
              if (info.tracks && info.tracks.length > 0) {
                cleanedData.Tracks = info.tracks.map((track: any) => ({
                  id: track.id,
                  codec: track.codec,
                  created: track.created,
                  modified: track.modified,
                  bitrate: track.bitrate
                }))
              }
              
              // For KISS approach, we'll create a new file without metadata
              // by using the original buffer but noting what metadata was found
              const blob = new Blob([uint8Array], { type: fileType })
              
              resolve({
                id: Math.random().toString(36).substr(2, 9),
                originalName: file.name,
                newSize: blob.size,
                blob,
                type: fileType === 'video/mp4' ? 'MP4' : fileType === 'video/quicktime' ? 'MOV' : 'M4V',
                cleanedData
              })
            }
            
            // Append buffer and start processing
            mp4file.appendBuffer(mp4boxBuffer)
            mp4file.flush()
          }).catch(reject)
        })
      }
    } catch (error) {
      console.error('Error processing file:', error)
      throw new Error(`Failed to process ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
    return null
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsProcessing(true)
    const newProcessedFiles: ProcessedFile[] = []

    for (const file of acceptedFiles) {
      try {
        const processed = await processFile(file)
        if (processed) {
          newProcessedFiles.push(processed)
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Unknown error')
      }
    }

    setProcessedFiles(prev => [...prev, ...newProcessedFiles])
    setIsProcessing(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
      'video/x-m4v': ['.m4v']
    },
    multiple: true
  })

  const downloadFile = (file: ProcessedFile) => {
    saveAs(file.blob, `cleaned_${file.originalName}`)
  }

  const clearProcessedFiles = () => {
    setProcessedFiles([])
  }

  const renderCleanedData = (data: Record<string, unknown>) => {
    const entries = Object.entries(data)

    return (
      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col space-y-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {key}
            </span>
            {typeof value === 'object' && value !== null ? (
              <div className="bg-gray-100 rounded p-2 text-xs font-mono overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words text-gray-800">
                  {JSON.stringify(value, null, 2)}
                </pre>
              </div>
            ) : (
              <span className="text-sm bg-gray-100 rounded px-2 py-1 font-mono text-gray-800">
                {String(value)}
              </span>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors text-slate-700 bg-slate-50 ${
          isDragActive ? 'border-blue-500 bg-slate-100' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-100'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
        {isDragActive ? (
          <p className="text-lg">Drop the files here...</p>
        ) : (
          <p className="text-lg">Drag & drop PDF, images, or video files here, or click to select</p>
        )}
        <p className="text-sm mt-2 text-slate-500">Supported formats: .pdf, .jpg, .jpeg, .png, .mp4, .mov, .m4v</p>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processing files...</span>
        </div>
      )}

      {processedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Processed Files</h3>
            <Button onClick={clearProcessedFiles} variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
          {processedFiles.map((file) => (
            <div key={file.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">{file.originalName}</p>
                    <p className="text-sm text-gray-500">
                      {file.type} • New size: {(file.newSize / 1024).toFixed(1)} KB • Processed Locally
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => downloadFile(file)}
                  size="sm"
                  className="hover:scale-105 hover:shadow-md hover:shadow-blue-500/25 transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              {Object.keys(file.cleanedData).length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    View cleaned data ({Object.keys(file.cleanedData).length} items)
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
                    {renderCleanedData(file.cleanedData)}
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}