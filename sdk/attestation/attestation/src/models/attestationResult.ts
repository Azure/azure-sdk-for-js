// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AttestationSigner } from ".";
import { GeneratedAttestationResult } from "../generated";
import { _attestationSignerFromGenerated } from "./attestationSigner";

/**
 * A Microsoft Azure Attestation response token body - the body of a response token issued by MAA
 */
export class AttestationResult {
  /**
   *
   * @param params - The parameters for the constructor.
   * @hideconstructor
   */
  constructor(params: any) {
    this._issuer = params.issuer;
    this._nonce = params.nonce;
    this._version = params.version;
    this._uniqueId = params.uniqueId;
    this._runtimeClaims = params.runtimeClaims;
    this._inittimeClaims = params.inittimeClaims;
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

  private _issuer: string;
  private _version: string;
  private _nonce?: string;
  private _uniqueId: string;
  private _runtimeClaims?: any;
  private _inittimeClaims?: any;
  private _policyClaims?: any;
  private _verifierType: string;
  private _policySigner?: AttestationSigner;
  private _policyHash: Uint8Array;
  private _isDebuggable?: boolean;
  private _productId?: number;
  private _mrEnclave?: string;
  private _mrSigner?: string;
  private _svn?: number;
  private _enclaveHeldData?: Uint8Array;
  private _sgxCollateral?: any;

  /**
   * Unique Identifier for the token
   */
  get uniqueId() {
    return this._uniqueId;
  }

  /**
   * Returns the issuer of the attestation token. MUST be the same as the
   * endpoint used when constructing the attestation client instance.
   */
  get issuer(): string {
    return this._issuer;
  }

  /**
   * Returns the "nonce" value specified in the Attest request.
   */
  get nonce(): string | undefined {
    return this._nonce;
  }

  /**
   * The Schema version of this structure. Current Value: 1.0
   */
  get version(): string {
    return this._version;
  }

  /**
   * Runtime Claims
   */
  get runtimeClaims() {
    return this._runtimeClaims;
  }
  /**
   * Inittime Claims
   */
  get inittimeClaims() {
    return this._inittimeClaims;
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

/**
 *
 * @param generated - Generated attestation result object.
 * @returns newly created AttestationResult from the generated result.
 *
 * @internal
 */
export function _attestationResultFromGenerated(
  generated: GeneratedAttestationResult
): AttestationResult {
  return new AttestationResult({
    issuer: generated.iss,
    version: generated.version,
    nonce: generated.nonce,
    uniqueId: generated.jti,
    policySigner: generated.policySigner
      ? _attestationSignerFromGenerated(generated.policySigner)
      : undefined,
    runtimeClaims: generated.runtimeClaims,
    inittimeClaims: generated.inittimeClaims,
    policyClaims: generated.policyClaims,
    verifierType: generated.verifierType,
    policyHash: generated.policyHash,
    isDebuggable: generated.isDebuggable,
    productId: generated.productId,
    mrEnclave: generated.mrEnclave,
    mrSigner: generated.mrSigner,
    svn: generated.svn,
    enclaveHeldData: generated.enclaveHeldData,
    sgxCollateral: generated.sgxCollateral
  });
}
