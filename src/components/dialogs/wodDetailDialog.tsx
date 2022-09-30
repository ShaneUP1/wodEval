import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';

import { movementOptionsData } from '../../helpers/hardcodedData';
import { MovementOptions } from '../../interfaces/dataInterfaces';
import { MovementRepObject, WodDetails } from '../../interfaces/wodInterfaces';
import { getWodFromStorage } from '../../helpers/dataUtils';

const movementRepInitialState = {
    movementOne: null,
    movementTwo: null,
    movementThree: null,
    movementFour: null,
    movementFive: null
};

const wodDetailsInitialState = JSON.stringify({
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

const WodDetailDialog = ({
    wodId,
    isDialogOpen,
    handleDialogClose
}: {
    wodId: number | null;
    isDialogOpen: boolean;
    handleDialogClose: () => void;
}) => {
    const [selectedMovementOne, setSelectedMovementOne] = useState<MovementOptions | null>(null);
    const [selectedMovementTwo, setSelectedMovementTwo] = useState<MovementOptions | null>(null);
    const [selectedMovementThree, setSelectedMovementThree] = useState<MovementOptions | null>(null);
    const [selectedMovementFour, setSelectedMovementFour] = useState<MovementOptions | null>(null);
    const [selectedMovementFive, setSelectedMovementFive] = useState<MovementOptions | null>(null);
    const [movementReps, setMovementReps] = useState<MovementRepObject>(movementRepInitialState);
    const [selectedPriorityType, setSelectedPriorityType] = useState<string>('');
    const [wodDetails, setWodDetails] = useState<WodDetails | null>(null);

    useEffect(() => {
        const wodKey = `wod ${wodId}`;
        if (localStorage.getItem(wodKey)) {
            // if there are wodDetails in storage, get them and set them as local state
            const wodDetailsFromStorage = getWodFromStorage(wodKey);
            setWodDetails(wodDetailsFromStorage);
        } else {
            // else create initial wod details in storage
            localStorage.setItem(`wod ${wodId}`, wodDetailsInitialState);
        }
    }, [wodId]);

    useEffect(() => {
        if (wodDetails) {
            setSelectedMovementOne(wodDetails.movementOne.type);
            setSelectedMovementTwo(wodDetails.movementTwo.type);
            setSelectedMovementThree(wodDetails.movementThree.type);
            setSelectedMovementFour(wodDetails.movementFour.type);
            setSelectedMovementFive(wodDetails.movementFive.type);
            setMovementReps({
                movementOne: wodDetails.movementOne.reps,
                movementTwo: wodDetails.movementTwo.reps,
                movementThree: wodDetails.movementThree.reps,
                movementFour: wodDetails.movementFour.reps,
                movementFive: wodDetails.movementFive.reps
            });
        }
    }, [wodDetails]);

    const handleSave = () => {
        const formattedWodDetails = JSON.stringify({
            ...wodDetails,
            movementOne: {
                type: selectedMovementOne,
                reps: 0
            }
        });
        localStorage.setItem(`wod ${wodId}`, formattedWodDetails);
        handleDialogClose();
    };

    return (
        <Dialog
            open={isDialogOpen}
            onClose={() => { handleDialogClose(); }}
            fullWidth
        >
            <DialogTitle>Workout Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} paddingTop='8px'>
                    <Grid item xs={12}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id='wod-priority-type-label'>Time or Task Priority</InputLabel>
                            <Select
                                labelId='wod-priority-type-label'
                                value={selectedPriorityType}
                                onChange={(event): void => {
                                    setSelectedPriorityType(event.target.value);
                                }}
                                label='Time or Task Priority'
                            >
                                <MenuItem value='' />
                                <MenuItem value='task'>Task</MenuItem>
                                <MenuItem value='time'>Time</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={8}>
                        <Autocomplete
                            size='small'
                            disabled={false}
                            options={movementOptionsData}
                            getOptionLabel={(option): string => {
                                return option.label;
                            }}
                            isOptionEqualToValue={(option, value) => {
                                return option.value === value.value;
                            }}
                            onChange={(event, newValue): void => {
                                setSelectedMovementOne(newValue);
                            }}
                            value={selectedMovementOne}
                            renderInput={(params): JSX.Element => {
                                return (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin='none'
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
                    <Grid item xs={4}>
                        <TextField
                            label='reps'
                            variant='filled'
                            size='small'
                            fullWidth
                            onChange={(event): void => {
                                setMovementReps({ ...movementReps, movementOne: Number(event.target.value) });
                            }}
                        >
                            {movementReps?.movementOne}
                        </TextField>
                    </Grid>
                    <Grid item xs={8}>
                        <Autocomplete
                            size='small'
                            disabled={false}
                            options={movementOptionsData}
                            getOptionLabel={(option): string => {
                                return option.label;
                            }}
                            onChange={(event, newValue): void => {
                                setSelectedMovementTwo(newValue);
                            }}
                            value={selectedMovementTwo}
                            renderInput={(params): JSX.Element => {
                                return (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin='none'
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
                    <Grid item xs={4}>
                        <TextField
                            label='reps'
                            variant='filled'
                            size='small'
                            fullWidth
                        >
                            {movementReps?.movementTwo}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Close</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WodDetailDialog;
