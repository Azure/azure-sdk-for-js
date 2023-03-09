// // Copyright (c) Microsoft Corporation.
// // Licensed under the MIT license.

// import { createMigration } from "../../util/migrations";
// import { runMigrationScript } from "../../util/testProxyUtils";

// // The migration itself should be default-exported so that other tools can reference it easily.
// export default createMigration(
//   "onboard/test_proxy_asset_sync", // unique ID
//   "2023-03-08T18:36:03+00:00Z", // ISO timestamp that the migration becomes effective
//   "enables the `dev-tool check` command (for example)", // short description of the migration
//   {
//     // Optional URL to more information
//     url: "https://github.com/azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder/ASSET_SYNC_MIGRATION.md",

// The migration itself should be default-exported so that other tools can reference it easily.
export default createMigration(
  "onboard/test_proxy_asset_sync", // unique ID
  "2023-03-08T18:36:03Z", // ISO timestamp that the migration becomes effective
  "enables the `dev-tool check` command (for example)", // short description of the migration
  {
    // Optional URL to more information
    url: "https://github.com/azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder/ASSET_SYNC_MIGRATION.md",

//     // Optional automated execution
//     async execute(project) {
//       // TODO: test if package has already been migrated.

//       await runMigrationScript(project, true);
//     },
//   }
// );
