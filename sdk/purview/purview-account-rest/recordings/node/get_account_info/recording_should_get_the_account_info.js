let nock = require('nock');

module.exports.hash = "2ff3b5a65daf079dc2f7d73b5d58f0de";

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
  '61bade29-ae60-493d-870c-9ec9da9a2d02',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkOWu2lqxhdDkHfaAu4_mAc; expires=Sat, 04-Dec-2021 16:28:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwwGWw0lbyUzqjOsd4dMVmZ703FhEH64QevMVb1DwdXUQ9pzX6dsCWZS1EzIOGd0RLYwGbO2ZTgvv0HkIv-VYiLXEoUYaKqxmY4V1DckQeBmogaoiTxeqkC1nZHhGFYqrg4UD6yTozLUsCfVypo23SGT0xvgmFZaHAhc6klGQgokgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 16:28:36 GMT',
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
  'ade56010-2ac0-4cc1-a0be-cded17b71600',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqLHQXHG3UZLg7y7k96PBq0; expires=Sat, 04-Dec-2021 16:28:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrnu6i2A3eqs6ZNxFIdssUx4EATaw4oyXk1xA5JLPYXTuWz1BUUISyqSS0uhjbeebVYjUMzAzGj1OBiOAU-VKGz30uoCkmV4x_tTT0Doe9JdYyuh-jYcxJJyHgZXoFfpbvjWlxPV_1Hd6gZgK1dATCq5Uki7Y-pL9_gTddqba-Q_wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 16:28:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=88eff70c-a995-4894-8e9c-0fb3bd1ec8e7&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '54cf00a4-bc0a-4482-b96a-a18e6f161e00',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqBWJWj6pUJBkzhkRKzZpZj__1r8AQAAADMBFtkOAAAA; expires=Sat, 04-Dec-2021 16:28:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 16:28:37 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, {"sku":{"name":"Standard","capacity":1},"properties":{"cloudConnectors":{"awsExternalId":"ec2bff3a-3cba-4be0-a9ca-6d6b0a5cc268"},"friendlyName":"joheredipv","createdBy":"joheredi@microsoft.com","createdByObjectId":"35ac9d32-a8ca-4324-9393-d4000746f07c","createdAt":"2021-08-10T17:25:46.5991716Z","endpoints":{"catalog":"https://endpoint/catalog","scan":"https://endpoint/scan","guardian":"https://endpoint/guardian"},"provisioningState":"Succeeded","privateEndpointConnections":[],"managedResources":{"resourceGroup":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/managed-rg-joheredipv","storageAccount":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/managed-rg-joheredipv/providers/Microsoft.Storage/storageAccounts/scaneastusgiaeeoh","eventHubNamespace":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/managed-rg-joheredipv/providers/Microsoft.EventHub/namespaces/Atlas-9fe2f965-5f93-4bdf-a811-7221a78e2fdb"},"publicNetworkAccess":"Enabled","managedResourceGroupName":"managed-rg-joheredipv"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/joheredi-test/providers/Microsoft.Purview/accounts/joheredipv","name":"joheredipv","type":"Microsoft.Purview/accounts","location":"eastus","identity":{"type":"SystemAssigned","principalId":"dab894e8-208b-4092-9ddc-71dbb9447e9d","tenantId":"88888888-8888-8888-8888-888888888888"},"tags":{},"systemData":{"createdBy":"joheredi@microsoft.com","createdByType":"User","createdAt":"2021-08-10T17:25:46.5991716Z","lastModifiedByType":"User","lastModifiedAt":"2021-09-15T23:38:59.768035Z"}}, [
  'Date',
  'Thu, 04 Nov 2021 16:28:36 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '6f485cbb-2d8f-4bb8-99c4-59c3a114d0ff',
  'x-ms-account-status',
  'Succeeded'
]);
