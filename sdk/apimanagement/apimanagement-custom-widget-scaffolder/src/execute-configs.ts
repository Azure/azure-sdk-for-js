import inquirer from "inquirer"
import {TConfigs, TDeployConfig, technologies, TMiscConfig, TWidgetConfig} from "./scaffolding"

export const prefixUrlProtocol = (value: string) => (/https?:\/\//.test(value) ? value : `https://${value}`)

const validateRequired =
  (msg: string = "This field is required.") =>
    (value: unknown) =>
      (value != undefined && value != "") || msg

type ReplaceTypesPreserveOptional<T extends Record<any, any>, V> = {
  [Key in keyof T]: T[Key] extends undefined ? V | undefined : V
}

export type TValidateFnc = (input: string) => boolean | string
export type TValidate<C extends TConfigs> = ReplaceTypesPreserveOptional<C, TValidateFnc>

export const validateWidgetConfig: TValidate<TWidgetConfig> = {
  displayName: validateRequired(),
  tech: input => {
    const required = validateRequired()(input)
    if (required !== true) return required

    if (technologies.includes(input as any)) return true
    else return "Invalid tech. Must be one of: " + technologies.join(", ")
  },
}

export const validateDeployConfig: TValidate<TDeployConfig> = {
  resourceId: input => {
    const required = validateRequired()(input)
    if (required !== true) return required

    const regex =
      /\/?subscriptions\/[^\/]+\/resourceGroups\/[^\/]+\/providers\/Microsoft\.ApiManagement\/service\/[^\/]+\/?/
    return regex.test(input)
      ? true
      : "resourceId does not satisfy required format: subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ApiManagement/service/<service-name>"
  },
  managementApiEndpoint: validateRequired(),
  apiVersion: validateRequired(),
}

export const validateMiscConfig: TValidate<TMiscConfig> = {
  openUrl: input => {
    if (!input) return true

    try {
      new URL(prefixUrlProtocol(input))
      return true
    } catch (e) {
      return `${prefixUrlProtocol(input)} is not a valid URL`
    }
  },
}

export const promptWidgetConfig = (partial: Partial<TWidgetConfig>) =>
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
          {name: "TypeScript", value: "typescript"},
          {name: "React", value: "react"},
        ], // , {name: "Vue", disabled: "Coming soon"}],
      },
    ],
    partial
  )

export const promptDeployConfig = (partial: Partial<TDeployConfig>) =>
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
        validate: validateDeployConfig.managementApiEndpoint,
      },
      {
        name: "apiVersion",
        type: "input",
        message: "apiVersion:",
        default: "2019-01-01",
        validate: validateDeployConfig.apiVersion,
      },
    ],
    partial
  )

export const promptMiscConfig = (partial: Partial<TMiscConfig>) =>
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
  )
