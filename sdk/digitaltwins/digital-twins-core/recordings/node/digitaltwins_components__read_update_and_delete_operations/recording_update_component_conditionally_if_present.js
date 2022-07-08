let nock = require('nock');

module.exports.hash = "f62d2d7b4bf0b37cf2dbbc682cbae574";

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
  '62d7648d-1ee4-46dd-8935-0f7235553201',
  'x-ms-ests-server',
  '2.1.13006.6 - EUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aj0ep0GbJjpAo9-QxDGKiPw; expires=Thu, 28-Jul-2022 18:49:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2AzSw8vx55ljeXRoH_PWIwIvJUYx4NvWOZXRhLZyh6BH5Ahq2nSRCxDoVxyRx-KzvuVdyAPLQjXtpfA9M0ocamYlNIAoC2SasLDTSg1EDML4vVyBUCwDX4WaayRKX1ASRDsC0Gk6qRrbrTog8aYMj08up_Zx9TWKz9z6_mqMD1cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:16 GMT',
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
  '8da34a2d-9d85-479d-8818-1987a9ebf900',
  'x-ms-ests-server',
  '2.1.13006.6 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlYA1btYu7ZLnxcM7oRnPIU; expires=Thu, 28-Jul-2022 18:49:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5LFLvtl_GxIBhvpDfFJFR5LvsxEp99r9QUNqY7HfyhjmQSscGoiwXp8p9I1LPxNN_9Xew3GugDWcZBsFNXFVTt9PKh_tyPQr22iVyLGTy-MALhjzqDJbBTBMprTxyv5ghDRCnYyPsQxjya8Kp7pt0wXXHDwvnb3J29UZnndkg1sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:16 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=56c5bc07-f069-4c75-8524-53d7e3002e45&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd898768c-ab8c-4caa-9391-af4935fe3300',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=At_vNo3YW8hFt4s64K9lPVkuuutMAQAAACxETdoOAAAA; expires=Thu, 28-Jul-2022 18:49:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:16 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsModel%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTComponentTestsModel;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '221',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-23c8978de2e8c7d0f81c04a9cd8228c6-e9a6dffd3ef3df1d-01',
  'mise-correlation-id',
  'da6c43fc-6e63-48de-91a0-858f96ea5e5c',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsComponent%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTComponentTestsComponent;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '225',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-086362ae7e589a813f64188b68f7cc91-18a6a18355da43da-01',
  'mise-correlation-id',
  '9ccef740-8c81-4db6-a4fb-a978270c223f',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTComponentTestsComponent;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Component1","contents":[{"@type":"Property","name":"ComponentProp1","schema":"string"},{"@type":"Telemetry","name":"ComponentTelemetry1","schema":"integer"}]},{"@id":"dtmi:samples:DTComponentTestsModel;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"TempModel","contents":[{"@type":"Property","name":"Prop1","schema":"string"},{"@type":"Component","name":"Component1","schema":"dtmi:samples:DTComponentTestsComponent;1"},{"@type":"Telemetry","name":"Telemetry1","schema":"integer"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTComponentTestsComponent;1","description":{},"displayName":{"en":"Component1"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:17.3257789+00:00"},{"id":"dtmi:samples:DTComponentTestsModel;1","description":{},"displayName":{"en":"TempModel"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:17.3258039+00:00"}], [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-3de2ac8b289c95c32c9e817e4ef13d7a-4af979b737150853-01',
  'mise-correlation-id',
  '95fea916-2053-4a56-a94e-417d25d2c2b9',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTComponentTestsTempTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins https://aka.ms/adtv2query."}}, [
  'Content-Length',
  '278',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-e798d442f13bff4f925a780ca3abef45-68071e65feb0b945-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTComponentTestsTempTwin', {"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1"},"Prop1":"value","Component1":{"$metadata":{},"ComponentProp1":"value1"}})
  .query(true)
  .reply(200, {"$dtId":"DTComponentTestsTempTwin","$etag":"W/\"0b13ae4a-31f2-42ab-a461-9672c844e8a9\"","Prop1":"value","Component1":{"ComponentProp1":"value1","$metadata":{"$lastUpdateTime":"2022-06-28T18:49:17.4778430Z","ComponentProp1":{"lastUpdateTime":"2022-06-28T18:49:17.4778430Z"}}},"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1","$lastUpdateTime":"2022-06-28T18:49:17.4778430Z","Prop1":{"lastUpdateTime":"2022-06-28T18:49:17.4778430Z"}}}, [
  'Content-Length',
  '445',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"0b13ae4a-31f2-42ab-a461-9672c844e8a9"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-01bdf2fc5c648d49b3801b90b1013854-a57ef955c46b9b49-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(200, {"$dtId":"DTComponentTestsTempTwin","$etag":"W/\"0b13ae4a-31f2-42ab-a461-9672c844e8a9\"","Prop1":"value","Component1":{"ComponentProp1":"value1","$metadata":{"$lastUpdateTime":"2022-06-28T18:49:17.4778430Z","ComponentProp1":{"lastUpdateTime":"2022-06-28T18:49:17.4778430Z"}}},"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1","$lastUpdateTime":"2022-06-28T18:49:17.4778430Z","Prop1":{"lastUpdateTime":"2022-06-28T18:49:17.4778430Z"}}}, [
  'Content-Length',
  '445',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"0b13ae4a-31f2-42ab-a461-9672c844e8a9"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-4b7d43297056514798487119691607fb-ea64792330d5a64d-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/DTComponentTestsTempTwin/components/Component1', [{"op":"replace","path":"/ComponentProp1","value":"value2"}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"10efed35-3c0a-4b8b-b37f-1bfa6eac5536"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-eaf175cba611444f8eeb1467e3af7258-30bf12cc3cdc3f4f-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTComponentTestsTempTwin/components/Component1')
  .query(true)
  .reply(200, {"ComponentProp1":"value2","$metadata":{"$lastUpdateTime":"2022-06-28T18:49:17.6229542Z","ComponentProp1":{"lastUpdateTime":"2022-06-28T18:49:17.6229542Z"}}}, [
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"10efed35-3c0a-4b8b-b37f-1bfa6eac5536"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-aaa9bc2c2a26cc4daeb2af4dbc86743a-3c69cee3b5694443-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-25496938b1411540ab0fb75913e19384-938708a09756c845-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsModel%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a140f7e5e263cd37e3e4e4c48af01e5c-f963904f4d88e34e-01',
  'mise-correlation-id',
  'd44549c3-db98-4973-a8a8-b4c3af0ffd91',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsComponent%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-1a177a81a71ac3f8b65d80072aca3f91-339cee19eb5d4f92-01',
  'mise-correlation-id',
  'f5e92afb-093d-49a3-aea0-0918434cf14b',
  'Date',
  'Tue, 28 Jun 2022 18:49:17 GMT'
]);
