The Azure SDK for JavaScript is migrating from [Rush](https://rushjs.io/) to [pnpm](https:/pnpm.io) as part of the Azure SDK for JavaScript modernization efforts.  This is a guide to show how to migrate from Rush commands to pnpm commands for common scenarios.

# Scenarios

These are the following scenarios covered:

- [Installation](#installation)
- [Common Commands](#common-commands)
- [Using Commands](#using-commands)
- [Workspace Management](#workspace-management)
- [Package Management](#package-management)

## Installation

### Old: Rush

Commonly Rush was installed using `npm` and installing globally such as the following:

```sh
npm install -g @microsoft/rush
```

Once installed, we then initialize Rush with:

```sh
rush update
```

### New: Pnpm

pnpm can be installed globally using `pnpm`:

```sh
npm install -g pnpm
```

Once installed, you should run `install` inside the SDK project.

```sh
pnpm install
```

## Common Commands

All common commands from Rush are directly translated to pnpm directly for the following, by simply replacing `rush` with `pnpm`

- `build`: Builds the project
- `build:test`: Builds the project for testing
- `build:samples`: Builds the samples
- `clean`: Cleans the workspace and project
- `check-format`: Checks the formatting using Prettier
- `format`: Formats the project using Prettier
- `lint`: Checks the linting using ESLint
- `lint:fix`: Checks the linting using ESLint and fixes the issues if they are fixable
- `test`: Executes all tests for both unit and integration tests
- `test:browser`: Executes the unit tests for the browser
- `test:node`: Excutes the unit tests for Node.js
- `update-snippets`: Updates the snippets for documentation and code

## Using Commands

### Old: Rush

With Rush, we could run against the entire repository such as building everything in the workspace using:

```sh
rush build
```

For building a single project, uses the `-t` option.

```sh
rush build -t <project-name>
```

Accepts multiple projects to build at once with usage of multiple `-t`

```sh
rush build -t <project-name-1> -t <project-name-2>
```

When inside a service SDK folder, we can run the local commands using `rushx` such as:

```sh
rushx build
```

### New: Pnpm

To target everything we can do the same with pnpm, for example to build the entire workspace.

```sh
pnpm build
```

To build a single project, we can use the `--filter=<package-name>...` option.  Note in order to build the project and its dependencies, the `...` is required after the project name, however, if you just want to build the project without its depdendencies, you can leave off the `...`.

```sh
pnpm build --filter=<project-name>...
```

Multiple filters can be used to build multiple projects such as the following:

```sh
pnpm build --filter=<project-name-1>... --filter<project-name-2>...
```

When inside a project, we can build the project by itself and not its dependencies:

```sh
pnpm build
```

or good old


```sh
npm run build
```

### Package Selection Filters

|                                                 | Working directory | Rush                            | Pnpm                              |
|-------------------------------------------------|-------------------|---------------------------------|-----------------------------------|
| Install/update dependencies                     | Anywhere in repo  | `rush install` or `rush update` | `pnpm install`                    |
| Build all packages                              | Repo root         | `rush build`                    | `pnpm build`                      |
| Build a package’s dependencies and itself       | Repo root         | `rush build -t <package name>`  | `pnpm build -F <package name>...` |
| Build a package and its dependents              | Repo root         | `rush build -f <package name>`  | `pnpm build -F ...<package name>` |
| Build current package’s dependencies and itself | package directory | `rush build -t .`               | `pnpm -F {./}... build`           |
| Build a package itself only                     | Repo root         | `rush build -o <package name>`  | `pnpm build -F <package name>`    |
| Build a package itself only                     | Anywhere in repo  | `rush build -o <package name>`  | `pnpm -F <package name> build`    |
| Build a package itself only                     | package directory | `rushx build`                   | `pnpm build` or `npm run build`   |


Similarly other mono repo commands (`clean`, `test`, `test:node`, `format`, `lint`, etc.) also work with selections via `--filter` or `-F` option.  It is supported to pass `--filter` or `-F` option multiple times.

**NOTE** The `...` is a specifier, not an ellipsis.

- To select package’s dependencies and itself:                                        `--filter <package name>...`
- To select package itself only:                                                                          `--filter <package name>`
- To select package and its dependents:                                                     `--filter ...<package name>`
- To select package’s dependencies, itself, and its dependents:    `--filter ...<package name>...`

For more filtering information please see [Filtering | pnpm](https://pnpm.io/filtering).

## Workspace Management

Both Rush and pnpm support workspaces, so let's go over the differences.

### Old: Rush

With Rush, you had the `rush.json` file at the root where we had our workspace projects listed in the `projects` section of the JSON, specifying the location, the package name and versioning policy.  This also kept the stored information about the workspace in the `common/config/rush` folder with the lock file.  All packages had to be explicitly added to the workspace through the `rush.json` and then `rush update` called to include the package.

### New: Pnpm

Using pnpm, we can manage the workspace with the `pnpm-workspace.yaml` file at the root of the repository.  By default, when adding a new package to the repository under the `sdk` folder, it should be picked up immediately once `pnpm install` has been called.  If the package has not been picked up, it may have been excluded by one of our ignore patterns.  Please work with the team if that is the case.

Inside the `pnpm-workspace.yaml` file, we have several sections:

- `packages` (our workspace packages)
- `catalog` (default catalog)
- `catalogs` (our named catalogs)

For the `packages` section, this should include all we plan to build and ship as part of the SDK with both things in `common/tools` as well as the `sdk` folder.  By default, we should not need to edit this section to add any new SDKs to the workspace.  In order to exclude something from being part of the workspace, ensure the `!` syntax is used for example `!sdk/core/should-not-be-added`.

In the `catalog` section, using the [Catalog Protocol](https://pnpm.io/catalogs#the-catalog-protocol-catalog), we keep our packages such as TypeScript, TSLib and other package references used across the entire set of packages.  This should be kept rather small and instead, we should focus on named catalogs for specific focus areas to version things together.

[Named Catalogs](https://pnpm.io/catalogs#named-catalogs) are a great feature of pnpm and are often used in our `pnpm-workspace.yaml` file.  This allows us to separate out different versions of libraries such as `@azure-tools/test-recorder` V3 and V4, for example.  We also have sections for OTEL, identity, testing and other focus areas to allow them to be easily versioned.  Note that we have an `internal` catalog, so we can break any circular references, for example, not needing to bring in `@azure/identity` to all packages as a workspace causing it to be built, and instead just as a normal reference.

Currently, we have the following named catalogs:

- `testing`: vitest and modern testing
- `testinglegacy`: Legacy testing needs
- `corelroV2`: for packages that use the older @azure/core-lro version 2
- `credentialV1`: For packages that use @azure-tools/test-credential version 1
- `recorderV3`: For packages that use @azure-tools/test-recorder version 3
- `internal`: internal packages used as to prevent circular references
- `identity`: MSAL and other identity packages
- `amqp`: AMQP related packages
- `polyfills`: Polyfills necessary for Node.js and the browser
- `otel`: All OpenTelemetry libraries.

## Package Management

Adding packages should be able to do be done via both the command line and editing the `package.json` of the project individually.

### Old: Rush

In Rush, we can add a package to a project by using the CLI:

```sh
# Assume latest version
rush add --package <package-name>

# Add a specific version with the ~ version
rush add --package <package-name>@<version>

# Add a specific version with a ^ version
rush add --package <package-name>@<version> --caret

# Add to devDependencies
rush add --package <package-name>@<version> --dev
```

In addition, we can edit the `package.json` with the correct version and then call `rush update`.

### New: Pnpm

With pnpm, we strive to use `workspace` and `catalog` references as much as possible.  This allows us to be consistent in our versioning to ensure that we are up to date with our latest depdendencies.

With pnpm, we can [add packages](https://pnpm.io/cli/add) with similar examples to Rush above:

```sh
# Assume latest version
pnpm add <package-name>

# Add a specific version with the ~ version
pnpm add <package-name>#semver:~<version> 

# Add a specific version with a ^ version
pnpm add <package-name>#semver:^<version> 

# Add to devDependencies
pnpm add <package-name>@<version> -D
```

In addition, we can edit the `package.json` with the correct version and then call `pnpm install`.  Note that we prefer to use `catalog` and `workspace` references as applicable.  Reference the `pnpm-workspace.yaml` file for the default catalog and named catalogs for the references you may need.

Here is an example such as with the `@azure/ai-projects` package:

```json
  "dependencies": {
    "@azure-rest/core-client": "workspace:^",
    "@azure/abort-controller": "workspace:^",
    "@azure/core-auth": "workspace:^",
    "@azure/core-rest-pipeline": "workspace:^",
    "@azure/core-util": "workspace:^",
    "@azure/logger": "workspace:^",
    "@azure/core-lro": "workspace:^",
    "tslib": "catalog:",
    "@azure/core-paging": "workspace:^",
    "@azure/core-sse": "workspace:^",
    "@azure/core-tracing": "workspace:^"
  },
  "devDependencies": {
    "@azure/dev-tool": "workspace:^",
    "@azure/eslint-plugin-azure-sdk": "workspace:^",
    "@azure/identity": "catalog:internal",
    "@azure/opentelemetry-instrumentation-azure-sdk": "catalog:otel",
    "@azure/monitor-opentelemetry-exporter": "catalog:otel",
    "@azure-tools/test-credential": "workspace:^",
    "@azure-tools/test-recorder": "workspace:^",
    "@azure-tools/test-utils-vitest": "workspace:^",
    "@opentelemetry/api": "catalog:otel",
    "@opentelemetry/instrumentation": "catalog:otel",
    "@opentelemetry/sdk-trace-node": "catalog:otel",
    "@vitest/browser": "catalog:testing",
    "@vitest/coverage-istanbul": "catalog:testing",
    "@types/node": "catalog:",
    "dotenv": "catalog:testing",
    "eslint": "catalog:",
    "playwright": "catalog:testing",
    "typescript": "catalog:",
    "vitest": "catalog:testing"
  },
```
