
const columnsVentaTicket = [    
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
const columnsVentasProducto = [    
    {
      accessorKey: 'prod_descri',
      header: 'prod_descri',
    },
    {
      accessorKey: 'unidades',
      header: 'unidades'
    },
    {
      accessorKey: 'importe',
      header: 'importe',
    },
    
    
  ];
const columnsVentasCliente = [    
    {
      accessorKey: 'total',
      header: 'total',
    },
    {
      accessorKey: 'subvencion',
      header: 'subvencion'
    },
    {
      accessorKey: 'a_pagar',
      header: 'a_pagar',
    },
    {
      accessorKey: 'a_cuenta',
      header: 'a_cuenta',
    },
    {
      accessorKey: 'credito',
      header: 'credito',
    },
    {
      accessorKey: 'unidades',
      header: 'unidades',
    },
    {
      accessorKey: 'clie_docnum',
      header: 'clie_docnum',
    },
    {
      accessorKey: 'clie_codsap',
      header: 'clie_codsap',
    },
    {
      accessorKey: 'clie_pat',
      header: 'clie_pat',
    },
    {
      accessorKey: 'clie_mat',
      header: 'clie_mat',
    },
    {
      accessorKey: 'clie_nom',
      header: 'clie_nom',
    },
    {
      accessorKey: 'unid_descri',
      header: 'unid_descri',
    },
    {
      accessorKey: 'zona_descri',
      header: 'zona_descri',
    },
    {
      accessorKey: 'subdiv_descri',
      header: 'subdiv_descri',
    },
    {
      accessorKey: 'cat_descri',
      header: 'cat_descri',
    },
    {
      accessorKey: 'ccosto_descri',
      header: 'ccosto_descri',
    }
    
  ];
const columnsVentasDetalle = [    
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


const csvOptions1 = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: false,
    useKeysAsHeaders: false,
    headers: columnsVentaTicket.map((c) => c.header),
  };

 