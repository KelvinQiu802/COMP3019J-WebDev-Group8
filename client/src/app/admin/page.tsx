'use client';

import { useEffect } from 'react';
import style from './page.module.css';
import API_HOST from '../../../utils/host';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  // Auth
  useEffect(() => {
    (async () => {
      let userName = localStorage.getItem('userName');
      if (userName == null) {
        router.push('/login');
      }
      const response = await fetch(`${API_HOST}/users/auth/${userName}`);
      if (response.status == 401) {
        console.log('HAHAHAH');
        router.push('/unauthorized');
      }
    })();
  }, []);

  return <div>page</div>;
}

export default Page;
