import React, { Fragment, useEffect, useMemo, useState } from 'react';
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
import { MovementPattern, PriorityType, SquatType } from '../../helpers/enums';
import { updateWodStorageState } from '../../helpers/dataUtils';
import { MovementOptions } from '../../interfaces/dataInterfaces';
import { MovementRepObject, WodDetails } from '../../interfaces/wodInterfaces';
import { useWodData } from '../../features/wod/store';

const wodDetailsInitialState = {
    id: 0,
    priority: null,
    rounds: 0,
    time: 0,
    repMax: 0,
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

enum MovementObject {
    movementOne = 0,
    movementTwo = 1,
    movementThree = 2,
    movementFour = 3,
    movementFive = 4
}

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
    handleDialogClose
}: {
    wodId: number;
    handleDialogClose: () => void;
}) => {
    const { wods, updateWodDetails } = useWodData();
    const wodDetails = wods.find((wod) => {
        return wod.id === wodId;
    });
    console.log('wodDetails in dialog', wodDetails);

    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [localWodDetails, setLocalWodDetails] = useState<any>({
        id: wodId,
        priority: null,
        rounds: 0,
        time: 0,
        repMax: 0
    });
    const [localWodMovements, setLocalWodMovements] = useState<{
        [key in MovementObject]: {
            type: MovementOptions | null;
            reps: number;
        };
    }>({
        [MovementObject.movementOne]: {
            type: null,
            reps: 0
        },
        [MovementObject.movementTwo]: {
            type: null,
            reps: 0
        },
        [MovementObject.movementThree]: {
            type: null,
            reps: 0
        },
        [MovementObject.movementFour]: {
            type: null,
            reps: 0
        },
        [MovementObject.movementFive]: {
            type: null,
            reps: 0
        }
    });
    console.log('localWodMovements', localWodMovements);

    useEffect(() => {
        if (wodDetails) {
            setLocalWodDetails({ ...wodDetails });
            setLocalWodMovements({
                0: {
                    type: wodDetails.movementOne.type,
                    reps: wodDetails.movementOne.reps
                },
                1: {
                    type: wodDetails.movementTwo.type,
                    reps: wodDetails.movementTwo.reps
                },
                2: {
                    type: wodDetails.movementThree.type,
                    reps: wodDetails.movementThree.reps
                },
                3: {
                    type: wodDetails.movementFour.type,
                    reps: wodDetails.movementFour.reps
                },
                4: {
                    type: wodDetails.movementFive.type,
                    reps: wodDetails.movementFive.reps
                }
            });
        } else {
            // if there are no details in the store, initialize details
            updateWodDetails({ ...wodDetailsInitialState, id: wodId });
        }
    }, [updateWodDetails, wodDetails, wodId]);

    // useEffect(() => {
    //     // checks that rep values and movement values are in sync
    //     const isSelectionError = (movementValue: MovementOptions | null, repValue: number) => {
    //         return !!((movementValue && !repValue) || (!movementValue && repValue));
    //     };

    //     // checks that all necessary fields are completed
    //     const selectedMovementValues = [selectedMovementOne, selectedMovementTwo, selectedMovementThree, selectedMovementFour, selectedMovementFive];
    //     const isAMovementSelected = !!selectedMovementValues.find((movementValue) => { return movementValue; });
    //     const isFormError =
    //         isSelectionError(selectedMovementOne, selectedMovementReps.movementOne) ||
    //         isSelectionError(selectedMovementTwo, selectedMovementReps.movementTwo) ||
    //         isSelectionError(selectedMovementThree, selectedMovementReps.movementThree) ||
    //         isSelectionError(selectedMovementFour, selectedMovementReps.movementFour) ||
    //         isSelectionError(selectedMovementFive, selectedMovementReps.movementFive) ||
    //         (selectedPriorityType === PriorityType.Time && !selectedRounds) ||
    //         (selectedPriorityType === PriorityType.Task && !selectedTime) ||
    //         (selectedPriorityType === PriorityType.Load && !selectedLoad) ||
    //         (selectedPriorityType && !isAMovementSelected) ||
    //         (!selectedPriorityType && isAMovementSelected) ||
    //         !selectedPriorityType;

    //     // checks that form has been updated
    //     const isFormDirty = !isEqual(wodDetails, selectedWodDetails);

    //     // disables/enables save button
    //     setIsSaveEnabled(!isFormError && isFormDirty);
    // }, [selectedLoad, selectedMovementFive, selectedMovementFour, selectedMovementOne, selectedMovementReps.movementFive, selectedMovementReps.movementFour, selectedMovementReps.movementOne, selectedMovementReps.movementThree, selectedMovementReps.movementTwo, selectedMovementThree, selectedMovementTwo, selectedPriorityType, selectedRounds, selectedTime, selectedWodDetails, wodDetails]);

    const handleSave = () => {
        updateWodDetails({
            ...localWodDetails,
            movementOne: { ...localWodMovements[0] },
            movementTwo: { ...localWodMovements[1] },
            movementThree: { ...localWodMovements[2] },
            movementFour: { ...localWodMovements[3] },
            movementFive: { ...localWodMovements[4] }
        });
        handleDialogClose();
    };

    return (
        <StyledDialog
            fullWidth
            open={!!wodId}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleDialogClose();
                }
            }}
        >
            <DialogTitle>Workout Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} paddingTop='8px'>
                    <Grid item xs={12}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id='wod-priority-type-label' required>WOD Priority</InputLabel>
                            <Select
                                labelId='wod-priority-type-label'
                                value={localWodDetails.priority ?? ''}
                                onChange={(event): void => {
                                    setLocalWodDetails({ ...localWodDetails, priority: event.target.value as PriorityType });
                                }}
                                label='Set Priority'
                            >
                                <MenuItem value='' />
                                {
                                    // TODO: iterate through the enum}
                                }
                                <MenuItem value={PriorityType.Task}>Task</MenuItem>
                                <MenuItem value={PriorityType.Time}>Time</MenuItem>
                                <MenuItem value={PriorityType.Load}>Load</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            localWodDetails.priority === PriorityType.Time && (
                                <TextField
                                    label='rounds'
                                    variant='filled'
                                    type='number'
                                    size='small'
                                    classes={{ root: classes.timeTaskInput }}
                                    error={localWodDetails.priority === PriorityType.Time && !localWodDetails.rounds}
                                    value={localWodDetails.rounds}
                                    onChange={(event): void => {
                                        setLocalWodDetails({ ...localWodDetails, rounds: Number(event.target.value) });
                                    }}
                                    InputProps={{ inputProps: { max: 100, min: 1 } }}
                                />
                            )
                        }
                        {
                            localWodDetails.priority === PriorityType.Task && (
                                <Grid container item display='flex' alignItems='flex-end'>
                                    <TextField
                                        label='minutes'
                                        variant='filled'
                                        type='number'
                                        size='small'
                                        classes={{ root: classes.timeTaskInput }}
                                        error={localWodDetails.priority === PriorityType.Task && !localWodDetails.time}
                                        value={localWodDetails.time}
                                        onChange={(event): void => {
                                            setLocalWodDetails({ ...localWodDetails, time: Number(event.target.value) });
                                        }}
                                        InputProps={{ inputProps: { max: 100, min: 1 } }}
                                    />
                                    <Typography variant='body1'>AMRAP:</Typography>
                                </Grid>
                            )
                        }
                        {
                            localWodDetails.priority === PriorityType.Load && (
                                <Grid container item display='flex' alignItems='flex-end'>
                                    <TextField
                                        label='reps'
                                        variant='filled'
                                        type='number'
                                        size='small'
                                        classes={{ root: classes.timeTaskInput }}
                                        error={localWodDetails.priority === PriorityType.Load && !localWodDetails.repMax}
                                        value={localWodDetails.repMax}
                                        onChange={(event): void => {
                                            setLocalWodDetails({ ...localWodDetails, repMax: Number(event.target.value) });
                                        }}
                                        InputProps={{ inputProps: { max: 100, min: 1 } }}
                                    />
                                    <Typography variant='body1'>RM</Typography>
                                </Grid>
                            )
                        }
                    </Grid>
                    {
                        Array.from({ length: 5 }).map((movement, index: MovementObject) => {
                            return (
                                // eslint-disable-next-line react/no-array-index-key
                                <Fragment key={index}>
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
                                                setLocalWodMovements((prev) => {
                                                    return {
                                                        ...prev,
                                                        [index]: {
                                                            ...prev[index],
                                                            type: reason === 'clear' ? null : newValue
                                                        }
                                                    };
                                                });
                                            }}
                                            value={localWodMovements[index].type}
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
                                            // error={!!localWodDetails.movementOne.type && !localWodDetails.movementOne.reps}
                                            value={localWodMovements[index].reps}
                                            onChange={(event): void => {
                                                setLocalWodMovements((prev) => {
                                                    return {
                                                        ...prev,
                                                        [index]: {
                                                            ...prev[index],
                                                            reps: event.currentTarget.value
                                                        }
                                                    };
                                                });
                                            }}
                                            InputProps={{ inputProps: { max: 10000, min: 0 } }}
                                        />
                                    </Grid>
                                </Fragment>
                            );
                        })
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Close</Button>
                <Button onClick={handleSave} disabled={false}>Save</Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default WodDetailDialog;
