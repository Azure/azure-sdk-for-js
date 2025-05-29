import { PolicyCertificates } from "../operationsInterfaces/index.js";
import { GeneratedClient } from "../generatedClient.js";
import { PolicyCertificatesGetOptionalParams, PolicyCertificatesGetResponse, PolicyCertificatesAddOptionalParams, PolicyCertificatesAddResponse, PolicyCertificatesRemoveOptionalParams, PolicyCertificatesRemoveResponse } from "../models/index.js";
/** Class containing PolicyCertificates operations. */
export declare class PolicyCertificatesImpl implements PolicyCertificates {
    private readonly client;
    /**
     * Initialize a new instance of the class PolicyCertificates class.
     * @param client Reference to the service client
     */
    constructor(client: GeneratedClient);
    /**
     * Retrieves the set of certificates used to express policy for the current tenant.
     * @param options The options parameters.
     */
    get(options?: PolicyCertificatesGetOptionalParams): Promise<PolicyCertificatesGetResponse>;
    /**
     * Adds a new attestation policy certificate to the set of policy management certificates.
     * @param policyCertificateToAdd An RFC7519 JSON Web Token whose body is an RFC7517 JSON Web Key
     *                               object. The RFC7519 JWT must be signed with one of the existing signing certificates
     * @param options The options parameters.
     */
    add(policyCertificateToAdd: string, options?: PolicyCertificatesAddOptionalParams): Promise<PolicyCertificatesAddResponse>;
    /**
     * Removes the specified policy management certificate. Note that the final policy management
     * certificate cannot be removed.
     * @param policyCertificateToRemove An RFC7519 JSON Web Token whose body is an
     *                                  AttestationCertificateManagementBody object. The RFC7519 JWT must be signed with one of the existing
     *                                  signing certificates
     * @param options The options parameters.
     */
    remove(policyCertificateToRemove: string, options?: PolicyCertificatesRemoveOptionalParams): Promise<PolicyCertificatesRemoveResponse>;
}
//# sourceMappingURL=policyCertificates.d.ts.map