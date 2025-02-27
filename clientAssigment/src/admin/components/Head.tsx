import { Helmet } from "react-helmet-async";

interface HeadProps {
  title?: string;
}


/*
  Options for loading CSS files or link in React applications:

  1. Use absolute paths with the BASE_URL:
  *** jsxCopy<link rel="stylesheet" href={`${import.meta.env.BASE_URL}assets/admin/css/animate.min.css`} />
  - This uses the configured base URL from your Vite/React configuration.

  2. Use process.env or environment variables:
  *** jsxCopy<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/assets/admin/css/animate.min.css`} />
  - Or for Vite:
  *** jsxCopy<link rel="stylesheet" href={`${import.meta.env.VITE_PUBLIC_URL}/assets/admin/css/animate.min.css`} />

  3. Use absolute paths with origin:
  *** jsxCopy<link rel="stylesheet" href={`${window.location.origin}/assets/admin/css/animate.min.css`} />
  - This will automatically use the current domain, working in both development and production.

  => Option 3 is probably the simplest if you don't have environment variables set up. It will ensure that no matter which route you're on, the CSS is loaded from the correct location.

*/


const Head = ({ title = "Silver Shop" }: HeadProps) => {
  return (
    <Helmet>
      <title>{title} | Silver Shop</title>

      <meta charSet="utf-8" />
      <meta name="author" content="themesflat.com" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      
      <link rel="stylesheet" type="text/css" href={`${window.location.origin}/assets/admin/css/animate.min.css`} />
      <link rel="stylesheet" type="text/css" href={`${window.location.origin}/assets/admin/css/animation.css`} />
      <link rel="stylesheet" type="text/css" href={`${window.location.origin}/assets/admin/css/bootstrap.css`} />
      <link rel="stylesheet" type="text/css" href={`${window.location.origin}/assets/admin/css/bootstrap-select.min.css`} />
      <link rel="stylesheet" type="text/css" href={`${window.location.origin}/assets/admin/css/style.css`} />
      <link rel="stylesheet" href={`${window.location.origin}/assets/admin/font/fonts.css`} />
      <link rel="stylesheet" href={`${window.location.origin}/assets/admin/icon/style.css`} />
      <link rel="stylesheet" type="text/css" href={`${window.location.origin}/assets/admin/css/sweetalert.min.css`} />
      <link rel="stylesheet" type="text/css" href={`${window.location.origin}/assets/admin/css/custom.css`} />

      <link rel="shortcut icon" href="assets/app/images/nar-eys1.jpeg" />
      <link rel="apple-touch-icon-precomposed" href="assets/app/images/nar-eys1.jpeg" />
    </Helmet>
  );
};

export default Head;
