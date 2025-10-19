/**
 * Compare two JSON objects and return differences
 */
export function compareJSON(obj1, obj2, path = '') {
  const differences = []

  // Handle null/undefined cases
  if (obj1 === null && obj2 === null) return differences
  if (obj1 === null) {
    differences.push({ type: 'added', path, value: obj2 })
    return differences
  }
  if (obj2 === null) {
    differences.push({ type: 'deleted', path, value: obj1 })
    return differences
  }

  // Handle primitive types
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    if (obj1 !== obj2) {
      differences.push({ type: 'changed', path, oldValue: obj1, newValue: obj2 })
    }
    return differences
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const maxLength = Math.max(obj1.length, obj2.length)
    for (let i = 0; i < maxLength; i++) {
      const currentPath = `${path}[${i}]`
      if (i >= obj1.length) {
        differences.push({ type: 'added', path: currentPath, value: obj2[i] })
      } else if (i >= obj2.length) {
        differences.push({ type: 'deleted', path: currentPath, value: obj1[i] })
      } else {
        differences.push(...compareJSON(obj1[i], obj2[i], currentPath))
      }
    }
    return differences
  }

  // Handle objects
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = new Set([...keys1, ...keys2])

  allKeys.forEach(key => {
    const currentPath = path ? `${path}.${key}` : key
    
    if (!(key in obj1)) {
      differences.push({ type: 'added', path: currentPath, value: obj2[key] })
    } else if (!(key in obj2)) {
      differences.push({ type: 'deleted', path: currentPath, value: obj1[key] })
    } else {
      differences.push(...compareJSON(obj1[key], obj2[key], currentPath))
    }
  })

  return differences
}

/**
 * Calculate line-by-line differences for text comparison
 */
export function getLineDiff(text1, text2) {
  const lines1 = text1.split('\n')
  const lines2 = text2.split('\n')
  const maxLines = Math.max(lines1.length, lines2.length)
  const diff = []

  for (let i = 0; i < maxLines; i++) {
    const line1 = lines1[i] !== undefined ? lines1[i] : null
    const line2 = lines2[i] !== undefined ? lines2[i] : null

    if (line1 === null) {
      diff.push({ type: 'added', lineNum: i + 1, line: line2 })
    } else if (line2 === null) {
      diff.push({ type: 'deleted', lineNum: i + 1, line: line1 })
    } else if (line1 !== line2) {
      diff.push({ type: 'changed', lineNum: i + 1, oldLine: line1, newLine: line2 })
    } else {
      diff.push({ type: 'unchanged', lineNum: i + 1, line: line1 })
    }
  }

  return diff
}

/**
 * Format differences for display
 */
export function formatDifferences(differences) {
  if (differences.length === 0) {
    return 'No differences found'
  }

  let output = `Found ${differences.length} difference(s):\n\n`
  
  differences.forEach((diff, index) => {
    output += `${index + 1}. ${diff.type.toUpperCase()} at "${diff.path}"\n`
    
    if (diff.type === 'changed') {
      output += `   Old: ${JSON.stringify(diff.oldValue)}\n`
      output += `   New: ${JSON.stringify(diff.newValue)}\n`
    } else if (diff.type === 'added') {
      output += `   Value: ${JSON.stringify(diff.value)}\n`
    } else if (diff.type === 'deleted') {
      output += `   Value: ${JSON.stringify(diff.value)}\n`
    }
    output += '\n'
  })

  return output
}

/**
 * Get statistics about differences
 */
export function getDiffStats(differences) {
  const stats = {
    total: differences.length,
    added: 0,
    deleted: 0,
    changed: 0
  }

  differences.forEach(diff => {
    if (diff.type === 'added') stats.added++
    else if (diff.type === 'deleted') stats.deleted++
    else if (diff.type === 'changed') stats.changed++
  })

  return stats
}
