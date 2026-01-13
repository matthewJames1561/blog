/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import MDEditor from "@uiw/react-md-editor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import StyledButton from "./atoms/StyledButton";
import StyledInput from "./atoms/StyledInput";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlogPost, publishBlog, saveBlog, useGetSavedBlogById } from "../firebaseServices";
import Spinner from "./atoms/Spinner";
import { colors, spacing, typography, radius, shadows, transitions, gradients } from '../theme';

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
`;

const slideInMobile = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOutMobile = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100px);
    opacity: 0;
  }
`;

const toastCss = (isVisible, color) => css`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 16px 24px;
  background: rgba(18, 9, 41, 0.95);
  border: 2px solid ${color};
  border-radius: 12px;
  color: ${color};
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4),
              0 0 20px ${color}40;
  z-index: 10000;
  animation: ${isVisible ? slideIn : slideOut} 0.3s ease-out forwards;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    left: 20px;
    padding: 12px 16px;
    font-size: 13px;
    animation: ${isVisible ? slideInMobile : slideOutMobile} 0.3s ease-out forwards;
  }
`;

const containerCss = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing['4xl']} ${spacing.xl};

  @media (max-width: 768px) {
    padding: ${spacing['2xl']} ${spacing.md};
  }
`;

const headerCss = css`
  margin-bottom: ${spacing['4xl']};
  text-align: center;

  h1 {
    font-size: ${typography.fontSize['4xl']};
    font-weight: ${typography.fontWeight.bold};
    background: ${gradients.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${spacing.md};
    animation: fadeIn 0.6s ease-out;
  }

  p {
    font-size: ${typography.fontSize.xl};
    color: ${colors.whiteAlpha(0.7)};
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: ${typography.fontSize['3xl']};
    }
    p {
      font-size: ${typography.fontSize.lg};
    }
  }
`;

const formSectionCss = css`
  background: ${colors.blackAlpha(0.3)};
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.xl};
  padding: ${spacing['3xl']};
  margin-bottom: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  transition: ${transitions.normal};

  &:hover {
    border-color: ${colors.whiteAlpha(0.2)};
    box-shadow: ${shadows.xl};
  }

  @media (max-width: 768px) {
    padding: ${spacing.xl};
  }
`;

const editorContainerCss = css`
  background: ${colors.blackAlpha(0.3)};
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.xl};
  padding: ${spacing['2xl']};
  margin-top: ${spacing['2xl']};
  box-shadow: ${shadows.lg};
  transition: ${transitions.normal};

  &:hover {
    border-color: ${colors.whiteAlpha(0.2)};
  }

  @media (max-width: 768px) {
    padding: ${spacing.md};
  }
`;

const buttonGroupCss = css`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.md};
  margin-top: ${spacing['3xl']};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const actionButtonCss = (variant = 'default', disabled = false) => css`
  padding: ${spacing.md} ${spacing['2xl']};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${radius.lg};
  border: 2px solid;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  transition: ${transitions.bouncy};
  opacity: ${disabled ? 0.5 : 1};

  ${variant === 'delete' && `
    background: ${colors.blackAlpha(0.3)};
    border-color: ${colors.red};
    color: ${colors.red};

    &:hover:not(:disabled) {
      background: ${colors.red};
      color: ${colors.white};
      box-shadow: 0 0 30px ${colors.red}60;
      transform: translateY(-2px);
    }
  `}

  ${variant === 'save' && `
    background: ${colors.blackAlpha(0.3)};
    border-color: ${colors.blue};
    color: ${colors.blue};

    &:hover:not(:disabled) {
      background: ${colors.blue};
      color: ${colors.white};
      box-shadow: 0 0 30px ${colors.blue}60;
      transform: translateY(-2px);
    }
  `}

  ${variant === 'publish' && `
    background: ${gradients.primary};
    border-color: transparent;
    color: ${colors.white};

    &:hover:not(:disabled) {
      box-shadow: 0 0 40px ${colors.gold}80;
      transform: translateY(-2px) scale(1.05);
    }
  `}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    flex: 1;
    min-width: 120px;
  }
`;

function CreateBlog() {
    const { id } = useParams()
    const { data, loading } = useGetSavedBlogById(id)
    if (loading) return <Spinner centered />
    return <CreateBlogInner data={data} id={id} />
}

export default CreateBlog;

