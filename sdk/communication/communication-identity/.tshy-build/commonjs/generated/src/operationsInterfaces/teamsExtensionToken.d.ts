import { TeamsExtensionTokenExchangeOptionalParams, TeamsExtensionTokenExchangeResponse } from "../models/index.js";
/** Interface representing a TeamsExtensionToken. */
export interface TeamsExtensionToken {
    /**
     * Exchanges a Teams Phone token for an ACS user access token.
     * @param body Request payload for the token exchange.
     * @param options The options parameters.
     */
    exchange(body: Record<string, unknown>, options?: TeamsExtensionTokenExchangeOptionalParams): Promise<TeamsExtensionTokenExchangeResponse>;
}
//# sourceMappingURL=teamsExtensionToken.d.ts.map