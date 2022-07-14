import { useMutation, useQuery } from "@apollo/client";
import { Title } from "@mui/icons-material";
import { Box, Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { GET_EVENTS } from "../graphql/Queries";
import { CREATE_EVENT } from "../graphql/Mutations";

import { Form, Formik } from "formik";
import Modal from "../components/Modal/Modal";
import { Event, InitialEvent } from "../typedefs/Event";
const Events = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);
  const [createEventFc, eventObject] = useMutation(CREATE_EVENT);

  const [eventToCreate, setEventToCreate] = useState(InitialEvent);
  const [openModal, setOpenModal] = useState(false);

  const createEvent = async (values: any) => {
    console.log("Creating event");
    const res = await createEventFc({
      variables: {
        title: values.title,
        description: values.description,
        price: values.price,
        date: values.date,
      },
    });
    console.log(res);
    setOpenModal(false);
    console.log(eventObject);
  };

  const reset = () => {
    console.log("Reseting event inputs");
    setEventToCreate({
      title: "",
      description: "",
      price: 0,
      date: new Date(),
    });
  };

  return (
    <React.Fragment>
      {openModal && (
        <Modal
          canCancel
          cancel={(prev: any) => setOpenModal(!prev)}
          reset={reset}
          title={"Create event"}
        >
          <Formik
            initialValues={InitialEvent}
            onSubmit={async (values, { setErrors }) => {
              createEvent(values);
            }}
          >
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: "auto",
                  width: 1 / 2,
                }}
              >
                <Input
                  required
                  value={eventToCreate.title}
                  onChange={(e) =>
                    setEventToCreate({
                      ...eventToCreate,
                      title: e.target.value,
                    })
                  }
                  name="eventTitle"
                />
                <Input
                  required
                  value={eventToCreate.description}
                  onChange={(e) =>
                    setEventToCreate({
                      ...eventToCreate,
                      description: e.target.value,
                    })
                  }
                  name="eventDescription"
                />
                <Input
                  required
                  value={eventToCreate.price}
                  type="number"
                  onChange={(e) =>
                    setEventToCreate({
                      ...eventToCreate,
                      price: parseFloat(e.target.value),
                    })
                  }
                  name="eventPrice"
                />
                <Input
                  required
                  type="date"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setEventToCreate({
                      ...eventToCreate,
                      date: new Date(e.target.value),
                    });
                  }}
                  name="eventDate"
                />
                <Button type="submit" variant="contained">
                  Create
                </Button>
              </Box>
            </Form>
          </Formik>
        </Modal>
      )}
      {loading && "Loading..."}
      {data?.events.map((event: any) => (
        <Box key={event._id}>{event._id}</Box>
      ))}
      <Button onClick={() => setOpenModal(true)} variant="outlined">
        Create event
      </Button>
    </React.Fragment>
  );
};

export default Events;
