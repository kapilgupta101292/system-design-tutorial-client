import fs from "fs";
import path from "path";
import Layout from "../components/Layout"
import matter from "gray-matter";
import Link from "next/link";
import Post from "../components/Post";
export default function Home({ posts }) {
  // console.log(` the post is ${JSON.stringify(posts)}`);
  return (
    <Layout>
      <h1 className="text-5xl bo)rder-b-4 p-5 font-bold">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) =>
         <Post key={index} post={post}/>)}
      </div>
      <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
          All Posts
        </a>
      </Link>
    </Layout>
  )
}


export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta);
    // console.log(frontmatter);
    return {
      frontmatter,
      slug
    }
  })


  // console.log(posts);

  return {
    props: {
      posts
    },
  }
}