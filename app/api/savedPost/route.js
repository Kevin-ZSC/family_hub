import dbconn from "@/db/db_conn";
import SavedPost from "@/model/SavedPost";

export async function POST(req) {
    try {
        await dbconn();
        const { savedPost } = await req.json();
        console.log({savedPost})
        
        const newPost = new SavedPost(savedPost);  
        await newPost.save()
        return new Response(
            JSON.stringify({message:"post created successfully", savedPost: newPost},
            { status: 201, headers: { "Content-Type": "application/json" } })
        )
    }
     catch(err) {
        console.log(err)
        return new Response(
            JSON.stringify({ error: "Failed to create post." },
            { status: 500, headers: { "Content-Type": "application/json" }})
        )
    }
}

export async function GET (req) {
    
    try{    
        await dbconn();
        const savedPosts = await SavedPost.find({});
        return new Response(
            JSON.stringify({savedPosts}, {status:200, headers:{'Content-Type': 'application/json' }})
        )

    } catch(err) {
        console.log(err);
        return new Response(
            JSON.stringify({ err: 'Failed to get tasks' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
    }
    

}
