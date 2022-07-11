const mime = require("mime")
const {ContainerClient} = require("@azure/storage-blob")
const {buildBlobDataSrc, buildBlobConfigSrc} = require("../paths")

/**
 * A service wrapping ContainerClient class to simplify blob handling
 */
class CustomWidgetBlobService {
  containerClient
  name
  pathWidget
  pathConfig

  /**
   * @param containerClient {ContainerClient}
   * @param name {string} name of the custom widget to be taken care of
   */
  constructor(containerClient, name) {
    this.containerClient = containerClient
    this.name = name
    this.pathWidget = buildBlobDataSrc(name)
    this.pathConfig = buildBlobConfigSrc(name)
  }

  fileName(path) {
    return path.split("/").pop()
  }

  async blobUpload(absolutePath, content) {
    const fileName = this.fileName(absolutePath)
    return this.containerClient.getBlockBlobClient(absolutePath)
      .upload(content, content.length, {blobHTTPHeaders: {blobContentType: mime.getType(fileName) || "application/octet-stream"}})
  }

  async jsonUpload(absolutePath, json) {
    return this.blobUpload(absolutePath, Buffer.from(JSON.stringify(json)))
  }

  async blobDownload(absolutePath) {
    return this.containerClient.getBlockBlobClient(absolutePath).downloadToBuffer()
  }

  async dirDelete(absolutePath) {
    for await (const blob of await this.containerClient.listBlobsFlat({prefix: absolutePath})) {
      await this.containerClient.deleteBlob(blob.name)
    }
  }

  async uploadWidgetDataFile(file, content) {
    return this.blobUpload(this.pathWidget + file, content)
  }

  async cleanDataDir() {
    return this.dirDelete(this.pathWidget)
  }

  async getConfig() {
    const buffer = await this.blobDownload(this.pathConfig)
    return JSON.parse(buffer.toString())
  }

  async uploadConfig(config) {
    return this.jsonUpload(this.pathConfig, config)
  }
}

module.exports = CustomWidgetBlobService
