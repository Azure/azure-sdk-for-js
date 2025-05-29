import { SigningCertificatesGetOptionalParams, SigningCertificatesGetResponse } from "../models/index.js";
/** Interface representing a SigningCertificates. */
export interface SigningCertificates {
    /**
     * Retrieves metadata signing certificates in use by the attestation service
     * @param options The options parameters.
     */
    get(options?: SigningCertificatesGetOptionalParams): Promise<SigningCertificatesGetResponse>;
}
//# sourceMappingURL=signingCertificates.d.ts.map