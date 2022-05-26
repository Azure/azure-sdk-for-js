let nock = require('nock');

module.exports.hash = "8343324f730f7ff00db4ce2a7adbf897";

module.exports.testInfo = {"uniqueName":{"query-digitaltwin-invalid-expression":"digitalTwin165356101271805887"},"newDate":{}}

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
  'ba630e2d-0f46-4efa-b3ed-f2e303791100',
  'x-ms-ests-server',
  '2.1.12794.4 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ag_ChGg-le1JouACmSoSSO0; expires=Sat, 25-Jun-2022 10:30:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCD-K3AX1v2dGQT5NlcBAsveEK-Q5DRD3Ba113pLyvio1nu1KUqV7Z7LJLRu5eVGr2MAEbqKJFuRvRaQvDDUu1G3MPwM-G_5YEuFc5OtBYGu_M0oieJGN3_wsgPneCbnldJvxXPto3vkgClUEuww51DANNuc13lJuzylvG1hmN-YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 26 May 2022 10:30:12 GMT',
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
  '1ffeff9d-6a69-4971-bfb8-2f0876b60e00',
  'x-ms-ests-server',
  '2.1.12821.7 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ar8BUOHM3WVKgS-cN6CdXGY; expires=Sat, 25-Jun-2022 10:30:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrygWevE7TVGNiKjPVuDBdxmpWg5g7pA-rxIZ2_M1jQsifD2qUQe6Cw-jBktp3Ly3VY-4bJptZSrNLxBKFGAfCwI9Vg47BoV6hvgO0haUoFlpQBLb71W87cCD6IyzkeQ9XEy9pR21zH5T-ddaWuI9RQUM9vxjSrrGL2aK0Vft5zmsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 26 May 2022 10:30:12 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b5dbbc91-a971-419d-ad67-594b26e550c9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '75c612c7-9ca8-4744-9f01-f375e9730c00',
  'x-ms-ests-server',
  '2.1.12821.7 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnPzybLH24VNqNIdW6OBctY; expires=Sat, 25-Jun-2022 10:30:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 26 May 2022 10:30:13 GMT',
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
  '00-5b62a48e3b3ce140aa37fad70911e5c6-2b6cf669e7bdca43-01',
  'mise-correlation-id',
  '32f55242-e97b-4361-bd5b-ed3f55fcbd8b',
  'Date',
  'Thu, 26 May 2022 10:30:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en-US":"Building"},"decommissioned":false,"uploadTime":"2022-05-26T10:30:14.0659622+00:00"}], [
  'Content-Length',
  '164',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-f7c3b709c112c948b3da3bec0f3b78df-8fc4df3ad066a347-01',
  'mise-correlation-id',
  '7642723b-9aec-48b9-bf90-62894ad85c03',
  'Date',
  'Thu, 26 May 2022 10:30:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/query', {"query":"SELECT * FROM digitaltwins"})
  .query(true)
  .reply(200, {"value":[{"$dtId":"DTRelationshipTestsBuildingTwin","$etag":"W/\"12946f80-69c8-4664-b77e-7e660be69451\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:RelationshipTestBuilding;1","$lastUpdateTime":"2022-05-26T07:29:49.0148437Z","AverageTemperature":{"lastUpdateTime":"2022-05-26T07:29:49.0148437Z"}}},{"$dtId":"DTRelationshipTestsFloorTwin","$etag":"W/\"e7831207-c390-40d4-b324-02c496924f2e\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:RelationshipTestFloor;1","$lastUpdateTime":"2022-05-26T07:29:49.0719840Z","AverageTemperature":{"lastUpdateTime":"2022-05-26T07:29:49.0719840Z"}}},{"$dtId":"DTRelationshipTestsRoomTwin","$etag":"W/\"50855aa4-faf2-4099-b991-e36cbcdf5b28\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:RelationshipTestRoom;1","$lastUpdateTime":"2022-05-26T07:29:49.1319533Z","Temperature":{"lastUpdateTime":"2022-05-26T07:29:49.1319533Z"},"IsOccupied":{"lastUpdateTime":"2022-05-26T07:29:49.1319533Z"}}},{"$dtId":"digitalTwin165356100657804988","$etag":"W/\"4c668c6b-b56e-4810-8c31-2da801706de0\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-05-26T10:30:08.5522803Z","AverageTemperature":{"lastUpdateTime":"2022-05-26T10:30:08.5522803Z"},"TemperatureUnit":{"lastUpdateTime":"2022-05-26T10:30:08.5522803Z"}}}],"continuationToken":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0cff943146212d499cd5f7ee8ff14ee4-d00432556c666547-01',
  'mise-correlation-id',
  'bd287779-4768-446b-a67d-c335119bb414',
  'query-charge',
  '3.09',
  'Date',
  'Thu, 26 May 2022 10:30:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-0f26cf1808dceb41abbf78f2157b940f-9803f22bf14d944f-01',
  'Date',
  'Thu, 26 May 2022 10:30:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/query', {"query":"foo"})
  .query(true)
  .reply(400, {"error":{"code":"SqlQueryError","message":"SQL query parse failed: SQL Parser Error, Line=1, Position=0, Message=missing SELECT at 'foo' See samples in https://aka.ms/adtv2query for the correct syntax."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-9d0788d9e24ed1498121482b443c3335-fb30c3b752f41649-01',
  'mise-correlation-id',
  'c5548d27-8e0a-4a3a-b6a8-071faff982f4',
  'Date',
  'Thu, 26 May 2022 10:30:14 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165356101271805887')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin165356101271805887. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-da97e6074e94bc459798d4694e0e718f-568e928a5b429547-01',
  'Date',
  'Thu, 26 May 2022 10:30:14 GMT'
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
  '00-2418028948849141903f5d9469994741-102a65fd4bdc4f40-01',
  'mise-correlation-id',
  'e8cc5916-bfff-4144-b53e-d17abc7ef171',
  'Date',
  'Thu, 26 May 2022 10:30:15 GMT'
]);
