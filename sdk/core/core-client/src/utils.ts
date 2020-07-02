// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Returns true if the given value is a basic/primitive type
 * (string, number, boolean, null, undefined).
 * @param value Value to test
 * @ignore @internal
 */
export function isPrimitiveType(value: any): boolean {
  return (typeof value !== "object" && typeof value !== "function") || value === null;
}

const validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

/**
 * Returns true if the given string is in ISO 8601 format.
 * @param value The value to be validated for ISO 8601 duration format.
 * @ignore @internal
 */
export function isDuration(value: string): boolean {
  return validateISODuration.test(value);
}

const validUuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;

/**
 * Returns true if the provided uuid is valid.
 *
 * @param uuid The uuid that needs to be validated.
 *
 * @ignore @internal
 */
export function isValidUuid(uuid: string): boolean {
  return validUuidRegex.test(uuid);
}
