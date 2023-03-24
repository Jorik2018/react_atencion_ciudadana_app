import React, { useState, useEffect, createRef } from 'react';
import Box from '@mui/material/Box';
import { TextField, MenuItem, Paper, Button, Grid, CardContent, SelectChangeEvent, Alert } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormState, useResize, http } from 'gra-react-utils';
import { useDispatch } from "react-redux";
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import {
	Keyboard,
	ReplyAll,
	WifiProtectedSetup,
} from '@mui/icons-material';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { VRadioGroup } from '../App';

function FormDisabledExample() {

	const dispatch = useDispatch();

	const formRef: any = createRef();

	const [dates, setDates] = useState([]);

	const [dias, setDias] = useState([] as any);

	const [dependencias, setDependencias] = useState([] as any);

	const navigate = useNavigate();

	const [o, { defaultProps, validate, set }] = useFormState(useState, {
		persona: null,
		tipoPersona: 'Persona Natural',
		tipoDocumento: 'DNI'
	}, {});

	const [p] = useFormState(useState, {
	}, {});

	const { width, height } = useResize(React);

	const pad = (num, places) => String(num).padStart(places, '0')

	useEffect(() => {
		let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
		let paper: HTMLElement | null = document.querySelector('.page');
		if (header && paper) {
			paper.style.height = (height - header.offsetHeight) + 'px';
		}
	}, [width, height]);

	const onSubmit = data => console.log(data);

	const onClickTime = (e: any) => {
		var v = e.target.textContent;
		set(o => ({ ...o, horaIni: v }));
	}

	const onClickCambiarHora = (e: any) => {
		set(o => ({ ...o, horaIni: '' }));
	}

	function disableApellidoNombre() {
		return !!o.apellidoNombre;
	}

	function disableDireccion() {
		return !!o.direccion;
	}

	const onKeyUp = (e: any) => {
		if (o.tipoDocumento == 'DNI' && o.tipoPersona == 'Persona Natural') {
			if (o.nroDocumento.length == 8) {
				http.get(process.env.REACT_APP_PATH + '/persona/nrodoc/' + o.nroDocumento).then(result => {
					if (result) {
						set(o => ({ ...o, celular: result.celular }));
						set(o => ({ ...o, apellidoNombre: result.apellidoNombre }));
						set(o => ({ ...o, direccion: result.direccion }));
					} else {
						http.get('https://web.regionancash.gob.pe/api/reniec/Consultar?nuDniConsulta=' + o.nroDocumento + '&out=json', (h) => {
							return { "Content-Type": "*/*" };
						}).then(result => {
							console.log(result);
							if (result.consultarResponse.return.coResultado === "0000") {
								let v = result.consultarResponse.return.datosPersona;
								let apename = v.prenombres + ' ' + v.apPrimer + '' + v.apSegundo;
								set(o => ({ ...o, apellidoNombre: apename }));
								set(o => ({ ...o, direccion: v.direccion }));
							} else {
								set(o => ({ ...o, celular: '' }));
								set(o => ({ ...o, apellidoNombre: '' }));
								set(o => ({ ...o, direccion: '' }));
								dispatch({ type: "snack", msg: 'No contamos con sus datos personales, por favor ingrese correctamente.', severity: 'warning' });
							}
						}).catch(error => {
							console.log(error)
						})
					}
				});
			}
		}

		if (o.tipoDocumento == 'RUC' && o.tipoPersona == 'Persona Jurídica') {
			if (o.nroDocumento.length == 11) {
				http.get(process.env.REACT_APP_PATH + '/persona/nrodoc/' + o.nroDocumento).then(result => {
					if (result) {
						set(o => ({ ...o, razonSocial: result.razonSocial }));
						set(o => ({ ...o, celular: result.celular }));
						set(o => ({ ...o, direccion: result.direccion }));
						set(o => ({ ...o, apellidoNombre: '' }));
					} else {
						set(o => ({ ...o, razonSocial: '' }));
						set(o => ({ ...o, celular: '' }));
						set(o => ({ ...o, apellidoNombre: '' }));
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
		set(o => ({ ...o, apellidoNombre: '' }));
		set(o => ({ ...o, direccion: '' }));
		set(o => ({ ...o, razonSocial: '' }));
		set(o => ({ ...o, representanteLegal: '' }));
	};

	const onChangeTipoPersona = (e: SelectChangeEvent<HTMLInputElement>) => {
		set(o => ({ ...o, tipoPersona: e.target.value }));
		set(o => ({ ...o, tipoDocumento: 'DNI' }));
		set(o => ({ ...o, nroDocumento: '' }));
		set(o => ({ ...o, celular: '' }));
		set(o => ({ ...o, apellidoNombre: '' }));
		set(o => ({ ...o, direccion: '' }));
		set(o => ({ ...o, razonSocial: '' }));
		set(o => ({ ...o, representanteLegal: '' }));
	};

	const onChangeDia = (e: SelectChangeEvent<HTMLInputElement>) => {
		o.dia = e.target.value;
		set(o => ({ ...o, dia: e.target.value }));
		http.get(process.env.REACT_APP_PATH + '/cronograma/fechaDisponible/' + p.dependencia + '?dia=' + o.dia).then(result => {
			setDates(result.times);
			var d = result.dependency;
			set(o => ({ ...o, dependencia_id: d }));
		});
	};

	const onClickSave = async () => {
		const form = formRef.current;
		if (1 || form != null && validate(form)) {
			http.get(process.env.REACT_APP_PATH + '/persona/nrodoc/' + o.nroDocumento).then(async result => {
				if (result) {
					var p = result.id;
					o.persona = { id: p };
				} else {
					await http.post(process.env.REACT_APP_PATH + '/persona', o).then((result) => {
						if (result) {
							o.persona = { id: result.id };
						}
					});
				}

				http.post(process.env.REACT_APP_PATH + '/atencion', { ...o, dependencia: { id: o.dependencia_id } }).then(async (result) => {
					if (result) {
						dispatch({ type: "snack", msg: 'Registro grabado!' });
						set(o => ({}));
						navigate('/search', { replace: true });
						if (!o._id) {
						}
					}
				});
			});
		} else {
			dispatch({ type: "alert", msg: 'Falta campos por completar!' });
		}
	};

	const onChangeDependencia = (e: SelectChangeEvent<HTMLInputElement>) => {
		if (o.nroExpediente) {
			o.dependencia = e.target.value;
			set(o => ({ ...o, dependencia: e.target.value }));
			var dep = dependencias.find((e) => o.dependencia == e.id);
			p.dependencia = dep.name;
			http.get(process.env.REACT_APP_PATH + '/cronograma/dependencia/' + o.dependencia).then(response => {
				if (response) {
					o.dia = '';
					o.horaIni = '';
					set(o => ({ ...o, dia: '' }));
					set(o => ({ ...o, horaIni: '' }));
					setDias(response);
				}
			});
		} else {
			dispatch({ type: "snack", msg: 'Ingrese el número de su expediente del SISGEDO.', severity: 'warning' });
		}
	};

	useEffect(() => {
		fetchData()
	}, []);

	const fetchData = async () => {
		const result = await (http.get(process.env.REACT_APP_PATH + '/dependencia'));
		if (result != '') {
			setDependencias(result);
		}
	};

	return (
		<Paper className="page color-plomo" style={{ overflow: 'auto' }}>
			<Container maxWidth="lg" >
				<Box
					component="form"
					sx={{ '& > :not(style)': { m: 1, width2: '25ch' } }}
					noValidate
					autoComplete="off"
					ref={formRef} onSubmit={onSubmit} style={{ textAlign: 'left' }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Card className='mt-4'>
							<CardContent>
								<Alert severity="warning">Recuerde que antes de registrar su cita Ud. debe de verificar en que gerencia, subgerencia y/o area se encuentra su trámite administrativo, en la consulta SISGEDO que se encuentra en el siguiente <a target={'_blank'} href="http://sisgedo.regionancash.gob.pe/sisgedonew/app/main.php"><b>LINK</b></a>, del caso contrario no será valida la cita registrada.</Alert>
								<Typography gutterBottom variant="h5" component="div" className='text-center fw-bold color-gore mt-3'>
									DATOS DEL EXPEDIENTE
								</Typography>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={6} md={4}>
										<TextField
											type={'number'}
											margin="normal"
											required
											fullWidth
											id="standard-name"
											label="Número de Expediente: "
											placeholder="Ingrese el número de Expediente"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<Keyboard />
													</InputAdornment>
												),
											}}
											{...defaultProps("nroExpediente")}
										/>
									</Grid>
									<Grid item xs={12} sm={2} md={2}>
										<Button
											sx={{ fontWeight: 'bold' }}
											className='bg-teal mt-3 hover-white'
											fullWidth
											href={process.env.PUBLIC_URL}
											variant="contained" color="primary"
											endIcon={<ReplyAll />}>
											Atras
										</Button>
									</Grid>
								</Grid>
								{o.nroExpediente ? <>
									<Grid container>
										<Grid item xs={12} md={12} >
											<TextField
												select
												margin="normal"
												required
												fullWidth
												id="standard-name"
												label="Seleccione la Dependencia: "
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<Keyboard />
														</InputAdornment>
													),
												}}
												{...defaultProps("dependencia", {
													onChange: onChangeDependencia
												})}
											>
												{dependencias.map((item, i) => (
													<MenuItem key={item.id} value={item.id}>
														{item.name}
													</MenuItem>
												))}
											</TextField>
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
												label="Seleccione el Día de la Semana: "
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
								</> : null}
								{o.dia ? <> {!o.horaIni ?
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
																	<div className='time' key={ee} onClick={onClickTime} style={{ border: '1px solid #757575', cursor: ee[1] ? 'not-allowed' : 'pointer', pointerEvents: ee[1] ? 'none' : 'auto', padding: 10, backgroundColor: ee[1] && '#ef5350', color: ee[1] ? '#fff' : '#000', textAlign: 'center', display: 'inline-block', width: '33.333%' }}>{ee}</div>) : null}
															</div>
														})
													}

												</VRadioGroup>
											</FormControl>
										</Grid>
									</Grid> : <>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={9} md={9}>
												<TextField
													margin="normal"
													required
													fullWidth
													disabled
													id="standard-name"
													label="Hora de Ingreso al GORE Áncash: "
													value={o.horaIni}
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																<Keyboard />
															</InputAdornment>
														),
													}}
												/>
											</Grid>
											<Grid item xs={12} sm={3} md={3}>
												<Button sx={{ fontWeight: 'bold' }}
													className='bg-teal mt-3 text-bold'
													fullWidth
													onClick={onClickCambiarHora}
													variant="contained" color="success"
													endIcon={<WifiProtectedSetup />}>
													Modificar
												</Button>
											</Grid>
										</Grid>
									</>}
									{o.horaIni ?
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
														label="Ingrese el Motivo de su visita al GORE Áncash: "
														placeholder="Motivo"
														{...defaultProps("motivo")}
													/>
												</Grid>
											</Grid>
										</>
										: null}
								</>
									: null}
							</CardContent>
						</Card>
						{o.horaIni ?
							<>
								<Card>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											Datos Personales
										</Typography>
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
													{['Persona Natural', 'Persona Jurídica'].map((item, i) => (
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
													{['DNI', 'RUC', 'Carnet de Extranjería'].map((item, i) => (
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
													label="Número de Documento: "
													placeholder="Ingrese el número de Documento."
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
															disabled={disableApellidoNombre()}
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
															{...defaultProps("apellidoNombre")}
														/>
													</Grid>
												</Grid>
											</>
											: null}

										{o.tipoPersona == "Persona Jurídica" ?
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
															{...defaultProps("razonSocial")}
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
															label="Ingrese los Datos Personales de la Persona que se apersonara al GORE - Áncash: "
															placeholder="Apellidos y Nombres completos."
															InputProps={{
																startAdornment: (
																	<InputAdornment position="start">
																		<Keyboard />
																	</InputAdornment>
																),
															}}
															{...defaultProps("representanteLegal")}
														/>
													</Grid>
												</Grid>
											</>
											: null}

										<Grid container spacing={1}>
											<Grid item xs={12} md={6}>
												<TextField
													disabled={disableDireccion()}
													margin="normal"
													required
													fullWidth
													size="medium"
													id="standard-name"
													label="Ingrese su Dirección: "
													placeholder="Dirección."
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
													label="Ingrese su número de Celular: "
													placeholder="Número de Celular."
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
									</CardContent>
								</Card>
								<Stack spacing={1}>
									<Stack direction="row" justifyContent="center"
										style={{ padding: '10px' }}
										alignItems="center" spacing={1}>
										<Button
											sx={{ fontWeight: 'bold' }}
											variant="contained"
											onClick={onClickSave}
											color="primary"
											endIcon={<LibraryAddCheckIcon />}>
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