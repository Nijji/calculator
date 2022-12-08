import { useReducer } from "react";
import "./style.css";
import Digits from "./Digits";
import Operations from "./Operations";
// import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";

export const ACTIONS = {
  Add_digit: "add",
  Choose_op: "choose",
  Clear: "clear",
  Delete_digit: "delete",
  Evaluate: "eval",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.Add_digit:
      if (state.overwrite)
      {
        return {
          ...state,
          current: payload.digit,
          overwrite:false,
        }
      }
      if (payload.digit === "0" && state.current === "0") return state;
      if (payload.digit === "." && state.current === ".") return state;

      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };
    case ACTIONS.Choose_op:
      if (state.current === null && state.previous === null) {
        return state;
      }
      if (state.current == null)
      {
        return {
          ...state,
          operation:payload.operation,
        }
      }
      if (state.previous === null) {
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null,
        };
      }
      return {
        ...state,
        previous: evaluate(state),
        operation: payload.operation,
        current: null,
      };

    case ACTIONS.Clear: {
      return {};
    }

    case ACTIONS.Delete_digit:
      if (state.overwrite)
      {
        return {
          ...state,
          overwrite:false,
          current:null,
        }
      }
      if (state.current==null)return state
      if (state.current.length === 1)
      {
        return {
          ...state,current:null
        }
      }
      return {
        ...state,
        current:state.current.slice(0,-1)
      } 
    case ACTIONS.Evaluate:
      if (state.operation == null ||
        state.current == null ||
        state.previous == null)
      {
        return state
      }
      return {
        ...state,
        overwrite:true,
        prev: null,
        operation: null,
        current:evaluate(state)
      }
    default:
  }
}
function evaluate(current, previous, operation) {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    default:
  }
  return computation.toString();
}

const intFormat = new Intl.NumberFormat('en-us', {
  maximumFractionDigits:0,
})
function formatOperand(operand)
{
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return intFormat.format(integer)
  return `${intFormat.format(integer)},${decimal}`
}

function App() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {});
  dispatch({
    type: ACTIONS.Add_digit,
    payload: {
      digit: 34,
    },
  });
  return (
    <div className="app-grid">
      <div className="output">
        <div className="previous">
          {previous}
          {operation}
        </div>
        <div className="current">(formatOperand:{current})</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({
         type: ACTIONS.Clear
        })}
      >
        AC
      </button>
      <button
        onClick={() => dispatch({type:ACTIONS.Delete_digit})}
      >
        DEL
      </button>

      <Operations operation="/" dispatch={dispatch} />

      <Digits digit="1" dispatch={dispatch} />
      <Digits digit="2" dispatch={dispatch} />
      <Digits digit="3" dispatch={dispatch} />
      <Operations operation="*" dispatch={dispatch} />
      <Digits digit="4" dispatch={dispatch} />
      <Digits digit="5" dispatch={dispatch} />
      <Digits digit="6" dispatch={dispatch} />
      <Operations operation="+" dispatch={dispatch} />
      <Digits digit="7" dispatch={dispatch} />
      <Digits digit="8" dispatch={dispatch} />
      <Digits digit="9" dispatch={dispatch} />
      <Operations operation="-" dispatch={dispatch} />
      <Digits digit="0" dispatch={dispatch} />
      <Digits digit="." dispatch={dispatch} />
      <Operations operation="=" dispatch={dispatch} />

      <button className="span-two">=</button>
    </div>
  );
}

export default App;
