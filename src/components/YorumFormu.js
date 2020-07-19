import React, { useState } from 'react'


const DEFAULT_YORUM = {
  display_name: "",
  body: "",
}
const YorumFormu = (props) => {
  const [commentBody, setCommentBody] = useState(DEFAULT_YORUM)

  const handleInputChange = e => {
    setCommentBody({ ...commentBody, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h3>Yorum Yaz</h3>
      <form
        className="ui form"
        onSubmit={e => {
          props.handleSubmit(e, commentBody);
          setCommentBody(DEFAULT_YORUM);
        }}
      >
          <div className="ui input">
            <input
              name="display_name"
              type="text"
              placeholder="Adınız"
              value={commentBody.display_name}
              onChange={handleInputChange}
            /></div>
          <textarea
            name="body"
            placeholder="Tell us more"
            rows="3"
            value={commentBody.body}
            onChange={handleInputChange}
          ></textarea>
          <button className="ui primary button">Gönder</button>
      </form>
    </div>
  )
}

export default YorumFormu
