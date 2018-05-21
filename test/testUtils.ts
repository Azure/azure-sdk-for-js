// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// parseInt just gives NaN (falsy) for undefined/null
const port = parseInt(process.env.PORT!) || 3001;

/**
 * Base URL for the ms-rest-js testserver.
 */
export const baseURL = `http://localhost:${port}`;
