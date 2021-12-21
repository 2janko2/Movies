import { connect } from "react-redux";
import { compose } from "redux";

import { withAuthRedirect } from "hoc/withAuthRedirect";
import { importMovies } from "store/movies";
import MoviesImport from "./MoviesImport";

const MoviesImportContainer = ({ isLoading, error, importMovies }) => {
    return <MoviesImport isLoading={isLoading} error={error} importMovies={importMovies} />;
};

let mapStateToProps = (state) => ({
    isLoading: state.movies.isLoading,
    error: state.movies.error,
});

export default compose(
    connect(mapStateToProps, {
        importMovies,
    }),
    withAuthRedirect
)(MoviesImportContainer);
