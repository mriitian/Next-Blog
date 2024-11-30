"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const BlogCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.title); // Copy blog title instead of the entire content
    navigator.clipboard.writeText(post.title);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCardClick = () => {
    router.push(`/blog-read/${post._id}`);
  };

  return (
    <div className="blog_card" onClick={handleCardClick}>
      {" "}
      {/* Add this click handler */}
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.title
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.title ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <h3 className="my-4 font-satoshi text-xl text-gray-900">{post.title}</h3>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.description}
      </p>
      {post.tags && post.tags.length > 0 && (
        <div className="tags">
          {post.tags.map((tag, index) => (
            <p
              key={index}
              className="font-inter text-sm blue_gradient cursor-pointer"
              onClick={() => handleTagClick && handleTagClick(tag)}
            >
              #{tag}
            </p>
          ))}
        </div>
      )}
      <p className="font-inter text-sm text-gray-500">{post.date}</p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogCard;