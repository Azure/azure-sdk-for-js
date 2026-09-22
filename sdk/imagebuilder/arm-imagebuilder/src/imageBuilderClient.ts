// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ImageBuilderContext,
  ImageBuilderClientOptionalParams,
  createImageBuilder,
} from "./api/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TriggersOperations, _getTriggersOperations } from "./classic/triggers/index.js";
import {
  VirtualMachineImageTemplatesOperations,
  _getVirtualMachineImageTemplatesOperations,
} from "./classic/virtualMachineImageTemplates/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ImageBuilderClientOptionalParams } from "./api/imageBuilderContext.js";

export class ImageBuilderClient {
  private _client: ImageBuilderContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ImageBuilderClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ImageBuilderClientOptionalParams,
  );
  /** Virtual Machine Image Template */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ImageBuilderClientOptionalParams,
    options?: ImageBuilderClientOptionalParams,
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
    this._client = createImageBuilder(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.virtualMachineImageTemplates = _getVirtualMachineImageTemplatesOperations(this._client);
    this.triggers = _getTriggersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for virtualMachineImageTemplates */
  public readonly virtualMachineImageTemplates: VirtualMachineImageTemplatesOperations;
  /** The operation groups for triggers */
  public readonly triggers: TriggersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
