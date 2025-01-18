import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import User from "./pages/User";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAuth from "./pages/AdminAuth";
import Signout from "./pages/Signout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="user" element={<User/>} />
      <Route path="admin" >
        <Route path="auth" element={<AdminAuth/>} />
        <Route path="dashboard" element={<AdminDashboard/>}></Route>
      </Route>
      <Route path="signout" element={<Signout/>} />
    </Route>)
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
