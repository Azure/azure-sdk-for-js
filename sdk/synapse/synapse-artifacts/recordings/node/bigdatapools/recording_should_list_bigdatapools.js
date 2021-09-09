let nock = require('nock');

module.exports.hash = "110e532f294590f2b4316b4de3a83d70";

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
  '6c8bf0b8-d8bd-464f-a88c-b1d3cfba0400',
  'x-ms-ests-server',
  '2.1.11787.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKk; expires=Sun, 11-Jul-2021 18:39:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAm33pd2mT9Oid_VLDQrMvddbBbfHXjiJo5x1L6ulUgaVn6KxHmBk5PVLk7V3w7Aepns4X_-xJwBuj9-FbHuHDJWYH62ouxqCKJv219r1TYrE-3l3h6teTBL7MwSOR2itKpnM2qv5ndcHQeN2m_dPC02iK9BbOYbiuthpNaYvJ0ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:39:51 GMT',
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
  'fd317594-00da-419e-8cdf-4e6855e81900',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKk; expires=Sun, 11-Jul-2021 18:39:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWBnpthSqUu2zZCU6knisreshy-AVWOrc3Wpi4jTwTN9REjJXMKyjYLftslG4PqmiKtSf_EVO6LM1EKul8hcF4WDDuyjfVlUcq_hoeyqyYAsVvRdYPWYBK3gktcWutnoHAX2sF-JmsXxwjroApXQ_ipTbtn0yCJPsVAgHJbkF8ZogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:39:51 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=54cf3884-1baa-4886-b922-0be4916be33f&client_secret=azure_client_secret")
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
  'a6d9cd41-6ba7-4e1a-bf7b-adbfce6a1a00',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAQAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:39:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:39:51 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/bigDataPools')
  .query(true)
  .reply(200, {"value":[{"properties":{"creationDate":"2020-11-19T21:41:05.3233333Z","sparkVersion":"2.4","nodeCount":4,"nodeSize":"Small","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":false,"minNodeCount":3,"maxNodeCount":10},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"sessionLevelPackagesEnabled":false,"cacheSize":0,"dynamicExecutorAllocation":{"enabled":false},"lastSucceededTimestamp":"2021-05-18T11:44:58.5966667Z","provisioningState":"Succeeded"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.ProjectArcadia/workspaces/xysynapsetest/sparkComputes/HamonsSpark","name":"HamonsSpark","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"westus2","tags":{}},{"properties":{"creationDate":"2021-01-11T06:04:11.4733333Z","sparkVersion":"2.4","nodeCount":0,"nodeSize":"Small","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":true,"minNodeCount":3,"maxNodeCount":10},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"sessionLevelPackagesEnabled":false,"cacheSize":0,"dynamicExecutorAllocation":{"enabled":false},"lastSucceededTimestamp":"2021-05-18T11:44:57.4066667Z","provisioningState":"Succeeded"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.ProjectArcadia/workspaces/xysynapsetest/sparkComputes/jianghaospool","name":"jianghaospool","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"westus2","tags":{}},{"properties":{"creationDate":"2020-11-18T19:10:21.6Z","sparkVersion":"2.4","nodeCount":10,"nodeSize":"Small","nodeSizeFamily":"MemoryOptimized","autoScale":{"enabled":true,"minNodeCount":3,"maxNodeCount":10},"autoPause":{"enabled":true,"delayInMinutes":15},"isComputeIsolationEnabled":false,"sessionLevelPackagesEnabled":false,"cacheSize":0,"dynamicExecutorAllocation":{"enabled":false},"lastSucceededTimestamp":"2021-05-18T11:44:57.77Z","provisioningState":"Succeeded"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.ProjectArcadia/workspaces/xysynapsetest/sparkComputes/testsparkpool","name":"testsparkpool","type":"Microsoft.ProjectArcadia/workspaces/sparkComputes","location":"westus2","tags":{}}]}, [
  'Content-Length',
  '2299',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '280c1eff-791d-465f-ac89-5d35c5100cee',
  'Date',
  'Fri, 11 Jun 2021 18:39:53 GMT',
  'Connection',
  'close'
]);
