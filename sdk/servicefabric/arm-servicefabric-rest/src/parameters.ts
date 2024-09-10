// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import {
  ApplicationResource,
  ApplicationResourceUpdate,
  ApplicationTypeResource,
  ApplicationTypeVersionResource,
  Cluster,
  ClusterUpdateParameters,
  ServiceResource,
  ServiceResourceUpdate,
  UpgradableVersionsDescription,
} from "./models";

export type ClustersGetParameters = RequestParameters;

export interface ClustersCreateOrUpdateBodyParam {
  /** The cluster resource. */
  body: Cluster;
}

export interface ClustersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ClustersCreateOrUpdateParameters = ClustersCreateOrUpdateMediaTypesParam &
  ClustersCreateOrUpdateBodyParam &
  RequestParameters;

export interface ClustersUpdateBodyParam {
  /** The parameters which contains the property value and property name which used to update the cluster configuration. */
  body: ClusterUpdateParameters;
}

export interface ClustersUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ClustersUpdateParameters = ClustersUpdateMediaTypesParam &
  ClustersUpdateBodyParam &
  RequestParameters;
export type ClustersDeleteParameters = RequestParameters;
export type ClustersListByResourceGroupParameters = RequestParameters;
export type ClustersListParameters = RequestParameters;

export interface ClustersListUpgradableVersionsBodyParam {
  /** The upgrade path description with target version. */
  body?: UpgradableVersionsDescription;
}

export interface ClustersListUpgradableVersionsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ClustersListUpgradableVersionsParameters =
  ClustersListUpgradableVersionsMediaTypesParam &
    ClustersListUpgradableVersionsBodyParam &
    RequestParameters;
export type ClusterVersionsGetParameters = RequestParameters;
export type ClusterVersionsGetByEnvironmentParameters = RequestParameters;
export type ClusterVersionsListParameters = RequestParameters;
export type ClusterVersionsListByEnvironmentParameters = RequestParameters;
export type OperationsListParameters = RequestParameters;
export type ApplicationTypesGetParameters = RequestParameters;

export interface ApplicationTypesCreateOrUpdateBodyParam {
  /** The application type name resource. */
  body: ApplicationTypeResource;
}

export interface ApplicationTypesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationTypesCreateOrUpdateParameters =
  ApplicationTypesCreateOrUpdateMediaTypesParam &
    ApplicationTypesCreateOrUpdateBodyParam &
    RequestParameters;
export type ApplicationTypesDeleteParameters = RequestParameters;
export type ApplicationTypesListParameters = RequestParameters;
export type ApplicationTypeVersionsGetParameters = RequestParameters;

export interface ApplicationTypeVersionsCreateOrUpdateBodyParam {
  /** The application type version resource. */
  body: ApplicationTypeVersionResource;
}

export interface ApplicationTypeVersionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationTypeVersionsCreateOrUpdateParameters =
  ApplicationTypeVersionsCreateOrUpdateMediaTypesParam &
    ApplicationTypeVersionsCreateOrUpdateBodyParam &
    RequestParameters;
export type ApplicationTypeVersionsDeleteParameters = RequestParameters;
export type ApplicationTypeVersionsListParameters = RequestParameters;
export type ApplicationsGetParameters = RequestParameters;

export interface ApplicationsCreateOrUpdateBodyParam {
  /** The application resource. */
  body: ApplicationResource;
}

export interface ApplicationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationsCreateOrUpdateParameters = ApplicationsCreateOrUpdateMediaTypesParam &
  ApplicationsCreateOrUpdateBodyParam &
  RequestParameters;

export interface ApplicationsUpdateBodyParam {
  /** The application resource for patch operations. */
  body: ApplicationResourceUpdate;
}

export interface ApplicationsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationsUpdateParameters = ApplicationsUpdateMediaTypesParam &
  ApplicationsUpdateBodyParam &
  RequestParameters;
export type ApplicationsDeleteParameters = RequestParameters;
export type ApplicationsListParameters = RequestParameters;
export type ServicesGetParameters = RequestParameters;

export interface ServicesCreateOrUpdateBodyParam {
  /** The service resource. */
  body: ServiceResource;
}

export interface ServicesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ServicesCreateOrUpdateParameters = ServicesCreateOrUpdateMediaTypesParam &
  ServicesCreateOrUpdateBodyParam &
  RequestParameters;

export interface ServicesUpdateBodyParam {
  /** The service resource for patch operations. */
  body: ServiceResourceUpdate;
}

export interface ServicesUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ServicesUpdateParameters = ServicesUpdateMediaTypesParam &
  ServicesUpdateBodyParam &
  RequestParameters;
export type ServicesDeleteParameters = RequestParameters;
export type ServicesListParameters = RequestParameters;
