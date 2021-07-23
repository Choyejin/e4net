/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, FC } from 'react';
import { NavLink as RouterLink, NavLinkProps } from 'react-router-dom';
import clsx from 'clsx';
import {
  List,
  ListItem,
  Button,
  colors,
  Theme,
  makeStyles
} from '@material-ui/core';
import Page from './index';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  item: {
    display: 'flex',
    paddingLeft: 30,
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  icon2: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'right',
    marginleft: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

type Node = {
  key: string;
  title: string;
  href: string;
};

type Page = {
  key: string;
  title: string;
  nodes: Node[];
  icon: any;
};

const CustomRouterLink = forwardRef((props: NavLinkProps, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

type Props = {
  className?: string;
  pages: Page[];
};

const SidebarNav: FC<Props> = ({ pages, className }) => {
  const classes = useStyles();

  const [selectedNodeArr, setSelectedNodeArr] = React.useState([]);

  const handleClick = (node: any) => {
    let nodeArr = [];
    if (selectedNodeArr.filter(data => data === node).length > 0) {
      nodeArr = selectedNodeArr.filter(data => data !== node);
    } else {
      nodeArr = selectedNodeArr.concat(node);
    }
    setSelectedNodeArr(nodeArr);
  };

  return (
    <List className={clsx(classes.root, className)}>
      {pages.map(page => (
        <div key={page.title.concat(page.key)}>
          <ListItem
            className={classes.button}
            disableGutters
            key={page.key.concat(page.title)}
            button
            onClick={() => {
              handleClick(page.key);
            }}>
            <div className={classes.icon}>{page.icon}</div>
            <ListItemText primary={page.title} />
            <div className={classes.icon2}>
              {selectedNodeArr.filter(data => data === page.key).length > 0 ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </div>
          </ListItem>
          <Collapse
            key={page.key}
            in={selectedNodeArr.filter(data => data === page.key).length > 0}
            timeout="auto"
            unmountOnExit>
            <List component="div" disablePadding>
              {page.nodes.map(node => (
                <ListItem
                  className={classes.item}
                  disableGutters
                  key={node.key}>
                  <Button
                    activeClassName={classes.active}
                    className={classes.button}
                    component={CustomRouterLink}
                    to={node.href}>
                    {node.title}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default SidebarNav;
