import dbconn from "@/db/db_conn";
import Post from "@/model/Post";

export async function POST(req) {
    try {
        await dbconn();
        const { content} = await req.json();
        console.log({content})
        const newPost = new Post({
            content,
            timestamp: new Date(), 
          });

        await newPost.save();
        return new Response(
            JSON.stringify({message:"post created successfully", post: newPost},
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

export async function GET(req) {
    try {
        await dbconn();
        const posts = await Post.find({});
        return new Response(
            JSON.stringify(posts),{status:200, headers:{ 'Content-Type': 'application/json' }}
        )
    } catch (err) {
        console.error('Error getting tasks:', err);
      return new Response(
        JSON.stringify({ err: 'Failed to get tasks' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
}