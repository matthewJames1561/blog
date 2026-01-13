/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useGetAllPublishedBlogs } from "../firebaseServices";
import BlogCard from "./BlogCard";
import Spinner from "./atoms/Spinner";
import Reveal from './atoms/Reveal';
import { spacing } from '../theme';

const blogWrapperCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${spacing['3xl']};
  padding: ${spacing['4xl']};
  align-items: stretch;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: ${spacing.xl};
    padding: ${spacing.xl} ${spacing.md};
  }
`

function Blog() {

  const { data, loading } = useGetAllPublishedBlogs()
  if (loading) {
    return <Spinner centered />
  }

  return <div css={blogWrapperCss}>
    {data?.map((post) => {
      return <Reveal key={post.id} allowOverflow={true}>
        <BlogCard {...post}></BlogCard>
      </Reveal>
    })}
  </div>
}

export default Blog;
