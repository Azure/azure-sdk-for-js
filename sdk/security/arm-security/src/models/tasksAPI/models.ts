// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Security task that we recommend to do in order to strengthen security */
export interface SecurityTask extends ProxyResource {
  /** State of the task (Active, Resolved etc.) */
  readonly state?: string;
  /** The time this task was discovered in UTC */
  readonly creationTimeUtc?: Date;
  /** Changing set of properties, depending on the task type that is derived from the name field */
  securityTaskParameters?: SecurityTaskParameters;
  /** The time this task's details were last changed in UTC */
  readonly lastStateChangeTimeUtc?: Date;
  /** Additional data on the state of the task */
  readonly subState?: string;
}

export function securityTaskDeserializer(item: any): SecurityTask {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securityTaskPropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of a task. */
export interface SecurityTaskProperties {
  /** State of the task (Active, Resolved etc.) */
  readonly state?: string;
  /** The time this task was discovered in UTC */
  readonly creationTimeUtc?: Date;
  /** Changing set of properties, depending on the task type that is derived from the name field */
  securityTaskParameters?: SecurityTaskParameters;
  /** The time this task's details were last changed in UTC */
  readonly lastStateChangeTimeUtc?: Date;
  /** Additional data on the state of the task */
  readonly subState?: string;
}

export function securityTaskPropertiesDeserializer(item: any): SecurityTaskProperties {
  return {
    state: item["state"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    securityTaskParameters: !item["securityTaskParameters"]
      ? item["securityTaskParameters"]
      : securityTaskParametersDeserializer(item["securityTaskParameters"]),
    lastStateChangeTimeUtc: !item["lastStateChangeTimeUtc"]
      ? item["lastStateChangeTimeUtc"]
      : new Date(item["lastStateChangeTimeUtc"]),
    subState: item["subState"],
  };
}

/** Changing set of properties, depending on the task type that is derived from the name field */
export interface SecurityTaskParameters {
  /** Name of the task type */
  readonly name?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function securityTaskParametersDeserializer(item: any): SecurityTaskParameters {
  return {
    additionalProperties: serializeRecord(item, ["name"]),
    name: item["name"],
  };
}

/** List of security task recommendations */
export interface _SecurityTaskList {
  /** The SecurityTask items on this page */
  readonly value?: SecurityTask[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _securityTaskListDeserializer(item: any): _SecurityTaskList {
  return {
    value: !item["value"] ? item["value"] : securityTaskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityTaskArrayDeserializer(result: Array<SecurityTask>): any[] {
  return result.map((item) => {
    return securityTaskDeserializer(item);
  });
}

/** Known values of {@link TaskUpdateActionType} that the service accepts. */
export enum KnownTaskUpdateActionType {
  /** Activate */
  Activate = "Activate",
  /** Dismiss */
  Dismiss = "Dismiss",
  /** Start */
  Start = "Start",
  /** Resolve */
  Resolve = "Resolve",
  /** Close */
  Close = "Close",
}

/** Type of TaskUpdateActionType */
export type TaskUpdateActionType = string;

export function _securityTaskPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    securityTaskParameters: !item["securityTaskParameters"]
      ? item["securityTaskParameters"]
      : securityTaskParametersDeserializer(item["securityTaskParameters"]),
    lastStateChangeTimeUtc: !item["lastStateChangeTimeUtc"]
      ? item["lastStateChangeTimeUtc"]
      : new Date(item["lastStateChangeTimeUtc"]),
    subState: item["subState"],
  };
}
