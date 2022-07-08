let nock = require('nock');

module.exports.hash = "85d087a79dfee4bc19d6a442d7cc4e33";

module.exports.testInfo = {"uniqueName":{"upsert-simple-digitaltwin":"digitalTwin165644216234400196"},"newDate":{}}

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
  '75950b73-4331-4571-8a28-eeebc07b3a01',
  'x-ms-ests-server',
  '2.1.13006.6 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtmksIKjERdEjUGhdiSZV0w; expires=Thu, 28-Jul-2022 18:49:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr52aeDGuyO3t0EEd9sifjrLYDs89iSSxFX3iMWFGSI_EKKriWnoVnZWEBG0ZHlKGQM0xljcjXJ5cgmdNYccombJdr5bRr1y88mJmgOx3MWfBGidBmBIqW0sBRfOC9b8yVTsXAapADb2ycqqW0jfPa38hHyjAIu3aotf9lpqqVV2IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:21 GMT',
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
  '53f6ba67-3544-4049-8d55-d7bf310b0300',
  'x-ms-ests-server',
  '2.1.13006.6 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ArtSrbvLOM5HjDv2dz_I7pw; expires=Thu, 28-Jul-2022 18:49:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOJxR3fWLMLCsDe8lzRs5_Bmw6vAH1s_tcTj-J9ZCCcNDlLHQO0YhJcYVq5XInJzYbXV7NomDeOmKQV011-4iA-wDNevHMLrO4ZdZzrBz42_zVSA6iG0hHqTZNCcbIE_7Zx2NesT7xG_K5Lk_WqXFH4ve0_tKlTdw2voTkHJatJsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:21 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=11d28a92-c7e6-490d-9794-bb1e5b862927&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6c5d7f52-2c36-480e-8d8b-b8e9df133000',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ag9nB4XVs95IrvCTpjc8WhsuuutMAQAAADFETdoOAAAA; expires=Thu, 28-Jul-2022 18:49:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:21 GMT',
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
  '00-42d0d46513884fc60e124eccd43da259-a9f8b35e237de5e8-01',
  'mise-correlation-id',
  'da979e59-fbc9-4e74-9ea9-639c1b370130',
  'Date',
  'Tue, 28 Jun 2022 18:49:22 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:22.8740155+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6ae2b4b91727875e6d2b9f96b7ffec28-b84c914747e5b9b1-01',
  'mise-correlation-id',
  '99f330fa-cfa2-446d-918e-091c23f600bc',
  'Date',
  'Tue, 28 Jun 2022 18:49:22 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644216234400196')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin165644216234400196. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-bbb11c3a32cef145bba51631a192ccb3-ad998ae9c9dad444-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:22 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin165644216234400196', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68,"TemperatureUnit":"Celsius"})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644216234400196","$etag":"W/\"7daebfde-2829-45f8-814f-e48a7dd5ddd6\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:23.0587414Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:23.0587414Z"},"TemperatureUnit":{"lastUpdateTime":"2022-06-28T18:49:23.0587414Z"}}}, [
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"7daebfde-2829-45f8-814f-e48a7dd5ddd6"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-8b0c8089569c72448d58e06940c430d8-2d1e52bfb94b1f47-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:22 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin165644216234400196', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":69,"TemperatureUnit":"Celsius"})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644216234400196","$etag":"W/\"1b90a3bd-119e-4464-a655-3d92592bcdc3\"","AverageTemperature":69,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:23.1407658Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:23.1407658Z"},"TemperatureUnit":{"lastUpdateTime":"2022-06-28T18:49:23.1407658Z"}}}, [
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"1b90a3bd-119e-4464-a655-3d92592bcdc3"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-4c7d38a81a0b0649bfbe016028720217-a76a2fa83790e343-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:22 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644216234400196')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-2e5b621ec4e7bd4b9f41d4afd982e3c3-ce09205722ab9d43-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:22 GMT'
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
  '00-a46f27fe9e7034fce2d183e05732f647-f2f847d364fc6afc-01',
  'mise-correlation-id',
  '43c9c072-be27-4f1e-b942-1e23e3996ae1',
  'Date',
  'Tue, 28 Jun 2022 18:49:23 GMT'
]);
