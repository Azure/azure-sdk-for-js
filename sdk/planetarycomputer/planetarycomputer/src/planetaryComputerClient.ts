// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createPlanetaryComputer,
  PlanetaryComputerContext,
  PlanetaryComputerClientOptionalParams,
} from "./api/index.js";
import {
  IngestionManagementOperations,
  _getIngestionManagementOperations,
} from "./classic/ingestionManagement/index.js";
import {
  SharedAccessSignatureOperations,
  _getSharedAccessSignatureOperations,
} from "./classic/sharedAccessSignature/index.js";
import { StacOperations, _getStacOperations } from "./classic/stac/index.js";
import { TilerOperations, _getTilerOperations } from "./classic/tiler/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { PlanetaryComputerClientOptionalParams } from "./api/planetaryComputerContext.js";

export class PlanetaryComputerClient {
  private _client: PlanetaryComputerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: PlanetaryComputerClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPlanetaryComputer(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.sharedAccessSignature = _getSharedAccessSignatureOperations(
      this._client,
    );
    this.tiler = _getTilerOperations(this._client);
    this.stac = _getStacOperations(this._client);
    this.ingestionManagement = _getIngestionManagementOperations(this._client);
  }

  /** The operation groups for sharedAccessSignature */
  public readonly sharedAccessSignature: SharedAccessSignatureOperations;
  /** The operation groups for tiler */
  public readonly tiler: TilerOperations;
  /** The operation groups for stac */
  public readonly stac: StacOperations;
  /** The operation groups for ingestionManagement */
  public readonly ingestionManagement: IngestionManagementOperations;
}
