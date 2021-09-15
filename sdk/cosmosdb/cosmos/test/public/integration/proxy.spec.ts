// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// import * as http from "http";
// import { Context } from "mocha";
// import * as net from "net";
// import { URL } from "url";
// import ProxyAgent from "proxy-agent";
// import { CosmosClient } from "../../../src";
// import { endpoint } from "../common/_testConfig";
// import { masterKey } from "../common/_fakeTestSecrets";
// import { addEntropy } from "../common/TestHelpers";

// const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
// if (!isBrowser()) {
//   describe("Validate http proxy setting in environment variable", function() {
//     const proxy = http.createServer((req, resp) => {
//       resp.writeHead(200, { "Content-Type": "text/plain" });
//       resp.end();
//     });

//     proxy.on("connect", (req, clientSocket, head) => {
//       const serverUrl = new URL(`http://${req.url}`);
//       const serverSocket = net.connect(parseInt(serverUrl.port, 10), serverUrl.hostname, () => {
//         clientSocket.write(
//           "HTTP/1.1 200 Connection Established\r\n" + "Proxy-agent: Node.js-Proxy\r\n" + "\r\n"
//         );
//         serverSocket.write(head);
//         serverSocket.pipe(clientSocket);
//         clientSocket.pipe(serverSocket);
//       });
//     });

//     const proxyPort = 8989;
//     const agent = new ProxyAgent(`http://127.0.0.1:${8989}`) as any;

//     it("nativeApi Client Should successfully execute request", async function() {
//       return new Promise((resolve) => {
//         proxy.listen(proxyPort, "127.0.0.1", async () => {
//           try {
//             const client = new CosmosClient({
//               endpoint,
//               key: masterKey,
//               agent,
//               connectionPolicy: { enableBackgroundEndpointRefreshing: false }
//             });
//             // create database
//             await client.databases.create({
//               id: addEntropy("ProxyTest")
//             });
//             resolve();
//           } finally {
//             proxy.close();
//           }
//         });
//       });
//     });

//     it("nativeApi Client Should execute request in error while the proxy setting is not correct", async function(this: Context) {
//       this.timeout(process.env.MOCHA_TIMEOUT || 30000);
//       return new Promise((resolve, reject) => {
//         proxy.listen(proxyPort + 1, "127.0.0.1", async () => {
//           try {
//             const client = new CosmosClient({
//               endpoint,
//               key: masterKey,
//               agent,
//               connectionPolicy: { enableBackgroundEndpointRefreshing: false }
//             });
//             // create database
//             await client.databases.create({
//               id: addEntropy("ProxyTest")
//             });
//             reject(
//               new Error("Should create database in error while the proxy setting is not correct")
//             );
//           } catch (err) {
//             resolve();
//           } finally {
//             proxy.close();
//           }
//         });
//       });
//     });
//   });
// }
