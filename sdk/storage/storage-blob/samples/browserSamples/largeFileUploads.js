// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * Here we demonstrate how to inject new SAS for an ongoing upload.
 * SAS might get expired before a large upload finishes, for this scenario, we want to request a new
 * SAS token during the upload instead of starting a new upload.
 *
 * In this sample, we give a SAS injection sample for browsers like Chrome which supports await/async.
 *
 * Before executing the sample:
 * - Make sure storage account has CORS set up properly
 * - Implement method `getNewSasForBlob`
 * - Update url in `upload()` method
 *
 * This sample creates a global function called `upload` that will upload
 * data from a file upload form. For example, the following HTML will create
 * such a form.
 *
 * <form><input type="file" id="file" /></form>
 * <button id="upload" onclick="upload()">Upload</button>
 *
 * For instructions on building this sample for the browser, refer to
 * "Building for Browsers" in the readme.
 *
 *
 */

import {
  BlockBlobClient,
  AnonymousCredential,
  BaseRequestPolicy,
  newPipeline
} from "@azure/storage-blob";

class SasStore {
  constructor() {
    this.sasCache = {};
  }

  // Get a valid SAS for blob
  async getValidSASForBlob(blobURL) {
    if (this.sasCache[blobURL] && this.isSasStillValidInNext2Mins(this.sasCache[blobURL])) {
      return this.sasCache[blobURL];
    } else {
      return (this.sasCache[blobURL] = await this.getNewSasForBlob(blobURL));
    }
  }

  // Return true if "se" section in SAS is still valid in next 2 mins
  isSasStillValidInNext2Mins(sas) {
    const expiryStringInSas = new URL(`http://hostname${sas}`).searchParams.get("se");
    return new Date(expiryStringInSas) - new Date() >= 2 * 60 * 1000;
  }

  // Get a new SAS for blob, we assume a SAS starts with a "?"
  async getNewSasForBlob(blobURL) {
    // TODO: You need to implement this
    return "?newSAS";
  }
}

class SasUpdatePolicyFactory {
  constructor(sasStore) {
    this.sasStore = sasStore;
  }
  create(nextPolicy, options) {
    return new SasUpdatePolicy(nextPolicy, options, this.sasStore);
  }
}

class SasUpdatePolicy extends BaseRequestPolicy {
  constructor(nextPolicy, options, sasStore) {
    super(nextPolicy, options);
    this.sasStore = sasStore;
  }

  async sendRequest(request) {
    const urlObj = new URL(request.url);
    const sas = await this.sasStore.getValidSASForBlob(`${urlObj.origin}${urlObj.pathname}`);
    new URL(`http://hostname${sas}`).searchParams.forEach((value, key) => {
      urlObj.searchParams.set(key, value);
    });

    // Update request URL with latest SAS
    request.url = urlObj.toString();

    return this._nextPolicy.sendRequest(request);
  }
}

async function upload() {
  const sasStore = new SasStore();

  const pipeline = newPipeline(new AnonymousCredential());
  // Inject SAS update policy factory into current pipeline
  pipeline.factories.unshift(new SasUpdatePolicyFactory(sasStore));

  const url = "https://jsv10.blob.core.windows.net/mycontainer/myblob";
  const blockBlobClient = new BlockBlobClient(
    `${url}${await sasStore.getValidSASForBlob(url)}`, // A SAS should start with "?"
    pipeline
  );

  const file = document.getElementById("file").files[0];
  await blockBlobClient.uploadBrowserData(file, {
    maxSingleShotSize: 4 * 1024 * 1024,
    blobHTTPHeaders: { blobContentType: file.type } // set mimetype
  });
}
