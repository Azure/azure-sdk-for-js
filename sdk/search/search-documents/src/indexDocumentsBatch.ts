// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IndexDocumentsAction } from "./indexModels.js";

/**
 * Class used to perform batch operations
 * with multiple documents to the index.
 */
export class IndexDocumentsBatch<TModel> {
  /**
   * The set of actions taken in this batch.
   */
  public readonly actions: IndexDocumentsAction<TModel>[];

  constructor(actions: IndexDocumentsAction<TModel>[] = []) {
    this.actions = actions;
  }

  /**
   * Upload an array of documents to the index.
   * @param documents - The documents to upload.
   */
  public upload(documents: TModel[]): void {
    const batch = documents.map<IndexDocumentsAction<TModel>>((doc) => {
      return {
        ...doc,
        __actionType: "upload",
      };
    });

    this.actions.push(...batch);
  }

  /**
   * Update a set of documents in the index. For more details about how merging works, see
   * https://learn.microsoft.com/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The updated documents.
   */
  public merge(documents: TModel[]): void {
    const batch = documents.map<IndexDocumentsAction<TModel>>((doc) => {
      return {
        ...doc,
        __actionType: "merge",
      };
    });

    this.actions.push(...batch);
  }

  /**
   * Update a set of documents in the index or uploads them if they don't exist. For more details
   * about how merging works, see
   * https://learn.microsoft.com/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The new/updated documents.
   */
  public mergeOrUpload(documents: TModel[]): void {
    const batch = documents.map<IndexDocumentsAction<TModel>>((doc) => {
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
  public delete(keyName: keyof TModel, keyValues: string[]): void;

  /**
   * Delete a set of documents.
   * @param documents - Documents to be deleted.
   */
  public delete(documents: TModel[]): void;

  public delete(keyNameOrDocuments: keyof TModel | TModel[], keyValues?: string[]): void {
    if (keyValues) {
      const keyName = keyNameOrDocuments as keyof TModel;

      const batch = keyValues.map<IndexDocumentsAction<TModel>>((keyValue) => {
        return {
          __actionType: "delete",
          [keyName]: keyValue,
        } as IndexDocumentsAction<TModel>;
      });

      this.actions.push(...batch);
    } else {
      const documents = keyNameOrDocuments as TModel[];

      const batch = documents.map<IndexDocumentsAction<TModel>>((document) => {
        return {
          __actionType: "delete",
          ...document,
        } as IndexDocumentsAction<TModel>;
      });

      this.actions.push(...batch);
    }
  }
}
