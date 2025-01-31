import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { authContext } from "../Providers/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(authContext);
    const {data:role,isLoading} = useQuery({
        queryKey:['role',user?.email],
        queryFn: async ()=>{
            const {data} = await axiosSecure(`/users/role/${user?.email}`)
            return data.role ;
        }
    })
    return [role,isLoading] ;
};

export default useRole;