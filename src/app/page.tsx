"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FileScrubber from '@/components/file-scrubber'
import LinkCleaner from '@/components/link-cleaner'
import logo from './logo.webp'
import { FileText, Link, Eye, Lock, Zap, Shield } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white" style={{ backgroundColor: '#ffffff !important' }}>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <img
              src={logo.src}
              alt="CleanSlate Logo"
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            CleanSlate
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Local-first privacy tool that removes metadata from files and tracking parameters from URLs.
            <span className="font-semibold text-slate-900"> No data leaves your device.</span>
          </p>
        </div>

        {/* Main Tool Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-16">
          <Tabs defaultValue="files" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="files" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Files (PDF/Img/Video)
              </TabsTrigger>
              <TabsTrigger value="links" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Links (URL)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="mt-6">
              <FileScrubber />
            </TabsContent>

            <TabsContent value="links" className="mt-6">
              <LinkCleaner />
            </TabsContent>
          </Tabs>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Upload Files</h3>
              <p className="text-slate-600">
                Drag and drop PDF, images, or video files. All processing happens locally in your browser.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Clean Metadata</h3>
              <p className="text-slate-600">
                Automatically removes embedded metadata, Exif data, video metadata, and tracking parameters instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Download Clean</h3>
              <p className="text-slate-600">
                Download your cleaned files. View exactly what was removed for complete transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Privacy First
          </h2>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-slate-900">Zero Data Transmission</h3>
                  <p className="text-slate-600">
                    Files never leave your device. All processing is done client-side using Web APIs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Eye className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-slate-900">Complete Transparency</h3>
                  <p className="text-slate-600">
                    See exactly what metadata and tracking data was removed from your files and URLs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-slate-900">Open Source</h3>
                  <p className="text-slate-600">
                    Built with modern web technologies. No hidden processes or external dependencies.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-slate-900">Secure by Design</h3>
                  <p className="text-slate-600">
                    Files are processed in memory and automatically cleaned up. No persistent storage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8 text-slate-900">
            Supported Formats
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
              <span className="font-medium text-slate-900">PDF</span>
              <span className="text-sm text-slate-500 ml-2">Metadata removal</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
              <span className="font-medium text-slate-900">JPEG</span>
              <span className="text-sm text-slate-500 ml-2">Exif data removal</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
              <span className="font-medium text-slate-900">PNG</span>
              <span className="text-sm text-slate-500 ml-2">Pass-through</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
              <span className="font-medium text-slate-900">MP4/MOV/M4V</span>
              <span className="text-sm text-slate-500 ml-2">Video metadata extraction</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
              <span className="font-medium text-slate-900">URLs</span>
              <span className="text-sm text-slate-500 ml-2">Tracking parameter removal</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
