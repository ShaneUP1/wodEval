import React, { useState } from 'react';
import {
    Autocomplete,
    Dialog,
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

const WodDetailDialog = ({
    isDialogOpen,
    handleDialogClose
}: {
    isDialogOpen: boolean;
    handleDialogClose: () => void;
}) => {
    const [selectedMovementOne, setSelectedMovementOne] = useState<MovementOptions | null>(null);
    const [selectedPriorityType, setSelectedPriorityType] = useState<string>('');

    const handleMovementChange = (selectedOption: MovementOptions | null): void => {
        setSelectedMovementOne(selectedOption);
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
    );
};

export default WodDetailDialog;
