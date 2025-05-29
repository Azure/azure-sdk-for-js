// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * The latest supported KeyVault service API version
 */
export const LATEST_API_VERSION = "7.6-preview.2";
/**
 * Well known issuers for choosing a default
 */
export var WellKnownIssuerNames;
(function (WellKnownIssuerNames) {
    /**
     * For self signed certificates
     */
    WellKnownIssuerNames["Self"] = "Self";
    /**
     * For certificates whose issuer will be defined later
     */
    WellKnownIssuerNames["Unknown"] = "Unknown";
})(WellKnownIssuerNames || (WellKnownIssuerNames = {}));
/**
 * The DefaultCertificatePolicy exports values that
 * are useful as default parameters to methods that
 * modify the certificate's policy.
 */
export const DefaultCertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyCert",
};
/** Known values of {@link CertificateKeyCurveName} that the service accepts. */
export var KnownCertificateKeyCurveNames;
(function (KnownCertificateKeyCurveNames) {
    /**
     * P-256 Key Curve.
     */
    KnownCertificateKeyCurveNames["P256"] = "P-256";
    /**
     * P-384 Key Curve.
     */
    KnownCertificateKeyCurveNames["P384"] = "P-384";
    /**
     * P-521 Key Curve.
     */
    KnownCertificateKeyCurveNames["P521"] = "P-521";
    /**
     * P-256K Key Curve.
     */
    KnownCertificateKeyCurveNames["P256K"] = "P-256K";
})(KnownCertificateKeyCurveNames || (KnownCertificateKeyCurveNames = {}));
/** Known values of {@link CertificateKeyType} that the service accepts. */
export var KnownCertificateKeyTypes;
(function (KnownCertificateKeyTypes) {
    /**
     * EC Key Type.
     */
    KnownCertificateKeyTypes["EC"] = "EC";
    /**
     * EC-HSM Key Type.
     */
    KnownCertificateKeyTypes["ECHSM"] = "EC-HSM";
    /**
     * RSA Key Type.
     */
    KnownCertificateKeyTypes["RSA"] = "RSA";
    /**
     * RSA-HSM Key Type.
     */
    KnownCertificateKeyTypes["RSAHSM"] = "RSA-HSM";
    /**
     * oct Key Type
     */
    KnownCertificateKeyTypes["Oct"] = "oct";
    /**
     * oct-HSM Key Type
     */
    KnownCertificateKeyTypes["OctHSM"] = "oct-HSM";
})(KnownCertificateKeyTypes || (KnownCertificateKeyTypes = {}));
/** Known values of {@link KeyUsageType} that the service accepts. */
export var KnownKeyUsageTypes;
(function (KnownKeyUsageTypes) {
    /**
     * DigitalSignature Usage Type.
     */
    KnownKeyUsageTypes["DigitalSignature"] = "digitalSignature";
    /**
     * NonRepudiation Usage Type.
     */
    KnownKeyUsageTypes["NonRepudiation"] = "nonRepudiation";
    /**
     * KeyEncipherment Usage Type.
     */
    KnownKeyUsageTypes["KeyEncipherment"] = "keyEncipherment";
    /**
     * DataEncipherment Usage Type.
     */
    KnownKeyUsageTypes["DataEncipherment"] = "dataEncipherment";
    /**
     * KeyAgreement Usage Type.
     */
    KnownKeyUsageTypes["KeyAgreement"] = "keyAgreement";
    /**
     * KeyCertSign Usage Type.
     */
    KnownKeyUsageTypes["KeyCertSign"] = "keyCertSign";
    /**
     * CRLSign Usage Type.
     */
    KnownKeyUsageTypes["CRLSign"] = "cRLSign";
    /**
     * EncipherOnly Usage Type.
     */
    KnownKeyUsageTypes["EncipherOnly"] = "encipherOnly";
    /**
     * DecipherOnly Usage Type.
     */
    KnownKeyUsageTypes["DecipherOnly"] = "decipherOnly";
})(KnownKeyUsageTypes || (KnownKeyUsageTypes = {}));
//# sourceMappingURL=certificatesModels.js.map