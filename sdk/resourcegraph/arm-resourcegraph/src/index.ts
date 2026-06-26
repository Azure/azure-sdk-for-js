// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ResourceGraphClient } from "./resourceGraphClient.js";
export type {
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ResourcesHistoryResponse,
} from "./models/index.js";
export { KnownCreatedByType } from "./models/index.js";
export type {
  GraphQueryResource,
  GraphQueryProperties,
  ResultKind,
  GraphQueryError,
  GraphQueryErrorError,
  ErrorFieldContract,
  GraphQueryUpdateParameters,
  GraphQueryPropertiesUpdateParameters,
} from "./models/graphQueryApi/index.js";
export { KnownResultKind } from "./models/graphQueryApi/index.js";
export type {
  ResourceChangesRequestParameters,
  ResourceChangesRequestParametersInterval,
  ResourceChangeList,
  ResourceChangeData,
  ResourceChangeDataBeforeSnapshot,
  ResourceChangeDataAfterSnapshot,
  ChangeType,
  ResourcePropertyChange,
  ChangeCategory,
  PropertyChangeType,
  ResourceSnapshotData,
  ResourceChangeDetailsRequestParameters,
} from "./models/resourceChanges/index.js";
export type {
  QueryRequest,
  QueryRequestOptions,
  AuthorizationScopeFilter,
  FacetRequest,
  FacetRequestOptions,
  FacetSortOrder,
  QueryResponse,
  ResultTruncated,
  Facet,
  FacetUnion,
  FacetResult,
  FacetError,
  Operation,
  OperationDisplay,
} from "./models/resourceGraphApi/index.js";
export type {
  DateTimeInterval,
  ErrorResponse,
  ErrorModel,
  ErrorDetails,
  ResultFormat,
} from "./models/resourceGraphCommon/index.js";
export type {
  ResourcesHistoryRequest,
  ResourcesHistoryRequestOptions,
} from "./models/resourceHistory/index.js";
export type {
  ResourcesHistoryOptionalParams,
  ResourcesOptionalParams,
  ResourceChangeDetailsOptionalParams,
  ResourceChangesOptionalParams,
  ResourceGraphClientOptionalParams,
} from "./api/index.js";
export type {
  GraphQueryListBySubscriptionOptionalParams,
  GraphQueryListOptionalParams,
  GraphQueryDeleteOptionalParams,
  GraphQueryUpdateOptionalParams,
  GraphQueryCreateOrUpdateOptionalParams,
  GraphQueryGetOptionalParams,
} from "./api/graphQuery/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { GraphQueryOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
