"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Form from "@components/Form"; // Assuming you have a Form component for blog editing

const UpdateBlog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [post, SetPost] = useState({ title: "", content: "", tags: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getBlogDetails = async () => {
      const response = await fetch(`/api/blog/${blogId}`);
      const data = await response.json();

      SetPost({
        title: data.title,
        content: data.content,
        tags: data.tags.join(", "), // assuming tags are returned as an array
      });
      console.log("Blog", post);
    };

    if (blogId) getBlogDetails();
  }, [blogId]);

  const updateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!blogId) return alert("Missing BlogId!");

    try {
      const response = await fetch(`/api/blog/${blogId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          tags: post.tags.split(",").map((tag) => tag.trim()), // splitting tags by comma
        }),
      });

      if (response.ok) {
        router.push("/"); // redirect to homepage or blog feed after update
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        SetPost={SetPost}
        submitting={submitting}
        handleSubmit={updateBlog}
      />
    </Suspense>
  );
};

export default UpdateBlog;
