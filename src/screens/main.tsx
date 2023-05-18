import React, { useEffect, createRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Paper, Button, Grid, CardActionArea, CardActions, CardMedia, CardContent, Alert } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useResize } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { Movie, PictureAsPdf, Send as SendIcon } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

function MainDisabledExample() {

    const formRef: any = createRef();

    const { width, height } = useResize(React);

    const [open, setOpen] = React.useState(false);

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {

        let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        let paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }

        handleOpen();

    }, [width, height]);

    const onSubmit = data => console.log(data);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    useEffect(() => {
        // Actualizar la hora cada segundo
        const interval = setInterval(() => {
            const date = new Date();
            const time = date.toLocaleTimeString();
            setCurrentTime(time);
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => {
            clearInterval(interval);
        };
    }, []);

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
                        <Card className='mt-5 bg-gore'>
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
                                            {/* {currentTime >= "08:00:00" && currentTime <= "16:30:00" ?
                                                <> */}
                                                    <CardActions className='pl-6'>
                                                        <Button fullWidth className='hover-white bg-teal' variant="contained" color="success" startIcon={<SendIcon />} href={process.env.PUBLIC_URL + "/register"}>
                                                            INGRESAR
                                                        </Button>
                                                    </CardActions>
                                                {/* </>
                                                : <Alert severity="warning">Recuerde que el horario de atención para sacar citas es de Lunes a Viernes de 08:00 am - 04:30 pm.</Alert>
                                            } */}
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
                            <CardActions>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Button fullWidth className='hover-white bg-teal' variant="contained" color="success" startIcon={<PictureAsPdf />} href="https://web.regionancash.gob.pe/fs/upload/MU%20-%20REGISTRO%20DE%20TICKET%20DE%20ATENCION%20AL%20CIUDADANO.pdf" target={'_blank'}>
                                                Manual de Usuario - Ver PDF
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Button fullWidth className='hover-white bg-teal' variant="contained" color="success" startIcon={<Movie />} href={process.env.PUBLIC_URL + "/video"}>
                                                Manual de Usuario - Ver Video
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </CardActions>
                        </Card>

                    </LocalizationProvider>
                </Box>

                {/* <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                           Bienvenido !!!
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            Gobierno Regional de Áncash - Trasparencia
                        </Typography>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal> */}

            </Container>
        </Paper>
    );
}

export default MainDisabledExample;