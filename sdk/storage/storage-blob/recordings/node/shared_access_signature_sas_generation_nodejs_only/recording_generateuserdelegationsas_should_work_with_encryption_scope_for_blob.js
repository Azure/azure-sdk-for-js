let nock = require('nock');

module.exports.hash = "4efa8525ea9c1ab74d09c399776a8e85";

module.exports.testInfo = {"uniqueName":{"container":"container163245111273107576","blob":"blob163245111302202721"},"newDate":{"now":"2021-09-24T02:38:30.722Z","tmr":"2021-09-24T02:38:30.724Z"}}

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
  'd2b98253-4067-4896-af0c-8d65d3900600',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AtOFOXrGKldCsGIA04v0Iek; expires=Sun, 24-Oct-2021 02:38:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPnSqfVaL1elP50nBT_gUbaX37xztL9Wry9Rqxn75Lnx7NXLlVJmoLh93ibiS9r5SKSEOD9vm-NL8fgClKb_SX8xuHgNs7xnvdgAiayST-u6xPGXKVslOTaEyibSPtw9UZ_8k5U1aIliARSZIlPLYwsdVMac1fnmCqqmlpJMjSD8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 02:38:30 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/aaaaa/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/aaaaa/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/aaaaa/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/aaaaa/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '9361213a-51de-46fd-bfc0-66fd87640600',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=An3SNjG9FfdLt08zHE8753I; expires=Sun, 24-Oct-2021 02:38:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsqZgC_1dIk78ZCn6E94T-VL2wl26gaM3nsWjNCRAHN9niJUcI8XZrdSTVHlT6IxzqMoxGJQFd7aXfIqbLsb4qToBqGHSYoe8kNMsF--Y7ebCpcDkDgRIA4rwF6NBnRD_YrdShfLYoMBxi2sMpGCA6RuvTEL42gBMb7kMjnVe100gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 02:38:30 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c35093bd-72c7-47ac-ac12-3da6e3c46061&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '279ef619-49ad-435a-9864-bc87c8b90600',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsoTOZ8d6tVErBKDMIMMBqPeSEc1AQAAACcx39gOAAAA; expires=Sun, 24-Oct-2021 02:38:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 02:38:30 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2021-09-24T01:38:30Z</Start><Expiry>2021-09-25T02:38:30Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>c4f48289-bb84-4086-b250-6f94a8f64cee</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2021-09-24T01:38:30Z</SignedStart><SignedExpiry>2021-09-25T02:38:30Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-12-06</SignedVersion><Value>qM/CMo6VnwYgIFl8CMMi/aJWUtnAfhEzs7q/UOL7Hbg=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c946ec5-101e-005a-43ed-b0bc25000000',
  'x-ms-client-request-id',
  'da72bcc7-5ee6-4993-ac03-bf4b8b0328e6',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 02:38:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163245111273107576')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 02:38:33 GMT',
  'ETag',
  '"0x8D97F0466CFA1A5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c946f87-101e-005a-79ed-b0bc25000000',
  'x-ms-client-request-id',
  '0939fe97-b429-4602-963c-8dce59b297c1',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 02:38:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163245111273107576/blob163245111302202721')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 24 Sep 2021 02:38:33 GMT',
  'ETag',
  '"0x8D97F0467346219"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c947037-101e-005a-18ed-b0bc25000000',
  'x-ms-client-request-id',
  '97a22f0d-1a82-4352-91ff-96e0a311ee94',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-version-id',
  '2021-09-24T02:38:33.7728809Z',
  'Date',
  'Fri, 24 Sep 2021 02:38:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163245111273107576/blob163245111302202721')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c94719c-101e-005a-6ced-b0bc25000000',
  'x-ms-client-request-id',
  '4bcc03ff-a438-4090-a929-8176ba37d8b0',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 24 Sep 2021 02:38:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163245111273107576')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c947267-101e-005a-29ed-b0bc25000000',
  'x-ms-client-request-id',
  '2c71b1fe-4e84-4f35-9d0b-95add19424b7',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Fri, 24 Sep 2021 02:38:33 GMT'
]);
