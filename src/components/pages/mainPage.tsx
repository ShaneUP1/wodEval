import React, { useState } from 'react';
import { Grid, styled } from '@mui/material';
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
            height: '100vh'
        },
        [`& .${classes.wodCardListContainer}`]: {
            display: 'flex'
        }
    };
});

const MainPage = (): JSX.Element => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [wodId, setWodId] = useState<number>(0);

    const handleCardClick = (id: number) => {
        setIsDialogOpen(true);
        setWodId(id);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setWodId(0);
    };

    return (
        <StyledGrid container className={classes.pageContainer}>
            <Grid item xs={4} className={classes.wodCardListContainer}>
                <WodCardList handleCardClick={handleCardClick} />
            </Grid>
            {
                isDialogOpen
                && (
                    <WodDetailDialog
                        wodId={wodId}
                        isDialogOpen={isDialogOpen}
                        handleDialogClose={handleDialogClose}
                    />
                )
            }
        </StyledGrid>
    );
};

export default MainPage;
