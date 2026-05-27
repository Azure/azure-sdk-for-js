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
} from "../../api/tags/operations.js";
import {
  TagsListOptionalParams,
  TagsDeleteOptionalParams,
  TagsCreateOrUpdateOptionalParams,
  TagsCreateOrUpdateValueOptionalParams,
  TagsDeleteValueOptionalParams,
  TagsDeleteAtScopeOptionalParams,
  TagsUpdateAtScopeOptionalParams,
  TagsCreateOrUpdateAtScopeOptionalParams,
  TagsGetAtScopeOptionalParams,
} from "../../api/tags/options.js";
import { TagsResource, TagsPatchResource, TagValue, TagDetails } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Tags operations. */
export interface TagsOperations {
  /** This operation performs a union of predefined tags, resource tags, resource group tags and subscription tags, and returns a summary of usage for each tag name and value under the given subscription. In case of a large number of tags, this operation may return a previously cached result. */
  list: (options?: TagsListOptionalParams) => PagedAsyncIterableIterator<TagDetails>;
  /** This operation allows deleting a name from the list of predefined tag names for the given subscription. The name being deleted must not be in use as a tag name for any resource. All predefined values for the given name must have already been deleted. */
  delete: (tagName: string, options?: TagsDeleteOptionalParams) => Promise<void>;
  /** This operation allows adding a name to the list of predefined tag names for the given subscription. A tag name can have a maximum of 512 characters and is case-insensitive. Tag names cannot have the following prefixes which are reserved for Azure use: 'microsoft', 'azure', 'windows'. */
  createOrUpdate: (
    tagName: string,
    options?: TagsCreateOrUpdateOptionalParams,
  ) => Promise<TagDetails>;
  /** This operation allows adding a value to the list of predefined values for an existing predefined tag name. A tag value can have a maximum of 256 characters. */
  createOrUpdateValue: (
    tagName: string,
    tagValue: string,
    options?: TagsCreateOrUpdateValueOptionalParams,
  ) => Promise<TagValue>;
  /** This operation allows deleting a value from the list of predefined values for an existing predefined tag name. The value being deleted must not be in use as a tag value for the given tag name for any resource. */
  deleteValue: (
    tagName: string,
    tagValue: string,
    options?: TagsDeleteValueOptionalParams,
  ) => Promise<void>;
  /** Deletes the entire set of tags on a resource or subscription. */
  deleteAtScope: (
    scope: string,
    options?: TagsDeleteAtScopeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteAtScope instead */
  beginDeleteAtScope: (
    scope: string,
    options?: TagsDeleteAtScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtScope instead */
  beginDeleteAtScopeAndWait: (
    scope: string,
    options?: TagsDeleteAtScopeOptionalParams,
  ) => Promise<void>;
  /** This operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs. */
  updateAtScope: (
    scope: string,
    parameters: TagsPatchResource,
    options?: TagsUpdateAtScopeOptionalParams,
  ) => PollerLike<OperationState<TagsResource>, TagsResource>;
  /** @deprecated use updateAtScope instead */
  beginUpdateAtScope: (
    scope: string,
    parameters: TagsPatchResource,
    options?: TagsUpdateAtScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TagsResource>, TagsResource>>;
  /** @deprecated use updateAtScope instead */
  beginUpdateAtScopeAndWait: (
    scope: string,
    parameters: TagsPatchResource,
    options?: TagsUpdateAtScopeOptionalParams,
  ) => Promise<TagsResource>;
  /** This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags. */
  createOrUpdateAtScope: (
    scope: string,
    parameters: TagsResource,
    options?: TagsCreateOrUpdateAtScopeOptionalParams,
  ) => PollerLike<OperationState<TagsResource>, TagsResource>;
  /** @deprecated use createOrUpdateAtScope instead */
  beginCreateOrUpdateAtScope: (
    scope: string,
    parameters: TagsResource,
    options?: TagsCreateOrUpdateAtScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<TagsResource>, TagsResource>>;
  /** @deprecated use createOrUpdateAtScope instead */
  beginCreateOrUpdateAtScopeAndWait: (
    scope: string,
    parameters: TagsResource,
    options?: TagsCreateOrUpdateAtScopeOptionalParams,
  ) => Promise<TagsResource>;
  /** Gets the entire set of tags on a resource or subscription. */
  getAtScope: (scope: string, options?: TagsGetAtScopeOptionalParams) => Promise<TagsResource>;
}

function _getTags(context: ResourceManagementContext) {
  return {
    list: (options?: TagsListOptionalParams) => list(context, options),
    delete: (tagName: string, options?: TagsDeleteOptionalParams) =>
      $delete(context, tagName, options),
    createOrUpdate: (tagName: string, options?: TagsCreateOrUpdateOptionalParams) =>
      createOrUpdate(context, tagName, options),
    createOrUpdateValue: (
      tagName: string,
      tagValue: string,
      options?: TagsCreateOrUpdateValueOptionalParams,
    ) => createOrUpdateValue(context, tagName, tagValue, options),
    deleteValue: (tagName: string, tagValue: string, options?: TagsDeleteValueOptionalParams) =>
      deleteValue(context, tagName, tagValue, options),
    deleteAtScope: (scope: string, options?: TagsDeleteAtScopeOptionalParams) =>
      deleteAtScope(context, scope, options),
    beginDeleteAtScope: async (scope: string, options?: TagsDeleteAtScopeOptionalParams) => {
      const poller = deleteAtScope(context, scope, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtScopeAndWait: async (scope: string, options?: TagsDeleteAtScopeOptionalParams) => {
      return await deleteAtScope(context, scope, options);
    },
    updateAtScope: (
      scope: string,
      parameters: TagsPatchResource,
      options?: TagsUpdateAtScopeOptionalParams,
    ) => updateAtScope(context, scope, parameters, options),
    beginUpdateAtScope: async (
      scope: string,
      parameters: TagsPatchResource,
      options?: TagsUpdateAtScopeOptionalParams,
    ) => {
      const poller = updateAtScope(context, scope, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAtScopeAndWait: async (
      scope: string,
      parameters: TagsPatchResource,
      options?: TagsUpdateAtScopeOptionalParams,
    ) => {
      return await updateAtScope(context, scope, parameters, options);
    },
    createOrUpdateAtScope: (
      scope: string,
      parameters: TagsResource,
      options?: TagsCreateOrUpdateAtScopeOptionalParams,
    ) => createOrUpdateAtScope(context, scope, parameters, options),
    beginCreateOrUpdateAtScope: async (
      scope: string,
      parameters: TagsResource,
      options?: TagsCreateOrUpdateAtScopeOptionalParams,
    ) => {
      const poller = createOrUpdateAtScope(context, scope, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtScopeAndWait: async (
      scope: string,
      parameters: TagsResource,
      options?: TagsCreateOrUpdateAtScopeOptionalParams,
    ) => {
      return await createOrUpdateAtScope(context, scope, parameters, options);
    },
    getAtScope: (scope: string, options?: TagsGetAtScopeOptionalParams) =>
      getAtScope(context, scope, options),
  };
}

export function _getTagsOperations(context: ResourceManagementContext): TagsOperations {
  return {
    ..._getTags(context),
  };
}
