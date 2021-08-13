let nock = require('nock');

module.exports.hash = "3b0695c1d8b643817640e94b3d3b42f1";

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
  'a78b5b73-05e4-4ded-b211-f3e46bc9f100',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrK6Xkjzr1B5RTVuhoxpizJE48dWwV6UtY-aqaE4z6_VF1zET8kKnozDTGnLntYxDk1dwMpK6rTWEgVLPzcspG3dhJw_iPKuUVhg0CSy7mUFutjl8VquRw7fNbd23Ok1HwU_985ZlrVmswYhRUiAvgQvyxyZ7Clf2naxk6zXAbTgQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:39 GMT',
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
  '28812791-b9ec-449e-b425-0faab2c31f01',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrm2N7VKOtDSTGOrrras36lg2wIlFYHxceB0zi5FEPpndG4rwl74N7mPqQpVKRHdtpcvYs52v_tpOVc6W7p-HRSClUIxzzHDONm69xEC8Eila5OZor-ti4X04XvpC78I6yFbzRQCHsQOpfuNgaZAw4C9mhsfWKORfV54isuqKBrpggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=90a0407a-fad7-476d-a2eb-1f777e6eceb2&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1325',
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
  'e8adf41f-245f-45f8-a149-c5e402804e01',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgFAAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:28:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
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
  '00-9e438f3083b48f44b572e1916256df07-cdbb08ce5fc6e24b-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
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
  '00-8f8aa82700f5a44d8cda54c8fb8a18de-7a9e93e895a71b4a-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
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
  '00-d6c29cff20db35439f8a10786994ecfe-d4143348b1e4aa4b-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTRelationshipsTestsBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Relationship","name":"has","target":"dtmi:samples:DTRelationshipsTestsFloor;1","properties":[{"@type":"Property","name":"isAccessRestricted","schema":"boolean"}]},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsFloor;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Floor","contents":[{"@type":"Relationship","name":"contains","target":"dtmi:samples:DTRelationshipsTestsRoom;1"},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsRoom;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Room","contents":[{"@type":"Property","name":"Temperature","schema":"double"},{"@type":"Property","name":"IsOccupied","schema":"boolean"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTRelationshipsTestsBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:41.2226474+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsFloor;1","description":{},"displayName":{"en":"Floor"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:41.2226743+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsRoom;1","description":{},"displayName":{"en":"Room"},"decommissioned":false,"uploadTime":"2021-06-30T15:28:41.2226956+00:00"}], [
  'Content-Length',
  '509',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f2810a28576f214c82b4971364202421-3f24bc19f146554e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
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
  '00-abe5d0ef604f434d90dc8aa685e3b6df-7d7ab15a556ae34d-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
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
  '00-eb55acadf735a442a22c254e1d6f4444-79d0051a53984e41-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
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
  '00-79f9ff0197fda04ca1c01fd20d5b71fd-08286e6d9da8404e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsBuildingTwin","$etag":"W/\"41c998f5-223a-4c66-8535-720027feb17f\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:41.3892985Z"}}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"41c998f5-223a-4c66-8535-720027feb17f"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-8a9498accedc9948a402bcc2c2272ef5-f27120803b0ade46-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsFloorTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1"},"AverageTemperature":75})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsFloorTwin","$etag":"W/\"cff8f90e-5e3a-4905-a783-53227c28ad02\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1","AverageTemperature":{"lastUpdateTime":"2021-06-30T15:28:41.4405282Z"}}}, [
  'Content-Length',
  '255',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"cff8f90e-5e3a-4905-a783-53227c28ad02"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-367801d4b33d674bb783e2a4563ba784-45dc2f98109e3844-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsRoomTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1"},"Temperature":80,"IsOccupied":true})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsRoomTwin","$etag":"W/\"9f30cfbd-fe4c-4106-af73-ccb98c9dab9e\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1","Temperature":{"lastUpdateTime":"2021-06-30T15:28:41.4902374Z"},"IsOccupied":{"lastUpdateTime":"2021-06-30T15:28:41.4902374Z"}}}, [
  'Content-Length',
  '320',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"9f30cfbd-fe4c-4106-af73-ccb98c9dab9e"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-ee732ab49034d04d8d3222b13be0f32a-e7d49e8e7ce55e45-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin/relationships/BuildingHasFloor', {"$relationshipId":"BuildingHasFloor","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false})
  .query(true)
  .reply(200, {"$relationshipId":"BuildingHasFloor","$etag":"W/\"05d1bd71-8c15-4698-b65b-cda2bd48a552\"","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false}, [
  'Content-Length',
  '235',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"05d1bd71-8c15-4698-b65b-cda2bd48a552"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a0b9348dfb07e542992faebaf551ba83-df79d965ebabdf4d-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTRelationshipsTestsBuildingTwin/relationships/BuildingHasFloor')
  .query(true)
  .reply(200, {"$relationshipId":"BuildingHasFloor","$etag":"W/\"05d1bd71-8c15-4698-b65b-cda2bd48a552\"","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false}, [
  'Content-Length',
  '235',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"05d1bd71-8c15-4698-b65b-cda2bd48a552"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b1464cc37faf5e42992f21a9ad25d6bd-71bea139b9fd654f-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsBuildingTwin/relationships/BuildingHasFloor')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-19cfeebcc370704abbdc1dfb8e2d264b-38fe60eb79715541-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:41 GMT'
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
  '00-69ea964cebd750439de6f98e86b7c838-e5762982fd63fb4e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:41 GMT'
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
  '00-42e28d944dc1764c936e59562d05df8e-abeb17e32c3a654f-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:41 GMT'
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
  '00-f6649f9ca5bba6489b50e865d8762af1-cbc26b74a30f1b41-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:41 GMT'
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
  '00-83081258e8ac4c47a7a2144a8a02e2fe-a03458c4809bd94c-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:41 GMT'
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
  '00-67233a78933d914d9bebbf1f4ee19e81-4ab766b77fdc4c4e-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:41 GMT'
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
  '00-90dc75d82bebdf4c927e2c9e9643f75d-7679ece179f85740-01',
  'Date',
  'Wed, 30 Jun 2021 15:28:41 GMT'
]);
