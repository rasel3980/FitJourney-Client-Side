import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/Loading/Loading";

const AdminRoute = () => {
    const [role,isLoading] = useRole();
    if(isLoading){
        return <Loading></Loading>
    }
    if(role === 'admin') return children
    return <Navigate to='/dashboard'state={{from:location}} replace='true'></Navigate>
};

export default AdminRoute;