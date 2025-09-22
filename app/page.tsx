//Finised 09/15/2025 T- 3:02pm

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IdCardLanyard, User } from 'lucide-react';

const LandingPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);


  useEffect(() => {

    //check if user already saw the welcome screen first
    const alreadySignedUp = localStorage.getItem('already_signedup');
    if (alreadySignedUp === 'true') {
      router.replace('/Auth/Login');
    } else {
      setStep(1); // show welcome
      setTimeout(() => {
        setStep(2); // then show card
      }, 3500); 
    }
  }, [router]);

  if (step === 0) return null; 

  return (
    <motion.div initial={{backgroundColor: "#0A0A0A"}} animate={{backgroundColor: "#0d1425f6"}} transition={{ duration: 4, ease:"easeIn"}}
     className="flex flex-col items-center justify-center w-full h-screen overflow-hidden transition-all duration-500">
      <AnimatePresence mode="wait">
        {step === 1 && (
   <motion.h1
  key="welcome"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.4 }}
  className="relative overflow-hidden"
>
  <motion.span
    animate={{ backgroundPosition: ['200% center', '0% center'] }}
    transition={{
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      duration: 3,
    }}
    className=" w-full h-full justify-center items-center text-7xl overflow-hidden flex font-light font-ubuntu bg-gradient-to-r from-gray-800 via-white to-gray-800 text-transparent bg-clip-text"
    style={{
      backgroundSize: '200%',
      backgroundPosition: '200% center',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    Welcome.
  </motion.span>
</motion.h1>



        )}

        {step === 2 && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-400/70 bg-clip-padding backdrop-filter backdrop-blur-lg flex flex-col justify-center-safe items-center pt-4 backdrop-saturate-100 backdrop-contrast-75 rounded-xl border border-white/30 w-[470px] h-[290px]"
          >
            <h1 className="text-2xl font-outfit text-zinc-100 drop-shadow-sm bg-transparent">Select Organization Role</h1>
            <div className='w-full h-full flex mt-3 justify-center items-center'>
               <button onClick={() => router.push("/Auth/SignupSupervisor")}
                className='bg-zinc-200/90 border flex flex-col gap-2 items-center justify-center h-32 w-32 px-5 pt-5 pb-2 rounded-2xl border-black/35 hover:scale-105 cursor-pointer active:scale-105 active:bg-zinc-300/70 hover:bg-zinc-300/70 transition-all duration-200 ease-in-out shadow-lg hover:shadow-black/30'>
       <span className='h-full flex items-center justify-center'><User size={52}/></span>
       <div className='h-12 font-outfit font-[500] text-slate-900'>Supervisor</div>
       </button>
        <div className='h-44 flex flex-col mx-8 items-center'>
          <span className='border h-full mb-2 border-gray-300 rounded-full'/>
          <p className='font-ubuntu text-base font-light'>or</p>
          <span className='border h-full mt-2 border-gray-300 rounded-full'/>
        </div>

        <button onClick={() => router.push("/Auth/Signup")} className='bg-zinc-200/90 border flex flex-col gap-2 items-center justify-center h-32 w-32 px-5 pt-5 pb-2 rounded-2xl border-black/35 hover:scale-105 active:scale-105 active:bg-zinc-300/70 cursor-pointer hover:bg-zinc-300/70 transition-all duration-200 ease-in-out shadow-lg hover:shadow-black/30'>
       <span className='h-full flex items-center justify-center'><IdCardLanyard size={52}/></span>
       <div className='h-12 font-outfit font-[500] text-slate-900'>Employee</div>
       </button></div>
      <p className="text-gray-300 font-outfit mb-2">
  Already have an account?{" "}
  <a href='/Auth/Login' className="underline text-amber-400 hover:text-amber-300 cursor-pointer transition-colors">
    Login
  </a>
</p>

          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-7 text-slate-300 font-poppins text-xs">
  © 2025 Daemon S. All rights reserved. Unauthorized use prohibited.
</div>

    </motion.div>
  );
};

export default LandingPage;
