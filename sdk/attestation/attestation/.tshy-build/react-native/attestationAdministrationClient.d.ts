import type { AttestationResponse, AttestationSigner, AttestationTokenValidationOptions, AttestationType, PolicyCertificatesModificationResult, PolicyResult } from "./models/index.js";
import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import type { TokenCredential } from "@azure/core-auth";
/**
 * Attestation Client Construction Options.
 */
export interface AttestationAdministrationClientOptions extends CommonClientOptions {
    /**
     * Options to be used globally to validate attestation tokens received from
     * the attestation service.
     */
    validationOptions?: AttestationTokenValidationOptions;
}
/**
 * Operation options for the Attestation Administration Client operations.
 */
export interface AttestationAdministrationClientOperationOptions extends OperationOptions {
    /**
     * Options to be used globally to validate attestation tokens received from
     * the attestation service.
     */
    validationOptions?: AttestationTokenValidationOptions;
}
/**
 * Operation options for the administration Policy operations.
 */
export interface AttestationAdministrationClientPolicyOperationOptions extends AttestationAdministrationClientOperationOptions {
    /**
     * Optional Private key used to sign the token sent to the attestation service.
     *
     * Required for Isolated Mode attestation instances.
     */
    privateKey?: string;
    /**
     * Optional certificate which can validate the token sent to the attestation service.
     *
     * Required for Isolated Mode attestation instances.
     *
     * If the service instance is in Isolated mode, the certificate *must* be one
     * of the configured policy management certificates.
     */
    certificate?: string;
}
/**
 * Operation options for the Policy Certificates operations.
 */
export interface AttestationAdministrationClientPolicyCertificateOperationOptions extends AttestationAdministrationClientOperationOptions {
}
/**
 * Attestation Client class.
 *
 * The AttestationClient class enables access to the Attestation related APIs:
 *
 * - getPolicy
 * - setPolicy
 * - resetPolicy
 * - getPolicyManagementCertificates
 * - addPolicyManagementCertificate
 * - removePolicyManagementCertificate
 */
