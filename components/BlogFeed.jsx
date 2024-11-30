"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard"; // Assuming you have a BlogCard component

const BlogCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 blog_layout">
      {data.map((post) => (
        <BlogCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const BlogFeed = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchBlogs = async () => {
    const response = await fetch("api/blog");
    const data = await response.json();

    setAllBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filterBlogs = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allBlogs.filter(
      (item) =>
        regex.test(item.author.username) ||
        regex.test(item.title) ||
        regex.test(item.content) ||
        item.tags.some((tag) => regex.test(tag))
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterBlogs(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterBlogs(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a title, content, or tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Blogs */}
      {searchText ? (
        <BlogCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <BlogCardList data={allBlogs} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default BlogFeed;
