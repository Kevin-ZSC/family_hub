"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Comment from "./Comment";

const ShowPost = ({
  toggleComment,
  like,
  posts,
  toggleDropdown,
  handleSave,
  handleEdit,
  handleEditAudience,
  handleDelete,
  openDropdown,
  handleLike,
  handleComment,
}) => {
  const [likeTextStyle, setLikeTextStyle] = useState("");
  useEffect(() => {
    if (like) {
      setLikeTextStyle("text-blue-600");
    } else {
      setLikeTextStyle("");
    }
  }, [like]);

  const handleReply = (comment) =>{
    console.log(comment)
  }
  return (
    <div className="w-full max-w-md">
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/family.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">Kevin</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(post.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Dots with Dropdown */}
            <div className="relative">
              <img
                src="/dots.png"
                alt="More Options"
                className="w-6 h-6 cursor-pointer"
                onClick={() => toggleDropdown(index)}
              />
              {openDropdown === index && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSave(post)}
                  >
                    Save
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleEditAudience(post)}
                  >
                    Edit Audience
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <p className="text-gray-800 mb-4">{post.content}</p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between text-gray-600">
            <button
              className={`flex items-center gap-1 ${likeTextStyle} hover:text-blue-200`}
              onClick={() => handleLike(post)}
            >
              <Image src="/like.png" width={20} height={20} alt="like" />
              Like
            </button>
            <button
              className="flex items-center gap-1 hover:text-blue-500"
              onClick={() => handleComment(post)}
            >
              <Image
                src="/comments.png"
                width={20}
                height={20}
                alt="comments"
              />
              Comment
            </button>
          </div>
          {toggleComment && (
            <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm p-4 mt-4 w-full max-w-md">
              {/* fetch data to list all comments from db and display*/}


              <h1 className="text-gray-700 font-medium mb-2">Comments</h1>
              <div className="space-y-4">
                {/* Example Comment */}
                <div className="flex space-x-3">
                  <img
                    src="/path-to-user-avatar.jpg"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                    <p className="text-gray-800 font-medium">John Doe</p>
                    <p className="text-gray-600 text-sm">
                      This is an example comment.
                    </p>
                  </div>
                  <div>
                    <button onClick={()=>handleReply(comment)}>reply</button>
                </div>
                </div>
                {/* Add more comments here */}

                {/* Add Comment Input */}
                <div className="flex space-x-3 items-center">
                    {/* those can be other comment user image */}
                  <Comment />
                </div>
                
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowPost;
