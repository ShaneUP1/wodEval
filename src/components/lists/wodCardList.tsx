import React from 'react';
import { Grid } from '@mui/material';

import WodCard from '../cards/wodCard';

const WodCardList = (): JSX.Element => {
    return (
        <Grid container>
            {
                Array.from(new Array(5)).map((index: number) => {
                    return (
                        <Grid item xs={12} key={index}>
                            <WodCard />
                        </Grid>
                    );
                })
            }
        </Grid>
    );
};

export default WodCardList;
