let nock = require('nock');

module.exports.hash = "71bc233a44ab247456865353fa021128";

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
  'bf0668d5-73b7-4319-92b8-3a38dddee700',
  'x-ms-ests-server',
  '2.1.13006.6 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AhaJshv5u2pHsfgNJsNBZxQ; expires=Thu, 28-Jul-2022 18:49:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6iCfchJ4V5ijfZCntrDZQexpFLipRifDXklcAvIyju6lIVVkuHIUWQq7GlCC48-2KWOKPhbllLChYT7bcRvqhJZbDFRY6OZ6Nw26AerRsX3NSMgMuNbFqbyJB-z2jaxGhRliE2PArU-yj8A96Bdp0inweJ8Tb_hSoV6BSJcJBT8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:12 GMT',
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
  '6c5d7f52-2c36-480e-8d8b-b8e96e113000',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgxGhWFhCUROpA862raLBRY; expires=Thu, 28-Jul-2022 18:49:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbGGnEOdT7QCj-rRO5NmNzLcPt1TWqekgJ0ObGilybxT9df8MtZOH4E8hXbpsau3OP-SZNgA6nKFoSqGBkI2Ejn2qI8lSPz4uS4pYp2I-PHqjClB290lEJCm8JoQj6B6eXaLtoHTwH62kUIZbf08HBmblpxqs4G70v2jhUOTLzzUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:12 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2620a258-a34c-49a1-a654-f9b34a6f10f5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9cfd8d25-d05c-41f2-a94b-8aced4de5401',
  'x-ms-ests-server',
  '2.1.13006.6 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ar9Eba3NcFRMgU9-AO8xcCcuuutMAQAAAChETdoOAAAA; expires=Thu, 28-Jul-2022 18:49:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Jun 2022 18:49:12 GMT',
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
  '00-349586feff6ef271e709960b3b1c4c8a-7032279344bebe1b-01',
  'mise-correlation-id',
  'ccdae031-9c58-404a-8c70-2dacbcf81710',
  'Date',
  'Tue, 28 Jun 2022 18:49:12 GMT'
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
  '00-6898594a976950e2d62fdb2daef0f33f-a45f701b1204d15c-01',
  'mise-correlation-id',
  '167c6063-819c-4d30-8a86-b39b6cefc14a',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTComponentTestsComponent;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Component1","contents":[{"@type":"Property","name":"ComponentProp1","schema":"string"},{"@type":"Telemetry","name":"ComponentTelemetry1","schema":"integer"}]},{"@id":"dtmi:samples:DTComponentTestsModel;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"TempModel","contents":[{"@type":"Property","name":"Prop1","schema":"string"},{"@type":"Component","name":"Component1","schema":"dtmi:samples:DTComponentTestsComponent;1"},{"@type":"Telemetry","name":"Telemetry1","schema":"integer"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTComponentTestsComponent;1","description":{},"displayName":{"en":"Component1"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:13.2053344+00:00"},{"id":"dtmi:samples:DTComponentTestsModel;1","description":{},"displayName":{"en":"TempModel"},"decommissioned":false,"uploadTime":"2022-06-28T18:49:13.2053602+00:00"}], [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-945238949595c1ad629c5c4295ec6964-7cf68c28f6a1d853-01',
  'mise-correlation-id',
  'e80e7a11-ffc9-4dd6-ad3b-262c4d26dae7',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
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
  '00-39a75e0513f7504fa09a127f604c1eef-a05e4e225dc12247-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTComponentTestsTempTwin', {"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1"},"Prop1":"value","Component1":{"$metadata":{},"ComponentProp1":"value1"}})
  .query(true)
  .reply(200, {"$dtId":"DTComponentTestsTempTwin","$etag":"W/\"42f47ad0-a679-4649-9750-818654a3697d\"","Prop1":"value","Component1":{"ComponentProp1":"value1","$metadata":{"$lastUpdateTime":"2022-06-28T18:49:13.4020681Z","ComponentProp1":{"lastUpdateTime":"2022-06-28T18:49:13.4020681Z"}}},"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1","$lastUpdateTime":"2022-06-28T18:49:13.4020681Z","Prop1":{"lastUpdateTime":"2022-06-28T18:49:13.4020681Z"}}}, [
  'Content-Length',
  '445',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"42f47ad0-a679-4649-9750-818654a3697d"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-d4cd29576c8dc44990b2d484257f192b-88960b56903b5346-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .patch('/digitaltwins/DTComponentTestsTempTwin/components/Component1', [{"op":"remove","path":"/ComponentProp1"}])
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'ETag',
  'W/"9f6bf89a-31f9-41dc-98ff-4be877c6491f"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-734c6a61c0900f4186024e9ca939ca15-8d31fd49630f544b-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTComponentTestsTempTwin/components/Component1')
  .query(true)
  .reply(200, {"$metadata":{"$lastUpdateTime":"2022-06-28T18:49:13.4020681Z"}}, [
  'Content-Length',
  '64',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"9f6bf89a-31f9-41dc-98ff-4be877c6491f"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-3d04bd8b0ab2824f986bda94b3b4649c-e3d944472d2dbe46-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
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
  '00-ad53da4f0566324699e244e179ab6876-bf381204a8bd3547-01',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
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
  '00-c3a05f211f136b909849bc10c041e347-bbe3333889cfaf5b-01',
  'mise-correlation-id',
  '4f3134bd-eaca-4256-8433-0fea8a94a5d4',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
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
  '00-73b961fe8a46066a6c8ccb7a6cee9cbb-2e1760049aee1896-01',
  'mise-correlation-id',
  '4d0642ce-d682-472c-b789-295da1237225',
  'Date',
  'Tue, 28 Jun 2022 18:49:13 GMT'
]);
