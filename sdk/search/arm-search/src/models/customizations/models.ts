// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** model interface SearchManagementRequestOptions */
export interface SearchManagementRequestOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

export function searchManagementRequestOptionsSerializer(
  _item: SearchManagementRequestOptions,
): any {
  return {};
}

export function accessRulePropertiesSubscriptionsItemArrayDeserializer(
  result: Array<AccessRulePropertiesSubscriptionsItem>,
): any[] {
  return result.map((item) => {
    return accessRulePropertiesSubscriptionsItemDeserializer(item);
  });
}

/** Network security perimeter configuration */
export interface AccessRulePropertiesSubscriptionsItem {
  /** The fully qualified Azure resource ID of the subscription e.g. ('/subscriptions/00000000-0000-0000-0000-000000000000') */
  id?: string;
}

export function accessRulePropertiesSubscriptionsItemDeserializer(
  item: any,
): AccessRulePropertiesSubscriptionsItem {
  return {
    id: item["id"],
  };
}
