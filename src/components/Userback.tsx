import React from 'react';
import Script from 'next/script';

const Userback = () => {
  return (
    <>
      <Script id='userback' strategy='lazyOnload'>
        {`
            window.Userback = window.Userback || {};
            Userback.access_token = '${process.env.NEXT_PUBLIC_USERBACK_ID}';
            (function(d) {
                var s = d.createElement('script');
                s.async = true;
                s.src = 'https://static.userback.io/widget/v1.js';
                (d.head || d.body).appendChild(s);
            }
            )(document);
          `}
      </Script>
    </>
  );
};

export default Userback;
