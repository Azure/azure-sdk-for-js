let nock = require('nock');

module.exports.hash = "391e9fe4dc5cd69077aee369c8743c07";

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
  '08d3d4bb-8173-4ff0-a4da-ecb3c4fff100',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AienZ3Lsyj1GjLEphFs4v2s; expires=Thu, 24-Mar-2022 10:21:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrN9jy--tvW5bOG_WkOLPCNLq9lgDw0yED6jlF_Vjn0CoCV4N4siHlOZXFVK8so8B4ZO1uW-0RUfRkg3f_uCBaLGcyXf9esfldiyums1MpvCFaDAs7P5SzAWF-J8qdtFTQ9LRZkH4liLij8h9A9Fq005G9zUBQu8o6o0Q36PLCgT8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:43 GMT',
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
  'ffa0436c-f8d6-497a-8763-188262bc1800',
  'x-ms-ests-server',
  '2.1.12507.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhqKBIL2i3dFgi-FVOpzWGM; expires=Thu, 24-Mar-2022 10:21:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZLJ2ZI0TFzhMvB01kRW8XuYbA0Ic44z_TEkE9WXJ1jtbW-wk7AMb4cTUOwOT73wobP5Wvydm5degQnuwsS6IgxAipbQAFPbc2Ti8osKjLyXqRoNsMB8dX62Mnfh5QQYgUl_sZqTnO9b5PvoF6h_cGWfvAlVMsAM11OOK4Rh1PPsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:42 GMT',
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
  'a6a47cb3-4a56-4dbc-8ace-fc8144148800',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Al-fgiWL9UlKpnxFVMOUzsI; expires=Thu, 24-Mar-2022 10:21:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrn4ZwyAtfhFISHcSJ6unAvMXoGoJ19WK5Gg9HkMYgoLKiU7UF8JqMZ3MDK02T4WMhnqPEcUwA75XHrOhN3Ttku4z-HU409LdAeLiWsZguL2Zk8MjnC9EOIO9q9FBx-Xg5cVlWMFhhHoAHhnu3yu6AXUin22DtZdz95ZaT1KeMiu0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:42 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c817ee53-fe29-4f16-a68e-1be6d8f32936&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '9d5bd505-7f94-4b12-91c9-013238376501',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aq_AWumY-YlGmuBOi3FNZU0; expires=Thu, 24-Mar-2022 10:21:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:43 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4a29b669-f46c-4fe5-a659-db96dd6cb3e6&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '0dba3cef-0936-4078-ba20-cf728eb82001',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkZuoLWoN4tBpXbOs7jygUI; expires=Thu, 24-Mar-2022 10:21:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:42 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/alongRoute/json', {"route":{"type":"LineString","coordinates":[[-122.143035,47.653536],[-122.187164,47.617556],[-122.114981,47.570599],[-122.132756,47.654009]]}})
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
  'Ref A: DAB82A46C07B4DD28627E0D26BF372D1 Ref B: TYBEDGE0409 Ref C: 2022-02-22T10:21:43Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:43 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/alongRoute/json', {"route":{"type":"LineString","coordinates":[[-122.143035,47.653536],[-122.187164,47.617556],[-122.114981,47.570599],[-122.132756,47.654009]]}})
  .query(true)
  .reply(200, {"summary":{"query":"burger","queryType":"NON_NEAR","queryTime":263,"numResults":10,"offset":0,"totalResults":10,"fuzzyLevel":1},"results":[{"type":"POI","id":"840539003143944","score":2.8276119232,"dist":269.1682087059635,"query":"burger","info":"search:ta:840539003143944-US","poi":{"name":"Burgers","categorySet":[{"id":7315069}],"categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"hamburgers"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"15701","streetName":"Northeast 39th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5391","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15701 Northeast 39th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64376,"lon":-122.1281},"viewport":{"topLeftPoint":{"lat":47.64491,"lon":-122.12981},"btmRightPoint":{"lat":47.64261,"lon":-122.12639}},"entryPoints":[{"type":"main","position":{"lat":47.64491,"lon":-122.1281}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1OWE1YmZlZDc1YTZlYTdmYTAxM2EyZmY=","sourceName":"Foursquare"}]},"detourTime":-435,"detourDistance":-20369},{"type":"POI","id":"840539000983176","score":2.7718887329,"dist":482.496255757968,"query":"burger","info":"search:ta:840539000983176-US","poi":{"name":"Gulliver's Burgers & Subs","phone":"+1 425-562-5115","categorySet":[{"id":7315015}],"categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"3080","streetName":"148th Avenue Southeast","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","extendedPostalCode":"98007-6410","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3080 148th Avenue Southeast, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.58202,"lon":-122.14049},"viewport":{"topLeftPoint":{"lat":47.58319,"lon":-122.14222},"btmRightPoint":{"lat":47.58085,"lon":-122.13876}},"entryPoints":[{"type":"main","position":{"lat":47.58104,"lon":-122.14143}}],"detourTime":-194,"detourDistance":-13374},{"type":"POI","id":"840539000289900","score":2.7963263988,"dist":1178.917994126377,"query":"burger","info":"search:ta:840539000289900-US","poi":{"name":"Herfy's Burger","phone":"+1 425-641-2003","categorySet":[{"id":7315015}],"url":"www.yelp.com/biz/herfys-burgers-redmond-2","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"15167","streetName":"Northeast 24th Street","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5544","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"15167 Northeast 24th Street, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.63149,"lon":-122.1388},"viewport":{"topLeftPoint":{"lat":47.63239,"lon":-122.14013},"btmRightPoint":{"lat":47.63059,"lon":-122.13747}},"entryPoints":[{"type":"main","position":{"lat":47.63149,"lon":-122.1388}}],"detourTime":7,"detourDistance":-6784},{"type":"POI","id":"840531000533803","score":2.7693781853,"dist":1127.9399853212014,"query":"burger","info":"search:ta:840531000533803-US","poi":{"name":"Wibbley's Gourmet Burgers","phone":"+1 425-747-7818","categorySet":[{"id":7315069}],"url":"wibbleys.com","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"hamburgers"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"2255","streetName":"140th Avenue Northeast","municipalitySubdivision":"Bel Red","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","extendedPostalCode":"98005-1819","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2255 140th Avenue Northeast, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.63066,"lon":-122.15504},"viewport":{"topLeftPoint":{"lat":47.63156,"lon":-122.15637},"btmRightPoint":{"lat":47.62976,"lon":-122.15371}},"entryPoints":[{"type":"main","position":{"lat":47.63066,"lon":-122.15374}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YTRkMGI3MWY5NjRhNTIwN2ZhZDFmZTM=","sourceName":"Foursquare"}]},"detourTime":157,"detourDistance":-6042},{"type":"POI","id":"840531000465150","score":2.8922204971,"dist":1754.9604168059973,"query":"burger","info":"search:ta:840531000465150-US","poi":{"name":"BURGER KING","phone":"+1 425-746-7508","brands":[{"name":"BURGER KING"}],"categorySet":[{"id":7315015}],"url":"burgerking.com/store-locator/store/restaurant_490","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"14620","streetName":"Northeast 24th Street","municipalitySubdivision":"Bridle Trails","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98007","extendedPostalCode":"98007-3723","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"14620 Northeast 24th Street, Bellevue, WA 98007","localName":"Bellevue"},"position":{"lat":47.63188,"lon":-122.14462},"viewport":{"topLeftPoint":{"lat":47.63278,"lon":-122.14595},"btmRightPoint":{"lat":47.63098,"lon":-122.14329}},"entryPoints":[{"type":"minor","position":{"lat":47.63188,"lon":-122.14458}},{"type":"main","position":{"lat":47.63155,"lon":-122.14461}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjBhZmIwZGY5NjRhNTIwMGMyYjIzZTM=","sourceName":"Foursquare"}]},"detourTime":161,"detourDistance":-5866},{"type":"POI","id":"840539002313210","score":2.8714032173,"dist":6356.878096760807,"query":"burger","info":"search:ta:840539002313210-US","poi":{"name":"BURGER KING","phone":"+1 425-392-5011","brands":[{"name":"BURGER KING"}],"categorySet":[{"id":7315015}],"url":"burgerking.com/store-locator/store/restaurant_2318","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"1705","streetName":"Northwest Gilman Boulevard","municipalitySubdivision":"Newport","municipality":"Issaquah","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98027","extendedPostalCode":"98027-5314","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1705 Northwest Gilman Boulevard, Issaquah, WA 98027","localName":"Issaquah"},"position":{"lat":47.54539,"lon":-122.06367},"viewport":{"topLeftPoint":{"lat":47.54629,"lon":-122.065},"btmRightPoint":{"lat":47.54449,"lon":-122.06234}},"entryPoints":[{"type":"main","position":{"lat":47.54571,"lon":-122.06365}},{"type":"minor","position":{"lat":47.54547,"lon":-122.06367}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjE5N2UyY2Y5NjRhNTIwNTJkZTIzZTM=","sourceName":"Foursquare"}]},"detourTime":187,"detourDistance":6857},{"type":"POI","id":"840531000465149","score":2.898733139,"dist":161.17565489389224,"query":"burger","info":"search:ta:840531000465149-US","poi":{"name":"BURGER KING","phone":"+1 425-453-5775","brands":[{"name":"BURGER KING"}],"categorySet":[{"id":7315015}],"url":"burgerking.com/store-locator/store/restaurant_2700","categories":["fast food","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"fast food"}]}]},"address":{"streetNumber":"11723","streetName":"Northeast 8th Street","municipalitySubdivision":"Willburton","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98005","extendedPostalCode":"98005-3003","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"11723 Northeast 8th Street, Bellevue, WA 98005","localName":"Bellevue"},"position":{"lat":47.61683,"lon":-122.18338},"viewport":{"topLeftPoint":{"lat":47.61773,"lon":-122.18471},"btmRightPoint":{"lat":47.61593,"lon":-122.18205}},"entryPoints":[{"type":"main","position":{"lat":47.61723,"lon":-122.1834}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjM2NzQyMmY5NjRhNTIwY2UzNTI1ZTM=","sourceName":"Foursquare"}]},"detourTime":198,"detourDistance":309},{"type":"POI","id":"840539002288639","score":2.7890250683,"dist":2963.10210231557,"query":"burger","info":"search:ta:840539002288639-US","poi":{"name":"Burgermaster","phone":"+1 425-827-9566","categorySet":[{"id":7315069}],"url":"burgermaster.biz","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"hamburgers"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"10606","streetName":"Northup Way","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98004","extendedPostalCode":"98004-1418","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"10606 Northup Way, Bellevue, WA 98004","localName":"Bellevue"},"position":{"lat":47.64224,"lon":-122.19906},"viewport":{"topLeftPoint":{"lat":47.64314,"lon":-122.20039},"btmRightPoint":{"lat":47.64134,"lon":-122.19773}},"entryPoints":[{"type":"main","position":{"lat":47.64205,"lon":-122.19927}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0NjRhM2MxMmY5NjRhNTIwYWQ0NjFmZTM=","sourceName":"Foursquare"}]},"detourTime":212,"detourDistance":1473},{"type":"POI","id":"840539003043271","score":2.7946410179,"dist":1600.029196161281,"query":"burger","info":"search:ta:840539003043271-US","poi":{"name":"Burger Brawler","phone":"+1 425-362-6071","categorySet":[{"id":9379006}],"categories":["cocktail bar","nightlife"],"classifications":[{"code":"NIGHTLIFE","names":[{"nameLocale":"en-US","name":"nightlife"},{"nameLocale":"en-US","name":"cocktail bar"}]}]},"address":{"streetNumber":"500","streetName":"Bellevue Way Northeast","municipality":"Bellevue","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98004","extendedPostalCode":"98004-5015","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"500 Bellevue Way Northeast, Bellevue, WA 98004","localName":"Bellevue"},"position":{"lat":47.61464,"lon":-122.20125},"viewport":{"topLeftPoint":{"lat":47.61554,"lon":-122.20258},"btmRightPoint":{"lat":47.61374,"lon":-122.19992}},"entryPoints":[{"type":"main","position":{"lat":47.61463,"lon":-122.20158}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1YTY0MmY4MmI5YTVhODJlOTVmMGUwMzI=","sourceName":"Foursquare"}]},"detourTime":235,"detourDistance":1147},{"type":"POI","id":"840539002366655","score":2.7806251049,"dist":4895.0590447372215,"query":"burger","info":"search:ta:840539002366655-US","poi":{"name":"Burger Addict","phone":"+1 425-305-5572","categorySet":[{"id":7315069}],"url":"www.burgeraddict.com","categories":["hamburgers","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"hamburgers"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"12016","streetName":"Northeast 85th Street","municipalitySubdivision":"North Rose Hill","municipality":"Kirkland","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98033","extendedPostalCode":"98033-8039","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"12016 Northeast 85th Street, Kirkland, WA 98033","localName":"Kirkland"},"position":{"lat":47.68023,"lon":-122.17996},"viewport":{"topLeftPoint":{"lat":47.68116,"lon":-122.18134},"btmRightPoint":{"lat":47.6793,"lon":-122.17858}},"entryPoints":[{"type":"main","position":{"lat":47.67931,"lon":-122.18013}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1YjkxZTM1YmM1MzA5MzAwMzk2NzhlNDA=","sourceName":"Foursquare"}]},"detourTime":392,"detourDistance":3097}]}, [
  'Content-Length',
  '12670',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding,X-HTTP-Method-Override',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: A3C0F38329C7422AA89BCCA11C07652E Ref B: TYAEDGE0409 Ref C: 2022-02-22T10:21:43Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:43 GMT'
]);
