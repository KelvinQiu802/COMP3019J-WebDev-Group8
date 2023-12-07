'use client';

import { useEffect, useState } from 'react';
import style from './page.module.css';
import API_HOST from '../../../utils/host';
import { useRouter } from 'next/navigation';
import { Box, Tab, Tabs } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other} className={style.manage}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

function Page() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  // Auth
  useEffect(() => {
    (async () => {
      let userName = localStorage.getItem('userName');
      if (userName == null) {
        router.push('/login');
      }
      const response = await fetch(`${API_HOST}/users/auth/${userName}`);
      if (response.status == 401) {
        router.push('/unauthorized');
      }
    })();
  }, []);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)} centered>
          <Tab label="Accounts" value={0} />
          <Tab label="Movies" value={1} />
          <Tab label="Others" value={2} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabIndex} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        Item Three
      </CustomTabPanel>
    </div>
  );
}

export default Page;
