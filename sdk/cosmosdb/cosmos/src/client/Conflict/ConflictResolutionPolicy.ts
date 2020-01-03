// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConflictResolutionMode } from "./ConflictResolutionMode";

/**
 * Represents the conflict resolution policy configuration for specifying how to resolve conflicts
 *  in case writes from different regions result in conflicts on documents in the collection in the Azure Cosmos DB service.
 */
export interface ConflictResolutionPolicy {
  /**
   * Gets or sets the <see cref="ConflictResolutionMode"/> in the Azure Cosmos DB service. By default it is {@link ConflictResolutionMode.LastWriterWins}.
   */
  mode?: keyof typeof ConflictResolutionMode;
  /**
   * Gets or sets the path which is present in each document in the Azure Cosmos DB service for last writer wins conflict-resolution.
   * This path must be present in each document and must be an integer value.
   * In case of a conflict occurring on a document, the document with the higher integer value in the specified path will be picked.
   * If the path is unspecified, by default the timestamp path will be used.
   *
   * This value should only be set when using {@link ConflictResolutionMode.LastWriterWins}.
   *
   * ```typescript
   * conflictResolutionPolicy.ConflictResolutionPath = "/name/first";
   * ```
   *
   */
  conflictResolutionPath?: string;
  /**
   * Gets or sets the {@link StoredProcedure} which is used for conflict resolution in the Azure Cosmos DB service.
   * This stored procedure may be created after the {@link Container} is created and can be changed as required.
   *
   * 1. This value should only be set when using {@link ConflictResolutionMode.Custom}.
   * 2. In case the stored procedure fails or throws an exception, the conflict resolution will default to registering conflicts in the conflicts feed.
   *
   * ```typescript
   * conflictResolutionPolicy.ConflictResolutionProcedure = "resolveConflict"
   * ```
   */
  conflictResolutionProcedure?: string;
}
