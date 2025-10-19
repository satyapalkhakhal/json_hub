/**
 * Format JSON with specified indentation
 */
export function formatJSON(text, spaces = 2) {
  if (!text || !text.trim()) {
    return { formatted: '', error: null }
  }

  try {
    const parsed = JSON.parse(text)
    const formatted = JSON.stringify(parsed, null, spaces)
    return { formatted, error: null }
  } catch (error) {
    return { 
      formatted: '', 
      error: `JSON Parse Error: ${error.message}` 
    }
  }
}

/**
 * Validate JSON and return detailed error information
 */
export function validateJSON(text) {
  if (!text || !text.trim()) {
    return { isValid: false, error: 'Empty input' }
  }

  try {
    JSON.parse(text)
    return { isValid: true, error: null }
  } catch (error) {
    // Extract line number from error message if available
    const lineMatch = error.message.match(/position (\d+)/)
    const position = lineMatch ? parseInt(lineMatch[1]) : null
    
    return { 
      isValid: false, 
      error: error.message,
      position 
    }
  }
}

/**
 * Attempt to fix common JSON errors
 */
export function fixJSON(text) {
  if (!text || !text.trim()) {
    return text
  }

  let fixed = text.trim()

  // Fix unquoted keys
  fixed = fixed.replace(/(\{|,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')

  // Fix single quotes to double quotes
  fixed = fixed.replace(/'/g, '"')

  // Fix trailing commas in objects
  fixed = fixed.replace(/,(\s*[}\]])/g, '$1')

  // Remove comments (single line and multi-line)
  fixed = fixed.replace(/\/\/.*$/gm, '')
  fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '')

  // Try to add missing closing brackets
  const openBraces = (fixed.match(/\{/g) || []).length
  const closeBraces = (fixed.match(/\}/g) || []).length
  const openBrackets = (fixed.match(/\[/g) || []).length
  const closeBrackets = (fixed.match(/\]/g) || []).length

  if (openBraces > closeBraces) {
    fixed += '}'.repeat(openBraces - closeBraces)
  }
  if (openBrackets > closeBrackets) {
    fixed += ']'.repeat(openBrackets - closeBrackets)
  }

  return fixed
}

/**
 * Minify JSON (remove all whitespace)
 */
export function minifyJSON(text) {
  try {
    const parsed = JSON.parse(text)
    return JSON.stringify(parsed)
  } catch (error) {
    throw new Error(`Cannot minify invalid JSON: ${error.message}`)
  }
}

/**
 * Escape JSON string
 */
export function escapeJSON(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

/**
 * Unescape JSON string
 */
export function unescapeJSON(text) {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
}
