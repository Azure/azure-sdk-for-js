#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  prefixUrlProtocol,
  promptDeployConfig,
  promptMiscConfig,
  promptWidgetConfig,
  validateDeployConfig,
  validateMiscConfig,
  validateWidgetConfig,
} from "./execute-configs";

import { buildGetConfig, TLog } from "./execute-helpers";
import chalk from "chalk";
import { generateProject } from "../generateProject";

const log = console.log;
const white: TLog = (msg) => log(chalk.white(msg));
const green: TLog = (msg) => log(chalk.green(msg));
const red: TLog = (msg) => log(chalk.red(msg));
const gray: TLog = (msg) => log(chalk.gray(msg));

async function main(): Promise<void> {
  green("\nWelcome to generator of Custom Widgets for Azure API Management service!\n");

  const getConfig = buildGetConfig(gray, red);

  white("First, basic information about your widget");
  const widgetConfig = await getConfig(promptWidgetConfig, validateWidgetConfig);
  white("Now information about your DevPortal");
  const deployConfig = await getConfig(promptDeployConfig, validateDeployConfig);
  white("Optional open url");
  const miscConfig = await getConfig(promptMiscConfig, validateMiscConfig);

  if (deployConfig.resourceId[0] === "/") {
    deployConfig.resourceId = deployConfig.resourceId.slice(1);
  }
  if (deployConfig.resourceId.slice(-1) === "/") {
    deployConfig.resourceId = deployConfig.resourceId.slice(0, -1);
  }

  deployConfig.managementApiEndpoint = prefixUrlProtocol(deployConfig.managementApiEndpoint);

  miscConfig.openUrl = miscConfig.openUrl
    ? prefixUrlProtocol(miscConfig.openUrl)
    : miscConfig.openUrl;

  return generateProject(widgetConfig, deployConfig, miscConfig)
    .then(() => green("\nYour project has been generated successfully!\n"))
    .catch(console.error);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
