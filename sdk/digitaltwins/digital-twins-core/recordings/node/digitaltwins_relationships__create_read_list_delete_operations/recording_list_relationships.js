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
  'ee76d347-a330-4b3a-b314-ab88933fff00',
  'x-ms-ests-server',
  '2.1.12570.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkSgU16irzlGogAGIACO0cM; expires=Sat, 30-Apr-2022 17:40:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevren_x3dtyHm6hIRNvY7jYJBCJuHpqZKFpvmg0unEz5neB4mHLPHY-PW6_4FTbaGBLpoRsLoAPzUfy_bUqi5RTUzBZk4q-pcK2w5NzLZopMRvCTYDgvDPsEC0s4VrjfEnm_R7Unnf3L8a1NjglSl0Pv9xc_hPMfBt70xU0_3phACIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:40:16 GMT',
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
  'd9711851-364a-465d-9b47-e4f4aa182200',
  'x-ms-ests-server',
  '2.1.12570.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkdrIGiNT45Ol9-PCbNk89c; expires=Sat, 30-Apr-2022 17:40:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFDRLoz0hBmzYNhrg9FC-71WRtr57Iqzp9GJ26g3c9ijhdBpl2cEmpU1soq6_OAqXB-Um92KjsER1XsJtwbh68LkWEmBS0KUorHRKSraM5QNDo0VC23wsCTi3EMnSldbWhoQCUVgbZ7iBmM9NUm20SsrGKrdTBMliZK1L8wDSaiQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:40:16 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4997c70a-76f0-4db9-a23a-89c6e6240d98&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6a91002b-08d3-4748-a2f8-79abf30a1800',
  'x-ms-ests-server',
  '2.1.12570.16 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArnRQk2_M4FMqDXT1n3pZS0; expires=Sat, 30-Apr-2022 17:40:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:40:16 GMT',
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
  '00-8ec0b3b27398fd4c83d0c19f638ee0e4-27f724c7e8572045-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:16 GMT'
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
  '00-65376e3e721a6d409e6bf16025eb0b34-c8393b0919112142-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
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
  '00-07d1ce85baab67449eaf4cb364e7db4b-b008c5d5f3c5d549-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTRelationshipsTestsBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Relationship","name":"has","target":"dtmi:samples:DTRelationshipsTestsFloor;1","properties":[{"@type":"Property","name":"isAccessRestricted","schema":"boolean"}]},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsFloor;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Floor","contents":[{"@type":"Relationship","name":"contains","target":"dtmi:samples:DTRelationshipsTestsRoom;1"},{"@type":"Property","name":"AverageTemperature","schema":"double"}]},{"@id":"dtmi:samples:DTRelationshipsTestsRoom;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Room","contents":[{"@type":"Property","name":"Temperature","schema":"double"},{"@type":"Property","name":"IsOccupied","schema":"boolean"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTRelationshipsTestsBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-03-31T17:40:17.8753034+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsFloor;1","description":{},"displayName":{"en":"Floor"},"decommissioned":false,"uploadTime":"2022-03-31T17:40:17.8753292+00:00"},{"id":"dtmi:samples:DTRelationshipsTestsRoom;1","description":{},"displayName":{"en":"Room"},"decommissioned":false,"uploadTime":"2022-03-31T17:40:17.8753456+00:00"}], [
  'Content-Length',
  '509',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-238185e579e62e44acea486361b17f2b-eec88acadd37294b-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
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
  '00-a30aa29f07d4194aa85043879a711664-2968e06cd54cef47-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
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
  '00-cd6f1f7cd786be4d9fad48debbccfa93-4fba06a70f113244-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
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
  '00-bc0060274ddb4044a48f9c4f6c2af9d3-66ee015d265bd349-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsBuildingTwin","$etag":"W/\"bbed520f-e1f8-4e1e-a7bf-760ba07d5b4e\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:40:18.3215710Z"}}}, [
  'Content-Length',
  '261',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"bbed520f-e1f8-4e1e-a7bf-760ba07d5b4e"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6258141c1256244081a1a127ee4c770d-4caa550f7c74bc45-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsFloorTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1"},"AverageTemperature":75})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsFloorTwin","$etag":"W/\"14a80b6c-09c0-4e7a-b751-5e27914c7c86\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsFloor;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:40:18.4361655Z"}}}, [
  'Content-Length',
  '255',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"14a80b6c-09c0-4e7a-b751-5e27914c7c86"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-9c7fa007953940449be4b355a9ded6ad-0378756f74e22f4d-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsRoomTwin', {"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1"},"Temperature":80,"IsOccupied":true})
  .query(true)
  .reply(200, {"$dtId":"DTRelationshipsTestsRoomTwin","$etag":"W/\"9a1a3275-1da4-4595-8b98-d85f9a54e35c\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:DTRelationshipsTestsRoom;1","Temperature":{"lastUpdateTime":"2022-03-31T17:40:18.5478253Z"},"IsOccupied":{"lastUpdateTime":"2022-03-31T17:40:18.5478253Z"}}}, [
  'Content-Length',
  '320',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"9a1a3275-1da4-4595-8b98-d85f9a54e35c"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-1bd4eac1519ac949a057f252486682da-3b9fdf98159d534e-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTRelationshipsTestsBuildingTwin/relationships/BuildingHasFloor', {"$relationshipId":"BuildingHasFloor","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false})
  .query(true)
  .reply(200, {"$relationshipId":"BuildingHasFloor","$etag":"W/\"707163cc-bf8d-4c11-81a2-7c9a36bb9ba2\"","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false}, [
  'Content-Length',
  '235',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"707163cc-bf8d-4c11-81a2-7c9a36bb9ba2"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-6748a42f384ed24b8435063f0da59cdc-9049abd0f683334c-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTRelationshipsTestsBuildingTwin/relationships')
  .query(true)
  .reply(200, {"nextLink":null,"value":[{"$relationshipId":"BuildingHasFloor","$etag":"W/\"707163cc-bf8d-4c11-81a2-7c9a36bb9ba2\"","$sourceId":"DTRelationshipsTestsBuildingTwin","$relationshipName":"has","$targetId":"DTRelationshipsTestsFloorTwin","isAccessRestricted":false}]}, [
  'Content-Length',
  '263',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-125e6d0c62e1df4abdf77c0711c76bc9-3a8f17c84702c842-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
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
  '00-16f347f6c678604c9ea7818464dbe348-6af93949d5e96f4d-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
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
  '00-fd143499f0137e4a81553bca363a85a2-8462514a0ceff548-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
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
  '00-2976c81cf4c02c48970e84ecd0e7ca0f-8b4269a2187c094a-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
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
  '00-6284705311fc7a468b6829011545160f-cfdad167f15c3b4c-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
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
  '00-d323534b829f074680cdb9f422ececd2-871bb5338c28ad45-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
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
  '00-3280f25c2169964ab336fbb3e9aac58a-e0c3f0ea70f31f4f-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
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
  '00-05dfcda0d243ed40b0b25ca3a6c820bf-150cebbe27292648-01',
  'Date',
  'Thu, 31 Mar 2022 17:40:18 GMT'
]);
