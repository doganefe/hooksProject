import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function YaziListesi() {

  const [yaziListesi, setYaziListesi] = useState([])

  useEffect(() => {
    axios
      .get('https://react-yazi-yorum.herokuapp.com/posts')
      .then(resp => setYaziListesi(resp.data))
  }, [])

  return (
    <div className="ui relaxed divided list">
        <Link to="/yaziekle"><button className="ui button primary">Yazı ekle</button></Link>
      {yaziListesi.map(yazi => {
        return (
          <div className="item" key={yazi.id}>
            <i className="large github middle aligned icon"></i>
            <div className="content">
              <Link to={`/posts/${yazi.id}`} className="header">{yazi.title}</Link>
              <div className="description">{yazi.created_at}</div>
            </div>
          </div>
        )
      })}
    </div>
  )

}
