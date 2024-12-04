"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Generate = () => {

    const searchParams = useSearchParams()
    const [links, setlinks] = useState([{ link: "", linktext: "" }])  // Creating an array to store link and corressponding linktext
    const [handle, setHandle] = useState(searchParams.get('handle'))
    const [picture, setPicture] = useState("")
    const [description, setdescription] = useState("")
    const [Generated, setGenerated] = useState(false)

    const handleChange = (index, link, linktext) => {
        setlinks((initialLink) => {
            return initialLink.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                } else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        // Using concat instead push because concat returns new array 
        setlinks(links.concat([{ link: "", linktext: "" }]))
    }

    const submitLink = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "picture": picture,
            "description": description
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/generate", requestOptions)
        const result = await r.json()
        if (result.success) {
            toast.success(result.message)
            setGenerated(`${handle}`)
            setlinks([])
            setPicture("")
            setHandle("")
            setdescription("")
        } else {
            toast.error(result.message)
        }
    }

    return (
        <div className='bg-[#254f1a] min-h-screen grid grid-cols-2'>
            <div className='col1 flex justify-center items-center flex-col'>
                <h1 className='font-bold text-4xl my-8 text-[#D3E800]'>Create your Linktree</h1>
                <div className='flex flex-col'>
                    <h3 className='font-bold text-white py-3'>Step 1: Create your Handle</h3>
                    <input value={handle || ""} onChange={e => { setHandle(e.target.value) }} className='px-4 py-2 focus:outline-green-700 rounded-3xl w-[30vw]' type="text" placeholder='Your Handle Name' />
                    <h3 className='font-bold text-white py-3'>Step 2: Write description for your handle</h3>
                    <input value={description || ""} onChange={e => { setdescription(e.target.value) }} className='px-4 py-2 focus:outline-green-700 rounded-3xl w-[30vw]' type="text" placeholder='Your description' />

                    <div className='flex flex-row gap-[120]'>
                        <h3 className='font-bold text-white py-4 translate-y-2'>Step 3: Paste your Link</h3>
                        <h3 className='font-bold text-white py-4 translate-y-2'>Step 4: Type your Link Name</h3>
                    </div>

                    {/* Here, creating a dynamic fiv, which will replicate iteselt as many time user clicks on the Add Link Button  */}
                    {links && links.map((item, index) => {
                        return <div key={index} className='flex flex-row gap-5 py-3'>
                            <input value={item.link || ""} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='px-4 py-2 focus:outline-green-700 rounded-3xl w-[14vw]' type="text" placeholder='Your Link' />
                            <input value={item.linktext || ""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='px-4 py-2 focus:outline-green-700 rounded-3xl w-[14vw]' type="text" placeholder='Your Link Name' />
                        </div>
                    })}

                    <button onClick={() => addLink()} className='font-bold rounded-full bg-black hover:bg-gray-900 text-white p-2 w-[6vw]'>+ Add Link</button>
                    <h3 className='font-bold text-white py-3'>Step 5: Paste Link to your Icon</h3>
                    <input value={picture || ""} onChange={e => { setPicture(e.target.value) }} className='px-4 py-2 focus:outline-green-700 rounded-3xl' type="text" placeholder='Your Icon Link' />
                    <button disabled={picture == "" || handle == "" || links[0].linktext == ""} onClick={() => { submitLink() }} className='disabled:bg-slate-900 font-bold rounded-full bg-black hover:bg-gray-900 text-white p-2 w-[10vw] translate-y-4'>Create your Linktree</button>
                </div>
                <div className='my-10 bg-slate-600 p-4 py-2 rounded-full text-white'>
                    {Generated && <> <span className='font-bold text-lg'> Your Link:</span> <code>
                        <Link target='_blank' href={Generated}>{Generated}</Link>
                    </code> </>}
                </div>
            </div>


            {/* This is Column 2 for Image  */}
            <div className='col2 w-full h-screen'>
                <img alt="Image from linktree login" className='w-[100vw] h-full object-cover' src="/login.png" />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Generate
