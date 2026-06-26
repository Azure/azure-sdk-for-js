// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureTerraformContext,
  AzureTerraformClientOptionalParams,
  createAzureTerraform,
} from "./api/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TerraformOperations, _getTerraformOperations } from "./classic/terraform/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureTerraformClientOptionalParams } from "./api/azureTerraformContext.js";

export class AzureTerraformClient {
  private _client: AzureTerraformContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Azure Terraform management API provides a RESTful set of web services that used to manage your Azure Terraform resources. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureTerraformClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureTerraform(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.terraform = _getTerraformOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for terraform */
  public readonly terraform: TerraformOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
