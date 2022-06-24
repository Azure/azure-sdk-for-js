// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const SDK_VERSION: string = "12.0.0-preview.5";

export const CHANGE_FEED_CONTAINER_NAME: string = "$blobchangefeed";
export const CHANGE_FEED_META_SEGMENT_PATH: string = "meta/segments.json";
export const CHANGE_FEED_STATUS_FINALIZED: string = "Finalized";
export const CHANGE_FEED_SEGMENT_PREFIX: string = "idx/segments/";
export const CHANGE_FEED_INITIALIZATION_SEGMENT: string = "1601";

export const CHANGE_FEED_MAX_PAGE_SIZE: number = 5000; // align with rest API list operations
export const CHANGE_FEED_CHUNK_BLOCK_DOWNLOAD_SIZE: number = 16 * 1024 * 1024;
