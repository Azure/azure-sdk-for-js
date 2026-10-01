// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConfidentialLedgerContext,
  ConfidentialLedgerClientOptionalParams,
  createConfidentialLedger,
} from "./api/index.js";
import { checkNameAvailability } from "./api/operations.js";
import { CheckNameAvailabilityOptionalParams } from "./api/options.js";
import { LedgerOperations, _getLedgerOperations } from "./classic/ledger/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { CheckNameAvailabilityRequest, CheckNameAvailabilityResponse } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ConfidentialLedgerClientOptionalParams } from "./api/confidentialLedgerContext.js";

export class ConfidentialLedgerClient {
  private _client: ConfidentialLedgerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ConfidentialLedgerClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ConfidentialLedgerClientOptionalParams,
  );
  /** Microsoft Azure Confidential Compute Ledger Managed CCF Control Plane REST API. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ConfidentialLedgerClientOptionalParams,
    options?: ConfidentialLedgerClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createConfidentialLedger(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.ledger = _getLedgerOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** To check whether a resource name is available. */
  checkNameAvailability(
    nameAvailabilityRequest: CheckNameAvailabilityRequest,
    options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<CheckNameAvailabilityResponse> {
    return checkNameAvailability(this._client, nameAvailabilityRequest, options);
  }

  /** The operation groups for ledger */
  public readonly ledger: LedgerOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
