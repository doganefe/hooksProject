import React, { useState, useEffect } from 'react'
import axios from 'axios'
import YaziYorumlari from './YaziYorumlari'
import { Link } from 'react-router-dom'
import SilModal from './SilModal'

function Yazi(props) {
  const { id } = props.match.params
  //state tanimlamalari
  const [yazi, setYazi] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [yorumlar, setYorumlar] = useState([])

  //componentDidMount  yorumları ve postları id'ye göre al
  useEffect(() => {
    axios.all([
      axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
      axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
    ])
      .then(resp => {
        setYazi(resp[0].data)
        setYorumlar(resp[1].data)
      })
      .catch(err => console.log(err))
      .then(setIsVisible(true))
  }, [])

  //post ekleme
  const handleSubmit = (e, commentBody) => {
    e.preventDefault()
    axios.post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`, commentBody)
      .then(resp => {
        setYorumlar([...yorumlar, resp.data])
      }).catch(err => console.log(err))
  }
  if (isVisible) return (
    <>
      <h2 className="ui header">{yazi.title}</h2>
      <p>{yazi.created_at}</p>
      <Link to={`/posts/${id}/edit`} className="ui blue button">Degistir</Link>
      <SilModal post={yazi} history = {props.history}/>
      <p>{yazi.content}</p>
      <h2>Yorumlar</h2>
      <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleSubmit} />
    </>
  ); else return (
    <div className="ui active transition visible inverted dimmer">
      <div className="content"><div className="ui inverted text loader">Loading</div></div>
    </div>
  );
}


export default Yazi