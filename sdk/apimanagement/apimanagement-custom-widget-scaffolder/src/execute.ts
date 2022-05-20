import inquirer from "inquirer"
import chalk from "chalk"
import {generateProject} from "./scaffolding"

const log = console.log
const blue = (msg: string) => log(chalk.blue(msg))
const green = (msg: string) => log(chalk.green(msg))

const validateRequired =
  (msg: string = "This field is required.") =>
  (value: any) =>
    !!value.length || msg

async function main() {
  green("Welcome to the Custom Widget generator!")
  blue("First basic information about your widget")

  const customWidgetConfig = await inquirer.prompt([
    {
      name: "displayName",
      type: "input",
      message: "Enter name of your widget:",
      validate: validateRequired(),
    },
    {
      name: "tech",
      type: "list",
      message: "What technology do you want to use?",
      choices: ["TypeScript", "React", {name: "Vue", disabled: "Coming soon"}],
    },
  ])

  blue("Now information about your DevPortal")

  const urlValuePrefix = "https://"
  const {openUrl, ...configDeploy} = await inquirer.prompt([
    {
      name: "apiVersion",
      type: "input",
      message: "apiVersion: // TODO" ,
      validate: validateRequired(),
    },
    {
      name: "managementApiEndpoint",
      type: "input",
      message: "managementApiEndpoint: // TODO" ,
      validate: validateRequired(),
    },
    {
      name: "resourceGroupName",
      type: "input",
      message: "resourceGroupName: // TODO" ,
      validate: validateRequired(),
    },
    {
      name: "serviceName",
      type: "input",
      message: "serviceName: // TODO" ,
      validate: validateRequired(),
    },
    {
      name: "subscriptionId",
      type: "input",
      message: "subscriptionId: // TODO" ,
      validate: validateRequired(),
    },
    {
      name: "openUrl",
      type: "input",
      message: "openUrl: // TODO" ,
      transformer: (input: string) => `${urlValuePrefix}${input}`,
      validate(input: string) {
        const required = validateRequired()(input)
        if (required !== true) return required

        try {
          new URL(urlValuePrefix + input)
          return true
        } catch (e) {
          return `${urlValuePrefix + input} is not a valid URL`
        }
      },
    },
  ])

  return generateProject(customWidgetConfig, configDeploy, urlValuePrefix + openUrl)
    .then(() => green("Your project has been generated successfully!"))
    .catch(console.error)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
