let nock = require('nock');

module.exports.hash = "6c4609f6a5b5fbcc676d2f31d151cc20";

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
  'f9222132-b683-47ff-a49e-b4f286a81100',
  'x-ms-ests-server',
  '2.1.12071.16 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjpOovHmyt9NgFXYxehPjcI; expires=Thu, 28-Oct-2021 02:49:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1ReOZjgf0q7vWR65GdP0hx9R6ZTUMlRbgy8PIgUZ2f3H3pymKGyQs84Bx9NZC_ux8YV2KqKSAyHOl_JtO9P_8mD45KdioFcGecyNA_g7WdTPMWekBqQ3z0PuzTYw2xxtPslJjMSAMvhj8E0v-55Vyjz7I0ckuI4_gdWx3aJaFcogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 02:49:35 GMT',
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
  '791d4b96-cf7d-4212-8f5b-a0859a9f1200',
  'x-ms-ests-server',
  '2.1.12071.16 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgidRWo3judFvOJGWP_u1rY; expires=Thu, 28-Oct-2021 02:49:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrgsbrWq0yjPnKGLDvojNCDQrbGUm_6Re7ij9BZuhBNpF1Jww6DCSnLdq6PEuzMuicqIgp2SBiaFKadtMN_E2YSbFZzoWvL-sEw1G-S3mqj6GiqSQqRy5lqahsnZjxrO-9Pf4uEPuB4MvnDCXbC80U2xTUH6UhBAy0vG8xfY66Q0QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 02:49:35 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e291fb01-250b-417f-a497-b50a58eca3cc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'f9d979f1-57a4-42d5-bd48-4deb6e8a0000',
  'x-ms-ests-server',
  '2.1.12071.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aoea2JppXmBJtkV-1Ue8p5IWPr5BAQAAAL955NgOAAAA; expires=Thu, 28-Oct-2021 02:49:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 02:49:35 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cache/redis')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3936c3acfefbeca67051ad6f839c547efdebddbddddfd68f451594d33f44db89c664d9b7ef59a3e5c660bc2f1a3e80bedf50adf45bbc0d7d945f3d1a35ffc4b461f113aabbc6e8b1c7fe3afcba2a18e8ae5c5eb366b01e3a4cea9efe505bdc61dfd24e14e2de89bfdf1ce78779f3e6fdeaef1b622f4b2ce17c57a419f9f678ba2bcc647f4c7345b65d3a2a53f77a9df7c994dcafc45b57cdd942fabbafde8515baff3d147c5b269b3e514e810f51bf3e5eefd9d9d1d1ab2d77ef71e7f54345f1045f2faa347e759d90042f3b22e16594d1df127bf64d481b3db87431fbd3f9cbd3e1cfae8fde1dcebc3a18f6e86f3fdd1478b62592cd68b37a5372bbbe33da2f66a3d298be98bbcbdaaeab7c753222851f4a353a6fa8cbee7a93ca996e7c5c5baa6f9c5abbff8a345f66e912faafa7a7b55d1ebd4d5475959becdaf9bedb25ed36bd4605a16f9b205b40784bc7ca62f11cfe7f525c17ff4d19ef9eabcce2e16f402f7d16f47839576fad52c2fdb8c3ec7fbc4261963fe7b11021f3d5aaecb72f4d1bc6ada17c2687dce1ff30763fe647c552c67d555335ee62d75b162e27e7aefc143e25743eb4fef1d100b9174539b33a073977effd994749d90bb9745ddaeb352ff6cee52fff80512f4ee2ee1407f37fad37e4e8320d9688be9d94bc2747787a46f677c1f9fceb37a7652ad973422e2c0b258becd67af41e19ac8f6bdef131d7f502d59a43edafde8fbbfe4fbbf","e4ff011b16d338e2040000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '01984311-1590-4991-861e-15f7b14d17ed',
  'x-rp-server-mvid',
  'c8066022-f720-49e8-9fec-c4ac03b5b4cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11989',
  'x-ms-correlation-request-id',
  '6f139cf6-018e-41c9-99b8-c1d0c710f8c5',
  'x-ms-routing-request-id',
  'JAPANEAST:20210928T024936Z:6f139cf6-018e-41c9-99b8-c1d0c710f8c5',
  'Date',
  'Tue, 28 Sep 2021 02:49:36 GMT'
]);
