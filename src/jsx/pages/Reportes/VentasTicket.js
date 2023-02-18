import React,{useEffect,useState} from 'react';
import columnsVentaTicket from "./Columnas"
import MaterialReactTable from 'material-react-table';
import { Box,Button as ButtonM ,IconButton} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Assignment from '@mui/icons-material/Assignment';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import axios from "axios";
import shallow from "zustand/shallow";
import { useCounterStore,TemporalStoreFiltros } from "../../../store/counter.store.tsx";
import { ModalSisplani,ModalSisplaniBasic} from "../../components/Sisplani/Modal/MdlFiltroReportes";
import { Row, Card, Col,Button, Modal, Container,Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const columns = [    
  {
      accessorKey: 'emision_feho',
      header: 'Fecha',
   },{
      accessorKey: 'ticket',
      header: 'Ticket',
    },{
      accessorKey: 'total',
      header: 'Total',
    },  
    {
      accessorKey: 'subvencion',
      header: 'Subvencion',
    },{
      accessorKey: 'a_pagar',
      header: 'A pagar',
    },{
      accessorKey: 'a_cuenta',
      header: 'A cta',
    },{
      accessorKey: 'credito',
      header: 'Credito',
    },{
      accessorKey: 'abo_libre',
      header: 'Abo libre',
    },{
      accessorKey: 'clie_docnum',
      header: 'N documento',
    },{
      accessorKey: 'anyomes',
      header: 'Codigo',
    },{
      accessorKey: 'clie_pat',
      header: 'Ap paterno',
    },{
      accessorKey: 'clie_mat',
      header: 'Ap materno',
    },{
      accessorKey: 'clie_nom',
      header: 'Nombre',
    },{
      accessorKey: 'vc_modo',
      header: 'Venta Modo',
    },
];

  
const csvOptions = {
  fieldSeparator: ';',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};
export const Example = () => {
    const { StrFechaInicio,StrFechaFin,Strtipocliente,Strunidad,Strsubdivision,Strcategoria,Strzona,Strcosto,Strpuntoventa,Strservicio,Strtipoventa,StrTicket } = TemporalStoreFiltros(
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
    const [Ticket, setTicket] = useState(StrTicket);
    const [show, setShow] = useState(false);
    const CerrarModalOK = () => setShow(false);
    const MostrarModal = () => setShow(true);

    const [products, setProducts] = useState( [] );
    const handleExportRows = (rows) => {csvExporter.generateCsv(rows.map((row) => row.original))};
    const handleExportData = () => {csvExporter.generateCsv(products)};
    const { OutSetTicket} = TemporalStoreFiltros();


    const getData = async () => {
    

        var data = JSON.stringify({
          "cschema": "modelo",
          "cclie_tipo": Strtipocliente,
          "dfecha_ini": StrFechaInicio,
          "dfecha_fin": StrFechaFin,
          "cunid_id": Strunidad,
          "csubdiv_id": Strsubdivision,
          "ccat_id": Strcategoria,
          "czona_id": Strzona,
          "cccosto_id": Strcosto,
          "cpos_hdserie": Strpuntoventa,
          "cserv_id": Strservicio,
          "cvc_modo": "TODOS",
          "cprod_muestra": "NOPROD"
        });
        console.log(StrFechaInicio);
        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: 'https://api-catering.sisplani.com/reportes/ventas-facturar-x-ticket',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
    
        await axios(config)
        .then(function (response) {
          console.log(response);
          const data = response.data.data;
          setProducts(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    
    }
    
    
 useEffect( ()=>{
        getData();
}, [])  
const CargarNewChanges = () => {
  getData();
  CerrarModalOK();  
};
const navigate = useNavigate(); 
const VentaDetalle = (row) => {
  console.log(row.original.ticket);
  OutSetTicket(row.original.ticket);
  navigate('/VentasDetalle')

};

const csvExporter = new ExportToCsv(csvOptions);

    return (
      <>
      <div>
        <Button variant="primary" onClick={MostrarModal}>
          Parametros
        </Button>
      </div>
      <hr></hr>
      <MaterialReactTable
        columns={columns}
        data={products}
        enableRowSelection
        positionToolbarAlertBanner="bottom"
        initialState={{ density: 'compact' }}
        renderTopToolbarCustomActions={({ table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }} >
            <ButtonM color="primary" onClick={handleExportData} startIcon={<FileDownloadIcon />} variant="contained" >
              Export/Todo
            </ButtonM>
            <ButtonM
              disabled={table.getRowModel().rows.length === 0} onClick={() => handleExportRows(table.getRowModel().rows)}
              startIcon={<FileDownloadIcon />} variant="contained" >
              Export/Page
            </ButtonM>
            <ButtonM disabled={ !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() } onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />} variant="contained" >
              Exportar filas seleccionadas
            </ButtonM>
            </Box>
        )}
        enableRowActions
  renderRowActions={({ row }) => (
    <Box>
    
    <IconButton onClick={() => VentaDetalle(row)}><Assignment /></IconButton>
  </Box>
     )}
      />

      <Modal show={show} onHide={CerrarModalOK} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Opciones de Busqueda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalSisplaniBasic ></ModalSisplaniBasic>
          <Button variant="primary" type="submit" onClick={CargarNewChanges}>Consultar</Button>
        </Modal.Body>
      </Modal>
      </>
    );
};
  
export default Example;

export const getName = () =>{
  console.log("asdasd")
} ;


