// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createPlanetaryComputerPro,
  PlanetaryComputerProContext,
  PlanetaryComputerProClientOptionalParams,
} from "./api/index.js";
import { DataOperations, _getDataOperations } from "./classic/data/index.js";
import {
  IngestionOperations,
  _getIngestionOperations,
} from "./classic/ingestion/index.js";
import {
  SharedAccessSignatureOperations,
  _getSharedAccessSignatureOperations,
} from "./classic/sharedAccessSignature/index.js";
import { StacOperations, _getStacOperations } from "./classic/stac/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { PlanetaryComputerProClientOptionalParams } from "./api/planetaryComputerProContext.js";

export class PlanetaryComputerProClient {
  private _client: PlanetaryComputerProContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: PlanetaryComputerProClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPlanetaryComputerPro(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.sharedAccessSignature = _getSharedAccessSignatureOperations(
      this._client,
    );
    this.data = _getDataOperations(this._client);
    this.stac = _getStacOperations(this._client);
    this.ingestion = _getIngestionOperations(this._client);
  }

  /** The operation groups for sharedAccessSignature */
  public readonly sharedAccessSignature: SharedAccessSignatureOperations;
  /** The operation groups for data */
  public readonly data: DataOperations;
  /** The operation groups for stac */
  public readonly stac: StacOperations;
  /** The operation groups for ingestion */
  public readonly ingestion: IngestionOperations;
}
