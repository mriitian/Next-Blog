import Link from "next/link";
import React from "react";

const BlogForm = ({ type, post, SetPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Blog</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing blogs with insightful content on any topic you
        choose.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Blog Title
          </span>
          <input
            type="text"
            value={post.title}
            onChange={(e) => SetPost({ ...post, title: e.target.value })}
            placeholder="Enter the title of your blog"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Blog Content
          </span>
          <textarea
            value={post.content}
            onChange={(e) => SetPost({ ...post, content: e.target.value })}
            placeholder="Write the content of your blog here"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Tags{" "}
            <span className="font-normal">
              (e.g., #technology, #life, #health)
            </span>
          </span>
          <input
            type="text"
            value={post.tags}
            onChange={(e) => SetPost({ ...post, tags: e.target.value })}
            placeholder="Add tags"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Published
          </span>
          <select
            value={post.published}
            onChange={(e) => SetPost({ ...post, published: e.target.value })}
            className="form_input"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>

        <div className="flex flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BlogForm;
