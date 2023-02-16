let nock = require('nock');

module.exports.hash = "ffdfb4ef13db8a6afa62577696003ebb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/common/discovery/instance')
  .query(false)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/SomeTenantId/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - SCUS ProdSlices',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ai6jOA23cp5CqsuxJiCvkCE; expires=Sat, 07-Jan-2023 16:02:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVPszeg6U1yl9Wf9_U0SIVbDuFp9CvAowJpv8eikNdkijrCn1rAqEvRRR1nsoo94TyXCeEWKSCMDVk3YMwUEJL3XQhIKZAZmHEEKj5D_87obKcogKsyTzM4yNRZf2xrIVT6xqGtIacpDQChtRCSRgi_1llpYqoQarj_AiEQK2Mpao8bNoUPyZ3x6wyA5QhprFVRbrRydHo620F9A6mkKBKDqSU1Vwii5qcoiW8nzlwN4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:02:07 GMT',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/SomeTenantId/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/SomeTenantId/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/SomeTenantId/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/devicecode","http_logout_supported":false,"frontchannel_logout_supported":false,"end_session_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/SomeTenantId/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - WUS2 ProdSlices',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvkjXXOAFQVMrpwrWewUzbA; expires=Sat, 07-Jan-2023 16:02:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrIM9BZ-nsLz37PiaeabwFFR2Lc9mRWM2kTUHXmHYS7GrhRYT_IV6-bNHx4Az4x0D_Nlnq5JujvECxM5ze7xTUPgkrzKlnZIelf0o8jcNyx-Q1ysv_n8xKXlL21ugEYj7BHky_I4JJ7jjmq2eIYL0UF6SKpg99Amvuu2eb3_XUjo5pAKSwnVt94DcC_f80TTU4HxxKfRKuJ4Gm0jm_mb6myPxb6BDnzK7VVOrfo4YiQoYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:02:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.12.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=sanitized&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AsrtqTkPhN9AoqaJjhsS1ZZWyo4SAQAAAH8BJNsOAAAA; expires=Sat, 07-Jan-2023 16:02:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:02:07 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/countries/US/localities')
  .query(false)
  .reply(200, {"phoneNumberLocalities":[{"localizedName":"Anchorage","administrativeDivision":{"localizedName":"AK","abbreviatedName":"AK"}},{"localizedName":"Huntsville","administrativeDivision":{"localizedName":"AL","abbreviatedName":"AL"}},{"localizedName":"Mobile","administrativeDivision":{"localizedName":"AL","abbreviatedName":"AL"}},{"localizedName":"Montgomery","administrativeDivision":{"localizedName":"AL","abbreviatedName":"AL"}},{"localizedName":"Fort Smith","administrativeDivision":{"localizedName":"AR","abbreviatedName":"AR"}},{"localizedName":"Jonesboro","administrativeDivision":{"localizedName":"AR","abbreviatedName":"AR"}},{"localizedName":"Little Rock","administrativeDivision":{"localizedName":"AR","abbreviatedName":"AR"}},{"localizedName":"Phoenix","administrativeDivision":{"localizedName":"AZ","abbreviatedName":"AZ"}},{"localizedName":"Anaheim","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Burbank","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Concord","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Fresno","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Los Angeles","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Riverside","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Sacramento","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Salinas","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"San Diego","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"San Francisco","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"San Jose","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Santa Barbara","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Santa Clarita","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Santa Rosa","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Stockton","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Truckee","administrativeDivision":{"localizedName":"CA","abbreviatedName":"CA"}},{"localizedName":"Washington DC","administrativeDivision":{"localizedName":"CL","abbreviatedName":"CL"}},{"localizedName":"Grand Junction","administrativeDivision":{"localizedName":"CO","abbreviatedName":"CO"}},{"localizedName":"Pueblo","administrativeDivision":{"localizedName":"CO","abbreviatedName":"CO"}},{"localizedName":"Bridgeport","administrativeDivision":{"localizedName":"CT","abbreviatedName":"CT"}},{"localizedName":"Hartford","administrativeDivision":{"localizedName":"CT","abbreviatedName":"CT"}},{"localizedName":"Wilmington","administrativeDivision":{"localizedName":"DE","abbreviatedName":"DE"}},{"localizedName":"Cape Coral","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Daytona Beach","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Fort Lauderdale","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Gainesville","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Jacksonville","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Lakeland","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Miami","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Orlando","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Sarasota","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"St. Petersburg","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Tampa","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"West Palm Beach","administrativeDivision":{"localizedName":"FL","abbreviatedName":"FL"}},{"localizedName":"Albany","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Atlanta","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Augusta","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Macon","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Savannah","administrativeDivision":{"localizedName":"GA","abbreviatedName":"GA"}},{"localizedName":"Honolulu","administrativeDivision":{"localizedName":"HI","abbreviatedName":"HI"}},{"localizedName":"Cedar Rapids","administrativeDivision":{"localizedName":"IA","abbreviatedName":"IA"}},{"localizedName":"Davenport","administrativeDivision":{"localizedName":"IA","abbreviatedName":"IA"}},{"localizedName":"Mason City","administrativeDivision":{"localizedName":"IA","abbreviatedName":"IA"}},{"localizedName":"Sioux City","administrativeDivision":{"localizedName":"IA","abbreviatedName":"IA"}},{"localizedName":"Boise","administrativeDivision":{"localizedName":"ID","abbreviatedName":"ID"}},{"localizedName":"Alton","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Aurora","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Champaign","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Chicago","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Cicero","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Rock Island","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Rockford","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Waukegan","administrativeDivision":{"localizedName":"IL","abbreviatedName":"IL"}},{"localizedName":"Evansville","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"Fort Wayne","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"Gary","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"Indianapolis","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"South Bend","administrativeDivision":{"localizedName":"IN","abbreviatedName":"IN"}},{"localizedName":"Dodge City","administrativeDivision":{"localizedName":"KS","abbreviatedName":"KS"}},{"localizedName":"Kansas City","administrativeDivision":{"localizedName":"KS","abbreviatedName":"KS"}},{"localizedName":"Topeka","administrativeDivision":{"localizedName":"KS","abbreviatedName":"KS"}},{"localizedName":"Wichita","administrativeDivision":{"localizedName":"KS","abbreviatedName":"KS"}},{"localizedName":"Ashland","administrativeDivision":{"localizedName":"KY","abbreviatedName":"KY"}},{"localizedName":"Lexington","administrativeDivision":{"localizedName":"KY","abbreviatedName":"KY"}},{"localizedName":"Louisville","administrativeDivision":{"localizedName":"KY","abbreviatedName":"KY"}},{"localizedName":"Owensboro","administrativeDivision":{"localizedName":"KY","abbreviatedName":"KY"}},{"localizedName":"Baton Rouge","administrativeDivision":{"localizedName":"LA","abbreviatedName":"LA"}},{"localizedName":"Lafayette","administrativeDivision":{"localizedName":"LA","abbreviatedName":"LA"}},{"localizedName":"New Orleans","administrativeDivision":{"localizedName":"LA","abbreviatedName":"LA"}},{"localizedName":"Shreveport","administrativeDivision":{"localizedName":"LA","abbreviatedName":"LA"}},{"localizedName":"Boston","administrativeDivision":{"localizedName":"MA","abbreviatedName":"MA"}},{"localizedName":"Chicopee","administrativeDivision":{"localizedName":"MA","abbreviatedName":"MA"}},{"localizedName":"Lynn","administrativeDivision":{"localizedName":"MA","abbreviatedName":"MA"}},{"localizedName":"Worcester","administrativeDivision":{"localizedName":"MA","abbreviatedName":"MA"}},{"localizedName":"Baltimore","administrativeDivision":{"localizedName":"MD","abbreviatedName":"MD"}},{"localizedName":"Bethesda","administrativeDivision":{"localizedName":"MD","abbreviatedName":"MD"}},{"localizedName":"Silver Spring","administrativeDivision":{"localizedName":"MD","abbreviatedName":"MD"}},{"localizedName":"Portland","administrativeDivision":{"localizedName":"ME","abbreviatedName":"ME"}},{"localizedName":"Ann Arbor","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Detroit","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Flint","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Grand Rapids","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Grant","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Lansing","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Pontiac","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Saginaw","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Sault Ste Marie","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Troy","administrativeDivision":{"localizedName":"MI","abbreviatedName":"MI"}},{"localizedName":"Alexandria","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}},{"localizedName":"Duluth","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}},{"localizedName":"Mankato","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}},{"localizedName":"Minneapolis","administrativeDivision":{"localizedName":"MN","abbreviatedName":"MN"}}],"nextLink":"/availablePhoneNumbers/countries/US/localities?skip=100&maxPageSize=100&api-version=2022-12-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '9NfrY2mc9UOZg4KJ/UHfiA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2022-12-01',
  'X-Processing-Time',
  '1516ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0gAqSYwAAAADe41aoEN/eRp2lPlvPF3MfTUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:02:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/countries/US/areaCodes')
  .query(false)
  .reply(200, {"areaCodes":[{"areaCode":"907"}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ZiiNqkXcHkuVc0glsW8N0Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-12-01',
  'X-Processing-Time',
  '2299ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0gQqSYwAAAACd31w5iziZQ6KGepGUMbY5TUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:02:11 GMT'
]);
