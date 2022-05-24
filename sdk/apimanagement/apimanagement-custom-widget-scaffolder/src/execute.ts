import chalk from "chalk"
import {generateProject} from "./scaffolding"
import {buildGetConfig} from "./execute-helpers"
import {
  prefixUrlProtocol,
  promptDeployConfig,
  promptMiscConfig,
  promptWidgetConfig,
  validateDeployConfig,
  validateMiscConfig,
  validateWidgetConfig,
} from "./execute-configs"

const log = console.log
const blue = (msg: string) => log(chalk.blue(msg))
const green = (msg: string) => log(chalk.green(msg))
const red = (msg: string) => log(chalk.red(msg))
const gray = (msg: string) => log(chalk.gray(msg))

async function main() {
  green("Welcome to generator of Custom Widgets for Azure API Management service!")

  const getConfig = buildGetConfig(gray, red)

  blue("First, basic information about your widget")
  const widgetConfig = await getConfig(promptWidgetConfig, validateWidgetConfig)
  blue("Now information about your DevPortal")
  const deployConfig = await getConfig(promptDeployConfig, validateDeployConfig)
  blue("Optional open url")
  const miscConfig = await getConfig(promptMiscConfig, validateMiscConfig)

  if (deployConfig.resourceId[0] === "/") deployConfig.resourceId = deployConfig.resourceId.slice(1)
  if (deployConfig.resourceId.slice(-1) === "/") deployConfig.resourceId = deployConfig.resourceId.slice(0, -1)

  deployConfig.managementApiEndpoint = prefixUrlProtocol(deployConfig.managementApiEndpoint)

  miscConfig.openUrl = miscConfig.openUrl ? prefixUrlProtocol(miscConfig.openUrl) : miscConfig.openUrl

  return generateProject(widgetConfig, deployConfig, miscConfig)
    .then(() => green("Your project has been generated successfully!"))
    .catch(console.error)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
