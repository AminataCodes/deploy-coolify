import prisma from '../models/prisma.js'

const getAllMovies = async()=> {
    const MovieList = await prisma.movie.findMany();
    return {
        data:MovieList,
    };
};
const getMovieById = async(id)=>{
    const movie = await prisma.movie.findUnique({
        where: {id}
    })
    return {
        data: movie
    };
};

const createMovie = async(movieData)=>{
    const createdMovie = await prisma.movie.create({
        data:{
            title: movieData.title,
            description: movieData.description,
            releaseYear: movieData.releaseYear,
            genre: movieData.genre,
            director: movieData.director,
            rating: movieData.rating
        }
    })
    return {
        data: createdMovie
    };
};

const updateMovie = async(id,movieData)=>{
    const updatedmovie = await prisma.movie.update({
        where : {id},
        data : {
            ...(movieData.title && {title: movieData.title}),
            ...(movieData.description && {description: movieData.description}),
            ...(movieData.releaseYear && {releaseYear: movieData.releaseYear}),
            ...(movieData.genre && {genre: movieData.genre}),
            ...(movieData.director && {director: movieData.director}),
            ...(movieData.rating && {rating: movieData.rating}),
        }
    });
    return {
        data: updatedmovie
    };
};

const deleteMovie = async(id)=>{
    const movie = await getMovieById(id);
    if (movie.data) {
    return prisma.movie.delete ({where:{id}});}
    return false;
};

const movieSearch = async (title, genre)=>{
    const movie = await prisma.movie.findMany({
        where: {title, genre},
    })

    return {
        data: movie
    };
}

export {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    movieSearch
}
