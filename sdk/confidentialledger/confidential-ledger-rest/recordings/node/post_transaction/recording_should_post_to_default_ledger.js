let nock = require('nock');

module.exports.hash = "560374c7cf67bdf9cf29943418c80a71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger-staging.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASGgAwIBAgIRAOe0n/jUk1qbZ5YQn8ZydUswCgYIKoZIzj0EAwIwFjEU\nMBIGA1UEAwwLQ0NGIE5ldHdvcmswHhcNMjIwNjIzMTcwNDM0WhcNMjIwOTIxMTcw\nNDMzWjAWMRQwEgYDVQQDDAtDQ0YgTmV0d29yazBZMBMGByqGSM49AgEGCCqGSM49\nAwEHA0IABEXoAeEqNTxXRAi59tOdrcQoBmbEQu4Nmt1kDpkWm+HD/rKtoabHCRfm\n1Rr4HVnhUzd35uNSciCBXty6Fw5WvcKjUDBOMAwGA1UdEwQFMAMBAf8wHQYDVR0O\nBBYEFH5ZbWF1sfF9advIJXDGdu5P+pkOMB8GA1UdIwQYMBaAFH5ZbWF1sfF9advI\nJXDGdu5P+pkOMAoGCCqGSM49BAMCA0cAMEQCIBoTBWnURs+dmbLx6FdJ882QuhAu\nG/cfqKks4IpYl4I5AiA3Idmq2ohkCRMpwSUoapDFvGyqPKxSvqPiz8kHsgYWrQ==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Thu, 30 Jun 2022 16:48:15 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '9e243792-9188-4a55-8191-a138ebe3cba8',
  'x-ms-client-request-id',
  '8468d29c-c89c-49f2-ac6e-1b7219eb01be',
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
  '807ab10f-b1f9-4d8f-9ffd-dfe6d41c1d01',
  'x-ms-ests-server',
  '2.1.13006.6 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtIBTHaJogVLgfmHOiT01QU; expires=Sat, 30-Jul-2022 16:48:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHDbVMrhI2-LkM137Y7qtmFvPW2BFQ9wndcNuTBU-xpsV5cW6FNoKtqob25bsGzO9pYoghkQl9kuMwIOJwyDY7inGiFwe7q5Fi8Wr0Z-dg2w_d-5WD2sSzRZjon4E3lKHsFHqYYecKbGVM9k9465pNjes7eGbIS1tUP1WqOaJW2cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:48:15 GMT',
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
  '4ea51d76-9b9c-4c6f-a3a3-9a90f6fde700',
  'x-ms-ests-server',
  '2.1.13081.9 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjRWca-3SXZPoEzNQuDBcTk; expires=Sat, 30-Jul-2022 16:48:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrM3mjDLxG4GfDTBB9nfJEiTcI-sp-Z6qfborwVKXiQIecJI0Pj3AHOc8BcfI0Y5sMlw-O90GeAb1KiYF_RvAmjAu8RlQ_BpZG3CtWi6hTJgKsK2BVssbUk88Te5RX9K36Wuef_Y3CxgOos8galpYShO9rkKoKbIzrrEP_jM6_t3UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:48:15 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3cbea671-4f7c-4037-9cc0-ba9455bf44bf&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c38f911f-af42-4ed4-8ca8-744b1412a900',
  'x-ms-ests-server',
  '2.1.13081.9 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Au31T9uPeWxFjjEUSCw4uCOb7eLaAQAAAM_KT9oOAAAA; expires=Sat, 30-Jul-2022 16:48:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:48:15 GMT',
  'Content-Length',
  '1334'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/app/transactions', {"contents":"typescript post test"})
  .query(true)
  .reply(200, {"collectionId":"subledger:0"}, [
  'content-length',
  '30',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.6175',
  'x-ms-client-request-id',
  'f871c63d-7f64-40f6-ab46-711c8f4f6a9b',
  'x-ms-request-id',
  '143240988'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/2.6175/status')
  .query(true)
  .reply(200, {"state":"Pending","transactionId":"2.6175"}, [
  'content-length',
  '44',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.6176',
  'x-ms-client-request-id',
  '372820c2-7223-43b2-9149-46de7a9f3310',
  'x-ms-request-id',
  '576873632'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/transactions/2.6175/receipt')
  .query(true)
  .reply(406, {"error":{"code":"UncommittedLedgerEntry","message":"The specified transaction (2.6175) is not committed yet, please wait until the service reports a transaction id at least as high."}}, [
  'content-length',
  '185',
  'content-type',
  'application/json',
  'x-ms-client-request-id',
  '6ccf339d-8fd5-4d35-b251-f3ff74ba4e1d',
  'x-ms-request-id',
  '1232012306'
]);
