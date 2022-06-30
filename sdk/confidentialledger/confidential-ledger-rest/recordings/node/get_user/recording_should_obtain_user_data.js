let nock = require('nock');

module.exports.hash = "a36f9c1acbcb1d7f23c2a8bfb8b3d963";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger-staging.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASGgAwIBAgIRAOe0n/jUk1qbZ5YQn8ZydUswCgYIKoZIzj0EAwIwFjEU\nMBIGA1UEAwwLQ0NGIE5ldHdvcmswHhcNMjIwNjIzMTcwNDM0WhcNMjIwOTIxMTcw\nNDMzWjAWMRQwEgYDVQQDDAtDQ0YgTmV0d29yazBZMBMGByqGSM49AgEGCCqGSM49\nAwEHA0IABEXoAeEqNTxXRAi59tOdrcQoBmbEQu4Nmt1kDpkWm+HD/rKtoabHCRfm\n1Rr4HVnhUzd35uNSciCBXty6Fw5WvcKjUDBOMAwGA1UdEwQFMAMBAf8wHQYDVR0O\nBBYEFH5ZbWF1sfF9advIJXDGdu5P+pkOMB8GA1UdIwQYMBaAFH5ZbWF1sfF9advI\nJXDGdu5P+pkOMAoGCCqGSM49BAMCA0cAMEQCIBoTBWnURs+dmbLx6FdJ882QuhAu\nG/cfqKks4IpYl4I5AiA3Idmq2ohkCRMpwSUoapDFvGyqPKxSvqPiz8kHsgYWrQ==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Thu, 30 Jun 2022 16:48:18 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  'c5435d45-9e6b-4fec-b730-f205f40e56f7',
  'x-ms-client-request-id',
  '4ee0fbca-ddde-472a-a75f-ba4cca9c23a1',
  'x-ms-machineName',
  'identityservice-c5487bcb8-qn4h7',
  'x-ms-image-tag',
  '1.0.02004.555-04a069fc0e02c3bd70d00c6d7ba6b4953fb03ecb'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '2671e969-fccd-4ec5-a5e1-fad021d49200',
  'x-ms-ests-server',
  '2.1.13006.6 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AkYUJYfiETxPvSJnh2Ghu4g; expires=Sat, 30-Jul-2022 16:48:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3VKnw8BA41Pd2Nss8fPR7DF7jQ5Bb-us7LYJH4kp-asfchPyP_589QG5qPjtPL50BKzFX2vbfLN4HlE_zhFqA-QzxMm2wnatT5nWR2rRetSAgqzddLIO8wtX_JtxxGs7ZjLGsYAqxBDt-KdHUu9t4D-y8mEW7wL4B-h4Wtrm22MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:48:18 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'c38f911f-af42-4ed4-8ca8-744ba212a900',
  'x-ms-ests-server',
  '2.1.13081.9 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Av8w4KPWhrhNj4iSw8iZ62M; expires=Sat, 30-Jul-2022 16:48:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDM35kSzBNhV9wSBOXosnMUNFdLY9NjgwVPkXucn6_-zUJ1nHwXO-joOVQE0nAcnnbDThE6mRwaUZVP_WYYBfO-BAXHPtPiXwOCa-g7gxc_hSCEbIS6MMLsYkhFyLmtXOSsT3radszqb4v7wLcaYJmCaAoKM4p5-N_aqd9qebIUkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:48:18 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d87c8c20-205b-4762-be29-e216cb3c4e53&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7e2268ff-1ca4-46f8-a330-e94a2029cd00',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-HY1LnsGDIwxcPuAPyB6gsA' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'none'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aq4NVKA3OfZPleFo256mpeeb7eLaAQAAANLKT9oOAAAA; expires=Sat, 30-Jul-2022 16:48:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:48:19 GMT',
  'Content-Length',
  '1334'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/users/480f0db4-5580-44c3-b7a4-0b90304e1960')
  .query(true)
  .reply(200, {"assignedRole":"Administrator","userId":"480f0db4-5580-44c3-b7a4-0b90304e1960"}, [
  'content-length',
  '80',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.6178',
  'x-ms-client-request-id',
  '37a99431-efdf-45d9-bf3b-7def9f2e4502',
  'x-ms-request-id',
  '899253382'
]);
