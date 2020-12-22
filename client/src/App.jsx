import React, { useState } from 'react';

import { Button, Row, Col } from 'react-bootstrap';
import { MdAddCircleOutline } from 'react-icons/md';

//Components
import Table from './Components/Table';
import ModalOpen from './Components/ModalOpen';

const App = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ padding: '20px' }}>
      <Row>
        <Col sm={12} md={11}>
          <h1
            style={{
              color: '#687178',
              fontWeight: 'bold',
              wordWrap: 'break-word',
            }}>
            Kustannuspaikka
          </h1>
          <small style={{ color: '#687178', fontWeight: 'bold' }}>
            Klikkaa riviä muokataksesi tai poistaaksesi tietoja!
          </small>
        </Col>
        <Col sm={12} md={1}>
          {' '}
          <Button
            variant='primary'
            onClick={handleShow}
            style={{
              fontWeight: '500',
              fontSize: '20px',
            }}
            block>
            <MdAddCircleOutline size='25px' /> Lisää
          </Button>
        </Col>
      </Row>
      <Table />
      <ModalOpen show={show} handleClose={handleClose} />
    </div>
  );
};

export default App;
