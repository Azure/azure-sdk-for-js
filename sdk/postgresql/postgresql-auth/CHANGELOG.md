# Release History

## 1.0.0-beta.1 (2026-04-28)

### Features Added

- Added `entraTokenProvider` function for acquiring Entra ID tokens as PostgreSQL passwords.
- Added `configureEntraAuthentication` function for automatic Sequelize Entra ID authentication via `beforeConnect` hook.
- Support for `pg` (node-postgres) and Sequelize clients as optional peer dependencies.
