import React from "react";
import {
  useGetAllUsersQuery,
  useSetNewRoleMutation,
} from "../../redux/query/api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardActionArea } from "@mui/material";
import style from "./SwitchRoles.module.css";
import NavBar from "../NavBar/NavBar";
import Button from "@mui/material/Button";

export default function SwitchRoles() {
  const { data, isLoading } = useGetAllUsersQuery();

  const [setNewRole] = useSetNewRoleMutation();

  if (isLoading) return <Loading />;

  const handlerChanged = () => {
    toast.error("¡Role cambiado!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleChangeRole = (event, id, role) => {
    event.preventDefault();
    const newRole = role === "Staff" ? "User" : "Staff";
    setNewRole({
      idUser: id,
      newRole: newRole,
    });
    handlerChanged();
    // setTimeout(function(){
    // 	window.location.reload()
    // }, 2000)
  };

  return (
    <div>
      <NavBar />
      <div className={style.mainContainer}>
        <h2 className={style.tittle}>Usuarios</h2>
        <hr className={style.divisionline}></hr>
        <div className={style.cardsclasses}>
          {data?.map((e, idx) => {
            return (
              <Card
                key={idx}
                className={style.cardPlan}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "400px",
                  height: "fit-content",
                  border: "1px solid var(--tertiary-color) ",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  transition: "all 0.2s ease-out",
                }}
              >
                <div className={style.containerBenefits}>
                  <h3>Nombre: {e.name}</h3>
                  <h3>Email: {e.email}</h3>
                  <h3>Role: {e.role}</h3>
                  <Button
                    onClick={(event) => handleChangeRole(event, e.id, e.role)}
                    variant="contained"
                    sx={
                      e.role !== "Admin"
                        ? {
                            background: "#0d0d6b",
                            "&:hover": {
                              backgroundColor: "#62629f",
                              transition: "0.4s",
                            },
                          }
                        : { display: "none" }
                    }
                  >
                    Cambiar role a {e.role === "Staff" ? "usuario" : "staff"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </div>
    </div>
  );
}
