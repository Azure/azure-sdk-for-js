// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* 
  You can create your own policy and inject it into the default pipeline, or create your own Pipeline.
  A request policy is a filter triggered before and after a HTTP request. With a filter, we can tweak HTTP requests and responses. 
  For example, add a customized header, update URL or create logs. A HTTP pipeline is a group of policy factories.

  Here we provide a sample to demonstrate how to customize the x-ms-client-request-id header for all outgoing HTTP requests.
  This sample is just to demo the feature. Feel free to move the classes into one file in your code.

  Setup: Enter your storage account name and shared key in main()
*/

import {
  newPipeline,
  AnonymousCredential,
  BlobServiceClient,
  BaseRequestPolicy,
  WebResource,
  RequestPolicy,
  RequestPolicyOptions
} from "@azure/storage-blob";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Create a policy factory with create() method provided
class RequestIDPolicyFactory {
  prefix: string;
  // Constructor to accept parameters
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  // create() method needs to create a new RequestIDPolicy object
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    return new RequestIDPolicy(nextPolicy, options, this.prefix);
  }
}

// Create a policy by extending from BaseRequestPolicy
class RequestIDPolicy extends BaseRequestPolicy {
  prefix: string;
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, prefix: string) {
    super(nextPolicy, options);
    this.prefix = prefix;
  }

  // Customize HTTP requests and responses by overriding sendRequest
  // Parameter request is WebResource type
  async sendRequest(request: WebResource) {
    // Customize client request ID header
    request.headers.set(
      "x-ms-client-request-id",
      `${this.prefix}_SOME_PATTERN_${new Date().getTime()}`
    );

    // response is HttpOperationResponse type
    const response = await this._nextPolicy.sendRequest(request);

    // Modify response here if needed

    return response;
  }
}

// Main function
export async function main() {
  const account = process.env.ACCOUNT_NAME || "";
  const accountSas = process.env.ACCOUNT_SAS || "";

  // Create a default pipeline with newPipeline
  const pipeline = newPipeline(new AnonymousCredential());

  // Inject customized factory into default pipeline
  pipeline.factories.unshift(new RequestIDPolicyFactory("Prefix"));

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${accountSas}`,
    pipeline
  );
  const response = (
    await blobServiceClient
      .listContainers()
      .byPage()
      .next()
  ).value;

  // Check customized client request ID
  console.log(response._response.request.headers.get("x-ms-client-request-id"));
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
