let nock = require('nock');

module.exports.hash = "cb01b99d4f52e1f4e415ce472bbf9ff5";

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
  '0b5b2258-a981-4b9f-8277-114cb1a85e00',
  'x-ms-ests-server',
  '2.1.11787.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgSJSOLCU89BlsjcW6fY5hG81LWYDAAAAEB9TNgOAAAA; expires=Sun, 04-Jul-2021 20:00:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 04 Jun 2021 20:00:24 GMT',
  'Content-Length',
  '1317'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/.well-known/openid-configuration')
  .reply(200, {"response_types_supported":["token","none"],"id_token_signing_alg_values_supported":["RS256"],"revocation_endpoint":"https://aad_attestation_url.wus.attest.azure.net/revoke","issuer":"https://aad_attestation_url.wus.attest.azure.net","jwks_uri":"https://aad_attestation_url.wus.attest.azure.net/certs","claims_supported":["cnf","nonce","x-ms-ver","x-ms-attestation-type","x-ms-policy-hash","x-ms-policy-signer","x-ms-sgx-is-debuggable","x-ms-sgx-mrenclave","x-ms-sgx-mrsigner","x-ms-sgx-svn","x-ms-sgx-ehd","x-ms-sgx-collateral","is-debuggable","sgx-mrsigner","sgx-mrenclave","product-id","svn","tee"]}, [
  'Date',
  'Fri, 04 Jun 2021 20:00:24 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '612',
  'x-ms-request-id',
  '00-6cdd58709895a7e5aa98ce9b320ebe35-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01605.0002'
]);
