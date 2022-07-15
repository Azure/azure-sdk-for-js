let nock = require('nock');

module.exports.hash = "227d02b070608ab70cff6874e69d4f1d";

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
  'c6bdc4de-4ce5-413b-a00f-af9ac61aaf00',
  'x-ms-ests-server',
  '2.1.13006.6 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Anq6AxUFw0BDg3vrhofHT9k; expires=Thu, 28-Jul-2022 18:50:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdlkyUjVHZztBpIzyt7p3rzxZEGqFKursXzBW322LTy0WoZibMNIzOa3ISRyNcO9BVm2Y9P-JndbA0tgvsAIImOFHmI4kFVyve6mgW3eJrdFQ4Ydaf7QX-DE423tgbwrlM0qroGIw0UKhLhEJuDvXvGxUwJ2uSrloKITXEvklkLUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:50:24 GMT',
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
  'fe673ee7-eb2b-4be7-ac6c-102d38600201',
  'x-ms-ests-server',
  '2.1.13006.6 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Als7pDL2UztNsjqXpJoLSIQ; expires=Thu, 28-Jul-2022 18:50:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSuPSlMMEV2_gyYAudF7IKLk3flEx7XyZG04x1x2g2g8NtSRvVp_LmPdWD-o9ZCMs2oI5ZlYb9IROJQFOlCxusi1XHWkvI0kXU0D00KoK-eSRXYlIPN0oHleaL527OCv_V38W64KdQRbcBVRJooSxUa50JyjMx90TlpuuMy2JT-4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:50:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1345383d-98ef-4498-8f1b-8af18d164067&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6c5d7f52-2c36-480e-8d8b-b8e9af1e3000',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aq0igH1Yb91FgTpO74dqwdc; expires=Thu, 28-Jul-2022 18:50:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:50:24 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-635d6da69462a0c7af5a8c19d20e230d-8e45d90dd6065f5f-01',
  'mise-correlation-id',
  '07309604-e1a5-4d3d-b663-901264e60630',
  'Date',
  'Tue, 28 Jun 2022 18:50:25 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-f34116b62a47c210e3742ff03caa16af-5d1ba51bd10ce89a-01',
  'mise-correlation-id',
  '82dd841a-d9d9-402f-aedb-3583fd8396f6',
  'Date',
  'Tue, 28 Jun 2022 18:50:25 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-f6056ce7566aef168dcb6fec71a1fef9-2da6ef0d5d030906-01',
  'mise-correlation-id',
  'ab6d70b0-3831-45ab-8d44-d9d9b1e10949',
  'Date',
  'Tue, 28 Jun 2022 18:50:25 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTRelationshipsTestsBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Relationship","name":"has","target":"dtmi:samples:DTRelationshipsTestsFloor;1","properties":[{"@type":"Property","name":"isAccessRestricted","schema":"boolean"}]},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsFloor;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Floor","contents":[{"@type":"Relationship","name":"contains","target":"dtmi:samples:DTRelationshipsTestsRoom;1"},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsRoom;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Room","contents":[{"@type":"Property","name":"Temperature","schema":"double"},{"@type":"Property","name":"IsOccupied","schema":"boolean"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTRelationshipsTestsBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-06-28T18:50:25.8732247+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsFloor;1","description":{},"displayName":{"en":"Floor"},"decommissioned":false,"uploadTime":"2022-06-28T18:50:25.8732478+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsRoom;1","description":{},"displayName":{"en":"Room"},"decommissioned":false,"uploadTime":"2022-06-28T18:50:25.8732616+00:00"}], [
  'Content-Length',
  '509',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-4175e3b3f5a00b2f2ac90a5ff69270b8-e48c797f79d803be-01',
  'mise-correlation-id',
  'a536bfa2-5d7f-433b-80d1-69fcb685d1f5',
  'Date',
  'Tue, 28 Jun 2022 18:50:25 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsBuildingTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTRelationshipsTestsBuildingTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '286',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-2ba381ab391ab045ab98c2f5571fc4b5-5b6b2b8ac9524649-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:25 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsFloorTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTRelationshipsTestsFloorTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b53fe4dc40dc4047a2636ab7894bf4df-332ef306a43c2946-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:25 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsRoomTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTRelationshipsTestsRoomTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '282',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-35dd290ca78abe408415f777c91725a2-ab7a21b2ac75b144-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:25 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsBuildingTwin","$etag":"W/\"34ddbd51-0db0-4087-8bf1-261595032247\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1","$lastUpdateTime":"2022-06-28T18:50:26.1735544Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:50:26.1735544Z"}}}, [
  'Content-Length',
  '310',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"34ddbd51-0db0-4087-8bf1-261595032247"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-e3264ec57436f24b8e3e4f4e06f354c7-3ce0fd5da86be045-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:25 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsFloorTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1"},"AverageTemperature":75})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsFloorTwin","$etag":"W/\"ec7c341e-a6d4-47be-b39b-3824d1f02848\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1","$lastUpdateTime":"2022-06-28T18:50:26.2528244Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:50:26.2528244Z"}}}, [
  'Content-Length',
  '304',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"ec7c341e-a6d4-47be-b39b-3824d1f02848"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-db6b916100b0cb46b996286a0c0e51ab-2e22e0f315400c4e-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsRoomTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1"},"Temperature":80,"IsOccupied":true})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsRoomTwin","$etag":"W/\"a177cb47-2d60-4345-a15e-a5579668d6c5\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1","$lastUpdateTime":"2022-06-28T18:50:26.3315738Z","Temperature":{"lastUpdateTime":"2022-06-28T18:50:26.3315738Z"},"IsOccupied":{"lastUpdateTime":"2022-06-28T18:50:26.3315738Z"}}}, [
  'Content-Length',
  '369',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"a177cb47-2d60-4345-a15e-a5579668d6c5"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-d5dbc7927348c141a665a6f044a7427b-917212bf226a0846-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin/relationships/BuildingHasFloor', {"$relationshipId":"BuildingHasFloor","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false})
  .query(true)
  .reply(200, {"$relationshipId":"BuildingHasFloor","$etag":"W/\"b0f74365-19a0-464b-8fbe-b638afc776e5\"","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false}, [
  'Content-Length',
  '235',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"b0f74365-19a0-464b-8fbe-b638afc776e5"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6c8a24e5840d384e85dd45d195fd6925-aa9951fc762d7748-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTRelationshipsTestsBuildingTwin/relationships')
  .query(true)
  .reply(200, {"nextLink":null,"value":[{"$relationshipId":"BuildingHasFloor","$etag":"W/\"b0f74365-19a0-464b-8fbe-b638afc776e5\"","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false}]}, [
  'Content-Length',
  '263',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-54d39f6b11851a498a7f19bf2d8b6fc2-27664c1a246ee841-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsBuildingTwin/relationships/BuildingHasFloor')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-edc8b57945f4744494c84bc3bc82452a-a1cc47272f201a48-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsBuildingTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f8cb23703200224a807bb3ad4211cef6-fe0c9f4d4b9b7546-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsFloorTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-154e692893200f48ad484c48a11c01e9-2f2c7dae27544c4e-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsRoomTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-851ca8780252d24eadd9d6043cee6b36-803a96b8f7c98245-01',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsBuilding%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a2ed5d7b08c0a6c50dda1d7bb4c59998-7aba61325bb0f3df-01',
  'mise-correlation-id',
  '3a353b63-f5f9-4d89-b98b-d05a7fab63aa',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsFloor%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-8cc428ec6cc71c026a4c432bc21691ac-c73a5f62cd9a153f-01',
  'mise-correlation-id',
  'ea02ccb7-4ee1-462f-b1a9-3cbe541be27d',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTRelationshipsTestsRoom%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-ca3ff4959836dd7b1ed1854734719a19-64b8d8c3e8edbb8c-01',
  'mise-correlation-id',
  '9146968b-a240-4995-9209-c5078d96bd95',
  'Date',
  'Tue, 28 Jun 2022 18:50:26 GMT'
]);
