import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ps } from "../../redux/actionSender.js";
import { resetError } from "../../redux/actionAdult.js";
import TextareaForm from "../Textarea.jsx";

const Sender = () => {
  const dispatch = useDispatch();
  const reporte = useSelector((state) => state.spg);
  const errors = useSelector((state) => state.error);

  const [input, setInput] = useState([]);
  const [cs, setCs] = useState([]);

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleTextarea = (event) => {
    setInput(event.target.value);
    // Procesa la entrada aquí mismo y actualiza corteChat
    const lines = event.target.value.split("\n");
    const data = [];

    for (const line of lines) {
      const [user, coins, fecha, _, euros] = line.split("\t");
      if (user && coins && fecha && euros) {
        data.push({
          user: user.trim(),
          coins: parseInt(coins.trim()),
          fecha: fecha.trim(),
          euros: parseFloat(euros.trim().replace(",", ".")),
        });
      }
    }
    data.sort((a, b) => {
      return a.user.localeCompare(b.user);
    });
    setCs(data);
  };

  const handlerSubmit = () => {
    dispatch(ps(cs));
    setInput([]);
    setCs([]);
  };

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <TextareaForm
          value={input}
          onChange={handleTextarea}
          onSubmit={handlerSubmit}
          placeholder="Pegue aquí el corte de Sender"
          titulo="Corte De Sender"
        />
        <div className="mt-24">
          {errors && (
            <p className="error">
              {errors}
            </p>
          )}
        </div>
      </div>

      <div className="contenedor3">
        <div className="cotenedor4">
          <h2 className="titulo">
            Creditos a subir
          </h2>
          {cs?.map((x, i) => {
            return (
              <div key={i}>
                <h3 className="mostrarcorte">
                  <p>{i + 1}</p>
                  <p>Nombre: {x.user}</p>
                  <p>Coins: {x.coins}</p>
                  <p>Euros: {x.euros}</p>
                  <p>Fecha: {x.fecha}</p>
                  <br />
                </h3>
                <br />
              </div>
            );
          })}
        </div>
        <div className="contenedor4">
          <h2 className="titulo">
            Creditos subidos
          </h2>
          {!errors && (
            <div>
              {reporte?.map((x, i) => {
                return (
                  <div key={x.id}>
                    <h3 className="mostrarcorte">
                      <p>{i + 1}</p>
                      <p>Nombre: {x.userName}</p>
                      <p>Coins: {x.coins}</p>
                      <p>Euros: {x.euros}</p>
                      <p>Fecha: {x.fecha}</p>
                      <p>fecha creacion: {x.createdAt}</p>
                    </h3>
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sender;
