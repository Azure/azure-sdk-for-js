let nock = require('nock');

module.exports.hash = "3f3b720730c486dd4cc5c7726df122b0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'd98d0745-4a65-4ed8-9133-4225c0377100',
  'x-ms-ests-server',
  '2.1.12570.11 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AklPlkkh2vBIqNt8vz4lMmA; expires=Sat, 30-Apr-2022 17:38:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDYET8pqca1_bd5TuDiixJYttVqCv5XqpwDVKfVQPH-7r7teWiZ3WyOsi0UNU9l59tMtuVPAxZnZPa_ufcsCNi9nzKxDx-EEelQVfzafJuzWrqiQ_MC7tE8x0He8hSdZ0xxzwDk1mQGFqkE9XugNscUyrdI7hxDZDZrUAvNxyyhkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:38:38 GMT',
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
  'd9711851-364a-465d-9b47-e4f41a022200',
  'x-ms-ests-server',
  '2.1.12570.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlF0T8zg35VDqlqCjvA7Kz0; expires=Sat, 30-Apr-2022 17:38:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrH--CALkj1t7eqHBblDEtMWY0ul2I8nFkIjAfEHS_1uCgk4Y_PhZct6Ei7o41L4amER07I4ZzOGlYfJ1BSfCzbIvgEgmtR_gBmuj_q1DeYDNWLl8RwlPmvdmx2nAgtG-bL4iKDs6n-Kh4qu7r2erTAxbxXYanZEm98UdwlJZTjasgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:38:38 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=54394a32-cf55-4fc7-8ea3-63ca01d2fb25&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'b26ae5a4-03a0-43e8-a452-4884b3e91e00',
  'x-ms-ests-server',
  '2.1.12570.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkJqrriGPnVHhR1-CzLSnDAL3UepAQAAAB7e19kOAAAA; expires=Sat, 30-Apr-2022 17:38:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:38:38 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsModel%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTComponentTestsModel;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '221',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-cc924d92c2006142ac2ff6721a0dd81b-dc4cc28ef0fd2740-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:38 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsComponent%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTComponentTestsComponent;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '225',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-bfac52feb2c9944580103af6edbeed77-b9563dcdb10d7142-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:38 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTComponentTestsComponent;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Component1","contents":[{"@type":"Property","name":"ComponentProp1","schema":"string"},{"@type":"Telemetry","name":"ComponentTelemetry1","schema":"integer"}]},{"@id":"dtmi:samples:DTComponentTestsModel;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"TempModel","contents":[{"@type":"Property","name":"Prop1","schema":"string"},{"@type":"Component","name":"Component1","schema":"dtmi:samples:DTComponentTestsComponent;1"},{"@type":"Telemetry","name":"Telemetry1","schema":"integer"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTComponentTestsComponent;1","description":{},"displayName":{"en":"Component1"},"decommissioned":false,"uploadTime":"2022-03-31T17:38:39.3066743+00:00"},{"id":"dtmi:samples:DTComponentTestsModel;1","description":{},"displayName":{"en":"TempModel"},"decommissioned":false,"uploadTime":"2022-03-31T17:38:39.3067063+00:00"}], [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-c687d1dc370cd941b6fa7175af640c30-7580e71382c00d45-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:38 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTComponentTestsTempTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '278',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0be651f5b7008848a4ff4808d2cefa9f-5c40a9fba4b1b140-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTComponentTestsTempTwin', {"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1"},"Prop1":"value","Component1":{"$metadata":{},"ComponentProp1":"value1"}})
  .query(true)
  .reply(200, {"$dtId":"DTComponentTestsTempTwin","$etag":"W/\"836ae1c3-ba8d-46ca-b93d-580881147bbe\"","Prop1":"value","Component1":{"ComponentProp1":"value1","$metadata":{"ComponentProp1":{"lastUpdateTime":"2022-03-31T17:38:39.5186910Z"}}},"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1","Prop1":{"lastUpdateTime":"2022-03-31T17:38:39.5186910Z"}}}, [
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"836ae1c3-ba8d-46ca-b93d-580881147bbe"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-d624a6f9f6007f4f84a024e87b7286a1-10b84bf6060dbf46-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/DTComponentTestsTempTwin/components/Component1', [{"op":"replace","path":"/ComponentProp1","value":"value2"}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"5749a4f0-def0-4eb0-9435-b575f4a87fb4"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-41b24eb0fd5f994cac6fff134c731f80-0034c0e4fa140e4a-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTComponentTestsTempTwin/components/Component1')
  .query(true)
  .reply(200, {"ComponentProp1":"value2","$metadata":{"ComponentProp1":{"lastUpdateTime":"2022-03-31T17:38:39.6382007Z"}}}, [
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"5749a4f0-def0-4eb0-9435-b575f4a87fb4"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a95470b7263af54ba730ad4819c6239b-7a212f33284bcb4c-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-9dbc280d065b514894c68148a1e06b32-d62abb540e1f6448-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsModel%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-8f3c0da6beeb49448a34af35c1f17905-991a199fa7290341-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsComponent%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-67de1430fc8ece4b8d110ef0adc77201-2fd0365cb18d1344-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:39 GMT'
]);
