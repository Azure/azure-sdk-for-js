// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ParsingErrorImpl } from "./parsingErrorImpl";

export interface ParsingError {
  primaryId: string;
  secondaryId: string;
  property: string;
  value: string;
  cause: string;
  action: string;
  validationId: string;
}

export interface ParsingErrorParams {
  cause: string;
  action: string;
  primaryId?: string;
  secondaryId?: string;
  property?: string;
  value?: string;
}

export function createParsingError(
  validationId: string,
  errorParams: ParsingErrorParams
): ParsingError {
  return new ParsingErrorImpl(validationId, errorParams);
}
