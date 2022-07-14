// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CONFIG_FILE_NAME } from "../paths";
import CustomWidgetBlobService from "./CustomWidgetBlobService";
import { createClientLogger } from "@azure/logger";
import fs from "fs";
import getStorageSasUrl from "./getStorageSasUrl";
import readdir from "./readdir";

/**
 * resourceId - resource ID of API Management service "subscriptions/[subscription-id]/resourceGroups/[resource-group-name]/providers/Microsoft.ApiManagement/service/[service-name]"
 * managementApiEndpoint - URL with protocol (e.g. https://management.azure.com)
 * apiVersion - optional to override default (e.g. "2019-01-01")
 * tokenOverride - optional, provides token to use for auth, instead of 'az login' approach
 */
export type TServiceInformation = {
  resourceId: string;
  managementApiEndpoint: string;
  apiVersion?: string;
  tokenOverride?: string;
};

/**
 * Deploys everything from /dist folder to the API Management DevPortals' blob storage.
 *
 * @param serviceInformation - service information for deployment
 * @param name - name of the widget to be deployed
 * @param fallbackConfigPath - local path to the config file (by default "./static/config.msapim.json")
 */
async function deploy(
  serviceInformation: TServiceInformation,
  name: string,
  fallbackConfigPath = "./static/" + CONFIG_FILE_NAME
): Promise<void> {
  const logger = createClientLogger("deploy");
  logger.info("\n\n");
  logger.info("Starting deploy process of custom widget: " + name);
  logger.info("Please, sign in to your Azure account when prompted\n");

  const blobStorageUrl = await getStorageSasUrl(serviceInformation);
  const customWidgetBlobService = new CustomWidgetBlobService(blobStorageUrl, name);

  let config;
  try {
    logger.info("Looking for config file in the Azure blob storage");
    config = await customWidgetBlobService.getConfig();
  } catch (e) {
    logger.info("Config not found.");
  }
  if (!config) {
    logger.info("Looking for a local config file in: " + fallbackConfigPath);
    config = JSON.parse(fs.readFileSync(fallbackConfigPath).toString());
  }

  logger.info("Config file loaded\n");

  const rootLocal = "./dist/";
  const files = readdir("", rootLocal);

  logger.info("Starting upload of data files from the '" + rootLocal + "' folder\n");

  await customWidgetBlobService.cleanDataDir();

  const promises: Promise<void>[] = [];
  files.forEach((file) => {
    const content = fs.readFileSync(rootLocal + file);
    const promise = customWidgetBlobService
      .uploadWidgetDataFile(file, content)
      .then(() => logger.info("Uploaded file: " + file));
    promises.push(promise);
  });
  await Promise.all(promises);

  logger.info(files.length + " files has been uploaded\n");

  config.deployed = new Date();
  await customWidgetBlobService.uploadConfig(config);
  logger.info("Uploaded updated config");
}

export default deploy;
