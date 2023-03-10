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
	ReplyAll,
	WifiProtectedSetup,

} from '@mui/icons-material';
import { VRadioGroup } from '../App';

function FormDisabledExample() {

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const formRef: any = createRef();

	const [dates, setDates] = useState([]);

	const [dias, setDias] = useState([] as any);

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

	const onClickTime = (e: any) => {
		console.log(e.target.textContent);
		var v = e.target.textContent;
		set(o => ({ ...o, horaini: v }));
	}

	const onClickCambiarHora = (e: any) => {
		set(o => ({ ...o, horaini: '' }));
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

		if (o.tipoDocumento == 'RUC' && o.tipoPersona == 'Persona Jur??dica') {
			if (o.nroDocumento.length == 11) {
				http.get('http://localhost:8080/persona/nrodoc/' + o.nroDocumento).then(result => {

					if (result) {
						set(o => ({ ...o, razonsocial: result.razonsocial }));
						set(o => ({ ...o, celular: result.celular }));
						set(o => ({ ...o, direccion: result.direccion }));
						set(o => ({ ...o, nombape: '' }));
					} else {
						set(o => ({ ...o, razonsocial: '' }));
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

	const onChangeDia = (e: SelectChangeEvent<HTMLInputElement>) => {

		console.log(e.target.value);
		o.dia = e.target.value;
		set(o => ({ ...o, dia: e.target.value }));

		http.get('http://localhost:8080/cronograma/fechaDisponible/' + p.dependencia + '?dia=' + o.dia).then(result => {
			setDates(result.times);

			var d = result.dependency;
			set(o => ({ ...o, dependencia_id: d }));

			// var l = result[0].operationList;
			// var v = l[l.length - 1].dependencyDestiny || l[l.length - 1].dependency;

			// set(o => ({ ...o, dependencia: v }));
		});

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

								o.dependencia_id = result.id;

								http.get('http://localhost:8080/cronograma/dependencia/' + o.dependencia_id).then(response => {

									if (response) {
										setDias(response);
									}
									console.log(response);

									// var l = result[0].operationList;
									// var v = l[l.length - 1].dependencyDestiny || l[l.length - 1].dependency;

									// set(o => ({ ...o, dependencia: v }));
								});

							} else {
								console.log("array p", p);
								http.post('http://localhost:8080/dependencia', p).then((result) => {
									console.log(result);
								});
							}






						});
					} else {
						dispatch({ type: "snack", msg: 'El n??mero de expediente ingresado no existe, intente nuevamente.', severity: 'warning' });
					}
				} else {
					dispatch({ type: "snack", msg: 'El n??mero de expediente ingresado no existe, intente nuevamente.', severity: 'warning' });
				}
			});
		} else {
			dispatch({ type: "snack", msg: 'Ingrese los 8 Digitos correspondientes al n??mero de expediente.', severity: 'warning' });
		}
	}

	const onClickSearchDias = () => {
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

					} else {
						dispatch({ type: "snack", msg: 'El n??mero de expediente ingresado no existe, intente nuevamente.', severity: 'warning' });
					}
				} else {
					dispatch({ type: "snack", msg: 'El n??mero de expediente ingresado no existe, intente nuevamente.', severity: 'warning' });
				}
			});
		} else {
			dispatch({ type: "snack", msg: 'Ingrese los 8 Digitos correspondientes al n??mero de expediente.', severity: 'warning' });
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
								<Typography gutterBottom variant="h5" component="div" className='text-center fw-bold color-gore'>
									DATOS DEL EXPEDIENTE
								</Typography>

								<Typography variant="body2" color="text.secondary">
									<Grid container spacing={1}>
										<Grid item xs={12} md={4} >
											<TextField
												type={'number'}
												margin="normal"
												required
												fullWidth
												id="standard-name"
												label="N??mero de Expediente: "
												placeholder="Ingrese el n??mero de Expediente"
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<Keyboard />
														</InputAdornment>
													),
												}}
												{...defaultProps("nroexpediente")}
											/>
										</Grid>
										<Grid item xs={12} md={2}>
											<Button sx={{ width: 150, padding: 1, margin: 3 }}
												onClick={onClickBuscar}
												variant="contained" color="success"
												endIcon={<SendIcon />}>
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

									</Grid>

									<Grid container>
										<Grid item xs={12} md={12}>
											<TextField
												margin="normal"
												required
												fullWidth
												disabled={true}
												size="medium"
												id="standard-name"
												label="Dependencia donde se encuentra su tr??mite: "
												placeholder="Dependencia"
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<Keyboard />
														</InputAdornment>
													),
												}}
												{...defaultProps("dependencia")}
											/>
										</Grid>
									</Grid>

									<Grid container>
										<Grid item xs={12} md={4} >
											<TextField
												select
												margin="normal"
												required
												fullWidth
												id="standard-name"
												label="Seleccione el D??a de la Semana: "
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<Keyboard />
														</InputAdornment>
													),
												}}
												{...defaultProps("dia", {
													onChange: onChangeDia
												})}
											>
												{dias.map((item, i) => (
													<MenuItem key={item.id} value={item.dia}>
														{item.texto}
													</MenuItem>
												))}
											</TextField>
										</Grid>
									</Grid>

									{o.dependencia ? <> {!o.horaini ?
										<Grid container>
											<Grid item xs={12} md={12}>
												<FormControl>
													<FormLabel id="demo-row-radio-buttons-group-label">Seleccione la Fecha para separar su Cita:</FormLabel>

													<VRadioGroup
														{...defaultProps("fecha")}
													>
														{
															dates.map(e => {
																var d: any = e[0];
																if (d) {
																	d = new Date(d);
																}
																var fecha = d.getFullYear() + '-' + pad(d.getMonth() + 1, 2) + '-' + pad(d.getDate(), 2);
																var f: any;
																f = d.getDate() + '/' + pad(d.getMonth() + 1, 2) + '/' + pad(d.getFullYear(), 2) + '   ||   Nro Citas Reservados:' + e[1];

																return <div key={f}>
																	<FormControlLabel value={fecha} control={<Radio />} label={fecha} />
																	<br></br>
																	{o.fecha === fecha ? (e[1] as any).map(ee =>
																		<div className='time' key={ee} onClick={onClickTime} style={{ border: '1px solid #757575', cursor: ee[1] ? 'not-allowed' : 'pointer', padding: 10, backgroundColor: ee[1] && '#ef5350', color: ee[1] ? '#fff' : '#000', textAlign: 'center', display: 'inline-block', width: '33.333%' }}>{ee}</div>) : null}
																</div>
															})
														}

													</VRadioGroup>
												</FormControl>
											</Grid>
										</Grid> : <>
											<Grid container>
												<Grid item xs={12} md={10}>
													<TextField
														margin="normal"
														required
														fullWidth
														disabled
														id="standard-name"
														label="Hora de Ingreso al GORE ??ncash: "
														value={o.horaini}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<Keyboard />
																</InputAdornment>
															),
														}}
													/>
												</Grid>
												<Grid item xs={12} md={2}>
													<Button sx={{ width: 150, padding: 1, margin: 3 }}
														onClick={onClickCambiarHora}
														variant="contained" color="success"
														endIcon={<WifiProtectedSetup />}>
														Modificar
													</Button>
												</Grid>
											</Grid>
										</>}

										{o.horaini ?
											<>
												<Grid container>
													<Grid item xs={12} md={12}>
														<TextField
															margin="normal"
															required
															fullWidth
															multiline
															size="medium"
															rows={4}
															id="standard-name"
															label="Ingrese el Motivo de su visita al GORE ??ncash: "
															placeholder="Motivo"
															{...defaultProps("motivo")}
														/>
													</Grid>
												</Grid>
											</>
											: null}
									</>
										: null}
								</Typography>
							</CardContent>
						</Card>


						{o.horaini ?
							<>
								<Card>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											Datos Personales
										</Typography>
										<Typography variant="body2" color="text.secondary">
											<Grid container spacing={1}>
												<Grid item xs={12} md={4} >
													<TextField
														select
														margin="normal"
														required
														fullWidth
														id="standard-name"
														label="Seleccione el Tipo de Persona: "
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<Keyboard />
																</InputAdornment>
															),
														}}
														{...defaultProps("tipoPersona", {
															onChange: onChangeTipoPersona
														})}
													>
														{['Persona Natural', 'Persona Jur??dica'].map((item, i) => (
															<MenuItem key={'houseAccess_' + i} value={item}>
																{item}
															</MenuItem>
														))}
													</TextField>
												</Grid>


												<Grid item xs={12} md={4} >
													<TextField
														select
														margin="normal"
														required
														fullWidth
														id="standard-name"
														label="Seleccione el Tipo de Documento: "
														// onChange={onChangeTipoDocumento}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<Keyboard />
																</InputAdornment>
															),
														}}
														{...defaultProps("tipoDocumento", {
															onChange: onChangeTipoDocumento
														})}
													>
														{['DNI', 'RUC', 'Carnet de Extranjer??a'].map((item, i) => (
															<MenuItem key={'houseAccess_' + i} value={item}>
																{item}
															</MenuItem>
														))}
													</TextField>
												</Grid>

												<Grid item xs={12} md={4} >
													<TextField
														type={'number'}
														sx={{ fontWeight: 'bold' }}
														margin="normal"
														required
														fullWidth
														id="standard-name"
														label="N??mero de Documento: "
														placeholder="Ingrese el n??mero de Documento."
														onKeyUp={onKeyUp}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<Keyboard />
																</InputAdornment>
															),
														}}
														{...defaultProps("nroDocumento")}
													/>
												</Grid>
											</Grid>

											{o.tipoPersona == "Persona Natural" ?
												<>
													<Grid container>
														<Grid item xs={12} md={12}>
															<TextField
																margin="normal"
																required
																fullWidth
																size="medium"
																id="standard-name"
																label="Ingrese sus Apellidos y Nombres: "
																placeholder="Apellidos y Nombres."
																InputProps={{
																	startAdornment: (
																		<InputAdornment position="start">
																			<Keyboard />
																		</InputAdornment>
																	),
																}}
																{...defaultProps("nombape")}
															/>
														</Grid>
													</Grid>
												</>
												: null}

											{o.tipoPersona == "Persona Jur??dica" ?
												<>
													<Grid container>
														<Grid item xs={12} md={12}>
															<TextField
																margin="normal"
																required
																fullWidth
																size="medium"
																id="standard-name"
																label="Ingrese su Razon Social: "
																placeholder="Razon Social."
																InputProps={{
																	startAdornment: (
																		<InputAdornment position="start">
																			<Keyboard />
																		</InputAdornment>
																	),
																}}
																{...defaultProps("razonsocial")}
															/>
														</Grid>
													</Grid>

													<Grid container>
														<Grid item xs={12} md={12}>
															<TextField
																margin="normal"
																required
																fullWidth
																size="medium"
																id="standard-name"
																label="Ingrese los Datos Personales de la Persona que se apersonara al GORE - ??ncash: "
																placeholder="Apellidos y Nombres completos."
																InputProps={{
																	startAdornment: (
																		<InputAdornment position="start">
																			<Keyboard />
																		</InputAdornment>
																	),
																}}
																{...defaultProps("representantelegal")}
															/>
														</Grid>
													</Grid>
												</>
												: null}

											<Grid container spacing={1}>
												<Grid item xs={12} md={6}>
													<TextField
														margin="normal"
														required
														fullWidth
														size="medium"
														id="standard-name"
														label="Ingrese su Direcci??n: "
														placeholder="Direcci??n."
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<Keyboard />
																</InputAdornment>
															),
														}}
														{...defaultProps("direccion")}
													/>
												</Grid>
												<Grid item xs={12} md={6}>
													<TextField
														type={'number'}
														margin="normal"
														required
														fullWidth
														size="medium"
														id="standard-name"
														label="Ingrese su n??mero de Celular: "
														placeholder="N??mero de Celular."
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<Keyboard />
																</InputAdornment>
															),
														}}
														{...defaultProps("celular")}
													/>
												</Grid>
											</Grid>
										</Typography>
									</CardContent>
								</Card>

								<Stack spacing={1}>
									{/* <span >{o.nroexpediente}</span> */}
									<Stack direction="row" justifyContent="center"
										style={{ padding: '10px' }}
										alignItems="center" spacing={1}>
										<Button variant="contained" onClick={onClickSave} color="primary" >
											Grabar
										</Button>
									</Stack>
								</Stack>
							</>

							: null}



					</LocalizationProvider>
				</Box>


			</Container>
		</Paper>
	);
}

export default FormDisabledExample;