# `dev-tool` managed migrations

This directory contains migrations for `dev-tool`. A migration is a TypeScript module that installs itself when loaded using the migrations API. Any TypeScript module within this directory will be loaded when the migration system is initialized.

The simplest migration module is:

```ts migration-template
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createMigration } from "../util/migrations";

// The migration itself should be default-exported so that other tools can reference it easily.
export default createMigration(
  "example_migration", // unique ID
  "2023-03-03T00:00:00Z", // ISO timestamp that the migration becomes effective
  "enables the `dev-tool check` command (for example)", // short description of the migration
  {
    // Optional URL to more information
    // url: "https://github.com/azure/azure-sdk-for-js/tree/main/design/example.md",
    //
    // Optional validation
    // validate(project) { /* the validation fails if this function throws an error. */ },
    //
    // Optional automated execution
    // execute(project) { /* you can run arbitrary code here to execute the migration. */ },
  }
);
```

Migrations may optionally specify associated `execution` and `validation` functions, as well as a URL to more information in the options to the `createMigration` command.
