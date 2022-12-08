import { ACTIONS } from "./App"

function Digits({dispatch,digit}) {
  return (
    <div>
      <button onClick={()=>dispatch({type: ACTIONS.Add_digit,payload:{digit}})}></button>
    </div>
  )
}

export default Digits
