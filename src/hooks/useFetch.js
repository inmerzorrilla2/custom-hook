import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [apiData, setApiData] = useState();

  const getApi = (url) => {
    axios.get(url)
      .then((res) => {
        if (res.data) {
          setApiData(res.data);
        } else {
          console.error("Respuesta API vacía:", res);
        }
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
      });
  };

  return [apiData, getApi];
};

export default useFetch;
