let nock = require('nock');

module.exports.hash = "118259be451a0d1600e789a4c733a251";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://isolated_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .get('/.well-known/openid-configuration')
  .reply(200, {"response_types_supported":["token","none"],"id_token_signing_alg_values_supported":["RS256"],"revocation_endpoint":"https://isolated_attestation_url.wus.attest.azure.net/revoke","issuer":"https://isolated_attestation_url.wus.attest.azure.net","jwks_uri":"https://isolated_attestation_url.wus.attest.azure.net/certs","claims_supported":["cnf","nonce","x-ms-ver","x-ms-attestation-type","x-ms-policy-hash","x-ms-policy-signer","x-ms-sgx-is-debuggable","x-ms-sgx-mrenclave","x-ms-sgx-mrsigner","x-ms-sgx-svn","x-ms-sgx-ehd","x-ms-sgx-collateral","is-debuggable","sgx-mrsigner","sgx-mrenclave","product-id","svn","tee"]}, [
  'Date',
  'Fri, 23 Jul 2021 22:25:05 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '612',
  'x-ms-request-id',
  '00-ffc01308ae8dcb90fde458c6e021d49a-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01644.0004'
]);
