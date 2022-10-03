import React, { Fragment, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
    Card, Grid, Typography
} from '@mui/material';
import { getFromStorage } from '../../helpers/dataUtils';
import { WodDetails } from '../../interfaces/wodInterfaces';
import LabelValuePair from '../labels/labelValuePair';

const classesPrefix = 'wodCard';

const classes = {
    card: `${classesPrefix}`
};

const StyledCard = styled(Card)(() => {
    return {
        [`&.${classes.card}`]: {
            height: '100%',
            ':hover': {
                cursor: 'pointer'
            }
        }
    };
});

const wodDetailsInitialState = JSON.stringify({
    priority: null,
    movementOne: {
        type: null,
        reps: 0
    },
    movementTwo: {
        type: null,
        reps: 0
    },
    movementThree: {
        type: null,
        reps: 0
    },
    movementFour: {
        type: null,
        reps: 0
    },
    movementFive: {
        type: null,
        reps: 0
    }
});

const WodCard = ({
    handleCardClick,
    id
}: {
    handleCardClick: (id: number) => void;
    id: number;
}): JSX.Element => {
    const [wodDetails, setWodDetails] = useState<WodDetails | null>(null);

    console.log('getFromStorage', getFromStorage('wod 2'));
    useEffect(() => {
        // grab the data from local storage and set locally
        if (getFromStorage(`wod ${id}`)) {
            console.log('wodCard effect');
            setWodDetails(getFromStorage(`wod ${id}`));
        }
    }, [id]);

    const renderWodDetailsSection = (): JSX.Element => {
        return (
            <>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementOne.type?.label &&
                        <LabelValuePair label={wodDetails?.movementOne.type?.label} value={wodDetails?.movementOne.reps} />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementTwo.type?.label &&
                        <LabelValuePair label={wodDetails?.movementTwo.type?.label} value={wodDetails?.movementTwo.reps} />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementThree.type?.label &&
                        <LabelValuePair label={wodDetails?.movementThree.type?.label} value={wodDetails?.movementThree.reps} />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementFour.type?.label &&
                        <LabelValuePair label={wodDetails?.movementFour.type?.label} value={wodDetails?.movementFour.reps} />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementFive.type?.label &&
                        <LabelValuePair label={wodDetails?.movementFive.type?.label} value={wodDetails?.movementFive.reps} />
                    }
                </Grid>
            </>
        );
    };

    return (
        <StyledCard className={classes.card} onClick={() => { handleCardClick(id); }}>
            <Grid container display='flex' flexDirection='column'>
                <Typography variant='h5'>
                    Wod Name
                </Typography>
                {renderWodDetailsSection()}
            </Grid>
        </StyledCard>
    );
};

export default WodCard;
