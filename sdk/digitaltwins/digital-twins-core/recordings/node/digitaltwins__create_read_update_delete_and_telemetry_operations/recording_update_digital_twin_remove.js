let nock = require('nock');

module.exports.hash = "b280c4362d9722ad277b1591f9ae6d10";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-remove":"digitalTwin164874834312700755"},"newDate":{}}

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
  '5f5da9eb-a6c7-426a-a19e-67272b8cb500',
  'x-ms-ests-server',
  '2.1.12570.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=At3cR-19Ks5DteK27huFcx0; expires=Sat, 30-Apr-2022 17:39:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrtOPUJub_HW3M3aj3SrYvyPM2kZIh9-dLMFthcA7PvyX47pZOU16yTVydCJQ5EWaZpxzbxGb7FCkzyS0JPrhOmUWgXUUvLh9YnoLsCLlwL_fjhQTN9hK6bS8U4b4AFm2XS2gsYBB632IQP5SWtdpsRPoVXcz8dP94TMkpk8o2CcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:03 GMT',
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
  'a264ad0e-f0e2-4de7-97c6-08a219e22000',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AstqD4K_OiNPuguMEt1ivj0; expires=Sat, 30-Apr-2022 17:39:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJ-1FN-0ub5AKlerupG_WrCVYbFzAUmo4zq3HuMEEclEeYlXiaXp8Rx93eFbF8UaFcnZgqiuFBjA-sQ5Z8QCSjoEhTNMXNKEH1HyJSUsEAv0L9Qrd8zSgHaWSqhiyKVQoVjzcjctre7klxwKEo21DfXUE-R0mkyALSypY_GkMntAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:03 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=63295c3e-c3ec-4283-a00a-957ccf9406a7&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a264ad0e-f0e2-4de7-97c6-08a21be22000',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Al862AMtWB5Hj4JJ2ItPGn4; expires=Sat, 30-Apr-2022 17:39:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:03 GMT',
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
  '00-4351fa76c86fdf4abeeb24895d7161ea-f017421bd210f44c-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:03 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:04.1813427+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-bdb60a1df2ba87419e7564e788086413-2aa8f8041deb7b48-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:03 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin164874834312700755')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin164874834312700755. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-5ed2c48018a4d94694b3bd1d8e1077c2-9cca6f0b584d8d43-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:03 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin164874834312700755', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68,"TemperatureUnit":"Celsius"})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin164874834312700755","$etag":"W/\"b805086d-3e47-43dc-99b8-5cd6e0d01f86\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:04.4255507Z"},"TemperatureUnit":{"lastUpdateTime":"2022-03-31T17:39:04.4255507Z"}}}, [
  'Content-Length',
  '340',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"b805086d-3e47-43dc-99b8-5cd6e0d01f86"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-46033c02b4ae374daeeb737a4132252b-29024a78f82d0544-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:03 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin164874834312700755', [{"op":"remove","path":"/AverageTemperature"}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"c7ba83d2-108a-4868-95d0-caeed8b239ff"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-c4955f37427fe549b975dfe1cde81b5f-bb7de003febff34e-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:03 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/digitalTwin164874834312700755')
  .query(true)
  .reply(200, {"$dtId":"digitalTwin164874834312700755","$etag":"W/\"c7ba83d2-108a-4868-95d0-caeed8b239ff\"","TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","TemperatureUnit":{"lastUpdateTime":"2022-03-31T17:39:04.4255507Z"}}}, [
  'Content-Length',
  '245',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"c7ba83d2-108a-4868-95d0-caeed8b239ff"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f85bd01b3901c543a91b50b26975a471-229cc7d3a8d54644-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin164874834312700755')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-42251a878d4e004892e84e47f88510b7-34428cc8b105aa4e-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT'
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
  '00-151e21c1b1c5184fbab1242b7521755f-de4fe4dca67f0141-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:04 GMT'
]);
