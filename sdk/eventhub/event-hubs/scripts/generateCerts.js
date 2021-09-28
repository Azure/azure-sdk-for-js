// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { execFileSync } = require("child_process");
const { mkdirSync } = require("fs");
const { resolve: resolvePath } = require("path");

const cwd = process.cwd();
const certsDirectory = resolvePath(cwd, "certs");

// Create `certs` directory.
console.log(`Creating ${certsDirectory}`);
try {
  mkdirSync(certsDirectory);
} catch (err) {
  if (err.code !== "EEXIST") {
    throw err;
  }
}

// Create own Root Certificate Authority
execFileSync("openssl", [
  "genrsa",
  "-out",
  `${resolvePath(certsDirectory, "my-private-root-ca.key.pem")}`,
  "2048"
]);

// Self-sign Root Certificate Authority
execFileSync("openssl", [
  "req",
  "-x509",
  "-new",
  "-nodes",
  "-key",
  `${resolvePath(certsDirectory, "my-private-root-ca.key.pem")}`,
  "-days",
  "5",
  "-out",
  `${resolvePath(certsDirectory, "my-private-root-ca.crt.pem")}`,
  "-subj",
  "/C=US/ST=Washington/L=Seattle/O=Fake Signing Authority/CN=fake.foo"
]);

// Create a certificate for localhost
execFileSync("openssl", [
  "genrsa",
  "-out",
  `${resolvePath(certsDirectory, "my-server.key.pem")}`,
  "2048"
]);

// Create a request which the Root Certificate Authority will sign
execFileSync("openssl", [
  "req",
  "-new",
  "-key",
  `${resolvePath(certsDirectory, "my-server.key.pem")}`,
  "-out",
  `${resolvePath(certsDirectory, "my-server.csr.pem")}`,
  "-subj",
  "/C=US/ST=Washington/L=Seattle/O=Fake Hubs/CN=localhost"
]);

// Sign the request with the Root Certificate Authority
execFileSync("openssl", [
  "x509",
  "-req",
  "-in",
  `${resolvePath(certsDirectory, "my-server.csr.pem")}`,
  "-CA",
  `${resolvePath(certsDirectory, "my-private-root-ca.crt.pem")}`,
  "-CAkey",
  `${resolvePath(certsDirectory, "my-private-root-ca.key.pem")}`,
  "-CAcreateserial",
  "-out",
  `${resolvePath(certsDirectory, "my-server.crt.pem")}`,
  "-days",
  "5"
]);

console.log(`Certs created.`);
