let nock = require('nock');

module.exports.hash = "f1d5eb3afd42f7cb5543c18af256332f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'f5a27afa-c7bd-43ac-8f15-40e373db3000',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhMFqlc-zydAj6Sm_ZTNmG-81LWYDAAAAOXZQdgOAAAA; expires=Sat, 26-Jun-2021 18:20:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 27 May 2021 18:20:57 GMT',
  'Content-Length',
  '1317'
]);

nock('https://isolated_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/.well-known/openid-configuration')
  .reply(200, {"response_types_supported":["token","none"],"id_token_signing_alg_values_supported":["RS256"],"revocation_endpoint":"https://isolated_attestation_url.wus.attest.azure.net/revoke","issuer":"https://isolated_attestation_url.wus.attest.azure.net","jwks_uri":"https://isolated_attestation_url.wus.attest.azure.net/certs","claims_supported":["cnf","nonce","x-ms-ver","x-ms-attestation-type","x-ms-policy-hash","x-ms-policy-signer","x-ms-sgx-is-debuggable","x-ms-sgx-mrenclave","x-ms-sgx-mrsigner","x-ms-sgx-svn","x-ms-sgx-ehd","x-ms-sgx-collateral","is-debuggable","sgx-mrsigner","sgx-mrenclave","product-id","svn","tee"]}, [
  'Connection',
  'close',
  'Date',
  'Thu, 27 May 2021 18:20:57 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '612',
  'x-ms-request-id',
  '00-2280f9aac5588b8ca6b0bdecd924cf2b-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);
