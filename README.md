<div align="center">

# 🛡️ CleanSlate

**Local-First Privacy Tool – Remove Metadata & Tracking Parameters**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Local-green)](https://github.com)

**Remove metadata from files and tracking parameters from URLs. No data leaves your device.**

[Live Demo](#) • [Features](#features) • [Installation](#installation) • [Usage](#usage)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Why CleanSlate?](#why-cleanslate)
- [Supported Formats](#supported-formats)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

**CleanSlate** is a powerful, open-source privacy tool designed to protect your digital footprint by removing sensitive metadata from files and tracking parameters from URLs. Built with a **local-first architecture**, all processing happens entirely in your browser – **zero data transmission**, **zero cloud storage**, **complete privacy**.

### Key Privacy Benefits

- ✅ **Zero Data Transmission** – Files never leave your device
- ✅ **Client-Side Processing** – All operations performed in browser memory
- ✅ **Complete Transparency** – View exactly what data was removed
- ✅ **No Persistent Storage** – Files processed and cleaned up automatically
- ✅ **Open Source** – Fully auditable code, no hidden processes

Perfect for privacy-conscious users, journalists, activists, developers, and anyone who values data security and online privacy.

---

## ✨ Features

### 📁 File Metadata Removal

- **PDF Metadata Scrubbing** – Remove author, title, subject, creator, producer metadata
- **JPEG Exif Data Removal** – Strip GPS coordinates, camera settings, timestamps, and device information
- **PNG Support** – Pass-through processing (metadata stripping limited by format)
- **Video Metadata Extraction** – Extract and display metadata from MP4, MOV, M4V files
- **Batch Processing** – Handle multiple files simultaneously
- **Transparency Report** – View exactly what metadata was removed from each file

### 🔗 URL Tracking Parameter Removal

- **UTM Parameter Stripping** – Remove utm_source, utm_medium, utm_campaign, utm_term, utm_content
- **Social Media Tracking** – Remove fbclid (Facebook), gclid (Google), ttclid (TikTok)
- **Additional Trackers** – Remove irclickid, wickedid, yxclid and more
- **Batch URL Cleaning** – Process multiple URLs at once
- **One-Click Copy** – Quickly copy cleaned URLs to clipboard

### 🔒 Privacy & Security

- **100% Local Processing** – No server uploads, no cloud dependencies
- **Memory-Only Operations** – No disk persistence, automatic cleanup
- **Real-Time Feedback** – See processing status and results instantly
- **Open Source Code** – Fully auditable and transparent

---

## 🤔 Why CleanSlate?

### The Privacy Problem

Every file you share and every link you click can reveal sensitive information:

- **Photos** contain GPS coordinates, camera models, timestamps, and device fingerprints
- **PDFs** include author names, creation dates, software versions, and editing history
- **Videos** store creation dates, device information, and encoding metadata
- **URLs** contain tracking parameters that build detailed profiles of your online behavior

### The CleanSlate Solution

CleanSlate addresses these privacy concerns by:

1. **Removing Hidden Metadata** – Strip sensitive information from files before sharing
2. **Eliminating URL Tracking** – Clean links to prevent behavioral tracking
3. **Processing Locally** – Keep your data on your device, never transmitted
4. **Providing Transparency** – Show exactly what data was removed

### Use Cases

- 📰 **Journalists** – Protect sources and maintain anonymity
- 👔 **Business Professionals** – Remove metadata from shared documents
- 📸 **Photographers** – Strip location data from images before publishing
- 🔐 **Privacy Advocates** – Maintain digital hygiene and reduce tracking
- 👥 **Social Media Users** – Share clean URLs without tracking parameters
- 🛡️ **Security Conscious** – Prevent information leakage through file metadata

---

## 📦 Supported Formats

| Format | Type | Processing |
|--------|------|------------|
| **PDF** | Document | ✅ Full metadata removal |
| **JPEG/JPG** | Image | ✅ Exif data removal |
| **PNG** | Image | ⚠️ Pass-through (limited support) |
| **MP4** | Video | ✅ Metadata extraction |
| **MOV** | Video | ✅ Metadata extraction |
| **M4V** | Video | ✅ Metadata extraction |
| **URLs** | Links | ✅ Tracking parameter removal |

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/cleanslate.git
cd cleanslate

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development Server

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build
# or
yarn build
# or
pnpm build

# Start production server
npm start
# or
yarn start
# or
pnpm start
```

---

## 💡 Usage

### File Metadata Removal

1. **Upload Files** – Drag and drop or click to select files
2. **Automatic Processing** – Files are processed instantly in your browser
3. **Review Results** – See what metadata was removed from each file
4. **Download Clean Files** – Download your privacy-protected files

### URL Tracking Parameter Removal

1. **Paste URLs** – Enter one or more URLs (one per line)
2. **Click "Clean URLs"** – Tracking parameters are automatically removed
3. **Copy Results** – One-click copy cleaned URLs to clipboard

### Example

**Before:**
```
https://example.com/article?utm_source=newsletter&utm_medium=email&utm_campaign=spring2024&fbclid=abc123
```

**After:**
```
https://example.com/article
```

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) – React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) – Type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) – Accessible component primitives
- **File Processing**:
  - [pdf-lib](https://pdf-lib.js.org/) – PDF manipulation
  - [piexifjs](https://github.com/hMatoba/piexifjs) – Exif data handling
  - [mp4box](https://github.com/gpac/mp4box.js) – Video metadata extraction
- **File Upload**: [react-dropzone](https://react-dropzone.js.org/) – Drag and drop file uploads
- **Icons**: [Lucide React](https://lucide.dev/) – Beautiful icon library

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas for Contribution

- 🆕 Support for additional file formats (DOCX, XLSX, etc.)
- 🔧 Enhanced metadata extraction for video files
- 🎨 UI/UX improvements
- 📝 Documentation enhancements
- 🐛 Bug fixes and performance optimizations
- 🌍 Internationalization (i18n) support

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [pdf-lib](https://pdf-lib.js.org/) – PDF manipulation library
- [piexifjs](https://github.com/hMatoba/piexifjs) – Exif data handling
- [mp4box](https://github.com/gpac/mp4box.js) – Video processing
- [Radix UI](https://www.radix-ui.com/) – UI component library
- [Tailwind CSS](https://tailwindcss.com/) – Styling framework

---

## 🔗 Related Projects

- [Metadata Anonymisation Toolkit (MAT)](https://0xacab.org/liberate/metadata-anonymisation-toolkit) – Command-line metadata removal
- [ExifTool](https://exiftool.org/) – Comprehensive metadata editor
- [Privacy Badger](https://privacybadger.org/) – Browser-based tracker blocking

---

<div align="center">

**Made with ❤️ for Privacy Advocates**

[⬆ Back to Top](#-cleanslate)

</div>