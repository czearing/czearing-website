import Home from "../pages/index";
import App from "../pages/_app";

export default {
  title: "Pages/czearing/Home",
  component: Home,
};

export const HomePage = () => (
  <App
    pageProps={{ session: undefined }}
    Component={Home as any}
    router={undefined as any}
  />
);
