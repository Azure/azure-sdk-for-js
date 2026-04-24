#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Log } from "./execute-helpers.js";
import { buildGetConfig } from "./execute-helpers.js";
import {
  prefixUrlProtocol,
  promptServiceInformation,
  promptMiscConfig,
  promptWidgetConfig,
  validateDeployConfig,
  validateMiscConfig,
  validateWidgetConfig,
} from "./execute-configs.js";
import chalk from "chalk";
import { generateProject } from "../generateProject.js";
import { writeStdout, writeUnknownError } from "./stdio.js";

const white: Log = (msg) => writeStdout(chalk.white(msg));
const green: Log = (msg) => writeStdout(chalk.green(msg));
const red: Log = (msg) => writeStdout(chalk.red(msg));
const gray: Log = (msg) => writeStdout(chalk.gray(msg));

async function main(): Promise<void> {
  green(
    "\nThis tool generates code scaffold for custom widgets in the Azure API Management’s developer portal. Learn more at https://aka.ms/apimdocs/portal/customwidgets.\n",
  );

  const getConfig = buildGetConfig(gray, red);

  white("Specify the custom widget configuration.");
  const widgetConfig = await getConfig(promptWidgetConfig, validateWidgetConfig);
  white("Specify the Azure API Management service configuration.");
  const serviceInformation = await getConfig(promptServiceInformation, validateDeployConfig);
  white("Specify other options");
  const miscConfig = await getConfig(promptMiscConfig, validateMiscConfig);

  if (serviceInformation.resourceId[0] === "/") {
    serviceInformation.resourceId = serviceInformation.resourceId.slice(1);
  }
  if (serviceInformation.resourceId.slice(-1) === "/") {
    serviceInformation.resourceId = serviceInformation.resourceId.slice(0, -1);
  }
  if (serviceInformation.apiVersion === "") {
    delete serviceInformation.apiVersion;
  }

  serviceInformation.managementApiEndpoint = prefixUrlProtocol(
    serviceInformation.managementApiEndpoint,
  );

  miscConfig.openUrl = miscConfig.openUrl
    ? prefixUrlProtocol(miscConfig.openUrl)
    : miscConfig.openUrl;

  return generateProject(widgetConfig, serviceInformation, miscConfig)
    .then(() => green("\nThe custom widget’s code scaffold has been successfully generated.\n"))
    .catch(writeUnknownError);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    writeUnknownError(err);
    process.exit(1);
  });
