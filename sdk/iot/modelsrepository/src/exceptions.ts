// Copyright (c) Microsoft.
// Licensed under the MIT license.

/**
 * A ModelError will be thrown in the even the Model in the repo is malformed in some standard way.
 */
export class ModelError extends Error {
  constructor(message: string) {
    super(message);
  }
}
