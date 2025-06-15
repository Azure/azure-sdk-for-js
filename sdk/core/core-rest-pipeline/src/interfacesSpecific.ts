// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { File } from "node:buffer";

/**
 * Each form data entry can be a string, Blob, or a File. If you wish to pass a file with a name but do not have
 * access to the File class, you can use the createFile helper to create one.
 */
export type FormDataValue = string | Blob | File;
