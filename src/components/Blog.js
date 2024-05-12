/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useGetAllPublishedBlogs, } from "../firebaseServices";
import BlogCard from "./BlogCard";
import Spinner from "./atoms/Spinner";
import Reveal from './atoms/Reveal';

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
      return <Reveal>
        <BlogCard {...post}></BlogCard>
      </Reveal>
    })}
  </div>
}

export default Blog;
