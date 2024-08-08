// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createDefaultHttpClient,
  createPipelineRequest,
  HttpMethods,
} from "@azure/core-rest-pipeline";
import { diag } from "@opentelemetry/api";
import {
  AIMS_API_VERSION,
  AIMS_FORMAT,
  AIMS_URI,
  EU_CONNECTION_STRING,
  EU_ENDPOINTS,
  NON_EU_CONNECTION_STRING,
  StatsbeatResourceProvider,
  VirtualMachineInfo,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const os = require("os");

export class StatsbeatMetrics {
  protected resourceProvider: string = StatsbeatResourceProvider.unknown;
  protected vmInfo: VirtualMachineInfo = {};
  protected os: string = os.type();
  protected resourceIdentifier = "";

  protected async getResourceProvider(): Promise<void> {
    // Check resource provider
    this.resourceProvider = StatsbeatResourceProvider.unknown;
    if (process.env.AKS_ARM_NAMESPACE_ID) {
      // AKS
      this.resourceProvider = StatsbeatResourceProvider.aks;
      this.resourceIdentifier = process.env.AKS_ARM_NAMESPACE_ID;
    } else if (process.env.WEBSITE_SITE_NAME) {
      // Web apps
      this.resourceProvider = StatsbeatResourceProvider.appsvc;
      this.resourceIdentifier = process.env.WEBSITE_SITE_NAME;
      if (process.env.WEBSITE_HOME_STAMPNAME) {
        this.resourceIdentifier += "/" + process.env.WEBSITE_HOME_STAMPNAME;
      }
    } else if (process.env.FUNCTIONS_WORKER_RUNTIME) {
      // Function apps
      this.resourceProvider = StatsbeatResourceProvider.functions;
      if (process.env.WEBSITE_HOSTNAME) {
        this.resourceIdentifier = process.env.WEBSITE_HOSTNAME;
      }
    } else if (await this.getAzureComputeMetadata()) {
      this.resourceProvider = StatsbeatResourceProvider.vm;
      this.resourceIdentifier = this.vmInfo.id + "/" + this.vmInfo.subscriptionId;
      // Overrride OS as VM info have higher precedence
      if (this.vmInfo.osType) {
        this.os = this.vmInfo.osType;
      }
    } else {
      this.resourceProvider = StatsbeatResourceProvider.unknown;
    }
  }

  public async getAzureComputeMetadata(): Promise<boolean> {
    const httpClient = createDefaultHttpClient();
    const method: HttpMethods = "GET";

    const options = {
      url: `${AIMS_URI}?${AIMS_API_VERSION}&${AIMS_FORMAT}`,
      timeout: 5000, // 5 seconds
      method: method,
      allowInsecureConnection: true,
    };
    const request = createPipelineRequest(options);

    await httpClient
      .sendRequest(request)
      .then((res: any) => {
        if (res.status === 200) {
          // Success; VM
          this.vmInfo.isVM = true;
          let virtualMachineData = "";
          res.on("data", (data: any) => {
            virtualMachineData += data;
          });
          res.on("end", () => {
            try {
              const data = JSON.parse(virtualMachineData);
              this.vmInfo.id = data["vmId"] || "";
              this.vmInfo.subscriptionId = data["subscriptionId"] || "";
              this.vmInfo.osType = data["osType"] || "";
            } catch (error) {
              diag.debug("Failed to parse JSON: ", error);
            }
          });
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
    return false;
  }

  protected getConnectionString(endpointUrl: string): string {
    const currentEndpoint = endpointUrl;
    for (let i = 0; i < EU_ENDPOINTS.length; i++) {
      if (currentEndpoint.includes(EU_ENDPOINTS[i])) {
        return EU_CONNECTION_STRING;
      }
    }
    return NON_EU_CONNECTION_STRING;
  }
}
