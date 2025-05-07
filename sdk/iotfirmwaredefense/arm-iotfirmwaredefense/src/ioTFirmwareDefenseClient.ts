// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createIoTFirmwareDefense,
  IoTFirmwareDefenseContext,
  IoTFirmwareDefenseClientOptionalParams,
} from "./api/index.js";
import {
  UsageMetricsOperations,
  _getUsageMetricsOperations,
} from "./classic/usageMetrics/index.js";
import { SummariesOperations, _getSummariesOperations } from "./classic/summaries/index.js";
import {
  SbomComponentsOperations,
  _getSbomComponentsOperations,
} from "./classic/sbomComponents/index.js";
import {
  PasswordHashesOperations,
  _getPasswordHashesOperations,
} from "./classic/passwordHashes/index.js";
import { CvesOperations, _getCvesOperations } from "./classic/cves/index.js";
import { CryptoKeysOperations, _getCryptoKeysOperations } from "./classic/cryptoKeys/index.js";
import {
  CryptoCertificatesOperations,
  _getCryptoCertificatesOperations,
} from "./classic/cryptoCertificates/index.js";
import {
  BinaryHardeningOperations,
  _getBinaryHardeningOperations,
} from "./classic/binaryHardening/index.js";
import { WorkspacesOperations, _getWorkspacesOperations } from "./classic/workspaces/index.js";
import { FirmwaresOperations, _getFirmwaresOperations } from "./classic/firmwares/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { IoTFirmwareDefenseClientOptionalParams } from "./api/ioTFirmwareDefenseContext.js";

export class IoTFirmwareDefenseClient {
  private _client: IoTFirmwareDefenseContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Firmware & IoT Security REST API */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: IoTFirmwareDefenseClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createIoTFirmwareDefense(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.usageMetrics = _getUsageMetricsOperations(this._client);
    this.summaries = _getSummariesOperations(this._client);
    this.sbomComponents = _getSbomComponentsOperations(this._client);
    this.passwordHashes = _getPasswordHashesOperations(this._client);
    this.cves = _getCvesOperations(this._client);
    this.cryptoKeys = _getCryptoKeysOperations(this._client);
    this.cryptoCertificates = _getCryptoCertificatesOperations(this._client);
    this.binaryHardening = _getBinaryHardeningOperations(this._client);
    this.workspaces = _getWorkspacesOperations(this._client);
    this.firmwares = _getFirmwaresOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for usageMetrics */
  public readonly usageMetrics: UsageMetricsOperations;
  /** The operation groups for summaries */
  public readonly summaries: SummariesOperations;
  /** The operation groups for sbomComponents */
  public readonly sbomComponents: SbomComponentsOperations;
  /** The operation groups for passwordHashes */
  public readonly passwordHashes: PasswordHashesOperations;
  /** The operation groups for cves */
  public readonly cves: CvesOperations;
  /** The operation groups for cryptoKeys */
  public readonly cryptoKeys: CryptoKeysOperations;
  /** The operation groups for cryptoCertificates */
  public readonly cryptoCertificates: CryptoCertificatesOperations;
  /** The operation groups for binaryHardening */
  public readonly binaryHardening: BinaryHardeningOperations;
  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for firmwares */
  public readonly firmwares: FirmwaresOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
