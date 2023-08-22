import { Outlet } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "../components";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
