// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type {
  KeyValueFields,
  KeyValue,
  SnapshotFields,
  SnapshotStatus,
  Snapshot,
  SnapshotUpdateParameters,
  LabelFields,
} from "./models.js";

export interface GetKeysHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
}

export interface GetKeysQueryParamProperties {
  /** A filter for the name of the returned keys. */
  name?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
}

export interface GetKeysQueryParam {
  queryParameters?: GetKeysQueryParamProperties;
}

export interface GetKeysHeaderParam {
  headers?: RawHttpHeadersInput & GetKeysHeaders;
}

export type GetKeysParameters = GetKeysQueryParam &
  GetKeysHeaderParam &
  RequestParameters;

export interface CheckKeysHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface CheckKeysQueryParamProperties {
  /** A filter for the name of the returned keys. */
  name?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
}

export interface CheckKeysQueryParam {
  queryParameters?: CheckKeysQueryParamProperties;
}

export interface CheckKeysHeaderParam {
  headers?: RawHttpHeadersInput & CheckKeysHeaders;
}

export type CheckKeysParameters = CheckKeysQueryParam &
  CheckKeysHeaderParam &
  RequestParameters;

export interface GetKeyValuesHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface GetKeyValuesSelectQueryParam {
  /** Value of the parameter */
  value: KeyValueFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `tags` with explode set to true and style set to form. */
export interface GetKeyValuesTagsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface GetKeyValuesQueryParamProperties {
  /**
   * A filter used to match keys. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  key?: string;
  /**
   * A filter used to match labels. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  label?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: KeyValueFields[] | GetKeyValuesSelectQueryParam;
  /**
   * A filter used get key-values for a snapshot. The value should be the name of
   * the snapshot. Not valid when used with 'key' and 'label' filters.
   */
  snapshot?: string;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: GetKeyValuesTagsQueryParam;
}

export interface GetKeyValuesQueryParam {
  queryParameters?: GetKeyValuesQueryParamProperties;
}

export interface GetKeyValuesHeaderParam {
  headers?: RawHttpHeadersInput & GetKeyValuesHeaders;
}

export type GetKeyValuesParameters = GetKeyValuesQueryParam &
  GetKeyValuesHeaderParam &
  RequestParameters;

export interface CheckKeyValuesHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface CheckKeyValuesSelectQueryParam {
  /** Value of the parameter */
  value: KeyValueFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `tags` with explode set to true and style set to form. */
export interface CheckKeyValuesTagsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface CheckKeyValuesQueryParamProperties {
  /**
   * A filter used to match keys. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  key?: string;
  /**
   * A filter used to match labels. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  label?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: KeyValueFields[] | CheckKeyValuesSelectQueryParam;
  /**
   * A filter used get key-values for a snapshot. The value should be the name of
   * the snapshot. Not valid when used with 'key' and 'label' filters.
   */
  snapshot?: string;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: CheckKeyValuesTagsQueryParam;
}

export interface CheckKeyValuesQueryParam {
  queryParameters?: CheckKeyValuesQueryParamProperties;
}

export interface CheckKeyValuesHeaderParam {
  headers?: RawHttpHeadersInput & CheckKeyValuesHeaders;
}

export type CheckKeyValuesParameters = CheckKeyValuesQueryParam &
  CheckKeyValuesHeaderParam &
  RequestParameters;

export interface GetKeyValueHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface GetKeyValueSelectQueryParam {
  /** Value of the parameter */
  value: KeyValueFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `tags` with explode set to true and style set to form. */
export interface GetKeyValueTagsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface GetKeyValueQueryParamProperties {
  /** The label of the key-value to retrieve. */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: KeyValueFields[] | GetKeyValueSelectQueryParam;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: GetKeyValueTagsQueryParam;
}

export interface GetKeyValueQueryParam {
  queryParameters?: GetKeyValueQueryParamProperties;
}

export interface GetKeyValueHeaderParam {
  headers?: RawHttpHeadersInput & GetKeyValueHeaders;
}

export type GetKeyValueParameters = GetKeyValueQueryParam &
  GetKeyValueHeaderParam &
  RequestParameters;

export interface PutKeyValueHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PutKeyValueBodyParam {
  /** The key-value to create. */
  body?: KeyValue;
}

export interface PutKeyValueQueryParamProperties {
  /** The label of the key-value to create. */
  label?: string;
}

export interface PutKeyValueQueryParam {
  queryParameters?: PutKeyValueQueryParamProperties;
}

export interface PutKeyValueHeaderParam {
  headers?: RawHttpHeadersInput & PutKeyValueHeaders;
}

export interface PutKeyValueMediaTypesParam {
  /** Content-Type header */
  contentType:
    | "application/vnd.microsoft.appconfig.kv+json"
    | "application/vnd.microsoft.appconfig.kvset+json"
    | "application/json"
    | "text/json"
    | "application/*+json"
    | "application/json-patch+json";
}

export type PutKeyValueParameters = PutKeyValueQueryParam &
  PutKeyValueHeaderParam &
  PutKeyValueMediaTypesParam &
  PutKeyValueBodyParam &
  RequestParameters;

export interface DeleteKeyValueHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeleteKeyValueQueryParamProperties {
  /** The label of the key-value to delete. */
  label?: string;
}

export interface DeleteKeyValueQueryParam {
  queryParameters?: DeleteKeyValueQueryParamProperties;
}

export interface DeleteKeyValueHeaderParam {
  headers?: RawHttpHeadersInput & DeleteKeyValueHeaders;
}

export type DeleteKeyValueParameters = DeleteKeyValueQueryParam &
  DeleteKeyValueHeaderParam &
  RequestParameters;

export interface CheckKeyValueHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface CheckKeyValueSelectQueryParam {
  /** Value of the parameter */
  value: KeyValueFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `tags` with explode set to true and style set to form. */
export interface CheckKeyValueTagsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface CheckKeyValueQueryParamProperties {
  /** The label of the key-value to retrieve. */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: KeyValueFields[] | CheckKeyValueSelectQueryParam;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: CheckKeyValueTagsQueryParam;
}

export interface CheckKeyValueQueryParam {
  queryParameters?: CheckKeyValueQueryParamProperties;
}

export interface CheckKeyValueHeaderParam {
  headers?: RawHttpHeadersInput & CheckKeyValueHeaders;
}

export type CheckKeyValueParameters = CheckKeyValueQueryParam &
  CheckKeyValueHeaderParam &
  RequestParameters;

export interface GetSnapshotsHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface GetSnapshotsSelectQueryParam {
  /** Value of the parameter */
  value: SnapshotFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `status` with explode set to false and style set to form. */
export interface GetSnapshotsStatusQueryParam {
  /** Value of the parameter */
  value: SnapshotStatus[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetSnapshotsQueryParamProperties {
  /** A filter for the name of the returned snapshots. */
  name?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: SnapshotFields[] | GetSnapshotsSelectQueryParam;
  /** Used to filter returned snapshots by their status property. */
  status?: SnapshotStatus[] | GetSnapshotsStatusQueryParam;
}

export interface GetSnapshotsQueryParam {
  queryParameters?: GetSnapshotsQueryParamProperties;
}

export interface GetSnapshotsHeaderParam {
  headers?: RawHttpHeadersInput & GetSnapshotsHeaders;
}

export type GetSnapshotsParameters = GetSnapshotsQueryParam &
  GetSnapshotsHeaderParam &
  RequestParameters;

export interface CheckSnapshotsHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface CheckSnapshotsQueryParamProperties {
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
}

export interface CheckSnapshotsQueryParam {
  queryParameters?: CheckSnapshotsQueryParamProperties;
}

export interface CheckSnapshotsHeaderParam {
  headers?: RawHttpHeadersInput & CheckSnapshotsHeaders;
}

export type CheckSnapshotsParameters = CheckSnapshotsQueryParam &
  CheckSnapshotsHeaderParam &
  RequestParameters;

export interface GetSnapshotHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface GetSnapshotSelectQueryParam {
  /** Value of the parameter */
  value: SnapshotFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetSnapshotQueryParamProperties {
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: SnapshotFields[] | GetSnapshotSelectQueryParam;
}

export interface GetSnapshotQueryParam {
  queryParameters?: GetSnapshotQueryParamProperties;
}

export interface GetSnapshotHeaderParam {
  headers?: RawHttpHeadersInput & GetSnapshotHeaders;
}

export type GetSnapshotParameters = GetSnapshotQueryParam &
  GetSnapshotHeaderParam &
  RequestParameters;

export interface GetOperationDetailsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetOperationDetailsQueryParamProperties {
  /** Snapshot identifier for the long running operation. */
  snapshot: string;
}

export interface GetOperationDetailsQueryParam {
  queryParameters: GetOperationDetailsQueryParamProperties;
}

export interface GetOperationDetailsHeaderParam {
  headers?: RawHttpHeadersInput & GetOperationDetailsHeaders;
}

export type GetOperationDetailsParameters = GetOperationDetailsQueryParam &
  GetOperationDetailsHeaderParam &
  RequestParameters;

export interface CreateSnapshotHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
}

export interface CreateSnapshotBodyParam {
  /** The key-value snapshot to create. */
  body: Snapshot;
}

export interface CreateSnapshotHeaderParam {
  headers?: RawHttpHeadersInput & CreateSnapshotHeaders;
}

export interface CreateSnapshotMediaTypesParam {
  /** Content-Type header */
  contentType:
    | "application/vnd.microsoft.appconfig.snapshot+json"
    | "application/json";
}

export type CreateSnapshotParameters = CreateSnapshotHeaderParam &
  CreateSnapshotMediaTypesParam &
  CreateSnapshotBodyParam &
  RequestParameters;

export interface UpdateSnapshotHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The parameters used to update the snapshot. */
export type SnapshotUpdateParametersResourceMergeAndPatch =
  Partial<SnapshotUpdateParameters>;

export interface UpdateSnapshotBodyParam {
  /** The parameters used to update the snapshot. */
  body: SnapshotUpdateParametersResourceMergeAndPatch;
}

export interface UpdateSnapshotHeaderParam {
  headers?: RawHttpHeadersInput & UpdateSnapshotHeaders;
}

export interface UpdateSnapshotMediaTypesParam {
  /** Content-Type header */
  contentType: "application/merge-patch+json" | "application/json";
}

export type UpdateSnapshotParameters = UpdateSnapshotHeaderParam &
  UpdateSnapshotMediaTypesParam &
  UpdateSnapshotBodyParam &
  RequestParameters;

export interface CheckSnapshotHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface CheckSnapshotHeaderParam {
  headers?: RawHttpHeadersInput & CheckSnapshotHeaders;
}

export type CheckSnapshotParameters = CheckSnapshotHeaderParam &
  RequestParameters;

export interface GetLabelsHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface GetLabelsSelectQueryParam {
  /** Value of the parameter */
  value: LabelFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetLabelsQueryParamProperties {
  /** A filter for the name of the returned labels. */
  name?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: LabelFields[] | GetLabelsSelectQueryParam;
}

export interface GetLabelsQueryParam {
  queryParameters?: GetLabelsQueryParamProperties;
}

export interface GetLabelsHeaderParam {
  headers?: RawHttpHeadersInput & GetLabelsHeaders;
}

export type GetLabelsParameters = GetLabelsQueryParam &
  GetLabelsHeaderParam &
  RequestParameters;

export interface CheckLabelsHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface CheckLabelsSelectQueryParam {
  /** Value of the parameter */
  value: LabelFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface CheckLabelsQueryParamProperties {
  /** A filter for the name of the returned labels. */
  name?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: LabelFields[] | CheckLabelsSelectQueryParam;
}

export interface CheckLabelsQueryParam {
  queryParameters?: CheckLabelsQueryParamProperties;
}

export interface CheckLabelsHeaderParam {
  headers?: RawHttpHeadersInput & CheckLabelsHeaders;
}

export type CheckLabelsParameters = CheckLabelsQueryParam &
  CheckLabelsHeaderParam &
  RequestParameters;

export interface PutLockHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface PutLockQueryParamProperties {
  /** The label, if any, of the key-value to lock. */
  label?: string;
}

export interface PutLockQueryParam {
  queryParameters?: PutLockQueryParamProperties;
}

export interface PutLockHeaderParam {
  headers?: RawHttpHeadersInput & PutLockHeaders;
}

export type PutLockParameters = PutLockQueryParam &
  PutLockHeaderParam &
  RequestParameters;

export interface DeleteLockHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  "If-Match"?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  "If-None-Match"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeleteLockQueryParamProperties {
  /** The label, if any, of the key-value to unlock. */
  label?: string;
}

export interface DeleteLockQueryParam {
  queryParameters?: DeleteLockQueryParamProperties;
}

export interface DeleteLockHeaderParam {
  headers?: RawHttpHeadersInput & DeleteLockHeaders;
}

export type DeleteLockParameters = DeleteLockQueryParam &
  DeleteLockHeaderParam &
  RequestParameters;

export interface GetRevisionsHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface GetRevisionsSelectQueryParam {
  /** Value of the parameter */
  value: KeyValueFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `tags` with explode set to true and style set to form. */
export interface GetRevisionsTagsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface GetRevisionsQueryParamProperties {
  /**
   * A filter used to match keys. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  key?: string;
  /**
   * A filter used to match labels. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  label?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: KeyValueFields[] | GetRevisionsSelectQueryParam;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  tags?: GetRevisionsTagsQueryParam;
}

export interface GetRevisionsQueryParam {
  queryParameters?: GetRevisionsQueryParamProperties;
}

export interface GetRevisionsHeaderParam {
  headers?: RawHttpHeadersInput & GetRevisionsHeaders;
}

export type GetRevisionsParameters = GetRevisionsQueryParam &
  GetRevisionsHeaderParam &
  RequestParameters;

export interface CheckRevisionsHeaders {
  /** Used to guarantee real-time consistency between requests. */
  "Sync-Token"?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  "Accept-Datetime"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** This is the wrapper object for the parameter `$Select` with explode set to false and style set to form. */
export interface CheckRevisionsSelectQueryParam {
  /** Value of the parameter */
  value: KeyValueFields[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `tags` with explode set to true and style set to form. */
export interface CheckRevisionsTagsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface CheckRevisionsQueryParamProperties {
  /**
   * A filter used to match keys. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  key?: string;
  /**
   * A filter used to match labels. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  label?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  After?: string;
  /** Used to select what fields are present in the returned resource(s). */
  $Select?: KeyValueFields[] | CheckRevisionsSelectQueryParam;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  tags?: CheckRevisionsTagsQueryParam;
}

export interface CheckRevisionsQueryParam {
  queryParameters?: CheckRevisionsQueryParamProperties;
}

export interface CheckRevisionsHeaderParam {
  headers?: RawHttpHeadersInput & CheckRevisionsHeaders;
}

export type CheckRevisionsParameters = CheckRevisionsQueryParam &
  CheckRevisionsHeaderParam &
  RequestParameters;
