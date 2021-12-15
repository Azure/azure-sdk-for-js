let nock = require('nock');

module.exports.hash = "cb48336e656aaa8b24cf36942322a1e9";

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
  '93ef7e08-1935-4d62-bd81-4c4955a74000',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvXrTQVaKslOm2frB2rt4hQ; expires=Thu, 30-Dec-2021 06:42:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhIdFUJ0LpttognQQXibJoIslRYRk5FmSmg5sIrhMdSSscn640_UNp4kwX3eERMrFVLeIFugnxndgFUXTsJZ5O3p9ydHeX4AOI8j-J4h9BwhWGVyRv4fmT7omzVF7k5KJZ5UinzhjEZvsGlICVWoSqxePm0uRn0sEs_MUh01vGPggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:42:47 GMT',
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
  '7f6f33c0-2e74-490e-8f6c-dc651fc84300',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ag1xhlPINvBEj6BlaZsE06U; expires=Thu, 30-Dec-2021 06:42:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdQx2nU_aHxocLt7vECXgQ_35i4xJc0RuJVN4GvrBF35MHhKGpzEM4NgPJAwOCVMmAurZNiow74pZElR5-TCrGJwc68w7uybXq26XlJbtBcCmIgtHATpkN4Xpi6xpl16XUFZvWHfVKxEqxqB-AOSvMomZ5xTyPIj-JG6KuOYE-oQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:42:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e61ceab0-c82c-44a7-9ada-e270bc4a8d06&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '072cda1b-922b-40cc-b9fc-db3c5ef24200',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ah4-3dtEzrJNkh_oZQdHrc8WPr5BAQAAAOe-N9kOAAAA; expires=Thu, 30-Dec-2021 06:42:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 30 Nov 2021 06:42:47 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines/virtualmachinex')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fde8b2a8db75562eb2e9bc58e6ef3e1af1b7c50cdfdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4faac56adde67715872f0487c6fcddc1a9bd5e31c637beafedcb6a9a0171bc93674dbb365fb4d945431f321de8cfec074d3e5d65d3b7f4d947cb6a4998cea4257db92ab3f6bcaa174ddeb6c5f2a219cfaba6fdfdf32575592d17f9b21d37797d594cf3b169f9fb57ab369f15cbdf9ffef8fdebaa6aa779dda2bf8fda7a9d7f04b8bf84a17f441dade8bb823076d85c2ece98f6b359766fb6777fb6bd7f807fb2dd07db93bd6cb6fd70676792cf76ce0f3ecd3eb558ceb37a7695d5f9cbba3a2f4a5049c1d177978bd7c50ff0d147afdb6c39a396bfffd3bddfff728f3131b850bba6adeaec220aa258d017aff2f3bcce97d3e02bfa72b59e944533cf6bfadccdcd778be5acba6a5e1371e81bed03cf47d539c141dbe126cddb351aecedec7ebafd346bb329d1b9d3845e69746e89eec460c1b7f9bb6cdafea46bb2bb7fefe1bdf1fec39dfbe3bd5d7aeeedeceedc53023812d08b55f3b468c008fe08abe68db29ea21cf465046971fd935f54cd0caffb5f4feb9cf0fb924508cd9ed5d5e20cf40c5b31eb5ea0c1ab3c9b7db72edab0c1225bd23bb33e76f49dcedcf1745aad97adc1d5cef6f357af7d50f4c20f57ba411234b5e471b838ca1356b3bccc7d4a3dcd69e6e73eea1fe17570f3e74fa8c1eede03f39583f3d18cf80554824c7dcf7c9a762856aed1c38e7d0b8f9d48126d6813a37d7e7f74baf7fb3f9c66939d59beb3339dcdf67767f941b69b1fecdebb777ebe3bbb9f7dfac0c7938075a7fd74b16aafbb6db8079ef417d532986ffa76c38cd3b7ef3be7f4cacfc5ac7f4d5afa98bbb9c5730b2e4123eac6f1c9cedebdf0ebb67a92cb7b3968729e954dee1af81d066457b6d9f5bea70f37b1cdbddfffc1cefdddfbd9e43e0df2defe6c27cf260fa77bf7ef9d7ffae9deee83f39955e1f2fc886d40b538dbdc82963ee6fe2cd2287e086c637efdbefc621020f311b3a9531970fd42d907fad1a1f351365b14cbafc8b730ec05caade96fafcd9558a3936a795e5cac6be3ecd83ea809931a56f027bf38be202b4a5fc30bb130a849becc26657ebc6eab0541987eb5220dca1e49b7e12a6ba7f3d7ea07d1f75e3fe6db2faa19236ba13db9feb2c3511f654d93370d5c27d39acde1d3fc3c5b97ad378796a08692f432796a75ceded4f7beef3ecdcab2ba3a7dd7e64b0cf54b72aaa86f62536a160ce2a33aff45eba2ce3f5f133169528434af8b8b65566a5b696a7afc6899b75755fd96da9a09341f9dc1253927d7847af9de2f6629f959179217d2f5dd1e0a770bf32b39cb98742281f895bf98fe22f7adbefee81186f74b7ec9f7edd8a8991080e6933400391c3417afd7d3699ecf88c1d18aa6e0","97fc3fb4d1fb232f0c0000"], [
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
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/LowCostGet3Min;3996,Microsoft.Compute/LowCostGet30Min;31996',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '36a5f045-3e8a-49bf-8e53-8341980871ce',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11797',
  'x-ms-correlation-request-id',
  'acd50ee7-6eae-4ab2-b7e9-aea30a10cc17',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211130T064248Z:acd50ee7-6eae-4ab2-b7e9-aea30a10cc17',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 30 Nov 2021 06:42:47 GMT'
]);
