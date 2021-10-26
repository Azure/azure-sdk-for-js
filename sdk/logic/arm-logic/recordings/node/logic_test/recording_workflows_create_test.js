let nock = require('nock');

module.exports.hash = "9afe38e081ba1ee19153ee55e0d3a454";

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
  'aa9bcf8b-c3ac-400b-81c7-61b5ad850400',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=As83KHjvg6tFrBV1LFjYetc; expires=Sun, 21-Nov-2021 07:40:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5EqmC8wx5yCWpVRKCb-69B_1PC5SdqsmZp__AKoisLl5EJCavRvEZIQlau437k1dzUBJKar88dKboGy7nhmvassyJYcwns0XmDMUt01y3JrEuzoo3mHo8HAal3M38IRJMrjpiAL69T1kfbIkpXpQAfa0oeBAPExHhfTB_ZEZdc4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:25 GMT',
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
  '937ffe50-6350-4c7f-a79b-24e5e0540400',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjeDYYQLO8hMgu2mvfXxA6E; expires=Sun, 21-Nov-2021 07:40:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCV77TuY8n_GXvTEMVqO_KQpDpm2VaSF8UV3UhADFhi0u0YDrJHBR902C5R09Ph7_e7QVhhhN-4StZzhc_LLuUK2516rAYxtrXo7-S-1gKjGs5Uxu1dGtgx3WJrcDZmJ_ZjM9z2-qXZ1LK8fAp-vLLiKn4v4n450d6peLN8hQwUEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2f7f67e3-d8fe-4e01-9def-014439134444&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '7e6cbce9-7147-4087-8ec6-6378ff260a00',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag6IFY4IXBhPhKDkOW3zjkgWPr5BAQAAAOlhBNkOAAAA; expires=Sun, 21-Nov-2021 07:40:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:26 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Logic/workflows/myworkflowxxx', {"location":"eastus","properties":{"definition":{"$schema":"https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#","contentVersion":"1.0.0.0","parameters":{},"triggers":{},"actions":{},"outputs":{}}}})
  .query(true)
  .reply(201, {"properties":{"provisioningState":"Succeeded","createdTime":"2021-10-22T07:40:34.5190027Z","changedTime":"2021-10-22T07:40:34.5099425Z","state":"Enabled","version":"08585667184509938901","accessEndpoint":"https://prod-05.eastus.logic.azure.com:443/workflows/ff0472d6a679469b9db499c48529c7a1","definition":{"$schema":"https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#","contentVersion":"1.0.0.0","parameters":{},"triggers":{},"actions":{},"outputs":{}},"parameters":{},"endpointsConfiguration":{"workflow":{"outgoingIpAddresses":[{"address":"13.92.98.111"},{"address":"40.121.91.41"},{"address":"40.114.82.191"},{"address":"23.101.139.153"},{"address":"23.100.29.190"},{"address":"23.101.136.201"},{"address":"104.45.153.81"},{"address":"23.101.132.208"}],"accessEndpointIpAddresses":[{"address":"137.135.106.54"},{"address":"40.117.99.79"},{"address":"40.117.100.228"},{"address":"137.116.126.165"}]},"connector":{"outgoingIpAddresses":[{"address":"40.71.249.139"},{"address":"40.71.249.205"},{"address":"40.114.40.132"},{"address":"40.71.11.80/28"},{"address":"40.71.15.160/27"},{"address":"52.188.157.160"},{"address":"20.88.153.176/28"},{"address":"20.88.153.192/27"}]}}},"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Logic/workflows/myworkflowxxx","name":"myworkflowxxx","type":"Microsoft.Logic/workflows","location":"eastus"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1443',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-request-id',
  'eastus:b29c3a91-c804-4ae4-abbe-6e81dfb207ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  'ae3f09ab-02ed-4a32-9d5c-01894061f76c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211022T074035Z:ae3f09ab-02ed-4a32-9d5c-01894061f76c',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 22 Oct 2021 07:40:35 GMT'
]);
