// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KeyValue,
  SnapshotStatus,
  KeyValueFields,
  SnapshotFields,
  LabelFields,
} from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CheckRevisionsOptionalParams extends OperationOptions {
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
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: KeyValueFields[];
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  tags?: string[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetRevisionsOptionalParams extends OperationOptions {
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
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: KeyValueFields[];
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/restapirevisions
   */
  tags?: string[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeleteLockOptionalParams extends OperationOptions {
  /** The label, if any, of the key-value to unlock. */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface PutLockOptionalParams extends OperationOptions {
  /** The label, if any, of the key-value to lock. */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CheckLabelsOptionalParams extends OperationOptions {
  /** A filter for the name of the returned labels. */
  name?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: LabelFields[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetLabelsOptionalParams extends OperationOptions {
  /** A filter for the name of the returned labels. */
  name?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: LabelFields[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CheckSnapshotOptionalParams extends OperationOptions {
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface UpdateSnapshotOptionalParams extends OperationOptions {
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateSnapshotOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
}

/** Optional parameters. */
export interface GetOperationDetailsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetSnapshotOptionalParams extends OperationOptions {
  /** Used to select what fields are present in the returned resource(s). */
  select?: SnapshotFields[];
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CheckSnapshotsOptionalParams extends OperationOptions {
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetSnapshotsOptionalParams extends OperationOptions {
  /** A filter for the name of the returned snapshots. */
  name?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: SnapshotFields[];
  /** Used to filter returned snapshots by their status property. */
  status?: SnapshotStatus[];
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
}

/** Optional parameters. */
export interface CheckKeyValueOptionalParams extends OperationOptions {
  /** The label of the key-value to retrieve. */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: KeyValueFields[];
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: string[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeleteKeyValueOptionalParams extends OperationOptions {
  /** The label of the key-value to delete. */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface PutKeyValueOptionalParams extends OperationOptions {
  /** The label of the key-value to create. */
  label?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** The key-value to create. */
  entity?: KeyValue;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetKeyValueOptionalParams extends OperationOptions {
  /** The label of the key-value to retrieve. */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: KeyValueFields[];
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: string[];
}

/** Optional parameters. */
export interface CheckKeyValuesOptionalParams extends OperationOptions {
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
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: KeyValueFields[];
  /**
   * A filter used get key-values for a snapshot. The value should be the name of
   * the snapshot. Not valid when used with 'key' and 'label' filters.
   */
  snapshot?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: string[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetKeyValuesOptionalParams extends OperationOptions {
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
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: KeyValueFields[];
  /**
   * A filter used get key-values for a snapshot. The value should be the name of
   * the snapshot. Not valid when used with 'key' and 'label' filters.
   */
  snapshot?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag matches the
   * value provided.
   */
  ifMatch?: string;
  /**
   * Used to perform an operation only if the targeted resource's etag does not
   * match the value provided.
   */
  ifNoneMatch?: string;
  /**
   * A filter used to query by tags. Syntax reference:
   * https://aka.ms/azconfig/docs/keyvaluefiltering
   */
  tags?: string[];
}

/** Optional parameters. */
export interface CheckKeysOptionalParams extends OperationOptions {
  /** A filter for the name of the returned keys. */
  name?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetKeysOptionalParams extends OperationOptions {
  /** A filter for the name of the returned keys. */
  name?: string;
  /**
   * Instructs the server to return elements that appear after the element referred
   * to by the specified token.
   */
  after?: string;
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /**
   * Requests the server to respond with the state of the resource at the specified
   * time.
   */
  acceptDatetime?: string;
}
