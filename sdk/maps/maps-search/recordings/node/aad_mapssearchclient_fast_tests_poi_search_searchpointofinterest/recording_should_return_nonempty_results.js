let nock = require('nock');

module.exports.hash = "2a5b88549ca3ff0151d9a519de916346";

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
  'd1321f42-b1aa-4a5a-b283-74cd62757400',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhVvfY7krY1GsqFqLxTtlO0; expires=Sat, 09-Apr-2022 06:34:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPLsT4nwwns7XoDxmhlPB7l0w-SF04e0YYzomlwFH00aDfwgIaFam3_HjP92ZODOSGpuWcljTYnDpvEQys-hdDq7aoFpiCvK7oTsdkb5b3TzDoC2IMFEjdU3OSZF5wKcpCiMpOGvHsPm1w6B_eNVWez-dmAdeeE9WtLLVnonzY6sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:10 GMT',
  'Content-Length',
  '980'
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
  '4c70f0e2-9ca2-4677-a93b-4f7a58d4c100',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ao2ZWRDWal9FrcgLvsnVYhQ; expires=Sat, 09-Apr-2022 06:34:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcR3UBt4rYbzbV248azDgtpAQvF8OXOAs-L6zKD0CuJQVDX1IQKk_0kLb28EV6Hk-DI7fiRwJ99y_i4Q4LoNd9eOPnFGhWe5z5K7vxT_9Fgi2ylwUBcdrcYiLynl6tRB-v_gf-4B6eS2XIOxMaPTXBiOvYdIIAGBsdJwqgYuNUEcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:11 GMT',
  'Content-Length',
  '1753'
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
  '65d5b215-28ed-4de0-88b2-41782e91c900',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmMYLBiQxJxCgmRFZ2-YUoM; expires=Sat, 09-Apr-2022 06:34:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevre0p6ieDlvBImfWhVkUK67W0GaClLh8gBYTwk87Xe37XmQ84DQzkoBtPB8hTBYlevz541K556ZOZ3qyayvZQLi4lpRwgqpwvtXEm47wp3gaRQ6J1h6vn331nLr5ENheez3bnzBL7mkZhLQxBfGgAeBsKdCWV_EyUWvFWYXV5KMiQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:10 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d72e4ef5-201e-4f2f-b9ca-6f7a357d7699&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'b237702d-8273-4c99-b7c6-15808e9b8e00',
  'x-ms-ests-server',
  '2.1.12529.17 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvlKapWiyCJNrX3qkbUsBuqr4fIWAQAAAOKSu9kOAAAA; expires=Sat, 09-Apr-2022 06:34:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:10 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d0526b38-ef76-4cf4-b87b-7e41e1556340&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '3e718a8b-b8be-43cb-81a3-ad5db463da00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag2BwUG6sKtKlbkhG2wi_s2r4fIWAQAAAOKSu9kOAAAA; expires=Sat, 09-Apr-2022 06:34:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:11 GMT',
  'Content-Length',
  '1319'
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
  'Ref A: 02BE1B631CBF40309B109A4236F43BA0 Ref B: TPE30EDGE0415 Ref C: 2022-03-10T06:34:11Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:10 GMT'
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
  'Ref A: AD51CBD60CB647C98F58C5E0F87ACC43 Ref B: TPE30EDGE0620 Ref C: 2022-03-10T06:34:11Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:11 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/poi/json')
  .query(true)
  .reply(200, {"summary":{"query":"juice bars","queryType":"NON_NEAR","queryTime":6,"numResults":10,"offset":0,"totalResults":82884,"fuzzyLevel":1,"geoBias":{"lat":47.606038,"lon":-122.333345}},"results":[{"type":"POI","id":"840539003070354","score":5.6638941765,"dist":307.28239174523605,"info":"search:ta:840539003070354-US","poi":{"name":"Custom Smoothie","phone":"+1 206-708-6049","categorySet":[{"id":7315149}],"url":"www.customsmoothie.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"719","streetName":"2nd Avenue","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-1700","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"719 2nd Avenue, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.6033,"lon":-122.3339},"viewport":{"topLeftPoint":{"lat":47.6042,"lon":-122.33523},"btmRightPoint":{"lat":47.6024,"lon":-122.33257}},"entryPoints":[{"type":"main","position":{"lat":47.60345,"lon":-122.33359}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjZhMTA0OGY5NjRhNTIwMjFjNTJiZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840539003133402","score":5.6638784409,"dist":341.45506360030663,"info":"search:ta:840539003133402-US","poi":{"name":"Cocoa Banana","phone":"+1 206-903-0224","categorySet":[{"id":7315149}],"url":"cocoabanana.com/","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"118","streetName":"Cherry Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-2206","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"118 Cherry Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60298,"lon":-122.33376},"viewport":{"topLeftPoint":{"lat":47.60388,"lon":-122.33509},"btmRightPoint":{"lat":47.60208,"lon":-122.33243}},"entryPoints":[{"type":"main","position":{"lat":47.60285,"lon":-122.33364}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YmQwYjM1NGE4YjNhNTkzNTk2ZTY0NWY=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840537000017031","score":5.6636886597,"dist":619.5861082929217,"info":"search:ta:840537000017031-US","poi":{"name":"Ellenos Real Greek Yogurt","phone":"+1 206-625-5006","categorySet":[{"id":7315149}],"url":"www.ellenos.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"1500","streetName":"Pike Street","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-2025","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1500 Pike Street, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.60885,"lon":-122.34048},"viewport":{"topLeftPoint":{"lat":47.60975,"lon":-122.34181},"btmRightPoint":{"lat":47.60795,"lon":-122.33915}},"entryPoints":[{"type":"main","position":{"lat":47.60876,"lon":-122.34044}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1MWQ5Y2I0ZDQ5OGU3MTY5MTAwNTQxOGQ=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840539002169004","score":5.6636214256,"dist":691.859624080263,"info":"search:ta:840539002169004-US","poi":{"name":"Rachel's Ginger Beer","phone":"+1 206-467-4924","categorySet":[{"id":7315149}],"url":"rachelsgingerbeer.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"1530","streetName":"Post Alley","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-1516","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1530 Post Alley, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.60939,"lon":-122.34112},"viewport":{"topLeftPoint":{"lat":47.61029,"lon":-122.34245},"btmRightPoint":{"lat":47.60849,"lon":-122.33979}},"entryPoints":[{"type":"main","position":{"lat":47.60933,"lon":-122.34126}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1MWMxMjg2ZjQ5OGUyNTA1ZmQ3NjRmYmU=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840539003171137","score":5.663602829,"dist":711.0267964307217,"info":"search:ta:840539003171137-US","poi":{"name":"The Juice Emporium","categorySet":[{"id":7315149}],"categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetName":"Pike Place","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-1527","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Pike Place, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.60928,"lon":-122.34152},"viewport":{"topLeftPoint":{"lat":47.61018,"lon":-122.34285},"btmRightPoint":{"lat":47.60838,"lon":-122.34019}},"entryPoints":[{"type":"main","position":{"lat":47.60926,"lon":-122.34153}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YmE1MmZmZGY5NjRhNTIwNTdlOTM4ZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840539001755244","score":5.6635766029,"dist":735.6569863031766,"info":"search:ta:840539001755244-US","poi":{"name":"Pressed Juicery","phone":"+1 206-624-0804","brands":[{"name":"Pressed Juicery"}],"categorySet":[{"id":7315149}],"url":"www.pressedjuicery.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"400","streetName":"Pine Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-1628","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Pine Street, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.61198,"lon":-122.33766},"viewport":{"topLeftPoint":{"lat":47.61288,"lon":-122.33899},"btmRightPoint":{"lat":47.61108,"lon":-122.33633}},"entryPoints":[{"type":"main","position":{"lat":47.61151,"lon":-122.33695}},{"type":"minor","position":{"lat":47.61232,"lon":-122.33822}},{"type":"main","position":{"lat":47.61132,"lon":-122.33743}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1ODUxZjNhZTAwMzdlYjFkMzVjYmNlZTg=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840539000974360","score":5.6633687019,"dist":913.8394232864273,"info":"search:ta:840539000974360-US","poi":{"name":"Juicy Cafe","phone":"+1 206-467-5501","categorySet":[{"id":7315149}],"url":"www.thejuicycafe.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"720","streetName":"Olive Way","municipalitySubdivision":"Belltown","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98101","extendedPostalCode":"98101-1801","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"720 Olive Way, Seattle, WA 98101","localName":"Seattle"},"position":{"lat":47.6142,"lon":-122.33477},"viewport":{"topLeftPoint":{"lat":47.6151,"lon":-122.3361},"btmRightPoint":{"lat":47.6133,"lon":-122.33344}},"entryPoints":[{"type":"main","position":{"lat":47.61391,"lon":-122.33448}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NjQ0ZjBiYTQ5OGVhNTQwYzBjNTQ1NjA=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840537000017213","score":5.6633033752,"dist":962.5243573168053,"info":"search:ta:840537000017213-US","poi":{"name":"Jamba Juice-Madison","brands":[{"name":"Jamba Juice"}],"categorySet":[{"id":7315149}],"categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"1303","streetName":"Madison Street","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-3507","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1303 Madison Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.61024,"lon":-122.32212},"viewport":{"topLeftPoint":{"lat":47.61114,"lon":-122.32345},"btmRightPoint":{"lat":47.60934,"lon":-122.32079}},"entryPoints":[{"type":"main","position":{"lat":47.61051,"lon":-122.32237}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YWQ0YWUwNmY5NjRhNTIwYTRlODIwZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840539003088510","score":5.6631345749,"dist":1079.1808792891181,"info":"search:ta:840539003088510-US","poi":{"name":"Ellenos Real Greek Yogurt","categorySet":[{"id":7315149}],"categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"600","streetName":"5th Avenue South","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-3897","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"600 5th Avenue South, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.59716,"lon":-122.32753},"viewport":{"topLeftPoint":{"lat":47.59806,"lon":-122.32886},"btmRightPoint":{"lat":47.59626,"lon":-122.3262}},"entryPoints":[{"type":"main","position":{"lat":47.59716,"lon":-122.3277}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1M2M0MTc0ZTQ5OGUzYjVjY2IwY2Q2ODk=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840539001785236","score":5.6630911827,"dist":1106.941814792675,"info":"search:ta:840539001785236-US","poi":{"name":"Pressed Juicery","phone":"+1 206-453-3785","brands":[{"name":"Pressed Juicery"}],"categorySet":[{"id":7315149}],"url":"www.pressedjuicery.com","categories":["restaurant","yogurt/juice bar"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"yogurt/juice bar"}]}]},"address":{"streetNumber":"315","streetName":"East Pine Street","municipalitySubdivision":"Broadway","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98122","extendedPostalCode":"98122-2028","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"315 East Pine Street, Seattle, WA 98122","localName":"Seattle"},"position":{"lat":47.61509,"lon":-122.3272},"viewport":{"topLeftPoint":{"lat":47.61599,"lon":-122.32853},"btmRightPoint":{"lat":47.61419,"lon":-122.32587}},"entryPoints":[{"type":"main","position":{"lat":47.61523,"lon":-122.32721}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1OTliNDg4NThkMGE1MzYxZWZlMzI4NDY=","sourceName":"Foursquare"}]}}]}, [
  'Content-Length',
  '12414',
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
  'Ref A: 6DAFD56900654FB59C5F166B5078B8BD Ref B: TPE30EDGE0408 Ref C: 2022-03-10T06:34:11Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:11 GMT'
]);
