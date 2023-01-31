import React, { useState, useEffect, createRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Box from '@mui/material/Box';
import {TextField,MenuItem,Paper} from '@mui/material';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useFormState, useResize, http } from 'gra-react-utils';
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate, useParams, useLocation
} from "react-router-dom";
import {
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon,
  Add as AddIcon,
  Room as RoomIcon,
  Search as SearchIcon
} from '@mui/icons-material';

function FormDisabledExample() {
	
	const navigate = useNavigate();
	
	const dispatch = useDispatch();

	const formRef:any = createRef();
	
	const [o, { defaultProps, handleChange, bindEvents, validate, set }] = useFormState(useState, {
		'tipoDocumento': '',
		'instructionGrade': '',
		'maritalStatus': '',
		'typeInsurance': '',
		'belongsAssociation': '',
		'carerRequired': ''
	}, {});

  const { width, height } = useResize(React);

  useEffect(() => {

      let header:HTMLElement|null = document.querySelector('.MuiToolbar-root');
	  let paper:HTMLElement|null = document.querySelector('.page');
	  if(header&&paper){
		 paper.style.height = (height - header.offsetHeight) + 'px';
	  }
      /*const [body, toolBar] = formRef.current.children;
      const nav = document.querySelector('nav');
      body.style.height = (height - header.offsetHeight - toolBar.offsetHeight) + 'px';
      toolBar.style.width = (width - nav.offsetWidth) + 'px';*/
    //}
  }, [width, height]);
	
	  const onSubmit = data => console.log(data);
	
	  const onClickSave = async () => {
    const form = formRef.current;
    if (1|| form != null && validate(form)) {
      
      var o2 = JSON.parse(JSON.stringify(o));
      console.log(o2);
	  dispatch({ type: "snack", msg: 'intentar!' });
	  /*if (networkStatus.connected) {*/
        http.post('/api/minsa/disabled-quiz/', o2).then(async (result) => {
          dispatch({ type: "snack", msg: 'Registro grabado!' });
          if (!o2._id) {
            console.log(o2);
            if (result.id)
              navigate('/register/' + result.id + '/edit', { replace: true });
            else
              navigate(-1);
          }
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
      //dispatch({ type: "alert", msg: 'Falta campos por completar!' });
    }
  };
	
  return (
	<Box sx={{ flexGrow: 1 }}>
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				News
				</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
		<Paper className="page" style={{overflow: 'auto'}}>
		<Container maxWidth="sm" >
			<Box
				component="form"
				sx={{
				'& > :not(style)': { m: 1, width2: '25ch' },
				}}
				noValidate
				autoComplete="off"
			 ref={formRef} onSubmit={onSubmit} style={{ textAlign: 'left' }}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
				 
					<Stack spacing={3}>
						<TextField label="INGRESE EL NÚMERO DEL SISGEDO" variant="outlined" />
						<TextField label="INGRESE LA DEPENDENCIA A INGRESAR" variant="outlined" />
						<TextField label="INGRESE EL NÚMERO DEL SISGEDO" variant="outlined" />
						<DateTimePicker
							label="SELECCIONE LA FECHA Y EL HORARIO PARA SU ATENCIÓN"
							value={o.datetime}
							onChange={handleChange}
							renderInput={(params) => <TextField {...params} />}
						/>
						<TextField
							select
							label="SELECCIONA EL TIPO DE PERSONA"
							{...defaultProps("houseAccess")}
							>
							{['Facil', 'Accidentado', 'Otro'].map((item, i) => (
							<MenuItem key={'houseAccess_' + i} value={item}>
							{item}
							</MenuItem>
							))}
						</TextField>
						<TextField
							select
							label="SELECCIONA EL TIPO DE DOCUMENTO"
							{...defaultProps("tipoDocumento")}
							>
							{['Facil', 'Accidentado', 'Otro'].map((item, i) => (
							<MenuItem key={item} value={item}>
							{item}
							</MenuItem>
							))}
						</TextField>
						<TextField
						{...defaultProps("numeroDocumento")}
						label="INGRESE EL NÚMERO DE DOCUMENTO"
						/>
						<TextField
						{...defaultProps("apersona")}
						label="INGRESE LOS DATOS DE LA PERSONA QUE SE APERSONARA AL GORE ÁNCASH"
						/>
						<TextField
						{...defaultProps("direccion")}
						label="INGRESE SU DIRECCIÓN"
						/>
						<TextField
						{...defaultProps("celular")}
						label="INGRESE SU NÚMERO DE CELULAR"
						/>
						
						

						<Stack direction="row" justifyContent="center"
						style={{ padding: '10px' }}
						alignItems="center" spacing={1}>
						<Button variant="contained" onClick={onClickSave} color="primary" >
						Grabar
						</Button>
						</Stack>

					</Stack>
				</LocalizationProvider>
			

			</Box>

		</Container></Paper>
	</Box>

	

  );
}

export default FormDisabledExample;