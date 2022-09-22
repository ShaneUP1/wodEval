import React from 'react';
import { Grid, styled } from '@mui/material';
import WodCardList from '../lists/wodCardList';

const classesPrefix = 'mainPage';

const classes = {
    pageContainer: `${classesPrefix}-pageContainer`
};

const StyledGrid = styled(Grid)(() => {
    return {
        [`&.${classes.pageContainer}`]: {
            height: '100vh'
        }
    };
});

const MainPage = (): JSX.Element => {
    return (
        <StyledGrid container className={classes.pageContainer}>
            <Grid item xs={4}>
                <WodCardList />
            </Grid>
        </StyledGrid>
    );
};

export default MainPage;
