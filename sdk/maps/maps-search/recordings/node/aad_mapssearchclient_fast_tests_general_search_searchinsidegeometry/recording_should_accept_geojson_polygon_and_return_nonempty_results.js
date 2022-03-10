let nock = require('nock');

module.exports.hash = "134f1e9f5c3090c5b036876ab39eb0da";

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
  '28d0d3a2-0e74-48f9-a207-b9ce877e8000',
  'x-ms-ests-server',
  '2.1.12529.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AueVaN-nJRpDiRiU0oKk2Xc; expires=Sat, 09-Apr-2022 06:34:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcN9_uBzY_qZpswWskl6feFeUGTbADr6DQVISAtQL7aJfW-ez4CBGroXdZpZxaSMV6g9n7LaXbTrR6arr9Uq493YV8BBeEVj02R98V9ZVaF_Inxav9OiLylxh7KM-N5SxYD5KKfYQfkbbYcXiSD352PPEip59qgCtX3XTCDWIEaMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
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
  '2d276e23-6662-4d32-a903-8e689542ca00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnJuVucBAndHrMsMEkkJnTQ; expires=Sat, 09-Apr-2022 06:34:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrq8lXx4tqyqmL3qEkl0XHh0gyvYccWJcHVgKqbz3Q_rLhua8pwzzHMpig6p9el7F25TwIa0EF56c--xNAeOHAjRdeYP1ip-DREokGqrd5_68OFJwcBXqp1qpkET91tmIkOPak-TGbqUZCQWEhagVY3QGgB6I0J7uFqSsq2Kv8UpcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:16 GMT',
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
  '773343ac-35fa-4c0e-92b6-b220f63bbd00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsS4mVV9yvBDtWiEnBZmfaY; expires=Sat, 09-Apr-2022 06:34:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrowKJNnhH29bftH2rp1Mih-uNpbVY2T88xQLvaaadIFaIsmjnR3ljCepjPpkMC9sBvOu_z0qlSZMjFZt7WgBnh-mAbwMIlXj29Gw402koTEnlad9lCaySWe5uUbJ1t0iztQnLEotURfJNaO05OU9ixzQF2yj1aqUug63ILQfEQVAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
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
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=91f1b9ea-bae2-451e-a0c6-dc15e5d5f860&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2d276e23-6662-4d32-a903-8e68a042ca00',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqQ9A8NnFVtKiS7e3X2fzPar4fIWAQAAAOeSu9kOAAAA; expires=Sat, 09-Apr-2022 06:34:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:16 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6cab45b3-338d-4b5b-af43-2955da9d4c53&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '58e75afe-1542-4592-a277-505a9355d200',
  'x-ms-ests-server',
  '2.1.12529.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ajm6TypoIWBCt2ij33J_roE; expires=Sat, 09-Apr-2022 06:34:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 10 Mar 2022 06:34:16 GMT',
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
  'Ref A: B429AE8286D1437298090D64BE3E9895 Ref B: TPE30EDGE0408 Ref C: 2022-03-10T06:34:16Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:16 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/geometry/json', {"geometry":{"type":"Polygon","coordinates":[[[-122.43576049804686,37.7524152343544],[-122.43301391601562,37.70660472542312],[-122.36434936523438,37.712059855877314],[-122.43576049804686,37.7524152343544]]]}})
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":6,"numResults":10,"offset":0,"totalResults":18,"fuzzyLevel":1},"results":[{"type":"POI","id":"840069020866687","score":2.1454937458,"info":"search:ta:840069020866687-US","poi":{"name":"Wood Fired Pizza","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetName":"Peralta Avenue","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Peralta Avenue, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73537,"lon":-122.41061},"viewport":{"topLeftPoint":{"lat":37.73627,"lon":-122.41175},"btmRightPoint":{"lat":37.73447,"lon":-122.40947}},"entryPoints":[{"type":"main","position":{"lat":37.73524,"lon":-122.41059}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0ZTQ2YWU0YzQ4M2IwM2QwOTBlMzJmNWM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019390419","score":2.1454737186,"info":"search:ta:840069019390419-US","poi":{"name":"Zante Pizza","phone":"+1 415-821-3949","categorySet":[{"id":7315036}],"url":"zantepizzaandindian.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3489","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5438","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3489 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74104,"lon":-122.42244},"viewport":{"topLeftPoint":{"lat":37.74194,"lon":-122.42358},"btmRightPoint":{"lat":37.74014,"lon":-122.4213}},"entryPoints":[{"type":"main","position":{"lat":37.74116,"lon":-122.42274}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0NDc4ZWVlZWY5NjRhNTIwZDIzMzFmZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019716710","score":2.1454656124,"info":"search:ta:840069019716710-US","poi":{"name":"Gialina Pizzeria","phone":"+1 415-239-8500","categorySet":[{"id":7315036}],"url":"gialina.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"2842","streetName":"Diamond Street","municipalitySubdivision":"Glen Park","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94131","extendedPostalCode":"94131-3005","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2842 Diamond Street, San Francisco, CA 94131","localName":"San Francisco"},"position":{"lat":37.73404,"lon":-122.43416},"viewport":{"topLeftPoint":{"lat":37.73494,"lon":-122.4353},"btmRightPoint":{"lat":37.73314,"lon":-122.43302}},"entryPoints":[{"type":"main","position":{"lat":37.734,"lon":-122.43403}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YTQxNTA0NWY5NjRhNTIwMTVhNTFmZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019388007","score":2.1454637051,"info":"search:ta:840069019388007-US","poi":{"name":"Pizza Hut","phone":"+1 415-641-0400","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"url":"https://locations.pizzahut.com/ca/san-francisco/3349-mission-st","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3349","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5008","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3349 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74325,"lon":-122.42113},"viewport":{"topLeftPoint":{"lat":37.74415,"lon":-122.42227},"btmRightPoint":{"lat":37.74235,"lon":-122.41999}},"entryPoints":[{"type":"main","position":{"lat":37.74334,"lon":-122.42134}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YjhmMGIxN2Y5NjRhNTIwMmE0NjMzZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069019184903","score":2.1454563141,"info":"search:ta:840069019184903-US","poi":{"name":"Pizza Joint","phone":"+1 415-467-4100","categorySet":[{"id":7315036}],"url":"pizzajointsf.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"2414","streetName":"San Bruno Avenue","municipalitySubdivision":"Portola","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94134","extendedPostalCode":"94134-1503","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2414 San Bruno Avenue, San Francisco, CA 94134","localName":"San Francisco"},"position":{"lat":37.73194,"lon":-122.40576},"viewport":{"topLeftPoint":{"lat":37.73284,"lon":-122.4069},"btmRightPoint":{"lat":37.73104,"lon":-122.40462}},"entryPoints":[{"type":"main","position":{"lat":37.73203,"lon":-122.40543}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0YWYxZTUxOGY5NjRhNTIwMzRlNDIxZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069009046971","score":2.1454539299,"info":"search:ta:840069009046971-US","poi":{"name":"Pizza Express","phone":"+1 415-282-2333","categorySet":[{"id":7315036}],"url":"pizzaexpresssf.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"919","streetName":"Cortland Avenue","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5632","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"919 Cortland Avenue, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73913,"lon":-122.41367},"viewport":{"topLeftPoint":{"lat":37.74003,"lon":-122.41481},"btmRightPoint":{"lat":37.73823,"lon":-122.41253}},"entryPoints":[{"type":"main","position":{"lat":37.73895,"lon":-122.41365}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0Yjc5YjVkNmY5NjRhNTIwYmQwYzJmZTM=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069000105213","score":2.1454510689,"info":"search:ta:840069000105213-US","poi":{"name":"Ginny Pizzardi MFCC","phone":"+1 415-285-4061","categorySet":[{"id":7315036}],"url":"www.ginnypizzardi.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"4155","streetName":"24th Street","municipalitySubdivision":"Noe Valley","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94114","extendedPostalCode":"94114-3614","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4155 24th Street, San Francisco, CA 94114","localName":"San Francisco"},"position":{"lat":37.75098,"lon":-122.43527},"viewport":{"topLeftPoint":{"lat":37.75188,"lon":-122.43641},"btmRightPoint":{"lat":37.75008,"lon":-122.43413}},"entryPoints":[{"type":"main","position":{"lat":37.75123,"lon":-122.43528}}]},{"type":"POI","id":"840069002602194","score":2.145447731,"info":"search:ta:840069002602194-US","poi":{"name":"Round Table Pizza","phone":"+1 415-586-1200","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"https://ordering.roundtablepizza.com/Site/rtsf","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"4523","streetName":"Mission Street","municipalitySubdivision":"Mission Terrace","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94112","extendedPostalCode":"94112-2600","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4523 Mission Street, San Francisco, CA 94112","localName":"San Francisco"},"position":{"lat":37.72572,"lon":-122.43368},"viewport":{"topLeftPoint":{"lat":37.72662,"lon":-122.43482},"btmRightPoint":{"lat":37.72482,"lon":-122.43254}},"entryPoints":[{"type":"main","position":{"lat":37.72585,"lon":-122.43393}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo0Yzc5ODcyNjNiYWRiMWY3ODA3ODRmNTQ=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069005708438","score":2.1454458237,"info":"search:ta:840069005708438-US","poi":{"name":"Mama Mia Pizza","phone":"+1 415-400-4900","categorySet":[{"id":7315036}],"url":"www.mamamiapizzas.com/zgrid/themes/13108/portal/index.jsp","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3839","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5831","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3839 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73548,"lon":-122.42454},"viewport":{"topLeftPoint":{"lat":37.73638,"lon":-122.42568},"btmRightPoint":{"lat":37.73458,"lon":-122.4234}},"entryPoints":[{"type":"main","position":{"lat":37.73552,"lon":-122.42465}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NzVhNTk1NWNkMTAzNzE2NjEzNjEwZGU=","sourceName":"Foursquare"}]}},{"type":"POI","id":"840069006941877","score":2.1454410553,"info":"search:ta:840069006941877-US","poi":{"name":"Cecilia's Pizza Restaurant","phone":"+1 415-821-5852","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"restaurant"},{"nameLocale":"en-US","name":"pizza"}]}]},"address":{"streetNumber":"3515","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5429","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3515 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74069,"lon":-122.42269},"viewport":{"topLeftPoint":{"lat":37.74159,"lon":-122.42383},"btmRightPoint":{"lat":37.73979,"lon":-122.42155}},"entryPoints":[{"type":"main","position":{"lat":37.7408,"lon":-122.42298}}],"dataSources":{"poiDetails":[{"id":"Rm91cnNxdWFyZTo1NTU2YWRlODQ5OGVkNTFmNmVmNzc2NjA=","sourceName":"Foursquare"}]}}]}, [
  'Content-Length',
  '12015',
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
  'Ref A: 3A9DEE7AC0C94A0E8DE02A56A0C432B6 Ref B: TPE30EDGE0620 Ref C: 2022-03-10T06:34:16Z',
  'Date',
  'Thu, 10 Mar 2022 06:34:16 GMT'
]);
