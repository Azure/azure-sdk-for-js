// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorModel, InnerError } from "./generated";

/**
 * Returns the innermost error that has a message field.
 *
 * @internal
 * @param error - the error to unwrap
 * @returns - the innermost populated error
 */
function unwrap(error: ErrorModel | InnerError): ErrorModel {
  if (error.innererror !== undefined && error.innererror.message !== undefined) {
    return unwrap(error.innererror);
  }

  return error as ErrorModel;
}

/**
 * A class representing an Error from the Form Recognizer Service.
 *
 * For information about the error codes the service produces, refer to the service's error documentation:
 *
 * https://aka.ms/azsdk/formrecognizer/errors
 */
export class FormRecognizerError extends Error {
  /**
   * The error code.
   *
   * Example: `InternalServerError`
   */
  public code: string;

  /**
   * A list of detailed errors that are related to this error.
   */
  public details: ErrorModel[];

  /**
   * The target of the error (the component or resource that the error refers to).
   */
  public target?: string;

  /**
   * Create a FormRecognizerError from a generated ErrorModel.
   * @internal
   * @hidden
   */
  constructor(formRecognizerError: ErrorModel) {
    // TODO: We used to unwrap FR errors this way, but is it still necessary
    const e = unwrap(formRecognizerError);
    super(e.message);

    this.code = e.code;
    this.details = e.details ?? [];
    this.target = e.target;
  }
}
