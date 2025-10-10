
export async function fetchUpsplashImages (query: string , count: number = 5): Promise<string[]>{

    const res = await fetch(`https://api.unsplash.com/photos/random?query=${query}&count=${count}`,{
        headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        }
    });

    if(!res.ok) {
        throw new Error("Failed to fetch images from Unsplash");
    }

    const data = await res.json()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const urls: string[] = data.map((img: any) => img.urls.regular)
    console.log(urls)

    return urls;

}