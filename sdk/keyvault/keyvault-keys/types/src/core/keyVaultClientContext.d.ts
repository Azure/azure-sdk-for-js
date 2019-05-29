import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
export declare class KeyVaultClientContext extends msRestAzure.AzureServiceClient {
    credentials: msRest.ServiceClientCredentials;
    apiVersion?: string;
    /**
     * Initializes a new instance of the KeyVaultClient class.
     * @param credentials Credentials needed for the client to connect to Azure.
     * @param [options] The parameter options
     */
    constructor(credentials: msRest.ServiceClientCredentials, options?: msRestAzure.AzureServiceClientOptions);
}
//# sourceMappingURL=keyVaultClientContext.d.ts.map