import React from 'react'

function loading() {
  return (
    <div className="flex items-center justify-center w-full h-[100vh] relative">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  )
}

export default loading
