import BlogFeed from "@components/BlogFeed";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Create and Share
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center">Blog Posts</span>
      </h1>
      <p className="desc text-center">
        Discover, Create and Share the Personal and Professional Blogs
      </p>

      <BlogFeed />
    </section>
  );
};

export default Home;
