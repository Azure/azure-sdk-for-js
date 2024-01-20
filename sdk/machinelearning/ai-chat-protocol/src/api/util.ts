// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */
export function wrapError<T>(f: () => T, message: string): T {
  try {
    const result = f();
    return result;
  } catch (cause) {
    throw new Error(message, { cause });
  }
}
