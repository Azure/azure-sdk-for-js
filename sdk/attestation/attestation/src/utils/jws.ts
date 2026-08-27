// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { p256 } from "@noble/curves/nist.js";
import forge from "node-forge/lib/forge.js";
import "node-forge/lib/asn1.js";
import "node-forge/lib/rsa.js";
import "node-forge/lib/sha256.js";
import {
  base64DecodeString,
  base64EncodeByteArray,
  base64UrlDecodeString,
  base64UrlEncodeByteArray,
  byteArrayToHex,
} from "./base64.js";
import { bytesToString, stringToBytes } from "./utf8.js";

// Web Crypto-based JOSE implementations are asynchronous, but this package's stable token APIs
// are synchronous. Forge 1.4+ provides patched synchronous RSA, while Noble provides audited
// P-256 primitives. The DER reader below is intentionally limited to locating PKCS#8 and X.509
// public-key material; it does not attempt to implement general certificate validation.

const rsaEncryptionOid = "2a864886f70d010101";
const ecPublicKeyOid = "2a8648ce3d0201";
const p256Oid = "2a8648ce3d030107";

type KeyType = "RSA" | "EC";

interface DerElement {
  tag: number;
  contentStart: number;
  end: number;
}

interface RsaCertificateInfo {
  base64: string;
  keyType: "RSA";
  publicKey: forge.pki.rsa.PublicKey;
}

interface EcCertificateInfo {
  base64: string;
  keyType: "EC";
  publicKey: Uint8Array;
}

type CertificateInfo = EcCertificateInfo | RsaCertificateInfo;

interface EcPrivateKeyInfo {
  keyType: "EC";
  privateKey: Uint8Array;
}

interface RsaPrivateKeyInfo {
  keyType: "RSA";
  privateKey: forge.pki.rsa.PrivateKey;
}

type PrivateKeyInfo = EcPrivateKeyInfo | RsaPrivateKeyInfo;

function readDerElement(data: Uint8Array, offset: number, containerEnd = data.length): DerElement {
  if (offset < 0 || offset + 2 > containerEnd) {
    throw new Error("Invalid DER: truncated element.");
  }

  const tag = data[offset];
  let contentStart = offset + 2;
  let length = data[offset + 1];

  if ((length & 0x80) !== 0) {
    const lengthBytes = length & 0x7f;
    if (lengthBytes === 0 || lengthBytes > 4 || contentStart + lengthBytes > containerEnd) {
      throw new Error("Invalid DER: malformed length.");
    }
    if (data[contentStart] === 0) {
      throw new Error("Invalid DER: non-canonical length.");
    }

    length = 0;
    for (let i = 0; i < lengthBytes; i++) {
      length = length * 256 + data[contentStart + i];
    }
    if (length < 0x80) {
      throw new Error("Invalid DER: non-canonical length.");
    }
    contentStart += lengthBytes;
  }

  const end = contentStart + length;
  if (end > containerEnd) {
    throw new Error("Invalid DER: element exceeds its container.");
  }
  return { tag, contentStart, end };
}

function readDerChildren(data: Uint8Array, element: DerElement): DerElement[] {
  const children: DerElement[] = [];
  let offset = element.contentStart;
  while (offset < element.end) {
    const child = readDerElement(data, offset, element.end);
    children.push(child);
    offset = child.end;
  }
  if (offset !== element.end) {
    throw new Error("Invalid DER: child elements do not fill their container.");
  }
  return children;
}

function requireTag(element: DerElement | undefined, tag: number, description: string): DerElement {
  if (!element || element.tag !== tag) {
    throw new Error(`Invalid DER: expected ${description}.`);
  }
  return element;
}

function readOid(data: Uint8Array, element: DerElement | undefined): string {
  const oid = requireTag(element, 0x06, "object identifier");
  if (oid.contentStart === oid.end) {
    throw new Error("Invalid DER: empty object identifier.");
  }
  return byteArrayToHex(data.subarray(oid.contentStart, oid.end));
}

function requireChildren(
  data: Uint8Array,
  element: DerElement,
  count: number,
  description: string,
): DerElement[] {
  const children = readDerChildren(data, element);
  if (children.length !== count) {
    throw new Error(`Invalid DER: malformed ${description}.`);
  }
  return children;
}

function requireNull(element: DerElement | undefined, description: string): void {
  const nullElement = requireTag(element, 0x05, description);
  if (nullElement.contentStart !== nullElement.end) {
    throw new Error(`Invalid DER: malformed ${description}.`);
  }
}

