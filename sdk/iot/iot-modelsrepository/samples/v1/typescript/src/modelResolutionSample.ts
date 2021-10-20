// Copyright (c) Microsoft.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the use of ModelsRepositoryClient to get models from an endpoint.
 */

import { ModelsRepositoryClient } from "@azure/iot-modelsrepository";

const repositoryEndpoint = "https://devicemodels.azure.com";
const dtmi = "dtmi:azure:DeviceManagement:DeviceInformation;1";

console.log(repositoryEndpoint, dtmi);

async function main() {
   // When no URI is provided for instantiation, the Azure IoT Models Repository global endpoint
  // https://devicemodels.azure.com/ is used and the model dependency resolution
  // configuration is enabled.
  // Metadata configuration options can be provided to the constructor to determine if,
  // and how often, the client fetches metdata for the repository. In this example,
  // metadata fetching is enabled, and has a timeout of 1 hour.
  const client = new ModelsRepositoryClient({ 
    repositoryLocation: repositoryEndpoint,
    metadata: {
      enabled: true,
      expirationInHours: 1 
    }
  });
  const result = await client.getModels(dtmi, { dependencyResolution: "enabled" });
  Object.keys(result).forEach((fetchedDtmi) => {
    const currentDtdl = result[fetchedDtmi] as any;
    console.log("------------------------------------------------");
    console.log(`DTMI is: ${fetchedDtmi}`);
    console.log(`DTDL Display Name is: ${currentDtdl.displayName}`);
    console.log(`DTDL Description is: ${currentDtdl.description}`);
    console.log("------------------------------------------------");
    console.log(JSON.stringify(result[fetchedDtmi]));
    console.log("------------------------------------------------");
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
