// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GroupCallLocator, ServerCallLocator } from ".";
import { CallLocatorModel } from "./generated/src";
import {
  CallLocator,
  CallLocatorKind,
  getLocatorKind
} from "./models";


/**
 * @hidden
 * Identifies a callLocator in Azure Communication services.
 */
export interface SerializedCallLocator {
  /**
   * The group call.
   */
   groupCall?: SerializedGroupCallLocator;

  /**
   * The server call.
   */
   serverCall?: SerializedServerCallLocator;
}

/**
 * @hidden
 * GroupCallLocator.
 */
export interface SerializedGroupCallLocator {
  /**
   * The group call id.
   */
  groupCallId: string;
}

/**
 * @hidden
 * ServerCallLocator
 */
export interface SerializedServerCallLocator {
  /**
   * The server call id.
   */
  serverCallId: string;
}

const assertNotNullOrUndefined = <
  T extends Record<string, unknown>,
  P extends keyof T,
  Q extends keyof T[P]
>(
  obj: T,
  prop: Q
): Required<Required<T>[P]>[Q] => {
  const subObjName = Object.keys(obj)[0];
  const subObj = (obj as any)[subObjName];
  if (prop in subObj) {
    return subObj[prop];
  }
  throw new Error(`Property ${prop} is required for identifier of type ${subObjName}.`);
};

const assertMaximumOneNestedModel = (locator: SerializedCallLocator): void => {
  const { ...props } = locator;
  const keys = Object.keys(props);
  if (keys.length > 1) {
    throw new Error(`Only one of the properties in ${JSON.stringify(keys)} should be present.`);
  }
};

/**
 * @hidden
 * Translates a CallLocator to its serialized format for sending a request.
 * @param locator - The CallLocator to be serialized.
 */
export const serializeCallLocator = (
  locator: CallLocator
): CallLocatorModel => {
  const locatorKind = getLocatorKind(locator);
  switch (locatorKind.kind) {
    case "groupCall":
      return {
        groupCallId: (locator as GroupCallLocator).groupCallId,
        kind: locatorKind.kind + "Locator"
      };
    case "serverCall":
      return {
        serverCallId: (locator as ServerCallLocator).serverCallId,
        kind: locatorKind.kind + "Locator"
      }
    default:
      throw new Error(`Can't serialize an calllocator with kind ${(locatorKind as any).kind}`);
  }
};

/**
 * @hidden
 * Translates the serialized format of a call locator to CallLocator.
 * @param serializedCallLocator - The SerializedCommunicationIdentifier to be deserialized.
 */
export const deserializeCommunicationIdentifier = (
  serializedCallLocator: SerializedCallLocator
): CallLocatorKind => {
  assertMaximumOneNestedModel(serializedCallLocator);

  const { groupCall, serverCall } = serializedCallLocator;
  if (groupCall) {
    return {
      kind: "groupCall",
      groupCallId: assertNotNullOrUndefined({ groupCall }, "groupCallId")
    };
  }
  if (serverCall) {
    return {
      kind: "serverCall",
      serverCallId: assertNotNullOrUndefined({ serverCall }, "serverCallId"),
    };
  }
  throw new Error(`Can't deserialize an serializedCallLocator with ${(serializedCallLocator as any)}`);
};
