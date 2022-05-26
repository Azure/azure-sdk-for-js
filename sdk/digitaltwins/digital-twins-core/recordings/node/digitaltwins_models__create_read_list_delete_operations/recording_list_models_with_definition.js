let nock = require('nock');

module.exports.hash = "13789217f0d1de1d56a8d16427e9a72d";

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
  'cb7eb4a7-5000-45a2-99ed-6f2d79796c00',
  'x-ms-ests-server',
  '2.1.12570.11 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AsUyc2wqO0dFlpgTC8mT_As; expires=Sat, 30-Apr-2022 17:39:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKLGhupqtFLcScbQ12J8I1FhYi2bwXee0hkgKaZmOf7iDVodye_W_2ygWsQdeVgudr4miZ7YcXGgckJaFIM5GulOOA9XoTb0PZ0fGt8KhwnhVgDN4-aGByDe0HykRBgt_L4DPpdG2ZY-ZGynSJjZKwSkp1GzW3nYComUukrxUORIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:27 GMT',
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
  'a99f8f4b-aacc-4bd6-8f1e-b047e32a1f00',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ap0Z7eMNWplAteE1KM8AAAg; expires=Sat, 30-Apr-2022 17:39:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_l4Gj28xECl6EhCeAwoAwR-CGi6GsdV70VZHRVALWE9rnZ81D2C3Omm2YtGUxJsrAdilAE6JK2f92i8Xf7uOFIIOmbftSx3JeYYMt3m3Qs4QeeLrCX3IM4Wk0QY810p9q_iR40w5LBEyPr7VK2u5Hpib0_MzI0xuyMlvPAaj2CggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=88b40165-6076-40f0-bbe7-8ac21118da6e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd9711851-364a-465d-9b47-e4f4700e2200',
  'x-ms-ests-server',
  '2.1.12570.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuFMlORynX9Moa2OwFBgfhk; expires=Sat, 30-Apr-2022 17:39:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 17:39:28 GMT',
  'Content-Length',
  '1325'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTModelTestsModel%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTModelTestsModel;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '217',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-71d2327a8b6f6840abdcd67a727be41b-2e40b4984f06af49-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:27 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTModelTestsComponent%3B1')
  .query(true)
  .reply(404, {"error":{"code":"ModelNotFound","message":"There is no Model(s) available that matches the provided id(s) dtmi:samples:DTModelTestsComponent;1. Check that the Model ID provided is valid by doing a Model_List API call."}}, [
  'Content-Length',
  '221',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-714773b8a98da1499223440d54781c8f-c9f15257f40a9340-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:29 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .post('/models', [{"@id":"dtmi:samples:DTModelTestsComponent;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"Component1","contents":[{"@type":"Property","name":"ComponentProp1","schema":"string"},{"@type":"Telemetry","name":"ComponentTelemetry1","schema":"integer"}]},{"@id":"dtmi:samples:DTModelTestsModel;1","@type":"Interface","@context":"dtmi:dtdl:context;2","displayName":"TempModel","contents":[{"@type":"Property","name":"Prop1","schema":"string"},{"@type":"Component","name":"Component1","schema":"dtmi:samples:DTModelTestsComponent;1"},{"@type":"Telemetry","name":"Telemetry1","schema":"integer"}]}])
  .query(true)
  .reply(201, [{"id":"dtmi:samples:DTModelTestsComponent;1","description":{},"displayName":{"en":"Component1"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:29.1049059+00:00"},{"id":"dtmi:samples:DTModelTestsModel;1","description":{},"displayName":{"en":"TempModel"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:29.1049391+00:00"}], [
  'Content-Length',
  '334',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-78d592f237e71c44a0c5ff77fb68de0b-544ac924cad5ae44-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:29 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .get('/models')
  .query(true)
  .reply(200, {"value":[{"id":"dtmi:samples:RelationshipTestBuilding;1","description":{},"displayName":{"en":"Building"},"decommissioned":false,"uploadTime":"2022-03-28T16:38:57.2030185+00:00","model":{"@id":"dtmi:samples:RelationshipTestBuilding;1","@type":"Interface","@context":["dtmi:dtdl:context;2"],"displayName":"Building","contents":[{"@type":"Relationship","name":"has","target":"dtmi:samples:RelationshipTestFloor;1","properties":[{"@type":"Property","name":"isAccessRestricted","schema":"boolean"}]},{"@type":"Property","name":"AverageTemperature","schema":"double"}]}},{"id":"dtmi:samples:RelationshipTestFloor;1","description":{},"displayName":{"en":"Floor"},"decommissioned":false,"uploadTime":"2022-03-28T16:38:57.2030441+00:00","model":{"@id":"dtmi:samples:RelationshipTestFloor;1","@type":"Interface","@context":["dtmi:dtdl:context;2"],"displayName":"Floor","contents":[{"@type":"Relationship","name":"contains","target":"dtmi:samples:RelationshipTestRoom;1"},{"@type":"Property","name":"AverageTemperature","schema":"double"}]}},{"id":"dtmi:samples:RelationshipTestRoom;1","description":{},"displayName":{"en":"Room"},"decommissioned":false,"uploadTime":"2022-03-28T16:38:57.2030582+00:00","model":{"@id":"dtmi:samples:RelationshipTestRoom;1","@type":"Interface","@context":["dtmi:dtdl:context;2"],"displayName":"Room","contents":[{"@type":"Property","name":"Temperature","schema":"double"},{"@type":"Property","name":"IsOccupied","schema":"boolean"}]}},{"id":"dtmi:samples:DTModelTestsComponent;1","description":{},"displayName":{"en":"Component1"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:29.1049059+00:00","model":{"@id":"dtmi:samples:DTModelTestsComponent;1","@type":"Interface","@context":["dtmi:dtdl:context;2"],"displayName":"Component1","contents":[{"@type":"Property","name":"ComponentProp1","schema":"string"},{"@type":"Telemetry","name":"ComponentTelemetry1","schema":"integer"}]}},{"id":"dtmi:samples:DTModelTestsModel;1","description":{},"displayName":{"en":"TempModel"},"decommissioned":false,"uploadTime":"2022-03-31T17:39:29.1049391+00:00","model":{"@id":"dtmi:samples:DTModelTestsModel;1","@type":"Interface","@context":["dtmi:dtdl:context;2"],"displayName":"TempModel","contents":[{"@type":"Property","name":"Prop1","schema":"string"},{"@type":"Component","name":"Component1","schema":"dtmi:samples:DTModelTestsComponent;1"},{"@type":"Telemetry","name":"Telemetry1","schema":"integer"}]}}],"nextLink":null}, [
  'Content-Length',
  '2441',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-c26058ead4fe394b9644f8647ea0ee96-8a8750abca256a49-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:29 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTModelTestsModel%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-028cc7ecb8155549a4b07a251979ed09-cfdf09c3527e7d4d-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:29 GMT'
]);

nock('https://AZURE_DIGITALTWINS_URL.api.wus2.digitaltwins.azure.net:443', {"encodedQueryParams":true})
  .delete('/models/dtmi%3Asamples%3ADTModelTestsComponent%3B1')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'traceresponse',
  '00-b5a7249b5b76e3409658652588402273-9672a05427bc7c43-01',
  'Date',
  'Thu, 31 Mar 2022 17:39:29 GMT'
]);
