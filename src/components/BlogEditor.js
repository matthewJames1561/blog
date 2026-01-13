/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Spinner from './atoms/Spinner';
import BlogCard from './BlogCard';
import { useGetAllSavedBlogs } from '../firebaseServices';
import { spacing, typography, colors } from '../theme';

const containerCss = css`
  h1 {
    font-size: ${typography.fontSize['3xl']};
    font-weight: ${typography.fontWeight.bold};
    margin-bottom: ${spacing.xl};
  }

  hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, ${colors.gold}, ${colors.pink}, transparent);
    margin-bottom: ${spacing['3xl']};
  }
`;

const blogWrapperCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${spacing['3xl']};
  padding: ${spacing.xl} 0;
  align-items: stretch;
`;

export default function BlogEditor() {
    const { data, error, loading } = useGetAllSavedBlogs()

    return (
      <div css={containerCss}>
        <h1>Choose a saved post to edit</h1>
        <hr />

        {loading ? <Spinner /> : (
          <div css={blogWrapperCss}>
            {data?.map((post) => {
              return <BlogCard key={post?.id} {...post} fromEdit />
            })}
          </div>
        )}
      </div>
    );
}