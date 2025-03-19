import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const MatchForm = ({ show, saveMatch }: { show: boolean, saveMatch: (data: any) => void }) => {
  const [title, setTitle] = useState<string>('')
  const [playerNumber, setPlayerNumber] = useState<number>(0)

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Match Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" >
            <Form.Label>Match Title</Form.Label>
            <Form.Control
              type="name"
              placeholder="e.g. Friday Futsal"
              onChange={({ target }: { target: { value: string } }) => { setTitle(target.value) }}
              autoFocus
            />
          </Form.Group>
          <Form.Group
            className="mb-3"          >
            <Form.Label>Number of Player in Team</Form.Label>
            <Form.Control
              type="number"
              placeholder="5"
              onChange={({ target }: { target: { value: any } }) => { setPlayerNumber(+target.value) }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => saveMatch({ title, playerNumber })}>
          Save Match
        </Button>
      </Modal.Footer>
    </Modal>
  )
}