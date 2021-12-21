// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates attesting evidence from an SGX enclave with evidence
 *  collected using the OpenEnclave SDK.
 *
 * FILE: attestEnclaves.ts
 *
 * DESCRIPTION:
 *  This sample demonstrates attesting evidence collected using the
 *  {@link https://openenclave.io/apidocs/v0.17/enclave_8h_aefcb89c91a9078d595e255bd7901ac71.html#aefcb89c91a9078d595e255bd7901ac71 | oe_get_report}
 *  API.
 *
 *  Set the following environment variables with your own values before running
 *  the samples:
 *
 *  1) ATTESTATION_AAD_URL - the base URL for an attestation service instance in AAD mode.
 *
 * To authorize access to the service, this sample also depends on the following
 * environment variables:
 *  AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user.
 *  AZURE_CLIENT_ID - AAD Client ID used to authenticate the user.
 *  AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.
 */
import { AttestationClient } from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";

// Load environment from a .env file if it exists.
import * as dotenv from "dotenv";
import { writeBanner } from "./utils/helpers";
import { decodeString } from "./utils/base64url";

dotenv.config();

// runtimeData is a Base64Url encoded blob. The sgxQuote contains the SHA256
// hash of this blob inside the binary quote data, that can be used to verify
// that the enclave creating the quote has knowledge of the contents of the
// runtimeData object.
const _runtimeData =
  "CiAgICAgICAgewogI" +
  "CAgICAgICAgICAiandrIiA6IHsKICAgICAgICAgICAgICAgICJrdHkiOiJFQyIsCiAg" +
  "ICAgICAgICAgICAgICAidXNlIjoic2lnIiwKICAgICAgICAgICAgICAgICJjcnYiOiJ" +
  "QLTI1NiIsCiAgICAgICAgICAgICAgICAieCI6IjE4d0hMZUlnVzl3Vk42VkQxVHhncH" +
  "F5MkxzellrTWY2SjhualZBaWJ2aE0iLAogICAgICAgICAgICAgICAgInkiOiJjVjRkU" +
  "zRVYUxNZ1BfNGZZNGo4aXI3Y2wxVFhsRmRBZ2N4NTVvN1RrY1NBIgogICAgICAgICAg" +
  "ICB9CiAgICAgICAgfQogICAgICAgIA";

// An SGX quote is a binary blob which is cryptographically verified to come
// from an Intel SGX enclave. The Microsoft Azure Attestation service takes
// this SGX quote and verifies that the quote is valid and returns a JSON
// Web Token which can be used by a relying party to verify the runtimeData
// associated with the request.
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

async function attestOpenEnclave() {
  writeBanner("Attest Open Enclave.");
  const endpoint = process.env.ATTESTATION_AAD_URL;
  if (!endpoint) {
    throw new Error("ATTESTATION_AAD_URL must be provided.");
  }

  console.log("Attest an OpenEnclave enclave from: ", endpoint);
  const client = new AttestationClient(endpoint);

  const openEnclaveReport = decodeString(_openEnclaveReport);

  // Simplest case for attestation. Attest evidence from an enclave.

  // This can be used to determine the identity of the enclave, however it cannot
  // be used for a secure key release scenario.
  {
    const attestResponse = await client.attestOpenEnclave(openEnclaveReport);

    console.log("Received attestation token: ", attestResponse.token.serialize());
    console.log("Enclave Hash: ", attestResponse.body.mrEnclave);
    console.log("Enclave Signer: ", attestResponse.body.mrSigner);
    console.log("Enclave security version: ", attestResponse.body.svn);
    console.log("Enclave product ID:", attestResponse.body.productId);
  }
}

async function attestOpenEnclaveSharedAnonymously() {
  writeBanner("Attest Open Enclave - Anonymously");

  let location = process.env.ATTESTATION_LOCATION_SHORT_NAME;
  if (location === undefined) {
    location = "wus";
  }
  const endpoint = "https://shared" + location + "." + location + ".attest.azure.net";

  console.log("Attest an OpenEnclave enclave from: ", endpoint);
  const client = new AttestationClient(endpoint);

  const openEnclaveReport = decodeString(_openEnclaveReport);

  // Simplest case for attestation. Attest evidence from an enclave.

  // This can be used to determine the identity of the enclave, however it cannot
  // be used for a secure key release scenario.
  {
    const attestResponse = await client.attestOpenEnclave(openEnclaveReport);

    console.log("Received attestation token: ", attestResponse.token.serialize());
    console.log("Enclave Hash: ", attestResponse.body.mrEnclave);
    console.log("Enclave Signer: ", attestResponse.body.mrSigner);
    console.log("Enclave security version: ", attestResponse.body.svn);
    console.log("Enclave product ID:", attestResponse.body.productId);
  }
}

