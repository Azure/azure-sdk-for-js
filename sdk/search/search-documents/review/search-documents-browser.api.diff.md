# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -601,9 +601,9 @@
 // @public
 export type CreateSkillsetOptions = OperationOptions;
 
 // @public
-export function createSynonymMapFromFile(name: string, filePath: string): Promise<SynonymMap>;
+export function createSynonymMapFromFile(_name: string, _filePath: string): Promise<SynonymMap>;
 
 // @public
 export type CreateSynonymMapOptions = OperationOptions;
 
@@ -3247,14 +3247,14 @@
 }
 
 // @public
 export class SearchIndexingBufferedSender<TModel extends object> {
-    constructor(client: IndexDocumentsClient<TModel>, documentKeyRetriever: (document: TModel) => string, options?: SearchIndexingBufferedSenderOptions);
-    deleteDocuments(documents: TModel[], options?: SearchIndexingBufferedSenderDeleteDocumentsOptions): Promise<void>;
+    constructor(_client: IndexDocumentsClient<TModel>, _documentKeyRetriever: (document: TModel) => string, _options?: SearchIndexingBufferedSenderOptions);
+    deleteDocuments(_documents: TModel[], _options?: SearchIndexingBufferedSenderDeleteDocumentsOptions): Promise<void>;
     dispose(): Promise<void>;
-    flush(options?: SearchIndexingBufferedSenderFlushDocumentsOptions): Promise<void>;
-    mergeDocuments(documents: TModel[], options?: SearchIndexingBufferedSenderMergeDocumentsOptions): Promise<void>;
-    mergeOrUploadDocuments(documents: TModel[], options?: SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions): Promise<void>;
+    flush(_options?: SearchIndexingBufferedSenderFlushDocumentsOptions): Promise<void>;
+    mergeDocuments(_documents: TModel[], _options?: SearchIndexingBufferedSenderMergeDocumentsOptions): Promise<void>;
+    mergeOrUploadDocuments(_documents: TModel[], _options?: SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions): Promise<void>;
     off(event: "batchAdded", listener: (e: {
         action: string;
         documents: TModel[];
     }) => void): void;
@@ -3267,9 +3267,9 @@
     }) => void): void;
     on(event: "beforeDocumentSent", listener: (e: IndexDocumentsAction<TModel>) => void): void;
     on(event: "batchSucceeded", listener: (e: IndexDocumentsResult) => void): void;
     on(event: "batchFailed", listener: (e: RestError) => void): void;
-    uploadDocuments(documents: TModel[], options?: SearchIndexingBufferedSenderUploadDocumentsOptions): Promise<void>;
+    uploadDocuments(_documents: TModel[], _options?: SearchIndexingBufferedSenderUploadDocumentsOptions): Promise<void>;
 }
 
 // @public
 export type SearchIndexingBufferedSenderDeleteDocumentsOptions = OperationOptions;

```