function validateInteger(
  data: Uint8Array,
  element: DerElement | undefined,
  description: string,
  allowZero: boolean,
): DerElement {
  const integer = requireTag(element, 0x02, description);
  if (integer.contentStart === integer.end || (data[integer.contentStart] & 0x80) !== 0) {
    throw new Error(`Invalid DER: malformed ${description}.`);
  }
  if (
    integer.end - integer.contentStart > 1 &&
    data[integer.contentStart] === 0 &&
    (data[integer.contentStart + 1] & 0x80) === 0
  ) {
    throw new Error(`Invalid DER: non-canonical ${description}.`);
  }
  if (!allowZero && data.subarray(integer.contentStart, integer.end).every((byte) => byte === 0)) {
    throw new Error(`Invalid DER: malformed ${description}.`);
  }
  return integer;
}

function requireIntegerValue(
  data: Uint8Array,
  element: DerElement | undefined,
  expectedValue: number,
  description: string,
): void {
  const integer = validateInteger(data, element, description, true);
  let value = 0;
  for (let offset = integer.contentStart; offset < integer.end; offset++) {
    value = value * 256 + data[offset];
  }
  if (!Number.isSafeInteger(value) || value !== expectedValue) {
    throw new Error(`Invalid DER: unsupported ${description}.`);
  }
}

function parsePem(
  value: string,
  type: "CERTIFICATE" | "PRIVATE KEY",
): {
  base64: string;
  der: Uint8Array;
} {
  const expression = new RegExp(
    `^-----BEGIN ${type}-----\\s+([A-Za-z0-9+/=\\r\\n]+?)\\s+-----END ${type}-----$`,
  );
  const match = expression.exec(value.trim());
  if (!match) {
    throw new Error(`Invalid PEM encoded ${type.toLowerCase()}.`);
  }

  const base64 = match[1].replace(/\s/g, "");
  const der = base64DecodeString(base64);
  if (der.length === 0 || base64EncodeByteArray(der) !== base64) {
    throw new Error(`Invalid PEM encoded ${type.toLowerCase()}.`);
  }

  const root = requireTag(readDerElement(der, 0), 0x30, "sequence");
  if (root.end !== der.length) {
    throw new Error("Invalid DER: trailing data.");
  }
  return { base64, der };
}

function getCertificateInfo(certificate: string): CertificateInfo {
  const { base64, der } = parsePem(certificate, "CERTIFICATE");
  const root = readDerElement(der, 0);
  const certificateChildren = readDerChildren(der, root);
  if (certificateChildren.length !== 3) {
    throw new Error("Invalid DER: malformed certificate sequence.");
  }
  requireTag(certificateChildren[1], 0x30, "certificate signature algorithm");
  const certificateSignature = requireTag(
    certificateChildren[2],
    0x03,
    "certificate signature bit string",
  );
  if (
    certificateSignature.contentStart === certificateSignature.end ||
    der[certificateSignature.contentStart] !== 0
  ) {
    throw new Error("Invalid DER: malformed certificate signature bit string.");
  }

  const tbsCertificate = requireTag(certificateChildren[0], 0x30, "TBSCertificate sequence");
  const tbsChildren = readDerChildren(der, tbsCertificate);
  const versionOffset = tbsChildren[0]?.tag === 0xa0 ? 1 : 0;
  if (versionOffset === 1) {
    const version = requireChildren(der, tbsChildren[0], 1, "certificate version");
    const versionInteger = validateInteger(der, version[0], "certificate version", true);
    if (
      versionInteger.end - versionInteger.contentStart !== 1 ||
      der[versionInteger.contentStart] > 2
    ) {
      throw new Error("Invalid DER: unsupported certificate version.");
    }
  }
  validateInteger(der, tbsChildren[versionOffset], "certificate serial number", false);
  requireTag(tbsChildren[versionOffset + 1], 0x30, "certificate signature algorithm");
  requireTag(tbsChildren[versionOffset + 2], 0x30, "certificate issuer");
  requireTag(tbsChildren[versionOffset + 3], 0x30, "certificate validity");
  requireTag(tbsChildren[versionOffset + 4], 0x30, "certificate subject");
  const subjectPublicKeyInfo = requireTag(
    tbsChildren[versionOffset + 5],
    0x30,
    "subjectPublicKeyInfo sequence",
  );
  const subjectPublicKeyInfoChildren = requireChildren(
    der,
    subjectPublicKeyInfo,
    2,
    "subjectPublicKeyInfo sequence",
  );
  const algorithm = requireTag(
    subjectPublicKeyInfoChildren[0],
    0x30,
    "public key algorithm sequence",
  );
  const algorithmChildren = requireChildren(der, algorithm, 2, "public key algorithm");
  const algorithmOid = readOid(der, algorithmChildren[0]);
  const subjectPublicKey = requireTag(
    subjectPublicKeyInfoChildren[1],
    0x03,
    "public key bit string",
  );

  if (
    subjectPublicKey.contentStart === subjectPublicKey.end ||
    der[subjectPublicKey.contentStart] !== 0
  ) {
    throw new Error("Invalid DER: public key bit string has unused bits.");
  }

  if (algorithmOid === rsaEncryptionOid) {
    requireNull(algorithmChildren[1], "RSA algorithm parameters");
    const publicKeyDer = der.slice(subjectPublicKey.contentStart + 1, subjectPublicKey.end);
    const publicKeyRoot = requireTag(
      readDerElement(publicKeyDer, 0),
      0x30,
      "RSA public key sequence",
    );
    if (publicKeyRoot.end !== publicKeyDer.length) {
      throw new Error("Invalid DER: trailing RSA public key data.");
    }
    const publicKeyChildren = requireChildren(
      publicKeyDer,
      publicKeyRoot,
      2,
      "RSA public key sequence",
    );
    validateInteger(publicKeyDer, publicKeyChildren[0], "RSA modulus", false);
    validateInteger(publicKeyDer, publicKeyChildren[1], "RSA public exponent", false);
    const publicKey = forge.pki.publicKeyFromAsn1(
      forge.asn1.fromDer(bytesToBinaryString(publicKeyDer), true),
    );
    return { base64, keyType: "RSA", publicKey };
  }
  if (algorithmOid !== ecPublicKeyOid || readOid(der, algorithmChildren[1]) !== p256Oid) {
    throw new Error("Unsupported certificate public key algorithm.");
  }

  const publicKey = der.slice(subjectPublicKey.contentStart + 1, subjectPublicKey.end);
  if (publicKey.length !== 65 || publicKey[0] !== 0x04 || !p256.utils.isValidPublicKey(publicKey)) {
    throw new Error("Invalid P-256 certificate public key.");
  }
  return { base64, keyType: "EC", publicKey };
}

