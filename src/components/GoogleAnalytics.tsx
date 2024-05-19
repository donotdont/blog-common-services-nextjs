import React from 'react';
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />

      <Script id='analytic' strategy='lazyOnload'>
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('set', 'linker', {
                "domains": ["blog.common-services.com"]
                });
                gtag('js', new Date());
                gtag("set", "developer_id.dZTNiMT", true);
                gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
                "page_path": window.location.pathname,
                "anonymize_ip": true
                });
                gtag("config", "G-BWFXRLHRDJ");
            `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
