// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeContext, EdgeClientOptionalParams } from "./api/index.js";
import { createEdge } from "./api/index.js";
import type { SitesOperations} from "./classic/sites/index.js";
import { _getSitesOperations } from "./classic/sites/index.js";
import type {
  SitesByServiceGroupOperations} from "./classic/sitesByServiceGroup/index.js";
import {
  _getSitesByServiceGroupOperations,
} from "./classic/sitesByServiceGroup/index.js";
import type {
  SitesBySubscriptionOperations} from "./classic/sitesBySubscription/index.js";
import {
  _getSitesBySubscriptionOperations,
} from "./classic/sitesBySubscription/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { EdgeClientOptionalParams } from "./api/edgeContext.js";

export class EdgeClient {
  private _client: EdgeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Edge Sites Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: EdgeClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createEdge(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.sitesByServiceGroup = _getSitesByServiceGroupOperations(this._client);
    this.sitesBySubscription = _getSitesBySubscriptionOperations(this._client);
    this.sites = _getSitesOperations(this._client);
  }

  /** The operation groups for sitesByServiceGroup */
  public readonly sitesByServiceGroup: SitesByServiceGroupOperations;
  /** The operation groups for sitesBySubscription */
  public readonly sitesBySubscription: SitesBySubscriptionOperations;
  /** The operation groups for sites */
  public readonly sites: SitesOperations;
}
