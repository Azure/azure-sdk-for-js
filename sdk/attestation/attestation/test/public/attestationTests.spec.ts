// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, expect, use as chaiUse } from "chai";
import { Context } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure-tools/test-recorder";

import {
  createRecordedAdminClient,
  createRecordedClient,
  createRecorder,
  EndpointType
} from "../utils/recordedClient";
import * as base64url from "../utils/base64url";

import { KnownAttestationType } from "../../src";

describe("[AAD] Attestation Client", function() {
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // runtimeData is a Base64Url encoded blob. The sgxQuote contains the SHA256 hash of this blob
  // inside the binary quote data, that can be used to verify that the enclave creating the quote
  // has knowledge of the contents of the runtimeData object.
  const _runtimeData =
    "CiAgICAgICAgewogI" +
    "CAgICAgICAgICAiandrIiA6IHsKICAgICAgICAgICAgICAgICJrdHkiOiJFQyIsCiAg" +
    "ICAgICAgICAgICAgICAidXNlIjoic2lnIiwKICAgICAgICAgICAgICAgICJjcnYiOiJ" +
    "QLTI1NiIsCiAgICAgICAgICAgICAgICAieCI6IjE4d0hMZUlnVzl3Vk42VkQxVHhncH" +
    "F5MkxzellrTWY2SjhualZBaWJ2aE0iLAogICAgICAgICAgICAgICAgInkiOiJjVjRkU" +
    "zRVYUxNZ1BfNGZZNGo4aXI3Y2wxVFhsRmRBZ2N4NTVvN1RrY1NBIgogICAgICAgICAg" +
    "ICB9CiAgICAgICAgfQogICAgICAgIA";

  // An SGX quote is a binary blob which is cryptographically verified to come from an Intel
  // SGX enclave. The Microsoft Azure Attestation service takes this SGX quote and
  // verifies that the quote is valid and returns a JSON Web Token which can be used by
  // a relying party to verify the runtimeData associated with the request.
  const _openEnclaveReport =
    "AQAAAAIAAADkEQAAAAAAAAMAAg" +
    "AAAAAABQAKAJOacjP3nEyplAoNs5V_Bgc42MPzGo7hPWS_h-3tExJrAAAAABERAwX_g" +
    "AYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAA" +
    "BwAAAAAAAAC3eSAmGL7LY2do5dkC8o1SQiJzX6-1OeqboHw_wXGhwgAAAAAAAAAAAAA" +
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAALBpElSroIHE1xsKbdbjAKTcu6UtnfhXCC9QjQP" +
    "ENQaoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB" +
    "AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "AAAAAAAAAAAAAAAAA7RGp65ffwXBToyppkucdBPfsmW5FUZq3EJNq-0j5BB0AAAAAAA" +
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAQAAB4iv_XjOJsrFMrPvIYOBCeMR2q6" +
    "xB08KluTNAtIgpZQUIzLNyy78Gmb5LE77UIVye2sao77dOGiz3wP2f5jhEE5iovgPhy" +
    "6-Qg8JQkqe8XJI6B5ZlWsfq3E7u9EvH7ZZ33MihT7aM-sXca4u92L8OIhpM2cfJguOS" +
    "AS3Q4pR4NdRERAwX_gAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "AAAAAAABUAAAAAAAAABwAAAAAAAAA_sKzghp0uMPKOhtcMdmQDpU-7zWWO7ODhuUipF" +
    "VkXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjE9XddeWUD6WE393xoqC" +
    "mgBWrI3tcBQLCBsJRJDFe_8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "AAAAAAAAAAAAAAAAABAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9rOmAu-jSSf1BAj_cC0mu7YCnx4QosD" +
    "78yj3sQX81IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH5Au8JZ_dpXiLY" +
    "aE1TtyGjGz0dtFZa7eGooRGTQzoJJuR8Xj-zUvyCKE4ABy0pajfE8lOGSUHuJoifisJ" +
    "NAhg4gAAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fBQDIDQAALS0tLS1CR" +
    "UdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVmekNDQkNhZ0F3SUJBZ0lVRk5xSnZZZTU4" +
    "ZXlpUjI2Yzd0L2lxU0pNYnFNd0NnWUlLb1pJemowRUF3SXcKY1RFak1DRUdBMVVFQXd" +
    "3YVNXNTBaV3dnVTBkWUlGQkRTeUJRY205alpYTnpiM0lnUTBFeEdqQVlCZ05WQkFvTQ" +
    "pFVWx1ZEdWc0lFTnZjbkJ2Y21GMGFXOXVNUlF3RWdZRFZRUUhEQXRUWVc1MFlTQkRiR" +
    "0Z5WVRFTE1Ba0dBMVVFCkNBd0NRMEV4Q3pBSkJnTlZCQVlUQWxWVE1CNFhEVEl4TURR" +
    "eU1USXdOVGt6T0ZvWERUSTRNRFF5TVRJd05Ua3oKT0Zvd2NERWlNQ0FHQTFVRUF3d1p" +
    "TVzUwWld3Z1UwZFlJRkJEU3lCRFpYSjBhV1pwWTJGMFpURWFNQmdHQTFVRQpDZ3dSU1" +
    "c1MFpXd2dRMjl5Y0c5eVlYUnBiMjR4RkRBU0JnTlZCQWNNQzFOaGJuUmhJRU5zWVhKa" +
    "E1Rc3dDUVlEClZRUUlEQUpEUVRFTE1Ba0dBMVVFQmhNQ1ZWTXdXVEFUQmdjcWhrak9Q" +
    "UUlCQmdncWhrak9QUU1CQndOQ0FBUTgKU2V1NWV4WCtvMGNkclhkeEtHMGEvQXRzdnV" +
    "lNVNoUFpmOHgwa2czc0xSM2E5TzVHWWYwcW1XSkptL0c4bzZyVgpvbVI2Nmh3cFJXNl" +
    "pqSm9ocXdvT280SUNtekNDQXBjd0h3WURWUjBqQkJnd0ZvQVUwT2lxMm5YWCtTNUpGN" +
    "Wc4CmV4UmwwTlh5V1Uwd1h3WURWUjBmQkZnd1ZqQlVvRktnVUlaT2FIUjBjSE02THk5" +
    "aGNHa3VkSEoxYzNSbFpITmwKY25acFkyVnpMbWx1ZEdWc0xtTnZiUzl6WjNndlkyVnl" +
    "kR2xtYVdOaGRHbHZiaTkyTWk5d1kydGpjbXcvWTJFOQpjSEp2WTJWemMyOXlNQjBHQT" +
    "FVZERnUVdCQlFzbnhWelhVWnhwRkd5YUtXdzhWZmdOZXBjcHpBT0JnTlZIUThCCkFmO" +
    "EVCQU1DQnNBd0RBWURWUjBUQVFIL0JBSXdBRENDQWRRR0NTcUdTSWI0VFFFTkFRU0NB" +
    "Y1V3Z2dIQk1CNEcKQ2lxR1NJYjRUUUVOQVFFRUVEeEI4dUNBTVU0bmw1ZlBFaktxdG8" +
    "wd2dnRmtCZ29xaGtpRytFMEJEUUVDTUlJQgpWREFRQmdzcWhraUcrRTBCRFFFQ0FRSU" +
    "JFVEFRQmdzcWhraUcrRTBCRFFFQ0FnSUJFVEFRQmdzcWhraUcrRTBCCkRRRUNBd0lCQ" +
    "WpBUUJnc3Foa2lHK0UwQkRRRUNCQUlCQkRBUUJnc3Foa2lHK0UwQkRRRUNCUUlCQVRB" +
    "UkJnc3EKaGtpRytFMEJEUUVDQmdJQ0FJQXdFQVlMS29aSWh2aE5BUTBCQWdjQ0FRWXd" +
    "FQVlMS29aSWh2aE5BUTBCQWdnQwpBUUF3RUFZTEtvWklodmhOQVEwQkFna0NBUUF3RU" +
    "FZTEtvWklodmhOQVEwQkFnb0NBUUF3RUFZTEtvWklodmhOCkFRMEJBZ3NDQVFBd0VBW" +
    "UxLb1pJaHZoTkFRMEJBZ3dDQVFBd0VBWUxLb1pJaHZoTkFRMEJBZzBDQVFBd0VBWUwK" +
    "S29aSWh2aE5BUTBCQWc0Q0FRQXdFQVlMS29aSWh2aE5BUTBCQWc4Q0FRQXdFQVlMS29" +
    "aSWh2aE5BUTBCQWhBQwpBUUF3RUFZTEtvWklodmhOQVEwQkFoRUNBUW93SHdZTEtvWk" +
    "lodmhOQVEwQkFoSUVFQkVSQWdRQmdBWUFBQUFBCkFBQUFBQUF3RUFZS0tvWklodmhOQ" +
    "VEwQkF3UUNBQUF3RkFZS0tvWklodmhOQVEwQkJBUUdBSkJ1MVFBQU1BOEcKQ2lxR1NJ" +
    "YjRUUUVOQVFVS0FRQXdDZ1lJS29aSXpqMEVBd0lEUndBd1JBSWdjREZEZHl1UFRHRVR" +
    "ORm5BU0QzOApDWTNSNmlBREpEVHZBbHZTWDNIekk4a0NJRDZsVm1DWklYUHk4ekpKMW" +
    "gvMnJ1NjJsdlVVWDJJaU1ibVFOUEEwClBzMC8KLS0tLS1FTkQgQ0VSVElGSUNBVEUtL" +
    "S0tLQotLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS0KTUlJQ2x6Q0NBajZnQXdJQkFn" +
    "SVZBTkRvcXRwMTEva3VTUmVZUEhzVVpkRFY4bGxOTUFvR0NDcUdTTTQ5QkFNQwpNR2d" +
    "4R2pBWUJnTlZCQU1NRVVsdWRHVnNJRk5IV0NCU2IyOTBJRU5CTVJvd0dBWURWUVFLRE" +
    "JGSmJuUmxiQ0JECmIzSndiM0poZEdsdmJqRVVNQklHQTFVRUJ3d0xVMkZ1ZEdFZ1Eye" +
    "GhjbUV4Q3pBSkJnTlZCQWdNQWtOQk1Rc3cKQ1FZRFZRUUdFd0pWVXpBZUZ3MHhPREEx" +
    "TWpFeE1EUTFNRGhhRncwek16QTFNakV4TURRMU1EaGFNSEV4SXpBaApCZ05WQkFNTUd" +
    "rbHVkR1ZzSUZOSFdDQlFRMHNnVUhKdlkyVnpjMjl5SUVOQk1Sb3dHQVlEVlFRS0RCRk" +
    "piblJsCmJDQkRiM0p3YjNKaGRHbHZiakVVTUJJR0ExVUVCd3dMVTJGdWRHRWdRMnhoY" +
    "21FeEN6QUpCZ05WQkFnTUFrTkIKTVFzd0NRWURWUVFHRXdKVlV6QlpNQk1HQnlxR1NN" +
    "NDlBZ0VHQ0NxR1NNNDlBd0VIQTBJQUJMOXErTk1wMklPZwp0ZGwxYmsvdVdaNStUR1F" +
    "tOGFDaTh6NzhmcytmS0NRM2QrdUR6WG5WVEFUMlpoRENpZnlJdUp3dk4zd05CcDlpCk" +
    "hCU1NNSk1KckJPamdic3dnYmd3SHdZRFZSMGpCQmd3Rm9BVUltVU0xbHFkTkluemc3U" +
    "1ZVcjlRR3prbkJxd3cKVWdZRFZSMGZCRXN3U1RCSG9FV2dRNFpCYUhSMGNITTZMeTlq" +
    "WlhKMGFXWnBZMkYwWlhNdWRISjFjM1JsWkhObApjblpwWTJWekxtbHVkR1ZzTG1OdmJ" +
    "TOUpiblJsYkZOSFdGSnZiM1JEUVM1amNtd3dIUVlEVlIwT0JCWUVGTkRvCnF0cDExL2" +
    "t1U1JlWVBIc1VaZERWOGxsTk1BNEdBMVVkRHdFQi93UUVBd0lCQmpBU0JnTlZIUk1CQ" +
    "WY4RUNEQUcKQVFIL0FnRUFNQW9HQ0NxR1NNNDlCQU1DQTBjQU1FUUNJQy85ais4NFQr" +
    "SHp0Vk8vc09RQldKYlNkKy8ydWV4Swo0K2FBMGpjRkJMY3BBaUEzZGhNckY1Y0Q1MnQ" +
    "2RnFNdkFJcGo4WGRHbXkyYmVlbGpMSksrcHpwY1JBPT0KLS0tLS1FTkQgQ0VSVElGSU" +
    "NBVEUtLS0tLQotLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS0KTUlJQ2pqQ0NBalNnQ" +
    "XdJQkFnSVVJbVVNMWxxZE5JbnpnN1NWVXI5UUd6a25CcXd3Q2dZSUtvWkl6ajBFQXdJ" +
    "dwphREVhTUJnR0ExVUVBd3dSU1c1MFpXd2dVMGRZSUZKdmIzUWdRMEV4R2pBWUJnTlZ" +
    "CQW9NRVVsdWRHVnNJRU52CmNuQnZjbUYwYVc5dU1SUXdFZ1lEVlFRSERBdFRZVzUwWV" +
    "NCRGJHRnlZVEVMTUFrR0ExVUVDQXdDUTBFeEN6QUoKQmdOVkJBWVRBbFZUTUI0WERUR" +
    "TRNRFV5TVRFd05ERXhNVm9YRFRNek1EVXlNVEV3TkRFeE1Gb3dhREVhTUJnRwpBMVVF" +
    "QXd3UlNXNTBaV3dnVTBkWUlGSnZiM1FnUTBFeEdqQVlCZ05WQkFvTUVVbHVkR1ZzSUV" +
    "OdmNuQnZjbUYwCmFXOXVNUlF3RWdZRFZRUUhEQXRUWVc1MFlTQkRiR0Z5WVRFTE1Ba0" +
    "dBMVVFQ0F3Q1EwRXhDekFKQmdOVkJBWVQKQWxWVE1Ga3dFd1lIS29aSXpqMENBUVlJS" +
    "29aSXpqMERBUWNEUWdBRUM2bkV3TURJWVpPai9pUFdzQ3phRUtpNwoxT2lPU0xSRmhX" +
    "R2pibkJWSmZWbmtZNHUzSWprRFlZTDBNeE80bXFzeVlqbEJhbFRWWXhGUDJzSkJLNXp" +
    "sS09CCnV6Q0J1REFmQmdOVkhTTUVHREFXZ0JRaVpReldXcDAwaWZPRHRKVlN2MUFiT1" +
    "NjR3JEQlNCZ05WSFI4RVN6QkoKTUVlZ1JhQkRoa0ZvZEhSd2N6b3ZMMk5sY25ScFptb" +
    "GpZWFJsY3k1MGNuVnpkR1ZrYzJWeWRtbGpaWE11YVc1MApaV3d1WTI5dEwwbHVkR1Zz" +
    "VTBkWVVtOXZkRU5CTG1OeWJEQWRCZ05WSFE0RUZnUVVJbVVNMWxxZE5JbnpnN1NWClV" +
    "yOVFHemtuQnF3d0RnWURWUjBQQVFIL0JBUURBZ0VHTUJJR0ExVWRFd0VCL3dRSU1BWU" +
    "JBZjhDQVFFd0NnWUkKS29aSXpqMEVBd0lEU0FBd1JRSWdRUXMvMDhyeWNkUGF1Q0ZrO" +
    "FVQUVhDTUFsc2xvQmU3TndhUUdUY2RwYTBFQwpJUUNVdDhTR3Z4S21qcGNNL3owV1A5" +
    "RHZvOGgyazVkdTFpV0RkQmtBbiswaWlBPT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0" +
    "tLQoA";

  it("#AttestOpenEnclaveShared", async () => {
    await testOpenEnclave("Shared");
  });

  it("#AttestOpenEnclaveAad", async () => {
    await testOpenEnclave("AAD");
  });

  it("#AttestOpenEnclaveIsolated", async () => {
    await testOpenEnclave("Isolated");
  });

  it("#AttestSgxEnclaveShared", async () => {
    await testSgxEnclave("Shared");
  });

  it("#AttestSgxEnclaveAad", async () => {
    await testSgxEnclave("AAD");
  });

  it("#AttestSgxEnclaveIsolated", async () => {
    await testSgxEnclave("Isolated");
  });

  /* TPM Attestation can only be performed on an AAD or isolated mode client.
   */
  it("#attestTpm", async () => {
    const client = createRecordedClient("AAD", true);
    const adminClient = createRecordedAdminClient("AAD");

    // Set the policy on the instance to a known value.
    await adminClient.setPolicy(
      KnownAttestationType.Tpm,
      "version=1.0; authorizationrules{=> permit();}; issuancerules{};"
    );

    const encodedPayload = JSON.stringify({ payload: { type: "aikcert" } });

    const result = await client.attestTpm(encodedPayload);
    const tpmResult = JSON.parse(result);

    assert.isDefined(tpmResult.payload);

    const payload = tpmResult.payload;

    assert.isDefined(payload.challenge);
    assert.isDefined(payload.service_context);

    // Reset the policy on the instance to the default for reproducibility.
    await adminClient.resetPolicy(KnownAttestationType.Tpm);
  });

  async function testOpenEnclave(endpointType: EndpointType): Promise<void> {
    const binaryRuntimeData = base64url.decodeString(_runtimeData);
    const client = createRecordedClient(endpointType);

    {
      // You can't specify both runtimeData and runtimeJson.
      await expect(
        client.attestOpenEnclave(base64url.decodeString(_openEnclaveReport).subarray(0x10), {
          runTimeData: binaryRuntimeData,
          runTimeJson: binaryRuntimeData
        })
      ).to.eventually.be.rejectedWith("Cannot provide both runTimeData and runTimeJson");
    }

    {
      const attestationResult = await client.attestOpenEnclave(
        base64url.decodeString(_openEnclaveReport),
        {
          runTimeData: binaryRuntimeData
        }
      );

      assert.isNotNull(attestationResult.body.sgxCollateral);
      assert.isUndefined(attestationResult.body.runTimeClaims);
      expect(attestationResult.body.enclaveHeldData?.length).is.equal(binaryRuntimeData.length);
      expect(attestationResult.body.enclaveHeldData).to.deep.equal(binaryRuntimeData);

      assert(attestationResult.token, "Expected a token from the service but did not receive one");
    }

    {
      const attestationResult = await client.attestOpenEnclave(
        base64url.decodeString(_openEnclaveReport),
        {
          runTimeJson: binaryRuntimeData
        }
      );

      assert.isNotNull(attestationResult.body.sgxCollateral);
      assert.isDefined(attestationResult.body.runTimeClaims);
      assert.isUndefined(attestationResult.body.enclaveHeldData);

      // Confirm that the JWK response out of the service makes sense and contains
      // the JSON inside the binaryRuntimeData.
      const runtimeClaims = attestationResult.body.runTimeClaims as any;
      assert.isDefined(runtimeClaims.jwk);
      assert.isDefined(runtimeClaims.jwk.crv);
      expect(runtimeClaims.jwk.crv).is.equal("P-256");

      assert(attestationResult.token, "Expected a token from the service but did not receive one");
    }
  }

  async function testSgxEnclave(endpointType: EndpointType): Promise<void> {
    const client = createRecordedClient(endpointType);

    const binaryRuntimeData = base64url.decodeString(_runtimeData);

    {
      // You can't specify both runtimeData and runtimeJson.
      await expect(
        client.attestSgxEnclave(base64url.decodeString(_openEnclaveReport).subarray(0x10), {
          runTimeData: binaryRuntimeData,
          runTimeJson: binaryRuntimeData
        })
      ).to.eventually.be.rejectedWith("Cannot provide both runTimeData and runTimeJson");
    }

    {
      // An OpenEnclave report has a 16 byte header prepended to an SGX quote.
      //  To convert from OpenEnclave reports to SGX Quote, simplystrip the first
      //  16 bytes from the report.
      const attestationResult = await client.attestSgxEnclave(
        base64url.decodeString(_openEnclaveReport).subarray(0x10),
        {
          runTimeData: binaryRuntimeData
        }
      );

      assert.isNotNull(attestationResult.body.sgxCollateral);
      assert.isUndefined(attestationResult.body.runTimeClaims);
      expect(attestationResult.body.enclaveHeldData?.length).is.equal(binaryRuntimeData.length);
      expect(attestationResult.body.enclaveHeldData).to.deep.equal(binaryRuntimeData);
      assert(attestationResult.token, "Expected a token from the service but did not receive one");
    }

    {
      // An OpenEnclave report has a 16 byte header prepended to an SGX quote.
      //  To convert from OpenEnclave reports to SGX Quote, simplystrip the first
      //  16 bytes from the report.
      const attestationResult = await client.attestSgxEnclave(
        base64url.decodeString(_openEnclaveReport).subarray(0x10),
        {
          runTimeJson: binaryRuntimeData
        }
      );

      assert.isNotNull(attestationResult.body.sgxCollateral);
      assert.isDefined(attestationResult.body.runTimeClaims);
      assert.isUndefined(attestationResult.body.enclaveHeldData);

      // Confirm that the JWK response out of the service makes sense and contains
      // the JSON inside the binaryRuntimeData.
      const runtimeClaims = attestationResult.body.runTimeClaims as any;
      assert.isDefined(runtimeClaims.jwk);
      assert.isDefined(runtimeClaims.jwk.crv);
      expect(runtimeClaims.jwk.crv).is.equal("P-256");

      assert(attestationResult.token, "Expected a token from the service but did not receive one");
    }
  }
});
