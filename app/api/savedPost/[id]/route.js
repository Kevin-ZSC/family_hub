import dbconn from "@/db/db_conn";
import SavedPost from "@/model/SavedPost";
import { ObjectId } from 'mongodb'

export async function DELETE (req, { params }) {
   
    try {
        await dbconn();
        const { id } = params;
        const objId = new ObjectId(id);

        const deletedSavedPost = await SavedPost.findByIdAndDelete(objId); // use await 

        if(!deletedSavedPost) {
            return new Response(
                JSON.stringify({message: "cant find the id "} , {status: 404})
            )
        }

        return new Response(JSON.stringify(deletedSavedPost),{status:200})

    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({status:500}))
    }
}