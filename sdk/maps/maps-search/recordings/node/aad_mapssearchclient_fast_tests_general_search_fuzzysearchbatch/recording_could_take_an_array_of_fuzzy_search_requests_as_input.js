let nock = require('nock');

module.exports.hash = "3649b88484d17ebb99b6f490f31fb103";

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
  '59c4fd81-dabd-47d1-b3b4-25a920083800',
  'x-ms-ests-server',
  '2.1.12559.4 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApY-EPX4RwdNjcq4CPn0D8Y; expires=Sat, 09-Apr-2022 06:34:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLg2R5j3kSC4iuv71nEFKFqypSrlysJAA305O2zLu-z5ac00TBzDR5xB3tieBUV_UgmHWJ2q0n1UgEQZpgBEiww09LxAVjptxebLTHxBSlhi4TLYhWG14Elgetqmb4_K3U-0SCQD38tCitGdbaynBHI-c2nuuNIxoMGXdt5JaVoYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:15 GMT',
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
  'e8f78d04-30c0-46df-95dd-843444391500',
  'x-ms-ests-server',
  '2.1.12559.4 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkX8w2DD-QhIlUF0EunAmdI; expires=Sat, 09-Apr-2022 06:34:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjtW6Nnvtxp2COj82-GJUJHuV6XwdqyaywA9wLc2-nJHM78P2SB2smOIaEhcEPhgiswD5V7eLdWPRjg9UEoSTNdc0IltszPQ5a1wh9AYYhLXwhjdFuiQlCYoq2lvomxmnlfYUbMYUZuEqSiaNCV6nPJ5FY-P3S9mMYSaI5IW2N3UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:14 GMT',
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
  'aba8ae0b-af40-48be-abb0-728e1945da00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ail4gAiQoB5HutfUWY4YCKY; expires=Sat, 09-Apr-2022 06:34:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHXMNpodq7aLfyK9qYldB6u8DFSIOsSCAiigxxMeNKKup_qS1qYMe3n2OspP9Mw_iRMxb1wZ3CpUL7a-0Z_oANrvcPpnLdd6pkBfDj_Gu9Zrp91mjSMyUUQa2pzXPgD_9NG7JdPDclXM-_ho1r2ajdkD8W2KaAKrQtqCeGjZMQHIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:15 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9946bbc7-ae5a-4d18-865c-abc72402ff45&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '620793db-a298-4cbc-af48-636f23eecf00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aiabs00P2vZKr5gUa7illAA; expires=Sat, 09-Apr-2022 06:34:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:15 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1c4b0e4e-64b9-48ce-95d1-f1fa872a95ff&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2bd3fb43-db33-4dbe-83a8-be802138d000',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AofMQ0DfVeVAjzNh2Ptg_-ar4fIWAQAAAOaSu9kOAAAA; expires=Sat, 09-Apr-2022 06:34:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:15 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/fuzzy/batch/sync/json', {"batchItems":[]})
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"Number of queries must be between 1 and 100 inclusive."}}, [
  'Content-Length',
  '102',
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
  'Ref A: 4BC4B023171A40A6B65E85DFACF32BD6 Ref B: TPE30EDGE0620 Ref C: 2022-03-10T06:34:15Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:15 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/fuzzy/batch/sync/json', {"batchItems":[{"query":"?query=pizza&countrySet=fr"},{"query":"?query=pizza&lat=25&lon=121"},{"query":"?query=pizza&lat=25&lon=121&countrySet=tw"}]})
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":5,"numResults":10,"offset":0,"totalResults":19729,"fuzzyLevel":1},"results":[{"type":"POI","id":"250009007860031","score":2.1454398632,"info":"search:ta:250009007860031-FR","poi":{"name":"L'Olympe","phone":"+33 3 83 22 98 11","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"81","streetName":"Rue Raymond Poincaré","municipality":"Bouxières-aux-Dames","countrySecondarySubdivision":"Meurthe-et-Moselle","countrySubdivision":"Grand-Est","postalCode":"54136","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"81 Rue Raymond Poincaré, 54136 Bouxières-aux-Dames","localName":"Bouxières-aux-Dames"},"position":{"lat":48.75661,"lon":6.15534},"viewport":{"topLeftPoint":{"lat":48.75751,"lon":6.15398},"btmRightPoint":{"lat":48.75571,"lon":6.1567}},"entryPoints":[{"type":"main","position":{"lat":48.75664,"lon":6.15544}}]},{"type":"POI","id":"250009007858215","score":2.1454398632,"info":"search:ta:250009007858215-FR","poi":{"name":"Cinecittà","phone":"+33 3 88 92 02 07","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"9","streetName":"Rue du Marteau","municipality":"Sélestat","countrySecondarySubdivision":"Bas-Rhin","countrySubdivision":"Grand-Est","postalCode":"67600","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"9 Rue du Marteau, 67600 Sélestat","localName":"Sélestat"},"position":{"lat":48.25883,"lon":7.45525},"viewport":{"topLeftPoint":{"lat":48.25973,"lon":7.4539},"btmRightPoint":{"lat":48.25793,"lon":7.4566}},"entryPoints":[{"type":"main","position":{"lat":48.25875,"lon":7.45526}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZmI1NDM3ZWU0YjAxN2U2YTNjMzVlNmE=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009036791618","score":2.1454398632,"info":"search:ta:250009036791618-FR","poi":{"name":"Le Bernanos","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"1","streetName":"Rue des Ducs de Bar","municipality":"Bar-le-Duc","countrySecondarySubdivision":"Meuse","countrySubdivision":"Great East","postalCode":"55000","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"1 Rue des Ducs de Bar, 55000 Bar-le-Duc","localName":"Bar-le-Duc"},"position":{"lat":48.76903,"lon":5.1584},"viewport":{"topLeftPoint":{"lat":48.76993,"lon":5.15704},"btmRightPoint":{"lat":48.76813,"lon":5.15976}},"entryPoints":[{"type":"main","position":{"lat":48.76903,"lon":5.15843}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YzIzM2RlYzlhNjdhNTkzMGVhYmRkODc=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009007874522","score":2.1454398632,"info":"search:ta:250009007874522-FR","poi":{"name":"Pizza Mama Guilia","phone":"+33 6 34 46 17 97","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"36","streetName":"Route d'Avricourt","municipality":"Foulcrey","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57830","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"36 Route d'Avricourt, 57830 Foulcrey","localName":"Foulcrey"},"position":{"lat":48.64012,"lon":6.84804},"viewport":{"topLeftPoint":{"lat":48.64102,"lon":6.84668},"btmRightPoint":{"lat":48.63922,"lon":6.8494}},"entryPoints":[{"type":"main","position":{"lat":48.64012,"lon":6.84804}}]},{"type":"POI","id":"250009007840305","score":2.1454398632,"info":"search:ta:250009007840305-FR","poi":{"name":"Pizza Fredy","phone":"+33 3 82 53 84 97","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"7","streetName":"Rue de Thionville","municipality":"Kœnigsmacker","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57970","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"7 Rue de Thionville, 57970 Kœnigsmacker","localName":"Kœnigsmacker"},"position":{"lat":49.39552,"lon":6.27906},"viewport":{"topLeftPoint":{"lat":49.39642,"lon":6.27768},"btmRightPoint":{"lat":49.39462,"lon":6.28044}},"entryPoints":[{"type":"main","position":{"lat":49.39563,"lon":6.27891}}]},{"type":"POI","id":"250009008115964","score":2.1454398632,"info":"search:ta:250009008115964-FR","poi":{"name":"Pizz-3","phone":"+33 3 25 75 07 50","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"5","streetName":"Route d'Auxerre","municipality":"Saint-André-les-Vergers","countrySecondarySubdivision":"Aube","countrySubdivision":"Grand-Est","postalCode":"10120","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"5 Route d'Auxerre, 10120 Saint-André-les-Vergers","localName":"Saint-André-les-Vergers"},"position":{"lat":48.27819,"lon":4.06602},"viewport":{"topLeftPoint":{"lat":48.27909,"lon":4.06467},"btmRightPoint":{"lat":48.27729,"lon":4.06737}},"entryPoints":[{"type":"main","position":{"lat":48.27823,"lon":4.06598}}]},{"type":"POI","id":"250009002632510","score":2.1454398632,"info":"search:ta:250009002632510-FR","poi":{"name":"Pizza Hut","phone":"+33 825 03 00 30","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"url":"www.pizzahut.fr","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Rue de Verdun","municipality":"Troyes","countrySecondarySubdivision":"Aube","countrySubdivision":"Grand-Est","postalCode":"10000","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Rue de Verdun, 10000 Troyes","localName":"Troyes"},"position":{"lat":48.2816,"lon":4.07337},"viewport":{"topLeftPoint":{"lat":48.2825,"lon":4.07202},"btmRightPoint":{"lat":48.2807,"lon":4.07472}},"entryPoints":[{"type":"main","position":{"lat":48.2816,"lon":4.07332}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZTRhYTM3MTE4YTgzY2RhMzdkZWIwOWU=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009036815374","score":2.1454398632,"info":"search:ta:250009036815374-FR","poi":{"name":"Pizza et Saveurs-Pizzeria","phone":"+33 3 87 03 54 76","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"5","streetName":"Rue du Maréchal Foch","municipality":"Sarrebourg","countrySecondarySubdivision":"Moselle","countrySubdivision":"Grand-Est","postalCode":"57400","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"5 Rue du Maréchal Foch, 57400 Sarrebourg","localName":"Sarrebourg"},"position":{"lat":48.73522,"lon":7.05654},"viewport":{"topLeftPoint":{"lat":48.73612,"lon":7.05518},"btmRightPoint":{"lat":48.73432,"lon":7.0579}},"entryPoints":[{"type":"main","position":{"lat":48.73519,"lon":7.05648}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NTFkN2EzYzQ5OGU5ZTIyOWU1YzQzOGE=","sourceName":"Foursquare"}]}},{"type":"POI","id":"250009013316358","score":2.1454398632,"info":"search:ta:250009013316358-FR","poi":{"name":"Melypas","phone":"+33 3 83 22 64 02","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"77","streetName":"Rue Pascal","municipality":"Ludres","countrySecondarySubdivision":"Meurthe-et-Moselle","countrySubdivision":"Grand-Est","postalCode":"54710","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"77 Rue Pascal, 54710 Ludres","localName":"Ludres"},"position":{"lat":48.61893,"lon":6.17859},"viewport":{"topLeftPoint":{"lat":48.61983,"lon":6.17723},"btmRightPoint":{"lat":48.61803,"lon":6.17995}},"entryPoints":[{"type":"main","position":{"lat":48.61891,"lon":6.17865}}]},{"type":"POI","id":"250009013013838","score":2.1454398632,"info":"search:ta:250009013013838-FR","poi":{"name":"Restoland","phone":"+33 3 29 08 41 41","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Rue de Verdun","municipality":"Vittel","countrySecondarySubdivision":"Vosges","countrySubdivision":"Grand-Est","postalCode":"88800","countryCode":"FR","country":"France","countryCodeISO3":"FRA","freeformAddress":"Rue de Verdun, 88800 Vittel","localName":"Vittel"},"position":{"lat":48.20123,"lon":5.94625},"viewport":{"topLeftPoint":{"lat":48.20213,"lon":5.9449},"btmRightPoint":{"lat":48.20033,"lon":5.9476}},"entryPoints":[{"type":"main","position":{"lat":48.20124,"lon":5.94619}}]}]}},{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":86,"numResults":10,"offset":0,"totalResults":377521,"fuzzyLevel":1,"geoBias":{"lat":25,"lon":121}},"results":[{"type":"POI","id":"158009002150213","score":2.5349180698,"dist":11344.607999926191,"info":"search:ta:158009002150213-TW","poi":{"name":"Pizza Hut Hsinchu Hukou Store","phone":"+886 3 590 6000","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"79","streetName":"Chenggong Road","municipalitySubdivision":"Hukou Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"303","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"79, Chenggong Road, Hukou Township, Hsinchu County 303","localName":"Hukou Township"},"position":{"lat":24.90616,"lon":121.04416},"viewport":{"topLeftPoint":{"lat":24.90706,"lon":121.04317},"btmRightPoint":{"lat":24.90526,"lon":121.04515}},"entryPoints":[{"type":"main","position":{"lat":24.90617,"lon":121.04415}}]},{"type":"POI","id":"158009002168123","score":2.5341627598,"dist":11457.765315943818,"info":"search:ta:158009002168123-TW","poi":{"name":"Pizza Hut Taoyuan Xinwu Store","phone":"+886 3 497 0856","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"166","streetName":"Zhongshan Road","municipalitySubdivision":"Xinwu District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"327","extendedPostalCode":"32748","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"166, Zhongshan Road, Xinwu District, Taoyuan City 32748","localName":"Xinwu District"},"position":{"lat":24.97186,"lon":121.10936},"viewport":{"topLeftPoint":{"lat":24.97276,"lon":121.10837},"btmRightPoint":{"lat":24.97096,"lon":121.11035}},"entryPoints":[{"type":"main","position":{"lat":24.97178,"lon":121.1093}}]},{"type":"POI","id":"158009002154753","score":2.5293753147,"dist":12155.128902623723,"info":"search:ta:158009002154753-TW","poi":{"name":"Domino's Pizza Hukou Zhongzheng Restaurant","phone":"+886 3 590 5000","brands":[{"name":"Domino's"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"219","streetName":"Zhongzheng Road Section 1","municipalitySubdivision":"Hukou Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"303","extendedPostalCode":"30342","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"219, Zhongzheng Road Section 1, Hukou Township, Hsinchu County 30342","localName":"Hukou Township"},"position":{"lat":24.89952,"lon":121.04748},"viewport":{"topLeftPoint":{"lat":24.90042,"lon":121.04649},"btmRightPoint":{"lat":24.89862,"lon":121.04847}},"entryPoints":[{"type":"main","position":{"lat":24.89949,"lon":121.04738}}]},{"type":"POI","id":"158009002155612","score":2.5136804581,"dist":14255.151925689343,"info":"search:ta:158009002155612-TW","poi":{"name":"Pizza Hut Taoyuan Guanyin Store","phone":"+886 3 498 2118","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"907","streetName":"Zhongshan Road Section 2","municipalitySubdivision":"Guanyin District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"328","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"907, Zhongshan Road Section 2, Guanyin District, Taoyuan City 328","localName":"Guanyin District"},"position":{"lat":25.00985,"lon":121.14104},"viewport":{"topLeftPoint":{"lat":25.01075,"lon":121.14005},"btmRightPoint":{"lat":25.00895,"lon":121.14203}},"entryPoints":[{"type":"main","position":{"lat":25.00987,"lon":121.14097}}]},{"type":"POI","id":"158009002165414","score":2.5127086639,"dist":14377.7749022998,"info":"search:ta:158009002165414-TW","poi":{"name":"Domino's Pizza Guanyin Xinpo Store","phone":"+886 3 498 5822","brands":[{"name":"Domino's"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"967","streetName":"Zhongshan Road Section 2","municipalitySubdivision":"Guanyin District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"328","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"967, Zhongshan Road Section 2, Guanyin District, Taoyuan City 328","localName":"Guanyin District"},"position":{"lat":25.00911,"lon":121.14232},"viewport":{"topLeftPoint":{"lat":25.01001,"lon":121.14133},"btmRightPoint":{"lat":25.00821,"lon":121.14331}},"entryPoints":[{"type":"main","position":{"lat":25.00902,"lon":121.14225}}]},{"type":"POI","id":"158009001318102","score":2.5112905502,"dist":14555.434957206897,"info":"search:ta:158009001318102-TW","poi":{"name":"拿坡里新豐店","phone":"+886 3 559 0588","brands":[{"name":"Napoli"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"189-1","streetName":"新興路","municipalitySubdivision":"新豐鄉","municipality":"新竹縣","countrySubdivision":"台灣","postalCode":"304","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"189-1, 新興路, 新豐鄉, 新竹縣 304","localName":"新豐鄉"},"position":{"lat":24.86917,"lon":120.99528},"viewport":{"topLeftPoint":{"lat":24.87007,"lon":120.99429},"btmRightPoint":{"lat":24.86827,"lon":120.99627}},"entryPoints":[{"type":"main","position":{"lat":24.86907,"lon":120.99537}}]},{"type":"POI","id":"158009002152801","score":2.5110216141,"dist":14588.988689531341,"info":"search:ta:158009002152801-TW","poi":{"name":"Pizza Hut Hsinchu Xinfeng Store","phone":"+886 3 559 9111","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"171","streetName":"Xinxing Road","municipalitySubdivision":"Xinfeng Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"171, Xinxing Road, Xinfeng Township, Hsinchu County 30444","localName":"Xinfeng Township"},"position":{"lat":24.86889,"lon":120.99459},"viewport":{"topLeftPoint":{"lat":24.86979,"lon":120.9936},"btmRightPoint":{"lat":24.86799,"lon":120.99558}},"entryPoints":[{"type":"main","position":{"lat":24.86864,"lon":120.99483}}]},{"type":"POI","id":"158009001725073","score":2.5108249187,"dist":14613.472220701267,"info":"search:ta:158009001725073-TW","poi":{"name":"比薩家族50元比薩 新竹新豐店","phone":"+886 3 559 9095","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"171","streetName":"新興路","municipalitySubdivision":"新豐鄉","municipality":"新竹縣","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"171, 新興路, 新豐鄉, 新竹縣 30444","localName":"新豐鄉"},"position":{"lat":24.86867,"lon":120.99458},"viewport":{"topLeftPoint":{"lat":24.86957,"lon":120.99359},"btmRightPoint":{"lat":24.86777,"lon":120.99557}},"entryPoints":[{"type":"main","position":{"lat":24.86854,"lon":120.9947}}]},{"type":"POI","id":"158009002166980","score":2.5100557804,"dist":14708.95915754533,"info":"search:ta:158009002166980-TW","poi":{"name":"Domino's Pizza Xinfeng Xinxing Restaurant","phone":"+886 3 557 6611","brands":[{"name":"Domino's Pizza"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"146-15","streetName":"Xinxing Road","municipalitySubdivision":"Xinfeng Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"146-15, Xinxing Road, Xinfeng Township, Hsinchu County 30444","localName":"Xinfeng Township"},"position":{"lat":24.86782,"lon":120.99431},"viewport":{"topLeftPoint":{"lat":24.86872,"lon":120.99332},"btmRightPoint":{"lat":24.86692,"lon":120.9953}},"entryPoints":[{"type":"main","position":{"lat":24.86797,"lon":120.99415}}]},{"type":"POI","id":"158009001316049","score":2.4848582745,"dist":17649.691992150107,"info":"search:ta:158009001316049-TW","poi":{"name":"拿坡里楊梅店","phone":"+886 3 475 0200","brands":[{"name":"Napoli"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"184","streetName":"Dacheng Road","municipalitySubdivision":"Yangmei District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"326","extendedPostalCode":"32643","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"184, Dacheng Road, Yangmei District, Taoyuan City 32643","localName":"Yangmei District"},"position":{"lat":24.91224,"lon":121.14588},"viewport":{"topLeftPoint":{"lat":24.91314,"lon":121.14489},"btmRightPoint":{"lat":24.91134,"lon":121.14687}},"entryPoints":[{"type":"main","position":{"lat":24.91224,"lon":121.14578}}]}]}},{"statusCode":200,"response":{"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":7,"numResults":10,"offset":0,"totalResults":993,"fuzzyLevel":1,"geoBias":{"lat":25,"lon":121}},"results":[{"type":"POI","id":"158009002150213","score":2.5349180698,"dist":11344.607999926191,"info":"search:ta:158009002150213-TW","poi":{"name":"Pizza Hut Hsinchu Hukou Store","phone":"+886 3 590 6000","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"79","streetName":"Chenggong Road","municipalitySubdivision":"Hukou Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"303","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"79, Chenggong Road, Hukou Township, Hsinchu County 303","localName":"Hukou Township"},"position":{"lat":24.90616,"lon":121.04416},"viewport":{"topLeftPoint":{"lat":24.90706,"lon":121.04317},"btmRightPoint":{"lat":24.90526,"lon":121.04515}},"entryPoints":[{"type":"main","position":{"lat":24.90617,"lon":121.04415}}]},{"type":"POI","id":"158009002168123","score":2.5341627598,"dist":11457.765315943818,"info":"search:ta:158009002168123-TW","poi":{"name":"Pizza Hut Taoyuan Xinwu Store","phone":"+886 3 497 0856","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"166","streetName":"Zhongshan Road","municipalitySubdivision":"Xinwu District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"327","extendedPostalCode":"32748","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"166, Zhongshan Road, Xinwu District, Taoyuan City 32748","localName":"Xinwu District"},"position":{"lat":24.97186,"lon":121.10936},"viewport":{"topLeftPoint":{"lat":24.97276,"lon":121.10837},"btmRightPoint":{"lat":24.97096,"lon":121.11035}},"entryPoints":[{"type":"main","position":{"lat":24.97178,"lon":121.1093}}]},{"type":"POI","id":"158009002154753","score":2.5293753147,"dist":12155.128902623723,"info":"search:ta:158009002154753-TW","poi":{"name":"Domino's Pizza Hukou Zhongzheng Restaurant","phone":"+886 3 590 5000","brands":[{"name":"Domino's"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"219","streetName":"Zhongzheng Road Section 1","municipalitySubdivision":"Hukou Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"303","extendedPostalCode":"30342","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"219, Zhongzheng Road Section 1, Hukou Township, Hsinchu County 30342","localName":"Hukou Township"},"position":{"lat":24.89952,"lon":121.04748},"viewport":{"topLeftPoint":{"lat":24.90042,"lon":121.04649},"btmRightPoint":{"lat":24.89862,"lon":121.04847}},"entryPoints":[{"type":"main","position":{"lat":24.89949,"lon":121.04738}}]},{"type":"POI","id":"158009002155612","score":2.5136804581,"dist":14255.151925689343,"info":"search:ta:158009002155612-TW","poi":{"name":"Pizza Hut Taoyuan Guanyin Store","phone":"+886 3 498 2118","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"907","streetName":"Zhongshan Road Section 2","municipalitySubdivision":"Guanyin District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"328","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"907, Zhongshan Road Section 2, Guanyin District, Taoyuan City 328","localName":"Guanyin District"},"position":{"lat":25.00985,"lon":121.14104},"viewport":{"topLeftPoint":{"lat":25.01075,"lon":121.14005},"btmRightPoint":{"lat":25.00895,"lon":121.14203}},"entryPoints":[{"type":"main","position":{"lat":25.00987,"lon":121.14097}}]},{"type":"POI","id":"158009002165414","score":2.5127086639,"dist":14377.7749022998,"info":"search:ta:158009002165414-TW","poi":{"name":"Domino's Pizza Guanyin Xinpo Store","phone":"+886 3 498 5822","brands":[{"name":"Domino's"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"967","streetName":"Zhongshan Road Section 2","municipalitySubdivision":"Guanyin District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"328","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"967, Zhongshan Road Section 2, Guanyin District, Taoyuan City 328","localName":"Guanyin District"},"position":{"lat":25.00911,"lon":121.14232},"viewport":{"topLeftPoint":{"lat":25.01001,"lon":121.14133},"btmRightPoint":{"lat":25.00821,"lon":121.14331}},"entryPoints":[{"type":"main","position":{"lat":25.00902,"lon":121.14225}}]},{"type":"POI","id":"158009001318102","score":2.5112905502,"dist":14555.434957206897,"info":"search:ta:158009001318102-TW","poi":{"name":"拿坡里新豐店","phone":"+886 3 559 0588","brands":[{"name":"Napoli"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"189-1","streetName":"新興路","municipalitySubdivision":"新豐鄉","municipality":"新竹縣","countrySubdivision":"台灣","postalCode":"304","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"189-1, 新興路, 新豐鄉, 新竹縣 304","localName":"新豐鄉"},"position":{"lat":24.86917,"lon":120.99528},"viewport":{"topLeftPoint":{"lat":24.87007,"lon":120.99429},"btmRightPoint":{"lat":24.86827,"lon":120.99627}},"entryPoints":[{"type":"main","position":{"lat":24.86907,"lon":120.99537}}]},{"type":"POI","id":"158009002152801","score":2.5110216141,"dist":14588.988689531341,"info":"search:ta:158009002152801-TW","poi":{"name":"Pizza Hut Hsinchu Xinfeng Store","phone":"+886 3 559 9111","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"171","streetName":"Xinxing Road","municipalitySubdivision":"Xinfeng Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"171, Xinxing Road, Xinfeng Township, Hsinchu County 30444","localName":"Xinfeng Township"},"position":{"lat":24.86889,"lon":120.99459},"viewport":{"topLeftPoint":{"lat":24.86979,"lon":120.9936},"btmRightPoint":{"lat":24.86799,"lon":120.99558}},"entryPoints":[{"type":"main","position":{"lat":24.86864,"lon":120.99483}}]},{"type":"POI","id":"158009001725073","score":2.5108249187,"dist":14613.472220701267,"info":"search:ta:158009001725073-TW","poi":{"name":"比薩家族50元比薩 新竹新豐店","phone":"+886 3 559 9095","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"171","streetName":"新興路","municipalitySubdivision":"新豐鄉","municipality":"新竹縣","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"171, 新興路, 新豐鄉, 新竹縣 30444","localName":"新豐鄉"},"position":{"lat":24.86867,"lon":120.99458},"viewport":{"topLeftPoint":{"lat":24.86957,"lon":120.99359},"btmRightPoint":{"lat":24.86777,"lon":120.99557}},"entryPoints":[{"type":"main","position":{"lat":24.86854,"lon":120.9947}}]},{"type":"POI","id":"158009002166980","score":2.5100557804,"dist":14708.95915754533,"info":"search:ta:158009002166980-TW","poi":{"name":"Domino's Pizza Xinfeng Xinxing Restaurant","phone":"+886 3 557 6611","brands":[{"name":"Domino's Pizza"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"146-15","streetName":"Xinxing Road","municipalitySubdivision":"Xinfeng Township","municipality":"Hsinchu County","countrySubdivision":"台灣","postalCode":"304","extendedPostalCode":"30444","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"146-15, Xinxing Road, Xinfeng Township, Hsinchu County 30444","localName":"Xinfeng Township"},"position":{"lat":24.86782,"lon":120.99431},"viewport":{"topLeftPoint":{"lat":24.86872,"lon":120.99332},"btmRightPoint":{"lat":24.86692,"lon":120.9953}},"entryPoints":[{"type":"main","position":{"lat":24.86797,"lon":120.99415}}]},{"type":"POI","id":"158009001316049","score":2.4848582745,"dist":17649.691992150107,"info":"search:ta:158009001316049-TW","poi":{"name":"拿坡里楊梅店","phone":"+886 3 475 0200","brands":[{"name":"Napoli"}],"categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"184","streetName":"Dacheng Road","municipalitySubdivision":"Yangmei District","municipality":"Taoyuan City","countrySubdivision":"Taoyuan City","postalCode":"326","extendedPostalCode":"32643","countryCode":"TW","country":"Taiwan","countryCodeISO3":"TWN","freeformAddress":"184, Dacheng Road, Yangmei District, Taoyuan City 32643","localName":"Yangmei District"},"position":{"lat":24.91224,"lon":121.14588},"viewport":{"topLeftPoint":{"lat":24.91314,"lon":121.14489},"btmRightPoint":{"lat":24.91134,"lon":121.14687}},"entryPoints":[{"type":"main","position":{"lat":24.91224,"lon":121.14578}}]}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 7884B1B7AAEE4A84867CB800FE211D51 Ref B: TPE30EDGE0408 Ref C: 2022-03-10T06:34:15Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:15 GMT'
]);
