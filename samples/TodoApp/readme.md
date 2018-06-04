# Todo App

Sample Todo app

## Prereqs

- Build the SDK (see [dev.md](../../dev.md))
- Node 8 (uses async/await)

## Config

If you're using the local emulator with default config, it should work without setting any additionanl config

**Environment Variables**
- `host` - url for the Cosmos DB (default is https://localhost:8081)
- `AUTH_KEY` - master key for the Cosmos DB (default is the well known key for emulator)
- `PORT` - port for the web app (default is 3000)

## Run

```bash
npm i
npm start
```

open browser to http://localhost:3000