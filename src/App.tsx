import { FC } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import ProductCataloguePage from "./pages/ProductCataloguePage";
import ProductCataloguePage2 from "./pages/ProductCataloguePage2";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const App: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ErrorBoundary>
      <Layout>
        <Header />
        {user ? <ProductCataloguePage2 /> : <AuthPage />}
        <ToastContainer />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
