/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MDEditor from "@uiw/react-md-editor"
import { useParams } from "react-router-dom"
import { useGetPublishedBlogById } from "../firebaseServices"
import Spinner from "./atoms/Spinner"
import { spacing, typography, colors, radius } from '../theme';

const containerCss = css`
  max-width: 900px;
  margin: 0 auto;
  padding: ${spacing['4xl']} ${spacing.xl};

  h1 {
    font-size: ${typography.fontSize['4xl']};
    font-weight: ${typography.fontWeight.bold};
    margin-bottom: ${spacing['2xl']};
    line-height: ${typography.lineHeight.tight};
    background: linear-gradient(135deg, ${colors.gold}, ${colors.pink}, ${colors.blue});
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, ${colors.gold}, ${colors.pink}, transparent);
    margin-bottom: ${spacing['3xl']};
  }
`;

const contentCss = css`
  background: ${colors.blackAlpha(0.3)};
  border-radius: ${radius.lg};
  padding: ${spacing['3xl']};
  line-height: ${typography.lineHeight.relaxed};

  * {
    max-width: 100%;
  }
`;

export default function BlogPost() {
    const { id } = useParams()
    const { data, error, loading } = useGetPublishedBlogById(id)
    if (loading) return <Spinner centered />

    return (
      <div css={containerCss}>
        <h1>{data.title}</h1>
        <hr />
        <div css={contentCss}>
          <MDEditor.Markdown source={data.content} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
      </div>
    );
}