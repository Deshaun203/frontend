import HeaderComponent from '@/components/ui/header'
import SignupForm from '@/components/ui/SignupForm'
import React from 'react'

const page = () => {
  return (
    <main className='bg-[#0A0A0A] w-full h-screen flex flex-col overflow-hidden items-center'>
       <div><HeaderComponent/></div>
       <div className='w-full h-screen flex mt-23 justify-center md:mt-0 md:items-center'>
        <SignupForm/>
       </div>
    </main>
  )
}

export default page