import * as coreClient from "@azure/core-client";
import { Policy, PolicyCertificates, Attestation, SigningCertificates, MetadataConfiguration } from "./operationsInterfaces/index.js";
import { GeneratedClientOptionalParams } from "./models/index.js";
export declare class GeneratedClient extends coreClient.ServiceClient {
    instanceUrl: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the GeneratedClient class.
     * @param instanceUrl The attestation instance base URI, for example https://mytenant.attest.azure.net.
     * @param options The parameter options
     */
    constructor(instanceUrl: string, options?: GeneratedClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    policy: Policy;
    policyCertificates: PolicyCertificates;
    attestation: Attestation;
    signingCertificates: SigningCertificates;
    metadataConfiguration: MetadataConfiguration;
}
//# sourceMappingURL=generatedClient.d.ts.map