function CreateBlogInner({ data, id }) {
    const [content, setContent] = useState(data?.content);
    const [title, setTitle] = useState(data?.title);
    const [thumbnail, setThumbnail] = useState(data?.thumbnail);
    const [description, setDescription] = useState(data?.description)
    const [saving, setSaving] = useState(false)
    const [publishing, setPublishing] = useState(false)
    const [autosaveStatus, setAutosaveStatus] = useState('idle') // 'idle', 'saving', 'saved', 'error'
    const navigate = useNavigate()
    const autosaveTimerRef = useRef(null)

    // Autosave effect - triggers 2 seconds after user stops typing
    useEffect(() => {
        // Only autosave if we have an existing ID (editing mode)
        if (!id || !title || !content) {
            return
        }

        // Clear any existing timer
        if (autosaveTimerRef.current) {
            clearTimeout(autosaveTimerRef.current)
        }

        // Set new timer for autosave
        autosaveTimerRef.current = setTimeout(async () => {
            setAutosaveStatus('saving')
            try {
                const postData = {
                    title,
                    content,
                    thumbnail,
                    timestamp: Date.now(),
                    description
                }
                await saveBlog(id, postData)
                setAutosaveStatus('saved')
                // Reset to idle after 2 seconds
                setTimeout(() => setAutosaveStatus('idle'), 2000)
            } catch (error) {
                console.error('Autosave error:', error)
                setAutosaveStatus('error')
                setTimeout(() => setAutosaveStatus('idle'), 3000)
            }
        }, 2000) // Debounce for 2 seconds

        // Cleanup function
        return () => {
            if (autosaveTimerRef.current) {
                clearTimeout(autosaveTimerRef.current)
            }
        }
    }, [content, title, thumbnail, description, id])

    const handleSave = useCallback(async () => {
        if (!title || !content) {
            alert('Please provide at least a title and content before saving.')
            return
        }

        // Clear autosave timer when manually saving
        if (autosaveTimerRef.current) {
            clearTimeout(autosaveTimerRef.current)
        }

        setSaving(true)
        setAutosaveStatus('idle')
        try {
            const postData = {
                title,
                content,
                thumbnail,
                timestamp: Date.now(),
                description
            }
            await saveBlog(id, postData)
            navigate('/edit')
        } catch (error) {
            console.error('Error saving blog:', error)
            alert(`Failed to save blog post: ${error.message || 'Unknown error'}`)
        } finally {
            setSaving(false)
        }
    }, [content, description, id, navigate, thumbnail, title])

    const handlePublish = useCallback(async () => {
        if (!title || !content) {
            alert('Please provide at least a title and content before publishing.')
            return
        }

        // Clear autosave timer when manually publishing
        if (autosaveTimerRef.current) {
            clearTimeout(autosaveTimerRef.current)
        }

        setPublishing(true)
        setAutosaveStatus('idle')
        try {
            const postData = {
                title,
                content,
                thumbnail,
                timestamp: Date.now(),
                description
            }
            await saveBlog(id, postData)
            await publishBlog(id, postData)
            alert('Blog post published successfully!')
            navigate('/blog')
        } catch (error) {
            console.error('Error publishing blog:', error)
            alert(`Failed to publish blog post: ${error.message || 'Unknown error'}`)
        } finally {
            setPublishing(false)
        }
    }, [content, description, id, navigate, thumbnail, title])

    const handleDelete = useCallback(async () => {
        if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            return
        }

        try {
            await deleteBlogPost(id)
            navigate('/blog')
        } catch (error) {
            console.error('Error deleting blog:', error)
            alert(`Failed to delete blog post: ${error.message || 'Unknown error'}`)
        }
    }, [id, navigate])

    const getAutosaveMessage = () => {
        switch (autosaveStatus) {
            case 'saving':
                return { text: 'Saving...', color: '#FFA500', icon: '⏳' }
            case 'saved':
                return { text: 'All changes saved', color: '#4CAF50', icon: '✓' }
            case 'error':
                return { text: 'Autosave failed', color: '#FF4444', icon: '✕' }
            default:
                return null
        }
    }

    const autosaveMessage = getAutosaveMessage()

    return (
        <div css={containerCss} data-color-mode="dark">
            {/* Toast notification for autosave status */}
            {id && autosaveMessage && (
                <div css={toastCss(true, autosaveMessage.color)}>
                    <span>{autosaveMessage.icon}</span>
                    <span>{autosaveMessage.text}</span>
                </div>
            )}

            {/* Header */}
            <div css={headerCss}>
                <h1>{id ? 'Edit Blog Post' : 'Create New Post'}</h1>
                <p>{id ? 'Make changes to your blog post' : 'Share your thoughts with the world'}</p>
            </div>

            {/* Form Section */}
            <div css={formSectionCss}>
                <StyledInput
                    style={{ marginBottom: spacing['2xl'] }}
                    initialValue={title}
                    name='postTitle'
                    label={'Post Title'}
                    onChange={setTitle}
                    fullWidth
                />
                <StyledInput
                    style={{ marginBottom: spacing['2xl'] }}
                    initialValue={thumbnail}
                    name='thumbnailUrl'
                    label={'Thumbnail URL'}
                    onChange={setThumbnail}
                    fullWidth
                />
                <StyledInput
                    initialValue={description}
                    name='description'
                    label={'Description'}
                    onChange={setDescription}
                    fullWidth
                />
            </div>

            {/* Editor Section */}
            <div css={editorContainerCss}>
                <MDEditor
                    height={'500px'}
                    value={content}
                    onChange={setContent}
                />
            </div>

            {/* Action Buttons */}
            <div css={buttonGroupCss}>
                {id && (
                    <button
                        css={actionButtonCss('delete', saving || publishing)}
                        onClick={handleDelete}
                        disabled={saving || publishing}
                    >
                        Delete
                    </button>
                )}
                <button
                    css={actionButtonCss('save', saving || publishing)}
                    onClick={handleSave}
                    disabled={saving || publishing}
                >
                    {saving ? 'Saving...' : 'Save Draft'}
                </button>
                <button
                    css={actionButtonCss('publish', saving || publishing)}
                    onClick={handlePublish}
                    disabled={saving || publishing}
                >
                    {publishing ? 'Publishing...' : 'Publish'}
                </button>
            </div>
        </div>
    )
}