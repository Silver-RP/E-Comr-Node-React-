import { Helmet } from "react-helmet-async";

interface HeadProps {
  title?: string; 
}

const Head = ({ title = "Silver Shop" }: HeadProps) => {
  return (
    <Helmet>
      <title>{title} | Silver Shop </title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <meta name="author" content="Silver Shop" />

      <link rel="shortcut icon" href="/assets/app/images/nar-eys1.jpeg" type="image/x-icon" />

      <link rel="preconnect" href="https://fonts.gstatic.com/" />
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
    </Helmet>
  );
};

export default Head;
