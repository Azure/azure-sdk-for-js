// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export const endpoint = process.env.COSMOS_ENDPOINT || "https://localhost:8081/";
export const key =
  process.env.COSMOS_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

if (endpoint.includes("https://localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export const database = "NodeSamples";
export const container = "Data";
