// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as forge from "node-forge";
import path from "path";
import * as fs from "fs/promises";
import { logger } from "./logger.mjs";

export async function generateCertificates(): Promise<void> {
  const certPath = await helper();
  process.env.NODE_EXTRA_CA_CERTS = certPath;
  logger.info(`NODE_EXTRA_CA_CERTS set to ${certPath}`);
}

async function helper(): Promise<string> {
  const keyPath = path.resolve(__dirname, "key.pem");
  const certPath = path.resolve(__dirname, "cert.pem");

  try {
    await fs.stat(keyPath);
    await fs.stat(certPath);
    logger.info("SSL/TLS certificates already exist.");
    return certPath;
  } catch {
    // Ignore error
  }

  logger.info("Generating SSL/TLS certificates...");

  const pki = forge.pki;
  const keys = pki.rsa.generateKeyPair(2048);
  const cert = pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = "01";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [
    { name: "commonName", value: "localhost" },
    { name: "countryName", value: "US" },
    { shortName: "ST", value: "California" },
    { name: "localityName", value: "San Francisco" },
    { name: "organizationName", value: "My Company" },
    { shortName: "OU", value: "Test" },
  ];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.setExtensions([
    { name: "basicConstraints", cA: true },
    {
      name: "keyUsage",
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true,
    },
    {
      name: "extKeyUsage",
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true,
    },
    { name: "nsCertType", client: true, server: true },
    { name: "subjectAltName", altNames: [{ type: 2, value: "localhost" }] },
    { name: "subjectKeyIdentifier" },
  ]);

  cert.sign(keys.privateKey);

  const keyPem = pki.privateKeyToPem(keys.privateKey);
  const certPem = pki.certificateToPem(cert);

  await fs.writeFile(keyPath, keyPem);
  await fs.writeFile(certPath, certPem);

  logger.info("SSL/TLS certificates generated.");
  return certPath;
}
