# Release History

## 1.0.0 (2026-08-26)

This is the first stable release of `@azure/postgresql-auth`. The API surface is unchanged from `1.0.0-beta.1`.

### Other Changes

- The minimum supported Node.js version is now 22.0.0.

## 1.0.0-beta.1 (2026-04-28)

### Features Added

- Added `entraTokenProvider` function for acquiring Entra ID tokens as PostgreSQL passwords.
- Added `configureEntraAuthentication` function for automatic Sequelize Entra ID authentication via `beforeConnect` hook.
- Support for `pg` (node-postgres) and Sequelize clients as optional peer dependencies.
