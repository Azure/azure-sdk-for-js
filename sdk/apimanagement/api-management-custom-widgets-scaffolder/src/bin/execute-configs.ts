// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Configs, DeploymentConfig, Options, TECHNOLOGIES, WidgetConfig } from "../scaffolding";

import inquirer from "inquirer";

export const fieldIdToName: Record<
  keyof (WidgetConfig & DeploymentConfig & Options) | string,
  string
> = {
  displayName: "Widget display name",
  technology: "Technology",
  iconUrl: "iconUrl",

  resourceId:
    "Azure API Management resource ID (following format: subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ApiManagement/service/<api-management service-name>)",
  managementApiEndpoint: "Management API hostname",
  apiVersion: "Management API version",

  openUrl: "Developer portal URL",
};

export const prefixUrlProtocol = (value: string): string =>
  /https?:\/\//.test(value) ? value : `https://${value}`;

const validateRequired =
  (name: string, msg: string = `The “${name}” parameter is required.`) =>
  (input: unknown) =>
    (input != null && input !== "") || msg;

const validateUrl =
  (
    name: string,
    msg = (input: string) =>
      `Provided “${name}” parameter value (“${prefixUrlProtocol(
        input
      )}”) isn’t a valid URL. Use the correct URL format, e.g., https://contoso.com.`
  ) =>
  (input: string) => {
    try {
      new URL(prefixUrlProtocol(input));
      return true;
    } catch (e) {
      return msg(prefixUrlProtocol(input));
    }
  };

export type ReplaceTypesPreserveOptional<T extends Record<any, any>, V> = {
  [Key in keyof T]: T[Key] extends undefined ? V | undefined : V;
};

export type ValidateFnc = (input: string) => boolean | string;
export type Validate<C extends Configs> = ReplaceTypesPreserveOptional<C, ValidateFnc>;

export const validateWidgetConfig: Validate<WidgetConfig> = {
  displayName: validateRequired(fieldIdToName.displayName),
  technology: (input) => {
    const required = validateRequired(fieldIdToName.technology)(input);
    if (required !== true) return required;

    if (TECHNOLOGIES.includes(input as any)) {
      return true;
    } else {
      return (
        "Provided “technology” parameter value isn’t correct. Use one of the following: " +
        TECHNOLOGIES.join(", ")
      );
    }
  },
};

export const validateDeployConfig: Validate<DeploymentConfig> = {
  resourceId: (input) => {
    const required = validateRequired(fieldIdToName.resourceId)(input);
    if (required !== true) return required;

    const regex =
      /^\/?subscriptions\/[^/]+\/resourceGroups\/[^/]+\/providers\/Microsoft\.ApiManagement\/service\/[^/]+\/?$/;
    return input === "test" || regex.test(input)
      ? true
      : "Resource ID needs to be a valid Azure resource ID. For example, subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-group/providers/Microsoft.ApiManagement/service/contoso-apis.";
  },
  managementApiEndpoint: (input) => validateRequired(fieldIdToName.managementApiEndpoint)(input),
};

export const validateMiscConfig: Validate<Options> = {
  openUrl: (input) => {
    if (!input) return true;
    return validateUrl(fieldIdToName.openUrl)(input);
  },
};

export const promptWidgetConfig = (partial: Partial<WidgetConfig>): Promise<WidgetConfig> =>
  inquirer.prompt(
    [
      {
        name: "displayName",
        type: "input",
        message: fieldIdToName.displayName,
        validate: validateWidgetConfig.displayName,
      },
      {
        name: "technology",
        type: "list",
        message: fieldIdToName.technology,
        choices: [
          { name: "React", value: "react" },
          { name: "Vue", value: "vue" },
          { name: "TypeScript", value: "typescript" },
        ],
      },
    ],
    partial
  );

export const promptDeployConfig = (partial: Partial<DeploymentConfig>): Promise<DeploymentConfig> =>
  inquirer.prompt(
    [
      {
        name: "resourceId",
        type: "input",
        message: fieldIdToName.resourceId,
        validate: validateDeployConfig.resourceId,
      },
      {
        name: "managementApiEndpoint",
        type: "list",
        message: fieldIdToName.managementApiEndpoint,
        choices: [
          {
            name: "management.azure.com (if you're not sure what to select, use this option)",
            value: "management.azure.com",
          },
          { name: "management.usgovcloudapi.net", value: "management.usgovcloudapi.net" },
          { name: "management.chinacloudapi.cn", value: "management.chinacloudapi.cn" },
        ],
        transformer: prefixUrlProtocol,
        validate: validateDeployConfig.managementApiEndpoint,
      },
      {
        name: "apiVersion",
        type: "input",
        message: fieldIdToName.apiVersion + " (optional; e.g., 2021-08-01)",
      },
    ],
    partial
  );

export const promptMiscConfig = (partial: Partial<Options>): Promise<Options> =>
  inquirer.prompt(
    [
      {
        name: "openUrl",
        type: "input",
        message:
          fieldIdToName.openUrl +
          " for widget development and testing (optional; e.g., https://contoso.developer.azure-api.net/ or http://localhost:8080)",
        transformer: prefixUrlProtocol,
        validate: validateMiscConfig.openUrl,
      },
    ],
    partial
  );
