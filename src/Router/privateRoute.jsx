import { useContext } from "react"
import { authContext } from "../Providers/AuthProvider/AuthProvider"
import { useLocation } from "react-router-dom"

const privateRoute = () => {
  const { user, loader } = useContext(authContext)
  const location = useLocation()

  if (loader) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/login' state={{ from: location }} replace='true' />

};

export default privateRoute;