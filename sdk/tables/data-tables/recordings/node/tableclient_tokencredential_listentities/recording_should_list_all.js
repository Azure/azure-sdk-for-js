let nock = require('nock');

module.exports.hash = "322d467b8d45b1d35853c220ed663b12";

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
  'bd4e459a-fad9-49ce-8e88-d3abb7eb3b00',
  'x-ms-ests-server',
  '2.1.12025.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkrDyjzoZsZOtXhUvuLh98s; expires=Thu, 14-Oct-2021 21:23:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMHSnsfMzNN4rkgNHi9K85woXpGeEZM6ogIsRsZIJbD4Rw5umHMM1DqM421UUMABPGTT1zbm-OYX03oINJisoAd767Bfpw7QJzYWp7suix273F-iIzaeOipagQl8L975QaUdePRlORSKcWSIEA0O916j_O-W_hkKP4k-LzUYIBz8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:23:46 GMT',
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
  'b592d764-2743-4e12-8a95-41bc43c23b01',
  'x-ms-ests-server',
  '2.1.12025.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AicDiyEzxjNOgZJ7WTHvU9A; expires=Thu, 14-Oct-2021 21:23:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOggnNx89W2LqBSpW_STbeDKyTwCApddrbsWsz5OoM8t9uGP3NSV3-epKefm1e8vJe8PnNvixCsDcgyerrtJvgRA63I4BXH2zGsZqltqYs_7mCBnfrC7RW3m0ZsK1TWFlx4XK7RODBUBIwQKUfRYPRGK2wUYk2XNM8UFNAPGK91YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:23:46 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4fe4f549-7f58-44e5-aabe-81a43d6b0143&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'a6cda39c-ff34-4160-957f-df76b6924a00',
  'x-ms-ests-server',
  '2.1.12025.15 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmuFlXLM_JRItAxryHJQOlbJVDEwAQAAAOIJ09gOAAAA; expires=Thu, 14-Oct-2021 21:23:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Sep 2021 21:23:46 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestTokenCredentialnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestTokenCredentialnode","value":[{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A44.5296818Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-09-14T21:23:44.5296818Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A44.6237495Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-09-14T21:23:44.6237495Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.5694207Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-09-14T21:23:45.5694207Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.6584843Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-09-14T21:23:45.6584843Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.7735672Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-09-14T21:23:45.7735672Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.87564Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-09-14T21:23:45.87564Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.9867196Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-09-14T21:23:45.9867196Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A46.080787Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-09-14T21:23:46.080787Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A46.1728525Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-09-14T21:23:46.1728525Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A46.2839322Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-09-14T21:23:46.2839322Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A46.3870065Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-09-14T21:23:46.3870065Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A46.48908Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-09-14T21:23:46.48908Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A44.7138126Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-09-14T21:23:44.7138126Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A44.8539121Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-09-14T21:23:44.8539121Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A44.9539836Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-09-14T21:23:44.9539836Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.0570572Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-09-14T21:23:45.0570572Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.1601305Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-09-14T21:23:45.1601305Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.2622025Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-09-14T21:23:45.2622025Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.3642746Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-09-14T21:23:45.3642746Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A45.4673482Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-09-14T21:23:45.4673482Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A44.3895814Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-09-14T21:23:44.3895814Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced1a15-0002-0039-58ae-a9c11b000000',
  'x-ms-client-request-id',
  'd5d1108f-c581-4456-8257-8f91804131a0',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:23:46 GMT'
]);
