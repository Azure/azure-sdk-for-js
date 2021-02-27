// // Copyright (c) Microsoft Corporation.
// // Licensed under the MIT license.

// import { isNode } from "@azure/core-http";
// import { JsonWebKey } from "../../src/keysModels";
// import assert from "assert";
// import { RsaCryptographyProvider } from "../../src/cryptography/rsaCryptographyProvider";

// describe("local cryptography providers internal tests", () => {
//   describe("RsaLocalCryptographyProvider", () => {
//     let subject: RsaCryptographyProvider; // TODO this needs to be initialized
//     const supportedOperation = "encrypt";

//     describe("ensureValid", () => {
//       describe("nodeOnly", () => {
//         it("throws if we're not in node", async function() {
//           if (isNode) {
//             this.skip();
//           }
//           const jsonWebKey: JsonWebKey = {
//             keyOps: [supportedOperation],
//             kty: "RSA"
//           };
//           // assert.throws(() => subject.ensureValid(supportedOperation, jsonWebKey));
//         });
//       });

//       if (!isNode) {
//         // Local cryptography is only supported in NodeJS
//         return;
//       }
//       it("does not throw when conditions are valid", async function() {
//         const jsonWebKey: JsonWebKey = {
//           keyOps: [supportedOperation],
//           kty: "RSA"
//         };
//         // assert.doesNotThrow(() => subject.ensureValid(supportedOperation, jsonWebKey));
//       });

//       describe("keyOps", () => {
//         it("throws if a key doesn't have a specific operation", async function() {
//           const jsonWebKey: JsonWebKey = {
//             keyOps: [
//               /* No supported operation */
//             ],
//             kty: "RSA"
//           };
//           // assert.throws(() => subject.ensureValid(supportedOperation, jsonWebKey));
//         });
//       });

//       describe("rsa", () => {
//         it("throws if a key type is not RSA", async function() {
//           const jsonWebKey: JsonWebKey = {
//             kty: "EC",
//             keyOps: [supportedOperation]
//           };
//           // assert.throws(() => subject.ensureValid(supportedOperation, jsonWebKey));
//         });
//       });
//     });
//   });
// });
