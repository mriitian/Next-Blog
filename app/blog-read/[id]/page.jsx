"use client";

import React, { use, Suspense, useState, useEffect } from "react";

const BlogPage = ({ params }) => {
  // Unwrapping the params using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams; // Safely access `id`

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center text-lg text-gray-600">Blog not found</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 space-y-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900">{blog.title}</h1>

      {/* Description */}
      <p className="text-lg text-gray-700">{blog.description}</p>

      {/* Author Info */}
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <h3 className="font-semibold text-gray-800">{blog.creator.username}</h3>
        <p>{blog.creator.email}</p>
      </div>

      {/* Content */}
      <div className="mt-6 space-y-4 text-lg text-gray-800">
        <p>{blog.content}</p>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <a
          href="/"
          className="inline-block bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
        >
          Back to Blogs
        </a>
      </div>
    </div>
  );
};

// Suspense Wrapper
const BlogRead = ({ params }) => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    }
  >
    <BlogPage params={params} />
  </Suspense>
);

export default BlogRead;
