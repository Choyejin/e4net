import React, { FC } from 'react';
import clsx from 'clsx';
import { Theme, makeStyles } from '@material-ui/core';
import { Drawer, DrawerProps } from '@material-ui/core';
import SidebarNav from './SidebarNav';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  onClose?: () => void;
  open: boolean;
  variant: DrawerProps['variant'];
};

const Sidebar: FC<Props> = ({ open, variant, onClose, className }) => {
  const classes = useStyles();

  /**
   * 추후에 이 객체를 API서버에서 가져오시면 됩니다.
   */
  const pagesAdmin = [
    {
      key: 'web',
      title: '샘플 대분류',
      icon: <DesktopMacIcon />,
      nodes: [
        {
          key: 'web1',
          title: '샘플-검색',
          href: '/sample-search'
        },
        {
          key: 'web2',
          title: '샘플-입력',
          href: '/sample-input'
        },
        {
          key: 'web3',
          title: '샘플-팝업',
          href: '/sample-pop'
        },
        {
          key: 'web4',
          title: '샘플-TestSearch',
          href: '/testsearch'
        },
  
  
      ]
    }    
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pagesAdmin} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
