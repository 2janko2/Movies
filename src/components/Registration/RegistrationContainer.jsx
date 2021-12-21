import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { createUser } from "store/auth";
import Registration from "./Registration";

const RegistrationContainer = ({ isLoading, isAuth, error, createUser }) => {
    if (isAuth) return <Navigate to={"/"} />;

    return <Registration isLoading={isLoading} error={error} createUser={createUser} />;
};

let mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    isAuth: state.auth.isAuth,
    error: state.auth.error,
});

export default connect(mapStateToProps, {
    createUser,
})(RegistrationContainer);
