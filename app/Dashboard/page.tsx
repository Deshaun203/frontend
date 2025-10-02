"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator,} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {SidebarInset,SidebarProvider,SidebarTrigger,} from "@/components/ui/sidebar"
import { Statistic } from "antd"
import { motion } from "framer-motion";
import { ArrowUp, DollarSign, User } from "lucide-react"
import { useState } from "react"
import * as React from "react"

import Autoplay from "embla-carousel-autoplay"




export default function Page() {

  //states
  const [open, setOpen] = useState(true);





  return (
    <SidebarProvider open={open} onOpenChange={setOpen} suppressHydrationWarning>
      <AppSidebar  />
      <SidebarInset className="bg-[#0B0E13]">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/Dashboard">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Content Container */}
        
        < motion.div initial={{ opacity: 0 }} animate={{ opacity: 1}} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-1 flex-col gap-4 p-4 pt-0">

          {/* Statistics Card Container */}
          <div className={`flex w-full px-2 transition-all duration-300 ${open ? "justify-between" : "items-center"} gap-4 md:gap-6 flex-col md:flex-row`}>


           {/* Card 1 */}
      <div className="bg-muted/50 w-full md:w-[340px] h-36 rounded-xl overflow-hidden">
     
    </div>


            <div className="bg-muted/50 w-full md:w-[340px]  flex items-center justify-center p-2 px-4 h-36 rounded-xl">
            <div className="flex flex-col items-center w-full h-full justify-between"><span className="w-full flex items-center gap-2 font-outfit text-lg">Total Stipend</span>
              <span className="w-full text-center font-roboto text-3xl"> <Statistic prefix={"$"} precision={2} valueStyle={{ color:"#ffffff", fontFamily: "var(--font-roboto)", fontSize:"28px"}} value={1232893.90} /></span>
                <span className="w-full h-11 flex flex-col">
                  <p className="text-xs text-zinc-400 ml-2 font-outfit ">Last Month</p>
                  <Statistic
          value={1.28}
          precision={2}
          valueStyle={{ color: '#3f8600', fontFamily: "var(--font-outfit)", fontSize:"17px"}}
          prefix={<ArrowUp size={14} />}
          suffix="%"
        /></span></div>
            <div className="flex w-20 h-full items-center justify-center">
            <span className="flex w-13 h-13 items-center justify-center rounded-full shadow-2xl bg-zinc-400/50"><DollarSign/></span>
            </div>
            </div>
            <div className="bg-muted/50 w-full md:w-[340px]  flex items-center justify-center p-2 px-4 h-36 rounded-xl">
            <div className="flex flex-col items-center w-full h-full justify-between"><span className="w-full flex items-center gap-2 font-outfit text-lg">Employees</span>
              <span className="w-full text-center font-roboto text-3xl"> <Statistic valueStyle={{ color:"#ffffff", fontFamily: "var(--font-roboto)", fontSize:"28px"}} value={2893} /></span>
                <span className="w-full h-11 flex flex-col">
                  <p className="text-xs text-zinc-400 ml-2 font-outfit ">Last Month</p>
                  <Statistic
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600', fontFamily: "var(--font-outfit)", fontSize:"17px"}}
          prefix={<ArrowUp size={14} />}
          suffix="%"
        /></span></div>
            <div className="flex w-20 h-full items-center justify-center">
            <span className="flex w-13 h-13 items-center justify-center rounded-full shadow-2xl bg-zinc-400/50"><User/></span>
            </div>
            </div>
            <div className="bg-muted/50 w-full md:w-[340px] flex items-center justify-center p-4 h-36 rounded-xl">hii</div>
             <div className={`bg-muted/50 w-full md:w-[340px]  ${open ? "hidden opacity-0" : ""} flex items-center justify-center p-2 px-4 h-36 rounded-xl`}>
            <div className="flex flex-col items-center w-full h-full justify-between"><span className="w-full flex items-center gap-2 font-outfit text-lg">Employees</span>
              <span className="w-full text-center font-roboto text-3xl"> <Statistic valueStyle={{ color:"#ffffff", fontFamily: "var(--font-roboto)", fontSize:"28px"}} value={2893} /></span>
                <span className="w-full h-11 flex flex-col">
                  <p className="text-xs text-zinc-400 ml-2 font-outfit ">Last Month</p>
                  <Statistic
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600', fontFamily: "var(--font-outfit)", fontSize:"17px"}}
          prefix={<ArrowUp size={14} />}
          suffix="%"
        /></span></div>
            <div className="flex w-20 h-full items-center justify-center">
            <span className="flex w-13 h-13 items-center justify-center rounded-full shadow-2xl bg-zinc-400/50"><User/></span>
            </div>
            </div>
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"/>
        </motion.div>
      </SidebarInset>
    </SidebarProvider>
  )
}
