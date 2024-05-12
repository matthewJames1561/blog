/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Spinner from './atoms/Spinner';
import BlogCard from './BlogCard';
import { useGetAllSavedBlogs } from '../firebaseServices';

const blogWrapperCss = css`
  display: flex;
`
export default function BlogEditor() {
    const { data, error, loading } = useGetAllSavedBlogs()

    return <div>
        <h1>Choose a saved post to edit</h1>
        <hr></hr>

        {loading ? <Spinner/> : <div css={blogWrapperCss}>
            {data?.map((post) => {
                return <BlogCard key={post?.id} {...post} fromEdit></BlogCard>
            })}
        </div>}
    </div>
}