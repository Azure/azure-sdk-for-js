let nock = require('nock');

module.exports.hash = "654b559c06fd4402dd08573f0b9e992a";

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
  '923874ef-b750-42dc-b52d-d1a751bd2400',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKlno7TUKFG0XxCyfxx-ddhDFB3N9_vVk-amVZvkCyq9-dy9q7yOxJuCcEMlV7k-rw0NTk0TsKOAGydR1VwC89y0NllGKTVjMfsiW-V--yzfAS4cVaVURlOZNW2J2yyvayo6K5FSXe0WkI5kcjjkuLsQbbu6Er5mV_-xxwxZJTJQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:33 GMT',
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
  '17f1964b-db13-4bc5-adf0-3c42fc9e8000',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLoXmJxGlnm1A2rDS10J4vtdljaIUzIxr90An2anoB2JFYE7fUN4vzJwQDxD2uiUiHvkusYbLSkLGo8ywiBVMM6oSVpeHXJPkUjcPHREbi3MoAHkZz8uEf24QLFzmTOodYcyH23PzFviZvWy24NMcSRN6zMemW50qS5WkGdVFPOcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:33 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=6bb87f71-5b0b-4473-9b83-3112af1ae4ea&client_secret=azure_client_secret")
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
  '17f1964b-db13-4bc5-adf0-3c42069f8000',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:34 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsBuilding%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTRelationshipsTestsBuilding;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '228',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-ccfb23d01c7f8a41aeb55a467cb7c542-3b88d11d1fcd214b-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsFloor%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTRelationshipsTestsFloor;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '225',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-af6bc0d772040746a674c47d27df5680-7c71a42f2b417c49-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsRoom%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTRelationshipsTestsRoom;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '224',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-1ac35ee87799a5419a6feeb344c2d7a8-f7fabd3244638a49-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTRelationshipsTestsBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Relationship","name":"has","target":"dtmi:samples:DTRelationshipsTestsFloor;1","properties":[{"@type":"Property","name":"isAccessRestricted","schema":"boolean"}]},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsFloor;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Floor","contents":[{"@type":"Relationship","name":"contains","target":"dtmi:samples:DTRelationshipsTestsRoom;1"},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsRoom;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Room","contents":[{"@type":"Property","name":"Temperature","schema":"double"},{"@type":"Property","name":"IsOccupied","schema":"boolean"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTRelationshipsTestsBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:35.1246779+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsFloor;1","description":{},"displayName":{"en":"Floor"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:35.124703+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsRoom;1","description":{},"displayName":{"en":"Room"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:35.1247183+00:00"}], [
  'Content-Length',
  '508',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6560b5a309fe7e469926abfb0fd8c150-2dde662b8b173240-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsBuildingTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTRelationshipsTestsBuildingTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins http://aka.ms/adtv2query."}}, [
  'Content-Length',
  '285',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-4ea53aa96231c44f939bb972a7e5414a-1e6e694d580b5c4e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsFloorTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTRelationshipsTestsFloorTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins http://aka.ms/adtv2query."}}, [
  'Content-Length',
  '282',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-ff86abbb69730d4593d0f3dcc44d1d71-18936808d215674d-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:34 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsRoomTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTRelationshipsTestsRoomTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins http://aka.ms/adtv2query."}}, [
  'Content-Length',
  '281',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-5a424e538b122c479aceaff7bb2882d2-62d5daa17135d141-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsBuildingTwin","$etag":"W/\"bb1c771e-47bc-4b4a-8213-4d599f0240f3\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:35.3462833Z"}}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"bb1c771e-47bc-4b4a-8213-4d599f0240f3"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0c8351f4415df44f95720e7d788df0a5-28ef95eb1083294e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsFloorTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1"},"AverageTemperature":75})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsFloorTwin","$etag":"W/\"74a2e8cf-4d1d-4da7-9d37-7ee1dc00b26f\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:35.4117067Z"}}}, [
  'Content-Length',
  '255',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"74a2e8cf-4d1d-4da7-9d37-7ee1dc00b26f"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6adf0f4886ffb44caa3fbe8201653c85-6c0268b5b524af4b-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsRoomTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1"},"Temperature":80,"IsOccupied":true})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsRoomTwin","$etag":"W/\"502f0b81-debc-495b-ad4e-3f24ca5a360c\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1","Temperature":{"lastUpdateTime":"2021-06-30T15:28:35.4752822Z"},"IsOccupied":{"lastUpdateTime":"2021-06-30T15:28:35.4752822Z"}}}, [
  'Content-Length',
  '320',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"502f0b81-debc-495b-ad4e-3f24ca5a360c"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f27502788e9ce64cba1269ed79b209b2-4f908d13d33b4645-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsFloorTwin/relationships/FloorContainsRoom', {"$relationshipId":"FloorContainsRoom","$sourceId":"DTRelationshipsTestsFloorTwin","$relationshipName":"contains","$targetId":"DTRelationshipsTestsRoomTwin"})
  .query(true)
  .reply(200, {"$relationshipId":"FloorContainsRoom","$etag":"W/\"d3d9d9d6-bccd-4de0-8080-6a7d670d4bc6\"","$sourceId":"DTRelationshipsTestsFloorTwin","$relationshipName":"contains","$targetId":"DTRelationshipsTestsRoomTwin"}, [
  'Content-Length',
  '210',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"d3d9d9d6-bccd-4de0-8080-6a7d670d4bc6"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0605c063ca17af4e8feed432ff702e9a-e2cd302007ca504d-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsFloorTwin/relationships/FloorContainsRoom')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f37b83122bb4ac44abce567f9add48fa-8787aa66d886b345-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsBuildingTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f53ac7f14e378d4ebab3c4f9632dcfcb-5f589d95b289e648-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsFloorTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-5e36a58bd51791428eca3d82882d94bd-ff0f4cfaf1c2d549-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsRoomTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0a09f7d7f64f2e45a8cc0c98bbc55e19-a53c194cdf665846-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsBuilding%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b4e394bdebd7d6479d66d6596da8d993-91c2ce218112804b-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsFloor%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f643b58fba37a24c95c61a1582079709-74b79085e2864044-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsRoom%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b59308872789ed45b94beedee525d089-a02be910d92d7b46-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:35 GMT'
]);
