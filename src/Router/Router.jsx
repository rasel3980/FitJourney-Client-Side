import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOut/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            }
        ]
    }

])