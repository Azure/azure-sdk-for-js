let nock = require('nock');

module.exports.hash = "cac76fae3bb2f2ec5ffc06310bea8c4f";

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
  'b0f81dad-b2de-42a2-8203-af4e20601800',
  'x-ms-ests-server',
  '2.1.12507.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApvhTkSD3UBIqx0RCAOY88I; expires=Thu, 24-Mar-2022 10:21:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPvGuY9BMf6Dca7VLUIMgNvt3hchH7DXICENgeB6gpmlBUfJXRyS5BnYwVnWT6two_sG5VUaIYT6-z9g8u8JMMsA6ACYHyioWOL4mrEiRojUkxTwuCO8yZPkRi3Ux1UzOS74x9q6DJLU7K9vKx7of9bL8W_V-EM7uK1IgOnK3lP8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:45 GMT',
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
  'd5d7c1cd-f81e-45d0-8548-ae2bc32e9100',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiIqMq0PzXVHpKGf2MkMtfo; expires=Thu, 24-Mar-2022 10:21:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrjo8SSZfX6ng5x5jqFDGUzoH2NYF3QRycjUswmLP2M9lS4zVw8an2d_uVFeOLjZf2jnQP7ir4lvd6NWH8_W7DvJmuAbuMLu9qP_2vnyWFBMNNyDPm-oYwrttenAL0WAi9kj-r3KU8s-WcwTm_8iFj58RzyUlC8iLWFtRHBsw_6ykgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:45 GMT',
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
  '250d0075-41b5-4f00-b484-f342aa109600',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AoJpZxWATV9Hqmr_gFYyV1g; expires=Thu, 24-Mar-2022 10:21:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQoRhZ7lW3t-55X-LXvBMPrwXUCdDqiA1k9-gFEI5U8B-krZAroReac9cjGBC3AAbqolXXx-i5WSeMLjeLXGYRjOY_Ajy3aU3V8zQvlfn9iqKuR0tokcb9thDNfR2_UTKoBlDaa81EtGn5ZLSPUqP2OSvPcQ_ob814rNO4Kb6aQYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:45 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5f5c754a-b67c-48a9-a488-da00cd719ce2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '9d5bd505-7f94-4b12-91c9-0132bb376501',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtJCHpgTxLFCqJcwvGAy3UM; expires=Thu, 24-Mar-2022 10:21:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:45 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ba50f2a1-451a-4858-9712-a9b07230ee2f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '0dba3cef-0936-4078-ba20-cf72e8b82001',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Avou_5ZhEwtGv-insSpxXkY; expires=Thu, 24-Mar-2022 10:21:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:45 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/geometry/json', {"geometry":{"type":"Polygon","coordinates":[[[-122.43576049804686,37.7524152343544],[-122.43301391601562,37.70660472542312],[-122.36434936523438,37.712059855877314],[-122.43576049804686,37.7524152343544]]]}})
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
  'Ref A: A703EEC22CD24637B92DC6F9A2FD1943 Ref B: TYO01EDGE1715 Ref C: 2022-02-22T10:21:46Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:46 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/geometry/json', {"geometry":{"type":"Polygon","coordinates":[[[-122.43576049804686,37.7524152343544],[-122.43301391601562,37.70660472542312],[-122.36434936523438,37.712059855877314],[-122.43576049804686,37.7524152343544]]]}})
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":5,"numResults":10,"offset":0,"totalResults":18,"fuzzyLevel":1},"results":[{"type":"POI","id":"840069020866687","score":2.1455571651,"info":"search:ta:840069020866687-US","poi":{"name":"Wood Fired Pizza","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Peralta Avenue","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Peralta Avenue, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73537,"lon":-122.41061},"viewport":{"topLeftPoint":{"lat":37.73627,"lon":-122.41175},"btmRightPoint":{"lat":37.73447,"lon":-122.40947}},"entryPoints":[{"type":"main","position":{"lat":37.73524,"lon":-122.41059}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZTQ2YWU0YzQ4M2IwM2QwOTBlMzJmNWM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019255788","score":2.1455390453,"info":"search:ta:840069019255788-US","poi":{"name":"Bernal Heights Pizzeria","phone":"+1 415-400-5644","categorySet":[{"id":7315036}],"url":"www.bernalheightspizzeria.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"59","streetName":"30th Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5401","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"59 30th Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74222,"lon":-122.42313},"viewport":{"topLeftPoint":{"lat":37.74312,"lon":-122.42427},"btmRightPoint":{"lat":37.74132,"lon":-122.42199}},"entryPoints":[{"type":"main","position":{"lat":37.74234,"lon":-122.42268}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1MjkyYWY2NTExZDI2NGM1ODdiOGE4ODM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069002602194","score":2.1454770565,"info":"search:ta:840069002602194-US","poi":{"name":"Round Table Pizza","phone":"+1 415-586-1200","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"https://ordering.roundtablepizza.com/Site/rtsf","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"4523","streetName":"Mission Street","municipalitySubdivision":"Mission Terrace","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94112","extendedPostalCode":"94112-2600","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4523 Mission Street, San Francisco, CA 94112","localName":"San Francisco"},"position":{"lat":37.72572,"lon":-122.43368},"viewport":{"topLeftPoint":{"lat":37.72662,"lon":-122.43482},"btmRightPoint":{"lat":37.72482,"lon":-122.43254}},"entryPoints":[{"type":"main","position":{"lat":37.72585,"lon":-122.43393}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0Yzc5ODcyNjNiYWRiMWY3ODA3ODRmNTQ=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019316011","score":2.1454670429,"info":"search:ta:840069019316011-US","poi":{"name":"Round Table Pizza","phone":"+1 415-468-7100","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"www.roundtablepizza.com/rtp/store.asp?store_num=488","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"2660","streetName":"San Bruno Avenue","municipalitySubdivision":"Portola","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94134","extendedPostalCode":"94134-1500","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2660 San Bruno Avenue, San Francisco, CA 94134","localName":"San Francisco"},"position":{"lat":37.7279,"lon":-122.40406},"viewport":{"topLeftPoint":{"lat":37.7288,"lon":-122.4052},"btmRightPoint":{"lat":37.727,"lon":-122.40292}},"entryPoints":[{"type":"main","position":{"lat":37.72798,"lon":-122.40375}},{"type":"main","position":{"lat":37.72802,"lon":-122.40377}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YzM2MWMyODJjODAyMGExMDdjMzg2MDA=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019184903","score":2.1454501152,"info":"search:ta:840069019184903-US","poi":{"name":"Pizza Joint","phone":"+1 415-467-4100","categorySet":[{"id":7315036}],"url":"pizzajointsf.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"2414","streetName":"San Bruno Avenue","municipalitySubdivision":"Portola","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94134","extendedPostalCode":"94134-1503","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2414 San Bruno Avenue, San Francisco, CA 94134","localName":"San Francisco"},"position":{"lat":37.73194,"lon":-122.40576},"viewport":{"topLeftPoint":{"lat":37.73284,"lon":-122.4069},"btmRightPoint":{"lat":37.73104,"lon":-122.40462}},"entryPoints":[{"type":"main","position":{"lat":37.73203,"lon":-122.40543}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YWYxZTUxOGY5NjRhNTIwMzRlNDIxZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019388007","score":2.1454474926,"info":"search:ta:840069019388007-US","poi":{"name":"Pizza Hut","phone":"+1 415-641-0400","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"url":"https://locations.pizzahut.com/ca/san-francisco/3349-mission-st","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3349","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5008","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3349 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74325,"lon":-122.42113},"viewport":{"topLeftPoint":{"lat":37.74415,"lon":-122.42227},"btmRightPoint":{"lat":37.74235,"lon":-122.41999}},"entryPoints":[{"type":"main","position":{"lat":37.74334,"lon":-122.42134}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjhmMGIxN2Y5NjRhNTIwMmE0NjMzZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069006941877","score":2.1454372406,"info":"search:ta:840069006941877-US","poi":{"name":"Cecilia's Pizza Restaurant","phone":"+1 415-821-5852","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3515","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5429","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3515 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74069,"lon":-122.42269},"viewport":{"topLeftPoint":{"lat":37.74159,"lon":-122.42383},"btmRightPoint":{"lat":37.73979,"lon":-122.42155}},"entryPoints":[{"type":"main","position":{"lat":37.7408,"lon":-122.42298}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NTU2YWRlODQ5OGVkNTFmNmVmNzc2NjA=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069005708438","score":2.145428896,"info":"search:ta:840069005708438-US","poi":{"name":"Mama Mia Pizza","phone":"+1 415-400-4900","categorySet":[{"id":7315036}],"url":"www.mamamiapizzas.com/zgrid/themes/13108/portal/index.jsp","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3839","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5831","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3839 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73548,"lon":-122.42454},"viewport":{"topLeftPoint":{"lat":37.73638,"lon":-122.42568},"btmRightPoint":{"lat":37.73458,"lon":-122.4234}},"entryPoints":[{"type":"main","position":{"lat":37.73552,"lon":-122.42465}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NzVhNTk1NWNkMTAzNzE2NjEzNjEwZGU=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019390419","score":2.1454286575,"info":"search:ta:840069019390419-US","poi":{"name":"Zante Pizza","phone":"+1 415-821-3949","categorySet":[{"id":7315036}],"url":"zantepizzaandindian.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3489","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5438","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3489 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74104,"lon":-122.42244},"viewport":{"topLeftPoint":{"lat":37.74194,"lon":-122.42358},"btmRightPoint":{"lat":37.74014,"lon":-122.4213}},"entryPoints":[{"type":"main","position":{"lat":37.74116,"lon":-122.42274}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0NDc4ZWVlZWY5NjRhNTIwZDIzMzFmZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019116268","score":2.1454253197,"info":"search:ta:840069019116268-US","poi":{"name":"Red's Pizzeria","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3839","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5831","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3839 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73548,"lon":-122.42454},"viewport":{"topLeftPoint":{"lat":37.73638,"lon":-122.42568},"btmRightPoint":{"lat":37.73458,"lon":-122.4234}},"entryPoints":[{"type":"main","position":{"lat":37.73552,"lon":-122.42465}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1YzkzMjMzYmNkNDQxYzAwMmM0MzgzNmU=","sourceName":"Foursquare"}]}}]}, [
  'Content-Length',
  '12230',
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
  'Ref A: 280D46812C59438C922DE150CA48AB7C Ref B: TYBEDGE0409 Ref C: 2022-02-22T10:21:46Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:46 GMT'
]);
