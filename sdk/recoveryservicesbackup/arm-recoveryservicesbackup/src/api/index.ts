// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  moveRecoveryPoint,
  getOperationStatus,
  bmsTriggerDataMove,
  bmsPrepareDataMove,
} from "./operations.js";
export type {
  MoveRecoveryPointOptionalParams,
  GetOperationStatusOptionalParams,
  BMSTriggerDataMoveOptionalParams,
  BMSPrepareDataMoveOptionalParams,
} from "./options.js";
export type {
  RecoveryServicesBackupContext,
  RecoveryServicesBackupClientOptionalParams,
} from "./recoveryServicesBackupContext.js";
export { createRecoveryServicesBackup } from "./recoveryServicesBackupContext.js";