export declare class AttestationAdministrationClient {
    /**
     * Creates an instance of AttestationAdministrationClient.
     *
     * Example usage:
     * ```ts snippet:AttestationAdministrationClient_Constructor
     * import { AttestationAdministrationClient } from "@azure/attestation";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const endpoint = "https://<attestation-instance>.<region>.attest.azure.net";
     * const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());
     * ```
     *
     * @param endpoint - The attestation instance endpoint, for example https://mytenant.attest.azure.net.
     * @param credential - Used to authenticate requests to the service.
     * @param options - Used to configure the Form Recognizer client.
     */
    constructor(endpoint: string, credentials: TokenCredential, options?: AttestationAdministrationClientOptions);
    /**
     * Retrieves the attestation policy document from the server, and returns it
     * to the caller.
     *
     * @param attestationType - AttestationType for which to retrieve policy.
     * @param options - Pipeline and client options for the `getPolicy` call.
     * @returns `AttestationResponse<string>` - the `value` property is the
     *      attestation policy,  the `token` property will be the actual token
     *      returned by the attestation service.
     */
    getPolicy(attestationType: AttestationType, options?: AttestationAdministrationClientPolicyOperationOptions): Promise<AttestationResponse<string>>;
    /**
     * Sets the attestation policy for the specified {@link attestationType}.
     *
     * @param attestationType - Attestation Type for which to set policy.
     * @param newPolicyDocument - Policy document to be set.
     * @param options - call options.
     * @returns An {@link AttestationResponse} wrapping a {@link PolicyResult}.
     *  Clients can use the PolicyResult to validate that the policy was actually
     *  set by the attestation service.
     *
     * @remarks
     *
     * Please note that if the attestation service instance is running in "Isolated"
     * mode, the {@link signingKey} must be one of the signing keys configured for the
     * service instance.
     *
     * @throws {@link Error} when a private key is specified without a certificate and vice versa.
     * @throws {@link Error} when the key in the certificate provided does not match the private key.
     */
    setPolicy(attestationType: AttestationType, newPolicyDocument: string, options?: AttestationAdministrationClientPolicyOperationOptions): Promise<AttestationResponse<PolicyResult>>;
    /**
     * Resets the attestation policy for the specified {@link attestationType} to
     * the default value.
     *
     * @param attestationType - Attestation Type for which to set policy.
     * @param options - call options.
     * @returns An {@link AttestationResponse} wrapping a {@link PolicyResult}.
     *  Clients can use the PolicyResult to validate that the policy was actually
     *  reset by the attestation service.
     *
     * @remarks
     *
     * Please note that if the attestation service instance is running in "Isolated"
     * mode, the {@link signingKey} must be one of the signing keys configured for the
     * service instance.
     *
     * @throws {@link Error} when a private key is specified without a certificate and vice versa.
     * @throws {@link Error} when the key in the certificate provided does not match the private key.
     */
    resetPolicy(attestationType: AttestationType, options?: AttestationAdministrationClientPolicyOperationOptions): Promise<AttestationResponse<PolicyResult>>;
    /** Returns the set of policy management certificates for this attestation instance.
     *
     * @remarks If the attestation instance is not in `Isolated` mode, this list will
     *    always be empty.
     *
     * @param options - Options for the call to the attestation service.
     * @returns AttestationResponse wrapping a list of Attestation Signers.
     */
    getPolicyManagementCertificates(options?: AttestationAdministrationClientPolicyCertificateOperationOptions): Promise<AttestationResponse<AttestationSigner[]>>;
    /** Add a new certificate chain to the set of policy management certificates.
     *
     * @param pemCertificate - PEM encoded certificate to add to the set of policy management certificates.
     * @param privateKey - Existing attestation private key used to sign the incoming request.
     * @param certificate - Existing attestation certificate used to verify the incoming request.
     * @param options - Options used in the call to the service.
     * @returns An attestation response including a PolicyCertificatesModificationResult
     *
     * @remarks This API is only supported on `isolated` attestation instances.
     *
     * The signing key MUST be one of the existing attestation signing certificates. The
     * new pemCertificate is signed using the signingKey and the service will validate the
     * signature before allowing the addition.
     *
     * @throws {@link Error} when a private key is specified without a certificate and vice versa.
     * @throws {@link Error} when the key in the certificate provided does not match the private key.
     *
     */
    addPolicyManagementCertificate(pemCertificate: string, privateKey: string, certificate: string, options?: AttestationAdministrationClientPolicyCertificateOperationOptions): Promise<AttestationResponse<PolicyCertificatesModificationResult>>;
    private keyTypeFromCertificate;
    /** Add a new certificate chain to the set of policy management certificates.
     *
     * @param pemCertificate - PEM encoded certificate to add to the set of policy management certificates.
     * @param privateKey - Existing attestation private key used to sign the incoming request.
     * @param certificate - Existing attestation certificate used to verify the incoming request.
     * @param options - Options used in the call to the service.
     * @returns An attestation response including a PolicyCertificatesModificationResult
     *
     * @remarks This API is only supported on `isolated` attestation instances.
     *
     * The signing key MUST be one of the existing attestation signing certificates. The
     * new pemCertificate is signed using the signingKey and the service will validate the
     * signature before allowing the addition.
     *
     * @throws {@link Error} when a private key is specified without a certificate and vice versa.
     * @throws {@link Error} when the key in the certificate provided does not match the private key.
     */
    removePolicyManagementCertificate(pemCertificate: string, privateKey: string, certificate: string, options?: AttestationAdministrationClientPolicyCertificateOperationOptions): Promise<AttestationResponse<PolicyCertificatesModificationResult>>;
    private signingKeys;
    private _client;
    private _signers?;
    private _validationOptions?;
}
//# sourceMappingURL=attestationAdministrationClient.d.ts.map