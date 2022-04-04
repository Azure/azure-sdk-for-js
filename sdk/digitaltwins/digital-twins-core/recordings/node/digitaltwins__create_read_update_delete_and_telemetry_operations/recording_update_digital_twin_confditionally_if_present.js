let nock = require('nock');

module.exports.hash = "18ea8308c0a2bf1b623d2c83288f059a";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-conditionally-if-present":"digitalTwin164874834799101681"},"newDate":{}}

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
  'bffa6d48-8b5d-42e7-9829-3ee35e147200',
  'x-ms-ests-server',
  '2.1.12570.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap_KPVo9XtBIhmmoVgYaX00; expires=Sat, 30-Apr-2022 17:39:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEHMh9wPhSAlUBurp3qzTmZm8-FWqWR6GbDjXeZUqkEY3kgvbuV-J0dD5IEv2K11XfKrAHjN-zuGm7ElrANuav03WH1XdqrCFt_7yChQYGjGNkrelgORBKl7gVBLR6zm2A9D3eO2naXtltCSGQyr56KqaqG4kv9pibKNEAFhKIS4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT',
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
  '6a91002b-08d3-4748-a2f8-79abf9fd1700',
  'x-ms-ests-server',
  '2.1.12570.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuO1r_MQdGFIrTkZqKnM_bU; expires=Sat, 30-Apr-2022 17:39:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrC_4I_liCIB-R6xVLDNKBVwdPuQdwlEztv35KtmPtNHgQMaVp0VqE5F_xtSCcMW2-2MNox3l4enVlZI3Tp3ZFGn8GuP1dymYPl0ZdfkaH2Tmt70hBfGcSP2WnhtbM9TtdPh_3pc9a1y1v9oUtV2BWIInk_knTfiCHkCIwGtMQ3N4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d5da9775-40a0-4730-a91d-065cd091d5d0&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a264ad0e-f0e2-4de7-97c6-08a2ece22000',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgnedO1duMVMkpbbLbZJKpU; expires=Sat, 30-Apr-2022 17:39:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT',
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
  '00-961cdd50d9d98144a4162e8005b521f1-c2f645fda87c834c-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:08.9798406+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-1eccc40d3a72bf41a63d084a37ba2fc2-479449b8b4b5774e-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin164874834799101681')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin164874834799101681. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-ffffe18b1443a845ad3ceafe980a41cc-62c54d1779236843-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin164874834799101681', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin164874834799101681","$etag":"W/\"c0d55915-9dd1-4e62-b6c2-0ea06333abf1\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:09.1965470Z"}}}, [
  'Content-Length',
  '244',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"c0d55915-9dd1-4e62-b6c2-0ea06333abf1"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-4cbbe3a8ecaaf147a2457d3bec255b0f-f87b31d2c5038a41-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin164874834799101681', [{"op":"replace","path":"/AverageTemperature","value":42}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"540f503f-aa2d-4739-9fb2-af1159dc3185"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-9c3f77a9e4f9b34fb48bf15fa55ac413-8720abfafdb6e446-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/digitalTwin164874834799101681')
  .query(true)
  .reply(200, {"$dtId":"digitalTwin164874834799101681","$etag":"W/\"540f503f-aa2d-4739-9fb2-af1159dc3185\"","AverageTemperature":42,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","AverageTemperature":{"lastUpdateTime":"2022-03-31T17:39:09.3079688Z"}}}, [
  'Content-Length',
  '244',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"540f503f-aa2d-4739-9fb2-af1159dc3185"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-2a82574345276f4a9fa4c922a4233778-cfa69b452cb71743-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin164874834799101681')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-3deb5c3572adbe4b94e23cd159885127-879eb83e6ceee848-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT'
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
  '00-a1d659515f0adb4095da364aadc42f82-6637d89b3479f041-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:08 GMT'
]);
