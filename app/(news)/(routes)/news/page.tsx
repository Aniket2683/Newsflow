"use client"

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SideNav from "@/components/side-nav";
import Navbar from "@/components/navbar";
import Loader from "@/components/loader";

export default function NewsCardList() {

  const [news, setNews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/news", {
        method: "GET"
      });
      const { news } = await res.json();
      setNews(news); // news from api req
    } catch (error) {
      console.log("Error fetching news: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full flex flex-row items-center justify-between">
      <SideNav></SideNav>
      <div className="w-9/12 top-0 self-start">
        <Navbar></Navbar>
        <div className="flex flex-col items-center text-sm p-6">
          <Button className="border p-2 bg-gray-950 text-white" onClick={getNews}>Fetch</Button>
          { loading && (
            <div className="w-full flex items-center justify-center p-8 mt-48">
              <Loader />
            </div>
          )}

          { !loading && ( 
            <div className="flex flex-wrap justify-center mt-10">
              {news.map((item: any, index) => (
                  <Card className="mb-6 w-80 mr-4 bg-gray-950 text-white border-gray-500" key={index}>
                  <CardHeader>
                      <CardTitle className="text-lg">{item.headline}</CardTitle>
                      <CardDescription>News</CardDescription>
                  </CardHeader>
                  <CardFooter>
                      <Button asChild className="bg-gray-100 text-gray-950 hover:bg-gray-400">
                      <Link target="_blank" href={`https://news.google.com${item?.newsLink.slice(1)}`}>Go To News</Link>
                      </Button>
                  </CardFooter>
                  </Card>
              ))}
            </div>
          )}

        </div>  
      </div>  
    </main>
  );
}