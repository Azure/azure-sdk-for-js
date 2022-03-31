let nock = require('nock');

module.exports.hash = "0d7f5a1f79f8cd2713258b723a8d9b67";

module.exports.testInfo = {"uniqueName":{"query-digitaltwin":"digitalTwin164874835111009284"},"newDate":{}}

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
  'f6e1b366-6d5a-431d-a460-23b92316e400',
  'x-ms-ests-server',
  '2.1.12570.11 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvGlnAHUVbJGkp81N9wJlwQ; expires=Sat, 30-Apr-2022 17:39:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryuVesavCLFCMtQS28GDugAlntFvmCtlOzCX_hHsmSNAQCOvu94f5JAM2aDuuu1OwSFIkbz0lZNo2wFDdUxa4o90t1w0SIWRwnwlzY1oszQb_78l_1aNPkPYoF9_EYF8POtRLziFV8C8tKVfgjB9lghRh3PTRAf2s7M91P6YEH5QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:11 GMT',
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
  'a264ad0e-f0e2-4de7-97c6-08a257e32000',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkS1YIWqVdJIqy5ble8KnLg; expires=Sat, 30-Apr-2022 17:39:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFXutlteD5DQgj1emqD1Wq4-Hnj3T4x8RI-7uq-QUfmmpfJc963J94xk4aGL-vSJ-WuGNv0bzR1YKU39lcwCuAKL2AX-AalwvM_qFjGJXVvWF1FMGfyHi_rHIDwmgFb0UUate2qO3wcAaVDV5fcObC1toyD9uWMvjyZ6eNSsiUjQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a7217c83-f6b6-43d6-8d7b-342cf9dc7647&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1452bfdd-fe75-4f62-b2bb-4b574a6d2300',
  'x-ms-ests-server',
  '2.1.12570.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhEhmPnlCMFFua-b3Ylr8rs; expires=Sat, 30-Apr-2022 17:39:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:11 GMT',
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
  '00-2785d2bd0205d4489fa2ecc1fc30551a-f121a9c43a51b248-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:11 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:12.1076734+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-388478030d70c64087ae1e13540f1f8a-085391263fbc8c46-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:12 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/query', {"query":"SELECT * FROM digitaltwins"})
  .query(true)
  .reply(200, {"value":[{"$dtId":"DTRelationshipTestsBuildingTwin","$etag":"W/\"762d275a-ebde-4c65-bd1d-bb339c4f64af\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:RelationshipTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-28T16:38:57.3243909Z"}}},{"$dtId":"digitalTwin-1c1020c1","$etag":"W/\"9d7b5911-3d31-4483-be26-30bdcea71e97\"","AverageTemperature":42,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-28T16:36:11.7080380Z"},"TemperatureUnit":{"lastUpdateTime":"2022-03-28T16:36:11.5773633Z"}}},{"$dtId":"digitalTwin-ef31948","$etag":"W/\"ee961917-8883-4ce8-803f-a76157733567\"","TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","TemperatureUnit":{"lastUpdateTime":"2022-03-28T16:36:17.0626857Z"}}},{"$dtId":"digitalTwin-edc149c","$etag":"W/\"f1f89fe4-8498-49ae-ae1f-87d05cb3c87a\"","AverageTemperature":42,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-28T16:35:49.2845485Z"},"TemperatureUnit":{"lastUpdateTime":"2022-03-28T16:35:49.1553839Z"}}},{"$dtId":"DTRelationshipTestsFloorTwin","$etag":"W/\"fb76881b-9254-448c-8529-d16b44cdebb9\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:RelationshipTestFloor;1","AverageTemperature":{"lastUpdateTime":"2022-03-28T16:38:57.4389051Z"}}},{"$dtId":"DTRelationshipTestsRoomTwin","$etag":"W/\"bc398401-16f7-410b-9a5b-a5fe81b6b9df\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:RelationshipTestRoom;1","Temperature":{"lastUpdateTime":"2022-03-28T16:38:57.5565887Z"},"IsOccupied":{"lastUpdateTime":"2022-03-28T16:38:57.5565887Z"}}}],"continuationToken":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-512e281696da7c42bbf7c4eef749850e-5282385965a05441-01',
  'query-charge',
  '3.22',
  'Date',
  'Thu, 31 Mar 2022 17:39:12 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTRelationshipTestsBuildingTwin')
  .query(true)
  .reply(400, {"error":{"code":"RelationshipsNotDeleted","message":"Twin DTRelationshipTestsBuildingTwin has active relationships. Cannot delete a twin unless all the relationships are deleted. Please ensure that the active relationships on the twin are deleted. See section on retrieving relationships https://aka.ms/adtv2twins."}}, [
  'Content-Length',
  '318',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-745ed7eb56fd134fb340c09f80390b89-2210d4cd99032641-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:12 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin164874835111009284', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68,"TemperatureUnit":"Celsius"})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin164874835111009284","$etag":"W/\"f2b66e2e-77b7-4d9d-b1a6-6cf9d40529ad\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:12.7660642Z"},"TemperatureUnit":{"lastUpdateTime":"2022-03-31T17:39:12.7660642Z"}}}, [
  'Content-Length',
  '340',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"f2b66e2e-77b7-4d9d-b1a6-6cf9d40529ad"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-45cd46d3fe83a24889e12a9fd45c1611-a459a478a9bb2647-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:12 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/query', {"query":"SELECT * FROM digitaltwins"})
  .query(true)
  .reply(200, {"value":[{"$dtId":"DTRelationshipTestsBuildingTwin","$etag":"W/\"762d275a-ebde-4c65-bd1d-bb339c4f64af\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:RelationshipTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-28T16:38:57.3243909Z"}}},{"$dtId":"digitalTwin-1c1020c1","$etag":"W/\"9d7b5911-3d31-4483-be26-30bdcea71e97\"","AverageTemperature":42,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-28T16:36:11.7080380Z"},"TemperatureUnit":{"lastUpdateTime":"2022-03-28T16:36:11.5773633Z"}}},{"$dtId":"digitalTwin-ef31948","$etag":"W/\"ee961917-8883-4ce8-803f-a76157733567\"","TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","TemperatureUnit":{"lastUpdateTime":"2022-03-28T16:36:17.0626857Z"}}},{"$dtId":"digitalTwin-edc149c","$etag":"W/\"f1f89fe4-8498-49ae-ae1f-87d05cb3c87a\"","AverageTemperature":42,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-28T16:35:49.2845485Z"},"TemperatureUnit":{"lastUpdateTime":"2022-03-28T16:35:49.1553839Z"}}},{"$dtId":"DTRelationshipTestsFloorTwin","$etag":"W/\"fb76881b-9254-448c-8529-d16b44cdebb9\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:RelationshipTestFloor;1","AverageTemperature":{"lastUpdateTime":"2022-03-28T16:38:57.4389051Z"}}},{"$dtId":"DTRelationshipTestsRoomTwin","$etag":"W/\"bc398401-16f7-410b-9a5b-a5fe81b6b9df\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:RelationshipTestRoom;1","Temperature":{"lastUpdateTime":"2022-03-28T16:38:57.5565887Z"},"IsOccupied":{"lastUpdateTime":"2022-03-28T16:38:57.5565887Z"}}},{"$dtId":"digitalTwin164874835111009284","$etag":"W/\"f2b66e2e-77b7-4d9d-b1a6-6cf9d40529ad\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:12.7660642Z"},"TemperatureUnit":{"lastUpdateTime":"2022-03-31T17:39:12.7660642Z"}}}],"continuationToken":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-9523855182304a41a4395761bf707d83-840a08e37be49b4a-01',
  'query-charge',
  '3.29',
  'Date',
  'Thu, 31 Mar 2022 17:39:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin164874835111009284')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-2ef95b3a7a47124fb1c5ec7c55f0482d-2f9fa1bd2db90744-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:17 GMT'
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
  '00-811ff9b39a913340ac2793bd059dc440-c5fe4100af065846-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:17 GMT'
]);
