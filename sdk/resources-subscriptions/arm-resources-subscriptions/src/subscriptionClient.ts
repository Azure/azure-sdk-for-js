// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SubscriptionContext,
  SubscriptionClientOptionalParams,
  createSubscription,
} from "./api/index.js";
import { checkResourceName } from "./api/operations.js";
import { CheckResourceNameOptionalParams } from "./api/options.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  SubscriptionsOperations,
  _getSubscriptionsOperations,
} from "./classic/subscriptions/index.js";
import { TenantsOperations, _getTenantsOperations } from "./classic/tenants/index.js";
import { CheckResourceNameResult } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { SubscriptionClientOptionalParams } from "./api/subscriptionContext.js";

export class SubscriptionClient {
  private _client: SubscriptionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options: SubscriptionClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSubscription(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.tenants = _getTenantsOperations(this._client);
    this.subscriptions = _getSubscriptionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** A resource name is valid if it is not a reserved word, does not contains a reserved word and does not start with a reserved word */
  checkResourceName(
    options: CheckResourceNameOptionalParams = { requestOptions: {} },
  ): Promise<CheckResourceNameResult> {
    return checkResourceName(this._client, options);
  }

  /** The operation groups for tenants */
  public readonly tenants: TenantsOperations;
  /** The operation groups for subscriptions */
  public readonly subscriptions: SubscriptionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
