// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import { getTerraformOperations, TerraformOperations } from "./classic/terraform/index.js";
import {
  createAzureTerraform,
  AzureTerraformContext,
  AzureTerraformClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { AzureTerraformClientOptionalParams } from "./api/azureTerraformContext.js";

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
    this._client = createAzureTerraform(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.terraform = getTerraformOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for Terraform */
  public readonly terraform: TerraformOperations;
}
