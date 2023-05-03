# `dev-tool migrate`

**2023-02-27**

## Summary

This feature enables robust tracking of migration status across packages in the azure-sdk-for-js repo. We will add a small amount of metadata to packages indicating when they were last updated to the latest programming standards. In addition, we will add structured migrations to dev-tool that can be compared to this metadata and used to automatically migrate packages to new development methodologies and/or track the status of manual migrations.

## Motivation

Our need for enhanced package management automation is ever-increasing. One of the current challenges to implementing broad refactors across the repo is the requirement that each package maintainer implement the refactor independently. While some refactors (for example, changing the package.json `engines` field) can easily be completed by rote automation, others require manual intervention on a package-by-package basis (migrating to a shared bundling script). It is useful to have a shared way of reasoning about the status of package migrations.

## User guide

A new command, `dev-tool migrate` provides access to migration-tracking functionality. It is used as follows:

- `dev-tool migrate`: Starts a new migration. If any migration is **suspended** in any package, then this command fails. If the git tree is dirty (no changes to tracked files), this command fails. **Pending** migrations are executed in order of their `date`, beginning with the oldest migration that is strictly newer than the package's `migrationDate`. If the package has no `migrationDate`, then all migrations are included. Migrations that have a `date` that is in the future relative to the current time are excluded.
  1. If a migration has a `pre-condition`, the pre-condition is executed. The pre-condition check tests that the migration's assumptions are valid. If the pre-condition check fails, the migration is **suspended**, an error message is printed, and control is returned to the user. If the migration has no pre-condition check, this step is skipped.
  2. If the migration has an `eligibility` test, the eligibility test is executed. The eligibility test determines whether or not the migration _should_ be applied. If the `eligibility` test returns false, the migration **succeeds** immediately (the package is ineligible). This empty result is committed to git and the next migration begins (step 1), or if this is the final migration the whole procedure **succeeds**. If the `eligibility` test returns true, the migration proceeds to step 2.
  3. If a migration has no automated `execution`, the migration is **suspended** and the command requests developer intervention to resolve the migration status and prints instructions to do so, similar to a `git merge` conflict. The command saves the **suspended** migration state and returns control to the user's shell.
  4. If a migration has a `validation`, the result of its execution (whether performed manually or automatically) are validated according to its logic. If the validation function fails, the migration is **suspended** and control is returned to the user. This provides an opportunity to correct invalid migrations. If the migration has no `validation`, it is **suspended** so that you can confirm that it was executed correctly.
  5. If the migration's `validation` succeeds (or if there is no validation), the migration **succeeds** and the package's `migrationDate` is updated to the `date` of the passed migration. The result of the migration is committed to git. The next migration begins (step 1), or if this is the final migration the whole procedure **succeeds**.
- `dev-tool migrate --continue`: **continues** a **suspended** migration, if there is one. The migration's `validation` is executed if there is one. Migrations are always suspended at the `validation` step, so this command resumes a suspended migration beginning with step 3 above.
- `dev-tool migrate --abort`: discards the migration state and returns the package to its last succeeded state (either the original state if no migrations have succeeded, or the committed state of the last successful migration step).
- `dev-tool migrate --list`: shows all **pending** migrations for the current package.

TL;DR: Run `dev-tool migrate` to bring your package up to date. It'll tell you what to do. Run `dev-tool migrate --list` to see what it's going to do. If a migration is **suspended**, run `dev-tool migrate --contine` to re-check it and continue the migration pass, or run `dev-tool migrate --abort` to cancel the migration.

## Reference

The following section specifies the conceptual behavior of migrations.

### Migrations

A migration is an entity that is composed of the following information:

- `id`: a string identifier that is unique within the collection of all migrations.
- `date`: a UTC timestamp indicating the date that the migration becomes effective.
- `description`: a string describing the purpose of the migration.
- `url`: an OPTIONAL string containing a URL to a document explaining the migration in more detail (such as a design document or GitHub issue).
- `execution`: an OPTIONAL associated procedure that partially or fully migrates a package.
- `validation`: an OPTIONAL associated procedure that partially or fully validates that a migration was performed correctly.
- `eligibilty`: an OPTIONAL associated procedure that determines whether or not a migration should be applied to a package.
- `pre-condition`: an OPTIONAL associated procedure that determines whether or not a migration can be applied to a package.

The repository will store a sequence of migrations in an unspecified format.

### Package Metadata

