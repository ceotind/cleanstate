"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Check } from 'lucide-react'
import { sanitizeUrls } from '@/lib/utils'

export default function LinkCleaner() {
  const [inputUrls, setInputUrls] = useState('')
  const [cleanedUrls, setCleanedUrls] = useState('')
  const [copied, setCopied] = useState(false)

  const handleClean = () => {
    const cleaned = sanitizeUrls(inputUrls)
    setCleanedUrls(cleaned)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanedUrls)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">What does this do?</h3>
        <p className="text-sm text-blue-800 mb-2">
          Removes tracking parameters from URLs to protect your privacy. These parameters allow companies to track your browsing behavior and build profiles about you.
        </p>
        <p className="text-xs text-blue-700">
          <strong>Removed parameters:</strong> utm_source, utm_medium, utm_campaign, utm_term, utm_content, fbclid, gclid, ttclid, irclickid, wickedid, yxclid
        </p>
      </div>

      <div>
        <label htmlFor="input-urls" className="block text-sm font-medium mb-2">
          Paste your dirty URLs here (one per line)
        </label>
        <Textarea
          id="input-urls"
          placeholder="https://example.com?utm_source=newsletter&utm_medium=email&#10;https://another.com?fbclid=123&gclid=456"
          value={inputUrls}
          onChange={(e) => setInputUrls(e.target.value)}
          rows={8}
          className="font-mono text-sm"
        />
        <Button onClick={handleClean} className="mt-4" disabled={!inputUrls.trim()}>
          Clean URLs
        </Button>
      </div>

      {cleanedUrls && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="cleaned-urls" className="block text-sm font-medium">
              Cleaned URLs
            </label>
            <Button onClick={handleCopy} size="sm" variant="outline">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <Textarea
            id="cleaned-urls"
            value={cleanedUrls}
            readOnly
            rows={8}
            className="font-mono text-sm bg-gray-50"
          />
        </div>
      )}
    </div>
  )
}