async function attestOpenEnclaveWithRuntimeData() {
  writeBanner("Attest Open Enclave With Runtime Data.");
  const endpoint = process.env.ATTESTATION_AAD_URL;
  if (!endpoint) {
    throw new Error("ATTESTATION_AAD_URL must be provided.");
  }

  console.log("Attest an OpenEnclave enclave from: ", endpoint);
  const client = new AttestationClient(endpoint);

  const openEnclaveReport = decodeString(_openEnclaveReport);

  const runtimeData = decodeString(_runtimeData);

  // Attest an SGX enclave with Runtime Data. Runtime Data can be a public key
  // generated from within the enclave. The attestation service will determine
  // that the SGX Quote (evidence) contains the hash of the Runtime Data and if
  // it does, it will emit a token for the quote.
  {
    const attestResponse = await client.attestOpenEnclave(openEnclaveReport, {
      runTimeData: runtimeData,
    });

    console.log("Received attestation token: ", attestResponse.token.serialize());

    // The attestation token above can be sent to a relying party who will validate
    // the contents of the token. They will then look at the enclaveHeldData
    // and treat that enclaveHeldData as a public key, encrypting data to be
    // transmitted to the enclave.
    console.log("Relying party validates: ");
    console.log(" Enclave Hash: ", attestResponse.body.mrEnclave);
    console.log(" Enclave Signer: ", attestResponse.body.mrSigner);
    console.log(" Enclave security version: ", attestResponse.body.svn);
    console.log(" Enclave product ID:", attestResponse.body.productId);
    if (attestResponse.body.enclaveHeldData) {
      console.log(
        " Runtime Data received by the service: ",
        bytesToString(attestResponse.body.enclaveHeldData)
      );
    }
  }
}

async function attestOpenEnclaveWithRuntimeJson() {
  writeBanner("Attest Open Enclave With Runtime JSON.");
  const endpoint = process.env.ATTESTATION_AAD_URL;
  if (!endpoint) {
    throw new Error("ATTESTATION_AAD_URL must be provided.");
  }

  console.log("Attest an OpenEnclave enclave from: ", endpoint);

  // While authentication is optional for the AttestationClient, you CAN provide
  // client credentials if desired.
  const client = new AttestationClient(endpoint, new DefaultAzureCredential());

  const openEnclaveReport = decodeString(_openEnclaveReport);

  // The data contained in the _runtimeData encoded blob is a JSON Web Key, so we
  // can interpret it as JSON data.
  const runtimeJson = decodeString(_runtimeData);

  // Attest an SGX enclave with Runtime Json. Runtime Json can be a public key
  // generated from within the enclave. The attestation service will determine
  // that the SGX Quote (evidence) contains the hash of the Runtime Data and if
  // it does, it will emit a token for the quote.
  {
    const attestResponse = await client.attestOpenEnclave(openEnclaveReport, {
      runTimeJson: runtimeJson,
    });

    console.log("Received attestation token: ", attestResponse.token.serialize());

    // The attestation token above can be sent to a relying party who will validate
    // the contents of the token. They will then look at the runtimeClaims
    // and treat those runtimeClaims as a JSON object. In this case, the JSON object
    // contains a RFC 7517 JSON Web Key which can be used to encrypt data to be
    // transmitted to the enclave.
    console.log("Relying party validates: ");
    console.log(" Enclave Hash: ", attestResponse.body.mrEnclave);
    console.log(" Enclave Signer: ", attestResponse.body.mrSigner);
    console.log(" Enclave security version: ", attestResponse.body.svn);
    console.log(" Enclave product ID:", attestResponse.body.productId);
    if (attestResponse.body.runTimeClaims) {
      const jwk = attestResponse.body.runTimeClaims as {
        jwk: { kty: string; use: string; crv: string; x: string; y: string };
      };

      console.log("  Received JWK is: ", jwk.jwk.kty);
      console.log("  Received JWK uses the following curve ", jwk.jwk.crv);
    }
  }
}