The following metadata is applied to all azure-sdk-for-js packages:

- `migrationDate`: a UTC timestamp indicating the date of the last successfully-applied migration.

### Interactions

A migration has the following conditions with respect to a package:

- A migration is considered **pending** with respect to a package if its `date` is (1) in the past, i.e. sooner than the current date and (2) is newer than the package's `migrationDate`.
- A migration is considered **applied** with respect to a package if its `date` is older than the package's `migrationDate`.

Azure SDK for JS infrastructure procedures (such as CI, dev-tool scripts, etc.) MAY consider whether or not a migration is **applied** and use that information to change the behavior of the procedure. In other words, packages that have reached certain migrations may be handled differently than those that haven't.

### Suspended and Partial Migrations

If the `validation` of any migration fails, the `id` of the current migration and the base path of the current package are written to the file `<STATE>/migration-suspended`, where `<STATE>` is the following directory:

- On Windows, `%LOCALAPPDATA%\azsdk-dev-tool\state\`, where `%LOCALAPPDATA%` defaults to `C:\Users\<USERNAME>\AppData\Local`.
- On Linux, `$XDG_STATE_HOME/azsdk-dev-tool`, where `$XDG_STATE_HOME` defaults to `~/.local/state/`
- On macOS, `~/Library/Application Support/azsdk-dev-tool/state/`

This file is the **state file**. It is sufficient to check whether or not the **state file** exists to determine whether or not any migration in any package is **suspended**.

No new migrations may be initiated while any migration in any package is **suspended**.

The **state file** is created before a migration's `execution` and is removed if its `validation` succeeds or if it has no `validation` AND the migration is resumed from a suspended state.

When attempting to resume a **suspended** migration, the migration is identified by the ID written to the **state file**, and the current package must match the base path written to the **state file** (in other words, the migration must be resumed from the same package where it was suspended).

## Rationale

Conceptually, this system enables progressive migration of a large set of packages. In addition to simply providing a mechanism by which migrations are _executed_, it provides a mechanism for other systems within the Azure SDK for JS to determine whether or not package's have been migrated to a particular state. This allows us to treat packages that have not been migrated or _cannot_ be migrated differently from those that have.

For example, reworking our CI processes is currently a monumental task because if we _did_ rework our CI, it is impossible to migrate all packages to a new CI system at once and difficult to determine whether or not packages have been updated to its new specification. This system provides a robust way to determine, at feature-granularity, whether or not a package satisfies certain assumptions.

## Drawbacks and Counter-arguments

- The migration system adds more information to the resting state of packages, making them more complicated to manage.

- It could be argued that a progressive migration system encourages us to defer migrating packages until it's necessary rather than "ripping off the Band-Aid" and performing the painful migration all at once.

- If any package has a serious issue blocking any migration, it will block its progress through subsequent migrations as well. If any package has a bona-fide reason that it _cannot_ accept a migration, it could threaten the integrity of the system at large (however, we would likely consider it an error in the migration itself if any package cannot accept the migration).

## Prior Art

- codemod (https://github.com/facebookarchive/codemod): This system essentially provides a more flexible implementation of the same idea. Rather than just executing a codemod, we enable the migrations to execute arbitrary JavaScript code and manipulate the package's code however it likes.

## Questions

- Q: Do we need to support running migrations out of order? I can imagine that some packages may want to skip certain migrations, but this increases the complexity of the system substantially if migrations cannot assume that previous migrations have been applied.
- A: No, we do not need to support running migrations out of order. If it is required, we may support multiple in-order "channels" or sequences of migrations that can be applied sequentially. The system will not support skipping migrations if a package is eligible, as such would greatly increase the complexity of the system overall.

## Examples

- We periodically need to update the supported `"engines"` field of every `package.json`. Additionally, we need to periodically update the TypeScript version. This system can encode those updates as migrations and track our progress towards new releases of Node and TypeScript.
- Adopting the `dev-tool check` command is difficult because some packages may not pass the command. We therefore cannot add it to the CI scripts until every package has adopted its use. This system will enable us to not only track adoption of the check command as a migration, but provide a way for CI to determine whether or not a package has adopted it and execute it conditionally.

## Future Enhancement

- In the future, we'd like to add support for multiple migration "channels" if necessary. For example, a critical channel and a non-critical channel. The critical channel would include migrations that must be applied as soon as possible, and the non-critical channel would include less important migrations that may require intervention from the package maintainers to apply correctly.
