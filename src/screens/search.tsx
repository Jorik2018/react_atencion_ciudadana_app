import React, { useState, useEffect, createRef } from 'react';
import Box from '@mui/material/Box';
import { TextField, MenuItem, Paper, Button, Grid, CardActionArea, CardActions, CardMedia, CardContent, CardHeader, Select, SelectChangeEvent } from '@mui/material';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormState, useResize, http } from 'gra-react-utils';
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {
    useNavigate, useParams, useLocation
} from "react-router-dom";
import {
    ExpandMore as ExpandMoreIcon,
    Send as SendIcon,
    Add as AddIcon,
    Room as RoomIcon,
    Search as SearchIcon,
    Keyboard,
    Search,
    ReplyAll,

} from '@mui/icons-material';
import { VRadioGroup } from '../App';

function MainDisabledExample() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const formRef: any = createRef();

    const [o, { defaultProps, bindEvents, validate, set }] = useFormState(useState, {

    }, {});

    const { width, height } = useResize(React);

    const [datos, setDatos] = useState([]);

    useEffect(() => {

        let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        let paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }
        /*const [body, toolBar] = formRef.current.children;
        const nav = document.querySelector('nav');
        body.style.height = (height - header.offsetHeight - toolBar.offsetHeight) + 'px';
        toolBar.style.width = (width - nav.offsetWidth) + 'px';*/
        //}
    }, [width, height]);

    const onClickBuscar = () => {
        if (o.nrodocumento.length > 7) {
            http.get('http://localhost:8080/atencion/search/' + o.nrodocumento).then(result => {
                if (result.length > 0) {
                    setDatos(result);
                } else {
                    setDatos(result);
                    dispatch({ type: "snack", msg: 'Ingrese correctamente su documento de identidad o n??mero de RUC.', severity: 'warning' });
                }
            });
        } else {
            dispatch({ type: "snack", msg: 'Ingrese correctamente su documento de identidad o n??mero de RUC.', severity: 'warning' });
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
                                    SEGUIMIENTO DE TICKET DE ATENCI??N AL CIUDADANO
                                </Typography>

                                <Typography color="text.secondary" className='mt-4'>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={8} >
                                            <TextField
                                                type={'number'}
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="standard-name"
                                                label="N??mero de Documento de Identidad o RUC: "
                                                placeholder="Ingrese el n??mero de Documento de Identidad o RUC"
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
                                        <Grid item xs={12} md={2}>
                                            <Button sx={{ width: 150, padding: 1, margin: 3 }}
                                                onClick={onClickBuscar}
                                                variant="contained" color="success"
                                                endIcon={<Search />}>
                                                Buscar
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Button className='hover-white' sx={{ width: 150, padding: 1, margin: 3 }}
                                                href={process.env.PUBLIC_URL}
                                                variant="contained" color="primary"
                                                endIcon={<ReplyAll />}>
                                                Atras
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12} md={2}>
                                        </Grid>

                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell className='bg-gore table-gore' align="center">N?? de Expediente</StyledTableCell>
                                                        <StyledTableCell className='bg-gore table-gore' align="center">N?? de Documento</StyledTableCell>
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
                                                            <StyledTableCell align="center" className='table-gore'>{e.nroexpediente}</StyledTableCell>
                                                            <StyledTableCell align="center" className='table-gore'>{e.persona.nroDocumento}</StyledTableCell>
                                                            {e.persona.nombape != null && e.persona.representantelegal == null ?
                                                                <>
                                                                    <StyledTableCell align="center" className='table-gore'>{e.persona.nombape}</StyledTableCell>
                                                                </>
                                                                :
                                                                <StyledTableCell align="center" className='table-gore'>{e.persona.representantelegal}</StyledTableCell>
                                                            }
                                                            <StyledTableCell align="center" className='table-gore'>{e.persona.razonsocial}</StyledTableCell>
                                                            <StyledTableCell align="center" className='table-gore'>{e.dependencia.dependencia}</StyledTableCell>
                                                            <StyledTableCell align="center" className='table-gore'>
                                                                <Button variant="contained" color="warning">
                                                                    {e.fecha[2]}/{e.fecha[1]}/{e.fecha[0]}
                                                                </Button>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center" className='table-gore'>
                                                                <Button variant="contained" color="success">
                                                                    {e.horaini}
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
                                </Typography>
                            </CardContent>
                        </Card>
                    </LocalizationProvider>
                </Box>
            </Container>
        </Paper>
    );
}

export default MainDisabledExample;