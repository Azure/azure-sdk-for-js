// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobServiceClient } from "@azure/storage-blob";
import type { TokenCredential } from "@azure/core-auth";
import { coreLogger } from "../common/logger.js";
import { readFileSync, existsSync, writeFileSync, createReadStream } from "fs";
import { join } from "path";
import { UploadConstants } from "../common/constants.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import {
  populateValuesFromServiceUrl,
  calculateOptimalConcurrency,
  collectAllFiles,
} from "./utils.js";
import { PlaywrightServiceConfig } from "../common/playwrightServiceConfig.js";
import type { WorkspaceMetaData } from "../common/types.js";

export class PlaywrightReporterStorageManager {
  async uploadHtmlReportFolder(
    credential: TokenCredential,
    runId: string,
    outputFolder: string,
    workspaceDetails: WorkspaceMetaData,
  ): Promise<void> {
    coreLogger.info(
      `Starting HTML report upload for runId: ${runId}, outputFolder: ${outputFolder}`,
    );
    try {
      coreLogger.info(`Received workspace details: ${JSON.stringify(workspaceDetails, null, 2)}`);

      if (!workspaceDetails.storageUri) {
        throw new Error(ServiceErrorMessageConstants.STORAGE_URI_NOT_FOUND.message);
      }

      coreLogger.info(`Extracting storage account from URI: ${workspaceDetails.storageUri}`);
      const blobServiceClient = new BlobServiceClient(workspaceDetails?.storageUri, credential);
      const serviceUrlInfo = populateValuesFromServiceUrl();
      if (!serviceUrlInfo?.accountId) {
        throw new Error(ServiceErrorMessageConstants.UNABLE_TO_EXTRACT_WORKSPACE_ID.message);
      }

      const containerName = serviceUrlInfo.accountId.toLowerCase().replace(/[^a-z0-9-]/g, "-");
      const containerClient = blobServiceClient.getContainerClient(containerName);

      const containerExists = await containerClient.exists();
      if (!containerExists) {
        await containerClient.create();
        console.log(`Created new container for this workspace: ${containerName}`);
      } else {
        console.log(`Using existing container for this workspace: ${containerName}`);
      }

      const folderName = runId;
      console.log(`Folder created for this run: ${folderName}`);

      await this.modifyIndexHtml(outputFolder);
      await this.uploadSasWorkerFile(containerClient, folderName);
      await this.uploadFolderInParallel(containerClient, outputFolder, outputFolder, folderName);

      console.log(`✅ Successfully uploaded Playwright report for run: ${runId} to Azure Storage.`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      coreLogger.error(`Failed to upload HTML report: ${errorMessage}`);
      throw new Error(
        ServiceErrorMessageConstants.HTML_REPORT_UPLOAD_FAILED.formatWithError(errorMessage),
      );
    }
  }
  private async uploadSasWorkerFile(containerClient: any, folderName: string): Promise<void> {
    coreLogger.info(`Starting sasworker.js upload for folder: ${folderName}`);
    try {
      const sasWorkerPath = join(process.cwd(), "sasworker.js");
      coreLogger.info(`Resolving sasworker.js path: ${sasWorkerPath}`);

      if (!existsSync(sasWorkerPath)) {
        coreLogger.error(`sasworker.js file not found at path: ${sasWorkerPath}`);
        return;
      }
      coreLogger.info(`Found sasworker.js file at: ${sasWorkerPath}`);
      const fileContent = readFileSync(sasWorkerPath);
      const blobName = `${folderName}/sasworker.js`;

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(fileContent, fileContent.length, {
        blobHTTPHeaders: {
          blobContentType: "application/javascript",
        },
      });

      coreLogger.info("✅ Uploaded service worker file as sasworker.js");
    } catch (error) {
      coreLogger.error(
        `Error uploading service worker file: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  private async modifyIndexHtml(outputFolder: string): Promise<void> {
    coreLogger.info(`Starting HTML modification for folder: ${outputFolder}`);
    const indexPath = join(outputFolder, "index.html");

    if (!existsSync(indexPath)) {
      coreLogger.error(`index.html not found at path: ${indexPath}`);
      return;
    }
    coreLogger.info(`Found index.html at: ${indexPath}`);

    try {
      let htmlContent = readFileSync(indexPath, "utf-8");

      // Service worker registration script
      const serviceWorkerScript = `
  <script>
    (async () => {
      if (!('serviceWorker' in navigator)) return;

      const sas = window.location.search;
      const swUrl = './sasworker.js' + sas;     
      const scope = './';                            
      await navigator.serviceWorker.register(swUrl, { scope });
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller && !sessionStorage.getItem('__sw_bootstrap__')) {
        sessionStorage.setItem('__sw_bootstrap__', '1');
        location.reload();
      }
    })();
  </script>`;

      const titleMatch = htmlContent.match(/<\/title>/i);
      if (titleMatch) {
        coreLogger.info(
          `Found title tag, injecting service worker script at position: ${titleMatch.index! + titleMatch[0].length}`,
        );
        const insertPosition = titleMatch.index! + titleMatch[0].length;
        htmlContent =
          htmlContent.slice(0, insertPosition) +
          serviceWorkerScript +
          htmlContent.slice(insertPosition);

        writeFileSync(indexPath, htmlContent, "utf-8");
        coreLogger.info("Successfully wrote modified HTML content to file");
      } else {
        coreLogger.error(
          "Title tag not found in index.html - unable to inject service worker script",
        );
      }
    } catch (error) {
      coreLogger.error(
        `Error modifying index.html: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  //  Uploads the entire Playwright HTML report folder after tests complete.

  async uploadPlaywrightHtmlReportAfterTests(
    outputFolderName?: string,
    workspaceMetadata?: WorkspaceMetaData | null,
  ): Promise<void> {
    coreLogger.info(
      `Starting post-test HTML report upload, folder name: ${outputFolderName || "default (playwright-report)"}`,
    );
    const cred = PlaywrightServiceConfig.instance.credential;
    if (!cred) {
      coreLogger.error("No credential found for authentication");
      throw new Error(ServiceErrorMessageConstants.NO_CRED_ENTRA_AUTH_ERROR.message);
    }
    coreLogger.info("Credential found for authentication");

    const folderName = outputFolderName || "playwright-report";
    const outputFolderPath = join(process.cwd(), folderName);

    if (!existsSync(outputFolderPath)) {
      coreLogger.error(`HTML report folder not found: ${outputFolderPath}`);
      throw new Error(
        ServiceErrorMessageConstants.HTML_REPORT_FOLDER_NOT_FOUND.formatWithFolder(folderName),
      );
    }
    coreLogger.info(`HTML report folder found: ${outputFolderPath}`);

    const testRunId = PlaywrightServiceConfig.instance.runId;
    coreLogger.info(`Starting upload for test run ID: ${testRunId}`);
    await this.uploadHtmlReportFolder(cred, testRunId, outputFolderPath, workspaceMetadata!);
    coreLogger.info(`Completed upload for test run ID: ${testRunId}`);
  }

  // Parallel Upload Engine - Core upload orchestration with performance optimization

  private async uploadFolderInParallel(
    containerClient: any,
    folderPath: string,
    basePath: string,
    runIdFolderPrefix?: string,
  ): Promise<{
    uploadedFiles: string[];
    totalFiles: number;
    totalSize: number;
    uploadTime: number;
  }> {
    // Sort by size descending - upload large files first for better parallelization
    const filesToUpload = collectAllFiles(folderPath, basePath, runIdFolderPrefix).sort(
      (a, b) => b.size - a.size,
    );

    if (filesToUpload.length === 0) {
      return { uploadedFiles: [], totalFiles: 0, totalSize: 0, uploadTime: 0 };
    }

    const totalSize = filesToUpload.reduce((sum, file) => sum + file.size, 0);

    const concurrency = calculateOptimalConcurrency(filesToUpload);
    coreLogger.info(
      `Calculated optimal concurrency: ${concurrency} for ${filesToUpload.length} files (total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB)`,
    );
    const uploadStartTime = Date.now();
    coreLogger.info(`Starting parallel upload with ${concurrency} concurrent operations`);
    const results = await this.uploadWithConcurrencyControl(
      containerClient,
      filesToUpload,
      concurrency,
    );

    const uploadEndTime = Date.now();
    const uploadTime = uploadEndTime - uploadStartTime;
    coreLogger.info(`Upload completed in ${uploadTime}ms (${(uploadTime / 1000).toFixed(2)}s)`);

    const failed = results.filter((r) => r.status === "rejected").length;
    const successful = results.filter((r) => r.status === "fulfilled").length;
    coreLogger.info(
      `Upload results: ${successful} successful, ${failed} failed out of ${results.length} total files`,
    );

    if (failed > 0) {
      const errors = results
        .filter((r): r is PromiseRejectedResult => r.status === "rejected")
        .map((r) => r.reason.message)
        .slice(0, 5); // Show first 5 errors

      errors.forEach((error, index) => {
        coreLogger.error(`   ${index + 1}. ${error}`);
      });

      throw new Error(
        ServiceErrorMessageConstants.UPLOAD_FAILED_MULTIPLE_FILES.formatWithDetails(failed, errors),
      );
    }

    const uploadedFiles = results
      .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
      .map((r) => r.value);

    return {
      uploadedFiles,
      totalFiles: filesToUpload.length,
      totalSize,
      uploadTime,
    };
  }

  // Concurrency Control System - Manages parallel execution with controlled resource usage

  private async uploadWithConcurrencyControl(
    containerClient: any,
    files: Array<{ fullPath: string; relativePath: string; size: number; contentType: string }>,
    concurrency: number,
  ): Promise<PromiseSettledResult<string>[]> {
    const uploadTasks = files.map((fileInfo) => async (): Promise<string> => {
      try {
        await this.uploadSingleFileOptimized(containerClient, fileInfo);
        return fileInfo.relativePath;
      } catch (error) {
        throw new Error(
          `${fileInfo.relativePath}: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    });

    return this.executeWithOptimizedBatching(uploadTasks, concurrency);
  }

  // Optimized Batch Execution Engine - High-performance task processing system

  private async executeWithOptimizedBatching<T>(
    tasks: Array<() => Promise<T>>,
    concurrency: number,
  ): Promise<PromiseSettledResult<T>[]> {
    const results: PromiseSettledResult<T>[] = new Array(tasks.length);
    let completedTasks = 0;

    // Splits tasks into optimal batches to balance memory usage vs. throughput
    const batchSize = Math.min(UploadConstants.BATCH_SIZE, concurrency * 2);
    const batches: Array<Array<() => Promise<T>>> = [];

    // Each batch will be processed with full concurrency before moving to next batch
    for (let i = 0; i < tasks.length; i += batchSize) {
      batches.push(tasks.slice(i, i + batchSize));
    }

    // Process each batch sequentially to maintain memory efficiency
    coreLogger.info(`Processing ${batches.length} batches with ${batchSize} tasks per batch`);
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      const batchStartIndex = batchIndex * batchSize;
      coreLogger.info(
        `Starting batch ${batchIndex + 1}/${batches.length} with ${batch.length} tasks`,
      );

      // Transform each task into a promise that captures results at correct index
      const batchPromises = batch.map(async (task, taskIndex) => {
        const globalIndex = batchStartIndex + taskIndex;
        try {
          const result = await task();
          results[globalIndex] = { status: "fulfilled", value: result };
          return result;
        } catch (error) {
          results[globalIndex] = { status: "rejected", reason: error };
          throw error;
        }
      });

      const executing: Promise<any>[] = [];

      for (const promise of batchPromises) {
        if (executing.length >= concurrency) {
          await Promise.race(executing);
        }
        const wrappedPromise = promise
          .then((result) => {
            completedTasks++;
            return result;
          })
          .catch(() => {
            completedTasks++;
          })
          .finally(() => {
            // CLEANUP: Remove completed promise from executing array
            const index = executing.indexOf(wrappedPromise);
            if (index > -1) executing.splice(index, 1);
          });

        executing.push(wrappedPromise);
      }

      // Wait for all promises in current batch to complete before moving to next batch
      await Promise.allSettled(executing);
      coreLogger.info(`Completed batch ${batchIndex + 1}/${batches.length}`);
    }

    return results;
  }

  // Individual File Upload with Retry Logic

  private async uploadSingleFileOptimized(
    containerClient: any,
    fileInfo: { fullPath: string; relativePath: string; contentType: string; size: number },
  ): Promise<void> {
    coreLogger.info(
      `Uploading file: ${fileInfo.relativePath} (${(fileInfo.size / 1024).toFixed(2)} KB, ${fileInfo.contentType})`,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(fileInfo.relativePath);
    const maxRetries = UploadConstants.MAX_RETRY_ATTEMPTS;
    const baseDelay = UploadConstants.RETRY_BASE_DELAY;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.performOptimizedUpload(blockBlobClient, fileInfo);
        return;
      } catch (error) {
        const isLastAttempt = attempt === maxRetries;
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        coreLogger.info(
          `Upload attempt ${attempt} failed for ${fileInfo.relativePath}: ${errorMessage}`,
        );

        if (isLastAttempt) {
          coreLogger.error(`All retry attempts exhausted for ${fileInfo.relativePath}`);
          throw new Error(
            ServiceErrorMessageConstants.UPLOAD_RETRY_EXHAUSTED.formatWithDetails(
              maxRetries,
              errorMessage,
            ),
          );
        }

        // Exponential backoff with jitter (Azure SDK pattern)
        const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 500;
        coreLogger.info(
          `Retrying upload for ${fileInfo.relativePath} in ${delay.toFixed(0)}ms (attempt ${attempt + 1}/${maxRetries})`,
        );
        await new Promise((_resolve) => setTimeout(_resolve, delay));
      }
    }
  }

  // Multi-Strategy Upload Engine - Optimized upload based on file characteristics

  private async performOptimizedUpload(
    blockBlobClient: any,
    fileInfo: { fullPath: string; relativePath: string; contentType: string; size: number },
  ): Promise<void> {
    if (fileInfo.size <= UploadConstants.SMALL_FILE_THRESHOLD) {
      // DIRECT UPLOAD: Optimal for small files (≤1MB)
      const fileContent = readFileSync(fileInfo.fullPath);
      await blockBlobClient.upload(fileContent, fileContent.length, {
        blobHTTPHeaders: {
          blobContentType: fileInfo.contentType,
        },
      });
    } else if (fileInfo.size <= UploadConstants.LARGE_FILE_THRESHOLD) {
      // BLOCK UPLOAD: Optimal for medium files (1MB - 100MB)
      const fileContent = readFileSync(fileInfo.fullPath);
      await blockBlobClient.uploadData(fileContent, {
        blobHTTPHeaders: {
          blobContentType: fileInfo.contentType,
        },
        blockSize: UploadConstants.OPTIMIZED_BLOCK_SIZE,
        concurrency: UploadConstants.PER_FILE_CONCURRENCY,
      });
    } else {
      // STREAMING UPLOAD: Optimal for large files (>100MB)
      const stream = createReadStream(fileInfo.fullPath);
      await blockBlobClient.uploadStream(
        stream,
        UploadConstants.STREAM_BUFFER_SIZE,
        UploadConstants.LARGE_FILE_CONCURRENCY,
        {
          blobHTTPHeaders: {
            blobContentType: fileInfo.contentType,
          },
        },
      );
    }
    coreLogger.info(`Successfully uploaded: ${fileInfo.relativePath}`);
  }
}
