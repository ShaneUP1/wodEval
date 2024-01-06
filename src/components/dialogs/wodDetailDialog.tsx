import React, { Fragment, useEffect, useState } from 'react';
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
import { MovementOptions } from '../../interfaces/dataInterfaces';
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

enum MovementObject {
    movementOne = 0,
    movementTwo = 1,
    movementThree = 2,
    movementFour = 3,
    movementFive = 4
}

type LocalWodMovement = {
    [key in MovementObject]: {
        type: MovementOptions | null;
        reps: number;
    }
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

    const [localWodDetails, setLocalWodDetails] = useState<{ id: number, priority: PriorityType | null, rounds: number, time: number, repMax: number }>({
        id: wodId,
        priority: null,
        rounds: 0,
        time: 0,
        repMax: 0
    });
    const [localWodMovements, setLocalWodMovements] = useState<LocalWodMovement>({
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

    useEffect(() => {
        if (wodDetails) {
            setLocalWodDetails({ ...wodDetails });
            setLocalWodMovements({
                [MovementObject.movementOne]: {
                    type: wodDetails.movementOne.type,
                    reps: wodDetails.movementOne.reps
                },
                [MovementObject.movementTwo]: {
                    type: wodDetails.movementTwo.type,
                    reps: wodDetails.movementTwo.reps
                },
                [MovementObject.movementThree]: {
                    type: wodDetails.movementThree.type,
                    reps: wodDetails.movementThree.reps
                },
                [MovementObject.movementFour]: {
                    type: wodDetails.movementFour.type,
                    reps: wodDetails.movementFour.reps
                },
                [MovementObject.movementFive]: {
                    type: wodDetails.movementFive.type,
                    reps: wodDetails.movementFive.reps
                }
            });
        } else {
            // if there are no details in the store, initialize details
            updateWodDetails({ ...wodDetailsInitialState, id: wodId });
        }
    }, [updateWodDetails, wodDetails, wodId]);

    const isMovementOptionsDisabled = !localWodDetails.priority ||
        (localWodDetails.priority === PriorityType.Time && !localWodDetails.rounds) ||
        (localWodDetails.priority === PriorityType.Task && !localWodDetails.time) ||
        (localWodDetails.priority === PriorityType.Load && !localWodDetails.repMax);

    const isWodMovementsDirty = localWodMovements[0].reps !== wodDetails?.movementOne.reps ||
    localWodMovements[0].type?.value !== wodDetails?.movementOne.type?.value ||
    localWodMovements[1].reps !== wodDetails.movementTwo.reps ||
    localWodMovements[1].type?.value !== wodDetails?.movementTwo.type?.value ||
    localWodMovements[2].reps !== wodDetails.movementThree.reps ||
    localWodMovements[2].type?.value !== wodDetails?.movementThree.type?.value ||
    localWodMovements[3].reps !== wodDetails.movementFour.reps ||
    localWodMovements[3].type?.value !== wodDetails?.movementFour.type?.value ||
    localWodMovements[4].reps !== wodDetails.movementFive.reps ||
    localWodMovements[4].type?.value !== wodDetails?.movementFive.type?.value;

    const isFormDirty = localWodDetails.priority !== wodDetails?.priority ||
    localWodDetails.repMax !== wodDetails.repMax ||
    localWodDetails.rounds !== wodDetails.rounds ||
    localWodDetails.time !== wodDetails.time || isWodMovementsDirty;

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
                                            disabled={isMovementOptionsDisabled}
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
                                                            reps: reason === 'clear' ? 0 : prev[index].reps,
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
                                            disabled={!localWodMovements[index].type}
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
                <Button onClick={handleSave} disabled={!isFormDirty}>Save</Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default WodDetailDialog;
