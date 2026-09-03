// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SubscriptionContext,
  SubscriptionClientOptionalParams,
  createSubscription,
} from "./api/index.js";
import { AliasOperations, _getAliasOperations } from "./classic/alias/index.js";
import {
  BillingAccountOperations,
  _getBillingAccountOperations,
} from "./classic/billingAccount/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  SubscriptionOperations,
  _getSubscriptionOperations,
} from "./classic/subscription/index.js";
import {
  SubscriptionOperationOperations,
  _getSubscriptionOperationOperations,
} from "./classic/subscriptionOperation/index.js";
import {
  SubscriptionPolicyOperations,
  _getSubscriptionPolicyOperations,
} from "./classic/subscriptionPolicy/index.js";
import {
  SubscriptionsOperations,
  _getSubscriptionsOperations,
} from "./classic/subscriptions/index.js";
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
    this.subscriptionOperation = _getSubscriptionOperationOperations(this._client);
    this.subscription = _getSubscriptionOperations(this._client);
    this.billingAccount = _getBillingAccountOperations(this._client);
    this.subscriptionPolicy = _getSubscriptionPolicyOperations(this._client);
    this.alias = _getAliasOperations(this._client);
    this.subscriptions = _getSubscriptionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for subscriptionOperation */
  public readonly subscriptionOperation: SubscriptionOperationOperations;
  /** The operation groups for subscription */
  public readonly subscription: SubscriptionOperations;
  /** The operation groups for billingAccount */
  public readonly billingAccount: BillingAccountOperations;
  /** The operation groups for subscriptionPolicy */
  public readonly subscriptionPolicy: SubscriptionPolicyOperations;
  /** The operation groups for alias */
  public readonly alias: AliasOperations;
  /** The operation groups for subscriptions */
  public readonly subscriptions: SubscriptionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
