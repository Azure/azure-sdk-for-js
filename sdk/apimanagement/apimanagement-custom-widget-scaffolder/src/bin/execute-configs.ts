// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TConfigs, TDeployConfig, TMiscConfig, TWidgetConfig, technologies } from "../scaffolding";

import inquirer from "inquirer";

export const prefixUrlProtocol = (value: string): string =>
  /https?:\/\//.test(value) ? value : `https://${value}`;

const validateRequired =
  (msg: string = "This field is required.") =>
  (input: unknown) =>
    (input != null && input !== "") || msg;

const validateUrl =
  (msg = (input: string) => `${prefixUrlProtocol(input)} is not a valid URL`) =>
  (input: string) => {
    try {
      new URL(prefixUrlProtocol(input));
      return true;
    } catch (e) {
      return msg(prefixUrlProtocol(input));
    }
  };

type ReplaceTypesPreserveOptional<T extends Record<any, any>, V> = {
  [Key in keyof T]: T[Key] extends undefined ? V | undefined : V;
};

export type TValidateFnc = (input: string) => boolean | string;
export type TValidate<C extends TConfigs> = ReplaceTypesPreserveOptional<C, TValidateFnc>;

export const validateWidgetConfig: TValidate<TWidgetConfig> = {
  displayName: validateRequired(),
  tech: (input) => {
    const required = validateRequired()(input);
    if (required !== true) return required;

    if (technologies.includes(input as any)) return true;
    else return "Invalid tech. Must be one of: " + technologies.join(", ");
  },
};

export const validateDeployConfig: TValidate<TDeployConfig> = {
  resourceId: (input) => {
    const required = validateRequired()(input);
    if (required !== true) return required;

    const regex =
      /^\/?subscriptions\/[^/]+\/resourceGroups\/[^/]+\/providers\/Microsoft\.ApiManagement\/service\/[^/]+\/?$/;
    return input === "test" || regex.test(input)
      ? true
      : "resourceId does not satisfy required format: subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ApiManagement/service/<service-name>";
  },
  managementApiEndpoint: (input) => {
    const required = validateRequired()(input);
    if (required !== true) return required;

    return validateUrl()(input);
  },
};

export const validateMiscConfig: TValidate<TMiscConfig> = {
  openUrl: (input) => {
    if (!input) return true;
    return validateUrl()(input);
  },
};

export const promptWidgetConfig = (partial: Partial<TWidgetConfig>): Promise<TWidgetConfig> =>
  inquirer.prompt(
    [
      {
        name: "displayName",
        type: "input",
        message: "Enter name of your widget:",
        validate: validateWidgetConfig.displayName,
      },
      {
        name: "tech",
        type: "list",
        message: "What technology do you want to use?",
        choices: [
          { name: "TypeScript", value: "typescript" },
          { name: "React", value: "react" },
        ], // , {name: "Vue", disabled: "Coming soon"}],
      },
    ],
    partial
  );

export const promptDeployConfig = (partial: Partial<TDeployConfig>): Promise<TDeployConfig> =>
  inquirer.prompt(
    [
      {
        name: "resourceId",
        type: "input",
        message: "resourceId:",
        validate: validateDeployConfig.resourceId,
      },
      {
        name: "managementApiEndpoint",
        type: "input",
        message: "managementApiEndpoint:",
        default: "management.azure.com",
        transformer: prefixUrlProtocol,
        validate: validateDeployConfig.managementApiEndpoint,
      },
      {
        name: "apiVersion",
        type: "input",
        message: "apiVersion override (optional):",
      },
    ],
    partial
  );

export const promptMiscConfig = (partial: Partial<TMiscConfig>): Promise<TMiscConfig> =>
  inquirer.prompt(
    [
      {
        name: "openUrl",
        type: "input",
        message: "openUrl (optional):",
        transformer: prefixUrlProtocol,
        validate: validateMiscConfig.openUrl,
      },
    ],
    partial
  );
