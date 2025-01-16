import dbconn from "@/db/db_conn";
import Post from "@/model/Post"
import { ObjectId } from 'mongodb'


export async function DELETE (req,{params}) {
    try {
        await dbconn();
        const { id } = params;

        if (!id || !ObjectId.isValid(id)) {
            return new Response(
                JSON.stringify({ message: "Invalid or missing ID" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        
        const objId = new ObjectId(id);
        const post  = await Post.findByIdAndDelete(objId);
        if(!post) {
            return new Response(
                JSON.stringify(
                    {message: 'post not found'}, 
                    {status: 404, headers: {"Content-Type": "application/json" }})
            )
        }
        return new Response(
            JSON.stringify(post),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );

    } catch (err) {
        return new Response(
            JSON.stringify({ message: "Failed to delete post", error: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
    }
}

