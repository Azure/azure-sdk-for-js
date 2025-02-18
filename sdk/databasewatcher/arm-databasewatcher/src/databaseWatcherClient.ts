// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  _getSharedPrivateLinkResourcesOperations,
  SharedPrivateLinkResourcesOperations,
} from "./classic/sharedPrivateLinkResources/index.js";
import { _getTargetsOperations, TargetsOperations } from "./classic/targets/index.js";
import {
  _getHealthValidationsOperations,
  HealthValidationsOperations,
} from "./classic/healthValidations/index.js";
import {
  _getAlertRuleResourcesOperations,
  AlertRuleResourcesOperations,
} from "./classic/alertRuleResources/index.js";
import { _getWatchersOperations, WatchersOperations } from "./classic/watchers/index.js";
import { _getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import {
  createDatabaseWatcher,
  DatabaseWatcherContext,
  DatabaseWatcherClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { DatabaseWatcherClientOptionalParams } from "./api/databaseWatcherContext.js";

export class DatabaseWatcherClient {
  private _client: DatabaseWatcherContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DatabaseWatcherClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDatabaseWatcher(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.sharedPrivateLinkResources = _getSharedPrivateLinkResourcesOperations(this._client);
    this.targets = _getTargetsOperations(this._client);
    this.healthValidations = _getHealthValidationsOperations(this._client);
    this.alertRuleResources = _getAlertRuleResourcesOperations(this._client);
    this.watchers = _getWatchersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for sharedPrivateLinkResources */
  public readonly sharedPrivateLinkResources: SharedPrivateLinkResourcesOperations;
  /** The operation groups for targets */
  public readonly targets: TargetsOperations;
  /** The operation groups for healthValidations */
  public readonly healthValidations: HealthValidationsOperations;
  /** The operation groups for alertRuleResources */
  public readonly alertRuleResources: AlertRuleResourcesOperations;
  /** The operation groups for watchers */
  public readonly watchers: WatchersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
