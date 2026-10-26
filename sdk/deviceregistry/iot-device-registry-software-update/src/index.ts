// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DeviceRegistrySoftwareUpdateClient } from "./deviceRegistrySoftwareUpdateClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  DeviceClass,
  DeviceClassProperties,
  BestCompatibleUpdate,
  UpdateId,
  Update,
  Compatibility,
  Instructions,
  Step,
  StepType,
  ImportUpdateRequest,
  ImportUpdateInputItem,
  ImportManifestMetadata,
  FileImportMetadata,
  UpdateOperation,
  OperationState,
  UpdateInfo,
  UpdateFile,
  UpdateFileBase,
  UpdateFileDownloadHandler,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type { DeviceRegistrySoftwareUpdateClientOptionalParams } from "./api/index.js";
export type {
  DeviceClassesDeleteOptionalParams,
  DeviceClassesGetDeviceClassOptionalParams,
  DeviceClassesListOptionalParams,
} from "./api/deviceClasses/index.js";
export type {
  SoftwareUpdateGetOperationStatusOptionalParams,
  SoftwareUpdateListOperationStatusesOptionalParams,
  SoftwareUpdateGetFileOptionalParams,
  SoftwareUpdateListFilesOptionalParams,
  SoftwareUpdateListVersionsOptionalParams,
  SoftwareUpdateListNamesOptionalParams,
  SoftwareUpdateListProvidersOptionalParams,
  SoftwareUpdateDeleteUpdateOptionalParams,
  SoftwareUpdateGetUpdateOptionalParams,
  SoftwareUpdateImportUpdateOptionalParams,
  SoftwareUpdateListUpdatesOptionalParams,
} from "./api/softwareUpdate/index.js";
export type { DeviceClassesOperations, SoftwareUpdateOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
