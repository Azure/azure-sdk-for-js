import { Policy } from "../operationsInterfaces/index.js";
import { GeneratedClient } from "../generatedClient.js";
import { AttestationType, PolicyGetOptionalParams, PolicyGetResponse, PolicySetModelOptionalParams, PolicySetModelResponse, PolicyResetOptionalParams, PolicyResetResponse } from "../models/index.js";
/** Class containing Policy operations. */
export declare class PolicyImpl implements Policy {
    private readonly client;
    /**
     * Initialize a new instance of the class Policy class.
     * @param client Reference to the service client
     */
    constructor(client: GeneratedClient);
    /**
     * Retrieves the current policy for an attestation type.
     * @param attestationType Specifies the trusted execution environment to be used to validate the
     *                        evidence
     * @param options The options parameters.
     */
    get(attestationType: AttestationType, options?: PolicyGetOptionalParams): Promise<PolicyGetResponse>;
    /**
     * Sets the policy for a given attestation type.
     * @param attestationType Specifies the trusted execution environment to be used to validate the
     *                        evidence
     * @param newAttestationPolicy JWT Expressing the new policy whose body is a StoredAttestationPolicy
     *                             object.
     * @param options The options parameters.
     */
    set(attestationType: AttestationType, newAttestationPolicy: string, options?: PolicySetModelOptionalParams): Promise<PolicySetModelResponse>;
    /**
     * Resets the attestation policy for the specified tenant and reverts to the default policy.
     * @param attestationType Specifies the trusted execution environment to be used to validate the
     *                        evidence
     * @param policyJws JSON Web Signature with an empty policy document
     * @param options The options parameters.
     */
    reset(attestationType: AttestationType, policyJws: string, options?: PolicyResetOptionalParams): Promise<PolicyResetResponse>;
}
//# sourceMappingURL=policy.d.ts.map