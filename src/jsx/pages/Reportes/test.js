import { useEffect,useState } from "react";
import shallow from "zustand/shallow";
import { useCounterStore,TemporalStoreFiltros } from "../../../store/counter.store.tsx";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import { ModalSisplani,ModalSisplaniBasic} from "../../components/Sisplani/Modal/MdlFiltroReportes";
function App() {
  const { StrFechaInicio,StrFechaFin,Strtipocliente,Strunidad,Strsubdivision,Strcategoria,Strzona,Strcosto,Strpuntoventa,Strservicio,Strtipoventa } = TemporalStoreFiltros(
    (states) => ({
      StrFechaInicio: states.StrFechaInicio,
      StrFechaFin: states.StrFechaFin,
      Strtipocliente: states.Strtipocliente,
      Strunidad: states.Strunidad,
      Strsubdivision: states.Strsubdivision,
      Strcategoria: states.Strcategoria,
      Strzona: states.Strzona,
      Strcosto: states.Strcosto,
      Strpuntoventa: states.Strpuntoventa,
      Strservicio: states.Strservicio,
      Strtipoventa: states.Strtipoventa,
    }));


  useEffect(() => {
  }, []);
 
  return (
    <div>
      {"--> PAGINA DE TEST DE PARAMETROS  "}
      {StrFechaInicio} : 
      {StrFechaFin} :
      {Strtipocliente} :
      {Strunidad} :
      {Strsubdivision} :
      {Strcategoria} :
      {Strzona} :
      {Strcosto} :
      {Strpuntoventa} :
      {Strservicio} :
      {Strtipoventa} :
      <ModalSisplaniBasic nombre="Grover" />   
    </div>
  );
}

export default App;