import React from 'react';
import style from './page.module.css';
import Image from 'next/image';

function Page() {
  return (
    <div className={style.content}>
      <h1 className={style.title}>401 Unauthorized</h1>
      <Image
        src="https://http.cat/401"
        alt="401"
        width={400}
        height={300}
        className={style.image}
      />
      <h2 className={style.title}>Please use an Admin Account</h2>
    </div>
  );
}

export default Page;