function getPrivateKeyInfo(privateKey: string): PrivateKeyInfo {
  const { der } = parsePem(privateKey, "PRIVATE KEY");
  const root = readDerElement(der, 0);
  const privateKeyInfoChildren = readDerChildren(der, root);
  if (privateKeyInfoChildren.length < 3 || privateKeyInfoChildren.length > 4) {
    throw new Error("Invalid DER: malformed PKCS#8 private key.");
  }
  requireIntegerValue(der, privateKeyInfoChildren[0], 0, "PKCS#8 version");
  if (privateKeyInfoChildren[3]) {
    requireTag(privateKeyInfoChildren[3], 0xa0, "PKCS#8 attributes");
    readDerChildren(der, privateKeyInfoChildren[3]);
  }
  const algorithm = requireTag(privateKeyInfoChildren[1], 0x30, "private key algorithm sequence");
  const algorithmChildren = requireChildren(der, algorithm, 2, "private key algorithm");
  const algorithmOid = readOid(der, algorithmChildren[0]);
  const privateKeyOctets = requireTag(privateKeyInfoChildren[2], 0x04, "private key octet string");

  if (algorithmOid === rsaEncryptionOid) {
    requireNull(algorithmChildren[1], "RSA algorithm parameters");
    const rsaPrivateKeyDer = der.slice(privateKeyOctets.contentStart, privateKeyOctets.end);
    const rsaPrivateKeyRoot = requireTag(
      readDerElement(rsaPrivateKeyDer, 0),
      0x30,
      "RSA private key sequence",
    );
    if (rsaPrivateKeyRoot.end !== rsaPrivateKeyDer.length) {
      throw new Error("Invalid DER: trailing RSA private key data.");
    }
    const rsaPrivateKeyChildren = requireChildren(
      rsaPrivateKeyDer,
      rsaPrivateKeyRoot,
      9,
      "RSA private key sequence",
    );
    requireIntegerValue(rsaPrivateKeyDer, rsaPrivateKeyChildren[0], 0, "RSA private key version");
    for (const [index, description] of [
      [1, "RSA modulus"],
      [2, "RSA public exponent"],
      [3, "RSA private exponent"],
      [4, "RSA prime 1"],
      [5, "RSA prime 2"],
      [6, "RSA exponent 1"],
      [7, "RSA exponent 2"],
      [8, "RSA coefficient"],
    ] as const) {
      validateInteger(rsaPrivateKeyDer, rsaPrivateKeyChildren[index], description, false);
    }
    return {
      keyType: "RSA",
      privateKey: forge.pki.privateKeyFromAsn1(
        forge.asn1.fromDer(bytesToBinaryString(rsaPrivateKeyDer), true),
      ),
    };
  }
  if (algorithmOid !== ecPublicKeyOid || readOid(der, algorithmChildren[1]) !== p256Oid) {
    throw new Error("Unsupported private key algorithm.");
  }

  const ecPrivateKey = requireTag(
    readDerElement(der, privateKeyOctets.contentStart, privateKeyOctets.end),
    0x30,
    "EC private key sequence",
  );
  if (ecPrivateKey.end !== privateKeyOctets.end) {
    throw new Error("Invalid DER: trailing EC private key data.");
  }
  const ecPrivateKeyChildren = readDerChildren(der, ecPrivateKey);
  if (ecPrivateKeyChildren.length < 2 || ecPrivateKeyChildren.length > 4) {
    throw new Error("Invalid DER: malformed EC private key.");
  }
  requireIntegerValue(der, ecPrivateKeyChildren[0], 1, "EC private key version");
  const privateKeyValue = requireTag(ecPrivateKeyChildren[1], 0x04, "EC private key value");
  const privateKeyBytes = der.slice(privateKeyValue.contentStart, privateKeyValue.end);
  if (privateKeyBytes.length !== 32 || !p256.utils.isValidSecretKey(privateKeyBytes)) {
    throw new Error("Invalid P-256 private key.");
  }

  let optionalFieldIndex = 2;
  if (ecPrivateKeyChildren[optionalFieldIndex]?.tag === 0xa0) {
    const parameters = requireChildren(
      der,
      ecPrivateKeyChildren[optionalFieldIndex],
      1,
      "EC parameters",
    );
    if (readOid(der, parameters[0]) !== p256Oid) {
      throw new Error("Unsupported EC private key parameters.");
    }
    optionalFieldIndex++;
  }
  if (ecPrivateKeyChildren[optionalFieldIndex]?.tag === 0xa1) {
    const publicKeyElements = requireChildren(
      der,
      ecPrivateKeyChildren[optionalFieldIndex],
      1,
      "EC public key",
    );
    const publicKey = requireTag(publicKeyElements[0], 0x03, "EC public key bit string");
    if (publicKey.contentStart === publicKey.end || der[publicKey.contentStart] !== 0) {
      throw new Error("Invalid DER: EC public key bit string has unused bits.");
    }
    const encodedPublicKey = der.slice(publicKey.contentStart + 1, publicKey.end);
    const derivedPublicKey = p256.getPublicKey(privateKeyBytes, false);
    if (
      encodedPublicKey.length !== derivedPublicKey.length ||
      !encodedPublicKey.every((byte, index) => byte === derivedPublicKey[index])
    ) {
      throw new Error("Invalid DER: EC private key public key does not match.");
    }
    optionalFieldIndex++;
  }
  if (optionalFieldIndex !== ecPrivateKeyChildren.length) {
    throw new Error("Invalid DER: malformed EC private key fields.");
  }
  return { keyType: "EC", privateKey: privateKeyBytes };
}

