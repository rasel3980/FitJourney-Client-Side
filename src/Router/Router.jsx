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
import TrainerBooked from "../Pages/TrainerBooked/trainerBooked";
import Booking from "../Pages/Booking/Booking";
import Forum from "../Pages/Forum/Forum";
import privateRoute from "./privateRoute";
import DashboardLayout from "../LayOut/DashboardLayout/DashboardLayout";
import AllNewsletterSubscribers from "../Dashboard/Admin/AllNewsletterSubscribers";
import AllTrainers from "../Dashboard/Admin/AllTrainers";
import AddClass from "../Dashboard/Admin/AddClass";
import Profile from "../Pages/Common/Profile";
import ActivityLog from "../Dashboard/Member/ActivityLog/ActivityLog";

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
                element:<Classes></Classes>,
            },
            {
                path:"/be-trainer",
                element:<BeTrainer></BeTrainer>
            },
            {
                path:"/booking/:trainerId/:slotId",
                element:<Booking></Booking>
            },
            {
                path:"/trainerBooked",
                element:<TrainerBooked></TrainerBooked>,
                loader:({params})=> fetch(`https://fit-journy-server.vercel.app/trainer/booked/${params.id}`)
            },
            {
                path:"/forum",
                element:<Forum></Forum>,
            },
            {
                path:"/details/:id",
                element: <privateRoute><TrainerDetails></TrainerDetails></privateRoute>,
                loader:({params})=> fetch(`https://fit-journy-server.vercel.app/trainer-details/${params.id}`)
            },
            {
                path:"/dashboard",
                element:<DashboardLayout></DashboardLayout>,
                children:[
                    {
                      path:'newsletter-subscribers',
                      element:<AllNewsletterSubscribers></AllNewsletterSubscribers>
                    },
                    {
                      path:'all-trainers',
                      element:<AllTrainers></AllTrainers>
                    },
                    {
                      path:'add-new-class',
                      element:<AddClass></AddClass>
                    },
                    {
                      path:'profile',
                      element:<Profile></Profile>
                    },
                    {
                      path:'Activity-Log',
                      element:<ActivityLog></ActivityLog>
                    },
                ]
            }
            
        ]
    }

])