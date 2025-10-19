import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

const JsonViewer = ({ data }) => {
  let parsedData
  try {
    parsedData = typeof data === 'string' ? JSON.parse(data) : data
  } catch (e) {
    return <div className="text-red-600">Invalid JSON data</div>
  }

  return (
    <div className="font-mono text-sm">
      <JsonNode data={parsedData} name="root" />
    </div>
  )
}

const JsonNode = ({ data, name, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2)

  const indent = level * 20

  if (data === null) {
    return (
      <div style={{ marginLeft: `${indent}px` }} className="py-0.5">
        <span className="text-purple-600 font-semibold">{name}</span>
        <span className="text-gray-500">: </span>
        <span className="text-gray-400 italic">null</span>
      </div>
    )
  }

  if (data === undefined) {
    return (
      <div style={{ marginLeft: `${indent}px` }} className="py-0.5">
        <span className="text-purple-600 font-semibold">{name}</span>
        <span className="text-gray-500">: </span>
        <span className="text-gray-400 italic">undefined</span>
      </div>
    )
  }

  if (typeof data === 'boolean') {
    return (
      <div style={{ marginLeft: `${indent}px` }} className="py-0.5">
        <span className="text-purple-600 font-semibold">{name}</span>
        <span className="text-gray-500">: </span>
        <span className="text-blue-600">{data.toString()}</span>
      </div>
    )
  }

  if (typeof data === 'number') {
    return (
      <div style={{ marginLeft: `${indent}px` }} className="py-0.5">
        <span className="text-purple-600 font-semibold">{name}</span>
        <span className="text-gray-500">: </span>
        <span className="text-green-600">{data}</span>
      </div>
    )
  }

  if (typeof data === 'string') {
    // Check if string is a URL
    const isUrl = /^https?:\/\/.+/.test(data)
    // Check if string is an image URL
    const isImage = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(data)

    return (
      <div style={{ marginLeft: `${indent}px` }} className="py-0.5">
        <span className="text-purple-600 font-semibold">{name}</span>
        <span className="text-gray-500">: </span>
        {isUrl ? (
          <a 
            href={data} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            "{data}"
          </a>
        ) : (
          <span className="text-orange-600">"{data}"</span>
        )}
        {isImage && (
          <div className="ml-4 mt-1">
            <img 
              src={data} 
              alt="Preview" 
              className="max-w-xs max-h-32 border border-gray-300 rounded"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
        )}
      </div>
    )
  }

  if (Array.isArray(data)) {
    return (
      <div style={{ marginLeft: `${indent}px` }}>
        <div 
          className="py-0.5 cursor-pointer hover:bg-gray-100 inline-flex items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
          <span className="text-purple-600 font-semibold ml-1">{name}</span>
          <span className="text-gray-500 ml-1">
            [{data.length}]
          </span>
        </div>
        {isExpanded && (
          <div>
            {data.map((item, index) => (
              <JsonNode 
                key={index} 
                data={item} 
                name={`[${index}]`} 
                level={level + 1} 
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data)
    return (
      <div style={{ marginLeft: `${indent}px` }}>
        <div 
          className="py-0.5 cursor-pointer hover:bg-gray-100 inline-flex items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
          <span className="text-purple-600 font-semibold ml-1">{name}</span>
          <span className="text-gray-500 ml-1">
            {'{' + keys.length + '}'}
          </span>
        </div>
        {isExpanded && (
          <div>
            {keys.map((key) => (
              <JsonNode 
                key={key} 
                data={data[key]} 
                name={key} 
                level={level + 1} 
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return null
}

export default JsonViewer
