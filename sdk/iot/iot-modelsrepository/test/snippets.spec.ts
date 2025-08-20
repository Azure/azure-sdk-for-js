// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ModelsRepositoryClient, getModelUri, isValidDtmi } from "@azure/iot-modelsrepository";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreate_Global", async () => {
    const client = new ModelsRepositoryClient();
    console.log(`Initialized client point to global endpoint: ${client.repositoryLocation}`);
  });

  it("ReadmeSampleCreate_Local", async () => {
    // The client will also work with a local filesystem URI. This example shows initialization
    // with a local URI and disabling model dependency resolution.
    const client = new ModelsRepositoryClient({
      repositoryLocation: "file:///path/to/repository/",
      dependencyResolution: "disabled",
    });
    console.log(`Initialized client pointing to local path: ${client.repositoryLocation}`);
  });

  it("ReadmeSampleGetModels", async () => {
    // Global endpoint client
    const client = new ModelsRepositoryClient();
    // @ts-preserve-whitespace
    // The output of getModels() will include at least the definition for the target dtmi.
    // If the model dependency resolution configuration is not disabled, then models in which the
    // target dtmi depends on will also be included in the returned object (mapping dtmis to model objects).
    const dtmi = "dtmi:com:example:TemperatureController;1";
    const models = await client.getModels(dtmi, { dependencyResolution: "tryFromExpanded" });
    // @ts-preserve-whitespace
    // In this case the above dtmi has 2 model dependencies.
    // dtmi:com:example:Thermostat;1 and dtmi:azure:DeviceManagement:DeviceInformation;1
    console.log(`${dtmi} resolved in ${Object.keys(models).length} interfaces.`);
  });

  it("ReadmeSampleGetModels_Local", async () => {
    // Local sample repository client
    const client = new ModelsRepositoryClient({
      repositoryLocation: "file:///path/to/repository/",
      dependencyResolution: "disabled",
    });
    // @ts-preserve-whitespace
    // The output of getModels() will include at least the definition for the target dtmi.
    // If the model dependency resolution configuration is not disabled, then models in which the
    // target dtmi depends on will also be included in the returned IDictionary<string, string>.
    const dtmi = "dtmi:com:example:TemperatureController;1";
    const models = await client.getModels(dtmi);
    // @ts-preserve-whitespace
    // In this case the above dtmi has 2 model dependencies.
    // dtmi:com:example:Thermostat;1 and dtmi:azure:DeviceManagement:DeviceInformation;1
    console.log(`${dtmi} resolved in {Object.keys(models).length} interfaces.`);
  });

  it("ReadmeSampleGetModels_Multiple", async () => {
    // Global endpoint client
    const client = new ModelsRepositoryClient();
    // @ts-preserve-whitespace
    const dtmis = [
      "dtmi:com:example:TemperatureController;1",
      "dtmi:com:example:azuresphere:sampledevice;1",
    ];
    const models = await client.getModels(dtmis);
    // @ts-preserve-whitespace
    // In this case the dtmi "dtmi:com:example:TemperatureController;1" has 2 model dependencies
    // and the dtmi "dtmi:com:example:azuresphere:sampledevice;1" has no additional dependencies.
    // The returned IDictionary will include 4 models.
    console.log(`${dtmis.toString()} resolved in ${Object.keys(models.keys).length} interfaces.`);
  });

  it("ReadmeSampleDtmiConventions", async () => {
    // This snippet shows how to validate a given DTMI string is well-formed.
    // @ts-preserve-whitespace
    // Returns true
    isValidDtmi("dtmi:com:example:Thermostat;1");
    // @ts-preserve-whitespace
    // Returns false
    isValidDtmi("dtmi:com:example:Thermostat");
  });

  it("ReadmeSampleGetModelUri_Local", async () => {
    // This snippet shows obtaining a fully qualified path to a model file.

    // Local repository example
    const localRepositoryUri: string = "file:///path/to/repository/";
    const fullyQualifiedModelPath: string = getModelUri(
      "dtmi:com:example:Thermostat;1",
      localRepositoryUri,
    );

    // Prints '/path/to/repository/dtmi/com/example/thermostat-1.json'
    console.log(fullyQualifiedModelPath);
  });
  it("ReadmeSampleGetModelUri_Remote", async () => {
    // Remote repository example
    const remoteRepositoryUri: string = "https://contoso.com/models/";
    const fullyQualifiedModelPath: string = getModelUri(
      "dtmi:com:example:Thermostat;1",
      remoteRepositoryUri,
    );

    // Prints 'https://contoso.com/models/dtmi/com/example/thermostat-1.json'
    console.log(fullyQualifiedModelPath);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
