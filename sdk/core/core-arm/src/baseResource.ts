// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { CompositeMapper } from "@azure/core-http";

/**
 * @class
 * An empty interface.
 */
export interface BaseResource { }

export const BaseResourceMapper: CompositeMapper = {
  serializedName: "BaseResource",
  type: {
    name: "Composite",
    className: "BaseResource",
    modelProperties: {
    }
  }
};
