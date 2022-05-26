let nock = require('nock');

module.exports.hash = "3938dee909898209e0646e78ce40958e";

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
  'faa8749e-a501-42de-8ad6-cad0d332b601',
  'x-ms-ests-server',
  '2.1.12570.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ago5zOz63Q5Pj_QSSWznccc; expires=Sat, 30-Apr-2022 17:39:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlQ2Pp5AYc034AjaC75MvkCQIsjcRnYTQRO3Kq6M4AosJ8byUOlarMsUtspztxfh966pfW-qkQd6xGdiWt9_YS4pR9OvFFtWHuGuW04jX5k2kDPCILoOLRbSwaNcHM1mxlmbSVZ6CWVL_-id2EFjm-fSSNVjszxOOwEkFCAi73z4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:39 GMT',
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
  'a264ad0e-f0e2-4de7-97c6-08a217e82000',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvegsF5a4-pHiMb5L1W03i0; expires=Sat, 30-Apr-2022 17:39:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevraVT-z9ZMmFgNdtlXi5kA8kx9g8iXzjNz2uk7dfMD5e5bdQIbQdPtwtCOi4ZlOLplEMRz9W3_qNks-sZcXXw3y5vbCGv9WpG4OarXA4AhbqqsaTPo7DP3Na8xPjT8XAtGC3Vzd3zdOOmpvnMfKr33wU2hjpr4SUWmxbKKsOxxxOMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b1157870-94bb-4d0a-af49-700a1d3b42cc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a99f8f4b-aacc-4bd6-8f1e-b047ee2c1f00',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Airz9yvOy_lIkYc74eAekng; expires=Sat, 30-Apr-2022 17:39:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:39 GMT',
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
  '00-8530acb0b0797940a341799ec60c6b8f-a49d0d3567abbe49-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:39 GMT'
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
  '00-ffaabd53eb3b6c47b09f161e7949009f-3c1ddf584edfc44e-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:39 GMT'
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
  '00-7a13144bc6fc0749acb880c4afdce80c-6700e91be2edef4b-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTRelationshipsTestsBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Relationship","name":"has","target":"dtmi:samples:DTRelationshipsTestsFloor;1","properties":[{"@type":"Property","name":"isAccessRestricted","schema":"boolean"}]},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsFloor;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Floor","contents":[{"@type":"Relationship","name":"contains","target":"dtmi:samples:DTRelationshipsTestsRoom;1"},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsRoom;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Room","contents":[{"@type":"Property","name":"Temperature","schema":"double"},{"@type":"Property","name":"IsOccupied","schema":"boolean"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTRelationshipsTestsBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:40.5303668+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsFloor;1","description":{},"displayName":{"en":"Floor"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:40.5304528+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsRoom;1","description":{},"displayName":{"en":"Room"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:40.5304716+00:00"}], [
  'Content-Length',
  '509',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-d4e502da5ab4c84785d70e23d3fb00c2-c2166f5d3a9f9a42-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-d1247765525dd9459ebe3e2f87e06fa8-acf21705031dee45-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:39 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-46f20e4bd5a9a34b91a621289fe0ebb6-7d63a717ddc80047-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-619c5e18d911a94ea77f9bc1ef74bb85-fe23d9d6fa77a940-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsBuildingTwin","$etag":"W/\"f0c74832-aebc-4bba-83a1-faedfcf3e085\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:40.9632896Z"}}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"f0c74832-aebc-4bba-83a1-faedfcf3e085"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-37f2e8275b9b784c97619d6a891dcdd9-dc486f79bb53cf4b-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsFloorTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1"},"AverageTemperature":75})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsFloorTwin","$etag":"W/\"ab2f9e25-f319-41ef-ad6f-fe221e43dddd\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:41.0864840Z"}}}, [
  'Content-Length',
  '255',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"ab2f9e25-f319-41ef-ad6f-fe221e43dddd"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-de7ee86711eaa542b1868cdf48933d83-1a58a6c7ebd8a740-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsRoomTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1"},"Temperature":80,"IsOccupied":true})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsRoomTwin","$etag":"W/\"6f2d5154-8fc8-4848-8b04-ea6221b56b7b\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1","Temperature":{"lastUpdateTime":"2022-03-31T17:39:41.1976222Z"},"IsOccupied":{"lastUpdateTime":"2022-03-31T17:39:41.1976222Z"}}}, [
  'Content-Length',
  '320',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"6f2d5154-8fc8-4848-8b04-ea6221b56b7b"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0768d98f0dbb7442b24b93fe278baec5-f61623af525c2842-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/foo/relationships/FloorContainsRoom', {"$relationshipId":"FloorContainsRoom","$sourceId":"DTRelationshipsTestsFloorTwin","$relationshipName":"contains","$targetId":"DTRelationshipsTestsRoomTwin"})
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID foo. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '257',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-579905884a65e442b2fbc88ea3c1529a-61c5464f68dc6949-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipsTestsFloorTwin/relationships/FloorContainsRoom')
  .query(true)
  .reply(404, {"error":{"code":"RelationshipNotFound","message":"Relationship FloorContainsRoom not found on twin DTRelationshipsTestsFloorTwin. Please verify that the relationship id is valid and ensure that the relationship is not deleted. See section on listing relationships in the documentation https://aka.ms/adtv2twins."}}, [
  'Content-Length',
  '315',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-ae9aa7e50431b94cb0d5bdc19bdab992-bfff435c4cf5b546-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
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
  '00-35b53d6eb74f6f4fbff4e288703c6d16-895abe9f28e3cf4f-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
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
  '00-188d1f0b9756fa41a17b8671f1e5ca89-54c7792a6cb5394e-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
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
  '00-68685fc1a8e5ac469eba56c0d444fb73-06c59fd6050ca543-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:40 GMT'
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
  '00-7dfffa416304274aac7afd7ccdb23ddb-4acedda039e3494b-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:41 GMT'
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
  '00-320b69fabd5e1b43acf9729b0ddcb49d-c3a1e6ce560af244-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:41 GMT'
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
  '00-08757e58d2601a49a0af429693c4abe6-d943ca4d3c90cb47-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:41 GMT'
]);
