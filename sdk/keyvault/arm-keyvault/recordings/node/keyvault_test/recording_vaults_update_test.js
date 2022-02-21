let nock = require('nock');

module.exports.hash = "25c02deb3922f3f44af759d390994741";

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
  '9d7d25b4-f5cf-461b-8d07-f5f2df550d00',
  'x-ms-ests-server',
  '2.1.12507.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsED3VDb-7FBuF7CHyubu1Q; expires=Wed, 23-Mar-2022 06:34:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrJ1oBqNWurC21-TAqaZp1b7fGVv2J4Mr3TwNyCi-3BQ2wN-NJDmgArKmR1FVjpJgXSe2qdR1hvHfqPdeC0_8MZ6aiCTw_gGHuUg2kRIGr077PhIopDjBuNCoo3_HAhU9GYVPPPSpZWDnNxkBS5IEJOR1pKPODI45P1WFLEpJQo4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 21 Feb 2022 06:34:32 GMT',
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
  'bf04027d-9503-40a7-911e-6bb4f3d70c00',
  'x-ms-ests-server',
  '2.1.12507.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AslumgsjI1ROuBjGz1fnA7I; expires=Wed, 23-Mar-2022 06:34:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3KkbIVJKzyRoKoBvye6ACuxYr-s612kzgQqqiWK3DcEsoN7db32kkxSaCGZva82C3ogp9Bidn_wJv47PU6mGQyYboo-NzWIqt8rXycyV72rezVLQYROk1fE62gKsNDV72tbwGOGgCJWlTVbVUv5pIC6TdPT_L7r_Vkxuo8qxGx4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 21 Feb 2022 06:34:33 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=33fa956f-2cfa-4a2a-97aa-aa758601823c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '45ab8730-aa02-44ac-873e-b6112e5d0d00',
  'x-ms-ests-server',
  '2.1.12507.13 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgbaNInKsLJOv5ljexf73rnLj78gAQAAAHgppdkOAAAA; expires=Wed, 23-Mar-2022 06:34:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 21 Feb 2022 06:34:33 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.KeyVault/vaults/myvaultzzzz', {"properties":{"tenantId":"88888888-8888-8888-8888-888888888888","sku":{"family":"A","name":"standard"},"accessPolicies":[{"tenantId":"88888888-8888-8888-8888-888888888888","objectId":"00000000-0000-0000-0000-000000000000","permissions":{"keys":["encrypt","decrypt","wrapKey","unwrapKey","sign","verify","get","list","create","update","import","delete","backup","restore","recover","purge"],"secrets":["get","list","set","delete","backup","restore","recover","purge"],"certificates":["get","list","delete","create","import","update","managecontacts","getissuers","listissuers","setissuers","deleteissuers","manageissuers","recover","purge"]}}],"enabledForDeployment":true,"enabledForDiskEncryption":true,"enabledForTemplateDeployment":true}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e7faffcfa27b375d9debdc4bf68ccbffc809e8f461f2db3454e48841fb6d72b7c3808839a94d53403c2d42ccf9a768dcfdaeca2f9e8d12ffe25a38f9a6bc267f1346b33fafba3699d676d3e7b724d8dcfb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff0181b2afbc11548e57abb2d01eedb7c72d7db3b7b3b7bbbdbbb7bdb3fb66e7dea39d878f7677c7f7eedffb296a5612625f54b3e2bc00246a9bef6444c07b44d14f77d139bd7670fee9749b28fde0fececeeef4fe34ebbd17c5c06f62d0201cf6b6f7088d4f1fdddba7ff8df7ef3ffca98f881a342babbc6e8b1cd4f9a879bbc68ff36c519440ea98c0e92c346db69c65f50c2fb5f9325bb667e09007c412070793f3ed834fcf778925b27362896cb2bd372386d8d9dd9d4d9866d9749a37cdcb8ad0e4aebef78bbf06906af2d3f954ded8d1679bfedffdc73cf4060d6d51340dd185fafcc51fbdcdafe9e7f73eca97d3fa7ad55283596e7ebbaab315b112fdb65ebadf9be20224bdccebe21c7f5fe4685b160d7ec854d32febd54c7e2916abaac657b3bcccf99349367dbb5ed12f24166d55e3a33a9f5604907e5badeb8bfca3ef533784464ebc4bb8053d34fcc77b029b623ecfc10f4ce910a285451d5203fac5e26c47b1c896d905c15db6d99490e2511315d724bbf40700b9bf0843f78700777f0b20f7770fd95ff24b085fe2834999cf9e55f5d37c5556d78b7c495cdbd6eb3cf8ae68de9ecabcd174f6bf7f932f5625e13f04e335e98aa78c9ff99cf5c5577541ec346fdb55f3e8aeaf7fc6fcdb38fbc1bacec7cbbcbd0baca1c2c04dc5f2e2754b9dd1abafd7c4daf92c9fe1fbf58418fc45de5e55f5db63fabca109f8e894fb27c1f925","ff0ffe8796cd56050000"], [
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
  'x-ms-client-request-id',
  '0cfd4fce-b6fd-443e-bf7b-5e222dd5c67c',
  'x-ms-keyvault-service-version',
  '1.5.286.0',
  'x-ms-request-id',
  'fc9663d1-8830-40e9-bf67-0237936212eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-correlation-request-id',
  '1eb11765-8587-406b-b8d9-89f472d9cae9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220221T063435Z:1eb11765-8587-406b-b8d9-89f472d9cae9',
  'Date',
  'Mon, 21 Feb 2022 06:34:35 GMT'
]);
