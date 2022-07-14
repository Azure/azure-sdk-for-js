let nock = require('nock');

module.exports.hash = "b8ff696d2919b1be471820acc7034dae";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '3f848277-925d-46c0-83dd-3b66313b7700',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Avsjyuwy1aZGgsB-NgBQz-o; expires=Sat, 13-Aug-2022 02:58:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfJu-1zDHmFW4YnZ5azGZo-z3ci6mclSlRkWIR5C2ll-xEhwapB2SAy-VQZPwrAWjaqQlm5ep3Haf-_ZHcc9ffKfcRev4nSUgkMN2AQwFmNIpx6vQknLN4msuA-MOaun4ZeUwlJ_FRBsJ-0mNHPH-G7Cb1vb0plBdDOw3eijBJEQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:47 GMT',
  'Content-Length',
  '1753'
]);

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
  '50344a5d-7ada-4dfe-b7bb-91f317983700',
  'x-ms-ests-server',
  '2.1.13201.7 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnlCV_ny9cVBuYn5Zd736OU; expires=Sat, 13-Aug-2022 02:58:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrL1CU8a2b7Cqpwh_w3XNscUDFuB_E5JHSMJChDOXNi4o21_sHsMWwH5DTfewQLDhaXyOn02oRJCmgVn2texwaZL2-i1JQy1kuVWylV029-QRJ-pnCViPLIB5lq5G_jqh6Z0riI7-FiSSw0nDbceKV49bTSLWCEaX9gtxcu1nsI3kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:47 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=04557667-8d45-4ca7-9e61-b6ce57d782a9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'ea4bab5b-2ff6-4e51-b1ee-2abf669a8800',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlFX2ikApDJGhpufHWECsqbhHQjEAQAAAGd9YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:47 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'd8f63320-73e3-452c-9dc4-e57142148600',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtRYpXFm5kdDmCSB1aKNgsg; expires=Sat, 13-Aug-2022 02:58:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmIClQqw_NZ0SOylwRv4117BC7NvF0imr3gxl5QL9-z3-e84YFDZ-NpTHy3MnMoOzlHZDMx8yWi6F0KB0ze0schZi71b3goT9oDDoSbaP-jM9PC6Md_DwISoX1jEutDR3TAXzVJHG8u54S5LK8QRZ_gAV9H1IhQ3ajnFlSkiTadkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/poi/json')
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"query is missing or empty"}}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 2294E04500A04D32AF25A7F3DBA4DC75 Ref B: TYBEDGE0909 Ref C: 2022-07-14T02:58:48Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:48 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/poi/json')
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"Invalid latitude. Latitude should be a float [-90, 90]."}}, [
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 204CF253AE74489F8BD9CF9BC8ED04DC Ref B: TYAEDGE0709 Ref C: 2022-07-14T02:58:48Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:48 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2c6ab979-d3e9-42b8-8109-08dd3ac9836d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '56d93251-2748-4d87-86cf-5837bf698100',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AhPm_MDrU-FLnXREOlFEJVDhHQjEAQAAAGh9YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:48 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/poi/json')
  .query(true)
  .reply(200, {"summary":{"query":"juice bars","queryType":"NON_NEAR","queryTime":72,"numResults":10,"offset":0,"totalResults":82645,"fuzzyLevel":1,"geoBias":{"lat":47.606038,"lon":-122.333345}},"results":[{"type":"POI","id":"840539003070354","score":5.6638941765,"dist":307.28239174523605,"info":"search:ta:840539003070354-US","poi":{"name":"Custom Smoothie","phone":"+1 206-708-6049","categorySet":[{"id":7315149}],"url":"www.customsmoothie.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"719","streetName":"2nd Avenue","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-1700","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"719 2nd Avenue, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.6033,"lon":-122.3339},"viewport":{"topLeftPoint":{"lat":47.6042,"lon":-122.33523},"btmRightPoint":{"lat":47.6024,"lon":-122.33257}},"entryPoints":[{"type":"main","position":{"lat":47.60345,"lon":-122.33357}}]},{"type":"POI","id":"840539003133402","score":5.6638793945,"dist":340.14950966095614,"info":"search:ta:840539003133402-US","poi":{"name":"Cocoa Banana","phone":"+1 206-903-0224","categorySet":[{"id":7315149}],"url":"cocoabanana.com/","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"118","streetName":"Cherry Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-2206","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"118 Cherry Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60299,"lon":-122.33373},"viewport":{"topLeftPoint":{"lat":47.60389,"lon":-122.33506},"btmRightPoint":{"lat":47.60209,"lon":-122.3324}},"entryPoints":[{"type":"main","position":{"lat":47.60285,"lon":-122.33364}}]},{"type":"POI","id":"840537000017031","score":5.6636886597,"dist":619.5861082929217,"info":"search:ta:840537000017031-US","poi":{"name":"Ellenos Real Greek Yogurt","phone":"+1 206-625-5006","categorySet":[{"id":7315149}],"url":"www.ellenos.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"1500","streetName":"Pike Street","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-2025","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1500 Pike Street, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.60885,"lon":-122.34048},"viewport":{"topLeftPoint":{"lat":47.60975,"lon":-122.34181},"btmRightPoint":{"lat":47.60795,"lon":-122.33915}},"entryPoints":[{"type":"main","position":{"lat":47.60876,"lon":-122.34044}}]},{"type":"POI","id":"840539002169004","score":5.6636214256,"dist":691.859624080263,"info":"search:ta:840539002169004-US","poi":{"name":"Rachel's Ginger Beer","phone":"+1 206-467-4924","categorySet":[{"id":7315149}],"url":"rachelsgingerbeer.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"1530","streetName":"Post Alley","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-1516","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1530 Post Alley, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.60939,"lon":-122.34112},"viewport":{"topLeftPoint":{"lat":47.61029,"lon":-122.34245},"btmRightPoint":{"lat":47.60849,"lon":-122.33979}},"entryPoints":[{"type":"main","position":{"lat":47.60933,"lon":-122.34126}}]},{"type":"POI","id":"840539003171137","score":5.663602829,"dist":710.5773794320052,"info":"search:ta:840539003171137-US","poi":{"name":"The Juice Emporium","categorySet":[{"id":7315149}],"categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetName":"Pike Place","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-1527","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pike Place, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.60934,"lon":-122.34146},"viewport":{"topLeftPoint":{"lat":47.61024,"lon":-122.34279},"btmRightPoint":{"lat":47.60844,"lon":-122.34013}},"entryPoints":[{"type":"main","position":{"lat":47.60926,"lon":-122.34153}}]},{"type":"POI","id":"840539001755244","score":5.6635766029,"dist":735.6569863031766,"info":"search:ta:840539001755244-US","poi":{"name":"Pressed Juicery","phone":"+1 206-624-0804","brands":[{"name":"Pressed Juicery"}],"categorySet":[{"id":7315149}],"url":"www.pressedjuicery.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"400","streetName":"Pine Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-1628","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Pine Street, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.61198,"lon":-122.33766},"viewport":{"topLeftPoint":{"lat":47.61288,"lon":-122.33899},"btmRightPoint":{"lat":47.61108,"lon":-122.33633}},"entryPoints":[{"type":"main","position":{"lat":47.61206,"lon":-122.33841}},{"type":"main","position":{"lat":47.61144,"lon":-122.33712}}]},{"type":"POI","id":"840539000974360","score":5.6633687019,"dist":913.8394232864273,"info":"search:ta:840539000974360-US","poi":{"name":"Juicy Cafe","phone":"+1 206-467-5501","categorySet":[{"id":7315149}],"url":"www.thejuicycafe.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"720","streetName":"Olive Way","municipalitySubdivision":"Belltown","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-1801","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"720 Olive Way, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.6142,"lon":-122.33477},"viewport":{"topLeftPoint":{"lat":47.6151,"lon":-122.3361},"btmRightPoint":{"lat":47.6133,"lon":-122.33344}},"entryPoints":[{"type":"main","position":{"lat":47.61391,"lon":-122.33448}}]},{"type":"POI","id":"840537000017213","score":5.6633033752,"dist":962.5243573168053,"info":"search:ta:840537000017213-US","poi":{"name":"Jamba Juice-Madison","brands":[{"name":"Jamba Juice"}],"categorySet":[{"id":7315149}],"categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"1303","streetName":"Madison Street","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-3507","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1303 Madison Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.61024,"lon":-122.32212},"viewport":{"topLeftPoint":{"lat":47.61114,"lon":-122.32345},"btmRightPoint":{"lat":47.60934,"lon":-122.32079}},"entryPoints":[{"type":"main","position":{"lat":47.61051,"lon":-122.32237}}]},{"type":"POI","id":"840539003088510","score":5.6631345749,"dist":1079.1808792891181,"info":"search:ta:840539003088510-US","poi":{"name":"Ellenos Real Greek Yogurt","categorySet":[{"id":7315149}],"categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"600","streetName":"5th Avenue South","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-3897","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"600 5th Avenue South, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.59716,"lon":-122.32753},"viewport":{"topLeftPoint":{"lat":47.59806,"lon":-122.32886},"btmRightPoint":{"lat":47.59626,"lon":-122.3262}},"entryPoints":[{"type":"main","position":{"lat":47.59716,"lon":-122.3277}}]},{"type":"POI","id":"840539001785236","score":5.6630911827,"dist":1106.941814792675,"info":"search:ta:840539001785236-US","poi":{"name":"Pressed Juicery","phone":"+1 206-453-3785","brands":[{"name":"Pressed Juicery"}],"categorySet":[{"id":7315149}],"url":"www.pressedjuicery.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"yogurt/juice bar"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"315","streetName":"East Pine Street","municipalitySubdivision":"Broadway","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98122","extendedPostalCode":"98122-2028","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"315 East Pine Street, Seattle, WA 98122","localName":"Seattle"},"position":{"lat":47.61509,"lon":-122.3272},"viewport":{"topLeftPoint":{"lat":47.61599,"lon":-122.32853},"btmRightPoint":{"lat":47.61419,"lon":-122.32587}},"entryPoints":[{"type":"main","position":{"lat":47.61523,"lon":-122.32721}}]}]}, [
  'Content-Length',
  '11202',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: B2009800D8064FDFA1C9420D7ABA8090 Ref B: TYAEDGE0709 Ref C: 2022-07-14T02:58:48Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:48 GMT'
]);
