import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import WodCard from '../cards/wodCard';
import { useWodData } from '../../features/wod/store';
import WodDetailDialog from '../dialogs/wodDetailDialog';

const WodCardList = (): JSX.Element => {
    const [wodId, setWodId] = useState<number>(0);
    console.log('wodId in list', wodId);
    const handleDialogClose = () => {
        setWodId(0);
    };

    return (
        <Grid container>
            {
                Array.from(new Array(7)).map((val, index: number) => {
                    console.log('inside wodCardList array');
                    return (
                        <Grid
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            item
                            xs={12}
                            data-testid={`wodCard-${index}-container`}
                        >
                            <WodCard
                                id={index}
                                handleClick={() => { return setWodId(index + 1); }}
                            />
                        </Grid>
                    );
                })
            }
            {
                wodId &&
                (
                    <WodDetailDialog
                        wodId={wodId}
                        handleDialogClose={handleDialogClose}
                    />
                )
            }
        </Grid>
    );
};

export default WodCardList;
