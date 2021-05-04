// Copyright (c) Microsoft. 
// Licensed under the MIT license.

import {ModelsRepositoryClient} from "../../../src";

const repositoryEndpoint = "devicemodels.azure.com";
const dtmi = process.argv[2] || "dtmi:azure:DeviceManagement:DeviceInformation;1";

console.log(repositoryEndpoint, dtmi);

async function main() {
  // When no URI is provided for instantiation, the Azure IoT Models Repository global endpoint
  // https://devicemodels.azure.com/ is used and the model dependency resolution
  // configuration is set to TryFromExpanded.
  const client = new ModelsRepositoryClient({repositoryLocation: repositoryEndpoint});
  const result = await client.getModels(dtmi, {dependencyResolution: 'tryFromExpanded'});
  Object.keys(result).forEach((fetchedDtmi) => {
    console.log("------------------------------------------------");
    console.log(`DTMI is: ${fetchedDtmi}`);
    console.log(`DTDL Display Name is: ${result[fetchedDtmi].displayName}`);
    console.log(`DTDL Description is: ${result[fetchedDtmi].description}`);
    console.log("------------------------------------------------");
    console.log(JSON.stringify(result[fetchedDtmi]));
    console.log("------------------------------------------------");
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
