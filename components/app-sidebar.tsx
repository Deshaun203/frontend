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

// This is sample data.
const data = {
  user: {
    name: "Database Manager",
    email: "deshaun06.thomas@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "P1405",
      logo: Factory,
      plan: "Public Sector",
    },
    {
      name: "P1405A",
      logo: TreePine,
      plan: "Community Sector",
    },
    {
      name: "P1405B",
      logo: Command,
      plan: "Private Sector",
    },
  ],
  navMain: [
    {
      title: "Community Component",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Inventory",
          url: "#",
        },
        {
          title: "Machinery",
          url: "#",
        },
        {
          title: "Transportation",
          url: "#",
        },
      ],
    },
    {
      title: "Gateway",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Deductions",
          url: "#",
        },
        {
          title: "Timesheet Hours",
          url: "#",
        },
        {
          title: "",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "#",
      icon: Frame,
    },
    {
      name: "Forms",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Report Builder",
      url: "#",
      icon: Map,
    },
     {
      name: "Reminders",
      url: "#",
      icon: Map,
    },
    {
      name: "Calender",
      url: "#",
      icon: Map,
    },
    {
      name: "",
      url: "#",
      icon: Map,
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
         <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
