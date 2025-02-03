// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import { getAccountsOperations, AccountsOperations } from "./classic/accounts/index.js";
import { getQuotasOperations, QuotasOperations } from "./classic/quotas/index.js";
import {
  getAccountQuotasOperations,
  AccountQuotasOperations,
} from "./classic/accountQuotas/index.js";
import {
  createAzurePlaywrightService,
  AzurePlaywrightServiceContext,
  AzurePlaywrightServiceClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { AzurePlaywrightServiceClientOptionalParams } from "./api/azurePlaywrightServiceContext.js";

export class AzurePlaywrightServiceClient {
  private _client: AzurePlaywrightServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.AzurePlaywrightService Resource Provider Management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzurePlaywrightServiceClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzurePlaywrightService(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.accounts = getAccountsOperations(this._client, subscriptionId);
    this.quotas = getQuotasOperations(this._client, subscriptionId);
    this.accountQuotas = getAccountQuotasOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for Accounts */
  public readonly accounts: AccountsOperations;
  /** The operation groups for Quotas */
  public readonly quotas: QuotasOperations;
  /** The operation groups for AccountQuotas */
  public readonly accountQuotas: AccountQuotasOperations;
}
