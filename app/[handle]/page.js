import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("linktree")
    const collection = db.collection("links")

    //Checking if handle already exists
    const item = await collection.findOne({ handle })
    if (!item) {
        return notFound()
    }

    const item2 = {
        "links": [
            {
                "link": "https://github.com/theayushgupta08",
                "linktext": "GitHub"
            },
            {
                "link": "https://instagram.com/theayushgupta08",
                "linktext": "Instagarm"
            },
            {
                "link": "https://linkedin.com/in/theayushgupta08",
                "linktext": "LinkedIn"
            },
            {
                "link": "https://x.com/theayushgupta08",
                "linktext": "X (Twitter)"
            }
        ],
        "handle": "theayushgupta08",
        "picture": "https://pbs.twimg.com/profile_images/1790976313819324417/B0nJl4SN_400x400.jpg",
        "description": "Hello Friends, Chai Pilo, Lollipop Khaalo, Aur kya haal chaal baby, kaisi ho , gadhi bhais , saand hottie "
    }

    return <div className="flex bg-green-700 min-h-screen justify-center items-start p-10">
        {item && <div className="photo flex flex-col justify-center items-center gap-4">
            <img src={item.picture} width={150} height={150} className="w-34 h-34 rounded-full" />
            <span className='font-bold text-2xl text-white'>@{item.handle}</span>
            <sapn className="description w-[40rem] text-center italic text-white text-xl">"{item.description}"</sapn>
            <div className='links'>
                {
                    item.links.map((item, index) => {
                        return <a key={index} href={item.link} target="_blank" className="text-black w-80 text-xl font-bold"><div className='bg-white rounded-lg min-w-[80vh] my-3 py-4 px-4 transform transition-transform duration-300 hover:scale-90 hover:shadow-xl flex items-center justify-center'>
                            {item.linktext}
                        </div>
                        </a>
                    })}
            </div>
            <span className='font-bold text-xl text-white'>@ Made with &#10084; by <span className='italic text-gray-300'>Ayush Gupta</span></span>
        </div>
        }


    </div >
}