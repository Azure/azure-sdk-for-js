let nock = require('nock');

module.exports.hash = "13802c79e02b4fee488f24f8f8b04aee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://identity.confidential-ledger-staging.core.azure.com:443', {"encodedQueryParams":true})
  .get('/ledgerIdentity/FAKE_CERT')
  .reply(200, {"ledgerTlsCertificate":"-----BEGIN CERTIFICATE-----\nMIIBejCCASGgAwIBAgIRAOe0n/jUk1qbZ5YQn8ZydUswCgYIKoZIzj0EAwIwFjEU\nMBIGA1UEAwwLQ0NGIE5ldHdvcmswHhcNMjIwNjIzMTcwNDM0WhcNMjIwOTIxMTcw\nNDMzWjAWMRQwEgYDVQQDDAtDQ0YgTmV0d29yazBZMBMGByqGSM49AgEGCCqGSM49\nAwEHA0IABEXoAeEqNTxXRAi59tOdrcQoBmbEQu4Nmt1kDpkWm+HD/rKtoabHCRfm\n1Rr4HVnhUzd35uNSciCBXty6Fw5WvcKjUDBOMAwGA1UdEwQFMAMBAf8wHQYDVR0O\nBBYEFH5ZbWF1sfF9advIJXDGdu5P+pkOMB8GA1UdIwQYMBaAFH5ZbWF1sfF9advI\nJXDGdu5P+pkOMAoGCCqGSM49BAMCA0cAMEQCIBoTBWnURs+dmbLx6FdJ882QuhAu\nG/cfqKks4IpYl4I5AiA3Idmq2ohkCRMpwSUoapDFvGyqPKxSvqPiz8kHsgYWrQ==\n-----END CERTIFICATE-----\n","ledgerId":"FAKE_CERT"}, [
  'Date',
  'Thu, 30 Jun 2022 16:44:37 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-correlation-request-id',
  '90bd0d5e-a4be-442b-9fa3-3315bd941ba9',
  'x-ms-client-request-id',
  '50c66119-c709-4744-a144-0a8b601961ac',
  'x-ms-machineName',
  'identityservice-c5487bcb8-x7bs4',
  'x-ms-image-tag',
  '1.0.02004.555-04a069fc0e02c3bd70d00c6d7ba6b4953fb03ecb'
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
  '32aa279c-4002-4dbc-92ab-2af62fc1a001',
  'x-ms-ests-server',
  '2.1.13006.6 - EUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AhoKClMrrBFOsrH1l9bUBT0; expires=Sat, 30-Jul-2022 16:44:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYpTbtX8rf9BQf-Sm7Y-lWwTjNWMTesaW6m0LNZuLQl_dEen0qTLftf3JbN8-QtWVDZLHhidVRZpQUqvgd0sHytfcnr-q423o0hRKJ5VdxpqFHvggNes1Im0pJzDWEgeDA_I2hw002lFchxblz1QDbjCQHsJJF3PyZHXjBzIB3cIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:44:37 GMT',
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
  '252c8d1f-1068-452b-90b6-47ca17e2eb00',
  'x-ms-ests-server',
  '2.1.13081.9 - WUS2 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-PS_42okC6EdfXc2hlchoPw' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'none'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ApX8aPS02PdEh522uCqJlZU; expires=Sat, 30-Jul-2022 16:44:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrG7U2ftfLCo7csXupFnRgxJNw-c50Pjd6dxl8RJ74VVXMx5AaIroQmwpEXxlDG_PWtxAPzQ49T1YzgNABLquwOEkPiCbTHVGquoPvs5rh9I0cqkjEL8zxL2d_8zz4HOPENntrSsUw-DtCEqS2LU_6y1irSHsQypstdzRt4XPyIecgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:44:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=91d61efc-ee81-4920-b588-064cd0743af9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '7f70c8be-31db-4339-8d6d-a56ebe3df900',
  'x-ms-ests-server',
  '2.1.13081.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoYZMNLWsElEmgFvoawpvkOb7eLaAQAAAPXJT9oOAAAA; expires=Sat, 30-Jul-2022 16:44:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 30 Jun 2022 16:44:37 GMT',
  'Content-Length',
  '1334'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/app/governance/members')
  .query(true)
  .reply(200, {"members":[{"certificate":"-----BEGIN CERTIFICATE-----\nMIIB9zCCAX2gAwIBAgIQGOSh4iJeQcer6d4skkZ+sDAKBggqhkjOPQQDAzAgMR4w\nHAYDVQQDExVDQ0YgR292ZXJub3IgSWRlbnRpdHkwHhcNMjIwNjIzMTY1MjU0WhcN\nMjIwOTIzMTcwMjU0WjAgMR4wHAYDVQQDExVDQ0YgR292ZXJub3IgSWRlbnRpdHkw\ndjAQBgcqhkjOPQIBBgUrgQQAIgNiAAQ4jS1rxRgdxHhwy3DIZDHsybbw7MzF4ABr\n4ZWN5ktmWXmbOqixEfF+jpDcJZKdVWirKeJEukl2rZ/vdaNMU1cGqBO6XrcCe1Ug\nk1rVSMgkzXpatfrRaKyrkLWDuvyd8RujfDB6MA4GA1UdDwEB/wQEAwIHgDAJBgNV\nHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAW\ngBQhuXQH/q5rI4qqfktTOE4qIoLS/TAdBgNVHQ4EFgQUIbl0B/6uayOKqn5LUzhO\nKiKC0v0wCgYIKoZIzj0EAwMDaAAwZQIwAcxKbPzVkaqvO8dTe+vsHmujnM/uj+on\ngu6a2hQ6HjAPN0VpOtNPQdakhreswQ8mAjEAw37ty9rFqe5UYGulnMsGBt2pmcIU\nbUGgeNxp4q4XsiYhluNxP70soeQtL6a9UCaO\n-----END CERTIFICATE-----","id":"03d39fa1b920eb7e78f54e64fcb4be2142af83ac426405d3851e2a755dfc6c4c"}]}, [
  'content-length',
  '856',
  'content-type',
  'application/json',
  'x-ms-ccf-transaction-id',
  '2.3985',
  'x-ms-client-request-id',
  'c0cbae7f-111c-455e-a5fa-d0b2fd9f9cd9',
  'x-ms-request-id',
  '1640724431'
]);
