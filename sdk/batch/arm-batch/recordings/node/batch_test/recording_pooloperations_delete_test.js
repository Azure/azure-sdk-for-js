let nock = require('nock');

module.exports.hash = "9440f2a3c7b3150ddb3214721fbf3327";

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
  'c7025f87-5230-4b1b-a3d3-5a8e2dec2600',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AszpGhdEBQdPivN7lsvRbi0; expires=Sun, 23-Jan-2022 02:19:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjH_LArji2pQeu6mKCRQDKDnrBW4Mgy1kGYarwsbMB8ojjTupm_OxeKfPtgfbGUjI1xgkcnPenFpSZO6KH15zobW08BhKduxdXMOR4JEL0Z8YVUGAD7KDXH5ICO3FxR964twhHURGoQmpn_x3n95cWZ05T7MYpAsMSsZjmNjyG4AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:39 GMT',
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
  'f480e226-70a1-4283-a533-9f5e1e3f2200',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApcrsOAyONZLnC--Re3t3iM; expires=Sun, 23-Jan-2022 02:19:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrpshb6zMluH0QoYzx2BeXUHydNU3GT0t3OWsIFgd1pt7N05CYg_Pr-PZWAYYz5eWeOqAwCRsAeoEnI3Svtm1IHe0ePM-pdVo64N9mANt3t1H43oSqFrcFegUhtHec8_uYOSU6O99m8H6bNddsRbrwPLWN681Jp8htY7eZuR69vJ0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f20fe556-7b3f-4a48-9c2c-a871aec757b5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c7025f87-5230-4b1b-a3d3-5a8e33ec2600',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtbuoM5M45dEteY6vkO2X7PLj78gAQAAADwlV9kOAAAA; expires=Sun, 23-Jan-2022 02:19:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Dec 2021 02:19:40 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/pools/mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '05cccd8f-3ecc-42f1-b713-46a64f980fc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14999',
  'x-ms-correlation-request-id',
  '0e40db25-cd7a-49ba-a7ec-37884e641540',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021941Z:0e40db25-cd7a-49ba-a7ec-37884e641540',
  'Date',
  'Fri, 24 Dec 2021 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '25ef6aba-607d-43d8-9c78-a610df72b7f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11976',
  'x-ms-correlation-request-id',
  '71645410-8049-48a2-97a0-5d6be217e542',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021941Z:71645410-8049-48a2-97a0-5d6be217e542',
  'Date',
  'Fri, 24 Dec 2021 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'fbd211b8-e03d-4c3b-a58b-df4885e7a2d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11975',
  'x-ms-correlation-request-id',
  '038c384f-6d01-4460-bf05-d52ead3b7b85',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021941Z:038c384f-6d01-4460-bf05-d52ead3b7b85',
  'Date',
  'Fri, 24 Dec 2021 02:19:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0917cacd-0900-4aa3-abd4-b8fac659a618',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11974',
  'x-ms-correlation-request-id',
  '95a72683-c364-4da1-a203-ec8fcde2af6d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021942Z:95a72683-c364-4da1-a203-ec8fcde2af6d',
  'Date',
  'Fri, 24 Dec 2021 02:19:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9604fcf6-b367-4bdb-b1db-6cd3bd078d2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11973',
  'x-ms-correlation-request-id',
  '6d7221d1-ca47-43a0-b3ed-6d5a62523a09',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021942Z:6d7221d1-ca47-43a0-b3ed-6d5a62523a09',
  'Date',
  'Fri, 24 Dec 2021 02:19:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6a6664c0-020f-46ec-b8cb-c0f202961fec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11972',
  'x-ms-correlation-request-id',
  '3a2b13ff-92f4-4bd6-8362-306feea6111b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021942Z:3a2b13ff-92f4-4bd6-8362-306feea6111b',
  'Date',
  'Fri, 24 Dec 2021 02:19:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '91381cd1-5687-4231-afca-a29dbb171f2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11971',
  'x-ms-correlation-request-id',
  '663cb963-07a7-4859-81bb-380d50d82baa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021943Z:663cb963-07a7-4859-81bb-380d50d82baa',
  'Date',
  'Fri, 24 Dec 2021 02:19:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '150f0dee-0484-4454-a0dd-f93b6f868d67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11970',
  'x-ms-correlation-request-id',
  '1db8afa6-6dff-4ff7-a10e-32a70e768c43',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021943Z:1db8afa6-6dff-4ff7-a10e-32a70e768c43',
  'Date',
  'Fri, 24 Dec 2021 02:19:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '81d14b4f-c264-42c5-a7fd-5086d5d7eb90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11969',
  'x-ms-correlation-request-id',
  '287c45d9-7625-4caa-8c69-b3119b7faced',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021943Z:287c45d9-7625-4caa-8c69-b3119b7faced',
  'Date',
  'Fri, 24 Dec 2021 02:19:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'df239b05-7b93-4960-b0dc-f3cad27f0452',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11968',
  'x-ms-correlation-request-id',
  '1ab0f6be-077b-43f1-a9b7-68efb347f4b1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021944Z:1ab0f6be-077b-43f1-a9b7-68efb347f4b1',
  'Date',
  'Fri, 24 Dec 2021 02:19:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '831fa5ff-cfa5-4dcc-bc15-a763223418c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11967',
  'x-ms-correlation-request-id',
  '0338f360-9b28-4ebe-b612-ec72d0472e11',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021944Z:0338f360-9b28-4ebe-b612-ec72d0472e11',
  'Date',
  'Fri, 24 Dec 2021 02:19:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '459a8c0b-2b86-4795-89ab-67850b42e0fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11966',
  'x-ms-correlation-request-id',
  '061222d4-2f2a-415c-a66d-001edfd17d6b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021944Z:061222d4-2f2a-415c-a66d-001edfd17d6b',
  'Date',
  'Fri, 24 Dec 2021 02:19:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6e1eb65c-cefb-421d-a014-1826a3b997a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11965',
  'x-ms-correlation-request-id',
  '4a07aab2-4f05-4c00-a23f-38069dac8a2a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021945Z:4a07aab2-4f05-4c00-a23f-38069dac8a2a',
  'Date',
  'Fri, 24 Dec 2021 02:19:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1a917906-e163-4db8-97d3-a5e92a909634',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11964',
  'x-ms-correlation-request-id',
  'ebe52d28-4bfd-452a-938e-0379df269a0e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021945Z:ebe52d28-4bfd-452a-938e-0379df269a0e',
  'Date',
  'Fri, 24 Dec 2021 02:19:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '57d49e13-0d7f-481a-a2c5-a8b54fe66501',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11963',
  'x-ms-correlation-request-id',
  'd808763e-1bf4-464b-9d4d-59c585ca7bc6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021945Z:d808763e-1bf4-464b-9d4d-59c585ca7bc6',
  'Date',
  'Fri, 24 Dec 2021 02:19:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '085703b6-1e88-46b6-9fcd-456d21a49e31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11962',
  'x-ms-correlation-request-id',
  '2f8458b7-6e55-4906-8971-d4299dc5a22e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021946Z:2f8458b7-6e55-4906-8971-d4299dc5a22e',
  'Date',
  'Fri, 24 Dec 2021 02:19:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'efc600d9-c3ef-40b2-b469-515216fbc9ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11961',
  'x-ms-correlation-request-id',
  '2382b9ab-00b9-494f-848e-fa2e491e6b9e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021946Z:2382b9ab-00b9-494f-848e-fa2e491e6b9e',
  'Date',
  'Fri, 24 Dec 2021 02:19:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4bf441fe-be3e-48cf-8b5b-30dcc26c56c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11960',
  'x-ms-correlation-request-id',
  'ca4d6eee-ae47-43b8-8489-64cf4f4caa05',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021947Z:ca4d6eee-ae47-43b8-8489-64cf4f4caa05',
  'Date',
  'Fri, 24 Dec 2021 02:19:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '3c1a8af0-ba70-41d0-a869-ea07f2e7aafd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11959',
  'x-ms-correlation-request-id',
  '0125883f-d505-469d-965c-e0353b8861fa',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021947Z:0125883f-d505-469d-965c-e0353b8861fa',
  'Date',
  'Fri, 24 Dec 2021 02:19:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7bea18cd-8425-4b89-9cf2-1900c51cb5e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11958',
  'x-ms-correlation-request-id',
  'd5340b82-4476-4891-84e6-4167fa1344e6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021947Z:d5340b82-4476-4891-84e6-4167fa1344e6',
  'Date',
  'Fri, 24 Dec 2021 02:19:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1c24dc70-510a-4aef-8c4e-1a21694e5ed0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11957',
  'x-ms-correlation-request-id',
  'a84cfd15-4af2-4f2b-8590-3c024e464fd7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021948Z:a84cfd15-4af2-4f2b-8590-3c024e464fd7',
  'Date',
  'Fri, 24 Dec 2021 02:19:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '66d41e7a-5124-4450-bb95-e46b7cc87097',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11956',
  'x-ms-correlation-request-id',
  '04b95c5a-26ad-426d-b51d-1c08853d0648',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021948Z:04b95c5a-26ad-426d-b51d-1c08853d0648',
  'Date',
  'Fri, 24 Dec 2021 02:19:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '4ad62f42-65df-44ac-9ce3-7f5db3cb3ca8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11955',
  'x-ms-correlation-request-id',
  '7ca09e10-304f-4c71-a2b0-1c29beaa6d41',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021948Z:7ca09e10-304f-4c71-a2b0-1c29beaa6d41',
  'Date',
  'Fri, 24 Dec 2021 02:19:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1233fca3-4cf2-4660-8b44-1862066dfbcc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11954',
  'x-ms-correlation-request-id',
  '448217ae-7db2-4cf0-ae5b-d401c564076c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021949Z:448217ae-7db2-4cf0-ae5b-d401c564076c',
  'Date',
  'Fri, 24 Dec 2021 02:19:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '017f5b06-8959-4b91-a42d-4e979f423f1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11953',
  'x-ms-correlation-request-id',
  'e4014f70-fc30-409b-8b08-9841f75fe57d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021949Z:e4014f70-fc30-409b-8b08-9841f75fe57d',
  'Date',
  'Fri, 24 Dec 2021 02:19:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '56acb480-64e9-4ed0-8755-6562b698b02d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11952',
  'x-ms-correlation-request-id',
  '99e3b5ec-dab6-4821-8db6-23a39ad01628',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021949Z:99e3b5ec-dab6-4821-8db6-23a39ad01628',
  'Date',
  'Fri, 24 Dec 2021 02:19:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'f38ca868-b321-4887-95de-e1fc4431a61e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11951',
  'x-ms-correlation-request-id',
  'cc6b3bbe-27ce-408a-929f-bae3f61eef1a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021950Z:cc6b3bbe-27ce-408a-929f-bae3f61eef1a',
  'Date',
  'Fri, 24 Dec 2021 02:19:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '7d46a966-f39e-40ea-96cd-76bd7da79b93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-correlation-request-id',
  'b3231a22-a8af-4596-9c67-955aedf3feea',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021950Z:b3231a22-a8af-4596-9c67-955aedf3feea',
  'Date',
  'Fri, 24 Dec 2021 02:19:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'ac9d8113-f583-45d7-90a8-a1259aefa340',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11949',
  'x-ms-correlation-request-id',
  'd958b06a-3276-438e-bdbf-f2f18981d995',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021950Z:d958b06a-3276-438e-bdbf-f2f18981d995',
  'Date',
  'Fri, 24 Dec 2021 02:19:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9fb25192-ba3d-480a-a282-92950e2fcdff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11948',
  'x-ms-correlation-request-id',
  '3634a3e8-f03a-4166-995a-1ce2feaf43c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021951Z:3634a3e8-f03a-4166-995a-1ce2feaf43c2',
  'Date',
  'Fri, 24 Dec 2021 02:19:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '56a028ae-6d3f-4eb7-ada1-bcf05ea3cafc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11947',
  'x-ms-correlation-request-id',
  '690207b5-cdf5-4dd7-81b5-1f09848d7c99',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021951Z:690207b5-cdf5-4dd7-81b5-1f09848d7c99',
  'Date',
  'Fri, 24 Dec 2021 02:19:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '55da1cb9-4061-4538-9913-d445b8d106e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-correlation-request-id',
  '4be2dba4-ebc7-4943-9cc3-c116ac2a9f99',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021952Z:4be2dba4-ebc7-4943-9cc3-c116ac2a9f99',
  'Date',
  'Fri, 24 Dec 2021 02:19:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'cc1dc5cc-c29a-4243-afde-8fed27eb93be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11945',
  'x-ms-correlation-request-id',
  'd20a8d90-5a84-43d4-abff-1bc1d6e79675',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021952Z:d20a8d90-5a84-43d4-abff-1bc1d6e79675',
  'Date',
  'Fri, 24 Dec 2021 02:19:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6cb27599-950f-4b86-b32f-a79048f344fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11944',
  'x-ms-correlation-request-id',
  'ca5d9d48-3c2c-406e-9b77-ffc4b5d6fcc8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021952Z:ca5d9d48-3c2c-406e-9b77-ffc4b5d6fcc8',
  'Date',
  'Fri, 24 Dec 2021 02:19:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '98883868-e6d4-47cb-95a3-5fdb638fd254',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11943',
  'x-ms-correlation-request-id',
  'd04eecc0-56c4-4839-8ab2-63594c57d900',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021953Z:d04eecc0-56c4-4839-8ab2-63594c57d900',
  'Date',
  'Fri, 24 Dec 2021 02:19:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'bf69921b-9633-4547-bb7b-f59330cc342f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11942',
  'x-ms-correlation-request-id',
  '892b36af-f78e-424a-8032-89bab210f265',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021953Z:892b36af-f78e-424a-8032-89bab210f265',
  'Date',
  'Fri, 24 Dec 2021 02:19:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '730a7bd9-0b1f-469a-8612-7a6385fddbf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11941',
  'x-ms-correlation-request-id',
  '1d69c7c4-c9fb-4c33-a257-308121532394',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021953Z:1d69c7c4-c9fb-4c33-a257-308121532394',
  'Date',
  'Fri, 24 Dec 2021 02:19:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '06da3ed8-f2c1-4c50-ba32-06d6bac4325f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11940',
  'x-ms-correlation-request-id',
  '5a6df107-372c-4735-a11e-329d9bedfb6c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021954Z:5a6df107-372c-4735-a11e-329d9bedfb6c',
  'Date',
  'Fri, 24 Dec 2021 02:19:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '17f1e012-e427-4d8f-a69e-26eafa07b42c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11939',
  'x-ms-correlation-request-id',
  '02dab436-0923-4b5a-a083-c6fd8605c442',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021954Z:02dab436-0923-4b5a-a083-c6fd8605c442',
  'Date',
  'Fri, 24 Dec 2021 02:19:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '9ff9cbf8-9536-4aa7-9f4c-992e1006f709',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11938',
  'x-ms-correlation-request-id',
  'ace1b8e5-6751-490e-b483-fbc23f535f3b',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021954Z:ace1b8e5-6751-490e-b483-fbc23f535f3b',
  'Date',
  'Fri, 24 Dec 2021 02:19:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '12cef810-fe1a-4d3a-aae6-c817e57c32f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11937',
  'x-ms-correlation-request-id',
  'd8e5208d-6de5-4041-ba54-0c7c840f8751',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021955Z:d8e5208d-6de5-4041-ba54-0c7c840f8751',
  'Date',
  'Fri, 24 Dec 2021 02:19:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '08853346-fd1c-4c42-8e1f-8f5977348310',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11936',
  'x-ms-correlation-request-id',
  '507c284b-d809-4a02-8e91-540fb4693bd5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021955Z:507c284b-d809-4a02-8e91-540fb4693bd5',
  'Date',
  'Fri, 24 Dec 2021 02:19:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '1b6af48c-8fc6-409d-bcc0-e2ad87620ef6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11935',
  'x-ms-correlation-request-id',
  'bedaca6a-b3c1-403b-a536-73bea3437dd6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021956Z:bedaca6a-b3c1-403b-a536-73bea3437dd6',
  'Date',
  'Fri, 24 Dec 2021 02:19:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'bdb4637c-273b-4825-9b2d-3e566aae56a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11934',
  'x-ms-correlation-request-id',
  '242133d2-80bc-4c5e-b113-6f6a61381db8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021956Z:242133d2-80bc-4c5e-b113-6f6a61381db8',
  'Date',
  'Fri, 24 Dec 2021 02:19:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '6bdaf706-7850-46ef-b1aa-247720430529',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11933',
  'x-ms-correlation-request-id',
  '91cce229-d673-445e-8146-bb0e340c38d8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021956Z:91cce229-d673-445e-8146-bb0e340c38d8',
  'Date',
  'Fri, 24 Dec 2021 02:19:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '5c6614ac-e60c-4356-901f-0d670b2b68bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-correlation-request-id',
  '79fd8eac-0694-4e0e-89dc-c152290b5347',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021957Z:79fd8eac-0694-4e0e-89dc-c152290b5347',
  'Date',
  'Fri, 24 Dec 2021 02:19:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  'e3a0bc68-a1e3-4531-bd97-571bea432838',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11931',
  'x-ms-correlation-request-id',
  '43a25d25-703f-489f-8d79-aa0cb72f35c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021957Z:43a25d25-703f-489f-8d79-aa0cb72f35c2',
  'Date',
  'Fri, 24 Dec 2021 02:19:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '758bc8e9-1a8c-44d6-acb0-4c5d6bd1d232',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11930',
  'x-ms-correlation-request-id',
  '01d7786d-37c2-4f0a-a7ae-d8d7589ed624',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021957Z:01d7786d-37c2-4f0a-a7ae-d8d7589ed624',
  'Date',
  'Fri, 24 Dec 2021 02:19:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '8d418573-8aef-4b30-b4c7-03bfbf0a1dc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11929',
  'x-ms-correlation-request-id',
  '1d8b3f85-17dc-411c-bca2-d0e03e8b806d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021958Z:1d8b3f85-17dc-411c-bca2-d0e03e8b806d',
  'Date',
  'Fri, 24 Dec 2021 02:19:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '83e5e409-fcee-42f7-8c48-cb89d2d28381',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11928',
  'x-ms-correlation-request-id',
  'c6475297-d454-4044-b993-7e9a85756018',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021958Z:c6475297-d454-4044-b993-7e9a85756018',
  'Date',
  'Fri, 24 Dec 2021 02:19:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '89d2643a-d74a-4149-8829-3cf32cc644c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11927',
  'x-ms-correlation-request-id',
  'cef9919f-2e71-484c-accd-47ae8852af29',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021958Z:cef9919f-2e71-484c-accd-47ae8852af29',
  'Date',
  'Fri, 24 Dec 2021 02:19:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '0606ead3-aa91-4d46-8426-c33bf7bafde4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11926',
  'x-ms-correlation-request-id',
  '725a6583-3469-4b2d-9be3-c3b77be7fc74',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021959Z:725a6583-3469-4b2d-9be3-c3b77be7fc74',
  'Date',
  'Fri, 24 Dec 2021 02:19:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Location',
  'https://management.azure.com/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx?api-version=2021-06-01',
  'Retry-After',
  '15',
  'x-ms-request-id',
  '05a097d5-28ec-42d9-a360-9e61a0c8279c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11925',
  'x-ms-correlation-request-id',
  'd8121448-84d1-4f03-a02a-f049fc11dc68',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021959Z:d8121448-84d1-4f03-a02a-f049fc11dc68',
  'Date',
  'Fri, 24 Dec 2021 02:19:58 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/poolOperationResults/delete-mypoolxxx')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-request-id',
  '00998146-d5f6-465e-9e94-818859125a27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11924',
  'x-ms-correlation-request-id',
  '341dede2-c39c-4d9c-b9b6-2616117a69b7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T021959Z:341dede2-c39c-4d9c-b9b6-2616117a69b7',
  'Date',
  'Fri, 24 Dec 2021 02:19:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/pools')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bdefff","92ff0742ea40440c000000"], [
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
  'x-ms-ratelimit-remaining-subscription-reads',
  '11923',
  'x-ms-request-id',
  'f4fed01b-45a0-46a1-97cb-188340ab9cb6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '28dc7ea6-68a0-4232-ae89-e0cd1d07e4c0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211224T022000Z:28dc7ea6-68a0-4232-ae89-e0cd1d07e4c0',
  'Date',
  'Fri, 24 Dec 2021 02:19:59 GMT'
]);
