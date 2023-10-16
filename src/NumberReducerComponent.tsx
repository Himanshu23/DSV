import "./styles.css";
import { useReducer, useState, useRef, JSX } from "react";
import { Button, TextField, Grid } from "@mui/material";

function reducer({ count }: { count: number }, { type, inputNum }: { type: string, inputNum: number }) {
    switch (type) {
      case "increment":
        return { count: count + 1 };
      case "decrement":
        return { count: count - 1  >= 0 ? count - 1 : count };
      case "random_increment":
        return { count: count + Math.floor(Math.random() * 10) + 1 };
      case "nearest_odd_increment":
        return { count: count % 2 === 0 ? ++count : count + 2 };
      case "decrease_by_input":
        return { count: count - inputNum};
      case "reset":
        return { count: 0 };
      default:
        throw new Error();
    }
}

const NumberReducerComponent = (): JSX.Element => {

  const [numberInput] = useState<number>(0);
  const [countState, dispatch] = useReducer(reducer, { count: 0 });

  /* keeping numInput in a ref will avoid rerendering on change of input field */
  const numInputRef = useRef<HTMLInputElement>();
  const handleButtonClick = (_event: React.MouseEvent<HTMLButtonElement>, action: string) => {
    const inpValue = numInputRef?.current && numInputRef.current.value || 0;
    if(action === 'decrease_by_input') {
      if( Number(inpValue) > countState.count) {
        alert("Invalid action: Result will be in negative value");
        return;
      }
    }
    dispatch({ type: action, inputNum: Number(inpValue) });
  }

  return (
    <>
          <p >Count: {countState.count}</p>
          <TextField
            defaultValue={numberInput}
            type="number"
            inputRef={numInputRef}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <Grid container mt={1} spacing={3}>
            <Grid item xs={4}>
              <Button
                  fullWidth={true}
                  variant="contained"
                  onClick={(e) => handleButtonClick(e, "increment")}>
                  +
                </Button>
            </Grid>

            <Grid item xs={4}>
                <Button
                    fullWidth={true}
                    variant="contained"
                    onClick={(e) => handleButtonClick(e, "decrement")}>
                    -
                  </Button>
            </Grid>


            <Grid item xs={4}>
                <Button
                  fullWidth={true}
                  variant="contained"
                  onClick={(e) => handleButtonClick(e, "random_increment")}>
                  Random Increment
                </Button>
            </Grid>

            <Grid item xs={4}>
                <Button
                 fullWidth={true}
                      variant="contained"
                      onClick={(e) => handleButtonClick(e, "nearest_odd_increment")}>
                      Increment to Next Odd
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                 fullWidth={true}
                  variant="contained"
                  onClick={(e) => handleButtonClick(e, "decrease_by_input")}>
                  Decrease By Input Value
              </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                 fullWidth={true}
                  variant="contained"
                  onClick={(e) => handleButtonClick(e, "reset")}>
                  Reset Count
                </Button>
            </Grid>
          </Grid>
        </>
  )
}

export default NumberReducerComponent;