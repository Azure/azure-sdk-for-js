import { AccessToken } from "@azure/core-auth";

interface ExchangeTokenResponse {
    token: {
        token: string;
        expiresOn: string;
    }
}

export const exchangeEntraToken = async (resourceEndpoint: string, entraToken: string): Promise<AccessToken> => {
    // todo, try using core-rest pipeline instead with proper retry policy etc
    // todo should we allow resourceEndpoint to include the leading forward slash?
    const url = `${resourceEndpoint}/access/entra:exchangeToken`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Authorization": `Bearer ${entraToken}` }
   });
   if (!response.ok) {
       throw new Error(`Failed to exchange entra token. Status: ${response.status}, Body: ${await response.text()}`);
   }
   const json = await response.json() as ExchangeTokenResponse;
   return {
         token: json.token.token,
         expiresOnTimestamp: Date.parse(json.token.expiresOn)
   };
};