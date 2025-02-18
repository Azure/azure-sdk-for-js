// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import forge from "node-forge";
import path from "path";
import * as fs from "fs/promises";
import os from "os";
import { logger } from "./logger.mjs";

export interface CertPaths {
  keyPath: string;
  certPath: string;
}

export async function generateCertificates(): Promise<CertPaths> {
  const paths = await helper();
  process.env.NODE_EXTRA_CA_CERTS = paths.certPath;
  logger.info(`NODE_EXTRA_CA_CERTS set to ${paths.certPath}`);
  return paths;
}

async function helper(): Promise<CertPaths> {
  // Create a temporary subfolder for our certificates.
  const tmpDir = path.join(os.tmpdir(), "azure-webpubsub-simulator");
  await fs.mkdir(tmpDir, { recursive: true });
  const keyPath = path.resolve(tmpDir, "key.pem");
  const certPath = path.resolve(tmpDir, "cert.pem");

  try {
    await fs.stat(keyPath);
    await fs.stat(certPath);
    logger.info("SSL/TLS certificates already exist.");
    return { keyPath, certPath };
  } catch {
    // Ignore error and proceed to generate certificates.
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
  return { keyPath, certPath };
}
