let nock = require('nock');

module.exports.hash = "313d174de99ef80c598bed0fc16b874d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fattest.azure.net%2F.default")
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
  'e5301410-3bdb-4f02-b1a4-2cb4334c3e00',
  'x-ms-ests-server',
  '2.1.11774.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApEeGixoIHhJujQgAFjaw_O81LWYCAAAAFLhOdgOAAAA; expires=Sun, 20-Jun-2021 17:16:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 May 2021 17:16:03 GMT',
  'Content-Length',
  '1317'
]);

nock('https://shareduks.uks.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/.well-known/openid-configuration')
  .reply(200, {"response_types_supported":["token","none"],"id_token_signing_alg_values_supported":["RS256"],"revocation_endpoint":"https://shareduks.uks.attest.azure.net/revoke","issuer":"https://shareduks.uks.attest.azure.net","jwks_uri":"https://shareduks.uks.attest.azure.net/certs","claims_supported":["cnf","nonce","x-ms-ver","x-ms-attestation-type","x-ms-policy-hash","x-ms-policy-signer","x-ms-sgx-is-debuggable","x-ms-sgx-mrenclave","x-ms-sgx-mrsigner","x-ms-sgx-svn","x-ms-sgx-ehd","x-ms-sgx-collateral","is-debuggable","sgx-mrsigner","sgx-mrenclave","product-id","svn","tee"]}, [
  'Connection',
  'close',
  'Date',
  'Fri, 21 May 2021 17:16:03 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '573',
  'x-ms-request-id',
  '00-bb9bf7d1504910facb65116f12999a63-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01581.0002'
]);
