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
            height: '100%'
        }
    };
});

const WodCard = ({
    handleCardClick
}: {
    handleCardClick: () => void;
}): JSX.Element => {
    // const [selectedMovementOne, setSelectedMovementOne] = useState<MovementOptions | null>(null);

    // const handleMovementChange = (selectedOption: MovementOptions | null): void => {
    //     setSelectedMovementOne(selectedOption);
    // };

    return (
        <StyledCard className={classes.card} onClick={handleCardClick}>
            <Grid container display='flex' flexDirection='column'>
                <Typography variant='h5'>
                    Wod Name
                </Typography>
                <Typography variant='body1'>
                    Wod Description
                    {/* <Autocomplete
                        size='small'
                        disabled={false}
                        options={movementOptionsData}
                        getOptionLabel={(option): string => { return option.label; }}
                        onChange={(event, newValue): void => {
                            handleMovementChange(newValue);
                        }}
                        value={selectedMovementOne}
                        renderInput={(params): JSX.Element => {
                            return (
                                <TextField
                                    {...params}
                                    label='Movement One'
                                    fullWidth
                                    margin='normal'
                                    variant='filled'
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off'
                                    }}
                                />
                            );
                        }}
                    /> */}
                </Typography>
            </Grid>
        </StyledCard>
    );
};

export default WodCard;
