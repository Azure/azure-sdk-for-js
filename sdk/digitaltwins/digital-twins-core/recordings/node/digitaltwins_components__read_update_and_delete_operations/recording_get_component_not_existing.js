let nock = require('nock');

module.exports.hash = "9dc77704b50bc25cd991f442aae56712";

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
  'ae18511f-2b3f-46be-8ddd-afaef8902900',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AsRCZXXRaYxAg--r9emWXlc; expires=Sat, 30-Apr-2022 17:38:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr967s0coD4TaE9HJTh0J8wFS8O3YmgrqWqFdCPDi_skz1XgBDnFQiJA7CdQc-ANwiRaV2reEy8a9NyvXDXXU9z_q3HFV0HmUPdJdvvTa4rvNO8_xf1Q1LJ7gtZySgOpGyu27yO1MiVe1ZEtroTlRDwTguuyGYkAlTH7w_wm-R3KkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:38:34 GMT',
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
  'd9711851-364a-465d-9b47-e4f448012200',
  'x-ms-ests-server',
  '2.1.12570.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsDbk9RRtmZEqPb2f8Pti3U; expires=Sat, 30-Apr-2022 17:38:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevra6ViQwh88XN74Pa3ARDH0ZbWsgASJhg9BvLzOWB_EcODRMqyoYt9ubiqpmcrbZ0hF5IB_y0rxSS6E7wOLbSQk5qO3wbqjBwNw_dVG74friwyyvpnXWfbCxZyylZn2nBtOTGomkChvYJDIqlmhLd2_M405_lWQLzH9PtO70dek78gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:38:34 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=56f66155-f911-4b2b-af5e-7d7ce145add7&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1452bfdd-fe75-4f62-b2bb-4b5757682300',
  'x-ms-ests-server',
  '2.1.12570.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlFNNobGP0hHsQLoXbPGK8kL3UepAQAAABve19kOAAAA; expires=Sat, 30-Apr-2022 17:38:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:38:34 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-f4dc78771270df45b4244f3ba53e9838-29cded23ab62954e-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:36 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-3b815ca331b4dd4d94f76724cea10ad2-75a408d6b968bd41-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:36 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTComponentTestsComponent;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Component1","contents":[{"@type":"Property","name":"ComponentProp1","schema":"string"},{"@type":"Telemetry","name":"ComponentTelemetry1","schema":"integer"}]},{"@id":"dtmi:samples:DTComponentTestsModel;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"TempModel","contents":[{"@type":"Property","name":"Prop1","schema":"string"},{"@type":"Component","name":"Component1","schema":"dtmi:samples:DTComponentTestsComponent;1"},{"@type":"Telemetry","name":"Telemetry1","schema":"integer"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTComponentTestsComponent;1","description":{},"displayName":{"en":"Component1"},"decommissioned":false,"uploadTime":"2022-03-31T17:38:36.5188965+00:00"},{"id":"dtmi:samples:DTComponentTestsModel;1","description":{},"displayName":{"en":"TempModel"},"decommissioned":false,"uploadTime":"2022-03-31T17:38:36.5189287+00:00"}], [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-409b7d9e41b2ea4baebb62a3dcb0ac31-c665d4346b444940-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:36 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
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
  '00-d1f5a2a18ecdc946ac88c27534ab9c82-84415b4707f3a34c-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:36 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTComponentTestsTempTwin', {"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1"},"Prop1":"value","Component1":{"$metadata":{},"ComponentProp1":"value1"}})
  .query(true)
  .reply(200, {"$dtId":"DTComponentTestsTempTwin","$etag":"W/\"e9cb9b6e-b71d-4283-8e18-ce298f73eb5e\"","Prop1":"value","Component1":{"ComponentProp1":"value1","$metadata":{"ComponentProp1":{"lastUpdateTime":"2022-03-31T17:38:36.9758181Z"}}},"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1","Prop1":{"lastUpdateTime":"2022-03-31T17:38:36.9758181Z"}}}, [
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"e9cb9b6e-b71d-4283-8e18-ce298f73eb5e"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-0838f631c9789945839943e4b85d4c78-e16e3e38f6b59c47-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:36 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTComponentTestsTempTwin/components/Component3')
  .query(true)
  .reply(404, {"error":{"code":"ComponentNotFound","message":"DTComponentTestsTempTwin does not have component Component3 Please verify that the component path is correct. You can get components by getting the twin, See example https://aka.ms/TwinGetSwSmpl."}}, [
  'Content-Length',
  '246',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-029eba98037cd046b8d9401cc5df7f68-9c016dae6fb47547-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:36 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b24cf8133c47ec43a9e0c8b4a45a4684-e7db9d4d5e27a048-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:36 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsModel%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-fead7abf3bdd894fb8ce926dd048f9ce-cde2a259f4c6ae46-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:37 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTComponentTestsComponent%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a3a810161748e24d9951e87d1874f6ec-e138d034087df548-01',
  'Date',
  'Thu, 31 Mar 2022 17:38:37 GMT'
]);
