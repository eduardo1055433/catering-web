import React,{ useEffect,useState } from "react";
import PropTypes from "prop-types";
import { Row, Card, Col, Button, Modal, Container,Form } from "react-bootstrap";
import { useCounterStore,TemporalStoreFiltros } from "../../../../store/counter.store.tsx";
import moment from 'moment';
import axios from "axios";
//import Example from "../../../pages/Reportes/VentasProducto.js"; 
import  CerrarModalOK from "../../../pages/Reportes/VentasProducto.js"; 
import jwt from 'jwt-decode' // import dependency

export function ModalSisplaniBasic(props){
/*---------------------Variables---------------------*/
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
  const { OutSetFechaInicio,OutSetFechaFin,OutSettipocliente,OutSetunidad,OutSetsubdivision,OutSetcategoria,OutSetzona,OutSetcosto,OutSetpuntoventa,OutSetservicio,OutSettipoventa } = TemporalStoreFiltros();
  const [show, setShow] = useState(false);
  const [isTipoClienteVisible, setisTipoClienteVisible] = useState(false);    

  const [FechaInicial, setFechaInicial] = useState(StrFechaInicio);
  const [FechaFinal, setFechaFinal] = useState(StrFechaFin);
  const [TipoCliente, setTipoCliente] = useState(Strtipocliente);
  const [Unidad, setUnidad] = useState(Strunidad);
  const [Subdivision, setSubdivision] = useState(Strsubdivision);
  const [Categoria, setCategoria] = useState(Strcategoria);
  const [Zona, setZona] = useState(Strzona);
  const [Costo, setCosto] = useState(Strcosto);
  const [PuntoVenta, setPuntoVenta] = useState(Strpuntoventa);
  const [Servicio, setServicio] = useState(Strservicio);
  const [TipoVenta, setTipoVenta] = useState(Strtipoventa);

  const [TipoClienteList, setTipoClienteList] = useState([]);
  const [UnidadList, setUnidadList] = useState([]);
  const [SubdivisionList, setSubdivisionList] = useState([]);
  const [CategoriaList, setCategoriaList] = useState([]);
  const [ZonaList, setZonaList] = useState([]);
  const [CostoList, setCostoList] = useState([]);
  const [PosList, setPosList] = useState([]);
  const [ServiciosList, setServiciosList] = useState([]);
  const [Venta_TipoList, setVenta_TipoList] = useState([]);
 
/*---------------------Funciones---------------------*/
const CerrarModal = () =>{
  setShow(false);
  CerrarModalOK();
} 
const MostrarModal = async () => {
  setShow(true);  
  if(TipoCliente === "TRAB"){
    setisTipoClienteVisible(true);
  }else{
    setisTipoClienteVisible(false);
  }
  };
const GetFiltros = async () => {
  const userToken = sessionStorage.getItem('user-token');
  var decoded = jwt(userToken);
  console.log(decoded);
  var esquema = "general";//decoded.user.schemas[0];
  var base = decoded.user.schemas[1];

  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api-catering.sisplani.com/reportes/filtros/"+esquema+"/"+base+"",
    headers: {
      'Authorization': 'Bearer '+userToken, 
      'Content-Type': 'application/json'
    },
  };
 
  axios(config)
    .then(function (response) {
      //if(Strtipocliente === "" &&  Strtipoventa === ""){
        setTipoClienteList(response.data.data.cliente_tipo);
        setUnidadList(response.data.data.unidad);
        setSubdivisionList(response.data.data.subdivision);
        setCategoriaList(response.data.data.categoria);
        setZonaList(response.data.data.zona);
        setCostoList(response.data.data.costo);
        setPosList(response.data.data.pos);
        setServiciosList(response.data.data.servicios);
        setVenta_TipoList(response.data.data.venta_tipo);
      //}
      
    })
    .catch(function (error) {
      console.log(error);
    });
  };
