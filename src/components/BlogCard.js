export default function BlogCard({ title, fromEdit = false, id, thumbnail, description }) {


    return <a className='card' href={fromEdit ? `/create/${id}`: `/blog/${id}` }>
        <div className={'card-image'} style={{ margin: '-20px -20px 0 -20px', borderRadius: '10px 10px 0 0', backgroundImage: `url(${thumbnail})`, width: 'calc(100% + 40px)', height: '150px' }} ></div>
        <div style={{ padding: '10px' }}>
            <h2>{title}</h2>
            <br></br>
            <p>{description?.substring(0, 80)}...</p>
        </div>
    </a>

}