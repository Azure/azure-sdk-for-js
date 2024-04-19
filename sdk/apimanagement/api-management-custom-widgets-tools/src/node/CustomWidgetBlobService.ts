// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlobServiceClient, BlockBlobUploadResponse } from "@azure/storage-blob";
import { buildBlobConfigPath, buildBlobDataPath } from "../paths.js";

export type Config = Record<string, unknown>;

/**
 * A service wrapping ContainerClient class to simplify blob handling
 */
export class CustomWidgetBlobService {
  readonly containerClient;
  readonly name;
  readonly pathWidget;
  readonly pathConfig;

  /**
   * @param blobStorageUrl - blob storage SAS URL
   * @param name - name of the custom widget to be taken care of
   */
  constructor(blobStorageUrl: string, name: string) {
    const container = "content";
    const blobServiceClient = new BlobServiceClient(blobStorageUrl.replace(`/${container}`, ""));
    this.containerClient = blobServiceClient.getContainerClient(container);
    this.name = name;
    this.pathWidget = buildBlobDataPath(name);
    this.pathConfig = buildBlobConfigPath(name);
  }

  private extractFileName(path: string): string | undefined {
    return path.split("/").pop();
  }

  async blobUpload(absolutePath: string, content: Buffer): Promise<BlockBlobUploadResponse> {
    const mimeImport = await import("mime");
    const mime = mimeImport.default;
    const fileName = this.extractFileName(absolutePath);
    if (!fileName) throw new Error("a fileName was not found in the absolutePath");
    return this.containerClient.getBlockBlobClient(absolutePath).upload(content, content.length, {
      blobHTTPHeaders: { blobContentType: mime.getType(fileName) || "application/octet-stream" },
    });
  }

  async jsonUpload(
    absolutePath: string,
    json: Record<string, unknown>,
  ): Promise<BlockBlobUploadResponse> {
    return this.blobUpload(absolutePath, Buffer.from(JSON.stringify(json)));
  }

  async blobDownload(absolutePath: string): Promise<Buffer> {
    return this.containerClient.getBlockBlobClient(absolutePath).downloadToBuffer();
  }

  async dirDelete(absolutePath: string): Promise<void> {
    for await (const blob of await this.containerClient.listBlobsFlat({ prefix: absolutePath })) {
      await this.containerClient.deleteBlob(blob.name);
    }
  }

  async uploadWidgetDataFile(file: string, content: Buffer): Promise<BlockBlobUploadResponse> {
    return this.blobUpload(this.pathWidget + file, content);
  }

  async cleanDataDir(): Promise<void> {
    return this.dirDelete(this.pathWidget);
  }

  async getConfig(): Promise<Config> {
    const buffer = await this.blobDownload(this.pathConfig);
    return JSON.parse(buffer.toString());
  }

  async uploadConfig(config: Config): Promise<BlockBlobUploadResponse> {
    return this.jsonUpload(this.pathConfig, config);
  }
}

export default CustomWidgetBlobService;
