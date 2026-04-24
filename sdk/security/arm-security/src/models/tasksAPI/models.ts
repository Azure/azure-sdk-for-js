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
export interface TasksAPISecurityTask extends ProxyResource {
  /** State of the task (Active, Resolved etc.) */
  readonly state?: string;
  /** The time this task was discovered in UTC */
  readonly creationTimeUtc?: Date;
  /** Changing set of properties, depending on the task type that is derived from the name field */
  securityTaskParameters?: TasksAPISecurityTaskParameters;
  /** The time this task's details were last changed in UTC */
  readonly lastStateChangeTimeUtc?: Date;
  /** Additional data on the state of the task */
  readonly subState?: string;
}

export function tasksAPISecurityTaskDeserializer(item: any): TasksAPISecurityTask {
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
export interface TasksAPISecurityTaskProperties {
  /** State of the task (Active, Resolved etc.) */
  readonly state?: string;
  /** The time this task was discovered in UTC */
  readonly creationTimeUtc?: Date;
  /** Changing set of properties, depending on the task type that is derived from the name field */
  securityTaskParameters?: TasksAPISecurityTaskParameters;
  /** The time this task's details were last changed in UTC */
  readonly lastStateChangeTimeUtc?: Date;
  /** Additional data on the state of the task */
  readonly subState?: string;
}

export function tasksAPISecurityTaskPropertiesDeserializer(
  item: any,
): TasksAPISecurityTaskProperties {
  return {
    state: item["state"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    securityTaskParameters: !item["securityTaskParameters"]
      ? item["securityTaskParameters"]
      : tasksAPISecurityTaskParametersDeserializer(item["securityTaskParameters"]),
    lastStateChangeTimeUtc: !item["lastStateChangeTimeUtc"]
      ? item["lastStateChangeTimeUtc"]
      : new Date(item["lastStateChangeTimeUtc"]),
    subState: item["subState"],
  };
}

/** Changing set of properties, depending on the task type that is derived from the name field */
export interface TasksAPISecurityTaskParameters {
  /** Name of the task type */
  readonly name?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function tasksAPISecurityTaskParametersDeserializer(
  item: any,
): TasksAPISecurityTaskParameters {
  return {
    additionalProperties: serializeRecord(item, ["name"]),
    name: item["name"],
  };
}

/** List of security task recommendations */
export interface _TasksAPISecurityTaskList {
  /** The SecurityTask items on this page */
  readonly value?: TasksAPISecurityTask[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _tasksAPISecurityTaskListDeserializer(item: any): _TasksAPISecurityTaskList {
  return {
    value: !item["value"] ? item["value"] : tasksAPISecurityTaskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tasksAPISecurityTaskArrayDeserializer(result: Array<TasksAPISecurityTask>): any[] {
  return result.map((item) => {
    return tasksAPISecurityTaskDeserializer(item);
  });
}

/** Known values of {@link TaskUpdateActionType} that the service accepts. */
export enum KnownTasksAPITaskUpdateActionType {
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

/** Type of TasksAPITaskUpdateActionType */
export type TasksAPITaskUpdateActionType = string;

export function _securityTaskPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    creationTimeUtc: !item["creationTimeUtc"]
      ? item["creationTimeUtc"]
      : new Date(item["creationTimeUtc"]),
    securityTaskParameters: !item["securityTaskParameters"]
      ? item["securityTaskParameters"]
      : tasksAPISecurityTaskParametersDeserializer(item["securityTaskParameters"]),
    lastStateChangeTimeUtc: !item["lastStateChangeTimeUtc"]
      ? item["lastStateChangeTimeUtc"]
      : new Date(item["lastStateChangeTimeUtc"]),
    subState: item["subState"],
  };
}
