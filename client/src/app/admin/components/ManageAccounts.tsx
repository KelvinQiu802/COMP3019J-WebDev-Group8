import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import style from './accounts.module.css';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

function ManageAccounts() {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(true);

  const notify = (userName: string) => toast(`User: ${userName} Deleted!`);

  async function handleDelete(account: string) {
    await fetch(`${API_HOST}/users/${account}`, { method: 'DELETE' });
    setRefresh((prev) => !prev);
    notify(account);
  }

  useEffect(() => {
    // fetch all accounts
    (async () => {
      const response = await fetch(`${API_HOST}/users`);
      const users = await response.json();
      setAccounts(users);
    })();
  }, [refresh]);

  return (
    <div className={style.box}>
      <div className={style.accounts}>
        {accounts.map((account) => (
          <div key={account} className={style.account}>
            <div>{account}</div>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(account)}
            >
              DEL
            </Button>
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default ManageAccounts;
