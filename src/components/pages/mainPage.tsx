import React, { useEffect, useState } from 'react';
import { Grid, styled } from '@mui/material';

import { WodDetails } from '../../interfaces/wodInterfaces';

import WodCardList from '../lists/wodCardList';
import WodDetailDialog from '../dialogs/wodDetailDialog';

const classesPrefix = 'mainPage';

const classes = {
    pageContainer: `${classesPrefix}-pageContainer`,
    wodCardListContainer: `${classesPrefix}-wodCardListContainer`
};

const StyledGrid = styled(Grid)(() => {
    return {
        [`&.${classes.pageContainer}`]: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        },
        [`& .${classes.wodCardListContainer}`]: {
            flexGrow: 1,
            overflowY: 'auto'
        }
    };
});

const MainPage = (): JSX.Element => {
    // useEffect(() => {
    //     // check local storage and fetch any wod data that is present
    //     const wodDataInStorage = fetchWodStorageState();

    //     if (wodDataInStorage.length) {
    //         // if there is data in storage, set the details in the store
    //         wodDataInStorage.map((wodData: WodDetails) => {
    //             return dispatch(updateWodDetails(wodData));
    //         });
    //     }
    // }, [dispatch, wodId]);

    // const handleCardClick = (id: number) => {
    //     setIsDialogOpen(true);
    //     setWodId(id);
    // };

    return (
        <StyledGrid container className={classes.pageContainer}>
            <Grid item xs={4} className={classes.wodCardListContainer}>
                <WodCardList />
            </Grid>
        </StyledGrid>
    );
};

export default MainPage;
