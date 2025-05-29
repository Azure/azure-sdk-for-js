"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttestationResultImpl = void 0;
exports._attestationResultFromGenerated = _attestationResultFromGenerated;
const attestationSigner_js_1 = require("./attestationSigner.js");
/**
 * A Microsoft Azure Attestation response token body - the body of a response token issued by MAA
 */
class AttestationResultImpl {
    /**
     *
     * @param params - The parameters for the constructor.
     *
     * @hidden
     */
    constructor(params) {
        this._issuer = params.issuer;
        this._nonce = params.nonce;
        this._version = params.version;
        this._uniqueId = params.uniqueId;
        this._runTimeClaims = params.runTimeClaims;
        this._initTimeClaims = params.initTimeClaims;
        this._policyClaims = params.policyClaims;
        this._verifierType = params.verifierType;
        this._policySigner = params.policySigner;
        this._policyHash = params.policyHash;
        this._isDebuggable = params.isDebuggable;
        this._productId = params.productId;
        this._mrEnclave = params.mrEnclave;
        this._mrSigner = params.mrSigner;
        this._svn = params.svn;
        this._enclaveHeldData = params.enclaveHeldData;
        this._sgxCollateral = params.sgxCollateral;
    }
    /**
     * Unique Identifier for the token
     *
     */
    get uniqueId() {
        return this._uniqueId;
    }
    /**
     * Returns the issuer of the attestation token. MUST be the same as the
     * endpoint used when constructing the attestation client instance.
     */
    get issuer() {
        return this._issuer;
    }
    /**
     * Returns the "nonce" value specified in the Attest request.
     */
    get nonce() {
        return this._nonce;
    }
    /**
     * The Schema version of this structure. Current Value: 1.0
     */
    get version() {
        return this._version;
    }
    /**
     * Runtime Claims
     */
    get runTimeClaims() {
        return this._runTimeClaims;
    }
    /**
     * Inittime Claims
     */
    get initTimeClaims() {
        return this._initTimeClaims;
    }
    /**
     * Policy Generated Claims
     */
    get policyClaims() {
        return this._policyClaims;
    }
    /**
     * The Attestation type being attested.
     */
    get verifierType() {
        return this._verifierType;
    }
    /**
     * The certificate used to sign the policy object, if specified.
     */
    get policySigner() {
        return this._policySigner;
    }
    /**
     * The SHA256 hash of the BASE64URL encoded policy text used for attestation
     */
    get policyHash() {
        return this._policyHash;
    }
    /**
     * True if the enclave is debuggable, false otherwise
     */
    get isDebuggable() {
        return this._isDebuggable;
    }
    /**
     * The SGX Product ID for the enclave.
     */
    get productId() {
        return this._productId;
    }
    /**
     * The HEX encoded SGX MRENCLAVE value for the enclave.
     */
    get mrEnclave() {
        return this._mrEnclave;
    }
    /**
     * The HEX encoded SGX MRSIGNER value for the enclave.
     */
    get mrSigner() {
        return this._mrSigner;
    }
    /**
     * The SGX SVN value for the enclave.
     */
    get svn() {
        return this._svn;
    }
    /**
     * A copy of the RuntimeData specified as an input to the attest call.
     */
    get enclaveHeldData() {
        return this._enclaveHeldData;
    }
    /**
     * The SGX SVN value for the enclave.
     */
    get sgxCollateral() {
        return this._sgxCollateral;
    }
}
exports.AttestationResultImpl = AttestationResultImpl;
/**
 *
 * @param generated - Generated attestation result object.
 * @returns newly created AttestationResult from the generated result.
 *
 * @internal
 */
function _attestationResultFromGenerated(generated) {
    return new AttestationResultImpl({
        issuer: generated.iss,
        version: generated.version,
        nonce: generated.nonce,
        uniqueId: generated.jti,
        policySigner: generated.policySigner
            ? (0, attestationSigner_js_1._attestationSignerFromGenerated)(generated.policySigner)
            : undefined,
        runTimeClaims: generated.runtimeClaims,
        initTimeClaims: generated.inittimeClaims,
        policyClaims: generated.policyClaims,
        verifierType: generated.verifierType,
        policyHash: generated.policyHash,
        isDebuggable: generated.isDebuggable,
        productId: generated.productId,
        mrEnclave: generated.mrEnclave,
        mrSigner: generated.mrSigner,
        svn: generated.svn,
        enclaveHeldData: generated.enclaveHeldData,
        sgxCollateral: generated.sgxCollateral,
    });
}
//# sourceMappingURL=attestationResult.js.map