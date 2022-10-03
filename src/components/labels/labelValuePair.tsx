import React from 'react';
import { Grid, GridProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyleProps extends GridProps {
    fontSize?: string;
    noWrap?: boolean;
    isStacked?: boolean;
    /** component prop has to be manually added to fix a TS error that `styled` throws */
    component?: React.ElementType;
}

const classesPrefix = 'labelValuePair';

const classes = {
    labelWrapper: `${classesPrefix}-labelWrapper`,
    text: `${classesPrefix}-text`,
    displayData: `${classesPrefix}-displayData`
};

const StyledGrid = styled(
    Grid,
    {
        // This prevents passing the StyleProps down to the component
        shouldForwardProp: (prop) => { return prop !== 'fontSize' && prop !== 'noWrap' && prop !== 'isStacked'; }
    }
)<StyleProps>(({ fontSize, noWrap, isStacked }) => {
    return {
        [`&.${classes.labelWrapper}`]: {
            margin: 0,
            alignItems: 'baseline',
            ...noWrap && {
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap'
            }
        },
        [`& .${classes.text}`]: {
            marginRight: '4px',
            fontWeight: 600,
            fontSize,
            ...isStacked && {
                width: '100%'
            }
        },
        [`& .${classes.displayData}`]: {
            marginRight: '4px',
            fontWeight: 400,
            fontSize,
            ...noWrap && {
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        }
    };
});

const LabelValuePair = ({
    label,
    value,
    fontSize = '14px',
    noWrap = false,
    isStacked = false
}: {
    /** The display label describing the data. */
    label: string;
    /** The data displayed in the UI. */
    value: React.ReactNode;
    /**
     * The size of the font.
     * @default 14px
     */
    fontSize?: string;
    /**
     * If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.
     * @default false
     */
    noWrap?: boolean;
    /**
     * If true, the label will be full width with the value on the next line.
     * @default false
     */
    isStacked?: boolean;
}): JSX.Element => {
    return (
        <StyledGrid container component='dl' fontSize={fontSize} noWrap={noWrap} isStacked={isStacked} className={classes.labelWrapper}>
            <Grid item component='dt' className={classes.text}>{label}</Grid>
            <Grid item component='dd' className={classes.displayData}>{value}</Grid>
        </StyledGrid>
    );
};

export default LabelValuePair;
