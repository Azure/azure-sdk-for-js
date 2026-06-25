// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DeidentificationClient } from "./deidentificationClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  DeidentificationJob,
  DeidentificationOperationType,
  SourceStorageLocation,
  TargetStorageLocation,
  DeidentificationJobCustomizationOptions,
  OperationState,
  DeidentificationJobSummary,
  DeidentificationDocumentDetails,
  DeidentificationDocumentLocation,
  DeidentificationContent,
  TaggedPhiEntities,
  TextEncodingType,
  SimplePhiEntity,
  PhiCategory,
  DeidentificationCustomizationOptions,
  DeidentificationResult,
  PhiTaggerResult,
  PhiEntity,
  StringIndex,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
  DeidentificationClientOptionalParams,
  DeidentifyTextOptionalParams,
  DeleteJobOptionalParams,
  CancelJobOptionalParams,
  ListJobDocumentsOptionalParams,
  ListJobsOptionalParams,
  DeidentifyDocumentsOptionalParams,
  GetJobOptionalParams,
} from "./api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
