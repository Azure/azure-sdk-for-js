// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { BatchNodeFile } from "../models/models.js";

export function getBatchNodeFileProperties(
    rawHeaders: RawHttpHeaders
): BatchNodeFile {
    const url = rawHeaders["ocp-batch-file-url"] && decodeURIComponent(rawHeaders["ocp-batch-file-url"])
    const name = url?.substring(url.lastIndexOf("/") + 1)
    
    const result: BatchNodeFile = {
        properties: {
            lastModified: rawHeaders["last-modified"] ? new Date(rawHeaders["last-modified"]) : new Date(),
            contentLength: rawHeaders["content-length"] || "",
        },
    };

    if (url) {
        result.url = url;
    }
    if (name) {
        result.name = name;
    }
    if (rawHeaders["ocp-batch-file-isdirectory"]) {
        result.isDirectory = rawHeaders["ocp-batch-file-isdirectory"].toLowerCase().includes("true");
    }
    if (rawHeaders["ocp-creation-time"]) {
        result.properties!.creationTime = new Date(rawHeaders["ocp-creation-time"]);
    }
    if (rawHeaders["content-type"]) {
        result.properties!.contentType = rawHeaders["content-type"];
    }
    if (rawHeaders["ocp-batch-file-mode"]) {
        result.properties!.fileMode = rawHeaders["ocp-batch-file-mode"];
    }

    return result;
}
