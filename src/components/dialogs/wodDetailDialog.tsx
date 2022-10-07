import React, { useEffect, useState } from 'react';
import isEqual from 'lodash.isequal';
import styled from '@emotion/styled';
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
    TextField,
    Typography
} from '@mui/material';

import { movementOptionsData } from '../../helpers/hardcodedData';
import { PriorityType } from '../../helpers/enums';
import { fetchWodStorageState, updateWodStorageState } from '../../helpers/dataUtils';
import { MovementOptions } from '../../interfaces/dataInterfaces';
import { MovementRepObject, WodDetails } from '../../interfaces/wodInterfaces';
import { useTypedDispatch, useTypedSelector } from '../../app/hooks';
import { updatePriorityType, updateRounds, updateTime, updateWodDetails } from '../../features/wod/wodSlice';

export const wodDetailsInitialState = {
    id: 0,
    priority: null,
    rounds: 0,
    time: 0,
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
};
const movementRepInitialState = {
    movementOne: 0,
    movementTwo: 0,
    movementThree: 0,
    movementFour: 0,
    movementFive: 0
};

const classesPrefix = 'wodDetailDialog';

const classes = {
    timeTaskInput: `${classesPrefix}-timeTaskInput`
};

const StyledDialog = styled(Dialog)(() => {
    return {
        [`& .${classes.timeTaskInput}`]: {
            margin: '8px 8px 0 0'
        }
    };
});

