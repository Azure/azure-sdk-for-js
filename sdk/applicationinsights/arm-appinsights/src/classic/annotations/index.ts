// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { get, $delete, create, list } from "../../api/annotations/operations.js";
import {
  AnnotationsGetOptionalParams,
  AnnotationsDeleteOptionalParams,
  AnnotationsCreateOptionalParams,
  AnnotationsListOptionalParams,
} from "../../api/annotations/options.js";
import { Annotation } from "../../models/componentAPIs/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Annotations operations. */
export interface AnnotationsOperations {
  /** Get the annotation for given id. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    options?: AnnotationsGetOptionalParams,
  ) => Promise<Annotation[]>;
  /** Delete an Annotation of an Application Insights component. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    annotationId: string,
    options?: AnnotationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create an Annotation of an Application Insights component. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    annotationProperties: Annotation,
    options?: AnnotationsCreateOptionalParams,
  ) => Promise<Annotation[]>;
  /** Gets the list of annotations for a component for given time range */
  list: (
    resourceGroupName: string,
    resourceName: string,
    start: string,
    end: string,
    options?: AnnotationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Annotation>;
}

function _getAnnotations(context: ApplicationInsightsManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      resourceName: string,
      annotationId: string,
      options?: AnnotationsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, annotationId, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      annotationId: string,
      options?: AnnotationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, annotationId, options),
    create: (
      resourceGroupName: string,
      resourceName: string,
      annotationProperties: Annotation,
      options?: AnnotationsCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, annotationProperties, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      start: string,
      end: string,
      options?: AnnotationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, start, end, options),
  };
}

export function _getAnnotationsOperations(
  context: ApplicationInsightsManagementContext,
): AnnotationsOperations {
  return {
    ..._getAnnotations(context),
  };
}
