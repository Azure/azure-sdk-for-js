import type { AccessToken } from "@azure/core-auth";
import type { TokenCredential } from "./communicationTokenCredential.js";
/**
 * StaticTokenCredential
 */
export declare class StaticTokenCredential implements TokenCredential {
    private readonly token;
    constructor(token: AccessToken);
    getToken(): Promise<AccessToken>;
    dispose(): void;
}
//# sourceMappingURL=staticTokenCredential.d.ts.map