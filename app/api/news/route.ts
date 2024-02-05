import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

export async function GET() {
    const baseURl = "https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRE55YXpBU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Amr";

    try {
        const response = await fetch(baseURl);
        const html = await response.text();

        const dom = new JSDOM(html);
        const document = dom.window.document;

        const allNews = document.querySelectorAll('.gPFEn');

        const news = Array.from(allNews).map(item => {
            const headline = item.textContent;
            const newsLink = item.getAttribute('href');
            return {headline, newsLink};
        });

        // Send news to client side
        return NextResponse.json({news}, { status: 200 });

    } catch (error: any) {
        console.log('[COLLECTION_SITE_ERRROR]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};