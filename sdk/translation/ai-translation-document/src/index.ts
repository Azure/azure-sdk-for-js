// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodeReadableStream } from "#platform/static-helpers/platform-types";
import { FileContents } from "./static-helpers/multipartHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DocumentTranslationClient } from "./documentTranslation/documentTranslationClient.js";
export type { RestorePollerOptions } from "./documentTranslation/restorePollerHelpers.js";
export { restorePoller } from "./documentTranslation/restorePollerHelpers.js";
export type {
  StartTranslationDetails,
  BatchRequest,
  SourceInput,
  DocumentFilter,
  TranslationStorageSource,
  TargetInput,
  Glossary,
  StorageInputType,
  BatchOptions,
  TranslationStatus,
  Status,
  TranslationError,
  TranslationErrorCode,
  InnerTranslationError,
  TranslationStatusSummary,
  DocumentStatus,
  SupportedFileFormats,
  FileFormat,
  FileFormatType,
  DocumentTranslateContent,
  TranslateResponse,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
  DocumentTranslationClientOptionalParams,
  GetSupportedFormatsOptionalParams,
  GetDocumentsStatusOptionalParams,
  CancelTranslationOptionalParams,
  GetTranslationStatusOptionalParams,
  GetDocumentStatusOptionalParams,
  GetTranslationsStatusOptionalParams,
  StartTranslationOptionalParams,
} from "./documentTranslation/api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export type { FileContents, NodeReadableStream };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
export { SingleDocumentTranslationClient } from "./singleDocumentTranslation/singleDocumentTranslationClient.js";
export type {
  TranslateOptionalParams,
  SingleDocumentTranslationClientOptionalParams,
} from "./singleDocumentTranslation/api/index.js";
