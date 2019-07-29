# Processs Stats

## Installation

```sh
$ npm install
$ npm start
```

## Technologies

1. [Typescript](https://www.typescriptlang.org/) - Javascipt with Typing
2. [Socket.io](https://socket.io/) - Realtime communication
3. [Node.js](https://nodejs.org/en/) - JS Runtime
4. [Express.js](https://expressjs.com/) - Server Framework for nodejs

## Libraries

1. [Lodash](http://npm.im/lodash) - random, sum, and map
2. [Delay](http://npm.im/delay) - add delay using promise
3. [onHeaders](http://npm.im/on-headers) - updated stats after headers at sent in response

## Contributing

The following command will run the debugger and also watch for changed files

```sh
# debugging
$ npm run watch-debug

# then attach debugger (e.g. using vscode)
```

#### Diractory Structure

`/config` - config files (uses `.env` file)  
`/src/controllers` - controllers for the routes (process and stats)  
`/src/routes` - api endpoint routes (`/process` and `/stats`)  
`/src/utils` - util functions (random, emit send-stats, statistics)  
`/src/middlewares` - middleware functions for logging, delay, realtime-stats using sockets  
`/public` - serve static file for UI  
`/dist` - typescript built files

## License

[MIT](LICENSE)
