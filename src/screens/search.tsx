import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button, Grid, CardContent, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormState, useResize, http } from 'gra-react-utils';
import { useDispatch } from "react-redux";
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    Keyboard,
    Search,
    ReplyAll,
} from '@mui/icons-material';

function MainDisabledExample() {

    const dispatch = useDispatch();

    const pad = (num, places) => String(num).padStart(places, '0')

    const [o, { defaultProps }] = useFormState(useState, {

    }, {});

    const { width, height } = useResize(React);

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        let paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }
    }, [width, height]);

    const onClickBuscar = () => {
        if (o.nrodocumento.length > 7) {
            http.get(process.env.REACT_APP_PATH + '/atencion/search/' + o.nrodocumento).then(result => {
                if (result.length > 0) {
                    setDatos(result);
                } else {
                    setDatos(result);
                    dispatch({ type: "snack", msg: 'No se encontro registros de ticket de atención asociadas a su DNI y/o RUC.', severity: 'warning' });
                }
            });
        } else {
            dispatch({ type: "snack", msg: 'Ingrese correctamente su documento de identidad o número de RUC.', severity: 'warning' });
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <Paper className="page color-plomo" style={{ overflow: 'auto' }}>
            <Container maxWidth="lg" >
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Card className='mt-4'>
                            <CardContent>
                                <Typography gutterBottom component="div" fontSize={'30px'} className='text-center fw-bold color-gore'>
                                    SEGUIMIENTO DE TICKET DE ATENCIÓN AL CIUDADANO
                                </Typography>

                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={8} md={8} >
                                        <TextField
                                            type={'number'}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="standard-name"
                                            label="Número de Documento de Identidad o RUC: "
                                            placeholder="Ingrese el número de Documento de Identidad o RUC"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Keyboard />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            {...defaultProps("nrodocumento")}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2} md={2}>
                                        <Button
                                            sx={{ fontWeight: 'bold' }}
                                            className='mt-4 bg-teal '
                                            fullWidth
                                            onClick={onClickBuscar}
                                            variant="contained" color="success"
                                            endIcon={<Search />}>
                                            Buscar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2}>
                                        <Button
                                            sx={{ fontWeight: 'bold' }}
                                            className='mt-4 bg-teal hover-white'
                                            fullWidth
                                            href={process.env.PUBLIC_URL}
                                            variant="contained" color="primary"
                                            endIcon={<ReplyAll />}>
                                            Atras
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={2} md={2}>
                                    </Grid>

                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell className='bg-gore table-gore' align="center">Nº de Expediente</StyledTableCell>
                                                    <StyledTableCell className='bg-gore table-gore' align="center">Nº de Documento</StyledTableCell>
                                                    <StyledTableCell className='bg-gore table-gore' align="center">Apellidos y Nombres</StyledTableCell>
                                                    <StyledTableCell className='bg-gore table-gore' align="center">Razon Social</StyledTableCell>
                                                    <StyledTableCell className='bg-gore table-gore' align="center">Dependencia</StyledTableCell>
                                                    <StyledTableCell className='bg-gore table-gore' align="center">Fecha</StyledTableCell>
                                                    <StyledTableCell className='bg-gore table-gore' align="center">Hora</StyledTableCell>
                                                </TableRow>

                                            </TableHead>
                                            <TableBody>
                                                {datos.map((e: any) => (
                                                    <StyledTableRow>
                                                        <StyledTableCell align="center" className='table-gore'>{e.nroExpediente}</StyledTableCell>
                                                        <StyledTableCell align="center" className='table-gore'>{e.persona.nroDocumento}</StyledTableCell>
                                                        {e.persona.apellidoNombre != null && e.persona.representanteLegal == null ?
                                                            <>
                                                                <StyledTableCell align="center" className='table-gore'>{e.persona.apellidoNombre}</StyledTableCell>
                                                            </>
                                                            :
                                                            <StyledTableCell align="center" className='table-gore'>{e.persona.representanteLegal}</StyledTableCell>
                                                        }
                                                        <StyledTableCell align="center" className='table-gore'>{e.persona.razonSocial}</StyledTableCell>
                                                        <StyledTableCell align="center" className='table-gore'>{e.dependencia.name}</StyledTableCell>
                                                        <StyledTableCell align="center" className='table-gore'>
                                                            <Button variant="contained" color="warning">
                                                                {pad(e.fecha[2], 2)}/{pad(e.fecha[1], 2)}/{e.fecha[0]}
                                                            </Button>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center" className='table-gore'>
                                                            <Button variant="contained" color="success">
                                                                {e.horaIni}
                                                            </Button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>

                                            {/* <TableBody>
                                                    {rows.map((row) => (
                                                        <StyledTableRow key={row.name}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {row.name}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody> */}

                                        </Table>
                                    </TableContainer>

                                    <Grid>

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </LocalizationProvider>
                </Box>
            </Container>
        </Paper>
    );
}

export default MainDisabledExample;