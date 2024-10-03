
import * as fp from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'

type Movie = {
    title: string,
    releaseYear: number,
    rating: number,
    award?: string
}

const getMovieAward = (movie: Movie): O.Option<string> =>
    fp.pipe(
        movie.award,
        O.fromNullable,
        O.map(award => `Awarded - ${award}`)
    )

const isTopMovie = (movie: Movie): O.Option<string> =>
    fp.pipe(
        movie.rating,
        O.fromPredicate(rating => rating < 10),
        O.map(rating => `its top ${rating} movie`)
    )

const getMovieHighlight = (movie: Movie): string =>
    fp.pipe(
        movie,
        getMovieAward,
        O.alt(() => isTopMovie(movie)),
        O.getOrElse(() => `released ${movie.releaseYear}`)
    )


let movie1: Movie = {
    title: "return of the voltron",
    releaseYear: 2012,
    award: "Oscar",
    rating: 13
}

let movie2: Movie = {
    title: "age of ai",
    releaseYear: 2022,
    rating: 3
}
let movie3: Movie = {
    title: "zboot: the end game",
    releaseYear: 2021,
    rating: 30
}


console.log(
    getMovieHighlight(movie1)
)
console.log(
    getMovieHighlight(movie2)
)
console.log(
    getMovieHighlight(movie3)
)
