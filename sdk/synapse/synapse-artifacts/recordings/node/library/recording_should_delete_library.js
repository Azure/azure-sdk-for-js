let nock = require('nock');

module.exports.hash = "6f4a925ae21eaecd491fe0bbb5f05178";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '5e59b7ae-19f4-4d34-87de-477488627200',
  'x-ms-ests-server',
  '2.1.11787.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWBQAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzEgosIYdsy9ZHL2kjT2CRFqoLgKUI13U2qthSqN44kFBq7bISUq1a_h7wHgfC59MqMboSaxR4hvvbFXOv1Va_iMMX0YhUObJql3PfmB3V1SmI6dwlgrTPoKD61GH2heyE5GCKDTlA45Sr2e_BH6QOkvYOlOSMKkbOQvJtY_DhBsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:40:44 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'ee6d2b44-9510-4c18-b2d5-1af8d04b1900',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWBQAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreRGEU_39nIa88brTU-bVqZBs-C0sY-O09fhUa_XT7ReMkfJ1ctmtwPmDZDF1mT3qQJMwz-rapdICIl-9pKp_9Z_L49s7Cj_P6rFJyJM5_LpMsDVohc7Du-q5v797pE-1tOnV7KlglG5n-nbUyIuqQ-6I70cTu7jNwbEwmyGPtBQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:40:44 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=cb2b2f99-178c-438d-9487-81277e210614&client_secret=azure_client_secret")
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
  'f863ac92-c341-46e1-9805-0ecba2202300',
  'x-ms-ests-server',
  '2.1.11829.4 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWBgAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:40:44 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .delete('/libraries/testLibraryName.jar')
  .query(true)
  .reply(202, {"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/libraries/testLibraryName.jar","recordId":0,"state":"Deleting","created":"0001-01-01T00:00:00","changed":"0001-01-01T00:00:00","type":"LibraryArtifact","name":"testLibraryName.jar","operationId":"9bd185ed-8f5d-4e11-949b-28334b279679"}, [
  'Content-Length',
  '370',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/9bd185ed-8f5d-4e11-949b-28334b279679?api-version=2020-12-01',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Location',
  'x-ms-request-id',
  'e5ffc25b-015a-46e1-b47a-ee3f15c04e13',
  'Date',
  'Fri, 11 Jun 2021 18:40:45 GMT',
  'Connection',
  'close'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/9bd185ed-8f5d-4e11-949b-28334b279679')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/9bd185ed-8f5d-4e11-949b-28334b279679?api-version=2020-12-01',
  'Retry-After',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  'ebc3a895-e226-4c6e-a089-4f9604641e87',
  'Date',
  'Fri, 11 Jun 2021 18:40:45 GMT',
  'Connection',
  'close'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/9bd185ed-8f5d-4e11-949b-28334b279679')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/9bd185ed-8f5d-4e11-949b-28334b279679?api-version=2020-12-01',
  'Retry-After',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  '8290d9a3-2ea5-4ae1-8e6c-e4c6e47e7c78',
  'Date',
  'Fri, 11 Jun 2021 18:40:48 GMT',
  'Connection',
  'close'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/9bd185ed-8f5d-4e11-949b-28334b279679')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'e1c1f918-4d5e-4939-883e-21dc7a0e3744',
  'Date',
  'Fri, 11 Jun 2021 18:40:49 GMT',
  'Connection',
  'close'
]);
