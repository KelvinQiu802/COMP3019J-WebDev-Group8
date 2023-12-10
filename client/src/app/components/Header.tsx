'use client';

import { useEffect, useState } from 'react';
import style from './header.module.css';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import API_HOST from '../../../utils/host';

/* Header component definition */
function Header() {
  const router = useRouter();
  const path = usePathname();
  const [isLogin, setIsLogin] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setIsLogin(null);
    location.reload();
  };

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    setIsLogin(userName);
    (async () => {
      if (userName == null) {
        setIsAdmin(false);
        return;
      }
      const response = await fetch(`${API_HOST}/users/auth/${userName}`);
      if (response.status == 200) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    })();
  }, [path]);

  return (
    <div className={style.header} id="head">
      <div className={style.content}>
        <div className={style.left} onClick={() => router.push('/')}>
          <h1>Duck Movies</h1>
        </div>
        {isLogin ? (
          <div className={style.rightlogined}>
            <p>{`Hi, ${localStorage.getItem('userName')}`}</p>
            <Link href="/bookmark">Bookmarks</Link>
            <span onClick={handleLogout}>Logout</span>
            {isAdmin && <Link href="/admin">Admin</Link>}
          </div>
        ) : (
          <div className={style.right}>
            <Link href={'/login'}>Login</Link>
            <span>/</span>
            <Link href={'/signup'}>Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
