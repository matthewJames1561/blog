/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useGetAllPublishedBlogs, } from "../firebaseServices";
import BlogCard from "./BlogCard";
import Spinner from "./atoms/Spinner";

const blogWrapperCss = css`
  display: flex;
`

function Blog() {

  const { data, error, loading } = useGetAllPublishedBlogs()
  if (loading) {
    return <Spinner centered />
  }

  return <div css={blogWrapperCss}>
    {data?.map((post) => {
      return <BlogCard {...post}></BlogCard>
    })}
  </div>
}

export default Blog;
