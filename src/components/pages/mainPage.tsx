import React, { useState } from 'react';
import {
    Autocomplete,
    Dialog, DialogContent, DialogTitle, Grid, styled, TextField
} from '@mui/material';
import WodCardList from '../lists/wodCardList';
import { movementOptionsData } from '../../helpers/hardcodedData';
import { MovementOptions } from '../../interfaces/dataInterfaces';

const classesPrefix = 'mainPage';

const classes = {
    pageContainer: `${classesPrefix}-pageContainer`,
    wodCardListContainer: `${classesPrefix}-wodCardListContainer`
};

const StyledGrid = styled(Grid)(() => {
    return {
        [`&.${classes.pageContainer}`]: {
            height: '100vh'
        },
        [`& .${classes.wodCardListContainer}`]: {
            display: 'flex'
        }
    };
});

const MainPage = (): JSX.Element => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedMovementOne, setSelectedMovementOne] = useState<MovementOptions | null>(null);

    const handleMovementChange = (selectedOption: MovementOptions | null): void => {
        setSelectedMovementOne(selectedOption);
    };

    const handleCardClick = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <StyledGrid container className={classes.pageContainer}>
            <Grid item xs={4} className={classes.wodCardListContainer}>
                <WodCardList handleCardClick={handleCardClick} />
            </Grid>
            {
                isDialogOpen
                && (
                    <Dialog
                        open={isDialogOpen}
                        onClose={() => { handleDialogClose(); }}
                        fullWidth
                    >
                        <DialogTitle>Workout Details</DialogTitle>
                        <DialogContent>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        size='small'
                                        disabled={false}
                                        options={movementOptionsData}
                                        getOptionLabel={(option): string => {
                                            return option.label;
                                        }}
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
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                )
            }
        </StyledGrid>
    );
};

export default MainPage;
