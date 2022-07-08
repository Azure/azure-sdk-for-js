let nock = require('nock');

module.exports.hash = "18ea8308c0a2bf1b623d2c83288f059a";

module.exports.testInfo = {"uniqueName":{"update-digitaltwin-conditionally-if-present":"digitalTwin165644217340708295"},"newDate":{}}

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
  '0ee029aa-9b3d-42f4-b3f4-bcfc7ff43f01',
  'x-ms-ests-server',
  '2.1.13006.6 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AujroDkQF7xBoBa-RRSRQvo; expires=Thu, 28-Jul-2022 18:49:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrnr0U43OEtTMPZKmA7CmBvuv-j24NkgPIorB7eec9krMB1KABBg3efSmtXtVpLN8zuF5wn5KacB1_GDfevYP9r9Httx4WGuFUmn5wPIxfOxqCZtZpdi7iDW4YZLiPZQBNW9wCAVHCHwzb0gT55PKR3bXReGYoAvHiR6Q6oBZ0tVUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:32 GMT',
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
  'd09d67eb-2904-4965-9deb-9a39cd3b5901',
  'x-ms-ests-server',
  '2.1.13006.6 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjRnq4oDlI5KnAcAHEYQl8Q; expires=Thu, 28-Jul-2022 18:49:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWa9SsBfSWEIQJ5BMGfBOq1mQgSOxlGRMCB5BhKDsKNW4bYAwJZbAgrs3zVImyfiQ7NCQ456SZiWuGH2veUsfPoUKdm4O4qehS2uQ9aT1VdobhiQRByOEh46NTROM1d85wNpBWslvt17SP3FiCieWTn3U0la4LBlW443ap09UksIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:32 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1b3d7827-a1f9-4e84-af18-c75818fc5543&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '25a345c1-ac2a-401a-8145-c0afe2549d01',
  'x-ms-ests-server',
  '2.1.13006.6 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AocmPAVsgHNCuwNSEhkQgqkuuutMAQAAAD1ETdoOAAAA; expires=Thu, 28-Jul-2022 18:49:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:32 GMT',
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
  '00-babea5cebb572c00e0963e44b61fe1fc-59c483c515e4efde-01',
  'mise-correlation-id',
  'be2e1dc2-578c-47c3-80b4-acbb00432ea9',
  'Date',
  'Tue, 28 Jun 2022 18:49:33 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTTestBuilding;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Building","contents":[{"@type":"Property","name":"AverageTemperature","schema":"double"},{"@type":"Property","name":"TemperatureUnit","schema":"string"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:33.7393799+00:00"}], [
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-33ed7afa459e4251b21d0e2387d5565d-4dee200b952ca8d9-01',
  'mise-correlation-id',
  'c8812c3f-0e44-4bdc-917b-7508f5d2dac6',
  'Date',
  'Tue, 28 Jun 2022 18:49:33 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644217340708295')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID digitalTwin165644217340708295. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '283',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-98ad92de74b8934a984bc11b353b0efe-e45f24c707dd7843-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:33 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/digitalTwin165644217340708295', {"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1"},"AverageTemperature":68})
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644217340708295","$etag":"W/\"6e0dabd9-a1a2-4596-a784-24e6a715154b\"","AverageTemperature":68,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:33.9075124Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:33.9075124Z"}}}, [
  'Content-Length',
  '293',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"6e0dabd9-a1a2-4596-a784-24e6a715154b"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-42cbbc17dd134e42908d541573216659-7b0fc8ce2e0a3349-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:33 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/digitalTwin165644217340708295', [{"op":"replace","path":"/AverageTemperature","value":42}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"0c193767-6a9b-41c3-9df5-e0d7eeed1b19"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a5015c0c8d672546a7e01fe06fd40b30-0afc6bbc3f7b334b-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:33 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/digitalTwin165644217340708295')
  .query(true)
  .reply(200, {"$dtId":"digitalTwin165644217340708295","$etag":"W/\"0c193767-6a9b-41c3-9df5-e0d7eeed1b19\"","AverageTemperature":42,"$metadata":{"$model":"dtmi:samples:DTTestBuilding;1","$lastUpdateTime":"2022-06-28T18:49:33.9896317Z","AverageTemperature":{"lastUpdateTime":"2022-06-28T18:49:33.9896317Z"}}}, [
  'Content-Length',
  '293',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"0c193767-6a9b-41c3-9df5-e0d7eeed1b19"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b5731bd48033764fa361418a962360d2-6866612de44b1e4c-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:33 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/digitalTwin165644217340708295')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-34dd2c7beaef3d43ac4be3257e0960cc-a70fe3739a56004d-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:33 GMT'
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
  '00-87cfbd7a7c9b1afe683d541d809cf54e-df1ec5a17613bb11-01',
  'mise-correlation-id',
  '4703eb9b-5c34-43de-90f6-12e690c7bf8c',
  'Date',
  'Tue, 28 Jun 2022 18:49:33 GMT'
]);
