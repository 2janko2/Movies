import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import { withAuthRedirect } from "hoc/withAuthRedirect";
import { getMovieById, deleteMovie } from "store/movies";
import Movie from "./Movie";

const MovieContainer = ({ isLoading, currentMovie, getMovieById, deleteMovie }) => {
    const params = useParams();

    useEffect(() => {
        getMovieById(params.movieId);
    }, [getMovieById, params.movieId]);

    return <Movie isLoading={isLoading} currentMovie={currentMovie} deleteMovie={deleteMovie} />;
};

let mapStateToProps = (state) => ({
    isLoading: state.movies.isLoading,
    currentMovie: state.movies.currentMovie,
});

export default compose(
    connect(mapStateToProps, {
        getMovieById,
        deleteMovie,
    }),
    withAuthRedirect
)(MovieContainer);