function bytesToBinaryString(value: Uint8Array): string {
  let result = "";
  for (const byte of value) {
    result += String.fromCharCode(byte);
  }
  return result;
}

function binaryStringToBytes(value: string): Uint8Array {
  return Uint8Array.from(value, (character) => character.charCodeAt(0));
}

function assertMatchingKey(privateKeyInfo: PrivateKeyInfo, certificateInfo: CertificateInfo): void {
  if (privateKeyInfo.keyType !== certificateInfo.keyType) {
    throw new Error("verifyAttestationSigningKey: Key does not match Certificate.");
  }

  let matches: boolean;
  if (privateKeyInfo.keyType === "RSA" && certificateInfo.keyType === "RSA") {
    matches =
      privateKeyInfo.privateKey.n.compareTo(certificateInfo.publicKey.n) === 0 &&
      privateKeyInfo.privateKey.e.compareTo(certificateInfo.publicKey.e) === 0;
  } else if (privateKeyInfo.keyType === "EC" && certificateInfo.keyType === "EC") {
    const derivedPublicKey = p256.getPublicKey(privateKeyInfo.privateKey, false);
    matches =
      derivedPublicKey.length === certificateInfo.publicKey.length &&
      derivedPublicKey.every((byte, index) => byte === certificateInfo.publicKey[index]);
  } else {
    matches = false;
  }

  if (!matches) {
    throw new Error("verifyAttestationSigningKey: Key does not match Certificate.");
  }
}

