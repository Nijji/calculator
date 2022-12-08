import { ACTIONS } from "./App"

function Operations({dispatch,operation}) {
  return (
    <div>
      <button onClick={()=>dispatch({type:ACTIONS.Choose_op,payload:{operation}})}></button>
    </div>
  )
}

export default Operations
