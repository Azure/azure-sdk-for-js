import yargsParser from "yargs-parser"
import {hideBin} from "yargs/helpers"
import {TConfigs} from "./scaffolding"
import {TValidate, TValidateFnc} from "./execute-configs"

export const argvToPartialConfig = <TConfig extends TConfigs>(
  argv: yargsParser.Arguments,
  validateConfig: TValidate<TConfig>,
  red: (msg: string) => void
): {configPartial: Partial<TConfig>; missing: boolean} => {
  const configPartial: Partial<TConfig> = {}
  let missing: boolean = false

  Object.entries(validateConfig).forEach(([key, v]) => {
    const validate = v as TValidateFnc
    const value = argv[key]
    const response = validate(value)

    if (response === true) {
      if (value !== undefined) configPartial[key as keyof typeof validateConfig] = value
    } else if (value == undefined) {
      missing = true
    } else {
      missing = true
      red(`"${value}" is not a valid value for "${key}"`)
      if (typeof response === "string") red(response)
    }
  })

  return {configPartial, missing}
}

export const buildGetConfig = (gray: (msg: string) => void, red: (msg: string) => void) => {
  const argv = yargsParser(hideBin(process.argv), {string: ["apiVersion"]})
  return async <TConfig extends TConfigs>(
    promptForConfig: (partial: Partial<TConfig>) => Promise<TConfig>,
    validateConfig: TValidate<TConfig>
  ): Promise<TConfig> => {
    const {configPartial, missing} = argvToPartialConfig(argv, validateConfig, red)

    if (missing || !Object.values(configPartial).length) {
      return promptForConfig(configPartial)
    } else {
      gray("Using config from command line")
      Object.entries(configPartial).forEach(([key, value]) => value != undefined && gray(`${key}: ${value}`))
      return configPartial as TConfig
    }
  }
}
