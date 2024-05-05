import { useGetTopThreePublishedBlogs } from "../firebaseServices";
import BlogCard from "./BlogCard";
import Reveal from "./atoms/Reveal";
import Spinner from "./atoms/Spinner";
import { useUser } from "./authComponents/AuthProvider";



function Home() {
  return <div>
    <Reveal>
      <div style={{ marginBottom: '0px' }}>
        <h1 style={{ fontSize: '8vw' }}>Hi. I'm Matthew</h1>
        <p style={{ fontSize: '18px' }}>I'm a web developer, husband, and aspiring homesteader. This is my online play space.</p>
      </div>
    </Reveal>
    <br></br>
    <BlogSection />
  </div>

}

export default Home;


function BlogSection() {

  const { data, error, loading } = useGetTopThreePublishedBlogs()


  return <div style={{ margin: '10px' }}>
    <h1>Most Recent Blog Posts</h1>
    <hr></hr>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {loading ? <Spinner /> : data?.map((blog) => {
        return <Reveal><BlogCard {...blog}></BlogCard></Reveal>
      })}
    </div>
  </div>
}

