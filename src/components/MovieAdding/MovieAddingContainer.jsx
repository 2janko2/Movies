import { connect } from "react-redux";
import { compose } from "redux";

import { withAuthRedirect } from "hoc/withAuthRedirect";
import { addMovie } from "store/movies";
import MovieAdding from "./MovieAdding";

const MovieAddingContainer = ({ isLoading, error, addMovie }) => {
    return <MovieAdding isLoading={isLoading} error={error} addMovie={addMovie} />;
};

let mapStateToProps = (state) => ({
    isLoading: state.movies.isLoading,
    error: state.movies.error,
});

export default compose(
    connect(mapStateToProps, {
        addMovie,
    }),
    withAuthRedirect
)(MovieAddingContainer);
