import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { MdEdit, MdDeleteForever, MdAddCircleOutline } from 'react-icons/md';
import axios from 'axios';

function AddForm({ modalData }) {
  const preloadedValues = {
    kustannuspaikka_nimi: modalData ? modalData.kustannuspaikka_nimi : '',
    vastuuhenkilon_nimi: modalData ? modalData.vastuuhenkilon_nimi : '',
    vuosibudjetti: modalData ? modalData.vuosibudjetti : null,
    toteuma: modalData ? modalData.toteuma : null,
  };

  const { register, handleSubmit, errors } = useForm({
    defaultValues: preloadedValues,
  });

  const addData = (fullData) => {
    axios
      .post('http://localhost:5000/kustannuspaikka', fullData)
      .then((response) => {
        //console.log(response.data.data);
        window.location = '/';
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const editData = (id, fullData) => {
    axios
      .put(`http://localhost:5000/kustannuspaikka/${id}`, fullData)
      .then((response) => {
        //console.log(response.data.data);
        window.location = '/';
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:5000/kustannuspaikka/${id}`)
      .then((response) => {
        //console.log(response.data.data);
        window.location = '/';
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onSubmit = (data) => {
    const {
      kustannuspaikka_nimi,
      vastuuhenkilon_nimi,
      vuosibudjetti,
      toteuma,
    } = data;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.setHours(today.getHours() + 4);
    //const currentTime = today.toISOString().slice(0, -5).replace('T', ' ');

    modalData
      ? editData(modalData.kustannuspaikkanumero, {
          kustannuspaikka_nimi,
          vastuuhenkilon_nimi,
          vuosibudjetti,
          toteuma: toteuma || null,
          tietueen_luontiaika: null,
          tietueen_muutosaika: today.toISOString(),
        })
      : addData({
          kustannuspaikka_nimi,
          vastuuhenkilon_nimi,
          vuosibudjetti,
          toteuma: toteuma || null,
          tietueen_luontiaika: today.toISOString(),
          tietueen_muutosaika: today.toISOString(),
        });
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Kustannuspaikka nimi'
            name='kustannuspaikka_nimi'
            ref={register({
              required: 'Kustannuspaikan nimi vaaditaan!',
              minLength: {
                value: 2,
                message: 'Nimessä on oltava vähintään 2 kirjainta!',
              },
              maxLength: {
                value: 30,
                message: 'Nimessä on oltava enintään 30 kirjainta!',
              },
            })}
          />
          {errors.kustannuspaikka_nimi && (
            <Form.Text className='text-danger'>
              {errors.kustannuspaikka_nimi.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Vastuuhenkilön nimi'
            name='vastuuhenkilon_nimi'
            ref={register({
              required: 'Vastuuhenkilön nimi vaaditaan!',
              minLength: {
                value: 2,
                message: 'Nimessä on oltava vähintään 2 kirjainta!',
              },
              maxLength: {
                value: 40,
                message: 'Nimessä on oltava enintään 40 kirjainta!',
              },
            })}
          />
          {errors.vastuuhenkilon_nimi && (
            <Form.Text className='text-danger'>
              {errors.vastuuhenkilon_nimi.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='number'
            placeholder='Vuosibudjetti'
            name='vuosibudjetti'
            ref={register({
              required: 'Vuosibudjetti vaaditaan',
              min: {
                value: 0,
                message: 'Vuosibujetti on oltava vähintään 0!',
              },
              max: {
                value: 999999999999,
                message: 'Vuosibujetti on oltava korkeintaan 999999999999!',
              },
            })}
            step='any'
          />
          {errors.vuosibudjetti && (
            <Form.Text className='text-danger'>
              {errors.vuosibudjetti.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='number'
            placeholder='Toteuma'
            name='toteuma'
            ref={register({
              required: false,
              min: {
                value: 0,
                message: 'Vuosibujetti on oltava vähintään 0!',
              },
              max: {
                value: 999999999999,
                message: 'Vuosibujetti on oltava korkeintaan 999999999999!',
              },
            })}
            step='any'
          />
          {errors.toteuma && (
            <Form.Text className='text-danger'>
              {errors.toteuma.message}
            </Form.Text>
          )}
        </Form.Group>

        {modalData ? (
          <>
            <Button
              variant='warning'
              type='submit'
              style={{
                fontWeight: '500',
                fontSize: '20px',
              }}
              block>
              <MdEdit size='25px' /> Muokkaa
            </Button>
            <Button
              variant='danger'
              onClick={() => deleteData(modalData.kustannuspaikkanumero)}
              style={{
                fontWeight: '500',
                fontSize: '20px',
              }}
              block>
              <MdDeleteForever size='25px' /> Poista
            </Button>
          </>
        ) : (
          <Button
            variant='primary'
            type='submit'
            style={{
              fontWeight: '500',
              fontSize: '20px',
            }}
            block>
            <MdAddCircleOutline size='25px' /> Lisää
          </Button>
        )}
      </Form>
    </>
  );
}

export default AddForm;
