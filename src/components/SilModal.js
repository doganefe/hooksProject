import React, { useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import axios from './axios'
const SilModal = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const open = () => setIsVisible(true)
  const close = () => setIsVisible(false)

  const handleDelete = () => {
    axios
      .delete(`posts/${props.post.id}`)
      .then(resp => {
          props.history.push("/")
      })
      .catch(err => console.log("silinirken hata olustu"))
  }

  return (
    <>
      <Button onClick={open} color="red">Sil</Button>
      <Modal size="mini" open={isVisible}>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          <p>
            Bu postu silmek ister misiniz?
      </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={close}
            color='red'
          >
            <Icon name='remove' /> No
      </Button>
          <Button
            onClick={handleDelete}
            color='green'
          >
            <Icon name='checkmark' /> Yes
      </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default SilModal