const WodDetailDialog = ({
    wodId,
    isDialogOpen,
    handleDialogClose
}: {
    wodId: number;
    isDialogOpen: boolean;
    handleDialogClose: () => void;
}) => {
    const dispatch = useTypedDispatch();

    const [isFormError, setIsFormError] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [selectedMovementOne, setSelectedMovementOne] = useState<MovementOptions | null>(null);
    const [selectedMovementTwo, setSelectedMovementTwo] = useState<MovementOptions | null>(null);
    const [selectedMovementThree, setSelectedMovementThree] = useState<MovementOptions | null>(null);
    const [selectedMovementFour, setSelectedMovementFour] = useState<MovementOptions | null>(null);
    const [selectedMovementFive, setSelectedMovementFive] = useState<MovementOptions | null>(null);
    const [selectedMovementReps, setSelectedMovementReps] = useState<MovementRepObject>(movementRepInitialState);
    const [selectedPriorityType, setSelectedPriorityType] = useState<PriorityType | null>(null);
    const [selectedRounds, setSelectedRounds] = useState<number>(0);
    const [selectedTime, setSelectedTime] = useState<number>(0);

    const wodDetails = useTypedSelector((state) => { return state.wod[wodId] as WodDetails; });

    useEffect(() => {
        if (wodDetails) {
            setSelectedMovementOne(wodDetails.movementOne.type);
            setSelectedMovementTwo(wodDetails.movementTwo.type);
            setSelectedMovementThree(wodDetails.movementThree.type);
            setSelectedMovementFour(wodDetails.movementFour.type);
            setSelectedMovementFive(wodDetails.movementFive.type);
            setSelectedPriorityType(wodDetails.priority);
            setSelectedRounds(wodDetails.rounds);
            setSelectedTime(wodDetails.time);
            setSelectedMovementReps({
                movementOne: wodDetails.movementOne.reps,
                movementTwo: wodDetails.movementTwo.reps,
                movementThree: wodDetails.movementThree.reps,
                movementFour: wodDetails.movementFour.reps,
                movementFive: wodDetails.movementFive.reps
            });
        } else {
            dispatch(updateWodDetails({ ...wodDetailsInitialState, id: wodId }));
        }
    }, [dispatch, wodDetails, wodId]);

    const wodStorageDetails = fetchWodStorageState().find((wod) => { return wod.id === wodId; });

    useEffect(() => {
        // const wodStorageDetails = fetchWodStorageState().find((wod) => { return wod.id === wodId; });
        // console.log('wodStorageDetails', wodStorageDetails);
        // console.log('isFormDirty', isFormDirty);
        // console.log('wodDetails', wodDetails);
        setIsFormDirty(!isEqual(wodDetails, wodStorageDetails));
    }, [wodDetails, wodId, wodStorageDetails]);

    // useEffect(() => {
    //     setIsFormError(
    //         !!((selectedMovementOne && !movementReps.movementOne) ||
    //     (selectedMovementTwo && !movementReps.movementTwo) ||
    //     (selectedMovementThree && !movementReps.movementThree) ||
    //     (selectedMovementFour && !movementReps.movementFour) ||
    //     (selectedMovementFive && !movementReps.movementFive) ||
    //     (selectedPriorityType === PriorityType.Time && !selectedRounds) ||
    //     (selectedPriorityType === PriorityType.Task && !selectedTime) ||
    //     !selectedPriorityType
    //         )
    //     );
    // }, [movementReps.movementFive, movementReps.movementFour, movementReps.movementOne, movementReps.movementThree, movementReps.movementTwo, selectedMovementFive, selectedMovementFour, selectedMovementOne, selectedMovementThree, selectedMovementTwo, selectedPriorityType, selectedRounds, selectedTime]);

    // useEffect(() => {
    //     return () => { dispatch(resetWodDetails()); };
    // }, [dispatch]);

    const handleSave = () => {
        const formattedWodDetails = {
            id: wodId,
            priority: wodDetails?.priority,
            rounds: wodDetails?.priority === PriorityType.Time ? wodDetails?.rounds : 0,
            time: wodDetails?.priority === PriorityType.Task ? wodDetails?.time : 0,
            movementOne: {
                type: selectedMovementOne,
                reps: selectedMovementReps.movementOne
            },
            movementTwo: {
                type: selectedMovementTwo,
                reps: selectedMovementReps.movementTwo
            },
            movementThree: {
                type: selectedMovementThree,
                reps: selectedMovementReps.movementThree
            },
            movementFour: {
                type: selectedMovementFour,
                reps: selectedMovementReps.movementFour
            },
            movementFive: {
                type: selectedMovementFive,
                reps: selectedMovementReps.movementFive
            }
        };
        // grab existing data from storage and parse it
        const dataInStorage = JSON.parse(localStorage.getItem('Wods Data') || 'null');
        // check if specific wod data is there
        const prevWodDataIndex = dataInStorage?.findIndex((data: WodDetails) => { return data.id === wodId; });

        if (prevWodDataIndex >= 0) {
            // if wod data is already in storage, replace it with new data
            dataInStorage[prevWodDataIndex] = formattedWodDetails;
            updateWodStorageState(dataInStorage);
        } else if (dataInStorage) {
            // if there is dataInStorage but not for this wod, create it and keep old data
            const updatedStateDetails = [...dataInStorage, formattedWodDetails];
            updateWodStorageState(updatedStateDetails);
        } else {
            // otherwise create storage object for state
            const updatedStateDetails = [formattedWodDetails];
            updateWodStorageState(updatedStateDetails);
        }
        handleDialogClose();
    };

    return (
        <StyledDialog
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
                        {
                            wodDetails?.priority === PriorityType.Time && (
                                <TextField
                                    label='rounds'
                                    variant='filled'
                                    type='number'
                                    size='small'
                                    classes={{ root: classes.timeTaskInput }}
                                    // error={selectedPriorityType === PriorityType.Time && !selectedRounds}
                                    value={selectedRounds}
                                    onChange={(event): void => {
                                        setSelectedRounds(Number(event.target.value));
                                    }}
                                    InputProps={{ inputProps: { max: 100, min: 1 } }}
                                />
                            )
                        }
                        {
                            wodDetails?.priority === PriorityType.Task && (
                                <Grid container item display='flex' alignItems='flex-end'>
                                    <TextField
                                        label='minutes'
                                        variant='filled'
                                        type='number'
                                        size='small'
                                        classes={{ root: classes.timeTaskInput }}
                                        // error={selectedPriorityType === PriorityType.Task && !selectedTime}
                                        value={selectedTime}
                                        onChange={(event): void => {
                                            setSelectedTime(Number(event.target.value));
                                        }}
                                        InputProps={{ inputProps: { max: 100, min: 1 } }}
                                    />
                                    <Typography variant='body1'>AMRAP:</Typography>
                                </Grid>
                            )
                        }
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
                                    setSelectedMovementReps({ ...selectedMovementReps, movementOne: 0 });
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
                            // error={!!selectedMovementOne && !movementReps.movementOne}
                            value={selectedMovementReps.movementOne}
                            onChange={(event): void => {
                                setSelectedMovementReps({ ...selectedMovementReps, movementOne: Number(event.target.value) });
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
                                    setSelectedMovementReps({ ...selectedMovementReps, movementTwo: 0 });
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
                            // error={!!selectedMovementTwo && !movementReps.movementTwo}
                            value={selectedMovementReps.movementTwo}
                            onChange={(event): void => {
                                setSelectedMovementReps({ ...selectedMovementReps, movementTwo: Number(event.target.value) });
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
                                    setSelectedMovementReps({ ...selectedMovementReps, movementThree: 0 });
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
                            // error={!!selectedMovementThree && !movementReps.movementThree}
                            value={selectedMovementReps.movementThree}
                            onChange={(event): void => {
                                setSelectedMovementReps({ ...selectedMovementReps, movementThree: Number(event.target.value) });
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
                                    setSelectedMovementReps({ ...selectedMovementReps, movementFour: 0 });
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
                            // error={!!selectedMovementFour && !movementReps.movementFour}
                            value={selectedMovementReps.movementFour}
                            onChange={(event): void => {
                                setSelectedMovementReps({ ...selectedMovementReps, movementFour: Number(event.target.value) });
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
                                    setSelectedMovementReps({ ...selectedMovementReps, movementFive: 0 });
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
                            // error={!!selectedMovementFive && !movementReps.movementFive}
                            value={selectedMovementReps.movementFive}
                            onChange={(event): void => {
                                setSelectedMovementReps({ ...selectedMovementReps, movementFive: Number(event.target.value) });
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
        </StyledDialog>
    );
};

export default WodDetailDialog;
