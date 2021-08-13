let nock = require('nock');

module.exports.hash = "be3e7a96363d8bfea8aaac219a3eb14c";

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
  'ea7e9859-4ccf-407d-833f-f77b907d3d01',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr23-Y6ANnkB5QsrJ0NGolZzmijV9UDduM0cPwMUrQmuVZOXdK5tA_Ycvvq-2HTDzNKlTB9FWPHoYcfYKpJStXPcMg02XY7WGCsoshOriJ_tRqd2H53qsaImGGqpeE-bjavsyf-4Fz-U5G8hq3tAx8_eVkmhUNl7C6JSfA2YPX6ZYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:36 GMT',
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
  'f75e896d-b4c4-4e8a-8d17-6ea6d2112201',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYRLmYQDooNTlqgWWC7wEuSPY-_9qOTvhVaR8RUMGowXMGAL0CXFv4fCA7ip5aTLuokTXU9mGzyiwklEncBwDFhNCLQdJF7oGjZ2J-DXqj0ISoASTVrm4O-QGocJuhNwqDJifT9WUxFzqTXXAS6lKLPlytpypus6UXA6D8ka7W1sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=c6777af3-4a78-40a1-be07-a6db0f353072&client_secret=azure_client_secret")
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
  'c7083201-44d5-43b9-b5eb-78090c787f01',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:36 GMT',
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
  '00-956ccfe573c7f14382c65bae7119c806-195d650d9c195245-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-d7d0a1f2b0cac54d97b7d686ee8a0d05-197c44f8a7e1044d-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-d1046a6ac7b6cf4ea6874d3af4178518-645e5706701c2c4e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTRelationshipsTestsBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Relationship","name":"has","target":"dtmi:samples:DTRelationshipsTestsFloor;1","properties":[{"@type":"Property","name":"isAccessRestricted","schema":"boolean"}]},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsFloor;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Floor","contents":[{"@type":"Relationship","name":"contains","target":"dtmi:samples:DTRelationshipsTestsRoom;1"},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsRoom;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Room","contents":[{"@type":"Property","name":"Temperature","schema":"double"},{"@type":"Property","name":"IsOccupied","schema":"boolean"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTRelationshipsTestsBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:37.6645154+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsFloor;1","description":{},"displayName":{"en":"Floor"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:37.6645382+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsRoom;1","description":{},"displayName":{"en":"Room"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:37.6645531+00:00"}], [
  'Content-Length',
  '509',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a259bc91a6368a498204f5693d5113d6-7c0d4f4e1f2a6a49-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-265c85068c358f439d241a505f4fb8f8-0e64050a6d224849-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-ec6cf22a18d147429e7a4ec6de3e5216-29d2c9547532b545-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-8c1c019f41fd5f4b981805a9b5170b38-b9e65ca4801f934e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsBuildingTwin","$etag":"W/\"94228f40-f7f6-479a-bafa-ed59f7a1f75c\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:37.8345536Z"}}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"94228f40-f7f6-479a-bafa-ed59f7a1f75c"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b60d90f7338b494096bd9afe86a37a0f-ff885743d84bc44b-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsFloorTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1"},"AverageTemperature":75})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsFloorTwin","$etag":"W/\"264e4122-f051-40a7-8bc2-23e23ac28ae2\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:37.8874266Z"}}}, [
  'Content-Length',
  '255',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"264e4122-f051-40a7-8bc2-23e23ac28ae2"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-571bad2961322f4ca449d2d44bc9b8ed-46a28805cb0b014c-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsRoomTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1"},"Temperature":80,"IsOccupied":true})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsRoomTwin","$etag":"W/\"02c88095-6eab-493b-91a3-013a58a139bb\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1","Temperature":{"lastUpdateTime":"2021-06-30T15:28:37.9351776Z"},"IsOccupied":{"lastUpdateTime":"2021-06-30T15:28:37.9351776Z"}}}, [
  'Content-Length',
  '320',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"02c88095-6eab-493b-91a3-013a58a139bb"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a65a36a7ece3c046b19355e20bac754f-fdeaa0eddf95054b-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsFloorTwin/relationships/FloorContainsRoom', {"$relationshipId":"FloorContainsRoom","$sourceId":"DTRelationshipsTestsFloorTwin","$relationshipName":"contains","$targetId":"foo"})
  .query(true)
  .reply(404, {"error":{"code":"TargetDigitalTwinNotFound","message":"The target digital twin is invalid or does not exist Please validate that the target twin is valid and ensure that the target twin is not deleted. See section on querying the twins http://aka.ms/adtv2query ."}}, [
  'Content-Length',
  '266',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6739dffa04688c4788c874c675517a91-028bc2338f5eae42-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsFloorTwin/relationships/FloorContainsRoom')
  .query(true)
  .reply(404, {"error":{"code":"RelationshipNotFound","message":"Relationship FloorContainsRoom not found on twin DTRelationshipsTestsFloorTwin. Please verify that the relationship id is valid and ensure that the relationship is not deleted. See section on listing relationships in the documentation http://aka.ms/adtv2twins."}}, [
  'Content-Length',
  '314',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-10548dbe76582f459031fe3ab8d9ce5a-38c0ad3c81b7fd48-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-dc6131391c2fe547be2c835595abbde9-158b3602e39d9040-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-dc54799084f2954385e88bd80960bcd4-4357041919e6104e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-5d1f45f2d8e74a41b9cad17ac8026dfe-0dc2be4920136e45-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-12b1f1801c80bf48b0d7668446fdfefc-6226aac0491d9948-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-db8a6192f75b3d41b86495980bd126f8-aac2285959a37442-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
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
  '00-237550738cf855488b40a2944dc2e01c-76af54b48811894f-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:37 GMT'
]);
