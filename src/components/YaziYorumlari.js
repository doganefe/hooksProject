import React from 'react'
import YorumListesi from './YorumListesi'
import YorumFormu from './YorumFormu'

const YaziYorumlari = (props) => {

  return (
    <>
     <YorumListesi yorumlar = {props.yorumlar}/>
     <YorumFormu handleSubmit = {props.handleSubmit}/>
    </>
  )
}

export default YaziYorumlari


