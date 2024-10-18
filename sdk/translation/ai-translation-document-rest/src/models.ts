// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface DocumentTranslateContentDocumentPartDescriptor {
  name: "document";
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream
    | File;
  filename?: string;
  contentType?: string;
}

export interface DocumentTranslateContentGlossaryPartDescriptor {
  name: "glossary";
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream
    | File;
  filename?: string;
  contentType?: string;
}

/** Translation job submission batch request */
export interface StartTranslationDetails {
  /** The input list of documents or folders containing documents */
  inputs: Array<BatchRequest>;
}

/** Definition for the input batch translation request */
export interface BatchRequest {
  /** Source of the input documents */
  source: SourceInput;
  /** Location of the destination for the output */
  targets: Array<TargetInput>;
  /**
   * Storage type of the input documents source string
   *
   * Possible values: "Folder", "File"
   */
  storageType?: StorageInputType;
}

/** Source of the input documents */
export interface SourceInput {
  /** Location of the folder / container or single file with your documents */
  sourceUrl: string;
  /** Document filter */
  filter?: DocumentFilter;
  /**
   * Language code
   * If none is specified, we will perform auto detect on the document
   */
  language?: string;
  /**
   * Storage Source
   *
   * Possible values: "AzureBlob"
   */
  storageSource?: StorageSource;
}

/** Document filter */
export interface DocumentFilter {
  /**
   * A case-sensitive prefix string to filter documents in the source path for
   * translation.
   * For example, when using a Azure storage blob Uri, use the prefix
   * to restrict sub folders for translation.
   */
  prefix?: string;
  /**
   * A case-sensitive suffix string to filter documents in the source path for
   * translation.
   * This is most often use for file extensions
   */
  suffix?: string;
}

/** Destination for the finished translated documents */
export interface TargetInput {
  /** Location of the folder / container with your documents */
  targetUrl: string;
  /** Category / custom system for translation request */
  category?: string;
  /** Target Language */
  language: string;
  /** List of Glossary */
  glossaries?: Array<Glossary>;
  /**
   * Storage Source
   *
   * Possible values: "AzureBlob"
   */
  storageSource?: StorageSource;
}

/** Glossary / translation memory for the request */
export interface Glossary {
  /**
   * Location of the glossary.
   * We will use the file extension to extract the
   * formatting if the format parameter is not supplied.
   *
   * If the translation
   * language pair is not present in the glossary, it will not be applied
   */
  glossaryUrl: string;
  /** Format */
  format: string;
  /** Optional Version.  If not specified, default is used. */
  version?: string;
  /**
   * Storage Source
   *
   * Possible values: "AzureBlob"
   */
  storageSource?: StorageSource;
}

/** Document Translate Request Content */
export type DocumentTranslateContent =
  | FormData
  | Array<
      | DocumentTranslateContentDocumentPartDescriptor
      | DocumentTranslateContentGlossaryPartDescriptor
    >;
/** Alias for StorageSource */
export type StorageSource = string;
/** Alias for StorageInputType */
export type StorageInputType = string;
/** Alias for FileFormatType */
export type FileFormatType = string;
