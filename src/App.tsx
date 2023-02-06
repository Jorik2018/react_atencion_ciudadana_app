import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormDisabledExample from './screens/form';
import MainDisabledExample from './screens/main';


import SearchDisabledExample from './screens/search';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { http } from 'gra-react-utils';
import {
  Alert, AppBar, Box, CssBaseline, Drawer, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Snackbar, Toolbar, Typography, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Grid
} from '@mui/material';
import {
  BrowserRouter as Router
} from "react-router-dom";
import {
  Routes,
  Route, useLocation,
  useNavigate
} from "react-router-dom";

function VDialog() {

  const dialog = useSelector((state: any) => state.dialog);

  const options = dialog?.options ?? (dialog?.type === 'confirm' ? ['Cancelar', 'Si'] : ['Cerrar']);

  const dispatch = useDispatch();



  function onClose(e) {
    const el = e.target;
    let index;
    if (el.tagName === 'BUTTON')
      index = Array.prototype.indexOf.call(el.parentNode.children, el);
    if (dialog.cb) dialog.cb(index);
    dispatch({ type: "alert" })
  }

  return dialog ? <Dialog
    open={!!dialog}
    onClose={onClose}>
    <DialogTitle>
      {dialog.title ?? (dialog.type === 'confirm' ? 'Confirmar' : dialog.type === 'error' ? 'Error' : 'Mensaje')}
    </DialogTitle>
    <DialogContent>
      <DialogContentText style={{ lineBreak: 'anywhere' }} dangerouslySetInnerHTML={{ __html: dialog.msg }} ></DialogContentText>
    </DialogContent>
    <DialogActions style={{
      float: 'none',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      {options.map((e, i) => (<Button key={i} onClick={onClose} autoFocus={i === options.length - 1}>{e}</Button>))}
    </DialogActions>
  </Dialog> : null

}

function VSnackbar() {
  const snack = useSelector((state: any) => state.snack);

  const dispatch = useDispatch();

  const onClose = () => { dispatch({ type: "snack" }) };

  return <Snackbar open={!!snack}
    sx={{ bottom: 70 }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    autoHideDuration={2000} onClose={onClose}>
    {<Alert severity={snack && snack.severity || "success"} variant="filled" onClose={onClose} sx={{ width: '100%' }}>
      {snack ? snack.msg : ''}
    </Alert>
    }
  </Snackbar>;
}

function App() {

  const dispatch = useDispatch();

  http.onError = (request) => {
    console.log(request);
    // dispatch({ type: 'error', msg: ('<b>' + request.url + '</b><br/>' + request.error + '->' + request.message) });
  };


  return (
    <div className="App">

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className='bg-gore'>
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2} className="text-center">
                <Box
                  component="img"
                  sx={{
                    maxWidth: 150,
                    paddingTop: 2,
                    paddingLeft: 2,
                    paddingBottom: 2,
                  }}
                  alt="Logo del GORE Áncash."
                  src={process.env.PUBLIC_URL + "/logogore.png"}
                />
              </Grid>

              <Grid item xs={12} md={8} className="text-center mt-4" display={{ xs: "none", lg: "block", md: "block" }}>
                <Typography color="#fff" fontSize={'13px'} fontStyle="italic">
                  “Año de la unidad, la paz y el desarrollo”
                </Typography>
                <Typography color="#fff" fontWeight={'bold'} fontSize={'30px'}>
                  Gobierno Regional de Áncash
                </Typography>
              </Grid>

              <Grid item xs={12} md={2} className="text-center" display={{ xs: "none", lg: "block", md: "block" }}>
                <Box
                  component="img"
                  sx={{
                    maxWidth: 70,
                    paddingTop: 1,
                    paddingLeft: 1,
                    paddingBottom: 1,
                  }}
                  alt="Escudo del Perú."
                  src={process.env.PUBLIC_URL + "/logoperu.png"}
                />
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>



        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path={`/`} element={<MainDisabledExample />} />
            <Route path={`/register`} element={<FormDisabledExample />} />
            <Route path={`/search`} element={<SearchDisabledExample />} />
          </Routes>
        </Router>
      </Box>
      <VSnackbar />
      <VDialog />

    </div>
  );
}

export function VRadioGroup({ children, error, label, value, ...other }) {
  return <FormControl className={error ? 'error' : ''} >
    <FormLabel id={other.name}>{label}</FormLabel>
    <RadioGroup
      aria-labelledby={other.name}
      value={value}
      {...other}
    >
      {children}
    </RadioGroup>
  </FormControl>;
}

export default App;
