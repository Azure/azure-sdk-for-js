// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { IndexDocumentsAction } from "./indexModels";

/**
 * Class used to perform batch operations
 * with multiple documents to the index.
 */
export class IndexDocumentsBatch<T> {
  /**
   * The set of actions taken in this batch.
   */
  public readonly actions: IndexDocumentsAction<T>[];

  constructor(actions: IndexDocumentsAction<T>[] = []) {
    this.actions = actions;
  }

  /**
   * Upload an array of documents to the index.
   * @param documents - The documents to upload.
   */
  public upload(documents: T[]): void {
    const batch = documents.map<IndexDocumentsAction<T>>((doc) => {
      return {
        ...doc,
        __actionType: "upload",
      };
    });

    this.actions.push(...batch);
  }

  /**
   * Update a set of documents in the index.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The updated documents.
   */
  public merge(documents: T[]): void {
    const batch = documents.map<IndexDocumentsAction<T>>((doc) => {
      return {
        ...doc,
        __actionType: "merge",
      };
    });

    this.actions.push(...batch);
  }

  /**
   * Update a set of documents in the index or uploads them if they don't exist.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The new/updated documents.
   */
  public mergeOrUpload(documents: T[]): void {
    const batch = documents.map<IndexDocumentsAction<T>>((doc) => {
      return {
        ...doc,
        __actionType: "mergeOrUpload",
      };
    });

    this.actions.push(...batch);
  }

  /**
   * Delete a set of documents.
   * @param keyName - The name of their primary key in the index.
   * @param keyValues - The primary key values of documents to delete.
   */
  public delete(keyName: keyof T, keyValues: string[]): void;

  /**
   * Delete a set of documents.
   * @param documents - Documents to be deleted.
   */
  public delete(documents: T[]): void;

  public delete(keyNameOrDocuments: keyof T | T[], keyValues?: string[]): void {
    if (keyValues) {
      const keyName = keyNameOrDocuments as keyof T;

      const batch = keyValues.map<IndexDocumentsAction<T>>((keyValue) => {
        return {
          __actionType: "delete",
          [keyName]: keyValue,
        } as IndexDocumentsAction<T>;
      });

      this.actions.push(...batch);
    } else {
      const documents = keyNameOrDocuments as T[];

      const batch = documents.map<IndexDocumentsAction<T>>((document) => {
        return {
          __actionType: "delete",
          ...document,
        } as IndexDocumentsAction<T>;
      });

      this.actions.push(...batch);
    }
  }
}
