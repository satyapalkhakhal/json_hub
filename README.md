# JSON Formatter & Validator Tool

A modern, feature-rich JSON formatter and validator tool built with React, TailwindCSS, and Vite. This tool provides all the essential features for working with JSON data, similar to jsonformatter.org but with a modern UI.

## Features

### Core Features
- ✅ **JSON Formatter/Beautifier** - Format JSON with customizable indentation (2, 3, or 4 spaces)
- ✅ **JSON Validator** - Validate JSON syntax with detailed error messages
- ✅ **JSON Fixer** - Automatically fix common JSON errors (missing quotes, trailing commas, etc.)
- ✅ **Tree View** - Navigate JSON data in an interactive, collapsible tree structure
- ✅ **Auto-Update Mode** - Toggle automatic formatting as you type

### Conversion Tools
- 🔄 **JSON to XML** - Convert JSON data to XML format
- 🔄 **JSON to CSV** - Convert JSON arrays/objects to CSV
- 🔄 **JSON to YAML** - Convert JSON to YAML format

### File Operations
- 📁 **File Upload** - Upload JSON files for formatting
- 💾 **Download** - Download formatted JSON or converted data
- 📋 **Copy to Clipboard** - Quick copy functionality
- 🔗 **Load from URL** - Fetch and format JSON from any URL

### Additional Features
- 💾 **Local Storage** - Auto-save your work in browser
- 🎨 **Modern UI** - Clean, responsive design with TailwindCSS
- 🖼️ **Image Preview** - Display images when URLs are detected in tree view
- 🔍 **Syntax Highlighting** - Color-coded JSON elements in tree view
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Installation

1. **Clone or navigate to the project directory:**
```bash
cd /home/goqii-satyapal/Desktop/JSON-Tool
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
The application will automatically open at `http://localhost:3000`

## Usage

### Format JSON
1. Paste your JSON data in the left editor
2. Click "Format" or enable "Auto Update" for real-time formatting
3. View the formatted output on the right side

### Validate JSON
1. Enter your JSON data
2. Click "Validate" to check for syntax errors
3. Error messages will appear with detailed information

### Fix JSON
1. Paste malformed JSON
2. Click "Fix" to automatically correct common issues
3. Review the fixed JSON in the editor

### Convert JSON
1. Enter valid JSON data
2. Click one of the conversion buttons:
   - "JSON to XML"
   - "JSON to CSV"
   - "JSON to YAML"
3. The converted data will appear in the output panel

### Tree View
1. Format valid JSON
2. Click "Tree View" tab
3. Expand/collapse nodes to navigate the structure
4. Hover over image URLs to see previews

### Load from URL
1. Enter a URL that returns JSON data
2. Click "Load URL"
3. The JSON will be fetched and formatted automatically

### File Operations
- **Upload**: Click "Upload" and select a JSON file
- **Download**: Click "Download" to save the formatted/converted data
- **Copy**: Click "Copy" to copy output to clipboard

## Keyboard Shortcuts

- `Ctrl/Cmd + V` - Paste JSON
- `Ctrl/Cmd + C` - Copy (when output is selected)
- `Ctrl/Cmd + A` - Select all

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **js-yaml** - YAML parser and serializer
- **xml-js** - XML/JSON converter
- **Prettier** - Code formatter

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
JSON-Tool/
├── src/
│   ├── components/
│   │   └── JsonViewer.jsx      # Tree view component
│   ├── utils/
│   │   ├── jsonUtils.js        # JSON operations
│   │   └── converters.js       # Conversion utilities
│   ├── App.jsx                 # Main application
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── README.md                  # This file
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Inspired by [jsonformatter.org](https://jsonformatter.org/)
- Built with modern web technologies for better performance and user experience
