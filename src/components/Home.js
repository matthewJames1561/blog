import CircuitBackground from "./CircuitBackground";
import Reveal from "./atoms/Reveal";



function Home() {
  
  return  <CircuitBackground><div style={{marginLeft: '3vw'}}>
  <Reveal>
    <div style={{marginBottom: '80px'}}>
      <h1 style={{fontSize: '8vw'}}>Hi. I'm Matthew</h1>
      <p style={{fontSize: '18px'}}>I'm a web developer, husband, and aspiring homesteader. This is my online play space.</p>
    </div>
  </Reveal>

  <Reveal>
    <BlogSection />
  </Reveal>
  
  </div>
  </CircuitBackground>

  }
  
export default Home;
  

function BlogSection() {
  return <div style={{margin: '10px'}}>
    <h1>Most Recent Blog Posts</h1>
    <hr></hr>
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Card />
      <Card />
      <Card />
    </div>
  </div>
}

function Card() {
  return <div className='card'>
  <div style={{  margin: '-20px -20px 0 -20px', borderRadius: '10px 10px 0 0', backgroundSize: 'cover', background: "url('https://placehold.co/400')", width: 'calc(100% + 40px)', height: '200px'}} ></div>
  <div style={{padding: '10px'}}>
    <h2>I built a house</h2>
    <br></br>
    <p>lorem ipsume dolore your mom likes to eat pizza and lots of construction materials...</p>
  </div>
</div>
}