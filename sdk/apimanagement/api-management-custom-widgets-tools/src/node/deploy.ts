// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Config } from "./CustomWidgetBlobService.js";
import CustomWidgetBlobService from "./CustomWidgetBlobService.js";
import { APIM_CONFIG_FILE_NAME } from "../paths.js";
import fs from "node:fs";
import getStorageSasUrl from "./getStorageSasUrl.js";
import readdir from "./readdir.js";
import type { DeployConfig, ServiceInformation } from "./types.js";
import { writeStdout } from "./stdio.js";

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
  writeStdout("\n\n");
  writeStdout("Starting deploy process of custom widget: " + name);
  writeStdout("Please, sign in to your Azure account when prompted\n");

  const blobStorageUrl = await getStorageSasUrl(
    serviceInformation,
    interactiveBrowserCredentialOptions,
  );
  const customWidgetBlobService = new CustomWidgetBlobService(blobStorageUrl, name);

  let config: Config | undefined;
  try {
    writeStdout("Looking for config file in the Azure blob storage");
    config = await customWidgetBlobService.getConfig();
  } catch (e) {
    writeStdout("Config not found.");
  }
  if (!config) {
    writeStdout("Looking for a local config file in: " + fallbackConfigPath);
    config = JSON.parse(fs.readFileSync(fallbackConfigPath).toString());
  }
  if (!config) {
    throw new Error("Config file could not be loaded.");
  }

  writeStdout("Config file loaded\n");

  const files = readdir("", rootLocal);

  writeStdout("Starting upload of data files from the '" + rootLocal + "' folder\n");

  await customWidgetBlobService.cleanDataDir();

  const promises: Promise<void>[] = [];
  files.forEach((file) => {
    const content = fs.readFileSync(rootLocal + file);
    const promise = customWidgetBlobService
      .uploadWidgetDataFile(file, content)
      .then(() => writeStdout("Uploaded file: " + file));
    promises.push(promise);
  });
  await Promise.all(promises);

  writeStdout(files.length + " files has been uploaded\n");

  config.deployedOn = new Date();
  await customWidgetBlobService.uploadConfig(config);
  writeStdout("Uploaded updated config");
}

export default deploy;