const EnviarFiltro = (event) => {
    event.preventDefault();
    //OutSetFechaInicio(event.target.fechaini.value)
    //console.log(event.target.fechaini.value);
    //OutSetFechaFin(event.target.fechafin.value);
    //console.log(event.target.fechafin.value);
    //OutSettipocliente(event.target.tipocliente.value);
    //console.log(event.target.tipocliente.value);
    
    if(event.target.tipocliente.value === "TRAB"){
      //OutSetunidad(event.target.unidades.value);
      //console.log(event.target.unidades.value);
      //OutSetsubdivision(event.target.subdivision.value);
      //console.log(event.target.subdivision.value);
      //OutSetcategoria(event.target.categoria.value);
      //console.log(event.target.categoria.value);
      //OutSetzona(event.target.zona.value);
      //console.log(event.target.zona.value);
      //OutSetcosto(event.target.costo.value);
      //console.log(event.target.costo.value);
    }
    //OutSetpuntoventa(event.target.puntoventa.value);
    //console.log(event.target.puntoventa.value);
    //OutSetservicio(event.target.servicio.value);
    //console.log(event.target.servicio.value);
    //OutSettipoventa(event.target.tipoventa.value);
    //console.log(event.target.tipoventa.value);
    //Testing.name();
    //CerrarModal();
    //getName();
  }  
const onChangeDateFechaInicial = e => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    setFechaInicial(e.target.value);
    OutSetFechaInicio(e.target.value)

  };
const onChangeDateFechaFinal = e => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    setFechaFinal(e.target.value);
    OutSetFechaFin(e.target.value);

  };
const onChangeTipoCliente = (event) => {
    const value = event.target.value;
    if(value === "TRAB"){
      setisTipoClienteVisible((isVisible) => !isVisible);
      console.log("VISIBLE");
    }else{
      setisTipoClienteVisible(false);
      console.log("OCULTO");
    }
    setTipoCliente(event.target.value);
    OutSettipocliente(event.target.value);
  };
const onChangeUnidad = (event) => {
    const value = event.target.value;
    setUnidad(event.target.value);
    OutSetunidad(event.target.value);

  };
const onChangeSubdivision = (event) => {
    const value = event.target.value;
    setSubdivision(event.target.value);
    OutSetsubdivision(event.target.value);
  };
const onChangeCategoria = (event) => {
    const value = event.target.value;
    setCategoria(event.target.value);
    OutSetcategoria(event.target.value);
  };
const onChangeZona = (event) => {
    const value = event.target.value;
    setZona(event.target.value);
    OutSetzona(event.target.value);
  };
const onChangeCosto = (event) => {
    const value = event.target.value;
    setCosto(event.target.value);
    OutSetcosto(event.target.value);
  };
const onChangePuntoVenta = (event) => {
    const value = event.target.value;
    setPuntoVenta(event.target.value);
    OutSetpuntoventa(event.target.value);
  };
const onChangeServicio = (event) => {
    const value = event.target.value;
    setServicio(event.target.value);
    OutSetservicio(event.target.value);
  };
const onChangeTipoVenta = (event) => {
    const value = event.target.value;
    setTipoVenta(event.target.value);
    OutSettipoventa(event.target.value);
  };
useEffect( ()=>{
  GetFiltros();
  //console.log(TipoCliente);
  if(TipoCliente === "TRAB"){
    setisTipoClienteVisible(true);
    console.log("VISIBLE");
  }else{
    setisTipoClienteVisible(false);
    console.log("OCULTO");
  }
}, [])    
  
