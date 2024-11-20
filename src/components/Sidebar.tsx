"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";

import SidebarLink from "./SidebarLink";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";

export default function Sidebar() {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setshowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarStyle = `fixed flex flex-col w-64 h-[100%] justify-between bg-white shadow-xl transition-all duration-300 z-40 dark:bg-black overflow-y-auto ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarStyle}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            Atlas
          </div>

          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-400" />
            </button>
          )}
        </div>

        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src="/next.svg"
            alt="TEAM"
            width={40}
            height={40}
            className="rounded-full bg-white p-2"
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              DATATRIX TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon
                size={16}
                className="mt-[0.1rem] text-gray-500 dark:text-gray-400"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Private
              </p>
            </div>
          </div>
        </div>

        {/* SIDEBAR LINKS */}
        <nav className="Z-10 w-full">
          <SidebarLink
            className="h-6 w-6 text-gray-800 dark:text-gray-100"
            href="/"
            icon={Home}
            label="Home"
          />
          <SidebarLink
            className="h-6 w-6 text-gray-800 dark:text-gray-100"
            href="/timeline"
            icon={Briefcase}
            label="Timeline"
          />
          <SidebarLink
            className="h-6 w-6 text-gray-800 dark:text-gray-100"
            href="/search"
            icon={Search}
            label="Search"
          />
          <SidebarLink
            className="h-6 w-6 text-gray-800 dark:text-gray-100"
            href="/settings"
            icon={Settings}
            label="Settings"
          />
          <SidebarLink
            className="h-6 w-6 text-gray-800 dark:text-gray-100"
            href="/users"
            icon={User}
            label="Users"
          />
          <SidebarLink
            className="h-6 w-6 text-gray-800 dark:text-gray-100"
            href="/teams"
            icon={Users}
            label="Teams"
          />
        </nav>

        {/* PROJECT LINK */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/* PROJECT LIST */}
        {showProjects && (
          <div className="flex flex-col gap-1">
            {projects?.map((project) => (
              <SidebarLink
                key={project.id}
                icon={Briefcase}
                label={project.name}
                href={`/projects/${project.id}`}
                className="h-6 w-6 text-gray-800 dark:text-gray-100"
              />
            ))}
          </div>
        )}

        {/* PRIORITIES LINK */}
        <button
          onClick={() => setshowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <span className="">Priorities</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              className="h-6 w-6 text-red-500"
              href="/priority/urgent"
              icon={AlertCircle}
              label="Urgent"
            />
            <SidebarLink
              className="h-6 w-6 text-orange-500"
              href="/priority/high"
              icon={ShieldAlert}
              label="High"
            />
            <SidebarLink
              className="h-6 w-6 text-yellow-500"
              href="/priority/medium"
              icon={AlertTriangle}
              label="Medium"
            />
            <SidebarLink
              className="h-6 w-6 text-green-500"
              href="/priority/low"
              icon={AlertOctagon}
              label="Low"
            />
            <SidebarLink
              className="h-6 w-6 text-blue-500"
              href="/priority/backlog"
              icon={Layers3}
              label="Backlog"
            />
          </>
        )}
      </div>
    </div>
  );
}
