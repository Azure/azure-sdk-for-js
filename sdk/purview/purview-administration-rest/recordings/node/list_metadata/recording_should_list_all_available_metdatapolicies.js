let nock = require('nock');

module.exports.hash = "70131c3821d09802960995dba9dc4970";

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
  '03b23d24-6bdd-4cf7-bbd5-825701996a00',
  'x-ms-ests-server',
  '2.1.12171.15 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjoeBw4bl-9Bn6nYjoyc1wU; expires=Sat, 04-Dec-2021 15:45:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7dPMpUtG71wyX5n75pFDJoBBaCeV_Ixh5D3BFlfqsIpgvwEQ_8SRUmDCqcJ1IcJITOuuPh-uFL8QxMIQME1m-o56euNdP4ROsb1uf_jMJxyTSQRBzWiixZ3yWCpR4seKEJg4aAUfp43HgiEBQy7_JYu0Vf-qF9xJQJkf54i2-SEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 15:44:59 GMT',
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
  'becb22e6-2f97-4436-9964-b7e6e1b51b00',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgYEEwcpMwtLrEECIhhBqPw; expires=Sat, 04-Dec-2021 15:45:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrySwjdh1syDbFWDR8c8O3ZP_XGr2Z664_9yXdSQI6uFnzvkxslFQzZ0eJfgKPgj0L_oOeTeO4GWU8LZ3rVp2-5dziMwuUhrQlsQuXiF_1UvL-AxRs2XHs3thmg48iViaqynwq0Q7jQxHPO6cARAoqi5BgW9nTDWEZigz2tH5oJ7IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 15:44:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b7ab2be6-31d0-4cfd-89bf-a2502fb204a0&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'a9246bf2-1cfd-4504-b409-a4f225551100',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqFax6kNH-FMnRXd-tbrFhj__1r8AQAAAPz2FdkOAAAA; expires=Sat, 04-Dec-2021 15:45:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 15:44:59 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/policyStore/metadataPolicies')
  .query(true)
  .reply(200, {"values":[{"name":"policy_joheredipv","id":"5a7d5a3b-7451-4f89-85d5-1b5e7f182e01","version":2,"properties":{"description":"","decisionRules":[{"kind":"decisionrule","effect":"Permit","dnfCondition":[[{"attributeName":"resource.purview.collection","attributeValueIncludes":"joheredipv"},{"fromRule":"permission:joheredipv","attributeName":"derived.purview.permission","attributeValueIncludes":"permission:joheredipv"}]]}],"attributeRules":[{"kind":"attributerule","id":"purviewmetadatarole_builtin_collection-administrator:joheredipv","version":0,"dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c"]},{"fromRule":"purviewmetadatarole_builtin_collection-administrator","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator"}]]},{"kind":"attributerule","id":"purviewmetadatarole_builtin_purview-reader:joheredipv","version":0,"dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c"]},{"fromRule":"purviewmetadatarole_builtin_purview-reader","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_purview-reader"}]]},{"kind":"attributerule","id":"purviewmetadatarole_builtin_data-curator:joheredipv","version":0,"dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c"]},{"fromRule":"purviewmetadatarole_builtin_data-curator","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_data-curator"}]]},{"kind":"attributerule","id":"purviewmetadatarole_builtin_data-source-administrator:joheredipv","version":0,"dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c","f8cfe8ca-1f83-4deb-814c-ee49336fdebd"]},{"fromRule":"purviewmetadatarole_builtin_data-source-administrator","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_data-source-administrator"}]]},{"kind":"attributerule","id":"permission:joheredipv","version":0,"dnfCondition":[[{"fromRule":"purviewmetadatarole_builtin_collection-administrator:joheredipv","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator:joheredipv"}],[{"fromRule":"purviewmetadatarole_builtin_purview-reader:joheredipv","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_purview-reader:joheredipv"}],[{"fromRule":"purviewmetadatarole_builtin_data-curator:joheredipv","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_data-curator:joheredipv"}],[{"fromRule":"purviewmetadatarole_builtin_data-source-administrator:joheredipv","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_data-source-administrator:joheredipv"}]]}],"collection":{"type":"CollectionReference","referenceName":"joheredipv"}}},{"name":"policy_Collection-lGe","id":"824cac41-8055-4338-abf9-661f213147bf","version":0,"properties":{"description":"","decisionRules":[{"kind":"decisionrule","effect":"Permit","dnfCondition":[[{"attributeName":"resource.purview.collection","attributeValueIncludes":"collection-lge"},{"fromRule":"permission:collection-lge","attributeName":"derived.purview.permission","attributeValueIncludes":"permission:collection-lge"}]]}],"attributeRules":[{"kind":"attributerule","id":"purviewmetadatarole_builtin_collection-administrator:collection-lge","name":"purviewmetadatarole_builtin_collection-administrator:collection-lge","dnfCondition":[[{"attributeName":"principal.microsoft.id","attributeValueIncludedIn":["35ac9d32-a8ca-4324-9393-d4000746f07c"]},{"fromRule":"purviewmetadatarole_builtin_collection-administrator","attributeName":"derived.purview.role","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator"}],[{"fromRule":"purviewmetadatarole_builtin_collection-administrator:joheredipv","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator:joheredipv"}]]},{"kind":"attributerule","id":"permission:collection-lge","name":"permission:collection-lge","dnfCondition":[[{"fromRule":"purviewmetadatarole_builtin_collection-administrator:collection-lge","attributeName":"derived.purview.permission","attributeValueIncludes":"purviewmetadatarole_builtin_collection-administrator:collection-lge"}],[{"fromRule":"permission:joheredipv","attributeName":"derived.purview.permission","attributeValueIncludes":"permission:joheredipv"}]]}],"collection":{"type":"CollectionReference","referenceName":"collection-lge"},"parentCollectionName":"joheredipv"}}]}, [
  'Date',
  'Thu, 04 Nov 2021 15:45:00 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '4842',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '05409c16-8e43-43dc-83e7-117ed2111db9',
  'api-supported-versions',
  '2021-07-01-preview, 2021-07-01'
]);
