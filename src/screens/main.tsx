import React, { useEffect, createRef } from 'react';
import Box from '@mui/material/Box';
import { Paper, Button, Grid, CardActionArea, CardActions, CardMedia, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useResize } from 'gra-react-utils';
import Card from '@mui/material/Card';
import {
    Send as SendIcon,
} from '@mui/icons-material';

function MainDisabledExample() {

    const formRef: any = createRef();

    const { width, height } = useResize(React);

    useEffect(() => {

        let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        let paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }

    }, [width, height]);

    const onSubmit = data => console.log(data);

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

                        <Card className='mt-4 bg-gore'>
                            <CardContent>
                                <Typography gutterBottom component="div" fontSize={'30px'} className='text-center fw-bold' color={'white'}>
                                    REGISTRO DE ATENCIÓN AL CIUDADANO
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <Card>
                                            <CardActionArea className='mt-4'>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={process.env.PUBLIC_URL + "/sisgedo.jpg"}
                                                    alt="Busqueda SISGEDO."
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                                                        Paso Nº 01
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
                                                        Recuerde que antes de registrar una cita ud. debe de verificar el área donde se encuentre su trámite administrativo.
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions className='pl-6'>
                                                <Button fullWidth className='hover-white bg-teal' variant="contained" color="success" href='http://sisgedo.regionancash.gob.pe/sisgedonew/app/main.php' target={'_blank'} startIcon={<SendIcon />}>
                                                    INGRESAR
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <Card>
                                            <CardActionArea className='mt-4'>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={process.env.PUBLIC_URL + "/register-form.jpg"}
                                                    alt="Registrar cita de atención al cuidadano."
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                                                        Paso Nº 02
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
                                                        Ya habiendo corroborado la ubicación de su trámite administrativo, registre su cita para su atención.
                                                        <br />
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions className='pl-6'>
                                                <Button fullWidth className='hover-white bg-teal' variant="contained" color="success" startIcon={<SendIcon />} href={process.env.PUBLIC_URL + "/register"}>
                                                    INGRESAR
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <Card>
                                            <CardActionArea className='mt-4'>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={process.env.PUBLIC_URL + "/search-form.jpg"}
                                                    alt="Seguimiento de cita de atención al cuidadano."
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                                                        Paso Nº 03
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
                                                        ¿No recuerdas el dia y la hora de su cita?<br /><br />Búscalo Aquí con tu número de documento.
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions className='pl-6'>
                                                <Button fullWidth className='hover-white bg-teal' variant="contained" color="success" startIcon={<SendIcon />} href={process.env.PUBLIC_URL + "/search"}>
                                                    INGRESAR
                                                </Button>
                                            </CardActions>
                                        </Card>
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