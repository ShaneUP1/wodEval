import React from 'react';
import { Card, Grid, Typography } from '@mui/material';

const WodCard = (): JSX.Element => {
    return (
        <Card>
            <Grid container>
                <Typography variant='h3'>
                    Wod Name
                </Typography>
            </Grid>
        </Card>
    );
};

export default WodCard;
