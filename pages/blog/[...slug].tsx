import React from "react";
import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();
  router.query; // { slug: ['blog', 'post1'] }
  // console.log(router.query); // keyword after / in url is stored in array

  return <div>Blog posts page.</div>;
}

export default BlogPostsPage;
