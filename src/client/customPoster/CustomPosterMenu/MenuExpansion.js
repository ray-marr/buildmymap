import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {ExpansionPanelSummary, ExpansionPanelDetails,
        ExpansionPanel, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontFamily: 'Helvetica'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    fontFamily: 'Helvetica'
  }
});

const CustomExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 30,
    '&$expanded': {
      minHeight: 30,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(ExpansionPanelSummary);

const CustomExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(ExpansionPanel);


const MenuExpansion = (props) =>{
  const {classes, children, heading, subHeading, panelName, expanded, handleChange} = props;
        return (
          <CustomExpansionPanel expanded={expanded === panelName} onChange={handleChange(panelName)}>
            <CustomExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{heading}</Typography>
              <Typography className={classes.secondaryHeading}>{subHeading}</Typography>
            </CustomExpansionPanelSummary>
            <ExpansionPanelDetails>
              {children}
            </ExpansionPanelDetails>
          </CustomExpansionPanel>
        );
}

export default withStyles(styles)(MenuExpansion);
