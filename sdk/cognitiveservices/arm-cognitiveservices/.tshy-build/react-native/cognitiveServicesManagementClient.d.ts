import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { Accounts, DeletedAccounts, ResourceSkus, Usages, Operations, CommitmentTiers, Models, LocationBasedModelCapacities, ModelCapacities, PrivateEndpointConnections, PrivateLinkResources, Deployments, CommitmentPlans, EncryptionScopes, RaiPolicies, RaiBlocklists, RaiBlocklistItems, RaiContentFilters, NetworkSecurityPerimeterConfigurations, DefenderForAISettings } from "./operationsInterfaces/index.js";
import { CognitiveServicesManagementClientOptionalParams, CheckSkuAvailabilityOptionalParams, CheckSkuAvailabilityResponse, CheckDomainAvailabilityOptionalParams, CheckDomainAvailabilityResponse, CalculateModelCapacityOptionalParams, CalculateModelCapacityResponse } from "./models/index.js";
export declare class CognitiveServicesManagementClient extends coreClient.ServiceClient {
    $host: string;
    apiVersion: string;
    subscriptionId: string;
    /**
     * Initializes a new instance of the CognitiveServicesManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The ID of the target subscription.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: CognitiveServicesManagementClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    /**
     * Check available SKUs.
     * @param location Resource location.
     * @param skus The SKU of the resource.
     * @param kind The kind (type) of cognitive service account.
     * @param typeParam The Type of the resource.
     * @param options The options parameters.
     */
    checkSkuAvailability(location: string, skus: string[], kind: string, typeParam: string, options?: CheckSkuAvailabilityOptionalParams): Promise<CheckSkuAvailabilityResponse>;
    /**
     * Check whether a domain is available.
     * @param subdomainName The subdomain name to use.
     * @param typeParam The Type of the resource.
     * @param options The options parameters.
     */
    checkDomainAvailability(subdomainName: string, typeParam: string, options?: CheckDomainAvailabilityOptionalParams): Promise<CheckDomainAvailabilityResponse>;
    /**
     * Model capacity calculator.
     * @param options The options parameters.
     */
    calculateModelCapacity(options?: CalculateModelCapacityOptionalParams): Promise<CalculateModelCapacityResponse>;
    accounts: Accounts;
    deletedAccounts: DeletedAccounts;
    resourceSkus: ResourceSkus;
    usages: Usages;
    operations: Operations;
    commitmentTiers: CommitmentTiers;
    models: Models;
    locationBasedModelCapacities: LocationBasedModelCapacities;
    modelCapacities: ModelCapacities;
    privateEndpointConnections: PrivateEndpointConnections;
    privateLinkResources: PrivateLinkResources;
    deployments: Deployments;
    commitmentPlans: CommitmentPlans;
    encryptionScopes: EncryptionScopes;
    raiPolicies: RaiPolicies;
    raiBlocklists: RaiBlocklists;
    raiBlocklistItems: RaiBlocklistItems;
    raiContentFilters: RaiContentFilters;
    networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurations;
    defenderForAISettings: DefenderForAISettings;
}
//# sourceMappingURL=cognitiveServicesManagementClient.d.ts.map