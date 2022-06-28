import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_EVENTS } from "../graphql/Queries";

const Events = () => {
  const {data,loading,error}=useQuery(GET_EVENTS)
  useEffect(() => {

    console.log(data)
  }, [data])
  
  return <div>Events</div>;
};

export default Events;
