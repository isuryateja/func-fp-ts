type Movie = {
    title: string;
    releaseYear: number;
    rating: number;
    award?: string;
};

function getMovieAward(movie: Movie): string | null {
    if (movie.award != null) {
        return `Awarded - ${movie.award}`;
    } else {
        return null;
    }
}

function isTopMovie(movie: Movie): string | null {
    if (movie.rating < 10) {
        return `its top ${movie.rating} movie`;
    } else {
        return null;
    }
}

function getMovieHighlight(movie: Movie): string {
    const awardHighlight = getMovieAward(movie);
    if (awardHighlight != null) {
        return awardHighlight;
    } else {
        const topMovieHighlight = isTopMovie(movie);
        if (topMovieHighlight != null) {
            return topMovieHighlight;
        } else {
            return `released ${movie.releaseYear}`;
        }
    }
}

const movie1: Movie = {
    title: "return of the voltron",
    releaseYear: 2012,
    award: "Oscar",
    rating: 13,
};

const movie2: Movie = {
    title: "age of ai",
    releaseYear: 2022,
    rating: 3,
};

const movie3: Movie = {
    title: "zboot: the end game",
    releaseYear: 2021,
    rating: 30,
};

console.log(getMovieHighlight(movie1)); // Outputs: "Awarded - Oscar"
console.log(getMovieHighlight(movie2)); // Outputs: "its top 3 movie"
console.log(getMovieHighlight(movie3)); // Outputs: "released 2021"