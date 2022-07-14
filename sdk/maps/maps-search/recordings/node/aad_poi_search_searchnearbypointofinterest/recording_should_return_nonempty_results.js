let nock = require('nock');

module.exports.hash = "b77b638a62a62c318c7b25885a55fde3";

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
  'd548c885-084c-4865-b51e-386099aa3500',
  'x-ms-ests-server',
  '2.1.13201.7 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqIkNmJz2yxNiQS1nlRerVE; expires=Sat, 13-Aug-2022 02:58:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdnFLhuhmM4N4jdbWfzK8EW8xVuuu5aYDGwS8dT1h8TUArNhBFCfMDT260_OL2MYOCehhcdyJ_TjJkY6yfS3qWQyhgG9ZdwFPlgM11N03OCllywHw9NkG6mXCvXKQuS2ioh6OzC4knW9H2OPcUCiwZbW-KCV7ldEIyVWNFvtixHYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:48 GMT',
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
  '4d4bf598-c8df-41cd-8121-95005d497a00',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvRcZErS3XVDl1b6F9EUU8Y; expires=Sat, 13-Aug-2022 02:58:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSWsdtW2Y1bpUiFftkg3V1wew6SzXiA05r8KMR5PyQ3Xu7r6VznpZrOxg9Y_dc4P54f6pdYVZO9D2TnJIV2jQdl8PXfc9KbMLwj5NvCcOvwPefqbZHqDFm3EnnVQp9VyPiWMvu5yEt2Tu82eX5IVTJeUvi2lAVmpar3_XnGEfwVEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:48 GMT',
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
  'e8620f73-a153-4347-9847-d6d0384aca00',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AuCQ69qynkJGhtGyuKiOdwM; expires=Sat, 13-Aug-2022 02:58:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4PN-mkUMujRgmfufeUnOEB8wDZRTxmo28_axHaxApAvnRxa6xpNB4yvI4LNEtYJ4MdmSqZauWbPd9pn5kPLBFMc-K15i7-79-Fk4uxvsXLqDpCK6yvmVT6eeLYQUXtvXJa0nxETBT6QfyqegHDBp4BI7dmonF1Rp7Caws0iNgzMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0f80017b-e0b6-4f3a-8b9c-8cd50eb75cd3&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '8ef7cde8-838f-4de3-a69c-492f447f7a00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoDofLp4FjtNtbU2PHkcTvThHQjEAQAAAGh9YdoOAAAA; expires=Sat, 13-Aug-2022 02:58:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:48 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9f93e7fc-93c6-48d4-9fd7-bcf2166b4b58&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '56d93251-2748-4d87-86cf-5837dd698100',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Am1jZIkkRD9ItvRhY_ixTbs; expires=Sat, 13-Aug-2022 02:58:49 GMT; path=/; secure; HttpOnly; SameSite=None',
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
  .get('/search/nearby/json')
  .query(true)
  .reply(200, {"summary":{"queryType":"NEARBY","queryTime":53,"numResults":10,"offset":0,"totalResults":70427,"fuzzyLevel":1,"geoBias":{"lat":47.606038,"lon":-122.333345}},"results":[{"type":"POI","id":"840539001316525","score":99.9932861328,"dist":6.716018628498251,"info":"search:ta:840539001316525-US","poi":{"name":"Madison St & 4th Ave","categorySet":[{"id":9942002}],"categories":["bus stop","public transport stop"],"classifications":[{"code":"PUBLIC_TRANSPORT_STOP","names":[{"nameLocale":"en-US","name":"public transport stop"},{"nameLocale":"en-US","name":"bus stop"}]}]},"address":{"streetName":"Madison Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-3638","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Madison Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60598,"lon":-122.33337},"viewport":{"topLeftPoint":{"lat":47.60688,"lon":-122.3347},"btmRightPoint":{"lat":47.60508,"lon":-122.33204}},"entryPoints":[{"type":"main","position":{"lat":47.60593,"lon":-122.33333}}]},{"type":"POI","id":"840539003078694","score":99.9842758179,"dist":15.727422876349976,"info":"search:ta:840539003078694-US","poi":{"name":"Re/Max Of America","phone":"+1 206-780-6000","brands":[{"name":"Re/Max of America"}],"categorySet":[{"id":9361015}],"url":"www.remax.com","categories":["real estate agents","shop"],"classifications":[{"code":"SHOP","names":[{"nameLocale":"en-US","name":"shop"},{"nameLocale":"en-US","name":"real estate agents"}]}]},"address":{"streetNumber":"290","streetName":"Madison Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-3638","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"290 Madison Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60596,"lon":-122.33352},"viewport":{"topLeftPoint":{"lat":47.60686,"lon":-122.33485},"btmRightPoint":{"lat":47.60506,"lon":-122.33219}},"entryPoints":[{"type":"main","position":{"lat":47.60588,"lon":-122.33344}}]},{"type":"POI","id":"840537000014398","score":99.9808273315,"dist":19.174818094404408,"info":"search:ta:840537000014398-US","poi":{"name":"Narrows Labs","phone":"+1 800-321-3579","categorySet":[{"id":9352}],"categories":["company"],"classifications":[{"code":"COMPANY","names":[{"nameLocale":"en-US","name":"company"}]}]},"address":{"streetNumber":"1004","streetName":"4th Avenue","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1004 4th Avenue, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60612,"lon":-122.33312},"viewport":{"topLeftPoint":{"lat":47.60702,"lon":-122.33445},"btmRightPoint":{"lat":47.60522,"lon":-122.33179}},"entryPoints":[{"type":"main","position":{"lat":47.60617,"lon":-122.333}}]},{"type":"POI","id":"840539001096914","score":99.9808273315,"dist":19.174818094404408,"info":"search:ta:840539001096914-US","poi":{"name":"Darryl S Vhugen","phone":"+1 206-389-1673","categorySet":[{"id":9352023}],"categories":["company","legal services"],"classifications":[{"code":"COMPANY","names":[{"nameLocale":"en-US","name":"company"},{"nameLocale":"en-US","name":"legal services"}]}]},"address":{"streetNumber":"1001","streetName":"4Th Ave","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98185","extendedPostalCode":"98185-9000","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1001 4Th Ave, Seattle, WA 98185","localName":"Seattle"},"position":{"lat":47.60612,"lon":-122.33312},"viewport":{"topLeftPoint":{"lat":47.60702,"lon":-122.33445},"btmRightPoint":{"lat":47.60522,"lon":-122.33179}},"entryPoints":[{"type":"main","position":{"lat":47.60617,"lon":-122.333}}]},{"type":"POI","id":"840539003144366","score":99.967918396,"dist":32.078985643003946,"info":"search:ta:840539003144366-US","poi":{"name":"Espn Seattle","categorySet":[{"id":9158}],"categories":["media facility"],"classifications":[{"code":"MEDIA_FACILITY","names":[{"nameLocale":"en-US","name":"media facility"}]}]},"address":{"streetName":"Madison Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Madison Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60575,"lon":-122.33332},"viewport":{"topLeftPoint":{"lat":47.60665,"lon":-122.33465},"btmRightPoint":{"lat":47.60485,"lon":-122.33199}},"entryPoints":[{"type":"main","position":{"lat":47.60591,"lon":-122.33337}}]},{"type":"POI","id":"840539002028158","score":99.9664230347,"dist":33.58048785167819,"info":"search:ev:840539002028158","poi":{"name":"ChargePoint Seattle 4th Ave","phone":"+1 888-758-4389","categorySet":[{"id":7309}],"url":"www.chargepoint.com/","categories":["electric vehicle station"],"classifications":[{"code":"ELECTRIC_VEHICLE_STATION","names":[{"nameLocale":"en-US","name":"electric vehicle station"}]}]},"address":{"streetNumber":"1001","streetName":"4th Ave","municipalitySubdivision":"Downtown Seattle","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98154","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1001 4th Ave, Seattle, WA 98154","localName":"Seattle"},"position":{"lat":47.60611,"lon":-122.33378},"viewport":{"topLeftPoint":{"lat":47.60701,"lon":-122.33511},"btmRightPoint":{"lat":47.60521,"lon":-122.33245}},"entryPoints":[{"type":"main","position":{"lat":47.60637,"lon":-122.33319}}],"chargingPark":{"connectors":[{"connectorType":"IEC62196Type1","ratedPowerKW":6.4,"voltageV":230,"currentA":16,"currentType":"AC3"}]}},{"type":"POI","id":"840539000411206","score":99.9641952515,"dist":35.80670082469081,"info":"search:ta:840539000411206-US","poi":{"name":"1001 Fourth Avenue Place","categorySet":[{"id":9382}],"categories":["commercial building"],"classifications":[{"code":"COMMERCIAL_BUILDING","names":[{"nameLocale":"en-US","name":"commercial building"}]}]},"address":{"streetNumber":"1001","streetName":"4Th Ave","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1001 4Th Ave, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60636,"lon":-122.33334},"viewport":{"topLeftPoint":{"lat":47.60726,"lon":-122.33467},"btmRightPoint":{"lat":47.60546,"lon":-122.33201}},"entryPoints":[{"type":"main","position":{"lat":47.60644,"lon":-122.33325}}]},{"type":"POI","id":"840539002303490","score":99.9630813599,"dist":36.918709357342955,"info":"search:ta:840539002303490-US","poi":{"name":"Dolphin Technical Communication","phone":"+1 206-458-7327","categorySet":[{"id":9352002}],"categories":["company","service"],"classifications":[{"code":"COMPANY","names":[{"nameLocale":"en-US","name":"service"},{"nameLocale":"en-US","name":"company"}]}]},"address":{"streetNumber":"1021","streetName":"4th Avenue","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98154","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"1021 4th Avenue, Seattle, WA 98154","localName":"Seattle"},"position":{"lat":47.60637,"lon":-122.33334},"viewport":{"topLeftPoint":{"lat":47.60727,"lon":-122.33467},"btmRightPoint":{"lat":47.60547,"lon":-122.33201}},"entryPoints":[{"type":"main","position":{"lat":47.60642,"lon":-122.33323}}]},{"type":"POI","id":"840539000717400","score":99.9596939087,"dist":40.30957040295779,"info":"search:ta:840539000717400-US","poi":{"name":"Safeco Plaza Parking","phone":"+1 206-613-4214","categorySet":[{"id":7313}],"categories":["parking garage"],"classifications":[{"code":"PARKING_GARAGE","names":[{"nameLocale":"en-US","name":"parking garage"}]}]},"address":{"streetNumber":"342","streetName":"Madison Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","extendedPostalCode":"98104-3638","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"342 Madison Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60622,"lon":-122.33381},"viewport":{"topLeftPoint":{"lat":47.60712,"lon":-122.33514},"btmRightPoint":{"lat":47.60532,"lon":-122.33248}},"entryPoints":[{"type":"main","position":{"lat":47.60603,"lon":-122.33308}}]},{"type":"POI","id":"840539001256790","score":99.9574890137,"dist":42.50751574385384,"info":"search:ta:840539001256790-US","poi":{"name":"4th Ave & Madison St","categorySet":[{"id":9942002}],"categories":["bus stop","public transport stop"],"classifications":[{"code":"PUBLIC_TRANSPORT_STOP","names":[{"nameLocale":"en-US","name":"public transport stop"},{"nameLocale":"en-US","name":"bus stop"}]}]},"address":{"streetName":"Madison Street","municipalitySubdivision":"Central Business District","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98104","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Madison Street, Seattle, WA 98104","localName":"Seattle"},"position":{"lat":47.60607,"lon":-122.33278},"viewport":{"topLeftPoint":{"lat":47.60697,"lon":-122.33411},"btmRightPoint":{"lat":47.60517,"lon":-122.33145}},"entryPoints":[{"type":"main","position":{"lat":47.60615,"lon":-122.33281}}]}]}, [
  'Content-Length',
  '10558',
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
  'Ref A: 2DC8EDF06CC0459099A24B7B78C5772C Ref B: TYAEDGE0709 Ref C: 2022-07-14T02:58:49Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:49 GMT'
]);
