// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createMigration } from "../util/migrations";

// The migration itself should be default-exported so that other tools can reference it easily.
export default createMigration(
  "foo", // unique ID
  "2023-03-06T18:46:38+00:00", // ISO timestamp that the migration becomes effective
  'sets `package.json["//metadata"].foo = true`', // short description of the migration
  {
    validation: async (project) => {
      // This function throws an error if the migration was not performed successfully.
      // It should be idempotent, so that it can be run multiple times without error.

      if ((project.packageJson["//metadata"] as any).foo !== true) {
        throw new Error("foo was not set to true");
      }
    },
  }
);
