// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Information used to instantiate the migration code template.
 */
export interface MigrationTemplate {
  /** Unique ID of the migration. */
  id: string;
  /** ISO timestamp that the migration becomes effective. */
  date: string;
  /** Short description of the migration. */
  description: string;
  /** Optional URL to more information. */
  url?: string;
}

export default ({
  id,
  date,
  description,
  url,
}: MigrationTemplate) => `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createMigration } from "../util/migrations";

// The migration itself should be default-exported so that other tools can reference it easily.
export default createMigration(
  "${id}", // unique ID
  "${date}", // ISO timestamp that the migration becomes effective
  "${description}", // short description of the migration
  {
    ${url ? `url: "${url}",\n` : ""}
    // Optional validation
    // validate(project) { /* the validation fails if this function throws an error. */ },
    //
    // Optional automated execution
    // execute(project) { /* you can run arbitrary code here to execute the migration. */ },
  }
);`;
