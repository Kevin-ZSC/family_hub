"use client";
import { use, useState } from "react";
import PostForm from "@/components/PostForm";

import ShowPost from "@/components/ShowPost";
const Page = () => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState(true)
  const [savePosts, setSavePosts] =useState([]);
  const [showSavePosts, setShowSavePosts] = useState(false)
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [toggleComment, setToggleComment] = useState(false);
  const [comments, setComments] = useState([]);

  // Function to handle new post submission
  const getPostInfo = (postContent) => {
    if (postContent.trim()) {
      // Ensure the post is not empty
      const newPost = {
        content: postContent,
        timestamp: new Date().toISOString(),
      };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setIsCreatingPost(false)
    }
  };

  const createPost = () => {
    setIsCreatingPost((prev) => !prev)
    setDisplayPosts(true)
    setShowSavePosts(false)
  }

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const handleLike = () => {
    setLike((prev)=>!prev);
  };

  const handleComment = () => {
    setToggleComment((prev) => !prev)
  };

  const handleSave = (post) => {
    console.log("Saved post:", post);
    setSavePosts((prev) => [...prev, post])
    setOpenDropdown(false)
    
  };

  const handleUnSave = (index) => {
    const newPostList = savePosts.filter((_,i) => i !== index);
    setSavePosts(newPostList)
  }

  const handleShowSavePosts = () => {
    setShowSavePosts((prev)=> !prev)
    setDisplayPosts(showSavePosts)
  };

  const handleEdit = (post) => {
    console.log("Edit post:", post);
  };

  const handleEditAudience = (post) => {
    console.log("Edit Audience:", post);
  };

  const handleDelete = (post) => {
    console.log("Deleted post:", post);
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-6">

    <nav className="bg-slute-200 p-4 rounded-lg shadow-lg w-full max-w-md flex justify-around">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={createPost}>
          Create New Post
        </button>
        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition" onClick={handleShowSavePosts}>
          Saved Posts
        </button>
      </nav>
      {/* Post Form Section */}
      { isCreatingPost &&
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
          <PostForm getPostInfo={getPostInfo} /> 
        </div>
      }

{showSavePosts && (
  <div className="space-y-4 w-full max-w-md">
    {savePosts.length > 0 && savePosts.map((post, index) => (
      <div
        key={index}
        className="bg-white border border-gray-300 rounded-lg p-4 shadow-md"
      >
        {/* Post Header */}
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={post.avatar || "/family.png"}
            alt={post.author || "User"}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900">kevin</p>
            <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
          </div>
        </div>

        {/* Post Content */}
        <div>
          <p className="text-gray-800 text-sm">{post.content}</p>
        </div>

        {/* Post Footer */}
        <div className="flex items-center justify-end mt-4">
          <button className="text-blue-500 text-sm font-semibold hover:underline" onClick={()=>handleUnSave(index)}>
            unSave
          </button>
        </div>
      </div>
    ))}
  </div>
)}

      {/* Posts List Section */}
      {displayPosts && (
        <ShowPost
          posts={posts}
          toggleDropdown={toggleDropdown}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleEditAudience={handleEditAudience}
          handleDelete={handleDelete}
          openDropdown={openDropdown}
          handleLike={handleLike}
          handleComment={handleComment}
          like={like}
          toggleComment={toggleComment}
        />
      )}
    </div>
  );
};

export default Page;
