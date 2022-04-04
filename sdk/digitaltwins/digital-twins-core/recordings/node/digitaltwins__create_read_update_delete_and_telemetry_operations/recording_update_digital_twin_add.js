let nock = require('nock');

module.exports.hash = "380ff2920282defe93fe0012def1af7b";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-add":"digitalTwin164874834435805370"},"newDate":{}}

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
  'a6484a10-854e-47b8-aa91-a2277f8b7f01',
  'x-ms-ests-server',
  '2.1.12570.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuDs1spigF9Nst11el9t6KM; expires=Sat, 30-Apr-2022 17:39:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3e-leD_1f_72PH6Gz4B81sovJOZft3oreo5NNDQpi68dQjjn9NVLvyh5HujQ-1XmElkUI_SrhsjiXR0Y5Q-t8UgVCnWQUPFzcKaPg6tbRdwMi-sALv4S7xtoyNa9NpKN8u3Fop8agHObw9RdEfpIaexU4ZAbYLCCBr8yXKN0eGMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT',
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
  '05b7dd20-7944-47af-b2b3-856a66841c00',
  'x-ms-ests-server',
  '2.1.12570.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmCei6dQMdxHrcyv9s95N9U; expires=Sat, 30-Apr-2022 17:39:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrE6RU3lwSlq6DURy7mIeJQLAeO9G1nPGjnwVGgjy9svH2yTPb5DK5iCjXtM3s7eTlT2F-xLPpMmmB9wGpMwCJuytgyfmq-kwFOMtc3NtHuLI_1jI61LDIYuT2dMrNQ6uW8mZ4m5Y5A2Lql9CZDmH2Ag-UOHb6Fc2w2kkrL-qy2aMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=26242be6-3318-4c55-adc4-d8ca4aacaf63&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd9711851-364a-465d-9b47-e4f4fa082200',
  'x-ms-ests-server',
  '2.1.12570.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvG6xUkoJ9dLtGodKhdtVw0; expires=Sat, 30-Apr-2022 17:39:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-3b9b42f49ec55e4aaeb1ad28fa3a2bc4-453c5c2fb7092644-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:05.2951945+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a144dca03170214eb5a8052c71518995-847fc1b3aea0c24e-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin164874834435805370')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin164874834435805370. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-36e661b4ec3f4e4c9eb61226536abbf8-b8dc5c381a229d40-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin164874834435805370', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin164874834435805370","$etag":"W/\"0689c70b-9d1f-4327-a805-95ce4108a637\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:05.5179989Z"}}}, [
  'Content-Length',
  '244',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"0689c70b-9d1f-4327-a805-95ce4108a637"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-91e5006bcb5a744483ba243307020722-91b48f5d7df59a4a-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin164874834435805370', [{"op":"add","path":"/TemperatureUnit","value":"Celsius"}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"24042e2a-5877-427d-9c2f-9764c4b96f11"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-2938b05ee862a848809bf9f463fe6b74-b66b9e0eb1bb2544-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/digitalTwin164874834435805370')
  .query(true)
  .reply(200, {"$dtId":"digitalTwin164874834435805370","$etag":"W/\"24042e2a-5877-427d-9c2f-9764c4b96f11\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:05.5179989Z"},"TemperatureUnit":{"lastUpdateTime":"2022-03-31T17:39:05.6339572Z"}}}, [
  'Content-Length',
  '340',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"24042e2a-5877-427d-9c2f-9764c4b96f11"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-79729f1d0779584894a56db648f22b39-cd9a05261c55b349-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:05 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin164874834435805370')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0f2e8963941ff04c83201e9fee964050-af9b23e53686d940-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:05 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTTestBuilding%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-90fb58e43028194185433cd1236c7efd-009003c31ecf044e-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:05 GMT'
]);
