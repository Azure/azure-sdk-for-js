let nock = require('nock');

module.exports.hash = "08f00ff4f43f33bc0869e66299dddd86";

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
  'a288a99e-516f-4e68-bc6a-f011bd451500',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ali-4mlgtgBPhS2m3YEadG4; expires=Fri, 24-Dec-2021 02:02:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3qmlIa0JbBTkylcNEI5Oewpnug0eEAU00EX-mHAzi9wI_GhbZc5haV08gjBqcYxjMFX7FIiydusddfBNJZwvzaPDikyOe9op3baDSNgHCsdVrO28iXXS5DdbfNiDsVQZe_7vGPab94v2ERwKVqoXaDhqwuvgsRVDw-si8eF_HNkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 24 Nov 2021 02:02:42 GMT',
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
  '055667e2-b61d-41bf-855f-5896296b1600',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Auc_POZU7QBBoHT9BDQH7UM; expires=Fri, 24-Dec-2021 02:02:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr9XTZms8MTZGcFWQLVmjnciZCq0_Bepz7jDSgbQaKiTweCjHPz_f0jzxh7SU1uhATRV_0W9HIGDM5sHjojBdg13A0ZtkKbhjo5w6QbL-f1A_LW4NhN5an3KaOATi721x1tNui7gypMvYZzqErlNWYtwGdcKb-FQSGEEs7bxTG0vQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 24 Nov 2021 02:02:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d5f8b504-5cd7-4088-ab72-16a4b2d98ba4&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd4c5ebe5-a43d-402b-a22f-9192047c1600',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AoKdoEEgmrhOuHxWySW7ze8WPr5BAQAAAESUL9kOAAAA; expires=Fri, 24-Dec-2021 02:02:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 24 Nov 2021 02:02:43 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.BotService/botServices/mybotxxx', {"location":"global","tags":{"tag1":"value1","tag2":"value2"},"sku":{"name":"S1"},"kind":"sdk","etag":"etag1","properties":{"displayName":"this is a test bot","description":"The description of the bot","endpoint":"https://bing.com/messages/","msaAppId":"41a220b9-6571-4f0b-bbd2-43f1c1d82f51","developerAppInsightKey":"59513bad-10a7-4d41-b4d0-b1c34c6af52a","developerAppInsightsApiKey":"w24iw5ocbhcig71su7ibaj63hey5ieaozeuwdv2r","developerAppInsightsApplicationId":"cf03484e-3fdb-4b5e-9ad7-94bde32e5a2b"}})
  .query(true)
  .reply(201, {"id":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.BotService/botServices/mybotxxx","name":"mybotxxx","type":"Microsoft.BotService/botServices","etag":"\"0b005103-0000-1800-0000-619d9d4f0000\"","location":"global","sku":{"name":"S1"},"kind":"sdk","tags":{"tag1":"value1","tag2":"value2"},"properties":{"displayName":"this is a test bot","description":"The description of the bot","iconUrl":"https://docs.botframework.com/static/devportal/client/images/bot-framework-default.png","endpoint":"https://bing.com/messages/","msaAppId":"41a220b9-6571-4f0b-bbd2-43f1c1d82f51","msaAppTenantId":null,"msaAppType":null,"msaAppMSIResourceId":null,"developerAppInsightKey":"59513bad-10a7-4d41-b4d0-b1c34c6af52a","developerAppInsightsApplicationId":"cf03484e-3fdb-4b5e-9ad7-94bde32e5a2b","luisAppIds":[],"endpointVersion":"3.0","configuredChannels":["webchat"],"enabledChannels":["webchat","directline"],"isDeveloperAppInsightsApiKeySet":true,"isStreamingSupported":false,"schemaTransformationVersion":"1.3","publishingCredentials":null,"parameters":null,"allSettings":null,"manifestUrl":null,"storageResourceId":null,"migrationToken":null,"isCmekEnabled":false,"cmekKeyVaultUrl":null,"openWithHint":null,"appPasswordHint":null,"isIsolated":false,"disableLocalAuth":false,"cmekEncryptionStatus":"Off","provisioningState":"Succeeded"},"zones":[]}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1384',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'ETag',
  '"0b005103-0000-1800-0000-619d9d4f0000"',
  'x-ms-request-id',
  'c4a13e28-9594-49f0-ace7-4142c5d42495',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  '6f588a49-bdf4-477f-8239-cb296051ee7a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211124T020257Z:6f588a49-bdf4-477f-8239-cb296051ee7a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 24 Nov 2021 02:02:57 GMT'
]);
