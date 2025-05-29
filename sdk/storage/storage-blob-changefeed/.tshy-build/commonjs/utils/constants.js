"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANGE_FEED_CHUNK_BLOCK_DOWNLOAD_SIZE = exports.CHANGE_FEED_MAX_PAGE_SIZE = exports.CHANGE_FEED_INITIALIZATION_SEGMENT = exports.CHANGE_FEED_SEGMENT_PREFIX = exports.CHANGE_FEED_STATUS_FINALIZED = exports.CHANGE_FEED_META_SEGMENT_PATH = exports.CHANGE_FEED_CONTAINER_NAME = exports.SDK_VERSION = void 0;
exports.SDK_VERSION = "12.0.0-preview.5";
exports.CHANGE_FEED_CONTAINER_NAME = "$blobchangefeed";
exports.CHANGE_FEED_META_SEGMENT_PATH = "meta/segments.json";
exports.CHANGE_FEED_STATUS_FINALIZED = "Finalized";
exports.CHANGE_FEED_SEGMENT_PREFIX = "idx/segments/";
exports.CHANGE_FEED_INITIALIZATION_SEGMENT = "1601";
exports.CHANGE_FEED_MAX_PAGE_SIZE = 5000; // align with rest API list operations
exports.CHANGE_FEED_CHUNK_BLOCK_DOWNLOAD_SIZE = 16 * 1024 * 1024;
//# sourceMappingURL=constants.js.map