"use client"
import React from "react";
import Image from "next/image";
import { useState } from 'react'

const PostForm = ({ getPostInfo }) => {

const [postContent,setPostContent] = useState('')

const handleSumit = (e) => {
    e.preventDefault();
    getPostInfo(postContent);
    setPostContent('')
    
}

  return (
    <form action="" onSubmit={handleSumit}>
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-4">
        <Image
          src="/family.png"
          width={40}
          height={40}
          alt="header image"
          className="rounded-full"
        />
        <h3 className="font-semibold text-lg">Kevin</h3>
      </div>

      {/* Text Area */}
      <div className="mb-4">
        <textarea
          placeholder="What's on your mind, Kevin?"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </div>

      {/* Action Section */}
      <div className="flex items-center justify-between mb-4">
        {/* Add Image */}
        <button
          type="button"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
        >
          <Image
            src="/family.png"
            width={20}
            height={20}
            alt="add image"
            className="inline-block"
          />
          <span>Add Photo</span>
        </button>

        {/* Tag People */}
        <button
          type="button"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
        >
          <Image
            src="/family.png"
            width={20}
            height={20}
            alt="tag people"
            className="inline-block"
          />
          <span>Tag People</span>
        </button>
      </div>

      {/* Post Button */}
      <button
        onClick={handleSumit}
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
