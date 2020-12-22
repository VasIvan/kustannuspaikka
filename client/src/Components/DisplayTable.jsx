import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ModalOpen from './ModalOpen';

const DisplayTable = ({ apiData }) => {
  const [modalData, setModalData] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updatedApiData = apiData.map((data) => ({
    ...data,
    tietueen_luontiaika: data.tietueen_luontiaika
      .slice(0, -5)
      .replace('T', ' '),
    tietueen_muutosaika: data.tietueen_muutosaika
      .slice(0, -5)
      .replace('T', ' '),
  }));

  const columns = [
    {
      dataField: 'kustannuspaikkanumero',
      text: 'Kustannuspaikkanumero',
      headerStyle: {
        color: '#fff',
        backgroundColor: '#687178',
        wordWrap: 'break-word',
      },
    },
    {
      dataField: 'kustannuspaikka_nimi',
      text: 'Kustannuspaikka nimi',
      headerStyle: {
        color: '#fff',
        backgroundColor: '#687178',
        wordWrap: 'break-word',
      },
    },
    {
      dataField: 'vastuuhenkilon_nimi',
      text: 'Vastuuhenkilön nimi',
      headerStyle: {
        color: '#fff',
        backgroundColor: '#687178',
        wordWrap: 'break-word',
      },
    },
    {
      dataField: 'vuosibudjetti',
      text: 'Vuosibudjetti',
      headerStyle: {
        color: '#fff',
        backgroundColor: '#687178',
        wordWrap: 'break-word',
      },
    },
    {
      dataField: 'toteuma',
      text: 'Toteuma',
      headerStyle: {
        color: '#fff',
        backgroundColor: '#687178',
        wordWrap: 'break-word',
      },
    },
    {
      dataField: 'tietueen_luontiaika',
      text: 'Tietueen luontiaika',
      headerStyle: {
        color: '#fff',
        backgroundColor: '#687178',
        wordWrap: 'break-word',
      },
    },
    {
      dataField: 'tietueen_muutosaika',
      text: 'Tietueen muutosaika',
      headerStyle: {
        color: '#fff',
        backgroundColor: '#687178',
        wordWrap: 'break-word',
      },
    },
  ];

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    hideSelectColumn: true,
    style: { background: '#0478ff', color: '#fff' },
    onSelect: (row) => {
      setModalData(row);
      handleShow();
    },
  };

  return (
    <>
      <BootstrapTable
        keyField='kustannuspaikkanumero'
        data={updatedApiData}
        columns={columns}
        selectRow={selectRow}
        rowStyle={{
          backgroundColor: 'white',
          color: '#0275d8',
          wordWrap: 'break-word',
        }}
        pagination={paginationFactory()}
      />
      <ModalOpen modalData={modalData} show={show} handleClose={handleClose} />
    </>
  );
};

export default DisplayTable;
