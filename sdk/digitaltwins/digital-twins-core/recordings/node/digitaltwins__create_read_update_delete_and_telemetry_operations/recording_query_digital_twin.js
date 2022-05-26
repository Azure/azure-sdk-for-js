let nock = require('nock');

module.exports.hash = "0d7f5a1f79f8cd2713258b723a8d9b67";

module.exports.testInfo = {"uniqueName":{"query-digitaltwin":"digitalTwin165356100657804988"},"newDate":{}}

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
  '32c8f58e-0acd-4dc9-a81d-598ebf951300',
  'x-ms-ests-server',
  '2.1.12794.4 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Avw9AzKeUK5OkpCvEO25c90; expires=Sat, 25-Jun-2022 10:30:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDoVFWzALaKHJ18wv5jXi7O2VBQJvSbIssYyHw3PwyY1DmdhMqhWsKAIRzF55Id80W2spDpSj59ePQ12x-Upj2-tlIWBpWzVGR5vSNlY4BfB_-EsjgI2xcTLa0Ru5SZpobWlhXeK9rqECmRxY85JcU6wG6W6VDA7mpTx-x85ynD0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 26 May 2022 10:30:06 GMT',
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
  '24bfd301-11ea-400f-bc75-a33945c90c00',
  'x-ms-ests-server',
  '2.1.12821.7 - EUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ApkvRAC6vK9NlstEaxhUebI; expires=Sat, 25-Jun-2022 10:30:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrD8YWkKHUTM_HOw2DwbB_gkz0oo66xbOg6aIgrfO-NDq-94a8nZ1WwFhksMo_a1I-WQdFa5_Phqp0t6Et2hfo_2u3yWecGlWKZxiiBTO2oDB8a7JOB_VIBoTzUo_r729l87pjVXDat3S-ukaQz_PNcBcdwHgYb--n_M66btl52okgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 26 May 2022 10:30:06 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=dfa2c84f-2381-491d-884b-04c69fcc459b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'e6abc992-3344-4ba2-8d50-405def310e00',
  'x-ms-ests-server',
  '2.1.12821.7 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtCd4wf2z9VOtfD5Q8mLQSs; expires=Sat, 25-Jun-2022 10:30:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 26 May 2022 10:30:06 GMT',
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
  '00-1fbe1a2b48b8fe42b5ca3091cf1dbc46-933e5b48480a2444-01',
  'mise-correlation-id',
  '12c487ab-20cd-4b49-958c-628815fc402a',
  'Date',
  'Thu, 26 May 2022 10:30:07 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en-US":"Building"},"decommissioned":false,"uploadTime":"2022-05-26T10:30:07.9703153+00:00"}], [
  'Content-Length',
  '164',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a344beb521f2ac41a30da23dffb42d66-7d2f9d701d3ccb41-01',
  'mise-correlation-id',
  'b3ec6d12-73b9-4d40-86fb-d73602b36d9a',
  'Date',
  'Thu, 26 May 2022 10:30:07 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/query', {"query":"SELECT * FROM digitaltwins"})
  .query(true)
  .reply(200, {"value":[{"$dtId":"DTRelationshipTestsBuildingTwin","$etag":"W/\"12946f80-69c8-4664-b77e-7e660be69451\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:RelationshipTestBuilding;1","$lastUpdateTime":"2022-05-26T07:29:49.0148437Z","AverageTemperature":{"lastUpdateTime":"2022-05-26T07:29:49.0148437Z"}}},{"$dtId":"DTRelationshipTestsFloorTwin","$etag":"W/\"e7831207-c390-40d4-b324-02c496924f2e\"","AverageTemperature":75,"$metadata":{"$model":"dtmi:samples:RelationshipTestFloor;1","$lastUpdateTime":"2022-05-26T07:29:49.0719840Z","AverageTemperature":{"lastUpdateTime":"2022-05-26T07:29:49.0719840Z"}}},{"$dtId":"DTRelationshipTestsRoomTwin","$etag":"W/\"50855aa4-faf2-4099-b991-e36cbcdf5b28\"","Temperature":80,"IsOccupied":true,"$metadata":{"$model":"dtmi:samples:RelationshipTestRoom;1","$lastUpdateTime":"2022-05-26T07:29:49.1319533Z","Temperature":{"lastUpdateTime":"2022-05-26T07:29:49.1319533Z"},"IsOccupied":{"lastUpdateTime":"2022-05-26T07:29:49.1319533Z"}}}],"continuationToken":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-2c858ad52c15b74584792809ac93493a-fd97a3bf3f028e40-01',
  'mise-correlation-id',
  '3baf2a24-4d1b-40e5-800e-f83266fa7677',
  'query-charge',
  '3.01',
  'Date',
  'Thu, 26 May 2022 10:30:07 GMT'
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
  '00-a72c2bfc1fed534b870c4884ee3e71e2-53878cd243e82d42-01',
  'Date',
  'Thu, 26 May 2022 10:30:08 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin165356100657804988', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68,"TemperatureUnit":"Celsius"})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165356100657804988","$etag":"W/\"4c668c6b-b56e-4810-8c31-2da801706de0\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-05-26T10:30:08.5522803Z","AverageTemperature":{"lastUpdateTime":"2022-05-26T10:30:08.5522803Z"},"TemperatureUnit":{"lastUpdateTime":"2022-05-26T10:30:08.5522803Z"}}}, [
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"4c668c6b-b56e-4810-8c31-2da801706de0"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a3b626c1175f5e4da6d98d53fd19f48e-e6fde920c13d2944-01',
  'Date',
  'Thu, 26 May 2022 10:30:08 GMT'
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
  '00-8edd7771038fb14f832db21e03150e15-9a9c22d43516ad4d-01',
  'mise-correlation-id',
  'e0d0674c-7e63-428e-b60a-98e1e6b314c4',
  'query-charge',
  '3.09',
  'Date',
  'Thu, 26 May 2022 10:30:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165356100657804988')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-7e6bc7b66baaba448e19622440f2fafb-2c34690e9184de44-01',
  'Date',
  'Thu, 26 May 2022 10:30:13 GMT'
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
  '00-5cd8b89aabf83e4cbbd25561828016c7-bf0fbeadbe038d44-01',
  'mise-correlation-id',
  '57649dae-e7f7-4df0-a682-4ab6f917c7af',
  'Date',
  'Thu, 26 May 2022 10:30:13 GMT'
]);
