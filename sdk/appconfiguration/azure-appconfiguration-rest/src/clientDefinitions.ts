// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetKeysParameters,
  CheckKeysParameters,
  GetKeyValuesParameters,
  CheckKeyValuesParameters,
  GetKeyValueParameters,
  PutKeyValueParameters,
  DeleteKeyValueParameters,
  CheckKeyValueParameters,
  GetSnapshotsParameters,
  CheckSnapshotsParameters,
  GetSnapshotParameters,
  CreateSnapshotParameters,
  UpdateSnapshotParameters,
  CheckSnapshotParameters,
  GetOperationDetailsParameters,
  GetLabelsParameters,
  CheckLabelsParameters,
  PutLockParameters,
  DeleteLockParameters,
  GetRevisionsParameters,
  CheckRevisionsParameters,
} from "./parameters.js";
import type {
  GetKeys200Response,
  GetKeysDefaultResponse,
  CheckKeys200Response,
  CheckKeysDefaultResponse,
  GetKeyValues200Response,
  GetKeyValuesDefaultResponse,
  CheckKeyValues200Response,
  CheckKeyValuesDefaultResponse,
  GetKeyValue200Response,
  GetKeyValueDefaultResponse,
  PutKeyValue200Response,
  PutKeyValueDefaultResponse,
  DeleteKeyValue200Response,
  DeleteKeyValue204Response,
  DeleteKeyValueDefaultResponse,
  CheckKeyValue200Response,
  CheckKeyValueDefaultResponse,
  GetSnapshots200Response,
  GetSnapshotsDefaultResponse,
  CheckSnapshots200Response,
  CheckSnapshotsDefaultResponse,
  GetSnapshot200Response,
  GetSnapshotDefaultResponse,
  CreateSnapshot201Response,
  CreateSnapshotDefaultResponse,
  UpdateSnapshot200Response,
  UpdateSnapshotDefaultResponse,
  CheckSnapshot200Response,
  CheckSnapshotDefaultResponse,
  GetOperationDetails200Response,
  GetOperationDetailsDefaultResponse,
  GetLabels200Response,
  GetLabelsDefaultResponse,
  CheckLabels200Response,
  CheckLabelsDefaultResponse,
  PutLock200Response,
  PutLockDefaultResponse,
  DeleteLock200Response,
  DeleteLockDefaultResponse,
  GetRevisions200Response,
  GetRevisionsDefaultResponse,
  CheckRevisions200Response,
  CheckRevisionsDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetKeys {
  /** Gets a list of keys. */
  get(
    options?: GetKeysParameters,
  ): StreamableMethod<GetKeys200Response | GetKeysDefaultResponse>;
  /** Requests the headers and status of the given resource. */
  head(
    options?: CheckKeysParameters,
  ): StreamableMethod<CheckKeys200Response | CheckKeysDefaultResponse>;
}

export interface GetKeyValues {
  /** Gets a list of key-values. */
  get(
    options?: GetKeyValuesParameters,
  ): StreamableMethod<GetKeyValues200Response | GetKeyValuesDefaultResponse>;
  /** Requests the headers and status of the given resource. */
  head(
    options?: CheckKeyValuesParameters,
  ): StreamableMethod<
    CheckKeyValues200Response | CheckKeyValuesDefaultResponse
  >;
}

export interface GetKeyValue {
  /** Gets a single key-value. */
  get(
    options?: GetKeyValueParameters,
  ): StreamableMethod<GetKeyValue200Response | GetKeyValueDefaultResponse>;
  /** Creates a key-value. */
  put(
    options: PutKeyValueParameters,
  ): StreamableMethod<PutKeyValue200Response | PutKeyValueDefaultResponse>;
  /** Deletes a key-value. */
  delete(
    options?: DeleteKeyValueParameters,
  ): StreamableMethod<
    | DeleteKeyValue200Response
    | DeleteKeyValue204Response
    | DeleteKeyValueDefaultResponse
  >;
  /** Requests the headers and status of the given resource. */
  head(
    options?: CheckKeyValueParameters,
  ): StreamableMethod<CheckKeyValue200Response | CheckKeyValueDefaultResponse>;
}

export interface GetSnapshots {
  /** Gets a list of key-value snapshots. */
  get(
    options?: GetSnapshotsParameters,
  ): StreamableMethod<GetSnapshots200Response | GetSnapshotsDefaultResponse>;
  /** Requests the headers and status of the given resource. */
  head(
    options?: CheckSnapshotsParameters,
  ): StreamableMethod<
    CheckSnapshots200Response | CheckSnapshotsDefaultResponse
  >;
}

export interface GetSnapshot {
  /** Gets a single key-value snapshot. */
  get(
    options?: GetSnapshotParameters,
  ): StreamableMethod<GetSnapshot200Response | GetSnapshotDefaultResponse>;
  /** Creates a key-value snapshot. */
  put(
    options: CreateSnapshotParameters,
  ): StreamableMethod<
    CreateSnapshot201Response | CreateSnapshotDefaultResponse
  >;
  /** Updates the state of a key-value snapshot. */
  patch(
    options: UpdateSnapshotParameters,
  ): StreamableMethod<
    UpdateSnapshot200Response | UpdateSnapshotDefaultResponse
  >;
  /** Requests the headers and status of the given resource. */
  head(
    options?: CheckSnapshotParameters,
  ): StreamableMethod<CheckSnapshot200Response | CheckSnapshotDefaultResponse>;
}

export interface GetOperationDetails {
  /** Gets the state of a long running operation. */
  get(
    options: GetOperationDetailsParameters,
  ): StreamableMethod<
    GetOperationDetails200Response | GetOperationDetailsDefaultResponse
  >;
}

export interface GetLabels {
  /** Gets a list of labels. */
  get(
    options?: GetLabelsParameters,
  ): StreamableMethod<GetLabels200Response | GetLabelsDefaultResponse>;
  /** Requests the headers and status of the given resource. */
  head(
    options?: CheckLabelsParameters,
  ): StreamableMethod<CheckLabels200Response | CheckLabelsDefaultResponse>;
}

export interface PutLock {
  /** Locks a key-value. */
  put(
    options?: PutLockParameters,
  ): StreamableMethod<PutLock200Response | PutLockDefaultResponse>;
  /** Unlocks a key-value. */
  delete(
    options?: DeleteLockParameters,
  ): StreamableMethod<DeleteLock200Response | DeleteLockDefaultResponse>;
}

export interface GetRevisions {
  /** Gets a list of key-value revisions. */
  get(
    options?: GetRevisionsParameters,
  ): StreamableMethod<GetRevisions200Response | GetRevisionsDefaultResponse>;
  /** Requests the headers and status of the given resource. */
  head(
    options?: CheckRevisionsParameters,
  ): StreamableMethod<
    CheckRevisions200Response | CheckRevisionsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/keys' has methods for the following verbs: get, head */
  (path: "/keys"): GetKeys;
  /** Resource for '/kv' has methods for the following verbs: get, head */
  (path: "/kv"): GetKeyValues;
  /** Resource for '/kv/\{key\}' has methods for the following verbs: get, put, delete, head */
  (path: "/kv/{key}", key: string): GetKeyValue;
  /** Resource for '/snapshots' has methods for the following verbs: get, head */
  (path: "/snapshots"): GetSnapshots;
  /** Resource for '/snapshots/\{name\}' has methods for the following verbs: get, put, patch, head */
  (path: "/snapshots/{name}", name: string): GetSnapshot;
  /** Resource for '/operations' has methods for the following verbs: get */
  (path: "/operations"): GetOperationDetails;
  /** Resource for '/labels' has methods for the following verbs: get, head */
  (path: "/labels"): GetLabels;
  /** Resource for '/locks/\{key\}' has methods for the following verbs: put, delete */
  (path: "/locks/{key}", key: string): PutLock;
  /** Resource for '/revisions' has methods for the following verbs: get, head */
  (path: "/revisions"): GetRevisions;
}

export type AzureAppConfigurationClient = Client & {
  path: Routes;
};
