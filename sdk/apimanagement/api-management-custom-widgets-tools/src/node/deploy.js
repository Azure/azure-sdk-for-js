const fs = require("fs")
const {BlobServiceClient} = require("@azure/storage-blob")

const {CONFIG_FILE_NAME} = require("../paths")
const CustomWidgetBlobService = require("./CustomWidgetBlobService")
const getStorageSasUrl = require("./getStorageSasUrl")
const readdir = require("./readdir")

/**
 * Deploys everything from /dist folder to the APIM DevPortals' blob storage.
 *
 * @param {Object} serviceInformation
 * @param {string} serviceInformation.resourceId resource ID of API Management service "subscriptions/[subscription-id]/resourceGroups/[resource-group-name]/providers/Microsoft.ApiManagement/service/[service-name]"
 * @param {string} serviceInformation.managementApiEndpoint URL with protocol (e.g. https://management.azure.com)
 * @param {string} [serviceInformation.apiVersion] optional to override default (e.g. "2019-01-01")
 * @param {string} [serviceInformation.tokenOverride] optional, provides token to use for auth, instead of 'az login' approach

 * @param {string} name name of the widget to be deployed
 * @param {string} fallbackConfigPath local path to the config file (by default "./static/config.msapim.json")
 * @returns {Promise<void>}
 */
async function deploy(serviceInformation, name, fallbackConfigPath = "./static/" + CONFIG_FILE_NAME) {
  console.log("\n\n")
  console.log("Starting deploy process of custom widget: " + name)
  console.log("Please, sign in to your Azure account when prompted\n")

  const container = "content"
  const blobStorageUrl = await getStorageSasUrl(serviceInformation)
  const blobServiceClient = new BlobServiceClient(blobStorageUrl.replace(`/${container}`, ""))
  const containerClient = blobServiceClient.getContainerClient(container)
  const customWidgetBlobService = new CustomWidgetBlobService(containerClient, name)

  let config
  try {
    console.log("Looking for config file in the Azure blob storage")
    config = await customWidgetBlobService.getConfig()
  } catch (e) { }
  if (!config) {
    console.log("Config not found. Looking for a local config file in: " + fallbackConfigPath)
    config = JSON.parse(fs.readFileSync(fallbackConfigPath).toString())
  }

  console.log("Config file loaded\n")

  const rootLocal = "./dist/"
  const files = readdir("", rootLocal)

  console.log("Starting upload of data files from the '" + rootLocal + "' folder\n")

  await customWidgetBlobService.cleanDataDir()

  const promises = []
  files.forEach(file => {
    const content = fs.readFileSync(rootLocal + file)
    const promise = customWidgetBlobService.uploadWidgetDataFile(file, content)
      .then(() => console.log("Uploaded file: " + file))
    promises.push(promise)
  })
  await Promise.all(promises)

  console.log(files.length + " files has been uploaded\n")

  config.deployed = new Date()
  await customWidgetBlobService.uploadConfig(config)
  console.log("Uploaded updated config")
}

module.exports = deploy
