// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MicrosoftSerialConsoleContext,
  MicrosoftSerialConsoleClientOptionalParams,
  createMicrosoftSerialConsole,
} from "./api/index.js";
import {
  enableConsole,
  disableConsole,
  listOperations,
  getConsoleStatus,
} from "./api/operations.js";
import {
  EnableConsoleOptionalParams,
  DisableConsoleOptionalParams,
  ListOperationsOptionalParams,
  GetConsoleStatusOptionalParams,
} from "./api/options.js";
import { SerialPortsOperations, _getSerialPortsOperations } from "./classic/serialPorts/index.js";
import {
  SerialConsoleStatus,
  SerialConsoleOperations,
  DisableSerialConsoleResult,
  EnableSerialConsoleResult,
} from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { MicrosoftSerialConsoleClientOptionalParams } from "./api/microsoftSerialConsoleContext.js";

export class MicrosoftSerialConsoleClient {
  private _client: MicrosoftSerialConsoleContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: MicrosoftSerialConsoleClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: MicrosoftSerialConsoleClientOptionalParams,
  );
  /** The Azure Serial Console allows you to access the serial console of a Virtual Machine or VM scale set instance */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | MicrosoftSerialConsoleClientOptionalParams,
    options?: MicrosoftSerialConsoleClientOptionalParams,
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
    this._client = createMicrosoftSerialConsole(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.serialPorts = _getSerialPortsOperations(this._client);
  }

  /** Enables the Serial Console service for all VMs and VM scale sets in the provided subscription */
  enableConsole(
    defaultParam: string,
    options: EnableConsoleOptionalParams = { requestOptions: {} },
  ): Promise<EnableSerialConsoleResult> {
    return enableConsole(this._client, defaultParam, options);
  }

  /** Disables the Serial Console service for all VMs and VM scale sets in the provided subscription */
  disableConsole(
    defaultParam: string,
    options: DisableConsoleOptionalParams = { requestOptions: {} },
  ): Promise<DisableSerialConsoleResult> {
    return disableConsole(this._client, defaultParam, options);
  }

  /** Gets a list of Serial Console API operations. */
  listOperations(
    options: ListOperationsOptionalParams = { requestOptions: {} },
  ): Promise<SerialConsoleOperations> {
    return listOperations(this._client, options);
  }

  /** Gets whether or not Serial Console is disabled for a given subscription */
  getConsoleStatus(
    defaultParam: string,
    options: GetConsoleStatusOptionalParams = { requestOptions: {} },
  ): Promise<SerialConsoleStatus> {
    return getConsoleStatus(this._client, defaultParam, options);
  }

  /** The operation groups for serialPorts */
  public readonly serialPorts: SerialPortsOperations;
}
