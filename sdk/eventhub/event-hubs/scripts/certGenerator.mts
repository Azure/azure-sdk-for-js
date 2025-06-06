// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { promises as fs } from "node:fs";
import { resolve as resolvePath } from "node:path";
import forge from "node-forge";

export interface GenerateCertsOptions {
  /** Directory to write certs to. */
  certsDirectory: string;
  /** Validity period in days. */
  days?: number;
  /** Subject for the root CA, in “/C=US/ST=State/L=Local/O=Org/CN=Name” form. */
  rootSubject?: string;
  /** Subject for the server cert, in the same form. */
  serverSubject?: string;
}

function parseDN(dn: string): forge.pki.CertificateField[] {
  const parts = dn
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter((p) => p.length > 0);

  const attrs: forge.pki.CertificateField[] = [];

  const keyMap: Record<string, string> = {
    C: "countryName",
    ST: "stateOrProvinceName",
    L: "localityName",
    O: "organizationName",
    OU: "organizationalUnitName",
    CN: "commonName",
  };

  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx < 0) {
      continue;
    }
    const shortKey = part.substring(0, idx).trim();
    const value = part.substring(idx + 1).trim();
    const fieldName = keyMap[shortKey];

    if (fieldName) {
      attrs.push({ name: fieldName, value });
    } else {
      attrs.push({ type: shortKey, value });
    }
  }

  return attrs;
}

/**
 * Generates a root CA and a server certificate signed by it, writing PEM files to disk.
 * @param options - Options for certificate generation.
 */
export async function generateCerts(options: GenerateCertsOptions): Promise<void> {
  const {
    certsDirectory,
    days = 5,
    rootSubject = "/C=US/ST=Washington/L=Seattle/O=Fake Signing Authority/CN=fake.foo",
    serverSubject = "/C=US/ST=Washington/L=Seattle/O=Fake Hubs/CN=localhost",
  } = options;

  await fs.mkdir(certsDirectory, { recursive: true });

  const rootKeys = forge.pki.rsa.generateKeyPair(2048);
  const rootCert = forge.pki.createCertificate();
  rootCert.publicKey = rootKeys.publicKey;
  rootCert.serialNumber = "01";
  rootCert.validity.notBefore = new Date();
  rootCert.validity.notAfter = new Date();
  rootCert.validity.notAfter.setDate(rootCert.validity.notBefore.getDate() + days);

  const rootAttrs = parseDN(rootSubject);
  rootCert.setSubject(rootAttrs);
  rootCert.setIssuer(rootAttrs); // self‐signed

  rootCert.setExtensions([
    { name: "basicConstraints", cA: true },
    { name: "keyUsage", keyCertSign: true, digitalSignature: true, cRLSign: true },
    { name: "subjectKeyIdentifier" },
  ]);

  rootCert.sign(rootKeys.privateKey, forge.md.sha256.create());

  await fs.writeFile(
    resolvePath(certsDirectory, "my-private-root-ca.key.pem"),
    forge.pki.privateKeyToPem(rootKeys.privateKey),
  );
  await fs.writeFile(
    resolvePath(certsDirectory, "my-private-root-ca.crt.pem"),
    forge.pki.certificateToPem(rootCert),
  );

  const serverKeys = forge.pki.rsa.generateKeyPair(2048);
  const serverCert = forge.pki.createCertificate();
  serverCert.publicKey = serverKeys.publicKey;
  serverCert.serialNumber = "02";
  serverCert.validity.notBefore = new Date();
  serverCert.validity.notAfter = new Date();
  serverCert.validity.notAfter.setDate(serverCert.validity.notBefore.getDate() + days);

  const serverAttrs = parseDN(serverSubject);
  serverCert.setSubject(serverAttrs);
  serverCert.setIssuer(rootCert.subject.attributes);

  serverCert.setExtensions([
    { name: "basicConstraints", cA: false },
    { name: "keyUsage", digitalSignature: true, keyEncipherment: true },
    {
      name: "subjectAltName",
      altNames: [{ type: 2, value: "localhost" }],
    },
  ]);

  serverCert.sign(rootKeys.privateKey, forge.md.sha256.create());

  await fs.writeFile(
    resolvePath(certsDirectory, "my-server.key.pem"),
    forge.pki.privateKeyToPem(serverKeys.privateKey),
  );
  await fs.writeFile(
    resolvePath(certsDirectory, "my-server.crt.pem"),
    forge.pki.certificateToPem(serverCert),
  );
}
