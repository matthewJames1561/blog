import MDEditor from "@uiw/react-md-editor"
import { useParams } from "react-router-dom"
import { useGetPublishedBlogById } from "../firebaseServices"
import Spinner from "./atoms/Spinner"


export default function BlogPost() {
    const { id } = useParams()
    const { data, error, loading } = useGetPublishedBlogById(id)
    if (loading) return <Spinner centered />

    return <div>
        <div style={{margin: '0 auto', maxWidth:'800px'}}>
        <h1>{data.title}</h1>
        <hr></hr>
        <br></br>

        <MDEditor.Markdown source={data.content} style={{ whiteSpace: 'pre-wrap' ,padding:'20px'}}/> 
        </div>
    </div>
}