function getSigningMaterial(
  privateKey: string,
  certificate: string,
): { certificateInfo: CertificateInfo; privateKeyInfo: PrivateKeyInfo } {
  const certificateInfo = getCertificateInfo(certificate);
  const privateKeyInfo = getPrivateKeyInfo(privateKey);
  assertMatchingKey(privateKeyInfo, certificateInfo);
  return { certificateInfo, privateKeyInfo };
}

function sign(
  algorithm: KeyType,
  signingInput: Uint8Array,
  privateKey: PrivateKeyInfo,
): Uint8Array {
  if (algorithm === "RSA" && privateKey.keyType === "RSA") {
    const digest = forge.md.sha256.create();
    digest.update(bytesToBinaryString(signingInput), "raw");
    return binaryStringToBytes(privateKey.privateKey.sign(digest));
  }
  if (algorithm === "EC" && privateKey.keyType === "EC") {
    return p256.sign(signingInput, privateKey.privateKey, {
      format: "compact",
      lowS: true,
    });
  }
  throw new Error("Private key algorithm does not match signing algorithm.");
}

function verifyRsa(
  signingInput: Uint8Array,
  signature: Uint8Array,
  publicKey: forge.pki.rsa.PublicKey,
): boolean {
  const expectedSignatureLength = Math.ceil(publicKey.n.bitLength() / 8);
  if (signature.length !== expectedSignatureLength) {
    return false;
  }

  const digest = forge.md.sha256.create();
  digest.update(bytesToBinaryString(signingInput), "raw");
  return publicKey.verify(digest.digest().getBytes(), bytesToBinaryString(signature));
}

export function createAttestationJws(
  body: string,
  privateKey?: string,
  certificate?: string,
): string {
  const payload = base64UrlEncodeByteArray(stringToBytes(body));
  if (!privateKey && !certificate) {
    const protectedHeader = base64UrlEncodeByteArray(
      stringToBytes(JSON.stringify({ alg: "none" })),
    );
    return `${protectedHeader}.${payload}.`;
  }
  if (!privateKey || !certificate) {
    throw new Error(
      "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided.",
    );
  }

  const { certificateInfo, privateKeyInfo } = getSigningMaterial(privateKey, certificate);
  const alg = certificateInfo.keyType === "RSA" ? "RS256" : "ES256";
  const protectedHeader = base64UrlEncodeByteArray(
    stringToBytes(JSON.stringify({ alg, x5c: [certificateInfo.base64] })),
  );
  const signingInput = stringToBytes(`${protectedHeader}.${payload}`);
  const signature = sign(certificateInfo.keyType, signingInput, privateKeyInfo);
  return `${protectedHeader}.${payload}.${base64UrlEncodeByteArray(signature)}`;
}

export function verifyAttestationJws(token: string, certificate: string): boolean {
  try {
    const pieces = token.split(".");
    if (pieces.length !== 3 || pieces[2].length === 0) {
      return false;
    }

    const headerBytes = base64UrlDecodeString(pieces[0]);
    if (base64UrlEncodeByteArray(headerBytes) !== pieces[0]) {
      return false;
    }
    const payloadBytes = base64UrlDecodeString(pieces[1]);
    if (base64UrlEncodeByteArray(payloadBytes) !== pieces[1]) {
      return false;
    }
    const header = JSON.parse(bytesToString(headerBytes)) as { alg?: unknown };
    const certificateInfo = getCertificateInfo(certificate);
    const signingInput = stringToBytes(`${pieces[0]}.${pieces[1]}`);
    const signature = base64UrlDecodeString(pieces[2]);
    if (base64UrlEncodeByteArray(signature) !== pieces[2]) {
      return false;
    }

    if (header.alg === "RS256" && certificateInfo.keyType === "RSA") {
      return verifyRsa(signingInput, signature, certificateInfo.publicKey);
    }
    if (header.alg === "ES256" && certificateInfo.keyType === "EC") {
      return (
        signature.length === 64 &&
        p256.verify(signature, signingInput, certificateInfo.publicKey, {
          format: "compact",
          lowS: false,
        })
      );
    }
    return false;
  } catch {
    // Malformed tokens, certificates, and signatures are all invalid verification inputs.
    return false;
  }
}

export function validateAttestationSigningKey(privateKey: string, certificate: string): void {
  getSigningMaterial(privateKey, certificate);
}

export function certificateToBase64(certificate: string): string {
  return getCertificateInfo(certificate).base64;
}

export function keyTypeFromCertificate(certificate: string): KeyType {
  return getCertificateInfo(certificate).keyType;
}
