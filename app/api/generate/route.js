import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("linktree")
    const collection = db.collection("links")

    //Checking if handle already exists
    const doc = await collection.findOne({ handle: body.handle })

    console.log(doc)
    if (doc) {
        return Response.json({ success: false, error: true, message: 'Choosen Handle already exists! Choose different Handle.', result: null })
    }


    const result = await collection.insertOne(body)


    return Response.json({ success: true, error: false, message: 'Successfully generated your Linktree!', result: result })
}