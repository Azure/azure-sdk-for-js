// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PowerBIDedicatedContext,
  PowerBIDedicatedOptionalParams,
  createPowerBIDedicated,
} from "./api/index.js";
import {
  AutoScaleVCoresOperations,
  _getAutoScaleVCoresOperations,
} from "./classic/autoScaleVCores/index.js";
import { CapacitiesOperations, _getCapacitiesOperations } from "./classic/capacities/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { PowerBIDedicatedOptionalParams } from "./api/powerBIDedicatedContext.js";

export class PowerBIDedicated {
  private _client: PowerBIDedicatedContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: PowerBIDedicatedOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: PowerBIDedicatedOptionalParams,
  );
  /** PowerBI Dedicated Web API provides a RESTful set of web services that enables users to create, retrieve, update, and delete Power BI dedicated capacities */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | PowerBIDedicatedOptionalParams,
    options?: PowerBIDedicatedOptionalParams,
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
    this._client = createPowerBIDedicated(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.autoScaleVCores = _getAutoScaleVCoresOperations(this._client);
    this.capacities = _getCapacitiesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for autoScaleVCores */
  public readonly autoScaleVCores: AutoScaleVCoresOperations;
  /** The operation groups for capacities */
  public readonly capacities: CapacitiesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
