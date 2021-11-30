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
  '154747b9-503d-4434-a18c-1527ec342800',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXo; expires=Fri, 30-Jul-2021 15:27:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDp-bqzrWq1k0L6E2BvPDYCRQ2pOputzssyZRlbyizVk99M4f91WO6na_1bvOJgU0lqjS5hOJP5RWULB_sVy-3PS8xJ-Upy7RwnznE04kVzWLklVbshjSEpsayE9_45SjpZvlxc22ZvtfjB-siWLIgd683r_MGZjtk5hub4Wf_mMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:27:51 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '2addb27d-9919-4ad9-9db7-755be3312f01',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXo; expires=Fri, 30-Jul-2021 15:27:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMlD5q4XUDQj4Vl_PxBD2_56Hf2xHuSoyhnWYGsTFe1msHyLeO7uMrtqAKJcCneHS-1o0NxLnbLd10Ckv9r1pDdI1cBQDMBOdWQMNw0db-pC_ug9UV3ocgpyikUKAHhfAlGwuh1EC2FY-G9j54V2NfWDardO8Dqd7sacnlwin2nEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:27:52 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=54d67aa7-40fe-45f6-b3b3-a7abd6ac6c2e&client_secret=azure_client_secret")
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
  'aa2c3d00-0907-48b2-81d0-a3587def4201',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag0kRxVsCxRKucMwVaNslXqpMdrgAQAAAHiEbtgOAAAA; expires=Fri, 30-Jul-2021 15:27:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Jun 2021 15:27:52 GMT',
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
  '00-8ce5fb26c8e2064094a4c47bed634b29-1a0fc9def6fbfe40-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:53 GMT'
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
  '00-13cf7675da50734684a34ca62cba9e6f-0e670504b483124d-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:53 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTComponentTestsComponent;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Component1","contents":[{"@type":"Property","name":"ComponentProp1","schema":"string"},{"@type":"Telemetry","name":"ComponentTelemetry1","schema":"integer"}]},{"@id":"dtmi:samples:DTComponentTestsModel;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"TempModel","contents":[{"@type":"Property","name":"Prop1","schema":"string"},{"@type":"Component","name":"Component1","schema":"dtmi:samples:DTComponentTestsComponent;1"},{"@type":"Telemetry","name":"Telemetry1","schema":"integer"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTComponentTestsComponent;1","description":{},"displayName":{"en":"Component1"},"decommissioned":false,"uploadTime":"2021-06-30T15:27:54.2831873+00:00"},{"id":"dtmi:samples:DTComponentTestsModel;1","description":{},"displayName":{"en":"TempModel"},"decommissioned":false,"uploadTime":"2021-06-30T15:27:54.2832175+00:00"}], [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-25c70dd184c78c4eb9ccd4c2bbcc2a47-4343b62d945dca47-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:54 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/digitaltwins/DTComponentTestsTempTwin')
  .query(true)
  .reply(404, {"error":{"code":"DigitalTwinNotFound","message":"There is no digital twin instance that exists with the ID DTComponentTestsTempTwin. Please verify that the twin id is valid and ensure that the twin is not deleted. See section on querying the twins http://aka.ms/adtv2query."}}, [
  'Content-Length',
  '277',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-41d920d31640b04d8a9d8ceee4251dad-e10712a894418c45-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:54 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .put('/digitaltwins/DTComponentTestsTempTwin', {"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1"},"Prop1":"value","Component1":{"$metadata":{},"ComponentProp1":"value1"}})
  .query(true)
  .reply(200, {"$dtId":"DTComponentTestsTempTwin","$etag":"W/\"39ed27c9-1968-490b-810e-821a74c2d7b0\"","Prop1":"value","Component1":{"ComponentProp1":"value1","$metadata":{"ComponentProp1":{"lastUpdateTime":"2021-06-30T15:27:54.6978868Z"}}},"$metadata":{"$model":"dtmi:samples:DTComponentTestsModel;1","Prop1":{"lastUpdateTime":"2021-06-30T15:27:54.6978868Z"}}}, [
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"39ed27c9-1968-490b-810e-821a74c2d7b0"',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-a3f75502de043c469b1efd2a0bf4e901-876ab1aad3b15946-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:54 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/digitaltwins/DTComponentTestsTempTwin/components/Component3')
  .query(true)
  .reply(404, {"error":{"code":"ComponentNotFound","message":"DTComponentTestsTempTwin does not have component Component3 Please verify that the component path is correct. You can get components by getting the twin, See example http://aka.ms/TwinGetSwSmpl."}}, [
  'Content-Length',
  '245',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-4c37b70ccfaa4043b8a6706e060b09bb-6db55859e0e37a42-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:54 GMT'
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
  '00-757975a319233146b367872d6d23e534-d3a1a89f430a0b46-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:54 GMT'
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
  '00-ba3cac5e427e194a88c1d124c4558039-7df1e1a1a58c354d-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:54 GMT'
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
  '00-e7988e6148399847bb6dc31f555b5fe1-a8036b4361363e4f-01',
  'Date',
  'Wed, 30 Jun 2021 15:27:54 GMT'
]);
