// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext } from "../../api/resourceManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  createOrUpdateValue,
  deleteValue,
  deleteAtScope,
  updateAtScope,
  createOrUpdateAtScope,
  getAtScope,
} from "../../api/tagsOperations/operations.js";
import {
  TagsOperationsListOptionalParams,
  TagsOperationsDeleteOptionalParams,
  TagsOperationsCreateOrUpdateOptionalParams,
  TagsOperationsCreateOrUpdateValueOptionalParams,
  TagsOperationsDeleteValueOptionalParams,
  TagsOperationsDeleteAtScopeOptionalParams,
  TagsOperationsUpdateAtScopeOptionalParams,
  TagsOperationsCreateOrUpdateAtScopeOptionalParams,
  TagsOperationsGetAtScopeOptionalParams,
} from "../../api/tagsOperations/options.js";
import { TagsResource, TagsPatchResource, TagValue, TagDetails } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TagsOperations operations. */
export interface TagsOperationsOperations {
  /** This operation performs a union of predefined tags, resource tags, resource group tags and subscription tags, and returns a summary of usage for each tag name and value under the given subscription. In case of a large number of tags, this operation may return a previously cached result. */
  list: (options?: TagsOperationsListOptionalParams) => PagedAsyncIterableIterator<TagDetails>;
  /** This operation allows deleting a name from the list of predefined tag names for the given subscription. The name being deleted must not be in use as a tag name for any resource. All predefined values for the given name must have already been deleted. */
  delete: (tagName: string, options?: TagsOperationsDeleteOptionalParams) => Promise<void>;
  /** This operation allows adding a name to the list of predefined tag names for the given subscription. A tag name can have a maximum of 512 characters and is case-insensitive. Tag names cannot have the following prefixes which are reserved for Azure use: 'microsoft', 'azure', 'windows'. */
  createOrUpdate: (
    tagName: string,
    options?: TagsOperationsCreateOrUpdateOptionalParams,
  ) => Promise<TagDetails>;
  /** This operation allows adding a value to the list of predefined values for an existing predefined tag name. A tag value can have a maximum of 256 characters. */
  createOrUpdateValue: (
    tagName: string,
    tagValue: string,
    options?: TagsOperationsCreateOrUpdateValueOptionalParams,
  ) => Promise<TagValue>;
  /** This operation allows deleting a value from the list of predefined values for an existing predefined tag name. The value being deleted must not be in use as a tag value for the given tag name for any resource. */
  deleteValue: (
    tagName: string,
    tagValue: string,
    options?: TagsOperationsDeleteValueOptionalParams,
  ) => Promise<void>;
  /** Deletes the entire set of tags on a resource or subscription. */
  deleteAtScope: (
    scope: string,
    options?: TagsOperationsDeleteAtScopeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteAtScope instead */
  beginDeleteAtScope: (
    scope: string,
    options?: TagsOperationsDeleteAtScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtScope instead */
  beginDeleteAtScopeAndWait: (
    scope: string,
    options?: TagsOperationsDeleteAtScopeOptionalParams,
  ) => Promise<void>;
  /** This operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs. */
  updateAtScope: (
    scope: string,
    parameters: TagsPatchResource,
    options?: TagsOperationsUpdateAtScopeOptionalParams,
  ) => PollerLike<OperationState<TagsResource>, TagsResource>;
  /** @deprecated use updateAtScope instead */
  beginUpdateAtScope: (
    scope: string,
    parameters: TagsPatchResource,
    options?: TagsOperationsUpdateAtScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TagsResource>, TagsResource>>;
  /** @deprecated use updateAtScope instead */
  beginUpdateAtScopeAndWait: (
    scope: string,
    parameters: TagsPatchResource,
    options?: TagsOperationsUpdateAtScopeOptionalParams,
  ) => Promise<TagsResource>;
  /** This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags. */
  createOrUpdateAtScope: (
    scope: string,
    parameters: TagsResource,
    options?: TagsOperationsCreateOrUpdateAtScopeOptionalParams,
  ) => PollerLike<OperationState<TagsResource>, TagsResource>;
  /** @deprecated use createOrUpdateAtScope instead */
  beginCreateOrUpdateAtScope: (
    scope: string,
    parameters: TagsResource,
    options?: TagsOperationsCreateOrUpdateAtScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TagsResource>, TagsResource>>;
  /** @deprecated use createOrUpdateAtScope instead */
  beginCreateOrUpdateAtScopeAndWait: (
    scope: string,
    parameters: TagsResource,
    options?: TagsOperationsCreateOrUpdateAtScopeOptionalParams,
  ) => Promise<TagsResource>;
  /** Gets the entire set of tags on a resource or subscription. */
  getAtScope: (
    scope: string,
    options?: TagsOperationsGetAtScopeOptionalParams,
  ) => Promise<TagsResource>;
}

function _getTagsOperations(context: ResourceManagementContext) {
  return {
    list: (options?: TagsOperationsListOptionalParams) => list(context, options),
    delete: (tagName: string, options?: TagsOperationsDeleteOptionalParams) =>
      $delete(context, tagName, options),
    createOrUpdate: (tagName: string, options?: TagsOperationsCreateOrUpdateOptionalParams) =>
      createOrUpdate(context, tagName, options),
    createOrUpdateValue: (
      tagName: string,
      tagValue: string,
      options?: TagsOperationsCreateOrUpdateValueOptionalParams,
    ) => createOrUpdateValue(context, tagName, tagValue, options),
    deleteValue: (
      tagName: string,
      tagValue: string,
      options?: TagsOperationsDeleteValueOptionalParams,
    ) => deleteValue(context, tagName, tagValue, options),
    deleteAtScope: (scope: string, options?: TagsOperationsDeleteAtScopeOptionalParams) =>
      deleteAtScope(context, scope, options),
    beginDeleteAtScope: async (
      scope: string,
      options?: TagsOperationsDeleteAtScopeOptionalParams,
    ) => {
      const poller = deleteAtScope(context, scope, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtScopeAndWait: async (
      scope: string,
      options?: TagsOperationsDeleteAtScopeOptionalParams,
    ) => {
      return await deleteAtScope(context, scope, options);
    },
    updateAtScope: (
      scope: string,
      parameters: TagsPatchResource,
      options?: TagsOperationsUpdateAtScopeOptionalParams,
    ) => updateAtScope(context, scope, parameters, options),
    beginUpdateAtScope: async (
      scope: string,
      parameters: TagsPatchResource,
      options?: TagsOperationsUpdateAtScopeOptionalParams,
    ) => {
      const poller = updateAtScope(context, scope, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAtScopeAndWait: async (
      scope: string,
      parameters: TagsPatchResource,
      options?: TagsOperationsUpdateAtScopeOptionalParams,
    ) => {
      return await updateAtScope(context, scope, parameters, options);
    },
    createOrUpdateAtScope: (
      scope: string,
      parameters: TagsResource,
      options?: TagsOperationsCreateOrUpdateAtScopeOptionalParams,
    ) => createOrUpdateAtScope(context, scope, parameters, options),
    beginCreateOrUpdateAtScope: async (
      scope: string,
      parameters: TagsResource,
      options?: TagsOperationsCreateOrUpdateAtScopeOptionalParams,
    ) => {
      const poller = createOrUpdateAtScope(context, scope, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtScopeAndWait: async (
      scope: string,
      parameters: TagsResource,
      options?: TagsOperationsCreateOrUpdateAtScopeOptionalParams,
    ) => {
      return await createOrUpdateAtScope(context, scope, parameters, options);
    },
    getAtScope: (scope: string, options?: TagsOperationsGetAtScopeOptionalParams) =>
      getAtScope(context, scope, options),
  };
}

export function _getTagsOperationsOperations(
  context: ResourceManagementContext,
): TagsOperationsOperations {
  return {
    ..._getTagsOperations(context),
  };
}
