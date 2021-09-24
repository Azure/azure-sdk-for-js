let nock = require('nock');

module.exports.hash = "4e47848003a4f74b73262cd4a838afa8";

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
  '66f97c70-7c2f-41b8-82b3-8e1386ef0600',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlzEAut_Z21KsPo-w9uL5xU; expires=Sun, 24-Oct-2021 03:42:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3JMsGEi_vi3Tz_PbtsWgq1kdji_zAkugQT_QMQ6X_fjGyhzEmAXWmdzNyfkXJEa5i1ZzjXybPER-56-5D73TiBN0sejMhWxUbEatQU-ZmSlQxpDLnt39zmtTgAtQjwUvOezW1DoaN_rudRUOcObrPaZ1jMwNxdIVPcCpnQAHBBYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 03:42:54 GMT',
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
  '38719b22-bb0c-4fad-9308-c2ad4d090700',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Av3xwz4Cl5pNkQrh2-0bxUw; expires=Sun, 24-Oct-2021 03:42:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrS-qQO5cpkyJ2gF9vRf1tn-MIL_4hQrbq-MvkYYxbXyFNXAvCHLSm-gcdNiKFJD5W3lU6alViqlivKCT2czjP8fwFQmDAp8A1m6jBRWjsrpqXnuoeEpNaljEA2Li5Qp3m0rIS3DA78p7cyN8USlhx-_IAvDaazXfxeVvlC8zkQ70gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 03:42:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4ae368be-4721-4a72-82e3-2af8029b0fcf&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '38719b22-bb0c-4fad-9308-c2ad4e090700',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqEkqeQD6BtFvMOS0jcP-oYWPr5BAQAAAD5A39gOAAAA; expires=Sun, 24-Oct-2021 03:42:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 03:42:54 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77efee7f34fa68992d7242a9fb71594d3360475f9d664d9b7ef59a3e6caf57687bab8ea8f9db6289d17e5e5693ac744de99b36bb683e7af48b7fc9e8a3e69a86b1784a2fd3df1f4deb3c6bf3d9714bafededeced6eef3cdcdedb7fb373efd1bd878ff6f7c6bb0f3edd7bb873ffa73ea23769e0abbc6e8b1c90f0d765d110c2c5f2e2754b4008c2ebf5749ae7b37c463dceb4fbd3e56c55154b74306fdb55f3e86e4891b169d88cb31faceb7c3cad168ff6f7efdd2518abf5a42ca62ff2f6aaaadfd238f386bafee874994d4aee23e7df8ed76db520da4d9f6545595de6f5478fceb3b2c9cdf75faccbb65895f977eba2cd9f2b990950d0e8654623c317bf577efd050daaad1c98a2f9c9a26ed759a9983c2bca36af0d1aa6d565d0e6d5ba049dbef7fd91c1f77855bca1e9a40f3f7afd8b4ac27e5634f8823a7c42d338fb226f33cc29a36906abb005c767759ebf297ae33b5e66e5350d3f2b5f13d6d905cd847e9f75bf39a996e7c5c5ba661260169be93c5f64c08bd0fa6e5e964ff3f36249a3a2f92e964d9b2da7f9198df1a37b7b0fceef3f9864dbe7d9c32989ccf47cfb20cbef6dcff2ecc1bdbd7b597effd31d8c8906e031e597e7e779add0894996b3acc6bccdf2f38c26e56c46d35eb4d7f4e5b3a26e5accc1b5fd90244548793c2d9f5caf3290e3a317d532a76f947498cc92a67f6e473ca5992d88c197d3eb9715f10ec1fec5a63b1abcf9ee797e999704ee35111994187db4c8de9d2d69562fb3f26cf93a273833eaef3e7f419897f9929abeac893aef3e7ab4bbb343f4a1368e985f12dfd5a416e82548d9152611e8e13bfaec7baa8802d6dfbe227db286e01ae17f21bae1bbf4b92800231c37499182da284c3708ecb94acfcbbaa8087ba2dc0ef140f35344f157f96c4d7387ee99cebf84b89a14c7ecffbf031c45874306a19d4fa9f73a2b63c37a8defd31369f09ee30b617fb3e3dc7bcf71e619684da03ae37386c9a077e3b004d4373b9cddc1e1105f1a947fc493190feb473cd91b9680fa6687b391276d739824f69fbe2e6b5a48b663b2445158e1dcd1ab1d9811bee803df1b002e14a4573a40dd64f461ed8212d3aac6e8f15bb6ca2645493e17d3833e29569ed334c9a66fd72b2618bdfb8b8d27fc322778b3624a3d902fcabf7e51cdf297816b2aef3a73fe45b15c93eb4ec3d927e9926f5fe5e4080073d7ecdbe4ee53a303d3447d2633a1c0e3a3cff3eaa35f42f6bdeb9abcd260e10c5e03f09f15d9c5b26ac8f97a5e5dbccedb963889befac5eab33d5b97e59bfc5dfb13ebbc065cf66b00985c08420bf4b263d6ef","fe1f02d403e7cb0c0000"], [
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
  '11409',
  'x-ms-request-id',
  'f8512012-1371-4cbf-9521-0d8d6702e475',
  'x-ms-correlation-request-id',
  'f8512012-1371-4cbf-9521-0d8d6702e475',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T034255Z:f8512012-1371-4cbf-9521-0d8d6702e475',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 03:42:54 GMT'
]);
