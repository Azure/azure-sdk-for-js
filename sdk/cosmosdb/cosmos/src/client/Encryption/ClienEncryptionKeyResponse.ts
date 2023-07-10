// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosDiagnostics } from "../../CosmosDiagnostics";
import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request/ResourceResponse";
import { Resource } from "../Resource";
import { ClientEncryptionKeyDefinition } from "./ClientEncryptionKeyDefinition";
import { ClientEncryptionKeyProperties } from "./ClientEncryptionKeyProperties";

/** Response object for Creating and wrapping Client Encryption Key operations */
export class ClientEncryptionKeyResponse extends ResourceResponse<ClientEncryptionKeyDefinition & Resource> {
  constructor(
    resource: ClientEncryptionKeyDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,    
    diagnostics: CosmosDiagnostics,
    key?: ClientEncryptionKeyProperties,
    //database: Database
    ) {
    super(resource, headers, statusCode, diagnostics, key);
    //this.database = database;
  }
  
  //public readonly database: Database;
}
