"use client";
import { useEffect, useState } from "react";
import PostForm from "@/components/PostForm";

import ShowPost from "@/components/ShowPost";
const Page = () => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState(true);
  const [savePosts, setSavePosts] = useState([]);
  const [showSavePosts, setShowSavePosts] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [like, setLike] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [toggleComment, setToggleComment] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("api/post", {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await fetch("api/savedPost", {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();

          setSavePosts(data.savedPosts);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedPosts();
  }, []);

  console.log(savePosts);

  // Function to handle new post submission
  const getPostInfo = async (postContent) => {
    if (postContent.trim()) {
      // Ensure the post is not empty
      const newPost = {
        content: postContent,
      };

      try {
        const res = await fetch("api/post", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newPost),
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data from MongoDB");
        }
        const data = await res.json();
        console.log("successfully add a new post", data);
        setPosts((prevPosts) => [data.post, ...prevPosts]);
        setIsCreatingPost(false);
      } catch (err) {
        console.log("Error adding a new post:", err);
      }
    }
  };

  const createPost = () => {
    setIsCreatingPost((prev) => !prev);
    setDisplayPosts(true);
    setShowSavePosts(false);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const handleLike = (postId) => {
    setLike((prev) => ({
      ...prev,
      [postId]: !prev[postId], 
    }));
  };

  const handleComment = (postId) => {
    setToggleComment((prveState)=> ({
      ...prveState,
      [postId]: !prveState[postId]
    }));
  };

  const handleSave = async (id) => {
    try {
      const postToSave = posts.find((post) => post._id === id);
      if (!postToSave) {
        console.log("post not found");
        return;
      }

      const res = await fetch("api/savedPost", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ savedPost: postToSave }),
      });

      if (!res.ok) {
        console.log("it doesnot successfully saved post");
      }

      const data = await res.json();
      setSavePosts((prev) => [...prev, data.savedPost]);
      setOpenDropdown(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnSave = async (id) => {
    try {
      const res = await fetch(`api/savedPost/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("failed to delete the saved post");
      }
      const data = await res.json();
      setSavePosts((prevSavedPosts) =>
        prevSavedPosts.filter((post) => post._id != id)
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowSavePosts = () => {
    setShowSavePosts((prev) => !prev);
    setDisplayPosts((prev) => !prev);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`api/post/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("failed to delete the post");
      }

      const data = await res.json();

      setPosts((prevPosts) => prevPosts.filter((post) => post._id != id));
      console.log("Deleted post successfully:", data);
      setOpenDropdown(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = (comment) => {
    console.log("come from comment component " ,comment);
    setComments((prev)=>[...prev, comment])
  }

  return (
    <div className="flex flex-col items-center mt-10 space-y-6">
      <nav className="bg-slute-200 p-4 rounded-lg shadow-lg w-full max-w-md flex justify-around">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={createPost}
        >
          Create New Post
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={handleShowSavePosts}
        >
          Saved Posts
        </button>
      </nav>
      {/* Post Form Section */}
      {isCreatingPost && (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
          <PostForm getPostInfo={getPostInfo} />
        </div>
      )}

      {showSavePosts && (
        <div className="space-y-4 w-full max-w-md">
          {savePosts.length > 0 &&
            savePosts.map((post, index) => (
              <div
                key={post._id || index}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-md"
              >
                {/* Post Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={"/family.png"}
                    alt={"User"}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">kevin</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div>
                  <p className="text-gray-800 text-sm">{post.content}</p>
                </div>

                {/* Post Footer */}
                <div className="flex items-center justify-end mt-4">
                  <button
                    className="text-blue-500 text-sm font-semibold hover:underline"
                    onClick={() => handleUnSave(post._id)}
                  >
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
          comments={comments}
          handleDelete={handleDelete}
          openDropdown={openDropdown}
          handleLike={handleLike}
          handleComment={handleComment}
          like={like}
          toggleComment={toggleComment}
          getComments={getComments}
        />
      )}
    </div>
  );
};

export default Page;
