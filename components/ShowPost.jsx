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
  handleDelete,
  openDropdown,
  handleLike,
  handleComment,
  comments,
  getComments
}) => {


 

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
                    onClick={() => handleSave(post._id)}
                  >
                    Save
                  </button>

                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    onClick={() => handleDelete(post._id)}
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
              className={`flex items-center gap-1 ${like[post._id] ? "text-blue-800" : ""} hover:text-blue-200`}
              onClick={() => handleLike(post._id)}
            >
              <Image src="/like.png" width={20} height={20} alt="like" />
              {like[post._id] ? "Liked" : "Like"}
            </button>
            <button
              className="flex items-center gap-1 hover:text-blue-500"
              onClick={() => handleComment(post._id)}
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

          {toggleComment[post._id] && (
             <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm p-4 mt-4 w-full max-w-md">
             <h1 className="text-gray-800 font-medium mb-3">Comments</h1>
             <div className="space-y-4">
         
               {/* Display comments */}
               {comments.map((comment, index) => (
                 <div key={index} className="flex space-x-3 items-start hover:bg-gray-100 p-3 rounded-lg">
                   <img
                     src="/family.png"
                     alt="User Avatar"
                     className="w-10 h-10 rounded-full"
                   />
                   <div className="flex-1">
                     <div className="flex justify-between items-center">
                       <p className="font-semibold text-sm text-gray-700">Name</p>
                       <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
                     </div>
                     <p className="text-gray-600 mt-1">{comment}</p>
                     <div className="mt-2 flex items-center">
                       <button
                         onClick={() => handleReply(comment)}
                         className="text-sm text-blue-600 hover:text-blue-400"
                       >
                         Reply
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
         
      
                {/* Add Comment Input */}
                <div className="flex space-x-3 items-center">
                    {/* those can be other comment user image */}
                  <Comment getComments={getComments} />
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
