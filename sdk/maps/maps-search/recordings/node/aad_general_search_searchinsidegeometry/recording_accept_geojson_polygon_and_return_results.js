let nock = require('nock');

module.exports.hash = "e17466ca6874e8bd27cfaf4ba851f281";

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
  '30974d52-cc8c-401f-9d13-fb8bf0803600',
  'x-ms-ests-server',
  '2.1.13201.7 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ap391ATj2YlElyZNzAQAnqQ; expires=Sat, 13-Aug-2022 02:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8vX9eKVe1d5KECPzQjR42XRqdVjVunvL-ozPLPs50T8drcGkyC_OMS1Jne2hiqL8Yo-uudDNWfLBWR6zFkXl8t1uC2iIl1CL33mlFsOzBfLXAn6C1UTcdl-QLGQjkCoeDMSJKnfh8TZXHyXXCW1lsmJMz5ixbeXcbvDiWtPyAtYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:52 GMT',
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
  '7bbf0cc0-ee02-427b-a817-bf493d3f8700',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqClrBg2UL9Ii2KhREfIDNg; expires=Sat, 13-Aug-2022 02:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5S2cKYiqDvPZEeVlHHknGbbJG8lY11zj9_X8ePajuAD1VrYmCWz4KQS8rNauPEWaHIuCv9HkOaWoQBeT6p6eLF6sfpgSEVVd1aZLyZJNpZhN15NccQhe2g9XYIvj-Gu2Mf56CYMixO8ET5L_Kf7RryN1fl30t-9cOGZJlWvNUpkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:52 GMT',
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
  '45360b1e-81cc-44e5-b18e-ef5718cb7d00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoCoYpDfVktAm9RaBscdVNk; expires=Sat, 13-Aug-2022 02:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpTPsBqlalZsK1OUhN9EYJwymLUAZmPZgnlbtjzBYdviex6f8KrChN-gvcmyIUmYorpypTM1HBRUNYAMiopYu0MqC2XN0TiYisowq1HBSbxK3wTfp9Qn1k3yeJxcyeq4L4D_OvCJfRopLe0r-pUBzcRwXp2gpX9nfHmPX1qoxI1wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:52 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=dc84212e-cc1a-49ff-8341-bae57620ef63&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '99304b9e-5915-4b5e-90fa-0e3a13b47d00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ak9Y_0dfRiJJotbyvEYr5jQ; expires=Sat, 13-Aug-2022 02:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:52 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=898aaac7-610a-4cba-9ab1-d648a8cb41ff&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'a9b09d82-0c37-496c-823c-3a5e72617c00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AjeP4L0XiF1JtFLtIESxpOHhHQjEAQAAAG19YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:52 GMT',
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
  'Ref A: 8425D4250C0F4CD1BB2D0077CF6A1814 Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:53Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:52 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/geometry/json', {"geometry":{"type":"Polygon","coordinates":[[[-122.43576049804686,37.7524152343544],[-122.43301391601562,37.70660472542312],[-122.36434936523438,37.712059855877314],[-122.43576049804686,37.7524152343544]]]}})
  .query(true)
  .reply(200, {"summary":{"query":"pizza","queryType":"NON_NEAR","queryTime":15,"numResults":10,"offset":0,"totalResults":18,"fuzzyLevel":1},"results":[{"type":"POI","id":"840069002602194","score":2.1454970837,"info":"search:ta:840069002602194-US","poi":{"name":"Round Table Pizza","phone":"+1 415-586-1200","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"https://ordering.roundtablepizza.com/Site/rtsf","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"4523","streetName":"Mission Street","municipalitySubdivision":"Mission Terrace","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94112","extendedPostalCode":"94112-2600","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4523 Mission Street, San Francisco, CA 94112","localName":"San Francisco"},"position":{"lat":37.72572,"lon":-122.43368},"viewport":{"topLeftPoint":{"lat":37.72662,"lon":-122.43482},"btmRightPoint":{"lat":37.72482,"lon":-122.43254}},"entryPoints":[{"type":"main","position":{"lat":37.72585,"lon":-122.43393}}]},{"type":"POI","id":"840069019316011","score":2.1454598904,"info":"search:ta:840069019316011-US","poi":{"name":"Round Table Pizza","phone":"+1 415-468-7100","brands":[{"name":"Round Table Pizza"}],"categorySet":[{"id":7315036}],"url":"www.roundtablepizza.com/rtp/store.asp?store_num=488","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"2660","streetName":"San Bruno Avenue","municipalitySubdivision":"Portola","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94134","extendedPostalCode":"94134-1500","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2660 San Bruno Avenue, San Francisco, CA 94134","localName":"San Francisco"},"position":{"lat":37.7279,"lon":-122.40406},"viewport":{"topLeftPoint":{"lat":37.7288,"lon":-122.4052},"btmRightPoint":{"lat":37.727,"lon":-122.40292}},"entryPoints":[{"type":"main","position":{"lat":37.72798,"lon":-122.40375}},{"type":"main","position":{"lat":37.72802,"lon":-122.40377}}]},{"type":"POI","id":"840061002330210","score":2.1454544067,"info":"search:ta:840061002330210-US","poi":{"name":"Golden Boy Wholesale Pizza Company","phone":"+1 415-334-5700","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"4531","streetName":"Mission Street","municipalitySubdivision":"Mission Terrace","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94112","extendedPostalCode":"94112-2603","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4531 Mission Street, San Francisco, CA 94112","localName":"San Francisco"},"position":{"lat":37.72561,"lon":-122.43376},"viewport":{"topLeftPoint":{"lat":37.72651,"lon":-122.4349},"btmRightPoint":{"lat":37.72471,"lon":-122.43262}},"entryPoints":[{"type":"main","position":{"lat":37.72573,"lon":-122.43402}}]},{"type":"POI","id":"840069019390419","score":2.1454503536,"info":"search:ta:840069019390419-US","poi":{"name":"Zante Pizza","phone":"+1 415-821-3949","categorySet":[{"id":7315036}],"url":"zantepizzaandindian.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"3489","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5438","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3489 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74104,"lon":-122.42244},"viewport":{"topLeftPoint":{"lat":37.74194,"lon":-122.42358},"btmRightPoint":{"lat":37.74014,"lon":-122.4213}},"entryPoints":[{"type":"main","position":{"lat":37.74116,"lon":-122.42274}}]},{"type":"POI","id":"840069019806542","score":2.1454472542,"info":"search:ta:840069019806542-US","poi":{"name":"Giovanni's Pizza Bistro","phone":"+1 415-647-6122","categorySet":[{"id":7315036}],"url":"www.giovannispizzabistroca.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"3839","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5831","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3839 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.73548,"lon":-122.42454},"viewport":{"topLeftPoint":{"lat":37.73638,"lon":-122.42568},"btmRightPoint":{"lat":37.73458,"lon":-122.4234}},"entryPoints":[{"type":"main","position":{"lat":37.73552,"lon":-122.42465}}]},{"type":"POI","id":"840069019255788","score":2.1454453468,"info":"search:ta:840069019255788-US","poi":{"name":"Bernal Heights Pizzeria","phone":"+1 415-400-5644","categorySet":[{"id":7315036}],"url":"www.bernalheightspizzeria.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"59","streetName":"30th Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5401","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"59 30th Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74222,"lon":-122.42313},"viewport":{"topLeftPoint":{"lat":37.74312,"lon":-122.42427},"btmRightPoint":{"lat":37.74132,"lon":-122.42199}},"entryPoints":[{"type":"main","position":{"lat":37.74234,"lon":-122.42268}}]},{"type":"POI","id":"840069021346566","score":2.1454446316,"info":"search:ta:840069021346566-US","poi":{"name":"Round Pizza","categorySet":[{"id":7315036}],"categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"4517","streetName":"Mission Street","municipalitySubdivision":"Mission Terrace","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94112","extendedPostalCode":"94112-2600","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4517 Mission Street, San Francisco, CA 94112","localName":"San Francisco"},"position":{"lat":37.7258,"lon":-122.43383},"viewport":{"topLeftPoint":{"lat":37.7267,"lon":-122.43497},"btmRightPoint":{"lat":37.7249,"lon":-122.43269}},"entryPoints":[{"type":"main","position":{"lat":37.72597,"lon":-122.43384}}]},{"type":"POI","id":"840069019716710","score":2.1454439163,"info":"search:ta:840069019716710-US","poi":{"name":"Gialina Pizzeria","phone":"+1 415-239-8500","categorySet":[{"id":7315036}],"url":"gialina.com/","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"2842","streetName":"Diamond Street","municipalitySubdivision":"Glen Park","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94131","extendedPostalCode":"94131-3005","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"2842 Diamond Street, San Francisco, CA 94131","localName":"San Francisco"},"position":{"lat":37.73404,"lon":-122.43416},"viewport":{"topLeftPoint":{"lat":37.73494,"lon":-122.4353},"btmRightPoint":{"lat":37.73314,"lon":-122.43302}},"entryPoints":[{"type":"main","position":{"lat":37.734,"lon":-122.43403}}]},{"type":"POI","id":"840069019388007","score":2.1454429626,"info":"search:ta:840069019388007-US","poi":{"name":"Pizza Hut","phone":"+1 415-641-0400","brands":[{"name":"Pizza Hut"}],"categorySet":[{"id":7315036}],"url":"https://locations.pizzahut.com/ca/san-francisco/3349-mission-st","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"3349","streetName":"Mission Street","municipalitySubdivision":"Bernal Heights","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94110","extendedPostalCode":"94110-5008","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"3349 Mission Street, San Francisco, CA 94110","localName":"San Francisco"},"position":{"lat":37.74328,"lon":-122.42112},"viewport":{"topLeftPoint":{"lat":37.74418,"lon":-122.42226},"btmRightPoint":{"lat":37.74238,"lon":-122.41998}},"entryPoints":[{"type":"main","position":{"lat":37.74334,"lon":-122.42134}}]},{"type":"POI","id":"840069000105213","score":2.145442009,"info":"search:ta:840069000105213-US","poi":{"name":"Ginny Pizzardi MFCC","phone":"+1 415-285-4061","categorySet":[{"id":7315036}],"url":"www.ginnypizzardi.com","categories":["pizza","restaurant"],"classifications":[{"code":"RESTAURANT","names":[{"nameLocale":"en-US","name":"pizza"},{"nameLocale":"en-US","name":"restaurant"}]}]},"address":{"streetNumber":"4155","streetName":"24th Street","municipalitySubdivision":"Noe Valley","municipality":"San Francisco","countrySecondarySubdivision":"San Francisco","countrySubdivision":"CA","countrySubdivisionName":"California","postalCode":"94114","extendedPostalCode":"94114-3614","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"4155 24th Street, San Francisco, CA 94114","localName":"San Francisco"},"position":{"lat":37.75098,"lon":-122.43527},"viewport":{"topLeftPoint":{"lat":37.75188,"lon":-122.43641},"btmRightPoint":{"lat":37.75008,"lon":-122.43413}},"entryPoints":[{"type":"main","position":{"lat":37.75123,"lon":-122.43528}}]}]}, [
  'Content-Length',
  '11174',
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
  'Ref A: 3A53D6898AF2488BA2322709F90F66F5 Ref B: TYAEDGE0709 Ref C: 2022-07-14T02:58:53Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:53 GMT'
]);
