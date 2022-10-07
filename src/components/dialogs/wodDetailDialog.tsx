import React, { useEffect, useMemo, useState } from 'react';
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
import { updateWodStorageState } from '../../helpers/dataUtils';
import { MovementOptions } from '../../interfaces/dataInterfaces';
import { MovementRepObject, WodDetails } from '../../interfaces/wodInterfaces';
import { useTypedDispatch, useTypedSelector } from '../../app/hooks';
import { updateWodDetails } from '../../features/wod/wodSlice';

const wodDetailsInitialState = {
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

    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
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
    const selectedWodDetails = useMemo(() => {
        return {
            id: wodId,
            priority: selectedPriorityType,
            rounds: selectedPriorityType === PriorityType.Time ? selectedRounds : 0,
            time: selectedPriorityType === PriorityType.Task ? selectedTime : 0,
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
    }, [selectedMovementFive, selectedMovementFour, selectedMovementOne, selectedMovementReps.movementFive, selectedMovementReps.movementFour, selectedMovementReps.movementOne, selectedMovementReps.movementThree, selectedMovementReps.movementTwo, selectedMovementThree, selectedMovementTwo, selectedPriorityType, selectedRounds, selectedTime, wodId]);

    useEffect(() => {
        // if there are details in the store, set local values
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

    useEffect(() => {
        // checks that a movement exist if a rep value has been selected and a rep value exist if a movement has been selected
        const isSelectionError = (movementValue: MovementOptions | null, repValue: number) => {
            return !!((movementValue && !repValue) || (!movementValue && repValue));
        };
        // checks to make sure the form can be saved
        const selectedMovementValues = [selectedMovementOne, selectedMovementTwo, selectedMovementThree, selectedMovementFour, selectedMovementFive];
        const isAMovementSelected = !!selectedMovementValues.find((movementValue) => { return movementValue; });

        // checks that all necessary fields are completed
        const isFormError =
            isSelectionError(selectedMovementOne, selectedMovementReps.movementOne) ||
            isSelectionError(selectedMovementTwo, selectedMovementReps.movementTwo) ||
            isSelectionError(selectedMovementThree, selectedMovementReps.movementThree) ||
            isSelectionError(selectedMovementFour, selectedMovementReps.movementFour) ||
            isSelectionError(selectedMovementFive, selectedMovementReps.movementFive) ||
            (selectedPriorityType === PriorityType.Time && !selectedRounds) ||
            (selectedPriorityType === PriorityType.Task && !selectedTime) ||
            (selectedPriorityType && !isAMovementSelected) ||
            (!selectedPriorityType && isAMovementSelected) ||
            !selectedPriorityType;

        // checks that form is different than values in store
        const isFormDirty = !isEqual(wodDetails, selectedWodDetails);
        // disables/enables save button
        setIsSaveEnabled(!isFormError && isFormDirty);
    }, [selectedMovementFive, selectedMovementFour, selectedMovementOne, selectedMovementReps.movementFive, selectedMovementReps.movementFour, selectedMovementReps.movementOne, selectedMovementReps.movementThree, selectedMovementReps.movementTwo, selectedMovementThree, selectedMovementTwo, selectedPriorityType, selectedRounds, selectedTime, selectedWodDetails, wodDetails]);

    const handleSave = () => {
        // grab existing data from storage and parse it
        const dataInStorage = JSON.parse(localStorage.getItem('Wods Data') || 'null');
        // check if specific wod data is there
        const prevWodDataIndex = dataInStorage?.findIndex((data: WodDetails) => { return data.id === wodId; });

        if (prevWodDataIndex >= 0) {
            // if wod data is already in storage, replace it with new data
            dataInStorage[prevWodDataIndex] = selectedWodDetails;
            updateWodStorageState(dataInStorage);
        } else if (dataInStorage) {
            // if there is dataInStorage but not for this wod, create it and keep old data
            const updatedStateDetails = [...dataInStorage, selectedWodDetails];
            updateWodStorageState(updatedStateDetails);
        } else {
            // otherwise create storage object for state
            const updatedStateDetails = [selectedWodDetails];
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
                            selectedPriorityType === PriorityType.Time && (
                                <TextField
                                    label='rounds'
                                    variant='filled'
                                    type='number'
                                    size='small'
                                    classes={{ root: classes.timeTaskInput }}
                                    error={selectedPriorityType === PriorityType.Time && !selectedRounds}
                                    value={selectedRounds}
                                    onChange={(event): void => {
                                        setSelectedRounds(Number(event.target.value));
                                    }}
                                    InputProps={{ inputProps: { max: 100, min: 1 } }}
                                />
                            )
                        }
                        {
                            selectedPriorityType === PriorityType.Task && (
                                <Grid container item display='flex' alignItems='flex-end'>
                                    <TextField
                                        label='minutes'
                                        variant='filled'
                                        type='number'
                                        size='small'
                                        classes={{ root: classes.timeTaskInput }}
                                        error={selectedPriorityType === PriorityType.Task && !selectedTime}
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
                            error={!!selectedMovementOne && !selectedMovementReps.movementOne}
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
                            error={!!selectedMovementTwo && !selectedMovementReps.movementTwo}
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
                            error={!!selectedMovementThree && !selectedMovementReps.movementThree}
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
                            error={!!selectedMovementFour && !selectedMovementReps.movementFour}
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
                            error={!!selectedMovementFive && !selectedMovementReps.movementFive}
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
                <Button onClick={handleSave} disabled={!isSaveEnabled}>Save</Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default WodDetailDialog;
