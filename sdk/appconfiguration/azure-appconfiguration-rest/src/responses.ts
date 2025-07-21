// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  KeyListResultOutput,
  ErrorModelOutput,
  KeyValueListResultOutput,
  KeyValueOutput,
  SnapshotListResultOutput,
  SnapshotOutput,
  OperationDetailsOutput,
  LabelListResultOutput,
} from "./outputModels.js";

export interface GetKeys200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.keyset+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface GetKeys200Response extends HttpResponse {
  status: "200";
  body: KeyListResultOutput;
  headers: RawHttpHeaders & GetKeys200Headers;
}

export interface GetKeysDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface CheckKeys200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
}

/** The request has succeeded. */
export interface CheckKeys200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & CheckKeys200Headers;
}

export interface CheckKeysDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface GetKeyValues200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.kvset+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface GetKeyValues200Response extends HttpResponse {
  status: "200";
  body: KeyValueListResultOutput;
  headers: RawHttpHeaders & GetKeyValues200Headers;
}

export interface GetKeyValuesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface CheckKeyValues200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
}

/** The request has succeeded. */
export interface CheckKeyValues200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & CheckKeyValues200Headers;
}

export interface CheckKeyValuesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface GetKeyValue200Headers {
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.kv+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface GetKeyValue200Response extends HttpResponse {
  status: "200";
  body: KeyValueOutput;
  headers: RawHttpHeaders & GetKeyValue200Headers;
}

export interface GetKeyValueDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface PutKeyValue200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.kv+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface PutKeyValue200Response extends HttpResponse {
  status: "200";
  body: KeyValueOutput;
  headers: RawHttpHeaders & PutKeyValue200Headers;
}

export interface PutKeyValueDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface DeleteKeyValue200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.kv+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface DeleteKeyValue200Response extends HttpResponse {
  status: "200";
  body: KeyValueOutput;
  headers: RawHttpHeaders & DeleteKeyValue200Headers;
}

export interface DeleteKeyValue204Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteKeyValue204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeleteKeyValue204Headers;
}

export interface DeleteKeyValueDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface CheckKeyValue200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
}

/** The request has succeeded. */
export interface CheckKeyValue200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & CheckKeyValue200Headers;
}

export interface CheckKeyValueDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface GetSnapshots200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.snapshotset+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface GetSnapshots200Response extends HttpResponse {
  status: "200";
  body: SnapshotListResultOutput;
  headers: RawHttpHeaders & GetSnapshots200Headers;
}

export interface GetSnapshotsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface CheckSnapshots200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
}

/** The request has succeeded. */
export interface CheckSnapshots200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & CheckSnapshots200Headers;
}

export interface CheckSnapshotsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface GetSnapshot200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Includes links to related resources. */
  link?: string;
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  "x-ms-request-id"?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.snapshot+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface GetSnapshot200Response extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
  headers: RawHttpHeaders & GetSnapshot200Headers;
}

export interface GetSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** The request has succeeded. */
export interface GetOperationDetails200Response extends HttpResponse {
  status: "200";
  body: OperationDetailsOutput;
}

export interface GetOperationDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface CreateSnapshot201Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Includes links to related resources. */
  link?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.snapshot+json"
    | "application/problem+json";
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateSnapshot201Response extends HttpResponse {
  status: "201";
  body: SnapshotOutput;
  headers: RawHttpHeaders & CreateSnapshot201Headers;
}

export interface CreateSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** The final response for long-running createSnapshot operation */
export interface CreateSnapshotLogicalResponse extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
}

export interface UpdateSnapshot200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Includes links to related resources. */
  link?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.snapshot+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface UpdateSnapshot200Response extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
  headers: RawHttpHeaders & UpdateSnapshot200Headers;
}

export interface UpdateSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface CheckSnapshot200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Includes links to related resources. */
  link?: string;
}

/** The request has succeeded. */
export interface CheckSnapshot200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & CheckSnapshot200Headers;
}

export interface CheckSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface GetLabels200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.labelset+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface GetLabels200Response extends HttpResponse {
  status: "200";
  body: LabelListResultOutput;
  headers: RawHttpHeaders & GetLabels200Headers;
}

export interface GetLabelsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface CheckLabels200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
}

/** The request has succeeded. */
export interface CheckLabels200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & CheckLabels200Headers;
}

export interface CheckLabelsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface PutLock200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.kv+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface PutLock200Response extends HttpResponse {
  status: "200";
  body: KeyValueOutput;
  headers: RawHttpHeaders & PutLock200Headers;
}

export interface PutLockDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface DeleteLock200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.kv+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface DeleteLock200Response extends HttpResponse {
  status: "200";
  body: KeyValueOutput;
  headers: RawHttpHeaders & DeleteLock200Headers;
}

export interface DeleteLockDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface GetRevisions200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
  /** Content-Type header */
  "content-type"?:
    | "application/vnd.microsoft.appconfig.kvset+json"
    | "application/problem+json";
}

/** The request has succeeded. */
export interface GetRevisions200Response extends HttpResponse {
  status: "200";
  body: KeyValueListResultOutput;
  headers: RawHttpHeaders & GetRevisions200Headers;
}

export interface GetRevisionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

export interface CheckRevisions200Headers {
  /** Used to guarantee real-time consistency between requests. */
  "sync-token"?: string;
  /** A value representing the current state of the resource. */
  etag?: string;
}

/** The request has succeeded. */
export interface CheckRevisions200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & CheckRevisions200Headers;
}

export interface CheckRevisionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}
