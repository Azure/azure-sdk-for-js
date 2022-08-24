let nock = require('nock');

module.exports.hash = "683ac1974266cbbe254656fe8985c6b7";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-replace":"digitalTwin165644216905001184"},"newDate":{}}

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
  '8b3684fd-572c-4e63-9a84-435e2f209c01',
  'x-ms-ests-server',
  '2.1.13006.6 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtCrt_Q7kvlBo49ptI9esYA; expires=Thu, 28-Jul-2022 18:49:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtJg5u45EW2k6kZBkE0lL7WEDpgMqapQLtDY6ynhInUyDbujnlBGebML7bPe0Vt_8sgTuGwQjPvaAKFVhO3vwH62ZZH4FJx1nPdaexo6eaVm7byBne2z_AVi-gSB5_QdAvM8aNNkkJVh3TVtU61wzEgeZdg4qPE1_5zbxsqjYGw0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:28 GMT',
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
  'd09d67eb-2904-4965-9deb-9a39e23a5901',
  'x-ms-ests-server',
  '2.1.13006.6 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlV5P8clTclHj8GkMjeaYRw; expires=Thu, 28-Jul-2022 18:49:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrL7ShgB4PAEiFn_x2cKtfkKIzajmTAEucw598psJVL2ksRVUCkIYB256hbxN5UccoAwvZYQdNSceNWAZmM0D23lX_CHIv1sHOUTYb5go2noQrgw16Xj9VccHBCIxjLESGMNdCK0rib90RM5lRlm6UHBfrEC-mSpJ6jTXjHFo6doogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8396a90a-9549-461f-9bf1-97df407ceb61&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd09d67eb-2904-4965-9deb-9a39e53a5901',
  'x-ms-ests-server',
  '2.1.13006.6 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aq0cEZnoqKVIguT437sKElo; expires=Thu, 28-Jul-2022 18:49:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:28 GMT',
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
  '00-4fabcbaa94286ecbab240c48f3f2265a-1e4c97f97e5c88c8-01',
  'mise-correlation-id',
  'dee402d1-4c92-4371-803e-18ad922e189b',
  'Date',
  'Tue, 28 Jun 2022 18:49:28 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:29.3428673+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-da553c819050ca937aa4488f4f47eed0-10fed8a496383816-01',
  'mise-correlation-id',
  '408be7c4-ae32-4797-8d61-4aaf393afef2',
  'Date',
  'Tue, 28 Jun 2022 18:49:28 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644216905001184')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin165644216905001184. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-cd7f4af8e481924aa2e4de222b12b0fc-e80d558d037cea43-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:29 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin165644216905001184', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68,"TemperatureUnit":"Celsius"})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644216905001184","$etag":"W/\"b3ab9d5f-34ae-420f-b2fd-c4d08b25dcc0\"","AverageTemperature":68,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:29.5265415Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:29.5265415Z"},"TemperatureUnit":{"lastUpdateTime":"2022-06-28T18:49:29.5265415Z"}}}, [
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"b3ab9d5f-34ae-420f-b2fd-c4d08b25dcc0"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-fb7f96fbd0196043bff59fe50a9c2fba-d139bffc1b0aff49-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:29 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin165644216905001184', [{"op":"replace","path":"/AverageTemperature","value":42}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"c23d9941-ac16-4749-bb98-5c283061d69a"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0dce5e9ce86f134f88743c4f61be02c1-692949a692980b44-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:29 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/digitalTwin165644216905001184')
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644216905001184","$etag":"W/\"c23d9941-ac16-4749-bb98-5c283061d69a\"","AverageTemperature":42,"TemperatureUnit":"Celsius","$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:29.6054864Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:29.6054864Z"},"TemperatureUnit":{"lastUpdateTime":"2022-06-28T18:49:29.5265415Z"}}}, [
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"c23d9941-ac16-4749-bb98-5c283061d69a"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-61a9cc34e01ff9488ab5f6f065f8ad7d-56aa8a72ad27f840-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:29 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644216905001184')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-d605c3b430cde9469abe547580b16048-be45a22307bc2942-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:29 GMT'
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
  '00-f973b54daafc44fd36ce6f81aee5012b-fc8e5c9a9d1ea388-01',
  'mise-correlation-id',
  '5b972140-aa69-4d4b-94c0-96507aa38b21',
  'Date',
  'Tue, 28 Jun 2022 18:49:29 GMT'
]);
