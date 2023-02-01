let nock = require('nock');

module.exports.hash = "7b2c36368dac3f51232662f06d6026c3";

module.exports.testInfo = {"uniqueName":{"container":"container164621150037806250","blob":"blob164621150101402706"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164621150037806250')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 02 Mar 2022 08:58:21 GMT',
  'ETag',
  '"0x8D9FC2ACD4F2B7C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9942df95-701e-0072-0813-2ee3f6000000',
  'x-ms-client-request-id',
  '27e2ff72-7cca-4010-8e7b-a504c8adf897',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 02 Mar 2022 08:58:21 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/aaaaa/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '086a45ec-b2d4-4d0a-9aff-7928eb5b0200',
  'x-ms-ests-server',
  '2.1.12507.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ava73FzMRLNDkXvr0RntiuQ; expires=Fri, 01-Apr-2022 08:58:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCZMz8vM-MX6zY2-MJhlt4vSJZMYgelp_L7ediJYDIbCXbDqYsmPWG6EChX7Erb_AkqtC1RVpgIzun_pwyOfenXz2EUlqWUCnxIuqnNBLcrFNa_zepEtOtKXUpOGyPuua1HNwUJiODSO92J_yB9wdUKCOKkkrP80o6MN6V65HfQogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Mar 2022 08:58:20 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/aaaaa/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/aaaaa/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/aaaaa/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/aaaaa/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '73778720-81d1-44e0-82b9-2da4daac0200',
  'x-ms-ests-server',
  '2.1.12507.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmfpELpWccBFjAlczRKzgEw; expires=Fri, 01-Apr-2022 08:58:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrg94tYDumoxtaURm64Gos044Y0aMA8vlPZbaMJcjw4XyUpVryq8P5O-PE1IdBFStBKWUTERIf6vNm6UhIQRpaxe3KXr6X3jvjZmBm4Pt9y2lgXbwa4-j_pAT-ATmVBNS4Yv_cOHOlwer7FeX-21RL5qFopJnvOrDO9CpI3E2r2N8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Mar 2022 08:58:20 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1632c80a-f1f2-49af-802c-4f30aa7ef337&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'e3a735b2-e130-427c-873c-90752cec0300',
  'x-ms-ests-server',
  '2.1.12507.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuNlEKAg-8pCnOWQcEX_xeHeeSdeAQAAAK0osdkOAAAA; expires=Fri, 01-Apr-2022 08:58:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Mar 2022 08:58:20 GMT',
  'Content-Length',
  '1318'
]);

nock('https://md-hdd-jxsm54fzq3jc.z8.blob.storage.azure.net:443', {"encodedQueryParams":true})
  .head('/wmkmgnjxxnjt/abcd')
  .query(true)
  .reply(401, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'InvalidAuthenticationInfo',
  'x-ms-request-id',
  '3403078e-f01e-0002-6813-2e4899000000',
  'x-ms-version',
  '2018-03-28',
  'WWW-Authenticate',
  'Bearer authorization_uri=https://login.microsoftonline.com/aaaaa/oauth2/authorize resource_id=https://disk.compute.azure.com/',
  'Date',
  'Wed, 02 Mar 2022 08:58:22 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=bdea74c7-a240-4f6a-a79a-8f84eb563f73&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'e3a735b2-e130-427c-873c-907548ec0300',
  'x-ms-ests-server',
  '2.1.12507.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Alez_oVFc7RPjQytjA4bj03TsWZeAQAAAK4osdkOAAAA; expires=Fri, 01-Apr-2022 08:58:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Mar 2022 08:58:22 GMT',
  'Content-Length',
  '1326'
]);

nock('https://md-hdd-jxsm54fzq3jc.z8.blob.storage.azure.net:443', {"encodedQueryParams":true})
  .head('/wmkmgnjxxnjt/abcd')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '1073742336',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:49:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9DBFA1FBB40CA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-creation-time',
  'Thu, 20 Jan 2022 09:49:16 GMT',
  'x-ms-lease-state',
  'available',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-request-id',
  'a1d1ac71-501e-008d-7713-2ec1f3000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Wed, 02 Mar 2022 08:58:24 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164621150037806250')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9942e23b-701e-0072-2d13-2ee3f6000000',
  'x-ms-client-request-id',
  'c96235ae-9713-411e-a731-b085b4bf3a2a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 02 Mar 2022 08:58:24 GMT'
]);
