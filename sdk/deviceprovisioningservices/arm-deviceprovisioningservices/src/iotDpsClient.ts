// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotDpsContext, IotDpsClientOptionalParams } from "./api/index.js";
import { createIotDps } from "./api/index.js";
import type { DpsCertificateOperations } from "./classic/dpsCertificate/index.js";
import { _getDpsCertificateOperations } from "./classic/dpsCertificate/index.js";
import type { IotDpsResourceOperations } from "./classic/iotDpsResource/index.js";
import { _getIotDpsResourceOperations } from "./classic/iotDpsResource/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { IotDpsClientOptionalParams } from "./api/iotDpsContext.js";

export class IotDpsClient {
  private _client: IotDpsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: IotDpsClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: IotDpsClientOptionalParams,
  );
  /** API for using the Azure IoT Hub Device Provisioning Service features. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | IotDpsClientOptionalParams,
    options?: IotDpsClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createIotDps(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.iotDpsResource = _getIotDpsResourceOperations(this._client);
    this.dpsCertificate = _getDpsCertificateOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for iotDpsResource */
  public readonly iotDpsResource: IotDpsResourceOperations;
  /** The operation groups for dpsCertificate */
  public readonly dpsCertificate: DpsCertificateOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
