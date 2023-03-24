import React, { useEffect, createRef } from 'react';
import Box from '@mui/material/Box';
import { Paper, Button, Grid, CardActions, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useResize } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { ReplyAll } from '@mui/icons-material';

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
                        <Card className='mt-2 bg-gore'>
                            <CardContent className='pb-0'>
                                <Typography gutterBottom component="div" fontSize={'30px'} className='text-center fw-bold' color={'white'}>
                                    VIDEO TUTORIAL DE ATENCIÓN AL CIUDADANO
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Box sx={{ maxWidth: '100%', textAlign:'center' }}>
                                            <video style={{ maxWidth: '90%', border: '5px solid #fff' }} controls src="https://web.regionancash.gob.pe/fs/upload/tutorial_atencion_ciudadano.mp4" />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Button
                                                sx={{ fontWeight: 'bold' }}
                                                className='bg-teal hover-white'
                                                fullWidth
                                                href={process.env.PUBLIC_URL}
                                                variant="contained" color="primary"
                                                endIcon={<ReplyAll />}>
                                                Atras
                                            </Button>
                                        </Grid>
                                    </Grid>
                            </CardActions>
                        </Card>
                    </LocalizationProvider>
                </Box>
            </Container>
        </Paper>
    );
}

export default MainDisabledExample;