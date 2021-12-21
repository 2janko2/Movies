import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withAuthRedirect } from "hoc/withAuthRedirect";
import { getMovieList } from "store/movies";
import MovieList from "./MovieList";

const MovieListContainer = ({ isLoading, movieList, getMovieList }) => {
    useEffect(() => {
        getMovieList();
    }, []);

    return <MovieList isLoading={isLoading} movieList={movieList} getMovieList={getMovieList} />;
};

let mapStateToProps = (state) => ({
    isLoading: state.movies.isLoading,
    movieList: state.movies.movieList,
});

export default compose(connect(mapStateToProps, { getMovieList }), withAuthRedirect)(MovieListContainer);
