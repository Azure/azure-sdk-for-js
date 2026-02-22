// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobServiceClient, ContainerClient, BlockBlobClient } from "@azure/storage-blob";
import type { TokenCredential } from "@azure/core-auth";
import { coreLogger } from "../common/logger.js";
import { readFileSync, writeFileSync, existsSync, createReadStream } from "fs";
import { join } from "path";
import { UploadConstants } from "../common/constants.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import {
  populateValuesFromServiceUrl,
  calculateOptimalConcurrency,
  collectAllFiles,
  getStorageAccountNameFromUri,
} from "./utils.js";
import { PlaywrightServiceConfig } from "../common/playwrightServiceConfig.js";
import type { WorkspaceMetaData, UploadResult } from "../common/types.js";

export class PlaywrightReporterStorageManager {
  // Uploads the HTML report folder to Azure Storage
  async uploadHtmlReportFolder(
    credential: TokenCredential,
    runId: string,
    outputFolder: string,
    workspaceDetails: WorkspaceMetaData,
  ): Promise<UploadResult> {
    coreLogger.info(
      `Starting HTML report upload for runId: ${runId}, outputFolder: ${outputFolder}`,
    );

    const storageAccountName =
      getStorageAccountNameFromUri(workspaceDetails?.storageUri || "") || "unknown";

    try {
      if (!workspaceDetails.storageUri) {
        coreLogger.error("Storage URI not found in workspace details");
        return {
          success: false,
          errorMessage: ServiceErrorMessageConstants.STORAGE_URI_NOT_FOUND.message,
        };
      }

      const blobServiceClient = new BlobServiceClient(workspaceDetails?.storageUri, credential);
      coreLogger.info("blobServiceClient created successfully.");
      const serviceUrlInfo = populateValuesFromServiceUrl();
      if (!serviceUrlInfo?.accountId) {
        coreLogger.error("Unable to extract workspace ID from service URL");
        return {
          success: false,
          errorMessage: ServiceErrorMessageConstants.UNABLE_TO_EXTRACT_WORKSPACE_ID.message,
        };
      }

      const containerName = serviceUrlInfo.accountId.toLowerCase().replace(/[^a-z0-9-]/g, "-");
      const containerClient = blobServiceClient.getContainerClient(containerName);

      const containerExists = await containerClient.exists();
      if (!containerExists) {
        coreLogger.info(`Container ${containerName} does not exist. Creating new container.`);
        await containerClient.create();
      } else {
        coreLogger.info(`Container ${containerName} already exists.`);
      }

      const folderName = runId;
      console.log(
        ServiceErrorMessageConstants.UPLOADING_ARTIFACTS.formatWithDetails(
          storageAccountName,
          containerName,
          folderName,
        ),
      );

      await this.modifyTraceIndexHtml(outputFolder);
      const uploadResults = await this.uploadFolderInParallel(
        containerClient,
        outputFolder,
        outputFolder,
        folderName,
      );

      if (uploadResults.totalFiles === 0) {
        return { success: false, errorMessage: "No files found to upload" };
      }

      const failedFiles = uploadResults.totalFiles - uploadResults.uploadedFiles.length;
      if (failedFiles > 0) {
        if (uploadResults.failedFileDetails) {
          const hasAuthorizationError = uploadResults.failedFileDetails.some(
            (fileDetail) =>
              fileDetail.error.includes("not authorized to perform this operation") ||
              fileDetail.error.includes("AuthorizationFailure"),
          );

          if (hasAuthorizationError) {
            return {
              success: false,
              errorMessage:
                ServiceErrorMessageConstants.STORAGE_AUTHORIZATION_FAILED.formatWithStorageAccount(
                  storageAccountName,
                ),
            };
          }
        }

        // Get list of failed file names by comparing total files with uploaded files
        const uploadedSet = new Set(uploadResults.uploadedFiles);
        const allFiles = collectAllFiles(outputFolder, outputFolder, folderName);
        const failedFileNames = allFiles
          .filter((file) => !uploadedSet.has(file.relativePath))
          .map((file) => file.relativePath);

        return {
          success: false,
          partialSuccess: true,
          failedFileCount: failedFiles,
          totalFiles: uploadResults.totalFiles,
          failedFiles: failedFileNames,
          failedFileDetails: uploadResults.failedFileDetails,
        };
      }

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const hasStorageAccountDeletedError =
        errorMessage.includes("ENOTFOUND") ||
        errorMessage.includes("getaddrinfo") ||
        errorMessage.includes("not found") ||
        errorMessage.includes("404");
      if (hasStorageAccountDeletedError) {
        return {
          success: false,
          errorMessage:
            ServiceErrorMessageConstants.STORAGE_ACCOUNT_DELETED.formatWithStorageAccount(
              storageAccountName,
            ),
        };
      }
      coreLogger.error(`Failed to upload HTML report: ${error}`);
      return { success: false, errorMessage };
    }
  }
  private async modifyTraceIndexHtml(outputFolder: string): Promise<void> {
    coreLogger.info(`Starting trace modification for folder: ${outputFolder}`);
    const indexPath = join(outputFolder, "trace/index.html");
    const localIndexPath = join(outputFolder, "trace/index.local.html");

    if (!existsSync(indexPath)) {
      coreLogger.error(`trace/index.html not found at path: ${indexPath}`);
      return;
    }
    coreLogger.info(`Found trace/index.html at: ${indexPath}`);

    try {
      const originalHtml = readFileSync(indexPath, "utf-8");
      writeFileSync(localIndexPath, originalHtml, "utf-8");
      coreLogger.info(`Backed up original trace viewer to: ${localIndexPath}`);

      const redirectTraceviewerScript = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting to Trace Viewer...</title>
</head>
<body>
  <script>
    /**
     * Trace Viewer Redirect Logic
     * 
     * This script handles two scenarios:
     * 1. Azure Portal Access (with SAS tokens): Redirects to public Playwright trace viewer at https://trace.playwright.dev/
     *    - Preserves SAS tokens on the trace URL to allow the public viewer to access the trace file from Azure Storage
     * 2. Local Development: Uses the local copy of the trace viewer (index.local.html)
     *    - Preserves all query parameters including the trace parameter
     * 
     * The script detects the scenario by checking:
     * - Presence of SAS tokens (sig, sv parameters) indicates Azure Portal access
     * - localhost/file protocol indicates local development
     * 
     * Authentication token preservation:
     * - For Azure Portal: SAS tokens are added to the trace URL (not the viewer URL) so the viewer can fetch the trace
     * - For local dev: All parameters are forwarded to the local viewer
     */
    (function() {
      function shouldRedirect() {
        try {
          const currentUrl = new URL(location.href);
          const traceParam = currentUrl.searchParams.get('trace');
          if (!traceParam) return false;

          // Check if current URL (the index.html itself) has SAS tokens - indicates Azure Portal access
          const currentHasSas = currentUrl.searchParams.has('sig') || currentUrl.searchParams.has('sv');
          
          // Check if we're on localhost or file protocol (cover common local dev scenarios)
          const hostname = currentUrl.hostname;
          const protocol = currentUrl.protocol;
          const isLoopbackV4 =
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname.startsWith('127.');
          const isLoopbackV6 =
            hostname === '::1' ||
            hostname === '[::1]';
          const isCustomLocalName =
            hostname.endsWith('.localhost') ||
            hostname.endsWith('.local');
          const isLocalHost =
            protocol === 'file:' ||
            isLoopbackV4 ||
            isLoopbackV6 ||
            isCustomLocalName;

          // Redirect to public trace viewer if:
          // 1. Current page is accessed with SAS tokens (Azure Portal scenario)
          // 2. Not running on localhost/file protocol
          return currentHasSas && !isLocalHost;
        } catch (e) {
          console.error('Trace redirect detection failed', e);
          return false;
        }
      }

      if (shouldRedirect()) {
        const url = new URL(location.href);
        const traceParam = url.searchParams.get('trace');
        const trace = new URL(traceParam, url);

        // Copy all query parameters from the current URL to the trace URL (preserve SAS tokens)
        for (const [key, value] of url.searchParams.entries()) {
          if (key !== 'trace') {
            trace.searchParams.set(key, value);
          }
        }

        const publicTraceViewer = new URL('https://trace.playwright.dev/');
        publicTraceViewer.searchParams.set('trace', trace.toString());

        location.replace(publicTraceViewer.toString());
      } else {
        // Use the local copy of the Playwright trace viewer when running locally
        // Preserve all query parameters including the trace parameter
        const currentUrl = new URL(location.href);
        const localViewerUrl = new URL('index.local.html', currentUrl);
        
        // Copy all query parameters to the local viewer URL
        for (const [key, value] of currentUrl.searchParams.entries()) {
          localViewerUrl.searchParams.set(key, value);
        }
        
        location.replace(localViewerUrl.toString());
      }
    })();
  </script>
</body>
</html>
`;

      writeFileSync(indexPath, redirectTraceviewerScript, "utf-8");
      coreLogger.info("Successfully updated TraceViewer index file");
    } catch (error) {
      coreLogger.error(
        `Error modifying trace/index.html: ${error instanceof Error ? error.message : String(error)}`,
      );
      return;
    }
  }

  // Uploads the entire Playwright HTML report folder after tests complete.

  async uploadPlaywrightHtmlReportAfterTests(
    outputFolderName?: string,
    workspaceMetadata?: WorkspaceMetaData | null,
  ): Promise<UploadResult> {
    try {
      coreLogger.info(
        `Starting post-test HTML report upload, folder name: ${outputFolderName || "default (playwright-report)"}`,
      );
      const cred = PlaywrightServiceConfig.instance.credential;
      if (!cred) {
        coreLogger.error("No credential found for authentication");
        return {
          success: false,
          errorMessage: ServiceErrorMessageConstants.NO_CRED_ENTRA_AUTH_ERROR.message,
        };
      }
      coreLogger.info("Credential found for authentication");

      const folderName = outputFolderName || "playwright-report";
      const outputFolderPath = join(process.cwd(), folderName);

      if (!existsSync(outputFolderPath)) {
        coreLogger.error(`HTML report folder not found: ${outputFolderPath}`);
        return {
          success: false,
          errorMessage:
            ServiceErrorMessageConstants.PLAYWRIGHT_TEST_REPORT_NOT_FOUND.formatWithFolder(
              folderName,
            ),
        };
      }
      coreLogger.info(`HTML report folder found: ${outputFolderPath}`);

      const testRunId = PlaywrightServiceConfig.instance.runId;
      coreLogger.info(`Starting upload for test run ID: ${testRunId}`);
      const result = await this.uploadHtmlReportFolder(
        cred,
        testRunId,
        outputFolderPath,
        workspaceMetadata!,
      );
      coreLogger.info(`Completed upload for test run ID: ${testRunId}`);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      coreLogger.error(`Upload failed: ${errorMessage}`);
      return { success: false, errorMessage };
    }
  }

  // Parallel Upload Engine - Core upload orchestration with performance optimization

  private async uploadFolderInParallel(
    containerClient: ContainerClient,
    folderPath: string,
    basePath: string,
    runIdFolderPrefix?: string,
  ): Promise<{
    uploadedFiles: string[];
    failedFiles: string[];
    failedFileDetails?: Array<{ fileName: string; error: string }>;
    totalFiles: number;
    totalSize: number;
    uploadTime: number;
  }> {
    // Sort by size descending - upload large files first for better parallelization
    const filesToUpload = collectAllFiles(folderPath, basePath, runIdFolderPrefix).sort(
      (a, b) => b.size - a.size,
    );

    if (filesToUpload.length === 0) {
      return { uploadedFiles: [], failedFiles: [], totalFiles: 0, totalSize: 0, uploadTime: 0 };
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

      // Get failed file names and their error messages
      const uploadedSet = new Set(
        results
          .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
          .map((r) => r.value),
      );
      const failedFileNames = filesToUpload
        .filter((file) => !uploadedSet.has(file.relativePath))
        .map((file) => file.relativePath);

      // Create detailed error mapping
      const failedFileDetails: Array<{ fileName: string; error: string }> = [];
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          const fileName = filesToUpload[index]?.relativePath || `File at index ${index}`;
          const errorMessage =
            result.reason instanceof Error ? result.reason.message : String(result.reason);
          failedFileDetails.push({ fileName, error: errorMessage });
        }
      });

      // Log error but don't throw to prevent breaking HTML reporter
      coreLogger.error(
        `Upload failed: ${failed} files could not be uploaded. Sample errors: ${errors.join(", ")}`,
      );
      return {
        uploadedFiles: results
          .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
          .map((r) => r.value),
        failedFiles: failedFileNames,
        failedFileDetails,
        totalFiles: filesToUpload.length,
        totalSize,
        uploadTime,
      };
    }

    const uploadedFiles = results
      .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
      .map((r) => r.value);

    return {
      uploadedFiles,
      failedFiles: [],
      totalFiles: filesToUpload.length,
      totalSize,
      uploadTime,
    };
  }

  // Concurrency Control System - Manages parallel execution with controlled resource usage

  private async uploadWithConcurrencyControl(
    containerClient: ContainerClient,
    files: Array<{ fullPath: string; relativePath: string; size: number; contentType: string }>,
    concurrency: number,
  ): Promise<PromiseSettledResult<string>[]> {
    const uploadTasks = files.map((fileInfo) => async (): Promise<string> => {
      try {
        await this.uploadSingleFileOptimized(containerClient, fileInfo);
        return fileInfo.relativePath;
      } catch (error) {
        coreLogger.error(
          `Failed to upload file: ${fileInfo.relativePath} - ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
        throw error;
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
          coreLogger.error(
            `Task failed at index ${globalIndex}: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          );
          return;
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
            // Cleanup: remove completed promise from executing array
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
    containerClient: ContainerClient,
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
          coreLogger.error(
            `All retry attempts exhausted for ${fileInfo.relativePath}: ${errorMessage}`,
          );
          if (error instanceof Error) {
            throw error;
          }
          throw new Error(
            `Upload failed for ${fileInfo.relativePath} after ${maxRetries} attempts: ${errorMessage}`,
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
    blockBlobClient: BlockBlobClient,
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
