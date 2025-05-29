import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import { OperationsOperations } from "./classic/operations/index.js";
import { CodeSigningAccountsOperations } from "./classic/codeSigningAccounts/index.js";
import { CertificateProfilesOperations } from "./classic/certificateProfiles/index.js";
import { CodeSigningClientOptionalParams } from "./api/index.js";
export { CodeSigningClientOptionalParams } from "./api/codeSigningContext.js";
export declare class CodeSigningClient {
    private _client;
    /** The pipeline used by this client to make requests */
    readonly pipeline: Pipeline;
    /** Code Signing resource provider api. */
    constructor(credential: TokenCredential, subscriptionId: string, options?: CodeSigningClientOptionalParams);
    /** The operation groups for Operations */
    readonly operations: OperationsOperations;
    /** The operation groups for CodeSigningAccounts */
    readonly codeSigningAccounts: CodeSigningAccountsOperations;
    /** The operation groups for CertificateProfiles */
    readonly certificateProfiles: CertificateProfilesOperations;
}
//# sourceMappingURL=codeSigningClient.d.ts.map