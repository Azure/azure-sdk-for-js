// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import CustomWidgetBlobService, { Config } from "./CustomWidgetBlobService.js";
import { InteractiveBrowserCredentialNodeOptions } from "@azure/identity";
import { APIM_CONFIG_FILE_NAME } from "../paths.js";
import fs from "node:fs";
import getStorageSasUrl from "./getStorageSasUrl.js";
import readdir from "./readdir.js";

/**
 * resourceId - resource ID of API Management service "subscriptions/[subscription-id]/resourceGroups/[resource-group-name]/providers/Microsoft.ApiManagement/service/[service-name]"
 * managementApiEndpoint - URL with protocol (e.g. https://management.azure.com)
 * apiVersion - optional to override default (e.g. "2019-01-01")
 * tokenOverride - optional, provides token to use for auth, instead of 'az login' approach
 */
export type ServiceInformation = {
  resourceId: string;
  managementApiEndpoint: string;
  apiVersion?: string;
  tokenOverride?: string;
};

/**
 * Optional options object for configuring the deployment function.
 *
 * @param rootLocal - optional, root of the local folder with compiled project to be exported (by default "./dist")
 * @param interactiveBrowserCredentialOptions - options for InteractiveBrowserCredential for Node or InBrowser from \@azure/identity
 */
export type DeployConfig = {
  rootLocal?: string;
  interactiveBrowserCredentialOptions?: InteractiveBrowserCredentialNodeOptions;
};

/**
 * Deploys everything from /dist folder to the API Management DevPortals' blob storage.
 *
 * @param serviceInformation - service information for deployment
 * @param name - name of the widget to be deployed
 * @param fallbackConfigPath - local path to the config file (by default "./static/config.msapim.json")
 * @param config - optional config object
 */
async function deploy(
  serviceInformation: ServiceInformation,
  name: string,
  fallbackConfigPath = "./static/" + APIM_CONFIG_FILE_NAME,
  {
    rootLocal = "./dist/",
    interactiveBrowserCredentialOptions = { redirectUri: "http://localhost:1337" },
  }: DeployConfig = {},
): Promise<void> {
  console.log("\n\n");
  console.log("Starting deploy process of custom widget: " + name);
  console.log("Please, sign in to your Azure account when prompted\n");

  const blobStorageUrl = await getStorageSasUrl(
    serviceInformation,
    interactiveBrowserCredentialOptions,
  );
  const customWidgetBlobService = new CustomWidgetBlobService(blobStorageUrl, name);

  let config: Config | undefined;
  try {
    console.log("Looking for config file in the Azure blob storage");
    config = await customWidgetBlobService.getConfig();
  } catch (e) {
    console.log("Config not found.");
  }
  if (!config) {
    console.log("Looking for a local config file in: " + fallbackConfigPath);
    config = JSON.parse(fs.readFileSync(fallbackConfigPath).toString());
  }
  if (!config) {
    throw new Error("Config file could not be loaded.");
  }

  console.log("Config file loaded\n");

  const files = readdir("", rootLocal);

  console.log("Starting upload of data files from the '" + rootLocal + "' folder\n");

  await customWidgetBlobService.cleanDataDir();

  const promises: Promise<void>[] = [];
  files.forEach((file) => {
    const content = fs.readFileSync(rootLocal + file);
    const promise = customWidgetBlobService
      .uploadWidgetDataFile(file, content)
      .then(() => console.log("Uploaded file: " + file));
    promises.push(promise);
  });
  await Promise.all(promises);

  console.log(files.length + " files has been uploaded\n");

  config.deployedOn = new Date();
  await customWidgetBlobService.uploadConfig(config);
  console.log("Uploaded updated config");
}

export default deploy;
