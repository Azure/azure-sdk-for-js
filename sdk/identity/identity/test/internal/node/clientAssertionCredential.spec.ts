// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";
import { env } from "@azure-tools/test-recorder";
import { ClientAssertionCredential } from "../../../src";
import { Context } from "mocha";
import Sinon from "sinon";
import { msalNodeTestSetup, MsalTestCleanup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import { ConfidentialClientApplication } from "@azure/msal-node";

describe("ClientAssertionCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");
    doGetTokenSpy = Sinon.spy(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    );
  });
  afterEach(async function () {
    await cleanup();
    Sinon.restore();
  });

  it("Should throw if the parameteres are not correctly specified", async function () {
    const errors: Error[] = [];
    try {
      new ClientAssertionCredential(undefined as any, env.AZURE_CLIENT_ID || "client", async () => "assertion");
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(env.AZURE_TENANT_ID || "tenant", undefined as any, async () => "assertion");
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(env.AZURE_TENANT_ID || "tenant", env.AZURE_CLIENT_ID || "client", undefined as any);
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientAssertionCredential(undefined as any, undefined as any, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    assert.equal(errors.length, 4);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientAssertionCredential: tenantId, clientId, and clientAssertion are required parameters."
      );
    });
  });

  it.only("Sends the expected parameters", async function () {
    async function getAssertion(): Promise<string> {

      return "assertion";
    };
    const credential = new ClientAssertionCredential(
      env.AZURE_TENANT_ID || "tenant",
      env.AZURE_CLIENT_ID || "client",
      getAssertion
    );

    try {
      await credential.getToken("https://vault.azure.net/.default");
    } catch (e) {
      // We're ignoring errors since our main goal here is to ensure that we send the correct parameters to MSAL.
      console.log("error");
      console.log(e);
    }

    console.log(getTokenSilentSpy.callCount);
    console.log(doGetTokenSpy.callCount);

    // console.dir(spy.calledWith({
    //   assertion: await getAssertion(),
    //   assertionType: "jwt_bearer"
    // }));
    console.log(doGetTokenSpy.args[0]);
    const sentConfiguration = doGetTokenSpy.args[0][0];
    assert.equal(sentConfiguration.clientAssertion.assertion, "assertion");
    assert.equal(sentConfiguration.clientAssertion.assertionType, "urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
  });
});


/*
async function createClientAssertion(authorityHost: string, clientId: string, tenantId: string, clientCertificatePath: string): Promise<void> {
    
 const certificatePart: CertificateParts = await parseCertificate({certificatePath: clientCertificatePath});

  // var audienceBuilder = new RequestUriBuilder();

  //   audienceBuilder.Reset(authorityHost);

  //   audienceBuilder.AppendPath(tenantId + "/v2.0", false);

  //   var audience = audienceBuilder.ToString();

  //   var headerBuff = new ArrayBufferWriter<byte>();

  //   using(var headerJson = new Utf8JsonWriter(headerBuff))
  //     {
  //       headerJson.WriteStartObject();

  //   headerJson.WriteString("typ", "JWT");
  //   headerJson.WriteString("alg", "RS256");
  //   headerJson.WriteString("x5t", HexToBase64Url(clientCertificate.Thumbprint));

  //   headerJson.WriteEndObject();

  //   headerJson.Flush();
  // }

  // var payloadBuff = new ArrayBufferWriter<byte>();

  // using(var payloadJson = new Utf8JsonWriter(payloadBuff))
  //   {
  //     payloadJson.WriteStartObject();

  // payloadJson.WriteString("jti", Guid.NewGuid());
  // payloadJson.WriteString("aud", audience);
  // payloadJson.WriteString("iss", clientId);
  // payloadJson.WriteString("sub", clientId);
  // payloadJson.WriteNumber("nbf", DateTimeOffset.UtcNow.ToUnixTimeSeconds());
  // payloadJson.WriteNumber("exp", (DateTimeOffset.UtcNow + TimeSpan.FromMinutes(30)).ToUnixTimeSeconds());

  // payloadJson.WriteEndObject();

  // payloadJson.Flush();
//}

//             string header = Base64Url.Encode(headerBuff.WrittenMemory.ToArray());

//             string payload = Base64Url.Encode(payloadBuff.WrittenMemory.ToArray());

//             string flattenedJws = header + "." + payload;

// byte[] signature = clientCertificate.GetRSAPrivateKey().SignData(Encoding.ASCII.GetBytes(flattenedJws), HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);

// return flattenedJws + "." + Base64Url.Encode(signature);
//         }
}
*/
