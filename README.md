# angular-twitch-game-list


Follow the steps below to get the app up and running:

1 - Create a local.ts file inside the `src/environments` folder

`cp src/environment/example.ts src/environments/local.ts`

And fill it with the needed variables.

2 - Then, run the following command:

`npm i && npm start`

Then it will open your browser with the application and show a cool
console dashboard with analytic about the webpack generated bundles.

For production, just you can generate the production bundle using:

`npm run build:prod`

And you can set-up a test server for the production build with:

`npm run server:prod`