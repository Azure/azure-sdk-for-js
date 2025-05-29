import type { TokenCredential } from "@azure/identity";
export declare class EntraIdAccessToken {
    token?: string;
    private _expiryTimestamp?;
    private _credential?;
    constructor(credential?: TokenCredential);
    fetchEntraIdAccessToken: () => Promise<void>;
    doesEntraIdAccessTokenNeedRotation(): boolean;
    private setEntraIdAccessTokenFromEnvironment;
}
export declare function createEntraIdAccessToken(credential?: TokenCredential): EntraIdAccessToken;
//# sourceMappingURL=entraIdAccessToken.d.ts.map