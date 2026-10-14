// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext, AzureSphereClientOptionalParams } from "./api/index.js";
import { createAzureSphere } from "./api/index.js";
import type { CatalogsOperations } from "./classic/catalogs/index.js";
import { _getCatalogsOperations } from "./classic/catalogs/index.js";
import type { CertificatesOperations } from "./classic/certificates/index.js";
import { _getCertificatesOperations } from "./classic/certificates/index.js";
import type { DeploymentsOperations } from "./classic/deployments/index.js";
import { _getDeploymentsOperations } from "./classic/deployments/index.js";
import type { DeviceGroupsOperations } from "./classic/deviceGroups/index.js";
import { _getDeviceGroupsOperations } from "./classic/deviceGroups/index.js";
import type { DevicesOperations } from "./classic/devices/index.js";
import { _getDevicesOperations } from "./classic/devices/index.js";
import type { ImagesOperations } from "./classic/images/index.js";
import { _getImagesOperations } from "./classic/images/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProductsOperations } from "./classic/products/index.js";
import { _getProductsOperations } from "./classic/products/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureSphereClientOptionalParams } from "./api/azureSphereContext.js";

export class AzureSphereClient {
  private _client: AzureSphereContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Sphere resource management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureSphereClientOptionalParams = {},
  ) {
    this._client = createAzureSphere(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.devices = _getDevicesOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
    this.deviceGroups = _getDeviceGroupsOperations(this._client);
    this.products = _getProductsOperations(this._client);
    this.images = _getImagesOperations(this._client);
    this.certificates = _getCertificatesOperations(this._client);
    this.catalogs = _getCatalogsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for devices */
  public readonly devices: DevicesOperations;
  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for deviceGroups */
  public readonly deviceGroups: DeviceGroupsOperations;
  /** The operation groups for products */
  public readonly products: ProductsOperations;
  /** The operation groups for images */
  public readonly images: ImagesOperations;
  /** The operation groups for certificates */
  public readonly certificates: CertificatesOperations;
  /** The operation groups for catalogs */
  public readonly catalogs: CatalogsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
