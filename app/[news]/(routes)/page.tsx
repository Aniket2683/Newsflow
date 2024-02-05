"use client"

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SideNav from "@/components/side-nav";
import Navbar from "@/components/navbar";

export default function NewsCardList() {

  const [news, setNews] = useState<[]>([]);

  const getNews = async () => {
    const res = await fetch("http://localhost:3001/api/news", {
      method: "GET"
    });
    const { news } = await res.json();
    setNews(news);
  }

  return (
    <>
      <main className="w-full flex flex-row items-center justify-between">
        <SideNav></SideNav>
        <div className="w-9/12 top-0 self-start">
          <Navbar></Navbar>
          <div className="flex flex-col z-10 items-center justify-between text-sm lg:flex p-6 bg-sky-100 max-h-full">
            <button className="border p-2" onClick={getNews}>Fetch</button>
            <div className="flex flex-wrap justify-center mt-10">
                {news.map((item: any, index) => (
                    <Card className="mb-6 w-80 mr-4" key={index}>
                    <CardHeader>
                        <CardTitle className="text-lg">{item.headline}</CardTitle>
                        <CardDescription>News</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild>
                        <Link target="_blank" href={`https://news.google.com${item?.newsLink.slice(1)}`}>Go To News</Link>
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
            </div>             
          </div>  
        </div>  
      </main>
    </>
  );
}