import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const fetchPosts = async (page) => {
  const { data } = await axios.get("/posts", {
    params: { page, limit: 6 },
  });
  return data;
};

const votePost = async ({ postId, voteType }) => {
  const response = await axios.post("/api/vote", {
    postId,
    voteType, 
  });
  return response.data;
};

const Forum = () => {
  const [page, setPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); 

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts", page],  
    queryFn: () => fetchPosts(page), 
    keepPreviousData: true,  
  });

  const mutation = useMutation({
    mutationFn: votePost,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["posts", page]); 
    },
    onError: (err) => {
      alert("Failed to vote on the post.");
    },
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= data?.totalPages) {
      setPage(newPage);
    }
  };

  const onVote = (postId, voteType) => {
    if (!isLoggedIn) {
      alert("Please log in to vote!");
      navigate("/login"); 
      return;
    }

    mutation.mutate({ postId, voteType });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Failed to fetch posts: {error.message}</div>;

  return (
    <div className="forum-container">
      <h1>Forum</h1>

      {data?.posts?.length > 0 ? (
        data.posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="votes">
              <button onClick={() => onVote(post.id, "upvote")}>Upvote</button>
              <span>{post.upvotes} Upvotes</span>
              <button onClick={() => onVote(post.id, "downvote")}>Downvote</button>
              <span>{post.downvotes} Downvotes</span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {data?.totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === data?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Forum;
