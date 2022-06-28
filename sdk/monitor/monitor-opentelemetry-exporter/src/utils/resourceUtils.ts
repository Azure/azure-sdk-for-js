// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import os from "os";
import {
  SemanticResourceAttributes,
  SemanticAttributes,
} from "@opentelemetry/semantic-conventions";
import { Tags } from "../types";
import { getInstance } from "../platform";
import { KnownContextTagKeys } from "../generated";
import { Resource } from "@opentelemetry/resources";

export function createTagsFromResource(resource: Resource): Tags {
  const context = getInstance();
  const tags: Tags = { ...context.tags };
  if (resource && resource.attributes) {
    const serviceName = resource.attributes[SemanticResourceAttributes.SERVICE_NAME];
    const serviceNamespace = resource.attributes[SemanticResourceAttributes.SERVICE_NAMESPACE];
    if (serviceName) {
      if (serviceNamespace) {
        tags[KnownContextTagKeys.AiCloudRole] = `${serviceNamespace}.${serviceName}`;
      } else {
        tags[KnownContextTagKeys.AiCloudRole] = String(serviceName);
      }
    }
    const serviceInstanceId = resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID];
    if (serviceInstanceId) {
      tags[KnownContextTagKeys.AiCloudRoleInstance] = String(serviceInstanceId);
    } else {
      tags[KnownContextTagKeys.AiCloudRoleInstance] = os && os.hostname();
    }
    const endUserId = resource.attributes[SemanticAttributes.ENDUSER_ID];
    if (endUserId) {
      tags[KnownContextTagKeys.AiUserId] = String(endUserId);
    }
  }
  return tags;
}
