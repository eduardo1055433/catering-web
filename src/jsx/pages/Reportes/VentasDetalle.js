import React,{useEffect,useState} from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button as ButtonM } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import axios from "axios";
import { useCounterStore,TemporalStoreFiltros } from "../../../store/counter.store.tsx";
import columnsVentasProducto from "./Columnas"

//defining columns outside of the component is fine, is stable
const columns = [    
    {
      accessorKey: 'ticket',
      header: 'TICKET',
    },
    {
      accessorKey: 'emision_feho',
      header: 'FECHA'
    },
    {
      accessorKey: 'prod_descri',
      header: 'prod_descri',
    },
    {
      accessorKey: 'cantidad',
      header: 'cantidad',
    },
    {
      accessorKey: 'precio',
      header: 'precio',
    },
    {
      accessorKey: 'total',
      header: 'total',
    },
    {
      accessorKey: 'anyomes',
      header: 'anyomes',
    },
    {
      accessorKey: 'clie_docnum',
      header: 'clie_docnum',
    },
    {
      accessorKey: 'clie_razsocial',
      header: 'clie_razsocial',
    }
    
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
  
const csvExporter = new ExportToCsv(csvOptions);
  
const Example = () => {
  const { StrTicket } = TemporalStoreFiltros(
    (states) => ({
      StrTicket: states.StrTicket,
    }));
    const [products, setProducts] = useState( [] );
    const handleExportRows = (rows) => {
      csvExporter.generateCsv(rows.map((row) => row.original));
    };
  
    const handleExportData = () => {
      csvExporter.generateCsv(products);
    };

    const getData = async () => {
    

        var data = JSON.stringify({
            "cschema": "modelo",
            "cticket": StrTicket
        });
    
        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: 'https://api-catering.sisplani.com/reportes/ventas-detalle',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
    
        await axios(config)
        .then(function (response) {
          console.log(response.data.data);
          const data = response.data.data;
          setProducts(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    
    }
useEffect( ()=>{
        getData();
        console.info(StrTicket);
}, [])  

    return (
      <>    
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
      />
      </>
      
    );
};
  
  export default Example;
  