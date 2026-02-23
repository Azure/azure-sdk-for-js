// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthbotContext, HealthbotClientOptionalParams } from "./api/index.js";
import { createHealthbot } from "./api/index.js";
import type { BotsOperations } from "./classic/bots/index.js";
import { _getBotsOperations } from "./classic/bots/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { HealthbotClientOptionalParams } from "./api/healthbotContext.js";

export class HealthbotClient {
  private _client: HealthbotContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: HealthbotClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: HealthbotClientOptionalParams,
  );
  /** Azure Health Bot is a cloud platform that empowers developers in Healthcare organizations to build and deploy their compliant, AI-powered virtual health assistants and health bots, that help them improve processes and reduce costs. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | HealthbotClientOptionalParams,
    options?: HealthbotClientOptionalParams,
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
    this._client = createHealthbot(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.bots = _getBotsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for bots */
  public readonly bots: BotsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
