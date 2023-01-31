import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormDisabledExample from  './screens/form';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { http } from 'gra-react-utils';
import {
  Alert, AppBar, Box, CssBaseline, Drawer, Divider, IconButton, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Snackbar, Toolbar,
  Typography
} from '@mui/material';
import {
  BrowserRouter as Router
} from "react-router-dom";

function VSnackbar() {
  const snack = useSelector((state:any) => state.snack);

  const dispatch = useDispatch();

  const onClose = () => { dispatch({ type: "snack" }) };

  return <Snackbar open={!!snack}
    sx={{ bottom: 70 }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    autoHideDuration={2000} onClose={onClose}>
    {<Alert severity="success" variant="filled" onClose={onClose} sx={{ width: '100%' }}>
      {snack ? snack.msg : ''}
    </Alert>
    }
  </Snackbar>;
}

function App() {
	
	const dispatch = useDispatch();
	
	http.onError = (request) => {
		dispatch({ type: 'error', msg: ('<b>' + request.url + '</b><br/>' + request.error + '->' + request.message) });
	};

	
  return (
    <div className="App">
		<Router basename={process.env.PUBLIC_URL}>
	  <FormDisabledExample/>
	  </Router>
	  <VSnackbar />
    </div>
  );
}

export default App;
