# Azure PostgreSQL Authentication client library for JavaScript

This package provides Azure Entra ID (formerly Azure Active Directory) authentication for PostgreSQL connections in JavaScript. It supports both [node-postgres (`pg`)](https://node-postgres.com/) and [Sequelize](https://sequelize.org/) clients.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/postgresql/postgresql-auth)
- <!---[Package (NPM)](https://www.npmjs.com/package/@azure/postgresql-auth)--->
- <!---[API reference documentation](https://learn.microsoft.com/javascript/api/@azure/postgresql-auth)--->
- [Product documentation](https://learn.microsoft.com/azure/postgresql/)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- An [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/) server configured for Entra ID authentication.

### Install the `@azure/postgresql-auth` package

Install the Azure PostgreSQL Authentication client library for JavaScript with `npm`:

```bash
npm install @azure/postgresql-auth
```

You will also need to install `@azure/identity` for credential support and your preferred PostgreSQL client:

```bash
npm install @azure/identity pg
# or
npm install @azure/identity sequelize pg
```

## Key concepts

This library provides two functions for integrating Entra ID authentication with PostgreSQL:

- **`entraTokenProvider`** — Returns a password provider function that acquires an Entra ID access token suitable for use as a PostgreSQL password. Use this with `pg.Pool` or `pg.Client`.
- **`configureEntraAuthentication`** — Registers a `beforeConnect` hook on a Sequelize instance that automatically acquires a fresh token and sets the username/password before each new connection.
- **`GetEntraTokenPasswordOptions`** — Optionally override the default OAuth scope (scope property) passed to entraTokenProvider.
- **`SequelizeBeforeConnectHook`** — Structural interface accepted by configureEntraAuthentication; lets you use any Sequelize-compatible object without adding a hard sequelize dependency.

Both functions accept an Azure `TokenCredential` (from `@azure/identity`) and handle token acquisition against the Azure Database for PostgreSQL scope.

## Examples

### Using with node-postgres (`pg`)

```ts snippet:entraTokenProvider
import { DefaultAzureCredential } from "@azure/identity";

const { entraTokenProvider } = await import("@azure/postgresql-auth");
const pg = await import("pg");
const credential = new DefaultAzureCredential();
const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: entraTokenProvider(credential),
  ssl: { rejectUnauthorized: true },
});
```

### Using with Sequelize

```ts snippet:configureEntraAuthentication
import { DefaultAzureCredential } from "@azure/identity";

const { configureEntraAuthentication } = await import("@azure/postgresql-auth");
const { Sequelize } = await import("sequelize");
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
});
const credential = new DefaultAzureCredential();
configureEntraAuthentication(sequelize, credential);
await sequelize.authenticate();
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:Logging
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/postgresql/postgresql-auth/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

<!-- LINKS -->

[azure_sub]: https://azure.microsoft.com/free/
