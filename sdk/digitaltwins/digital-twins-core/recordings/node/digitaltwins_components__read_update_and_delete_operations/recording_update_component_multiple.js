let nock = require('nock');

module.exports.hash = "4f11523d24ab322ad469de79d6350464";

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
  'fd350fb8-2d3f-486b-b471-83a3c625be00',
  'x-ms-ests-server',
  '2.1.13006.6 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AkyFUv5_6UJPsPgLuLetOYA; expires=Thu, 28-Jul-2022 18:49:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtvPGfPw12SgVgx6ATi2Ltmv0NCU14RSUWbDd5JqaObIOHL1MGD82s4OznYxbrUkSWcs8RtBVQ441k_8cw6pwepiu0D8NAMHSzbyoIqeJWVpU7YoSfEyeT-ZWkghT1pwRhcKnwJ407vl7Qo88pMlVMmNaEcC9AchN7TS4l8H2PSUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:14 GMT',
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
  '13403b20-e869-49b4-b4c4-05cad5609001',
  'x-ms-ests-server',
  '2.1.13006.6 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Avdn1C-La4xEja9pwQW4sf4; expires=Thu, 28-Jul-2022 18:49:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrV0Wytcnvu0aerJePUZoLLu_u5SWb1sQuBrDAqp2KKY1Dkxg9cX0n2RY_206-dV9PAbsROYuBc3X2xbY9_to994arxy-ER1iuDFYhxCqNaOVOL2Ech0J0QPljKW5vzZuwLszpXm1M_qtqpuc9bfL8CxM_NgGtTbDNG8qFXcYEI94gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:14 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=17825f36-0cbd-405b-be43-a10dccc9dd97&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9cfd8d25-d05c-41f2-a94b-8acef6de5401',
  'x-ms-ests-server',
  '2.1.13006.6 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnIDU9Yr5TZOpbY6BqFk0Z8; expires=Thu, 28-Jul-2022 18:49:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:14 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-3cb410357f732baabe9043169943dedc-5e9a15df213648c2-01',
  'mise-correlation-id',
  '978c7cb6-52c7-46dc-beb6-3e08059d79c7',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-f60d3e35dc093c02edda8586f8e35ad5-3704e65e332f9458-01',
  'mise-correlation-id',
  'fbb9cd24-e984-4eb3-a5fa-91e9a14ac313',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTComponentTestsComponent;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Component1","contents":[{"@type":"Property","name":"ComponentProp1","schema":"string"},{"@type":"Telemetry","name":"ComponentTelemetry1","schema":"integer"}]},{"@id":"dtmi:samples:DTComponentTestsModel;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"TempModel","contents":[{"@type":"Property","name":"Prop1","schema":"string"},{"@type":"Component","name":"Component1","schema":"dtmi:samples:DTComponentTestsComponent;1"},{"@type":"Telemetry","name":"Telemetry1","schema":"integer"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTComponentTestsComponent;1","description":{},"displayName":{"en":"Component1"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:15.3960586+00:00"},{"id":"dtmi:samples:DTComponentTestsModel;1","description":{},"displayName":{"en":"TempModel"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:15.3960859+00:00"}], [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-db0f1ea9d41499da98af25445d4beb01-2d1e7cd1a42f3970-01',
  'mise-correlation-id',
  'dc645590-e578-4953-921e-be8a3bd3944e',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-678b7a62ce8cb647999a2c51526a736a-c0b23ca8bb609e46-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTComponentTestsTempTwin', {"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1"},"Prop1":"value","Component1":{"$metadata":{},"ComponentProp1":"value1"}})
  .query(true)
  .reply(200, {"$dtId":"DTComponentTestsTempTwin","$etag":"W/\"87b70f41-6645-444c-a054-0d9eac8b27a8\"","Prop1":"value","Component1":{"ComponentProp1":"value1","$metadata":{"$lastUpdateTime":"2022-06-28T18:49:15.5853745Z","ComponentProp1":{"lastUpdateTime":"2022-06-28T18:49:15.5853745Z"}}},"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1","$lastUpdateTime":"2022-06-28T18:49:15.5853745Z","Prop1":{"lastUpdateTime":"2022-06-28T18:49:15.5853745Z"}}}, [
  'Content-Length',
  '445',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"87b70f41-6645-444c-a054-0d9eac8b27a8"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-5f89fe50b8210647a0430024b0262be7-a37d6cfda0177d4e-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/DTComponentTestsTempTwin/components/Component1', [{"op":"replace","path":"/ComponentProp1","value":"value2"},{"op":"remove","path":"/ComponentProp1"}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"8b782171-9ef7-4c97-8b64-7d5a6e3feb98"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a81af7b934aca840a1f9e4e6fd918317-9e0064303314d44e-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTComponentTestsTempTwin/components/Component1')
  .query(true)
  .reply(200, {"$metadata":{"$lastUpdateTime":"2022-06-28T18:49:15.5853745Z"}}, [
  'Content-Length',
  '64',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"8b782171-9ef7-4c97-8b64-7d5a6e3feb98"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-63b04afe3a2de94b8238642391697f95-23f97c0d447ac040-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(200, {"$dtId":"DTComponentTestsTempTwin","$etag":"W/\"8b782171-9ef7-4c97-8b64-7d5a6e3feb98\"","Prop1":"value","Component1":{"$metadata":{"$lastUpdateTime":"2022-06-28T18:49:15.5853745Z"}},"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1","$lastUpdateTime":"2022-06-28T18:49:15.6746289Z","Prop1":{"lastUpdateTime":"2022-06-28T18:49:15.5853745Z"}}}, [
  'Content-Length',
  '352',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"8b782171-9ef7-4c97-8b64-7d5a6e3feb98"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b4e26d81fa1d2242a6c7f7b11ec10759-f913bdee81f4e240-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-50cf2c083bb7504a9b65c8a0c3d7bc83-f149a98efd21d747-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsModel%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-4c958a1030a730c221169bbea6a7ec82-2441169d368212a4-01',
  'mise-correlation-id',
  'c8983b6b-e04b-4e86-ac8b-8b6afdbd537b',
  'Date',
  'Tue, 28 Jun 2022 18:49:15 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsComponent%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6c614fe9f1e7298d26edd26407794c36-f8094181a7a28cac-01',
  'mise-correlation-id',
  'c35968e1-f786-42c8-9620-8f24d088729c',
  'Date',
  'Tue, 28 Jun 2022 18:49:16 GMT'
]);
