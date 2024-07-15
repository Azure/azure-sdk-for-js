// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlockBlobClient } from "@azure/storage-blob";
import Debug from "debug";
import { backOff } from "exponential-backoff";
import fs from "fs";
import { Constants } from "../common/constants";
import ReporterUtils from "./reporterUtils";

const debug = Debug(Constants.DEBUG_NAMESPACE);

export class StorageClient {
  public async uploadFile(uri: string, filePath: string, fileRelativePath: string): Promise<void> {
    const cloudFilepath = this.getCloudFilepath(uri, fileRelativePath);
    const blobClient = new BlockBlobClient(cloudFilepath);
    await blobClient.uploadFile(filePath, { concurrency: 10 });
    debug(`\nUploaded file ${filePath}.`);
    // await this.uploadFileInChunks(blobClient, filePath);
  }

  public async uploadBuffer(uri: string, buffer: string, fileRelativePath: string): Promise<void> {
    const cloudFilepath = this.getCloudFilepath(uri, fileRelativePath);
    const blobClient = new BlockBlobClient(cloudFilepath);
    await blobClient.upload(buffer, buffer.length);
    debug(`\nUploaded buffer to ${fileRelativePath}.`);
  }

  private getCloudFilepath(uri: string, fileRelativePath: string): string {
    // Split the uri on "?" to get the container uri and sas token
    const parts = uri.split(Constants.SAS_URI_SEPARATOR);
    const containerUri = parts[0];
    const sasToken = parts[1];
    return containerUri + "/" + fileRelativePath + "?" + sasToken;
  }

  private async uploadFileInChunks(blobClient: BlockBlobClient, filePath: string): Promise<void> {
    return backOff(async () => {
      const chunkSizeInBytes = 4 * 1024 * 1024; // 4MB
      // Open the file for reading
      const fileStream = fs.createReadStream(filePath);
      let offset = 0;
      let blockId = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const chunk = await this.readChunk(fileStream, chunkSizeInBytes, offset);
        if (chunk === null) {
          // Reached the end of the file
          break;
        }

        const blockIdString = blockId.toString().padStart(5, "0");
        const blockIdBase64 = Buffer.from(blockIdString).toString("base64");

        // Upload the chunk as a block
        await blobClient.stageBlock(blockIdBase64, chunk, chunk.length);

        // Commit the block to the blob
        await blobClient.commitBlockList([blockIdBase64]);

        offset += chunk.length;
        blockId++;
      }
    }, ReporterUtils.getReporterBackOffOptions);
  }

  private readChunk(stream: fs.ReadStream, size: number, offset: number): Promise<Buffer | null> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      let bytesRead = 0;

      stream.on("data", (chunk: Buffer) => {
        if (bytesRead >= offset && bytesRead < offset + size) {
          chunks.push(chunk);
        }
        bytesRead += chunk.length;

        if (bytesRead >= offset + size) {
          stream.pause();
          resolve(Buffer.concat(chunks));
        }
      });

      stream.on("end", () => {
        if (bytesRead > 0) {
          resolve(Buffer.concat(chunks));
        } else {
          resolve(null);
        }
      });

      stream.on("error", (err: Error) => {
        reject(err);
      });
    });
  }
}
