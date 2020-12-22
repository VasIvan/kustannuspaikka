import React, { useState, useEffect } from 'react';
import axios from 'axios';

//components
import DisplayTable from './DisplayTable';

const Table = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/kustannuspaikka')
      .then((response) => {
        setApiData(response.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <>
      <DisplayTable apiData={apiData} />
    </>
  );
};

export default Table;
