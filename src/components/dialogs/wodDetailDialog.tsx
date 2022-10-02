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
import { getFromStorage } from '../../helpers/dataUtils';
import { PriorityType } from '../../helpers/enums';

const movementRepInitialState = {
    movementOne: 0,
    movementTwo: 0,
    movementThree: 0,
    movementFour: 0,
    movementFive: 0
};

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

const WodDetailDialog = ({
    wodId,
    isDialogOpen,
    handleDialogClose
}: {
    wodId: number | null;
    isDialogOpen: boolean;
    handleDialogClose: () => void;
}) => {
    const [isFormError, setIsFormError] = useState(false);
    const [selectedMovementOne, setSelectedMovementOne] = useState<MovementOptions | null>(null);
    const [selectedMovementTwo, setSelectedMovementTwo] = useState<MovementOptions | null>(null);
    const [selectedMovementThree, setSelectedMovementThree] = useState<MovementOptions | null>(null);
    const [selectedMovementFour, setSelectedMovementFour] = useState<MovementOptions | null>(null);
    const [selectedMovementFive, setSelectedMovementFive] = useState<MovementOptions | null>(null);
    const [movementReps, setMovementReps] = useState<MovementRepObject>(movementRepInitialState);
    const [selectedPriorityType, setSelectedPriorityType] = useState<PriorityType | null>(null);
    const [wodDetails, setWodDetails] = useState<WodDetails | null>(null);

    useEffect(() => {
        const wodKey = `wod ${wodId}`;
        const wodDetailsFromStorage = getFromStorage(wodKey);
        if (wodDetailsFromStorage) {
            // if there are wodDetails in storage, get them and set them as local state
            setWodDetails(wodDetailsFromStorage);
        } else {
            // else create initial wod details in storage
            localStorage.setItem(`wod ${wodId}`, wodDetailsInitialState);
        }
    }, [wodId]);

    useEffect(() => {
        if (wodDetails) {
            setSelectedPriorityType(wodDetails.priority);
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

    useEffect(() => {
        setIsFormError(
            !!(((selectedMovementOne && !movementReps.movementOne)
        || (selectedMovementTwo && !movementReps.movementTwo)
        || (selectedMovementThree && !movementReps.movementThree)
        || (selectedMovementFour && !movementReps.movementFour)
        || (selectedMovementFive && !movementReps.movementFive)
        || !selectedPriorityType
            ))
        );
    }, [movementReps.movementFive, movementReps.movementFour, movementReps.movementOne, movementReps.movementThree, movementReps.movementTwo, selectedMovementFive, selectedMovementFour, selectedMovementOne, selectedMovementThree, selectedMovementTwo, selectedPriorityType]);

    const handleSave = () => {
        const formattedWodDetails = JSON.stringify({
            ...wodDetails,
            priority: selectedPriorityType,
            movementOne: {
                type: selectedMovementOne,
                reps: movementReps.movementOne
            },
            movementTwo: {
                type: selectedMovementTwo,
                reps: movementReps.movementTwo
            },
            movementThree: {
                type: selectedMovementThree,
                reps: movementReps.movementThree
            },
            movementFour: {
                type: selectedMovementFour,
                reps: movementReps.movementFour
            },
            movementFive: {
                type: selectedMovementFive,
                reps: movementReps.movementFive
            }
        });
        localStorage.setItem(`wod ${wodId}`, formattedWodDetails);
        handleDialogClose();
    };

    return (
        <Dialog
            open={isDialogOpen}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleDialogClose();
                }
            }}
            fullWidth
        >
            <DialogTitle>Workout Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} paddingTop='8px'>
                    <Grid item xs={12}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id='wod-priority-type-label' required>Time or Task Priority</InputLabel>
                            <Select
                                labelId='wod-priority-type-label'
                                value={selectedPriorityType || ''}
                                onChange={(event): void => {
                                    const newValue = event.target.value === PriorityType.Task
                                        ? PriorityType.Task
                                        : PriorityType.Time;
                                    setSelectedPriorityType(newValue);
                                }}
                                label='Time or Task Priority'
                            >
                                <MenuItem value='' />
                                <MenuItem value={PriorityType.Task}>Task</MenuItem>
                                <MenuItem value={PriorityType.Time}>Time</MenuItem>
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
                            onChange={(event, newValue, reason): void => {
                                if (reason === 'clear') {
                                    setMovementReps({ ...movementReps, movementOne: 0 });
                                }
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
                                        label='Select a movement'
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
                            type='number'
                            size='small'
                            fullWidth
                            error={!!selectedMovementOne && !movementReps.movementOne}
                            value={movementReps?.movementOne}
                            onChange={(event): void => {
                                setMovementReps({ ...movementReps, movementOne: Number(event.target.value) });
                            }}
                            InputProps={{ inputProps: { max: 10000, min: 0 } }}
                        />
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
                            onChange={(event, newValue, reason): void => {
                                if (reason === 'clear') {
                                    setMovementReps({ ...movementReps, movementTwo: 0 });
                                }
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
                                        label='Select a movement'
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
                            type='number'
                            size='small'
                            fullWidth
                            error={!!selectedMovementTwo && !movementReps.movementTwo}
                            value={movementReps?.movementTwo}
                            onChange={(event): void => {
                                setMovementReps({ ...movementReps, movementTwo: Number(event.target.value) });
                            }}
                            InputProps={{ inputProps: { max: 10000, min: 0 } }}
                        />
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
                            onChange={(event, newValue, reason): void => {
                                if (reason === 'clear') {
                                    setMovementReps({ ...movementReps, movementThree: 0 });
                                }
                                setSelectedMovementThree(newValue);
                            }}
                            value={selectedMovementThree}
                            renderInput={(params): JSX.Element => {
                                return (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin='none'
                                        variant='filled'
                                        label='Select a movement'
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
                            type='number'
                            size='small'
                            fullWidth
                            error={!!selectedMovementThree && !movementReps.movementThree}
                            value={movementReps?.movementThree}
                            onChange={(event): void => {
                                setMovementReps({ ...movementReps, movementThree: Number(event.target.value) });
                            }}
                            InputProps={{ inputProps: { max: 10000, min: 0 } }}
                        />
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
                            onChange={(event, newValue, reason): void => {
                                if (reason === 'clear') {
                                    setMovementReps({ ...movementReps, movementFour: 0 });
                                }
                                setSelectedMovementFour(newValue);
                            }}
                            value={selectedMovementFour}
                            renderInput={(params): JSX.Element => {
                                return (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin='none'
                                        variant='filled'
                                        label='Select a movement'
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
                            type='number'
                            size='small'
                            fullWidth
                            error={!!selectedMovementFour && !movementReps.movementFour}
                            value={movementReps?.movementFour}
                            onChange={(event): void => {
                                setMovementReps({ ...movementReps, movementFour: Number(event.target.value) });
                            }}
                            InputProps={{ inputProps: { max: 10000, min: 0 } }}
                        />
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
                            onChange={(event, newValue, reason): void => {
                                if (reason === 'clear') {
                                    setMovementReps({ ...movementReps, movementFive: 0 });
                                }
                                setSelectedMovementFive(newValue);
                            }}
                            value={selectedMovementFive}
                            renderInput={(params): JSX.Element => {
                                return (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin='none'
                                        variant='filled'
                                        label='Select a movement'
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
                            type='number'
                            size='small'
                            fullWidth
                            error={!!selectedMovementFive && !movementReps.movementFive}
                            value={movementReps?.movementFive}
                            onChange={(event): void => {
                                setMovementReps({ ...movementReps, movementFive: Number(event.target.value) });
                            }}
                            InputProps={{ inputProps: { max: 10000, min: 0 } }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Close</Button>
                <Button onClick={handleSave} disabled={isFormError}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WodDetailDialog;
