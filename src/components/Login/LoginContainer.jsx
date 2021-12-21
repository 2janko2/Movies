import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import { login } from "store/auth";
import Login from "./Login";

const LoginContainer = ({ isLoading, isAuth, error, login }) => {
    if (isAuth) return <Navigate to={"/"} />;

    return <Login isLoading={isLoading} error={error} login={login} />;
};

let mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    isAuth: state.auth.isAuth,
    error: state.auth.error,
});

export default connect(mapStateToProps, { login })(LoginContainer);
