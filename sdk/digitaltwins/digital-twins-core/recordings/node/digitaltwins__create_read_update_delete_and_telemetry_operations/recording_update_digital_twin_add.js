let nock = require('nock');

module.exports.hash = "380ff2920282defe93fe0012def1af7b";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-add":"digitalTwin165644217082504229"},"newDate":{}}

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
  'e8a5d06b-19d7-4df5-8c25-a470551cc801',
  'x-ms-ests-server',
  '2.1.13006.6 - EUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Are-eYHJ4dRAiZwA85VJAvY; expires=Thu, 28-Jul-2022 18:49:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrl2PdOI5n7aN3aHDGSQHEh6UnKTNxAg3qjt3V9NO5bqSeUSI4f03VfdYVn7odidvLwZZMbGi4oTYzGfk7v5R8pteHN0ibP2T2um7Vq_av1J3ChfuFcVF_G2rCX0H40xDtVl0ptP5Z7G-wT3IgGnM59ythUMdv2EFpZrltjotNfHQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT',
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
  'd898768c-ab8c-4caa-9391-af4919023400',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjyMijJ5ErBGpHjubHqrvvA; expires=Thu, 28-Jul-2022 18:49:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWigHm7EgER3Dr0-9hGQcFplRGROK2CgUs0D3DyAZQHjhpbJ0pIsrJYR6Nilcx9-wE2tCq6vNh5osm489mrDc9vjgrL6tD6shfYnvjQ6HKbGOmfTDFw0H561KxRm6Ie70i-qrdIHtyHKpzaBVv0Dmug91RI9vAys1jUEFjlKaD5IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=558d37fd-6fdc-4f3c-8486-31f3f1cc4422&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'ed74c7fb-4a9c-4202-870a-d4415b47b601',
  'x-ms-ests-server',
  '2.1.13006.6 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aiq1ZAwOYd5IkGjdF4_Vacs; expires=Thu, 28-Jul-2022 18:49:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT',
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
  '00-49c7bb6b4f44f1cdb944d81bfcc42191-cc61381ab2c6718f-01',
  'mise-correlation-id',
  '728aeaec-52b7-4248-97e0-e74f81fedd90',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:31.114739+00:00"}], [
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6184ed4fb18ecab457c78fd0d9f9149b-a1f4c7da5026c1d8-01',
  'mise-correlation-id',
  '58c5347f-84a6-413e-8483-37d622645c94',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644217082504229')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin165644217082504229. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-397ccd6c72cbfa43a018f5121b10c887-81c1b0bc5f877542-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin165644217082504229', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644217082504229","$etag":"W/\"66fc6073-7035-404e-8555-40efb16552ec\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:31.2736117Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:31.2736117Z"}}}, [
  'Content-Length',
  '293',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"66fc6073-7035-404e-8555-40efb16552ec"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-afc52fe88a1a0b40a4a32dd42af9076d-610b8f45b218c74a-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin165644217082504229', [{"op":"add","path":"/TemperatureUnit","value":"Celsius"}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"53c6e51a-3d7a-4040-b137-e27acef5ecf0"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f60839779b77484abe422c4c75f8697a-c44e72107377ff4f-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/digitalTwin165644217082504229')
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644217082504229","$etag":"W/\"53c6e51a-3d7a-4040-b137-e27acef5ecf0\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:31.3535012Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:31.2736117Z"},"TemperatureUnit":{"lastUpdateTime":"2022-06-28T18:49:31.3535012Z"}}}, [
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"53c6e51a-3d7a-4040-b137-e27acef5ecf0"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-9b656657b294a647a2b5ac9ca3080e6e-2f136f44f5fa8e4b-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:30 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644217082504229')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-ef6878568fc47a4a8bffb6f6b1ef8498-5abf545a4396cc42-01',
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
  '00-601e7482958616370211ed375cf41456-ed23035e6d8277fd-01',
  'mise-correlation-id',
  'c0cc8cdd-688a-4170-a227-6e8a2f15378c',
  'Date',
  'Tue, 28 Jun 2022 18:49:31 GMT'
]);
