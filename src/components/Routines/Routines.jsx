import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import AllRoutines from "../AllRoutines/AllRoutines";

const Routines = () => {
  return (
    <div>
      <NavBar />
        <AllRoutines />
      <Footer />
    </div>
  )
}

export default Routines;