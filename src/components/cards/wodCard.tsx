import React from 'react';
import styled from '@emotion/styled';
import {
    Card, Grid, Typography
} from '@mui/material';

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

const WodCard = ({
    handleCardClick,
    id
}: {
    handleCardClick: (id: number) => void;
    id: number;
}): JSX.Element => {
    return (
        <StyledCard className={classes.card} onClick={() => { handleCardClick(id); }}>
            <Grid container display='flex' flexDirection='column'>
                <Typography variant='h5'>
                    Wod Name
                </Typography>
                <Typography variant='body1'>
                    Wod Description
                </Typography>
            </Grid>
        </StyledCard>
    );
};

export default WodCard;
