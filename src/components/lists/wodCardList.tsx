import React from 'react';
import { Grid } from '@mui/material';

import WodCard from '../cards/wodCard';

const WodCardList = (): JSX.Element => {
    return (
        <Grid container>
            {
                Array.from(new Array(5)).map((val, index: number) => {
                    return (
                        <Grid
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            item
                            xs={12}
                            data-testid={`wodCard-${index}-container`}
                        >
                            <WodCard />
                        </Grid>
                    );
                })
            }
        </Grid>
    );
};

export default WodCardList;
