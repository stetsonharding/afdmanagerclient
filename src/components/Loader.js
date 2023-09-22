import React from 'react'

import { Spinner } from "reactstrap";

const Loader = ({size, color, loading}) => {



  return (
    <div>
        {loading && 
        <>
        <Spinner />
          <p><b>Getting Origin Groups..</b></p>
        </>
      }
    </div>
  )
}

export default Loader