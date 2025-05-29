// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getOperationsOperations } from "./classic/operations/index.js";
import { getCodeSigningAccountsOperations, } from "./classic/codeSigningAccounts/index.js";
import { getCertificateProfilesOperations, } from "./classic/certificateProfiles/index.js";
import { createCodeSigning, } from "./api/index.js";
export class CodeSigningClient {
    /** Code Signing resource provider api. */
    constructor(credential, subscriptionId, options = {}) {
        var _a;
        const prefixFromOptions = (_a = options === null || options === void 0 ? void 0 : options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix;
        const userAgentPrefix = prefixFromOptions
            ? `${prefixFromOptions} azsdk-js-client`
            : "azsdk-js-client";
        this._client = createCodeSigning(credential, Object.assign(Object.assign({}, options), { userAgentOptions: { userAgentPrefix } }));
        this.pipeline = this._client.pipeline;
        this.operations = getOperationsOperations(this._client);
        this.codeSigningAccounts = getCodeSigningAccountsOperations(this._client, subscriptionId);
        this.certificateProfiles = getCertificateProfilesOperations(this._client, subscriptionId);
    }
}
//# sourceMappingURL=codeSigningClient.js.map