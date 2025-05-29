// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ResourceResponse } from "../../request/ResourceResponse.js";
/** Response object for ClientEncryptionKey operations */
export class ClientEncryptionKeyResponse extends ResourceResponse {
    constructor(resource, headers, statusCode, clientEncryptionKeyProperties, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.clientEncryptionKeyProperties = clientEncryptionKeyProperties;
    }
}
//# sourceMappingURL=ClientEncryptionKeyResponse.js.map