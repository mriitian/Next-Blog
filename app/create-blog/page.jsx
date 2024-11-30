"use client";

import BlogForm from "@components/BlogForm";
import Form from "@components/Form"; // Assuming you have a Form component for blog creation
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateBlog = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, SetSubmitting] = useState(false);
  const [post, SetPost] = useState({
    title: "",
    content: "",
    description: "",
    tags: "",
  });

  const createBlog = async (e) => {
    e.preventDefault();
    SetSubmitting(true);
    try {
      const response = await fetch("api/blog/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          title: post.description,
          content: post.content,
          userId: session?.user.id,
          tags: post.tags.split(",").map((tag) => tag.trim()), // split tags by comma and trim spaces
        }),
      });

      if (response.ok) {
        router.push("/"); // Redirect to homepage or blog feed
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetSubmitting(false);
    }
  };

  return (
    <BlogForm
      type="Create"
      post={post}
      SetPost={SetPost}
      submitting={submitting}
      handleSubmit={createBlog}
    />
  );
};

export default CreateBlog;
