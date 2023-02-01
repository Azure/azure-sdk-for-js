#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Log, buildGetConfig } from "./execute-helpers";
import {
  prefixUrlProtocol,
  promptDeployConfig,
  promptMiscConfig,
  promptWidgetConfig,
  validateDeployConfig,
  validateMiscConfig,
  validateWidgetConfig,
} from "./execute-configs";

import chalk from "chalk";
import { generateProject } from "../generateProject";

const log = console.log;
const white: Log = (msg) => log(chalk.white(msg));
const green: Log = (msg) => log(chalk.green(msg));
const red: Log = (msg) => log(chalk.red(msg));
const gray: Log = (msg) => log(chalk.gray(msg));

async function main(): Promise<void> {
  green(
    "\nThis tool generates code scaffold for custom widgets in the Azure API Management’s developer portal. Learn more at https://aka.ms/apimdocs/portal/customwidgets.\n"
  );

  const getConfig = buildGetConfig(gray, red);

  white("Specify the custom widget configuration.");
  const widgetConfig = await getConfig(promptWidgetConfig, validateWidgetConfig);
  white("Specify the Azure API Management service configuration.");
  const deployConfig = await getConfig(promptDeployConfig, validateDeployConfig);
  white("Specify other options");
  const miscConfig = await getConfig(promptMiscConfig, validateMiscConfig);

  if (deployConfig.resourceId[0] === "/") {
    deployConfig.resourceId = deployConfig.resourceId.slice(1);
  }
  if (deployConfig.resourceId.slice(-1) === "/") {
    deployConfig.resourceId = deployConfig.resourceId.slice(0, -1);
  }
  if (deployConfig.apiVersion === "") {
    delete deployConfig.apiVersion;
  }

  deployConfig.managementApiEndpoint = prefixUrlProtocol(deployConfig.managementApiEndpoint);

  miscConfig.openUrl = miscConfig.openUrl
    ? prefixUrlProtocol(miscConfig.openUrl)
    : miscConfig.openUrl;

  return generateProject(widgetConfig, deployConfig, miscConfig)
    .then(() => green("\nThe custom widget’s code scaffold has been successfully generated.\n"))
    .catch(console.error);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
