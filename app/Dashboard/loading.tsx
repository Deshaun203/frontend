import Loader from '@/components/loader'
import React from 'react'

const loading = () => {
  return (
  <div className="flex flex-col items-center justify-center w-full inset-0 min-h-[100svh] h-screen overflow-hidden bg-[#0d1425f6]">
      <Loader/>
    </div>
  )
}

export default loading
