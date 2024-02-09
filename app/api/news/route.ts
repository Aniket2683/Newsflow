import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

const baseURl = "https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRE55YXpBU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3A";

const allNewsLang = ["mr", "en", "bn", "gu", "kn", "ml", "ta", "te"];

const newsArrayGenerator = (html: string) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const allNews = document.querySelectorAll('.gPFEn');
    const limit = 5; // Number of articles to scrape per language
    const specificNews:any = [];
    allNews.forEach((item, index) => {
        if (index < limit) {
            const headline = item.textContent;
            const newsLink = item.getAttribute('href');
            specificNews.push({ headline, newsLink });
        }
    });
    return specificNews;
}

async function fetchNews(language: string) {
    const response = await fetch(`${baseURl}${language}`);
    const html = await response.text();
    return newsArrayGenerator(html);
}

function shuffleArray(array: any[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function GET() {
    try {
        let news:string[] = [];

        const newsPromises = allNewsLang.map(language => fetchNews(language));
        const newsArrays = await Promise.all(newsPromises);
        newsArrays.forEach(langNews => {
            news.push(...langNews);
        });

        news = shuffleArray(news);

        // Send news to client side
        return NextResponse.json({news}, { status: 200 });

    } catch (error: any) {
        console.log('[COLLECTION_SITE_ERRROR]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};