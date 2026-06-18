// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkContext, AppLinkClientOptionalParams, createAppLink } from "./api/index.js";
import {
  AppLinkMembersOperations,
  _getAppLinkMembersOperations,
} from "./classic/appLinkMembers/index.js";
import { AppLinksOperations, _getAppLinksOperations } from "./classic/appLinks/index.js";
import {
  AvailableVersionsOperations,
  _getAvailableVersionsOperations,
} from "./classic/availableVersions/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  UpgradeHistoriesOperations,
  _getUpgradeHistoriesOperations,
} from "./classic/upgradeHistories/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AppLinkClientOptionalParams } from "./api/appLinkContext.js";

export class AppLinkClient {
  private _client: AppLinkContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AppLinkClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAppLink(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.availableVersions = _getAvailableVersionsOperations(this._client);
    this.upgradeHistories = _getUpgradeHistoriesOperations(this._client);
    this.appLinkMembers = _getAppLinkMembersOperations(this._client);
    this.appLinks = _getAppLinksOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for availableVersions */
  public readonly availableVersions: AvailableVersionsOperations;
  /** The operation groups for upgradeHistories */
  public readonly upgradeHistories: UpgradeHistoriesOperations;
  /** The operation groups for appLinkMembers */
  public readonly appLinkMembers: AppLinkMembersOperations;
  /** The operation groups for appLinks */
  public readonly appLinks: AppLinksOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
