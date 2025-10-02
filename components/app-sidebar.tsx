"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Factory,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  TreePine,
} from "lucide-react"

import { usePathname } from "next/navigation"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { supabase } from "@/lib/supabase/supabaseClient"




//get user profile

const { data: { user } } = await supabase.auth.getUser();
const email      = user?.email ?? "nepguest@daemon.com";
const full_name  = user?.user_metadata?.full_name ;
const jobtitle   = user?.user_metadata?.job_title ?? "Guest User";
const avatar    = buildAvatarUrl(full_name ?? "User");


//function to build avatar url
function buildAvatarUrl(fullName: string, size = 128) {
  const name = encodeURIComponent((fullName || "User").trim());
  return `https://ui-avatars.com/api/?name=${name}&background=random&size=${size}&bold=true`;
}



const data = {
  user: {
    name: jobtitle,
    email: email,
    avatar: avatar,
  },
  teams: [
    { name: "P1405",  logo: Factory,  plan: "Public Sector" },
    { name: "P1405A", logo: TreePine, plan: "Community Sector" },
    { name: "P1405B", logo: Command,  plan: "Private Sector" },
  ],
  navMain: [
    {
      title: "Community Component",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Gateway",
      url: "#",
      icon: Bot,
      items: [
        { title: "Deductions",     url: "#" },
        { title: "Timesheet Hours",url: "#" },
        { title: "",               url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started",  url: "#" },
        { title: "Tutorials",    url: "#" },
        { title: "Changelog",    url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team",    url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits",  url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Dashboard",  url: "#", icon: Frame },
    { name: "Forms",      url: "#", icon: PieChart },
    { name: "Report Builder", url: "#", icon: Map },
    { name: "Reminders",  url: "#", icon: Map },
    { name: "Calender",   url: "#", icon: Map },
    { name: "",           url: "#", icon: Map },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const onDashboard =
    (pathname ?? "").toLowerCase() === "/dashboard"

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {onDashboard ? (
          <TeamSwitcher teams={data.teams} />
        ) : (
          <div className="p-4 font-medium">Daemon Systems</div>
        )}
      </SidebarHeader>

      <SidebarContent>
        
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
