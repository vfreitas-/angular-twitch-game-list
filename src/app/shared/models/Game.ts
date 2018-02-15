export interface Game {
    game: {
        _id: number,
        name: string,
        popularity: number,
        box: object,
        logo: object
    },
    viewers: number,
    channels: number
}