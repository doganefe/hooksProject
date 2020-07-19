import React, { useState, useEffect } from 'react'
import axios from './axios'
const YorumListesi = (props) => {
  const [yorumlar, setYorumlar] = useState([])
  const [yorumMetni, setYorumMetni] = useState("")

  useEffect(() => {
    const yorumList = props.yorumlar.map(yorum => {
      return {
        ...yorum,
        isVisible: false
      }
    })
    setYorumlar(yorumList)

    console.log("useEffect cagirildi")
  }, [props.yorumlar])



  const handleSubmit = (id, icerik, gercekId) => {

    let newYorumlar = [...yorumlar]
    newYorumlar[id].isVisible = !newYorumlar[id].isVisible
    setYorumlar(newYorumlar)
    setYorumMetni(icerik)

    console.log(yorumlar)

  }

  const handleDelete = (id, post_id) => {
    axios
      .delete(`posts/${post_id}/comments/${id}`)
      .then(resp => {
        console.log(resp.data)
        window.location.reload(false)
      })
      .catch(err => console.log(err))
  }

  const handleSave = (id, post_id, display_name, yorumId) => {
    const obj = {
      display_name: display_name,
      body: yorumMetni
    }

    let yorumlarFake = [...yorumlar];
    Object.assign(yorumlarFake.find(b => b.id === id), { body: yorumMetni });
    setYorumlar(yorumlarFake);

    let newState = [...yorumlar]
    newState[yorumId].isVisible = !newState[yorumId].isVisible
    setYorumlar(newState)

    axios
      .put(`posts/${post_id}/comments/${id}`, obj)
      .then(resp => console.log(resp.data))
      .catch(err => console.log(err))
  }


  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {yorumlar.map((yorum, _) => {
        return (
          <div key={yorum.id + yorum.post_id} className="comment">
            <div className="content">
              <a className="author" href=" ">{yorum.display_name}</a>
              <div className="metadata"><div>{yorum.created_at}</div></div>
              <div className="text">{yorum.body}</div>
              <div className="actions">
                <span onClick={() => handleDelete(yorum.id, yorum.post_id)}>Delete <i className="delete icon"></i></span>
                <span onClick={() => handleSubmit(_, yorum.body, yorum.id)}>Edit<i className="edit icon"></i></span>
              </div>
            </div>
            {
              yorum.isVisible && (
                <div className="ui input">
                  <input
                    type="text"
                    placeholder="Yeni yorumu giriniz"
                    value={yorumMetni}
                    style={{ marginRight: "5px" }}
                    onChange={(e) => setYorumMetni(e.target.value)} />
                  <button
                    onClick={() => handleSave(yorum.id, yorum.post_id, yorum.display_name, _)}
                    className="ui button red"
                  >Kaydet</button>
                </div>
              )
            }
          </div>
        )
      })
      }
    </div>
  )
}
export default YorumListesi
