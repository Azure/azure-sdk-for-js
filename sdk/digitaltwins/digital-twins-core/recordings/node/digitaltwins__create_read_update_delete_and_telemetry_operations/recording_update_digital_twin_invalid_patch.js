let nock = require('nock');

module.exports.hash = "bf89372e400d1c05b2b00ef22cae44f6";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-invalid-patch":"digitalTwin162506689558700907"},"newDate":{}}

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
  '61297f5b-7ecb-4d24-abad-36a495962e00',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgDwAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGubF0TLoS7Wbz2qhdTeQ1H01WA7C92D9QdujY1W5WJjpoQBEO3ALXM0B6dN1wd1GGZRBjVCN7mh974i4ZcllNTPtXsaqHHrzEsA1mgTQVbYztCyi9UfSdMCz3qM1n06ocR2hfJCWjr2ysa3aAonrN4BLFtKjQxEk9D_dBfSM0O8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:12 GMT',
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
  'ce8f2d6d-3a76-459b-83ad-e4049b836f01',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgDwAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9hc4XJTL796-k1uFoCunfM8qLI6pAD4FsK9qrTM2RCHnBSDfSxiOxhQO9M7TMYThBwR9aFaDF6-Xa7cTxdDjzfpkykYs86BHP-5Vav7axaFbQiz5Ech86ifl9GBfGCfi8F8jiPwXUfUgUPuyT83mTXeyk2PtqsOcAC1NJUCX1lEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=41851c0a-a190-4c1a-8b14-9d94832cbff8&client_secret=azure_client_secret")
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
  '898a641d-360a-4605-97f7-63c1db447401',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgEAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT',
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
  '00-ae6b7dec299d3a4e8578392a814eb65c-8fa5959c348a2a45-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:14.1588967+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-5c4531910a78494ebc9826520a215c96-ef1b8954b9d3e047-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin162506689558700907')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin162506689558700907. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins http://aka.ms/adtv2query."}}, [
  'Content-Length',
  '282',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-1caa81c427220f498be6f880580b9858-39c8d8d490a6d847-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin162506689558700907', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin162506689558700907","$etag":"W/\"b548a0a6-a4ca-4c94-aa50-eb7b687f5cf1\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:14.2944001Z"}}}, [
  'Content-Length',
  '244',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"b548a0a6-a4ca-4c94-aa50-eb7b687f5cf1"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0224fbbc3e6ac14b9c69820fee03f5f9-1f34db0d34f4a444-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin162506689558700907', [{"op":"move","path":"/AverageTemperature","value":42}])
  .query(true)
  .reply(400, {"error":{"code":"JsonPatchInvalid","message":"Unsupported operation type move. Please provide a valid patch document. See section on update apis in the documentation http://aka.ms/adtv2twins."}}, [
  'Content-Length',
  '195',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-5b883dc10419a6439776bc79abea649c-d2c7c83146826d41-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin162506689558700907')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b0e50eab66c581428c49819e406b2ebb-ff184b2507119c4a-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT'
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
  '00-11171115e30aa1459531d591b9c3dcfb-e8414ec1df0d6146-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:13 GMT'
]);
