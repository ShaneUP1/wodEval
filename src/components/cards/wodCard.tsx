import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import {
    Card, Grid, Typography
} from '@mui/material';

import { PriorityType } from '../../helpers/enums';
import { useTypedSelector } from '../../app/hooks';
import LabelValuePair from '../labels/labelValuePair';

const classesPrefix = 'wodCard';

const classes = {
    card: `${classesPrefix}-card`,
    title: `${classesPrefix}-title`
};

const StyledCard = styled(Card)(() => {
    return {
        [`&.${classes.card}`]: {
            padding: '8px',
            height: '165px',
            ':hover': {
                cursor: 'pointer'
            },
            overflowY: 'auto'
        },
        [`& .${classes.title}`]: {
            paddingBottom: '8px'
        }
    };
});

const WodCard = ({
    handleCardClick,
    id
}: {
    handleCardClick: (id: number) => void;
    id: number;
}): JSX.Element => {
    const wodDetails = useTypedSelector((state) => { return state.wod[id]; });

    const renderWodDetailsSection = (): JSX.Element => {
        return (
            <>
                <Grid item xs={12}>
                    {
                        wodDetails?.priority === PriorityType.Task && (
                            <Typography>
                                {`${wodDetails.time} minute AMRAP:`}
                            </Typography>
                        )
                    }
                    {
                        wodDetails?.priority === PriorityType.Time && (
                            <Typography>
                                {`${wodDetails.rounds} rounds for time:`}
                            </Typography>

                        )
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementOne?.type?.label &&
                        <LabelValuePair label={wodDetails.movementOne.type.label} value={wodDetails.movementOne.reps} />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementTwo?.type?.label &&
                        <LabelValuePair label={wodDetails.movementTwo.type.label} value={wodDetails.movementTwo.reps} />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementThree?.type?.label &&
                        <LabelValuePair label={wodDetails.movementThree.type.label} value={wodDetails.movementThree.reps} />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementFour?.type?.label &&
                        <LabelValuePair label={wodDetails.movementFour.type.label} value={wodDetails.movementFour.reps} />
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        wodDetails?.movementFive?.type?.label &&
                        <LabelValuePair label={wodDetails.movementFive.type.label} value={wodDetails.movementFive.reps} />
                    }
                </Grid>
            </>
        );
    };

    return (
        <StyledCard className={classes.card} onClick={() => { handleCardClick(id); }}>
            <Grid container display='flex' flexDirection='column'>
                <Typography variant='h5' className={classes.title}>
                    {`Day ${id}`}
                </Typography>
                {renderWodDetailsSection()}
            </Grid>
        </StyledCard>
    );
};

export default WodCard;
