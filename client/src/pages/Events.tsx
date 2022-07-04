import { useQuery } from "@apollo/client";
import { Title } from "@mui/icons-material";
import { Box, Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { GET_EVENTS } from "../graphql/Queries";
import { Form, Formik } from "formik";
import Modal from "../components/Modal/Modal";
import { Event, InitialEvent } from "../typedefs/Event";
const Events = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);
  const [eventToCreate, setEventToCreate] = useState(InitialEvent);
  const [openModal, setOpenModal] = useState(false);

  const createEvent = (values: Event) => {
    console.log("Creating event");
  };

  const reset = () => {
    console.log("Reseting event inputs")
    setEventToCreate({
      title: "",
      description: "",
      price: 0,
      date: new Date(),
    });
  };

  useEffect(() => {
    console.log(eventToCreate)
  }, [eventToCreate])
  


  return (
    <React.Fragment>
      {openModal && (
        <Modal reset={reset} title={"Create event"}>
          <Formik
            initialValues={InitialEvent}
            onSubmit={async (values, { setErrors }) => {
              createEvent(values);
            }}
          >
            <Form>
              <Input
              value={eventToCreate.title}
                onChange={(e) =>
                  setEventToCreate({ ...eventToCreate, title: e.target.value })
                }
                
                name="event"
              />
            </Form>
          </Formik>
        </Modal>
      )}
      {loading && "Loading..."}
      {data?.events.map((event: any) => (
        <Box key={event._id}>{event._id}</Box>
      ))}
      <Button
        onClick={() => setOpenModal((prev: boolean) => !prev)}
        variant="outlined"
      >
        Create event
      </Button>
    </React.Fragment>
  );
};

export default Events;
