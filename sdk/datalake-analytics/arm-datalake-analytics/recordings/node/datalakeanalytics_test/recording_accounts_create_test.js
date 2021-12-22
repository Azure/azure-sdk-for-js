let nock = require('nock');

module.exports.hash = "3069c935500dd67e91e4b08b32a34152";

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
  '792de6b9-024e-4c20-b2f9-0fab1cf41200',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiA47QrgOnlOkB6tkerLfrk; expires=Fri, 21-Jan-2022 09:14:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrE__LHDop7qC8nPks_6yR_yqndEAfUNAYAtnpI_IqcNNJ9KAit9dfOUxhkUxPtptqtrOcMHE6J1odqiGbMeBhw2yCo0608uoK6NarXuKACSf7euPT641FFedIVpu4sqd7IuOnni6f9dAKqt8TND_DxEclkcNz8LdasaVSLzTfw0QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 22 Dec 2021 09:14:36 GMT',
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
  'a48eb6cf-a8fd-4b93-a329-7ac949e81800',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsoF1cuoQM1Djfb1RMQ4whE; expires=Fri, 21-Jan-2022 09:14:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNdaF1wjGAnTL-KfXYUw6zDrV7srQNX99WsjkHzRjA99ENsGsv8CXfqIwSf1eDJpgGhfdTCCl2jlOBF7e2bpdeSekOpiWgZksG_8m8HRlwli2-7c6UayanGCV7GSvuPqNvlEKy3aBNsu3Ids79CwQlAPnWX3fhD38iWzWZ8Lz5MsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 22 Dec 2021 09:14:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a6678085-4d28-4ed4-bac5-4b0b67598f90&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '882ce76a-8151-44e0-b77f-469e5c211800',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aqj2i6qJEd9CptPjnin6n5TLj78gAQAAAHzjVNkOAAAA; expires=Fri, 21-Jan-2022 09:14:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 22 Dec 2021 09:14:36 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DataLakeAnalytics/accounts/myaccountxxx', {"location":"eastus2","tags":{"key1":"value1"},"properties":{"defaultDataLakeStoreAccount":"mygen1","dataLakeStoreAccounts":[{"name":"mygen1"}],"firewallState":"Enabled","firewallAllowAzureIps":"Enabled","newTier":"Consumption","maxJobCount":3,"maxDegreeOfParallelism":30,"maxDegreeOfParallelismPerJob":1,"minPriorityPerJob":1,"queryStoreRetention":30}})
  .query(true)
  .reply(201, {"properties":{"firewallState":"Enabled","firewallAllowAzureIps":"Enabled","defaultDataLakeStoreAccount":"mygen1","dataLakeStoreAccounts":[{"properties":{"suffix":"azuredatalakestore.net"},"name":"mygen1"}],"maxDegreeOfParallelism":30,"maxJobCount":3,"maxDegreeOfParallelismPerJob":1,"minPriorityPerJob":1,"queryStoreRetention":30,"newTier":"Consumption","provisioningState":"Creating","state":null,"endpoint":null,"accountId":"50b62c5e-18d7-42a4-95de-e3a97a523c5b"},"location":"eastus2","tags":{"key1":"value1"},"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DataLakeAnalytics/accounts/myaccountxxx","name":"myaccountxxx","type":"Microsoft.DataLakeAnalytics/accounts"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '724',
  'Content-Type',
  'application/json',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.DataLakeAnalytics/accounts/myaccountxxx/operationresults/0?api-version=2019-11-01-preview',
  'Retry-After',
  '10',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.DataLakeAnalytics/locations/eastus2/operationResults/50b62c5e-18d7-42a4-95de-e3a97a523c5b_0?api-version=2019-11-01-preview',
  'x-ms-request-id',
  '4c5cfea8-4835-42ad-88c8-1ad87165e371',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-correlation-request-id',
  'b9ce2ee0-cbf4-47a9-943a-f73f4d6d071c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211222T091447Z:b9ce2ee0-cbf4-47a9-943a-f73f4d6d071c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Wed, 22 Dec 2021 09:14:47 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DataLakeAnalytics/locations/eastus2/operationResults/50b62c5e-18d7-42a4-95de-e3a97a523c5b_0')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f3dcb8a329f7d34c22775fba658e4f4e1decedeeef6eedef6dede9b9d878f76f71feddf1fdffff4de834ff7f67e8a9ae6cbd960c34fc7bb7b9feeedef4ac3baaeea8f1efde28fa6d50ccdcf96cdfafcbc9816f9b27d99d78ba2698a6ad950cb45de34d905da1c4fa7f47b5a34e92c5f16f96c9c9e9da7ed3ca73fcfb375d9a6c74f9fbf4eb3e9b45a2fdb7456e5cdf2e3369d6797793acddaacac2ed25951e7d3b6aaaf47e9aaccb3264f17d9db3c6dd6754e90b236bdaed6f2c6abeffede6955a7afd7abbc5e37799dd24fc52aa5ffa15beeaeaeaaf6308a08e19995759ecdaed3ac69aa6991b5f92cbd2ada795a51e31aad8e0dbacd268432fe234fabab25bd569da777cd78ceab72868fea3473a88ed3377536cd1fa5fbd3fbd3f33c3bd8de3fb8777f7b7f2f9b6d1f1c4c0fb677b3d9c183dd4fefe7f71eeca698af47a93f5dbb76ba761feeeddedbde3978b4b3f3d12ff925","ff0f84ab34e01c020000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '4183bfb3-32e1-4274-8b08-f875a3946234',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-correlation-request-id',
  'ee4b3764-e48a-499a-b901-c10c3598771d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211222T091448Z:ee4b3764-e48a-499a-b901-c10c3598771d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Wed, 22 Dec 2021 09:14:48 GMT'
]);
