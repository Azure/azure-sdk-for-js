// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDiagnostics } from "../../CosmosDiagnostics";
import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request/ResourceResponse";
import { Resource } from "../../client/Resource";
import { ClientEncryptionKeyDefinition } from "./ClientEncryptionKeyDefinition";
import { ClientEncryptionKeyProperties } from "./ClientEncryptionKeyProperties";

/** Response object for ClientEncryptionKey operations */
export class ClientEncryptionKeyResponse extends ResourceResponse<
  ClientEncryptionKeyDefinition & Resource
> {
  constructor(
    resource: ClientEncryptionKeyDefinition & Resource,
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
