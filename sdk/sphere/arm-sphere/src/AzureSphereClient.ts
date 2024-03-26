// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getCatalogsOperations,
  CatalogsOperations,
} from "./classic/catalogs/index.js";
import {
  getImagesOperations,
  ImagesOperations,
} from "./classic/images/index.js";
import {
  getDeviceGroupsOperations,
  DeviceGroupsOperations,
} from "./classic/deviceGroups/index.js";
import {
  getCertificatesOperations,
  CertificatesOperations,
} from "./classic/certificates/index.js";
import {
  getDeploymentsOperations,
  DeploymentsOperations,
} from "./classic/deployments/index.js";
import {
  getDevicesOperations,
  DevicesOperations,
} from "./classic/devices/index.js";
import {
  getProductsOperations,
  ProductsOperations,
} from "./classic/products/index.js";
import {
  createAzureSphere,
  AzureSphereClientOptions,
  AzureSphereContext,
} from "./api/index.js";

export { AzureSphereClientOptions } from "./api/AzureSphereContext.js";

export class AzureSphereClient {
  private _client: AzureSphereContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Sphere resource management API. */
  constructor(
    credential: TokenCredential,
    options: AzureSphereClientOptions = {},
  ) {
    this._client = createAzureSphere(credential, options);
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.catalogs = getCatalogsOperations(this._client);
    this.images = getImagesOperations(this._client);
    this.deviceGroups = getDeviceGroupsOperations(this._client);
    this.certificates = getCertificatesOperations(this._client);
    this.deployments = getDeploymentsOperations(this._client);
    this.devices = getDevicesOperations(this._client);
    this.products = getProductsOperations(this._client);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for Catalogs */
  public readonly catalogs: CatalogsOperations;
  /** The operation groups for Images */
  public readonly images: ImagesOperations;
  /** The operation groups for DeviceGroups */
  public readonly deviceGroups: DeviceGroupsOperations;
  /** The operation groups for Certificates */
  public readonly certificates: CertificatesOperations;
  /** The operation groups for Deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for Devices */
  public readonly devices: DevicesOperations;
  /** The operation groups for Products */
  public readonly products: ProductsOperations;
}
