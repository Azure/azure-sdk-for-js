// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DataLakePathClient } from "../clients";
import { PathOperationsImpl as Path } from "../generated/src/operations";
import { Pipeline } from "@azure/storage-blob";

/**
 * A PathClientInternal represents a URL to the Azure Storage path (directory or file) to
 * help to construct a path client to expose Path context with blob endpoint.
 */
export class PathClientInternal extends DataLakePathClient {
  /**
   * Path context with blob endpoint.
   */
  public blobPathContext: Path;

  /**
   * Creates an instance of DataLakePathClient from url and pipeline.
   *
   * @param url - A Client string pointing to Azure Storage data lake path (directory or file), such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem/directory" or "https://myaccount.dfs.core.windows.net/filesystem/file".
   *                     You can append a SAS if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem/directory?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  public constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.blobPathContext = new Path(this.storageClientContextToBlobEndpoint);
  }
}
