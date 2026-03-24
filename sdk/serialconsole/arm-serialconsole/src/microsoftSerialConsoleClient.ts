// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MicrosoftSerialConsoleContext,
  MicrosoftSerialConsoleClientOptionalParams,
} from "./api/index.js";
import { createMicrosoftSerialConsole } from "./api/index.js";
import { listOperations, getConsoleStatus } from "./api/operations.js";
import type {
  ListOperationsOptionalParams,
  GetConsoleStatusOptionalParams,
} from "./api/options.js";
import type { SerialConsoleOperationGroupOperations } from "./classic/serialConsoleOperationGroup/index.js";
import { _getSerialConsoleOperationGroupOperations } from "./classic/serialConsoleOperationGroup/index.js";
import type { SerialPortsOperations } from "./classic/serialPorts/index.js";
import { _getSerialPortsOperations } from "./classic/serialPorts/index.js";
import type { SerialConsoleStatus, SerialConsoleOperations } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
    this.serialConsoleOperationGroup = _getSerialConsoleOperationGroupOperations(this._client);
    this.serialPorts = _getSerialPortsOperations(this._client);
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

  /** The operation groups for serialConsoleOperationGroup */
  public readonly serialConsoleOperationGroup: SerialConsoleOperationGroupOperations;
  /** The operation groups for serialPorts */
  public readonly serialPorts: SerialPortsOperations;
}
