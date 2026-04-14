// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import { listEventTypes, list, get } from "../../api/topicTypes/operations.js";
import type {
  TopicTypesListEventTypesOptionalParams,
  TopicTypesListOptionalParams,
  TopicTypesGetOptionalParams,
} from "../../api/topicTypes/options.js";
import type { EventType, TopicTypeInfo } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TopicTypes operations. */
export interface TopicTypesOperations {
  /** List event types for a topic type. */
  listEventTypes: (
    topicTypeName: string,
    options?: TopicTypesListEventTypesOptionalParams,
  ) => PagedAsyncIterableIterator<EventType>;
  /** List all registered topic types. */
  list: (options?: TopicTypesListOptionalParams) => PagedAsyncIterableIterator<TopicTypeInfo>;
  /** Get information about a topic type. */
  get: (topicTypeName: string, options?: TopicTypesGetOptionalParams) => Promise<TopicTypeInfo>;
}

function _getTopicTypes(context: EventGridManagementContext) {
  return {
    listEventTypes: (topicTypeName: string, options?: TopicTypesListEventTypesOptionalParams) =>
      listEventTypes(context, topicTypeName, options),
    list: (options?: TopicTypesListOptionalParams) => list(context, options),
    get: (topicTypeName: string, options?: TopicTypesGetOptionalParams) =>
      get(context, topicTypeName, options),
  };
}

export function _getTopicTypesOperations(
  context: EventGridManagementContext,
): TopicTypesOperations {
  return {
    ..._getTopicTypes(context),
  };
}
