import React, { useState, useEffect } from 'react'
import axios from './axios'
import { withRouter } from "react-router-dom";

const DEFAULT_YAZI = {
  title: "",
  content: ""
}

const YaziFormu = (props) => {

  const [yazi, setYazi] = useState(DEFAULT_YAZI)
  const [hata, setHata] = useState("")

  
  const handleChange = (e) => {
    setYazi({ ...yazi, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setHata("")

    //edit
    if (props.post?.title) {
      axios
      .put(`/posts/${props.match.params.id}`, yazi)
      .then(resp => {
        props.history.push("/")
      })
      .catch(err => setHata(err.response.data.errorMessage))
    } //post
    else {
      axios
      .post('/posts', yazi)
      .then(resp => {
        props.history.push("/")
      })
      .catch(err => setHata(err.response.data.errorMessage))
    }
  }
  useEffect(() => {
    if (props.post?.title) setYazi(props.post)
  }, [props.post])
  
  // useEffect(() => {
  //   if (props.post?.title && props.post?.content) setYazi(props.post);
  // }, [props.post]);
  return (
    <>
      <div className="ui form">
        <div className="field">
          <label htmlFor="title">Yazı Başlığı</label>
          <input
            name="title"
            type="text"
            value={yazi.title}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="content">Yazı İçeriği</label>
          <textarea
            name="content"
            rows="3"
            value={yazi.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="ui primary button" onClick={handleSubmit}>Gönder</button>
        <button className="ui secondary button">İptal Et</button>
      </div>
      {hata && (
        <div className="ui error message">
          <div className="header">Bir şeyler ters gitti</div>
          <p>{hata}</p>
        </div>
      )}
    </>
  )
}

export default withRouter(YaziFormu)
