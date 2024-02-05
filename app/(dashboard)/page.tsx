"use client"

import SideNav from "@/components/side-nav";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <main className="w-full flex flex-row items-center justify-between">
        <SideNav></SideNav>
        <div className="w-9/12 top-0 self-start">
          <Navbar></Navbar>
          <div className="flex flex-col z-10 items-center justify-between text-sm lg:flex p-6 bg-sky-100 h-screen">
            Dashboard
          </div>  
        </div>  
      </main>
    </>
  );
}