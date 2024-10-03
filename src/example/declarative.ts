import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';

type User = {
    id: number;
    name: string;
    age?: number; // Age might be optional
};

const Users: User[] = [
    {
        id: 1,
        name: 'Leanne Graham',
        age: 23,
    },
    {
        id: 2,
        name: 'Ervin Howell',
        age: 11,
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        // Age is missing
    },
];

type AppError = {
    message: string;
};

const getUser = (id: number): Promise<{ data: User }> => {
    return new Promise((resolve, reject) => {
        const user = Users.find((user) => user.id === id);
        if (user) {
            resolve({ data: user });
        } else {
            reject(`User with ID ${id} not found`);
        }
    });
};

const fetchUser = (userId: number): TE.TaskEither<AppError, User> => () =>
    getUser(userId)
        .then((response) => E.right(response.data))
        .catch((error) => E.left({ message: String(error) }));

const getUserAge = (user: User): O.Option<number> => O.fromNullable(user.age);

const calculateDiscount = (age: number): number => {
    if (age < 18) return 0.3;
    if (age <= 25) return 0.2;
    return 0.1;
};

// Compose operations to get discount for user
const getDiscountForUser = (userId: number): TE.TaskEither<AppError, number> =>
    pipe(
        fetchUser(userId),
        TE.chain((user) =>
            pipe(
                getUserAge(user),
                E.fromOption(() => ({ message: 'Age not provided' })),
                TE.fromEither,
                TE.map(calculateDiscount)
            )
        )
    );

// Execute the composed function using TE.match
pipe(
    getDiscountForUser(1),
    TE.match(
        (error) => { console.error(`Error: ${error.message}`); },
        (discount) => { console.log(`Discount for user: ${discount * 100}%`); }
    )
)();