// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { RouterClient } from "../../src";
<<<<<<< HEAD
import { baseUri, generateToken } from "../public/utils/connection";
=======
import { baseUri, generateToken } from "../public/utils/connectionUtils";
>>>>>>> 08657c4338598237103f968c03a0f4b2790dcb0b

describe("[Mocked] RouterClient", async () => {
  afterEach(() => {
    sinon.restore();
  });

  it("can instantiate", async () => {
    new RouterClient(baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });
});
