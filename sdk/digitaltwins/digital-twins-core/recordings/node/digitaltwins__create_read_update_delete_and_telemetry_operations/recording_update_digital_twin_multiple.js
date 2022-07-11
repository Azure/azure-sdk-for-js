let nock = require('nock');

module.exports.hash = "0c7785de214f18c25fdb88a295576049";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-multiple":"digitalTwin165644217166807018"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '994ea479-d0a5-4f33-9155-6f3d7d508b01',
  'x-ms-ests-server',
  '2.1.13006.6 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnK9hSAyc0RFhe_qLpI1mgw; expires=Thu, 28-Jul-2022 18:49:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfutX1gdAFwLTsRO65oKA4FA3CAV6SrYRZa9sRNjfMaV9-71OU3koHqVawlhwa72AmOJP-wQieAx6AQfy_6WpDGb8JZQYWXz3iEuLWEIl0-tjm5g-fOu2f1gmfjsadYPezKeKREpPw_vD_RknLdp2v0cao9DWbt5SLnQE6pdw8s0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'd898768c-ab8c-4caa-9391-af496a023400',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ArIV9qdDV61Kmd-5xo7tTYo; expires=Thu, 28-Jul-2022 18:49:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrl_TyW3M_SzYICZc_IYKyg6hUEIT2fdt6os_xX-nlLDkr0BtlOIk_0EE48oEp3n0aKT9a1uttCktYLZ65dliuzAvE6I9M6HXclVc4Yg4_a0k2dwr79ODinQ7AbbDspInN_QqZfeVWjcVHs_NKsKCke7mwdJuupnO-vNtah5-EGCUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3f38a719-fffe-4ef7-a3e9-899196209b5c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7972822d-4ccc-4d95-8e34-c948cd2a3900',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AkPen3559TJGsS41OG-9jgY; expires=Thu, 28-Jul-2022 18:49:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTTestBuilding%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTTestBuilding;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '214',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-8734352a09b8b5228f1562935ecb1a40-13bdeea535c874d9-01',
  'mise-correlation-id',
  '99ebb42a-6eaf-4a9e-bbd0-17c3ae7253b5',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:32.0355024+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-34b8b3235c2341d7470d6d2f7ef00aab-24c030bec5d28fc6-01',
  'mise-correlation-id',
  'd404271f-70d4-4e12-9573-83a1d09e972f',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644217166807018')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin165644217166807018. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-e94ac64ca2b9b443a911850a34814d78-95fe32a3bd0c0846-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin165644217166807018', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644217166807018","$etag":"W/\"68a72c9f-8dae-431e-a9ce-0d72db7d36fe\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:32.1956093Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:32.1956093Z"}}}, [
  'Content-Length',
  '293',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"68a72c9f-8dae-431e-a9ce-0d72db7d36fe"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-cd286fca60e1784e9fae7c2d25f1bb78-36f8784c1cb2a14a-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin165644217166807018', [{"op":"add","path":"/TemperatureUnit","value":"Celsius"},{"op":"replace","path":"/AverageTemperature","value":42}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"d93c21fa-f67d-41a6-8ffb-60628e37622a"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-62523eafe24f9448bdb5c28aeef097b5-99614c865a96844f-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/digitalTwin165644217166807018')
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644217166807018","$etag":"W/\"d93c21fa-f67d-41a6-8ffb-60628e37622a\"","AverageTemperature":42,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:32.2773031Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:32.2773031Z"},"TemperatureUnit":{"lastUpdateTime":"2022-06-28T18:49:32.2773031Z"}}}, [
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"d93c21fa-f67d-41a6-8ffb-60628e37622a"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-42cef7f3ca4db148bb599c9824733dad-d25c832168e5c449-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644217166807018')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a3052a107ab878419103e89c7369e124-a395ca44857eba48-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTTestBuilding%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-3d44b066e2b8f98d0e3752b7bcac15f9-c434a153f5f77219-01',
  'mise-correlation-id',
  'f7a094ce-2757-417c-b80b-3d7626eb9875',
  'Date',
  'Tue, 28 Jun 2022 18:49:32 GMT'
]);
