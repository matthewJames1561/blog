import MDEditor from "@uiw/react-md-editor";
import React, { useCallback, useState } from "react";
import StyledButton from "./atoms/StyledButton";
import StyledInput from "./atoms/StyledInput";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlogPost, publishBlog, saveBlog, useGetSavedBlogById } from "../firebaseServices";
import Spinner from "./atoms/Spinner";


function CreateBlog() {
    const { id } = useParams()
    const { data, error, loading } = useGetSavedBlogById(id)
    if (loading) return <Spinner centered />
    return <CreateBlogInner data={data} id={id} />
}

export default CreateBlog;

function CreateBlogInner({ data, id }) {
    const [content, setContent] = useState(data?.content);
    const [title, setTitle] = useState(data?.title);
    const [thumbnail, setThumbnail] = useState(data?.thumbnail);
    const [description, setDescription] = useState(data?.description)
    const navigate = useNavigate()

    const handleSave = useCallback(async () => {
        const postData = {
            title,
            content,
            thumbnail,
            timestamp: Date.now(),
            description
        }
        await saveBlog(id, postData).catch((e) => {
            alert(e)
        })

        navigate('/edit')
    }, [content, description, id, navigate, thumbnail, title])

    const handlePublish = useCallback(async () => {
        handleSave()
        const postData = {
            title,
            content,
            thumbnail,
            timestamp: Date.now(),
            description
        }

        await publishBlog(id, postData).catch((e) => {
            alert(e)
        })

        navigate('/blog')
    }, [content, description, handleSave, id, navigate, thumbnail, title])

    const handleDelete = useCallback(async () => {
        await deleteBlogPost(id).catch((e) => {
            alert(e)
        })

        navigate('/blog')
    }, [id, navigate])

    return (
        <div className="container" data-color-mode="dark">
            <StyledInput style={{ marginBottom: '30px' }} initialValue={title} name='postTitle' label={'Post Title'} onChange={setTitle} fullWidth></StyledInput>
            <StyledInput style={{ marginBottom: '30px' }} initialValue={thumbnail} name='thumbnailUrl' label={'Thumb URL'} onChange={setThumbnail} fullWidth></StyledInput>
            <StyledInput style={{ marginBottom: '30px' }} initialValue={description} name='description' label={'Description'} onChange={setDescription} fullWidth></StyledInput>
            <div style={{fontFamily: 'sans-serif'}}>
                <MDEditor
                    height={'200px'}
                    value={content}
                    onChange={setContent}
            
                />
            </div>
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'end', flexWrap: 'wrap' }}>
                    <div className="padding-10">
                        <StyledButton className={'padding-10'}onClick={handleDelete}>Delete</StyledButton>
                    </div>
                    <div className="padding-10">
                        <StyledButton className={'padding-10'} onClick={handleSave}>Save</StyledButton>
                    </div>
                    <div className="padding-10">
                        <StyledButton className={'padding-10'} onClick={handlePublish}>Publish</StyledButton>
                    </div>
                </div>
            </div>
        </div>
    )
}