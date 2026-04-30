// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/ResourceResponse.js";
import type { Resource } from "../../client/Resource.js";
import type { ClientEncryptionKeyProperties } from "./ClientEncryptionKeyProperties.js";

/** Response object for ClientEncryptionKey operations */
export class ClientEncryptionKeyResponse extends ResourceResponse<Resource> {
  constructor(
    resource: Resource,
    headers: CosmosHeaders,
    statusCode: number,
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
    diagnostics: CosmosDiagnostics,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.clientEncryptionKeyProperties = clientEncryptionKeyProperties;
  }
  /** Properties of the client encryption key */
  public readonly clientEncryptionKeyProperties: ClientEncryptionKeyProperties;
}
