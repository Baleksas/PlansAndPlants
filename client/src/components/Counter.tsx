import { Button, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../features/counterSlice";
import { RootState } from "../utils/reduxStore";

const Counter = () => {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);


  return (
    <Box sx={{ mx: "auto" }} mt={3} width={1 / 3}>
      <Typography variant="h4" align="center">
        Counter
      </Typography>
      <Typography variant="h5" align="center">
        {value}
      </Typography>
      <Box
        m={3}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button variant="contained" onClick={()=> dispatch(increment())}>Increment</Button>
        <Button color="warning" variant="contained" onClick={()=> dispatch(decrement())}>
          Decrement
        </Button>
        <Box  width={1} sx={{ display: "flex", mx:"auto", justifyContent: 'center' }}>
          <Button sx={{ flexGrow: 1 }} variant="contained" onClick={()=> dispatch(incrementByAmount(amount))}>Increment by :</Button>
          <Input sx={{ml: 1, pl:1, mt:1}}
            type="number"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          ></Input>
        </Box>
      </Box>
    </Box>
  );
};

export default Counter;
