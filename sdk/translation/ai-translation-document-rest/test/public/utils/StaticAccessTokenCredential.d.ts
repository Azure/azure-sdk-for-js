import { TokenCredential, AccessToken } from "@azure/core-auth";
export declare class StaticAccessTokenCredential implements TokenCredential {
    private accessToken;
    constructor(accessToken: string);
    getToken(): Promise<AccessToken>;
}
//# sourceMappingURL=StaticAccessTokenCredential.d.ts.map