async function attestOpenEnclaveWithExperimentalPolicy() {
  writeBanner("Attest Open Enclave with Experimental Policy.");
  const endpoint = process.env.ATTESTATION_AAD_URL;
  if (!endpoint) {
    throw new Error("ATTESTATION_AAD_URL must be provided.");
  }

  console.log("Attest an OpenEnclave enclave from: ", endpoint);
  const client = new AttestationClient(endpoint);

  const openEnclaveReport = decodeString(_openEnclaveReport);

  // The final scenario for using the attest APIs is to validate attestation
  // policies.

  // Attestation policies can be complicated to author, and when they are applied,
  // they take effect for all attestation operations. In order to validate a new
  // attestation policy, the attest APIs can be used to "test" policies before they
  // are applied.
  {
    const testPolicy = `version= 1.0;
authorizationrules
{
  => permit();
};
issuancerules
{
  c:[type=="x-ms-sgx-is-debuggable"] => issue(type="is-debuggable", value=c.value);
  c:[type=="x-ms-sgx-mrsigner"] => issue(type="sgx-mrsigner", value=c.value);
  c:[type=="x-ms-sgx-mrenclave"] => issue(type="sgx-mrenclave", value=c.value);
  c:[type=="x-ms-sgx-product-id"] => issue(type="product-id", value=c.value);
  c:[type=="x-ms-sgx-svn"] => issue(type="svn", value=c.value);
  c:[type=="x-ms-attestation-type"] => issue(type="tee", value=c.value);
};`;
    const attestResponse = await client.attestOpenEnclave(openEnclaveReport, {
      draftPolicyForAttestation: testPolicy,
    });

    console.log("Received attestation token: ", attestResponse.token.serialize());

    // The attestation token above *cannot* be sent to a relying party, because
    // the policy is *NOT* signed - note that the algorithm in the token is "none".
    console.log("Attested Token: ");
    console.log(" Token algorithm", attestResponse.token.algorithm);
    console.log(" Enclave Hash: ", attestResponse.body.mrEnclave);
    console.log(" Enclave Signer: ", attestResponse.body.mrSigner);
    console.log(" Enclave security version: ", attestResponse.body.svn);
    console.log(" Enclave product ID:", attestResponse.body.productId);
  }
}

async function attestOpenEnclaveWithExperimentalPolicyFailure() {
  writeBanner("Attest Open Enclave with Failing Experimental Policy.");
  const endpoint = process.env.ATTESTATION_AAD_URL;
  if (!endpoint) {
    throw new Error("ATTESTATION_AAD_URL must be provided.");
  }

  console.log("Attest an OpenEnclave enclave from: ", endpoint);
  const client = new AttestationClient(endpoint);

  const openEnclaveReport = decodeString(_openEnclaveReport);

  // The final scenario for using the attest APIs is to validate attestation
  // policies.

  // Attestation policies can be complicated to author, and when they are applied,
  // they take effect for all attestation operations. In order to validate a new
  // attestation policy, the attest APIs can be used to "test" policies before they
  // are applied.
  //
  //  This policy denies all attestation requests :).
  {
    const testPolicy = `version= 1.0;
authorizationrules
{
  => deny();
};
issuancerules
{
};`;

    try {
      await client.attestOpenEnclave(openEnclaveReport, { draftPolicyForAttestation: testPolicy });
    } catch (error) {
      console.log(`Expected Exception thrown for invalid request: ${error.message}`);
    }
  }
}

declare let TextDecoder:
  | undefined
  | (new () => { decode(buffer: ArrayBuffer | ArrayBufferView): string });

// TextDecoder and TextEncoder are in the global namespace for Node version 11 and
// higher, but before that, they were in the "util" namespace. If we're running
// under node ("Buffer" is defined), then check to see if the global namespace version
// of the decoders are present, if not, import them from the util namespace.
const decoder =
  typeof Buffer === "undefined"
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      new (TextDecoder ?? require("util").TextDecoder)("ascii")
    : undefined;

const decode: (buffer: ArrayBuffer) => string = decoder
  ? (buffer) => decoder.decode(buffer)
  : (buffer) => (buffer as Buffer).toString("ascii");

/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
function bytesToString(content: Uint8Array): string {
  return decode(content);
}

export async function main() {
  await attestOpenEnclave();
  await attestOpenEnclaveSharedAnonymously();
  await attestOpenEnclaveWithRuntimeData();
  await attestOpenEnclaveWithRuntimeJson();
  await attestOpenEnclaveWithExperimentalPolicy();
  await attestOpenEnclaveWithExperimentalPolicyFailure();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
