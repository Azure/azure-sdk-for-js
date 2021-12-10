let nock = require('nock');

module.exports.hash = "de33ebb0ef19ac76d33e9ba8414e51e3";

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
  'e64ab049-807d-4477-81d6-ab38dae90300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkxCCdGy0JhFt-RhXVrXDZY; expires=Sat, 08-Jan-2022 09:55:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPJ7cKze7tPTVvpJ3YfNQV-gRT25KUSnZ8rSb5xfqyLSIgVGwJus0Wok-59YKhvG_j5v4C8GqhAUgREYF4j78gZ-f9FDnjACat1IV-Et4mHcQ4euaZczlgYTfmu5h6X2CiUnZAJmzN99TrS9A8uSpq9OwXlKd4OA8DS6tP0GZoG4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:55:51 GMT',
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
  '20616d55-2ea3-43e7-9507-b18d0c210400',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvvKobUjb2VOuxY2TYmuLqk; expires=Sat, 08-Jan-2022 09:55:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpXGue8MnIEUaszz_Yq9cSN4hA4vqIbsgGiKFv3QzZHXJWYmb9GshaSEp2RfMA0YiUKzZROw4Z6dnn3oemm2wI67wZ-rYrUVZmdDwuGIyPrQkF_t5V6mItBK-Tbd1sm9BsmF1v-vpAoZvRke7_mEMKs8EIY4Ic5jKKbJYiNN6SbEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:55:51 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=54688d0e-7d5a-486c-858b-0c3db4d4fe48&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '84e10da0-7734-4177-95ed-c34353050500',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArN6rca-uB5MnODvH3PRn1gWPr5BAQAAAKfJQ9kOAAAA; expires=Sat, 08-Jan-2022 09:55:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:55:52 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/databaseAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7d574bdc897edd3277767599b4db2263f9e4eabf5b2c58b99fcfaeeddbbfb1f8d3e5a660bc2eca3eec76535cd801d7d759a356dfad56bfab0bd5ea1edad3aa2e66f8b2546fb79594db2d235a56fdaeca2f9e8d12ffe25a38f9a6b1ac6e229bd4c7f7f34adf3accd67c72dbdb6b7b3b7bbbdbbb7bdf3f0cdcec347f7771fddfb74bcbbb77b6fefd39ffa885ea471aff2ba2d7200c25f974543f816cb8bd72dc12000afd7d3699ecff2197538d3de4f97b355552c017fdeb6abe6d1dd902063d3b019673f58d7f9785a2d1eedefdfbb4b3056eb49594c5fe4ed5555bfa561e60d75fdd1e9329b94dc47cebf1dafdb6a41a49b3ecb8ab2bacceb8f1e9d6765939befbf58976db12af3efd6459b3f572a13a0a0d1cb8c46862f7eaffcfa0b1a545b393045f39345ddaeb352317956946d5e1b344cabcba0cdab75093a7deffb2383eff1aa7843b3491f7ef4fa179584fdac68f00575f8846671f645de66985246d30c56610b8ecfea3c7f53f4c677bcccca6b1a7e56be26acb30b9a09fd3eeb7e73522dcf8b8b75cd24c02c36d379bec88017a1f5ddbc2c9fe6e7c5924645f35d2c9b365b4ef3331ae3477b0ff71f4e26e7f7b61feedf2389c91fe4db937be7d9f683fb7b07fb93bd7cffc1c3738c8906e0f1e497e7e779add0894996b3acc6bccdf2f38c26e56c46d35eb4d7f4e5b3a26e5accc1b5fd90044548793c2d9f5caf3290e3a317d532a76f947498cc92a67f6e473ca5992d88bf97d3eb9715f10ec1fec5a63b1abcf9ee797e999704ee35111994187db4c8de9d2d6956496f9c2d5fe7046746fddde72f08f3325f52d3973551e7dd478f767776883ed4c611f34be2bb9ab402bd0421bbc224023d7c479f193d14b0fef615a99335e4d6c8fe0b510ddfa5cf45fe8d70dc24450a6aa330dd20b0e72a3d2feba222ec89723bc403cd4f11c55fe5b335cd1dba673aff12e26ad21bb3ffff0e70141d0ed983763ea5deebac8c0deb35be4f4fa4c17b8e2f84fdcd8e73ef3dc79967a03581ea8ccfd92583de8dc31250dfec70760787437c6950fe114f663cac1ff1646f5802ea9b1dce469eb4cd6192d87ffabaac6921d98ec9124561857347af766046f8a20f7c6f00b850905ee9007593d187b50b4a4cab1aa3c76fd92a9b1425f95c4c0ffaa458794ed3249bbe5daf9860f4ee2f368ef0cb9ce0cd8a29f540be28fffa4535cb5f06aea9bcebccf917c5724d9e3b0d679fa44bbe7d95932300cc5db36f93b74f8d0e4c13f599cc84028f8f3ecfab8f7e09d9f7ae6bf24a638533780ddffb3eb5205f80e063e01679765e7ec92ff9fe2f","f97f00b6eb7e0e9f0c0000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11142',
  'x-ms-request-id',
  'a7325414-7ade-4278-89e1-25048f4ca159',
  'x-ms-correlation-request-id',
  'a7325414-7ade-4278-89e1-25048f4ca159',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T095552Z:a7325414-7ade-4278-89e1-25048f4ca159',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 09:55:51 GMT'
]);
