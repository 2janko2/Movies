import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";
import AppHeader from "components/AppHeader/AppHeader";

import MovieListContainer from "components/MovieList/MovieListContainer";
import MovieContainer from "components/Movie/MovieContainer";
import MovieAddingContainer from "components/MovieAdding/MovieAddingContainer";
import MoviesImportContainer from "components/MoviesImport/MoviesImportContainer";
import RegistrationContainer from "components/Registration/RegistrationContainer";
import LoginContainer from "components/Login/LoginContainer";
import PageNotFound from "components/PageNotFound/PageNotFound";

const { Content, Footer } = Layout;

const App = (props) => {
    return (
        <Layout className={styles.layout}>
            <AppHeader />

            <Content className={styles.layout__content}>
                <Routes>
                    <Route exact path="/" element={<MovieListContainer />} />
                    <Route path="/movie/:movieId" element={<MovieContainer />} />
                    <Route path="/movie/add" element={<MovieAddingContainer />} />
                    <Route path="/movie/import" element={<MoviesImportContainer />} />
                    <Route path="/registration" element={<RegistrationContainer />} />
                    <Route path="/login" element={<LoginContainer />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Content>

            <Footer className={"text-center"}>Movies Library © 2021</Footer>
        </Layout>
    );
};

export default App;
