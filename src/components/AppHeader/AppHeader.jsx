import { useSelector, useDispatch } from "react-redux";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import { logout } from "store/auth";

const { Header } = Layout;

const AppHeader = (props) => {
    const dispatch = useDispatch();

    const isAuth = useSelector((state) => state.auth.isAuth);

    const onLogout = () => {
        dispatch(logout());
    };

    return (
        <Header>
            <Menu theme="dark" mode="horizontal">
                {isAuth ? (
                    <>
                        <Menu.Item key="1">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/movie/add">Add movie</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/movie/import">Import movies</Link>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={onLogout}>
                            Log out
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item key="5">
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/registration">Registration</Link>
                        </Menu.Item>
                    </>
                )}
            </Menu>
        </Header>
    );
};

export default AppHeader;