/*---------------------VISTA HTML---------------------*/
  return (
    <div>
          <Form onSubmit={EnviarFiltro}>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="FechaInicio">
                    <Form.Label>Fecha Inicio</Form.Label>
                    <Form.Control type="date" value={FechaInicial} name="fechaini" onChange={onChangeDateFechaInicial} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="FechaFin">
                    <Form.Label>Fecha Fin</Form.Label>
                    <Form.Control type="date" value={FechaFinal} name="fechafin" onChange={onChangeDateFechaFinal} />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Form.Group className="mb-3" controlId="formBasic1">
               <Form.Label>Tipo de Cliente</Form.Label>
              <Form.Select value={TipoCliente} onChange={onChangeTipoCliente} name="tipocliente"  >
                {
                  TipoClienteList.map(elemento=>(<option key={elemento.clie_tipo} value={elemento.clie_tipo}>{elemento.clie_tipo}</option>))
                }
              </Form.Select>
            </Form.Group>

            {isTipoClienteVisible && (
              <Container>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasic2">
                      <Form.Label>Unidad</Form.Label>
                      <Form.Select value={Unidad} onChange={onChangeUnidad} name="unidades">
                      <option value={"TODOS"}>Todos</option>
                        {
                          UnidadList.map(elemento=>(<option key={elemento.unid_id} value={elemento.unid_id}>{elemento.unid_descri}</option>))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasic3">
                      <Form.Label>Subdivision</Form.Label>
                      <Form.Select value={Subdivision} onChange={onChangeSubdivision} name="subdivision">
                      <option value={"TODOS"}>Todos</option>
                        {
                          SubdivisionList.map(elemento=>(
                            <option key={elemento.subdiv_id} value={elemento.subdiv_id}>{elemento.subdiv_descri}</option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasic4">
                      <Form.Label>Categoria</Form.Label>
                      <Form.Select value={Categoria} onChange={onChangeCategoria} name="categoria">
                      <option value={"TODOS"}>Todos</option>
                        {
                          CategoriaList.map(elemento=>(<option key={elemento.cat_id} value={elemento.cat_id}>{elemento.cat_descri}</option>))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasic5">
                      <Form.Label>Zona</Form.Label>
                      <Form.Select  value={Zona} onChange={onChangeZona} name="zona">
                      <option value={"TODOS"}>Todos</option>
                        {
                          Array.isArray(ZonaList) &&(
                            ZonaList.map(elemento=>(<option key={elemento.zona_id} value={elemento.zona_id}>{elemento.zona_descri}</option>))                    
                         )                           
                        }                      
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasic6">
                      <Form.Label>C.Costo</Form.Label>
                      <Form.Select  value={Costo} onChange={onChangeCosto} name="costo" >
                      <option value={"TODOS"}>Todos</option>
                        {
                          Array.isArray(CostoList) &&(
                            CostoList.map(elemento=>(<option key={elemento.ccosto_id} value={elemento.ccosto_id}>{elemento.ccosto_descri}</option>))                    
                         )                           
                        }                     
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
            )}

            <Form.Group className="mb-3" controlId="formBasic7">
              <Form.Label>Punto de Venta(POS) </Form.Label>
              <Form.Select value={PuntoVenta} onChange={onChangePuntoVenta} name="puntoventa">
              <option value={"TODOS"}>Todos</option>
                {
                  PosList.map(elemento=>(<option key={elemento.pos_hdserie} value={elemento.pos_hdserie}>{elemento.pos_descri}</option>))
                }  
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic8">
              <Form.Label>Servicio</Form.Label>
              <Form.Select value={Servicio} onChange={onChangeServicio}  name="servicio">
              <option value={"TODOS"}>Todos</option>
                {
                  ServiciosList.map(elemento=>(<option key={elemento.serv_id} value={elemento.serv_id}>{elemento.serv_id}</option>))
                }    
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic9">
              <Form.Label>Tipo de Venta</Form.Label>
              <Form.Select value={TipoVenta} onChange={onChangeTipoVenta} name="tipoventa">
                {
                  Venta_TipoList.map(elemento=>(<option key={elemento.vtipo_id} value={elemento.vtipo_id}>{elemento.vtipo_descrip}</option>))
                }    
              </Form.Select>
            </Form.Group>

            
          </Form>
    </div>
  );
  
}








