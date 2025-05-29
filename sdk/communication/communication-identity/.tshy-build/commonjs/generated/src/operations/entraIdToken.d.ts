import { EntraIdToken } from "../operationsInterfaces/index.js";
import { IdentityRestClient } from "../identityRestClient.js";
import { EntraIdTokenExchangeOptionalParams, EntraIdTokenExchangeResponse } from "../models/index.js";
/** Class containing EntraIdToken operations. */
export declare class EntraIdTokenImpl implements EntraIdToken {
    private readonly client;
    /**
     * Initialize a new instance of the class EntraIdToken class.
     * @param client Reference to the service client
     */
    constructor(client: IdentityRestClient);
    /**
     * Exchanges an Entra ID token for an ACS user access token.
     * @param body Request payload for the token exchange.
     * @param options The options parameters.
     */
    exchange(body: Record<string, unknown>, options?: EntraIdTokenExchangeOptionalParams): Promise<EntraIdTokenExchangeResponse>;
}
//# sourceMappingURL=entraIdToken.d.ts.map