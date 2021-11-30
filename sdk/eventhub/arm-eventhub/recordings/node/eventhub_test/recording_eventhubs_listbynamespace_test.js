let nock = require('nock');

module.exports.hash = "0c858dfb902afa1b234489f162fd07e8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '2df955eb-876d-4dd3-8a71-ec3919a90200',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnS7WM8DCk9Phxa1izL28aY; expires=Sun, 07-Nov-2021 03:05:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrrsz1Peo723z2WR32kEf9ASGVGUo3e-M0XcmmbYufB5qPgUmD5N5-zTJSV4hzr5T0Z1m8FgVhVEOqRalqjuSgB5QRth__o_irsAm1M3FIegzzNSzEShcsDSu_6tlAxJikZXh2I7BzUSy_Sp_lup7fJfCBXiBKAHVvPc0Wcvzk0e4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:44 GMT',
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
  'a2e463b4-b621-47b4-91f3-7922a8090600',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtvzrG3s3nFOo3IaTybgjqg; expires=Sun, 07-Nov-2021 03:05:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcW168HZaEmz-1qodqrfyI4YRyV9C1GCP8YAN-zOYcspbmGqbZQLKKwncxFO4-rwgbbe1AaZqbNt6ZlvA1h_VeEiBi-lR1agKWeWTBZktVlRgEzt8emHFqr7hdL7nSL0eMjQY_2UzNTsquObXe-NUXPH6Us8-oIsJ5GhjGJ9xFrAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:44 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=46db200c-c92f-4397-a851-9e4226d1956f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'a5a2fec4-a46b-4d18-8e30-c2d641b60500',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtkiN0eUqAZCrJlGUcy-194WPr5BAQAAAIms8dgOAAAA; expires=Sun, 07-Nov-2021 03:05:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:45 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventHub/namespaces/mynamespacexxx/eventhubs')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3d3cb7cd97e7b3db9bbcc1679b3caa6395eb07fbc7bf7ee6e8e26734283be30bfd3e71f8d3e4233c2b1fb717bbdc2c7914e5ed00b0cb7b96b3e6be885b29a66181fbd749a356dfad56bfa90b05de5755be4cd478f7ef147f45e935de4aff2965ea3a667cba7d9357db34f0d336a85cf4eaaf5b2e58f9a366bd7f4ed47c7d3b6b8cc09dab4ceb3369f1dd3f71fededeced6eefee6cef1cbcd9b9f768e7fea37b07e37bbbf7a8d57a351b6eb57f6f7cffe1036a653b3c9b511fdffb68873edba5ffefd1ffef7df47dea2c5bb5eb3a7f9adb99c310f2653629739ad4b65ee723fa735acd8ae50575757c5957f4ee8c26a9582a257eb1a1ae21d4713d9dd358c6c73f20d04f88646fe99f09bd1612aa69ab9a08753c9d821aaf9415cea8db9f755e7a2d5ddf0d51c04bfa49269f08974c08fb936ad966c532af09bba9fd7df451266305bb3cabea4586f9f8c5f88b99e797dcfdc58628f4eb4b371bf4d7ef936735fdf88280cde9273109fdfb6d1a02fdf8a258ae5bbcfd3aa7ce66bfe4a35ff24b461f15cb36af49e8ce96f2291171776f8758a8f841febc5814edd9f2c9350d993eded93fb8ffe0d37bbfe497fc92ef","ff92ff074cf5f8f1a9030000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-inline-count',
  '',
  'x-ms-request-id',
  '690b60e3-595c-49b2-8611-324a78fd5f24_M11SN1_M11SN1',
  'Server-SB',
  'Service-Bus-Resource-Provider/SN1',
  'Server',
  'Service-Bus-Resource-Provider/SN1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11977',
  'x-ms-correlation-request-id',
  '06fe670c-e7da-4240-b5ea-8c1b6aac5526',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211008T030546Z:06fe670c-e7da-4240-b5ea-8c1b6aac5526',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 08 Oct 2021 03:05:46 GMT'
]);
