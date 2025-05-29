import { TeamsExtensionToken } from "../operationsInterfaces/index.js";
import { IdentityRestClient } from "../identityRestClient.js";
import { TeamsExtensionTokenExchangeOptionalParams, TeamsExtensionTokenExchangeResponse } from "../models/index.js";
/** Class containing TeamsExtensionToken operations. */
export declare class TeamsExtensionTokenImpl implements TeamsExtensionToken {
    private readonly client;
    /**
     * Initialize a new instance of the class TeamsExtensionToken class.
     * @param client Reference to the service client
     */
    constructor(client: IdentityRestClient);
    /**
     * Exchanges a Teams Phone token for an ACS user access token.
     * @param body Request payload for the token exchange.
     * @param options The options parameters.
     */
    exchange(body: Record<string, unknown>, options?: TeamsExtensionTokenExchangeOptionalParams): Promise<TeamsExtensionTokenExchangeResponse>;
}
//# sourceMappingURL=teamsExtensionToken.d.ts.map