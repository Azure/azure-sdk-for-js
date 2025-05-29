import { Attestation } from "../operationsInterfaces/index.js";
import { GeneratedClient } from "../generatedClient.js";
import { AttestOpenEnclaveRequest, AttestationAttestOpenEnclaveOptionalParams, AttestationAttestOpenEnclaveResponse, AttestSgxEnclaveRequest, AttestationAttestSgxEnclaveOptionalParams, AttestationAttestSgxEnclaveResponse, TpmAttestationRequest, AttestationAttestTpmOptionalParams, AttestationAttestTpmResponse } from "../models/index.js";
/** Class containing Attestation operations. */
export declare class AttestationImpl implements Attestation {
    private readonly client;
    /**
     * Initialize a new instance of the class Attestation class.
     * @param client Reference to the service client
     */
    constructor(client: GeneratedClient);
    /**
     * Processes an OpenEnclave report , producing an artifact. The type of artifact produced is dependent
     * upon attestation policy.
     * @param request Request object containing the quote
     * @param options The options parameters.
     */
    attestOpenEnclave(request: AttestOpenEnclaveRequest, options?: AttestationAttestOpenEnclaveOptionalParams): Promise<AttestationAttestOpenEnclaveResponse>;
    /**
     * Processes an SGX enclave quote, producing an artifact. The type of artifact produced is dependent
     * upon attestation policy.
     * @param request Request object containing the quote
     * @param options The options parameters.
     */
    attestSgxEnclave(request: AttestSgxEnclaveRequest, options?: AttestationAttestSgxEnclaveOptionalParams): Promise<AttestationAttestSgxEnclaveResponse>;
    /**
     * Processes attestation evidence from a VBS enclave, producing an attestation result. The attestation
     * result produced is dependent upon the attestation policy.
     * @param request Request object
     * @param options The options parameters.
     */
    attestTpm(request: TpmAttestationRequest, options?: AttestationAttestTpmOptionalParams): Promise<AttestationAttestTpmResponse>;
}
//# sourceMappingURL=attestation.d.ts.map