import { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import { CosmosHeaders } from "../../queryExecutionContext/index.js";
import { ResourceResponse } from "../../request/ResourceResponse.js";
import { Resource } from "../../client/Resource.js";
import { ClientEncryptionKeyProperties } from "./ClientEncryptionKeyProperties.js";
/** Response object for ClientEncryptionKey operations */
export declare class ClientEncryptionKeyResponse extends ResourceResponse<Resource> {
    constructor(resource: Resource, headers: CosmosHeaders, statusCode: number, clientEncryptionKeyProperties: ClientEncryptionKeyProperties, diagnostics: CosmosDiagnostics);
    /** Properties of the client encryption key */
    readonly clientEncryptionKeyProperties: ClientEncryptionKeyProperties;
}
//# sourceMappingURL=ClientEncryptionKeyResponse.d.ts.map