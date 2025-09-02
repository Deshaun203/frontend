import React from 'react'
import DaemonHexVaultLogo from './logo'

const HeaderComponent = () => {
  return (
    <div className='w-full h-16 bg-transparent flex items-center justify-center text-slate-100 text-base mt-1 md:text-2xl md:mt-3 font-semibold gap-2 '>
        <DaemonHexVaultLogo className='h-8 w-8 md:h-12 md:w-12'/>
      Daemon S
    </div>
  )
}

export default HeaderComponent
