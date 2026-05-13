import * as movieServices from "../services/movie-service.js"

const getAllMovies = async (req , res ,next ) => {
    try {
        const results = await movieServices.getAllMovies();
        res.json(results);
    } catch (error){
        next(error);
    }
};
const getMovieById = async (req , res ,next ) => {
    try {
        const movieId= req.params.id;
        const movie = await movieServices.getMovieById(movieId);
        res.json(movie);
    } catch (error){
        next(error);
    }
};
const createMovie = async (req , res ,next ) => {
    try {
        const movieData = req.body;
         if (!movieData.title || !movieData.releaseYear || !movieData.genre || !movieData.director){
            return res.status(400).json({
                message: "Data incomplete!!"
            })
        }
        const movie = await movieServices.createMovie(movieData);
        res.json(movie);
        
    } catch (error){
        next(error);
    }
};
const updateMovie = async (req , res ,next ) => {
    try {
        const movieId= req.params.id;
        const movieData = req.body;
        const movie = await movieServices.updateMovie(movieId, movieData);
        res.json (movie);
    } catch (error){
        next(error);
    }
};

const deleteMovie = async (req , res ,next ) => {
    try {
        const movieId= req.params.id;
    const deleteResponse = await movieServices.deleteMovie(movieId);
    if  (!deleteResponse) {
         res.json ({message: 'Movie Not Found'});
    }
        res.json ({message: 'Movie deleted successfully'});
    } catch (error){
        next(error);
    }
};

const movieSearch = async (req , res ,next ) => {
    try {
        const {title,genre} = req.query;
        if (!title && !genre){
            return res.status(400).json ({
                message: "Provide title or genre"
            })
        }
        const movie = await movieServices.movieSearch(title, genre);
        res.json(movie);
    } catch (error){
        next(error);
    };
};

export {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    movieSearch
};
