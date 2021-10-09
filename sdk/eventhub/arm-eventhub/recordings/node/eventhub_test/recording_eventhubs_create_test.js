let nock = require('nock');

module.exports.hash = "865fbcebf160d865dd577c11b7c20a2d";

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
  '34b08262-d419-4c23-84e8-b4a3dad21600',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ajf25aqROnNKpSqIOhpNv8k; expires=Sun, 07-Nov-2021 03:05:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsFEP2bAwVyO-ccOttQLM6W8Kb2qZSsBEK5EXD2qYTw2eFuZBM8KyPKdGU6Pl6ZSUwPNednlympHn6bhRnwPAK-9QJVB5BUqHT-aPNOWvKqS_JFqs3FFkiz1Dfvkqbum2A6vTXGi6kuAaWSxFCJ5bTRoLk6_z1DseSMmasvXmANggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:34 GMT',
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
  'cbdd870e-09eb-4be3-b22d-d114e1d00500',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AqzzMqbrVLtJkuGuOo5seRo; expires=Sun, 07-Nov-2021 03:05:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJ_WhQf0-fQx0MOJMD9ypgvpBr4eSySlzBWtjDIo8UDkZPcOL2v671Xyfi3MS-h0KgKZShN5kqWmJaQzCMnYYfZOAYfHcNw8NMmWSnUzOBIi_73MHv4D0mJG9pVJ8BLepFLvoqb0_F4NOEjVdqjgKl3CTjqD0043UPfcJ0mRJHiggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:34 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2fbeeb01-6630-4780-85f9-436234f0e124&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2df955eb-876d-4dd3-8a71-ec398da80200',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqdnCVpwLXZDnjTEwK2JT1sWPr5BAQAAAH6s8dgOAAAA; expires=Sun, 07-Nov-2021 03:05:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:34 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventHub/namespaces/mynamespacexxx/eventhubs/myeventhubxxx', {"properties":{"messageRetentionInDays":4,"partitionCount":4,"status":"Active","captureDescription":{"enabled":true,"encoding":"Avro","intervalInSeconds":120,"sizeLimitInBytes":10485763,"destination":{"name":"EventHubArchive.AzureBlockBlob","properties":{"storageAccountResourceId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/mystorageaccountxxx","blobContainer":"container","archiveNameFormat":"{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}"}}}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4f2ff365fbedf5e4ee325be4cd2a9be678c1fef1eeddbbbb399acc090dfac2fc4e9f7f34fa08cd08c7eec7edf50a1f473a79412f30dce6aef9aca117ca6a9a617cf4d269d6b4e957afe943c27695d76d91371f3dfac51fd17b4d7691bfca5b7a8d9a9e2d9f66d7f4cd3e35cca8153e3ba9d6cb963f6adaac5dd3b71f1d4fdbe2322768d33acfda7c764cdf7fb4b7b3b7bbbdbbb3bd73f066e7dea39dfb8fee1d8cefeddefb296ab65ecd869beddf1bdf7ff800cd6c976733eae57b1fedd067bbf4ff3dfaffbd8fbe4fdd65ab765de74f733b771844becc26654ed3dad6eb7c447f4eab59b1bca0be8e2feb8ade9dd134154ba5c52f36f435a43aaea7731acdf8f80704fa0911ed2dfd33a1d74252356d5513a98ea753d0e39532c31975fbb3ce4dafa5ebbb210a78493fc9e413e19309617f522ddbac58e6356137b5bf8f3eca64ac60986755bdc83021bf187f31fbfc92bbbfd810857e7de96683fefa7df2aca61f5f10b039fd2436a17fbf4d43a01f5f14cb758bb75fe7d4d9ec977cf44b7ec9e8a362d9e6f565569e2de55322e2eede0e3151f183fc79b128dab3e5936b1a327dbcb37f70ffc1a7f77ec92ff925","ff0f01cc50bb9f030000"], [
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
  'ddfde8aa-7b23-4d69-8fd6-9d393b9d5e90_M4SN1_M4SN1',
  'Server-SB',
  'Service-Bus-Resource-Provider/SN1',
  'Server',
  'Service-Bus-Resource-Provider/SN1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  'f453c9f1-2df5-4e01-a7dc-17b4def54fd2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211008T030544Z:f453c9f1-2df5-4e01-a7dc-17b4def54fd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 08 Oct 2021 03:05:43 GMT'
]);
