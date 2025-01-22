import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOut/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import Trainers from "../Pages/Trainers/Trainers";
import TrainerDetails from "../Pages/Trainers/TrainerDetails";
import Error from "../Pages/Error/Error";
import Classes from "../Pages/Classes/Classes";
import BeTrainer from "../Pages/BeTrainer/BeTrainer";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        errorElement:<Error></Error>,
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
                path:"/all-class",
                element:<Classes></Classes>
            },
            {
                path:"/be-trainer",
                element:<BeTrainer></BeTrainer>
            },
            {
                path:"/details/:id",
                element:<TrainerDetails></TrainerDetails>,
                loader:({params})=> fetch(`http://localhost:5000/trainer-details/${params.id}`)
            },
        ]
    }

])