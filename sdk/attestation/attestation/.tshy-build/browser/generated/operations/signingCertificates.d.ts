import { SigningCertificates } from "../operationsInterfaces/index.js";
import { GeneratedClient } from "../generatedClient.js";
import { SigningCertificatesGetOptionalParams, SigningCertificatesGetResponse } from "../models/index.js";
/** Class containing SigningCertificates operations. */
export declare class SigningCertificatesImpl implements SigningCertificates {
    private readonly client;
    /**
     * Initialize a new instance of the class SigningCertificates class.
     * @param client Reference to the service client
     */
    constructor(client: GeneratedClient);
    /**
     * Retrieves metadata signing certificates in use by the attestation service
     * @param options The options parameters.
     */
    get(options?: SigningCertificatesGetOptionalParams): Promise<SigningCertificatesGetResponse>;
}
//# sourceMappingURL=signingCertificates.d.ts.map