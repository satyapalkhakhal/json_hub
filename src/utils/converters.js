import * as yaml from 'js-yaml'
import { json2xml } from 'xml-js'

/**
 * Convert JSON to XML
 */
export function jsonToXml(jsonData) {
  try {
    const options = {
      compact: true,
      ignoreComment: true,
      spaces: 2
    }
    const xml = json2xml(JSON.stringify(jsonData), options)
    return xml
  } catch (error) {
    throw new Error(`XML conversion failed: ${error.message}`)
  }
}

/**
 * Convert JSON to CSV
 */
export function jsonToCsv(jsonData) {
  try {
    // Handle array of objects
    if (Array.isArray(jsonData)) {
      if (jsonData.length === 0) {
        return ''
      }

      // Get all unique keys from all objects
      const keys = Array.from(
        new Set(
          jsonData.flatMap(obj => Object.keys(obj))
        )
      )

      // Create header row
      const header = keys.join(',')

      // Create data rows
      const rows = jsonData.map(obj => {
        return keys.map(key => {
          const value = obj[key]
          if (value === null || value === undefined) {
            return ''
          }
          // Handle nested objects/arrays by stringifying them
          if (typeof value === 'object') {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`
          }
          // Escape quotes and wrap in quotes if contains comma, newline, or quote
          const stringValue = String(value)
          if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        }).join(',')
      })

      return [header, ...rows].join('\n')
    } 
    // Handle single object
    else if (typeof jsonData === 'object' && jsonData !== null) {
      const keys = Object.keys(jsonData)
      const values = keys.map(key => {
        const value = jsonData[key]
        if (value === null || value === undefined) {
          return ''
        }
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`
        }
        const stringValue = String(value)
        if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      })
      
      return [keys.join(','), values.join(',')].join('\n')
    }
    
    return String(jsonData)
  } catch (error) {
    throw new Error(`CSV conversion failed: ${error.message}`)
  }
}

/**
 * Convert JSON to YAML
 */
export function jsonToYaml(jsonData) {
  try {
    const yamlStr = yaml.dump(jsonData, {
      indent: 2,
      lineWidth: -1,
      noRefs: true
    })
    return yamlStr
  } catch (error) {
    throw new Error(`YAML conversion failed: ${error.message}`)
  }
}

/**
 * Convert XML to JSON
 */
export function xmlToJson(xmlString) {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml')
    
    function xmlToJsonHelper(xml) {
      const obj = {}
      
      if (xml.nodeType === 1) { // element
        // attributes
        if (xml.attributes.length > 0) {
          obj['@attributes'] = {}
          for (let j = 0; j < xml.attributes.length; j++) {
            const attribute = xml.attributes.item(j)
            obj['@attributes'][attribute.nodeName] = attribute.nodeValue
          }
        }
      } else if (xml.nodeType === 3) { // text
        obj.text = xml.nodeValue
      }
      
      // children
      if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
          const item = xml.childNodes.item(i)
          const nodeName = item.nodeName
          if (typeof obj[nodeName] === 'undefined') {
            obj[nodeName] = xmlToJsonHelper(item)
          } else {
            if (typeof obj[nodeName].push === 'undefined') {
              const old = obj[nodeName]
              obj[nodeName] = []
              obj[nodeName].push(old)
            }
            obj[nodeName].push(xmlToJsonHelper(item))
          }
        }
      }
      return obj
    }
    
    return xmlToJsonHelper(xmlDoc)
  } catch (error) {
    throw new Error(`XML to JSON conversion failed: ${error.message}`)
  }
}

/**
 * Convert CSV to JSON
 */
export function csvToJson(csvString) {
  try {
    const lines = csvString.trim().split('\n')
    if (lines.length === 0) {
      return []
    }

    const headers = lines[0].split(',').map(h => h.trim())
    const result = []

    for (let i = 1; i < lines.length; i++) {
      const obj = {}
      const currentLine = lines[i].split(',').map(v => v.trim())

      headers.forEach((header, index) => {
        obj[header] = currentLine[index] || ''
      })

      result.push(obj)
    }

    return result
  } catch (error) {
    throw new Error(`CSV to JSON conversion failed: ${error.message}`)
  }
}

/**
 * Convert YAML to JSON
 */
export function yamlToJson(yamlString) {
  try {
    return yaml.load(yamlString)
  } catch (error) {
    throw new Error(`YAML to JSON conversion failed: ${error.message}`)
  }
}
