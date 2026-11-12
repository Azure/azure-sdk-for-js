// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  rollbackCircuitMigration,
  commitCircuitMigration,
  migrateCircuit,
  restoreBgpForCircuitMigration,
  shutDownBgpForCircuitMigration,
  prepareCircuitMigration,
  getCircuitMigrationInfo,
  validateCircuitMigration,
  listRoutesTable,
  listRoutesTableSummary,
  listArpTable,
  list,
  listByResourceGroup,
  updateTags,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
  ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
  ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
  ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
  ExpressRouteCrossConnectionsListArpTableOptionalParams,
  ExpressRouteCrossConnectionsListOptionalParams,
  ExpressRouteCrossConnectionsListByResourceGroupOptionalParams,
  ExpressRouteCrossConnectionsUpdateTagsOptionalParams,
  ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
  ExpressRouteCrossConnectionsGetOptionalParams,
} from "./options.js";
