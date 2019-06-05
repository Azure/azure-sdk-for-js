// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { EnvironmentCredential } from '../../src';
import { MockAuthHttpClient, assertClientCredentials } from './authTestUtils'

describe('EnvironmentCredential', function() {
  it('finds and uses client credential environment variables', async () => {
    process.env.AZURE_TENANT_ID = "tenant"
    process.env.AZURE_CLIENT_ID = "client"
    process.env.AZURE_CLIENT_SECRET = "secret"

    const mockHttpClient = new MockAuthHttpClient();

    const credential = new EnvironmentCredential(mockHttpClient.identityClientOptions);
    await credential.getToken('scope')
    
    delete process.env.AZURE_TENANT_ID
    delete process.env.AZURE_CLIENT_ID
    delete process.env.AZURE_CLIENT_SECRET

    const authRequest = await mockHttpClient.getAuthRequest()
    assertClientCredentials(authRequest, "tenant", "client", "secret")
  })
})