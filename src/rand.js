export const randBetween = (min, max) => Math.random() * (max - min) + min
export const randInt = (min, max) => Math.floor(randBetween(min, max + 1))
export const pick = (arr) => arr[randInt(0, arr.length - 1)]
