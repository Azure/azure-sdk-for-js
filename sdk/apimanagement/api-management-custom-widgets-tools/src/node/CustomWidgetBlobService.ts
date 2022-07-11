// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {BlockBlobUploadResponse, ContainerClient} from "@azure/storage-blob"
import {buildBlobConfigSrc, buildBlobDataSrc} from "../paths"
import mime from "mime"

type TConfig = Record<string, unknown>

/**
 * A service wrapping ContainerClient class to simplify blob handling
 */
class CustomWidgetBlobService {
  containerClient
  name
  pathWidget
  pathConfig

  /**
   * @param containerClient - a container client of azure storage blob
   * @param name - name of the custom widget to be taken care of
   */
  constructor(containerClient: ContainerClient, name: string) {
    this.containerClient = containerClient
    this.name = name
    this.pathWidget = buildBlobDataSrc(name)
    this.pathConfig = buildBlobConfigSrc(name)
  }

  fileName(path: string): string | undefined {
    return path.split("/").pop()
  }

  async blobUpload(absolutePath: string, content: Buffer): Promise<BlockBlobUploadResponse> {
    const fileName = this.fileName(absolutePath)
    if (!fileName) throw new Error("a fileName was not found in the absolutePath")
    return this.containerClient.getBlockBlobClient(absolutePath)
      .upload(content, content.length, {blobHTTPHeaders: {blobContentType: mime.getType(fileName) || "application/octet-stream"}})
  }

  async jsonUpload(absolutePath: string, json: Record<string, unknown>): Promise<BlockBlobUploadResponse> {
    return this.blobUpload(absolutePath, Buffer.from(JSON.stringify(json)))
  }

  async blobDownload(absolutePath: string): Promise<Buffer> {
    return this.containerClient.getBlockBlobClient(absolutePath).downloadToBuffer()
  }

  async dirDelete(absolutePath: string): Promise<void> {
    for await (const blob of await this.containerClient.listBlobsFlat({prefix: absolutePath})) {
      await this.containerClient.deleteBlob(blob.name)
    }
  }

  async uploadWidgetDataFile(file: string, content: Buffer): Promise<BlockBlobUploadResponse> {
    return this.blobUpload(this.pathWidget + file, content)
  }

  async cleanDataDir(): Promise<void> {
    return this.dirDelete(this.pathWidget)
  }

  async getConfig(): Promise<TConfig> {
    const buffer = await this.blobDownload(this.pathConfig)
    return JSON.parse(buffer.toString())
  }

  async uploadConfig(config: TConfig): Promise<BlockBlobUploadResponse> {
    return this.jsonUpload(this.pathConfig, config)
  }
}

export default CustomWidgetBlobService
