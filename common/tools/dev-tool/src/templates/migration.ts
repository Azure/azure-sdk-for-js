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
import { createMigration, MigrationContext } from "${id
  .split("/")
  .map(() => "..")
  .join("/")}/util/migrations";
// The migration itself should be default-exported so that other tools can reference it easily.
export default createMigration(
  "${id}", // unique ID
  "${date}", // ISO timestamp that the migration becomes effective
  "${description}", // short description of the migration
  {${url ? `\n    url: "${url}",\n` : ""}
    /**
     * Optionally validate the result of the migration. This function is called after an automated migration is executed
     * and after resuming a suspended migration.
     *
     * If this function throws an Error, the migration result is considered invalid, and the migration will be suspended.
     *
     * @param ctx - The migration context.
     */
    // async validate(ctx: MigrationContext) {
    //   /* you can run arbitrary code here to validate the migration. */
    // },
    /**
     * Execute the migration. If this function is not provided, the migration will be considered "manual" and the user
     * will be prompted to run the migration manually.
     *
     * If this function throws an Error, the migration will fail and be suspended.
     *
     * @param ctx - The migration context.
     */
    // async execute(ctx: MigrationContext) {
    //   /* you can run arbitrary code here to execute the migration. */
    // },
    /**
     * Optionally determines if the migration is applicable to the current project. If this function is not provided, the
     * migration will be considered applicable to all projects.
     *
     * If this function throws an Error, the migration will fail and be suspended.
     *
     * This function runs before the preconditions are checked, so it MUST NOT assume that the preconditions have been
     * met.
     *
     * @param ctx - The migration context.
     * @returns true if the migration is applicable to the project, false otherwise.
     */
    // async isApplicable(ctx: MigrationContext) {
    //   /* you can run arbitrary code here to determine if the migration is applicable to the project. */
    //   return true;
    // },
    /**
     * Optionally determines if the migration's preconditions are met. If this function is not provided, the migration will
     * be considered to have no preconditions.
     *
     * This function can be used to check for dependencies such as the presence of an executable (e.g. PowerShell).
     *
     * This function runs after the applicability check, so it may assume that the migration is applicable to the project.
     *
     * If this function throws an Error, the migration will fail and be suspended.
     *
     * @param ctx - The migration context.
     * @returns true if the migration's preconditions are met, false otherwise.
     */
    // async checkPreconditions(ctx: MigrationContext) {
    //   /* you can run arbitrary code here to determine if the migration's preconditions are met */
    //   return true;
    // },
  }
);`;
