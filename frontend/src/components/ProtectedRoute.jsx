import {Navigate} from "react-router-dom"
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const {auth} = UserAuth()
    if(!auth?._id) {
        return <Navigate to="/login"/>
    } else {
        return children
    }
};

export default ProtectedRoute;