// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface FullTextPolicy {
  /**
   * The default language for the full text .
   */
  defaultLanguage: string;
  /**
   * The paths to be indexed for full text search.
   */
  fullTextPaths: FullTextPath[];
}

export interface FullTextPath {
  /**
   * The path to be indexed for full text search.
   */
  path: string;
  /**
   * The language for the full text path.
   */
  language: string;
}
