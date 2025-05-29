import { EntraIdTokenExchangeOptionalParams, EntraIdTokenExchangeResponse } from "../models/index.js";
/** Interface representing a EntraIdToken. */
export interface EntraIdToken {
    /**
     * Exchanges an Entra ID token for an ACS user access token.
     * @param body Request payload for the token exchange.
     * @param options The options parameters.
     */
    exchange(body: Record<string, unknown>, options?: EntraIdTokenExchangeOptionalParams): Promise<EntraIdTokenExchangeResponse>;
}
//# sourceMappingURL=entraIdToken.d.ts.map