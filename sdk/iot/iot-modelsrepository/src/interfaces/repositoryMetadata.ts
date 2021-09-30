// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Interface for Repository Metadata object
 */
export interface RepositoryMetadata {
    commitId: string;
    features: {[id: string]: boolean};
    publishDateUtc: Date;
    sourceRepo: string;
    totalModelCount: number;
  }
  