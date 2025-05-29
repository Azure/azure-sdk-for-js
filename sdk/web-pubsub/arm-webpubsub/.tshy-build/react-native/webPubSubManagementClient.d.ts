import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { Operations, WebPubSub, Usages, WebPubSubCustomCertificates, WebPubSubCustomDomains, WebPubSubHubs, WebPubSubPrivateEndpointConnections, WebPubSubPrivateLinkResources, WebPubSubReplicas, WebPubSubReplicaSharedPrivateLinkResources, WebPubSubSharedPrivateLinkResources } from "./operationsInterfaces/index.js";
import { WebPubSubManagementClientOptionalParams } from "./models/index.js";
export declare class WebPubSubManagementClient extends coreClient.ServiceClient {
    $host: string;
    apiVersion: string;
    subscriptionId: string;
    /**
     * Initializes a new instance of the WebPubSubManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The ID of the target subscription. The value must be an UUID.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: WebPubSubManagementClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    operations: Operations;
    webPubSub: WebPubSub;
    usages: Usages;
    webPubSubCustomCertificates: WebPubSubCustomCertificates;
    webPubSubCustomDomains: WebPubSubCustomDomains;
    webPubSubHubs: WebPubSubHubs;
    webPubSubPrivateEndpointConnections: WebPubSubPrivateEndpointConnections;
    webPubSubPrivateLinkResources: WebPubSubPrivateLinkResources;
    webPubSubReplicas: WebPubSubReplicas;
    webPubSubReplicaSharedPrivateLinkResources: WebPubSubReplicaSharedPrivateLinkResources;
    webPubSubSharedPrivateLinkResources: WebPubSubSharedPrivateLinkResources;
}
//# sourceMappingURL=webPubSubManagementClient.d.ts.map