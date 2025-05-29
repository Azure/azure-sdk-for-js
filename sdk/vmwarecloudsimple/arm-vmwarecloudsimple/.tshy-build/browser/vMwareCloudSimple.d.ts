import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { Operations, DedicatedCloudNodes, DedicatedCloudServices, SkusAvailability, PrivateClouds, CustomizationPolicies, ResourcePools, VirtualMachineTemplates, VirtualNetworks, Usages, VirtualMachines } from "./operationsInterfaces/index.js";
import { VMwareCloudSimpleOptionalParams } from "./models/index.js";
export declare class VMwareCloudSimple extends coreClient.ServiceClient {
    $host: string;
    apiVersion: string;
    subscriptionId: string;
    /**
     * Initializes a new instance of the VMwareCloudSimple class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The subscription ID.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: VMwareCloudSimpleOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    operations: Operations;
    dedicatedCloudNodes: DedicatedCloudNodes;
    dedicatedCloudServices: DedicatedCloudServices;
    skusAvailability: SkusAvailability;
    privateClouds: PrivateClouds;
    customizationPolicies: CustomizationPolicies;
    resourcePools: ResourcePools;
    virtualMachineTemplates: VirtualMachineTemplates;
    virtualNetworks: VirtualNetworks;
    usages: Usages;
    virtualMachines: VirtualMachines;
}
//# sourceMappingURL=vMwareCloudSimple.d.ts.map