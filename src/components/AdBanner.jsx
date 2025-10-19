import { useEffect } from 'react'

/**
 * AdSense Banner Component
 * Place this component wherever you want ads to appear
 */
const AdBanner = ({ slot = "8834972360", format = "auto", responsive = true, style = {} }) => {
  useEffect(() => {
    try {
      // Push ad to AdSense
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  // Only show ads in production
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-sm">AdSense Ad (Development Mode)</p>
        <p className="text-xs text-gray-400 mt-1">Ads will appear here in production</p>
      </div>
    )
  }

  return (
    <div className="my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-2757390342181644"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

export default AdBanner
