let nock = require('nock');

module.exports.hash = "852720423bc25490367472ed3ec2320f";

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
  'd03127da-446a-4706-9c1f-ece8e8fd1400',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiTeBiOQJ09PmvCKJdbZYFw; expires=Sat, 11-Dec-2021 08:19:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNCGoPTUZV8tSKe4kVbJuFSf8qoDEZxp7G-NN-yxIH3-ka5IlELgO_mjs-r6C7ve4SwxwLfmGcvCu4kHe_ggr8i9zIR-6ehJLwZgvrTIaAAxMSWakUZjYJnAntsb_wKrW8nrl85-pf0_nBWsszAqUMMJHv8SPgOgr9eNSfmUs_EogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:19:25 GMT',
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
  'd36e7f81-dbd2-4076-bcac-29aadbbc1100',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArpaPoTXR-RLnCJIGFuof3s; expires=Sat, 11-Dec-2021 08:19:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8qu3FCJ53Ov5JW1BCHYTkfcoc58Qqlif-vmlNZQAPS9DnEQSE2o7AxlrGavsgp3Hw-MIEe12XiBGYLegB0uI54k1Z0oXkCHyKmrB7Eilxx9QjaufzbAeknN8xKoKfxtJELcXrH4qQJjLvM-1JCpLneJDMA4wPfMn3WQsNZj9uzIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:19:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=322f51a4-db39-4ebb-ba0c-5f5741dcbd71&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '83a16a01-243e-405e-8094-974a1ebe1600',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkO0S0yrWRRPmw4w5DT7Nl8WPr5BAQAAAA3JHtkOAAAA; expires=Sat, 11-Dec-2021 08:19:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:19:25 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .post('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx4/cassandraKeyspaces/mykeyspacexxx/throughputSettings/default/migrateToAutoscale')
  .query(true)
  .reply(202, {"status":"Enqueued"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '21',
  'Content-Type',
  'application/json',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx4/cassandraKeyspaces/mykeyspacexxx/throughputSettings/default/migrateToAutoscale/operationResults/e5d2ea58-96ba-4073-9a24-68e0cb078f36?api-version=2021-10-15',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/e5d2ea58-96ba-4073-9a24-68e0cb078f36?api-version=2021-10-15',
  'x-ms-request-id',
  'e5d2ea58-96ba-4073-9a24-68e0cb078f36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  '326f58d7-1693-4576-82f7-d141d06d38ac',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081926Z:326f58d7-1693-4576-82f7-d141d06d38ac',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/e5d2ea58-96ba-4073-9a24-68e0cb078f36')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2e7fd13a5fe7b38f7e","c9ff0340d7f1c015000000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11905',
  'x-ms-request-id',
  '359cb026-6735-41f8-ad8f-6bb26d1b19f9',
  'x-ms-correlation-request-id',
  '359cb026-6735-41f8-ad8f-6bb26d1b19f9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081927Z:359cb026-6735-41f8-ad8f-6bb26d1b19f9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:26 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/e5d2ea58-96ba-4073-9a24-68e0cb078f36')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f9d2e7fd13a5fe7b38f7e","c9ff0340d7f1c015000000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11904',
  'x-ms-request-id',
  '759652f0-46de-4ebd-a383-3b493ab14097',
  'x-ms-correlation-request-id',
  '759652f0-46de-4ebd-a383-3b493ab14097',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081929Z:759652f0-46de-4ebd-a383-3b493ab14097',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/e5d2ea58-96ba-4073-9a24-68e0cb078f36')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471f3dcd7fd13a5fe7b38f7e","c9ff03a32266ad15000000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11903',
  'x-ms-request-id',
  '2be26530-58d1-48cf-9733-9d5716652bf0',
  'x-ms-correlation-request-id',
  '2be26530-58d1-48cf-9733-9d5716652bf0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081931Z:2be26530-58d1-48cf-9733-9d5716652bf0',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:31 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/locations/eastus/operationsStatus/e5d2ea58-96ba-4073-9a24-68e0cb078f36')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1474d9bb5ebe6a3471fbd5e4fa7793ecb671ffd","92ff0720887be416000000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11902',
  'x-ms-request-id',
  '18ab3c61-9578-407b-a44b-79b2adb56cc3',
  'x-ms-correlation-request-id',
  '18ab3c61-9578-407b-a44b-79b2adb56cc3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081933Z:18ab3c61-9578-407b-a44b-79b2adb56cc3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:33 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx4/cassandraKeyspaces/mykeyspacexxx/throughputSettings/default/migrateToAutoscale/operationResults/e5d2ea58-96ba-4073-9a24-68e0cb078f36')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77eff6ef4eb3a6c996b33afbbdf2eb66954d733478abbf538bbbed9cfabb98afd6edebbc6d8be5457377969f67ebb2bdbb282eeaaccddf54c7ebb66aa659997f34faa8bd5ee534c2dbe112e93dd25fb49f65b6403f6f5e7f5ad35f4484555eb745de7cf4e8177f644885df1dbc8f1eedefec8c3eca0c10031fad16d9bb3761c39d5f32fa68512c8bc57ae17ff311befae897fc925f","f2ff000c859cb3ca010000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11901',
  'x-ms-request-id',
  '1761b300-0c50-4a7e-941a-e0180159de53',
  'x-ms-correlation-request-id',
  '1761b300-0c50-4a7e-941a-e0180159de53',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T081936Z:1761b300-0c50-4a7e-941a-e0180159de53',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:19:35 GMT'
]);
