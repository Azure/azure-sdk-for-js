// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../src/jsrsasign.d.ts"/>
const jsrsasign = require("jsrsasign");

function hexToByteArray(value) {
  if (value.length % 2 !== 0) {
    throw new Error("base64FromHex: Input must be a multiple of 2 characters");
  }
  const byteArray = new Array();
  for (let i = 0; i < value.length; i += 2) {
    byteArray.push(parseInt(value.substr(i, 2), 16));
  }
  return Uint8Array.from(byteArray);
}

function createECDSKey() {
  const keyPair = jsrsasign.KEYUTIL.generateKeypair("EC", "secp256r1");
  return [
    jsrsasign.KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV"),
    jsrsasign.KEYUTIL.getPEM(keyPair.pubKeyObj, "PKCS8PUB"),
  ];
}

function createRSAKey() {
  const keyPair = jsrsasign.KEYUTIL.generateKeypair("RSA", 1024);
  return [
    jsrsasign.KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV"),
    jsrsasign.KEYUTIL.getPEM(keyPair.pubKeyObj, "PKCS8PUB"),
  ];
}

function localDateToUtc(d) {
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  return new Date(utc);
}

function zeroPadding(s, len) {
  if (s.length >= len) return s;
  return new Array(len - s.length + 1).join("0") + s;
}

function formatDateString(dateObject) {
  const pad = zeroPadding;
  const d = localDateToUtc(dateObject);
  let year = String(d.getFullYear());
  // Extract first two digits of year for UTC encoding.
  year = year.substr(2, 2);
  const month = pad(String(d.getMonth() + 1), 2);
  const day = pad(String(d.getDate()), 2);
  const hour = pad(String(d.getHours()), 2);
  const min = pad(String(d.getMinutes()), 2);
  const sec = pad(String(d.getSeconds()), 2);
  const s = year + month + day + hour + min + sec;
  return s + "Z";
}

// Create a self-signed X.509 certificZTe
function createX509Certificate(privKeyPEM, pubKeyPEM, subject_name) {
  const pubKey = jsrsasign.KEYUTIL.getKey(pubKeyPEM);
  const privKey = jsrsasign.KEYUTIL.getKey(privKeyPEM);

  const timeEnd = new Date();
  timeEnd.setFullYear(timeEnd.getFullYear() + 1);

  const cert = new jsrsasign.KJUR.asn1.x509.Certificate({
    //    tbsobj: tbs,
    serial: { int: 4 },
    issuer: { str: "/CN=" + subject_name },
    subject: { str: "/CN=" + subject_name },
    notafter: { str: formatDateString(timeEnd) },
    sbjpubkey: pubKey,
    ext: [
      { extname: "basicConstraints", critical: false, cA: false, pathLen: 0 },
      { extname: "subjectAltName", critical: false, array: [{ uri: "https://" + subject_name }] },
      { extname: "keyUsage", critical: true, names: ["digitalSignature"] },
    ],
    sigalg: { name: "SHA256withRSA" },
    cakey: privKey,
  });

  const x509 = new jsrsasign.X509();
  x509.readCertPEM(cert.getPEM());

  return cert.getPEM();
}

/**
 * Generate the SHA256 hash of the specified buffer.
 */
function generateSha256Hash(buffer) {
  return hexToByteArray(jsrsasign.KJUR.crypto.Util.hashString(buffer, "sha256"));
}

/** Generate the SHA1 hash of the specified buffer.
 *
 * @param buffer - HEX encoded buffer to be hashed.
 * @returns SHA1 hash of the buffer.
 */
function generateSha1Hash(buffer) {
  return hexToByteArray(jsrsasign.KJUR.crypto.Util.hashHex(buffer, "sha1"));
}

module.exports = {
  createECDSKey,
  createRSAKey,
  createX509Certificate,
  generateSha256Hash,
  generateSha1Hash,
};
