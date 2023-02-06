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

    const [dates, setDates] = useState([]);

    const [o, { defaultProps, bindEvents, validate, set }] = useFormState(useState, {
        persona: null,
        tipoPersona: 'Persona Natural',
        tipoDocumento: 'DNI'
    }, {});

    const [p] = useFormState(useState, {
        demo: 'holaaa'
    }, {});

    const { width, height } = useResize(React);


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

    const onSubmit = data => console.log(data);

    // function onChangeBirthdate(v) {
    // 	if (v) {
    // 		if (v.toDate) v = v.toDate();
    // 	}
    // 	console.log(v);

    // 	set(o => ({ ...o, fecha: v }));
    // 	/*var age=o.age;
    // 	if(v){
    // 	  if(!v.diff)v=dayjs(v);
    // 	  age=-v.diff(new Date(),'year');
    // 	}
    // 	set(o => ({...o,birthdate: v,age:age}),()=>{
    // 	  console.log('after set');
    // 	});*/
    // }

    const onClickTime = (e: any) => {
        console.log(e.target.textContent);
        var v = e.target.textContent;
        set(o => ({ ...o, horaini: v }));
    }

    const onKeyUp = (e: any) => {
        if (o.tipoDocumento == 'DNI' && o.tipoPersona == 'Persona Natural') {
            if (o.nroDocumento.length == 8) {
                http.get('http://localhost:8080/persona/nrodoc/' + o.nroDocumento).then(result => {

                    if (result) {
                        set(o => ({ ...o, celular: result.celular }));
                        set(o => ({ ...o, nombape: result.nombape }));
                        set(o => ({ ...o, direccion: result.direccion }));
                    } else {
                        set(o => ({ ...o, celular: '' }));
                        set(o => ({ ...o, nombape: '' }));
                        set(o => ({ ...o, direccion: '' }));
                        dispatch({ type: "snack", msg: 'No contamos con sus datos personales, por favor ingrese correctamente.', severity: 'warning' });
                    }
                });
            }
        }
    }

    const onChangeTipoDocumento = (e: SelectChangeEvent<HTMLInputElement>) => {

        set(o => ({ ...o, tipoDocumento: e.target.value }));
        set(o => ({ ...o, nroDocumento: '' }));
        set(o => ({ ...o, celular: '' }));
        set(o => ({ ...o, nombape: '' }));
        set(o => ({ ...o, direccion: '' }));
        set(o => ({ ...o, razonsocial: '' }));
        set(o => ({ ...o, representantelegal: '' }));

    };

    const onChangeTipoPersona = (e: SelectChangeEvent<HTMLInputElement>) => {

        set(o => ({ ...o, tipoPersona: e.target.value }));
        set(o => ({ ...o, tipoDocumento: 'DNI' }));
        set(o => ({ ...o, nroDocumento: '' }));
        set(o => ({ ...o, celular: '' }));
        set(o => ({ ...o, nombape: '' }));
        set(o => ({ ...o, direccion: '' }));
        set(o => ({ ...o, razonsocial: '' }));
        set(o => ({ ...o, representantelegal: '' }));

    };

    const onClickBuscar = () => {
        if (o.nroexpediente.length > 7) {
            http.post('https://web.regionancash.gob.pe/api/sisgedo/' + o.nroexpediente, {}).then((result) => {

                if (result != undefined) {
                    if (result.length != 0) {
                        var l = result[0].operationList;
                        var v = l[l.length - 1].dependencyDestiny || l[l.length - 1].dependency;
                        var r = l[l.length - 1].fullname;

                        set(o => ({ ...o, dependencia: v }));

                        p.dependencia = v;
                        p.nombaperesponsable = r;

                        http.get('http://localhost:8080/dependencia/search/' + v).then(result => {

                            if (result) {
                                set(o => ({ ...o, dependencia_id: result.id }));

                            } else {
                                console.log("array p", p);
                                http.post('http://localhost:8080/dependencia', p).then((result) => {
                                    console.log(result);
                                });
                            }

                            http.get('http://localhost:8080/cronograma/fechaDisponible/' + v).then(result => {
                                setDates(result.times);

                                var d = result.dependency;
                                set(o => ({ ...o, dependencia_id: d }));

                                // var l = result[0].operationList;
                                // var v = l[l.length - 1].dependencyDestiny || l[l.length - 1].dependency;

                                // set(o => ({ ...o, dependencia: v }));
                            });
                        });
                    } else {
                        dispatch({ type: "snack", msg: 'El número de expediente ingresado no existe, intente nuevamente.', severity: 'warning' });
                    }
                } else {
                    dispatch({ type: "snack", msg: 'El número de expediente ingresado no existe, intente nuevamente.', severity: 'warning' });
                }
            });
        } else {
            dispatch({ type: "snack", msg: 'Ingrese los 8 Digitos correspondientes al número de expediente.', severity: 'warning' });
        }
    }

    const pad = (num, places) => String(num).padStart(places, '0')

    const onClickSave = async () => {
        const form = formRef.current;
        console.log(o);
        if (1 || form != null && validate(form)) {
            console.log(o);
            /*var o = JSON.parse(JSON.stringify(o));
            console.log(o);*/

            /*if (networkStatus.connected) {*/

            http.get('http://localhost:8080/persona/nrodoc/' + o.nroDocumento).then(async result => {

                if (result) {
                    var p = result.id;
                    o.persona = { id: p };
                } else {
                    await http.post('http://localhost:8080/persona', o).then((result) => {
                        if (result) {
                            console.log("Persona registrada");
                            o.persona = { id: result.id };
                        }
                    });

                }

                // var l = result[0].operationList;
                // var v = l[l.length - 1].dependencyDestiny || l[l.length - 1].dependency;

                // set(o => ({ ...o, dependencia: v }));
                // console.log(o);


                http.post('http://localhost:8080/atencion', { ...o, dependencia: { id: o.dependencia_id } }).then(async (result) => {

                    if (result) {
                        dispatch({ type: "snack", msg: 'Registro grabado!' });
                        set(o => ({}));

                        if (!o._id) {
                            console.log(o);
                            // if (result.id)
                            // 	navigate('/register/' + result.id + '/edit', { replace: true });
                            // else
                            // 	navigate(-1);
                        }
                    }

                });

            });
            /*
                  } else {
                    if (!o2.id) {
                      o2.tmpId = 1 * new Date();
                      o2.id = -o2.tmpId;
                      //await db.disabled.add(o2);
                     // navigate('/' + o2.id + '/edit', { replace: true });
                    } else {
                      //await db.disabled.update(o2.id, o2);
                    }
                    //dispatch({ type: "snack", msg: 'Registro grabado!' });
                  }*/
        } else {
            dispatch({ type: "alert", msg: 'Falta campos por completar!' });
        }
    };

    return (
        <Paper className="page color-plomo" style={{ overflow: 'auto' }}>
            <Container maxWidth="lg" >

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width2: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    ref={formRef} onSubmit={onSubmit} style={{ textAlign: 'left' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <Card className='mt-4'>
                            <CardContent>
                                <Typography gutterBottom component="div" fontSize={'30px'} className='text-center fw-bold color-gore'>
                                    SEGUIMIENTO DE TICKET DE ATENCIÓN AL CIUDADANO
                                </Typography>

                                <Typography color="text.secondary" className='mt-4'>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={8} >
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="standard-name"
                                                label="Número de Ticket: "
                                                placeholder="Ingrese el número de Ticket"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Keyboard />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                {...defaultProps("nroticket")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Button sx={{ width:150, padding: 1, margin: 3 }}
                                                onClick={onClickBuscar}
                                                variant="contained" color="success"
                                                endIcon={<Search />}>
                                                Buscar
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Button sx={{ width:150, padding: 1, margin: 3 }}
                                                href={process.env.PUBLIC_URL}
                                                variant="contained" color="primary"
                                                endIcon={<ReplyAll />}>
                                                Atras
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12} md={2}>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={process.env.PUBLIC_URL + "/search-form.jpg"}
                                                alt="Seguimiento de cita de atención al cuidadano."
                                            />
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