// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureAppConfigurationContext,
  AzureAppConfigurationClientOptionalParams,
  createAzureAppConfiguration,
} from "./api/index.js";
import {
  checkRevisions,
  getRevisions,
  deleteLock,
  putLock,
  checkLabels,
  getLabels,
  checkSnapshot,
  updateSnapshot,
  createSnapshot,
  getOperationDetails,
  getSnapshot,
  checkSnapshots,
  getSnapshots,
  checkKeyValue,
  deleteKeyValue,
  putKeyValue,
  getKeyValue,
  checkKeyValues,
  getKeyValues,
  checkKeys,
  getKeys,
} from "./api/operations.js";
import {
  CheckRevisionsOptionalParams,
  GetRevisionsOptionalParams,
  DeleteLockOptionalParams,
  PutLockOptionalParams,
  CheckLabelsOptionalParams,
  GetLabelsOptionalParams,
  CheckSnapshotOptionalParams,
  UpdateSnapshotOptionalParams,
  CreateSnapshotOptionalParams,
  GetOperationDetailsOptionalParams,
  GetSnapshotOptionalParams,
  CheckSnapshotsOptionalParams,
  GetSnapshotsOptionalParams,
  CheckKeyValueOptionalParams,
  DeleteKeyValueOptionalParams,
  PutKeyValueOptionalParams,
  GetKeyValueOptionalParams,
  CheckKeyValuesOptionalParams,
  GetKeyValuesOptionalParams,
  CheckKeysOptionalParams,
  GetKeysOptionalParams,
} from "./api/options.js";
import {
  Key,
  KeyValue,
  Snapshot,
  OperationDetails,
  SnapshotUpdateParameters,
  Label,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureAppConfigurationClientOptionalParams } from "./api/azureAppConfigurationContext.js";

export class AzureAppConfigurationClient {
  private _client: AzureAppConfigurationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure App Configuration REST API */
  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: AzureAppConfigurationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureAppConfiguration(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Requests the headers and status of the given resource. */
  checkRevisions(options: CheckRevisionsOptionalParams = { requestOptions: {} }): Promise<void> {
    return checkRevisions(this._client, options);
  }

  /** Gets a list of key-value revisions. */
  getRevisions(
    options: GetRevisionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<KeyValue> {
    return getRevisions(this._client, options);
  }

  /** Unlocks a key-value. */
  deleteLock(
    key: string,
    options: DeleteLockOptionalParams = { requestOptions: {} },
  ): Promise<KeyValue> {
    return deleteLock(this._client, key, options);
  }

  /** Locks a key-value. */
  putLock(key: string, options: PutLockOptionalParams = { requestOptions: {} }): Promise<KeyValue> {
    return putLock(this._client, key, options);
  }

  /** Requests the headers and status of the given resource. */
  checkLabels(options: CheckLabelsOptionalParams = { requestOptions: {} }): Promise<void> {
    return checkLabels(this._client, options);
  }

  /** Gets a list of labels. */
  getLabels(
    options: GetLabelsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Label> {
    return getLabels(this._client, options);
  }

  /** Requests the headers and status of the given resource. */
  checkSnapshot(
    name: string,
    options: CheckSnapshotOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return checkSnapshot(this._client, name, options);
  }

  /** Updates the state of a key-value snapshot. */
  updateSnapshot(
    contentType: "application/merge-patch+json" | "application/json",
    name: string,
    entity: SnapshotUpdateParameters,
    options: UpdateSnapshotOptionalParams = { requestOptions: {} },
  ): Promise<Snapshot> {
    return updateSnapshot(this._client, contentType, name, entity, options);
  }

  /** Creates a key-value snapshot. */
  createSnapshot(
    contentType: "application/vnd.microsoft.appconfig.snapshot+json" | "application/json",
    name: string,
    entity: Snapshot,
    options: CreateSnapshotOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<Snapshot>, Snapshot> {
    return createSnapshot(this._client, contentType, name, entity, options);
  }

  /** Gets the state of a long running operation. */
  getOperationDetails(
    snapshot: string,
    options: GetOperationDetailsOptionalParams = { requestOptions: {} },
  ): Promise<OperationDetails> {
    return getOperationDetails(this._client, snapshot, options);
  }

  /** Gets a single key-value snapshot. */
  getSnapshot(
    name: string,
    options: GetSnapshotOptionalParams = { requestOptions: {} },
  ): Promise<Snapshot> {
    return getSnapshot(this._client, name, options);
  }

  /** Requests the headers and status of the given resource. */
  checkSnapshots(options: CheckSnapshotsOptionalParams = { requestOptions: {} }): Promise<void> {
    return checkSnapshots(this._client, options);
  }

  /** Gets a list of key-value snapshots. */
  getSnapshots(
    options: GetSnapshotsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Snapshot> {
    return getSnapshots(this._client, options);
  }

  /** Requests the headers and status of the given resource. */
  checkKeyValue(
    key: string,
    options: CheckKeyValueOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return checkKeyValue(this._client, key, options);
  }

  /** Deletes a key-value. */
  deleteKeyValue(
    key: string,
    options: DeleteKeyValueOptionalParams = { requestOptions: {} },
  ): Promise<KeyValue> {
    return deleteKeyValue(this._client, key, options);
  }

  /** Creates a key-value. */
  putKeyValue(
    contentType:
      | "application/vnd.microsoft.appconfig.kv+json"
      | "application/vnd.microsoft.appconfig.kvset+json"
      | "application/json"
      | "text/json"
      | "application/*+json"
      | "application/json-patch+json",
    key: string,
    options: PutKeyValueOptionalParams = { requestOptions: {} },
  ): Promise<KeyValue> {
    return putKeyValue(this._client, contentType, key, options);
  }

  /** Gets a single key-value. */
  getKeyValue(
    key: string,
    options: GetKeyValueOptionalParams = { requestOptions: {} },
  ): Promise<KeyValue> {
    return getKeyValue(this._client, key, options);
  }

  /** Requests the headers and status of the given resource. */
  checkKeyValues(options: CheckKeyValuesOptionalParams = { requestOptions: {} }): Promise<void> {
    return checkKeyValues(this._client, options);
  }

  /** Gets a list of key-values. */
  getKeyValues(
    options: GetKeyValuesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<KeyValue> {
    return getKeyValues(this._client, options);
  }

  /** Requests the headers and status of the given resource. */
  checkKeys(options: CheckKeysOptionalParams = { requestOptions: {} }): Promise<void> {
    return checkKeys(this._client, options);
  }

  /** Gets a list of keys. */
  getKeys(
    options: GetKeysOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Key> {
    return getKeys(this._client, options);
  }
}
