import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOut/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import Trainers from "../Pages/Trainers/Trainers";
import TrainerDetails from "../Pages/Trainers/TrainerDetails";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/forget-password",
                element:<ForgetPassword></ForgetPassword>
            },
            {
                path:"/all-trainer",
                element:<Trainers></Trainers>
            },
            {
                path:"/details/:id",
                element:<TrainerDetails></TrainerDetails>,
                loader:({params})=> fetch(`http://localhost:5000/trainer-details/${params.id}`)
            },
        ]
    }

])