import * as fp from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'

type Discount = {
    percentage: number,
    expired: boolean
}

const isDisCountValid = (discount: Discount) => !discount.expired

const getDiscountText = (discount: Discount) : O.Option<string> =>
    fp.pipe(
        discount,
        O.fromPredicate(isDisCountValid),
        O.map(({percentage}) => `whoa ${percentage}`)
    )

console.log(getDiscountText({
    percentage:10,
    expired: false
}))