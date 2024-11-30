"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form"; // Assuming you have a Form component for blog editing
import BlogForm from "@components/BlogForm";

const UpdateBlog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams?.get("id");

  const [post, setPost] = useState({ title: "", content: "", tags: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getBlogDetails = async () => {
      if (!blogId) return;

      try {
        const response = await fetch(`/api/blog/${blogId}`);
        if (!response.ok) throw new Error("Failed to fetch blog details");

        const data = await response.json();
        setPost({
          title: data.title,
          content: data.content,
          tags: data.tags.join(", "), // assuming tags are returned as an array
        });
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    getBlogDetails();
  }, [blogId]);

  const updateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!blogId) {
      alert("Missing BlogId!");
      return;
    }

    try {
      const response = await fetch(`/api/blog/${blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          tags: post.tags.split(",").map((tag) => tag.trim()), // splitting tags by comma
        }),
      });

      if (response.ok) {
        router.push("/"); // redirect to homepage or blog feed after update
      } else {
        throw new Error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogForm
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateBlog}
      />
    </Suspense>
  );
};

export default UpdateBlog;
