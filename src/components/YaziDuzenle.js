import React, { useEffect, useState } from 'react'
import YaziFormu from './YaziFormu'
import axios from './axios'


const YaziDuzenle = (props) => {
  const [post,setPost] = useState({})
  const { id } = props.match.params

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(resp => setPost({ title : resp.data.title, content : resp.data.content}))
      .catch(err => console.log(err))
    }, [])
    
  return (
    <div>
      <h2>Yazi Düzenle</h2>
      <YaziFormu post = {post} />
    </div>
  )
}

export default YaziDuzenle