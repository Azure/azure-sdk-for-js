// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { IndexDocumentAction } from "./indexModels";

export class IndexDocumentsBatch<T> {
  /**
   * The set of actions taken in this batch.
   */
  public readonly actions: IndexDocumentAction<T>[];

  constructor(actions: IndexDocumentAction<T>[] = []) {
    this.actions = actions;
  }

  /**
   * Upload an array of documents to the index.
   * @param documents The documents to upload.
   */
  public upload(documents: T[]): void {
    const batch = documents.map<IndexDocumentAction<T>>((doc) => {
      return {
        actionType: "upload",
        ...doc
      };
    });

    this.actions.push(...batch);
  }

  /**
   * Update a set of documents in the index.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents The updated documents.
   */
  public merge(documents: T[]): void {
    const batch = documents.map<IndexDocumentAction<T>>((doc) => {
      return {
        actionType: "merge",
        ...doc
      };
    });

    this.actions.push(...batch);
  }

  /**
   * Update a set of documents in the index or uploads them if they don't exist.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents The new/updated documents.
   */
  public mergeOrUpload(documents: T[]): void {
    const batch = documents.map<IndexDocumentAction<T>>((doc) => {
      return {
        actionType: "mergeOrUpload",
        ...doc
      };
    });

    this.actions.push(...batch);
  }

  /**
   * Delete a set of documents by their primary key.
   * @param keyName The name of their primary key in the index.
   * @param keyValues The primary key values of documents to delete.
   */
  public delete(keyName: keyof T, keyValues: string[]): void {
    const batch = keyValues.map<IndexDocumentAction<T>>((keyValue) => {
      return {
        actionType: "delete",
        [keyName]: keyValue
      } as IndexDocumentAction<T>;
    });

    this.actions.push(...batch);
  }
}
