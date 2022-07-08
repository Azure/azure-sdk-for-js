let nock = require('nock');

module.exports.hash = "caa11598098dbb974b71177e3507eaef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4f5bf19e-8bdb-4b30-910b-9de999b54027',
  'x-ms-request-id',
  'e8d4f73c-beb9-444d-b617-77bac6a7eeb8',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:05 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '50ba620f-18c8-4a04-a985-673fa69c0501',
  'x-ms-ests-server',
  '2.1.12651.7 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlgcYWJnq1dCkCTUR2V8WoA; expires=Sat, 28-May-2022 00:05:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrO5NcBwtV1jLoAOKCCfnlFhMgQ5ZOTbVS4Iz2p2L75Se2klRIkHkKJ8BcoRiELtsmWJyWFXY1oppH6IyPoE6C4_fAUY7fhzEx7E_4Kp4a4NF7LGKwdtik0BblTkQIO6zMFE2_pvhCx_PsML7-sRmaiIwui9zTIS74HtrNyDChmQogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Apr 2022 00:05:05 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '8f76838f-59ed-4137-b186-e8e820322b00',
  'x-ms-ests-server',
  '2.1.12707.9 - EUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgD3_raX8UlMp2kXBTrOdbc; expires=Sat, 28-May-2022 00:05:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvNknTgoMoTzbvyGNAcSBfevvA2p29-3tiFWj-FkUjsjfbT01srYhr8D_V2QxE6VpZjAGcWLC4Pw57REDDl0aR_c2etglBM2nm7S2MmceUnAKut9ufjxHZLG47fMTHlxDgPv1w7uX_-0qCEOtrtzHGp4jCCxtS_YRxuy-sfTqxG0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Apr 2022 00:05:05 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5cb6fe52-4ae1-4ca2-86e0-ec2c39e68e01&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9ad2023a-0706-4253-a676-32ee17eb2c00',
  'x-ms-ests-server',
  '2.1.12707.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AmrU5duRArZDpyWTWTKVoAtPlvakAQAAADLR-9kOAAAA; expires=Sat, 28-May-2022 00:05:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Apr 2022 00:05:06 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662","x5t":"qFYr0pcnZSCQijdzmgAB0zd7EtA","attributes":{"enabled":true,"nbf":1651103346,"exp":1682639946,"created":1651103946,"updated":1651103946},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035","x5t":"GF30wEU7L_s-mB28ARNjHLwJl04","attributes":{"enabled":true,"nbf":1651103378,"exp":1682639978,"created":1651103978,"updated":1651103978},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258","x5t":"NFM-lbQKWDoXzA7_tjdAcWZI2hQ","attributes":{"enabled":true,"nbf":1651103415,"exp":1682640015,"created":1651104015,"updated":1651104015},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018","x5t":"5yWK2gac93DSzzXUJsyj5AJI9Hc","attributes":{"enabled":true,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104203},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreateacertificate-9308648851533552","x5t":"M7mgFhWDkjtqAcKTleQVDNo2v-8","attributes":{"enabled":true,"nbf":1651103599,"exp":1682640199,"created":1651104200,"updated":1651104200},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806","attributes":{"enabled":false,"nbf":1651103648,"exp":1682640248,"created":1651104248,"updated":1651104248},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-023132532376494375","x5t":"uBfmo-WIMOJGncsRXn67lfTj2Ec","attributes":{"enabled":false,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104210},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-5846770454674455","x5t":"6ITba8Exgv_GIajiPzCJLLkJrJ4","attributes":{"enabled":false,"nbf":1651103615,"exp":1682640215,"created":1651104215,"updated":1651104222},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificate-8643230698468862","x5t":"ZhleYqAb8S2NrllUISuQjzflizI","attributes":{"enabled":true,"nbf":1651103626,"exp":1682640226,"created":1651104226,"updated":1651104226},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266","x5t":"FM3E1HIDH_l1dw2_rqpgD3uCtYM","attributes":{"enabled":true,"nbf":1651103631,"exp":1682640231,"created":1651104232,"updated":1651104232},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987","x5t":"3h-2LJAF7bNgUAo_DtBFOe3iheU","attributes":{"enabled":true,"nbf":1651103638,"exp":1682640238,"created":1651104239,"updated":1651104239},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019","x5t":"wPEGUw91Ag9W_kIGYJyB2NrcrxI","attributes":{"enabled":true,"nbf":1651103655,"exp":1682640255,"created":1651104255,"updated":1651104255},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477","x5t":"rlguidTH9vvnCLnZAAiSePmuyfE","attributes":{"enabled":true,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104203},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-18371722303621052","x5t":"0vuk5xP3OUabQ-kVWjlRj-tzrTQ","attributes":{"enabled":true,"nbf":1651103655,"exp":1682640255,"created":1651104255,"updated":1651104255},"subject":""}],"nextLink":"https://keyvault_name.vault.azure.net:443/certificates?api-version=7.3&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJV05sY25ScFptbGpZWFJsTDBOU1ZVUkRSVkpVU1VaSlEwRlVSVTVCVFVVdFZWTkpUa2RIUlZSRVJVeEZWRVZFUTBWU1ZFbEdTVU5CVkVVdE1qQXdPVFkxTkRBMk5EWXpPRGcxTWpnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4f5bf19e-8bdb-4b30-910b-9de999b54027',
  'x-ms-request-id',
  'f60b24dc-c014-4780-98d6-4b510f75d422',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1139;da_age=1139;rd_age=1139;brd_age=11933;ra_notif_age=1609;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:06 GMT',
  'Content-Length',
  '4369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662","deletedDate":1651104307,"scheduledPurgeDate":1651709107,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/ea2af52b445a4fa69938d9ef638c89ba","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/ea2af52b445a4fa69938d9ef638c89ba","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/ea2af52b445a4fa69938d9ef638c89ba","x5t":"qFYr0pcnZSCQijdzmgAB0zd7EtA","cer":"MIIDKDCCAhCgAwIBAgIQNOA1EDF2T/6ehb1i/fhtIzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0OTA2WhcNMjMwNDI3MjM1OTA2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLz4tZDXBXkx6KyI0u+rgAKyJ3OW8II4sb1YxMArV1q8Z/0fCVu4DTo8Uw171JMuG75fPZjldcYLAO9+gpMRiuB0w/vmxRGhXqc2peUCcRUNjlYnL32mVsZWRsaBcBiUrcbXHuzy3eemp/+Niu34P7BJ4AG2QUPrDvQb98o3aIbLMNQh+cjNi/AxbNJ26nlDupRlQsIkpCD32s2aPAqEOAny/RnF0UlYHNeqdingXTqQrK8WTwKTSXfwzx3fHADaE9QsH4SbHaBxyNVOlI+W/uaKgTOw9P62GntZBeQw72zUoFENKO25tKqkDysYogTEdRumoEk6jH88hbi2zI3idlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSUTorVJJM4/xf7oIcjCbqLYH4wHDAdBgNVHQ4EFgQUlE6K1SSTOP8X+6CHIwm6i2B+MBwwDQYJKoZIhvcNAQELBQADggEBAAw5a6H5SRB+Zdy6sbsF2c1pifSx0JIRYiXHXHljjKrRVmJh1EpCudi7ndq2zD6R/2yrmNjgw03fcXQpM9sn59yB8UlpQvdKCC5spALKJPR+saUL+EjTf2xCAEa1W8GThAUIp9vwDAMq+JKFbVxL7wxC7QiB88HSmPWlselTriNzaX4o5mymZChVSd9B9hdvrrPv6IPN2Y/ZjkRhHqhc3GmQm9ah6Jrj3JqCzb7RuQEn9j7DUlkkK1gAx2PYwodkzUtxqThSaEZXnagujQMYr6Pz3AeVctEcAt4SEr8bAoj78ri28CfetFRU5Ygz37oGO8X27mPW0dXaxxbhC+mteTI=","attributes":{"enabled":true,"nbf":1651103346,"exp":1682639946,"created":1651103946,"updated":1651103946,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651103940,"updated":1651103940}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '95332a3a-6ef1-4982-9e21-47b140c8bcb1',
  'x-ms-request-id',
  '98cf0779-f935-41cc-8c80-e6e375823af9',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1140;da_age=1140;rd_age=1140;brd_age=11933;ra_notif_age=1610;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:06 GMT',
  'Content-Length',
  '2853'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4966fd9c-07f5-4298-83b2-ed2c9918c37d',
  'x-ms-request-id',
  'ed040539-54b3-4b52-8b29-e528f0192d43',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1140;da_age=1140;rd_age=1140;brd_age=11933;ra_notif_age=1610;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f0ddc332-b0f6-4bb7-8503-269d7ef0b576',
  'x-ms-request-id',
  '8f6325fd-4d24-482b-8d42-5c452c966f59',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1140;da_age=1140;rd_age=1140;brd_age=11933;ra_notif_age=1610;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662","deletedDate":1651104307,"scheduledPurgeDate":1651709107,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/ea2af52b445a4fa69938d9ef638c89ba","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/ea2af52b445a4fa69938d9ef638c89ba","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/ea2af52b445a4fa69938d9ef638c89ba","x5t":"qFYr0pcnZSCQijdzmgAB0zd7EtA","cer":"MIIDKDCCAhCgAwIBAgIQNOA1EDF2T/6ehb1i/fhtIzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0OTA2WhcNMjMwNDI3MjM1OTA2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLz4tZDXBXkx6KyI0u+rgAKyJ3OW8II4sb1YxMArV1q8Z/0fCVu4DTo8Uw171JMuG75fPZjldcYLAO9+gpMRiuB0w/vmxRGhXqc2peUCcRUNjlYnL32mVsZWRsaBcBiUrcbXHuzy3eemp/+Niu34P7BJ4AG2QUPrDvQb98o3aIbLMNQh+cjNi/AxbNJ26nlDupRlQsIkpCD32s2aPAqEOAny/RnF0UlYHNeqdingXTqQrK8WTwKTSXfwzx3fHADaE9QsH4SbHaBxyNVOlI+W/uaKgTOw9P62GntZBeQw72zUoFENKO25tKqkDysYogTEdRumoEk6jH88hbi2zI3idlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSUTorVJJM4/xf7oIcjCbqLYH4wHDAdBgNVHQ4EFgQUlE6K1SSTOP8X+6CHIwm6i2B+MBwwDQYJKoZIhvcNAQELBQADggEBAAw5a6H5SRB+Zdy6sbsF2c1pifSx0JIRYiXHXHljjKrRVmJh1EpCudi7ndq2zD6R/2yrmNjgw03fcXQpM9sn59yB8UlpQvdKCC5spALKJPR+saUL+EjTf2xCAEa1W8GThAUIp9vwDAMq+JKFbVxL7wxC7QiB88HSmPWlselTriNzaX4o5mymZChVSd9B9hdvrrPv6IPN2Y/ZjkRhHqhc3GmQm9ah6Jrj3JqCzb7RuQEn9j7DUlkkK1gAx2PYwodkzUtxqThSaEZXnagujQMYr6Pz3AeVctEcAt4SEr8bAoj78ri28CfetFRU5Ygz37oGO8X27mPW0dXaxxbhC+mteTI=","attributes":{"enabled":true,"nbf":1651103346,"exp":1682639946,"created":1651103946,"updated":1651103946,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651103940,"updated":1651103940}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e4d615de-a0bd-4b34-b06f-e9bbdf9facc6',
  'x-ms-request-id',
  '858a4080-2870-4a85-8850-61b8c5f9dc6d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1150;da_age=1150;rd_age=1150;brd_age=11943;ra_notif_age=1620;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:16 GMT',
  'Content-Length',
  '2853'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-5333975925331662')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e8dc4c9b-50f3-45d4-87b4-06b29841bb7b',
  'x-ms-request-id',
  'a0fd8f49-20f7-40f1-9298-aa3dc2a691b9',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1150;da_age=1150;rd_age=1150;brd_age=11943;ra_notif_age=1620;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035","deletedDate":1651104317,"scheduledPurgeDate":1651709117,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035/af8096e78ee742ee9284abc74cf51149","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrestoreacertificate-5912442564353035/af8096e78ee742ee9284abc74cf51149","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrestoreacertificate-5912442564353035/af8096e78ee742ee9284abc74cf51149","x5t":"GF30wEU7L_s-mB28ARNjHLwJl04","cer":"MIIDKDCCAhCgAwIBAgIQWVW6K6baQWWoH7+ovS93+TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0OTM4WhcNMjMwNDI3MjM1OTM4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6MsikDEnsDW7JFalCJhpxSACTylcDm8AasnhSkYHGUKVZG5BrmcbHW0Deo+GNIKrGHjQuAF0ugg7ZNRxUaU6yKoUgvpPVot5/6GOSSUcQiWWIO3xZvQHp8zlnsX9Br3IgMt/Nrcf8XR8Ode1CGjcIf0AfEUJ5w1ackxFgdQaS8BO6eralY2qb/Oujp6KxHOcxJkj1BJwS63zhUeyCiUAEFpm9GLsqQRNb7Gqo9YGvXP9uT9gEsmceIvPkq9vhcthcA/eGvX+sNKYQqW68mS5Ec5FUfCSdCW3QvSdx6SUZkopeqi0aHjXPH+7QRFkB0/9f01EMWArEswgt49xezjahAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTIMtSgxRqq1/jKUcIn8cl9el3HlDAdBgNVHQ4EFgQUyDLUoMUaqtf4ylHCJ/HJfXpdx5QwDQYJKoZIhvcNAQELBQADggEBAF5g4tB5SMTNIp+MIBQyZZaS5OUbU8u4UDa8pojC8YaE2H6gPYFvbUbODN0VzivhOKgaFlBx/BMFNm6Y+6lq2DLtO0aD9ajyATIdGYF6ZaAVY99ReswzSEvA2poYBRhs1LBniE76l3tbhtQp39JJzxg++G9r3lGvZJLX3tieulBpabScaTKHlNoBKBq0yP2BNNsbEIRJDDGmBjzPUuAE1KzsjhqnK7Q/OR0k6tLrs1+ROuOFtcnE5vv5VTcQbRD7lBV75gCyNT67eXOe0IxoMTVeud7Ye1igu3klMAqvoLWyRCG1vzPGQciOr84MbhwU/l7QfDr1h2lUNITVuY96tGA=","attributes":{"enabled":true,"nbf":1651103378,"exp":1682639978,"created":1651103978,"updated":1651103978,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651103972,"updated":1651103972}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e0dddb3f-07be-459c-95e2-8e1acd87b00b',
  'x-ms-request-id',
  'c8cd156f-cc79-419d-96d3-7f220867545b',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1150;da_age=1150;rd_age=1150;brd_age=11943;ra_notif_age=1620;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:16 GMT',
  'Content-Length',
  '2651'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrestoreacertificate-5912442564353035"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '466f87ba-386c-439d-9193-79674331650d',
  'x-ms-request-id',
  'ae1a3314-133d-4d19-be87-942363feb633',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1150;da_age=1150;rd_age=1150;brd_age=11943;ra_notif_age=1620;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrestoreacertificate-5912442564353035"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c41e15e7-b50d-447b-a697-cb6936ea79aa',
  'x-ms-request-id',
  '29a58c12-d950-481a-bd8a-eddcc8e82e76',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1150;da_age=1150;rd_age=1150;brd_age=11943;ra_notif_age=1620;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035","deletedDate":1651104317,"scheduledPurgeDate":1651709117,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035/af8096e78ee742ee9284abc74cf51149","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrestoreacertificate-5912442564353035/af8096e78ee742ee9284abc74cf51149","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrestoreacertificate-5912442564353035/af8096e78ee742ee9284abc74cf51149","x5t":"GF30wEU7L_s-mB28ARNjHLwJl04","cer":"MIIDKDCCAhCgAwIBAgIQWVW6K6baQWWoH7+ovS93+TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0OTM4WhcNMjMwNDI3MjM1OTM4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6MsikDEnsDW7JFalCJhpxSACTylcDm8AasnhSkYHGUKVZG5BrmcbHW0Deo+GNIKrGHjQuAF0ugg7ZNRxUaU6yKoUgvpPVot5/6GOSSUcQiWWIO3xZvQHp8zlnsX9Br3IgMt/Nrcf8XR8Ode1CGjcIf0AfEUJ5w1ackxFgdQaS8BO6eralY2qb/Oujp6KxHOcxJkj1BJwS63zhUeyCiUAEFpm9GLsqQRNb7Gqo9YGvXP9uT9gEsmceIvPkq9vhcthcA/eGvX+sNKYQqW68mS5Ec5FUfCSdCW3QvSdx6SUZkopeqi0aHjXPH+7QRFkB0/9f01EMWArEswgt49xezjahAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTIMtSgxRqq1/jKUcIn8cl9el3HlDAdBgNVHQ4EFgQUyDLUoMUaqtf4ylHCJ/HJfXpdx5QwDQYJKoZIhvcNAQELBQADggEBAF5g4tB5SMTNIp+MIBQyZZaS5OUbU8u4UDa8pojC8YaE2H6gPYFvbUbODN0VzivhOKgaFlBx/BMFNm6Y+6lq2DLtO0aD9ajyATIdGYF6ZaAVY99ReswzSEvA2poYBRhs1LBniE76l3tbhtQp39JJzxg++G9r3lGvZJLX3tieulBpabScaTKHlNoBKBq0yP2BNNsbEIRJDDGmBjzPUuAE1KzsjhqnK7Q/OR0k6tLrs1+ROuOFtcnE5vv5VTcQbRD7lBV75gCyNT67eXOe0IxoMTVeud7Ye1igu3klMAqvoLWyRCG1vzPGQciOr84MbhwU/l7QfDr1h2lUNITVuY96tGA=","attributes":{"enabled":true,"nbf":1651103378,"exp":1682639978,"created":1651103978,"updated":1651103978,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651103972,"updated":1651103972}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '9ba4bf97-59e8-40d6-ac28-64bf308d58ae',
  'x-ms-request-id',
  '38c6b9cf-12e9-4cbf-8398-922b6493d4c7',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1160;da_age=1160;rd_age=1160;brd_age=11953;ra_notif_age=1630;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:27 GMT',
  'Content-Length',
  '2651'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/backupRestoreCertificateName-canrestoreacertificate-5912442564353035')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '34211541-483f-4d67-b1c4-a43d1fee64d2',
  'x-ms-request-id',
  'b0436021-e6c8-4ff5-8363-bbc5c8964c12',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1160;da_age=1160;rd_age=1160;brd_age=11953;ra_notif_age=1630;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258","deletedDate":1651104327,"scheduledPurgeDate":1651709127,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/1ca83ef18901428fac1da416fb2a342c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/1ca83ef18901428fac1da416fb2a342c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/1ca83ef18901428fac1da416fb2a342c","x5t":"NFM-lbQKWDoXzA7_tjdAcWZI2hQ","cer":"MIIDKDCCAhCgAwIBAgIQC/r0gjI5QKizoqB6QKSshTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MDE1WhcNMjMwNDI4MDAwMDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCZ42bBlVPOF+rxLSq/yhjzDrkTVjSCqnOfSOlYFtUBnQLwbs5e27puIoAUjqOt0260Ly1z3XmfwRsQyEI1EQfUzMy5aFbYBhNqmooEISUljxC29Usvg9qVJQw2KzWR+fkGDVwVLzkfp/5D5OxkGyL0x6pqwM3HtHmxybl41onsdPKV96y0LbltU3bcZIRJAjTQAuHyuV15kq/yOCl2OTHPewY8S3g9MEN4x8E38wxdY3nxerNPkncFuFAqz+H2vytk4IolSpABRIQ33rJ164QehIumLOftET2OieNennoBkdlvN/y/foU7Z1YbVWOV1d2RoaujQKk+r5WU7oqh/3HlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS7ZhVxGCoPF5x4ZfP0PJRRRmOjrzAdBgNVHQ4EFgQUu2YVcRgqDxeceGXz9DyUUUZjo68wDQYJKoZIhvcNAQELBQADggEBAFB05Y41y56bDbLxjSXZk/y1RD9cnFa2umofmxDMg6l1dZeiEQ8QAnzJqxiiBcfbnzpsxtqAhQOn00iG7UE6Yl6O3vrEggCDbrfKRvLkYnjP0lV6jMZpRd7To+mgRoS3ZDEn8kiQnd/DzCa2+Nmdd7USa4JeDr5OgkTwNnJMLGUeTaAhhkPHwCvUKE2Qbrq4F14h4Ju+gs3iqKGqkh1ORqMkZMTHxqesdhBTt94d2n/s9HFVeeNB5ZIjXqqB0VHDr5mK1YcBT89C0pVLsbdHIMxehUVlfqjUw6xih+3OFM92Kx9OlfjcCAcmROriMz09Ve2U2ulz96FVmXVHDUSIMPI=","attributes":{"enabled":true,"nbf":1651103415,"exp":1682640015,"created":1651104015,"updated":1651104015,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104004,"updated":1651104004}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7c352577-a28a-4ad3-a65a-d782aceeab21',
  'x-ms-request-id',
  '86965ce0-9f22-462b-85db-cb9a1b5ee197',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1160;da_age=1160;rd_age=1160;brd_age=11954;ra_notif_age=1630;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:27 GMT',
  'Content-Length',
  '2919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '170',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '37cc99ad-94e9-402c-86a5-762ebf29d3f8',
  'x-ms-request-id',
  '7c377e4d-c4ca-4024-9bc9-517ab600456f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1160;da_age=1160;rd_age=1160;brd_age=11954;ra_notif_age=1630;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '170',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'eb81884d-df7e-4330-82d6-da8531012eb4',
  'x-ms-request-id',
  '63218980-25c7-4645-94c7-95e785f40c77',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1161;da_age=1161;rd_age=1161;brd_age=11954;ra_notif_age=1630;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258","deletedDate":1651104327,"scheduledPurgeDate":1651709127,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/1ca83ef18901428fac1da416fb2a342c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/1ca83ef18901428fac1da416fb2a342c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/1ca83ef18901428fac1da416fb2a342c","x5t":"NFM-lbQKWDoXzA7_tjdAcWZI2hQ","cer":"MIIDKDCCAhCgAwIBAgIQC/r0gjI5QKizoqB6QKSshTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MDE1WhcNMjMwNDI4MDAwMDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCZ42bBlVPOF+rxLSq/yhjzDrkTVjSCqnOfSOlYFtUBnQLwbs5e27puIoAUjqOt0260Ly1z3XmfwRsQyEI1EQfUzMy5aFbYBhNqmooEISUljxC29Usvg9qVJQw2KzWR+fkGDVwVLzkfp/5D5OxkGyL0x6pqwM3HtHmxybl41onsdPKV96y0LbltU3bcZIRJAjTQAuHyuV15kq/yOCl2OTHPewY8S3g9MEN4x8E38wxdY3nxerNPkncFuFAqz+H2vytk4IolSpABRIQ33rJ164QehIumLOftET2OieNennoBkdlvN/y/foU7Z1YbVWOV1d2RoaujQKk+r5WU7oqh/3HlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS7ZhVxGCoPF5x4ZfP0PJRRRmOjrzAdBgNVHQ4EFgQUu2YVcRgqDxeceGXz9DyUUUZjo68wDQYJKoZIhvcNAQELBQADggEBAFB05Y41y56bDbLxjSXZk/y1RD9cnFa2umofmxDMg6l1dZeiEQ8QAnzJqxiiBcfbnzpsxtqAhQOn00iG7UE6Yl6O3vrEggCDbrfKRvLkYnjP0lV6jMZpRd7To+mgRoS3ZDEn8kiQnd/DzCa2+Nmdd7USa4JeDr5OgkTwNnJMLGUeTaAhhkPHwCvUKE2Qbrq4F14h4Ju+gs3iqKGqkh1ORqMkZMTHxqesdhBTt94d2n/s9HFVeeNB5ZIjXqqB0VHDr5mK1YcBT89C0pVLsbdHIMxehUVlfqjUw6xih+3OFM92Kx9OlfjcCAcmROriMz09Ve2U2ulz96FVmXVHDUSIMPI=","attributes":{"enabled":true,"nbf":1651103415,"exp":1682640015,"created":1651104015,"updated":1651104015,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104004,"updated":1651104004}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f41568c8-51ba-4d60-9f5d-afbaa6066608',
  'x-ms-request-id',
  '5f2262e8-fa3c-4a0b-b0b1-de832e435ac7',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1171;da_age=1171;rd_age=1171;brd_age=11964;ra_notif_age=1640;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:37 GMT',
  'Content-Length',
  '2919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-16561460751929258')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ce0167d5-96a0-4939-beb9-df46b5bb2e0b',
  'x-ms-request-id',
  '0df2e2c6-e86f-4d43-95b9-da08638276d1',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1171;da_age=1171;rd_age=1171;brd_age=11964;ra_notif_age=1640;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018","deletedDate":1651104338,"scheduledPurgeDate":1651709138,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/0ce945276ea74316b0ddce80e514e70f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/0ce945276ea74316b0ddce80e514e70f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/0ce945276ea74316b0ddce80e514e70f","x5t":"5yWK2gac93DSzzXUJsyj5AJI9Hc","cer":"MIIDKDCCAhCgAwIBAgIQJk3HK7mCSOqaLi0MMcYrCTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzIzWhcNMjMwNDI4MDAwMzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDH/d5WytI0VkNKcM53ULoFzwZLSEad5pd4pUryb8ZcrMXPyJ7Fn3g3tnK+q0Eg5hMxBtjssXBhf/Jw92D4Cu4L64IJkaKDeRP9kZ0FGeIdEgD7Snnr9iP2qRvUR+vIUbGEgPfmnOGXZ52Jg+Z7tcShrVm/9Ta/I+JLYMFwJcCsGmwoniHZqyzjfa4RidUMO20BwddeitqhSpi1kR9Vhnkc+SIfc+yb07KVZgEtvVRly3HfEdCdHC/O7mDPGNCmGGY+pgUcGMF8gWrKOVodWkeHZh82FnViVtP9btFqxXA/2tRPJZkIXTJ0JQIQVNNT+o2a36B8+WnoI02F8Gwt+h7tAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTnHpZOtgbEgnPYdFaRpWbUibbHeDAdBgNVHQ4EFgQU5x6WTrYGxIJz2HRWkaVm1Im2x3gwDQYJKoZIhvcNAQELBQADggEBABES0w1WfIRgvReTx4rflaDe6ORSjSm5ZRb7xpaHHyg1vOFldPAY5VVgVf9ZXNUCk+MbWK6IY5VrvBooFqgfmJrc41YoY7PPxcHfHDqM24lGwcj4CyoiWu5Dalo925QNJxh+rkV5Hee17Yev2PsOGbXNv1NgWMSK09zWigqPwd0IJHpuNFZOrmj4/nt/4hpegJOYQWoc4AHra4pv4cd3ozzgFcvvvEECvKU6qkl8gUZML9ZkdqywpX2742lOIcwNQXH9x27CENkefStNGoCMOvhhLiGSctWIIyY5uDVgG6y/eYJyQl76ULdUdl6TS3HG/bmd63HgDJcRY+t4pmxDxxk=","attributes":{"enabled":true,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104203,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104197,"updated":1651104197}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd56f1afe-983c-4608-b631-fcf9cbb15041',
  'x-ms-request-id',
  'e4010ff8-96cd-4787-9d00-bd458a8703fd',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1171;da_age=1171;rd_age=1171;brd_age=11964;ra_notif_age=1641;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:38 GMT',
  'Content-Length',
  '2799'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-05645269385292018"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f193e7c0-af0e-41da-b9bb-67d6c66a208a',
  'x-ms-request-id',
  'a229e5a4-4daa-4bb7-8351-13c3b5e9e89c',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1171;da_age=1171;rd_age=1171;brd_age=11964;ra_notif_age=1641;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-05645269385292018"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '30061389-be18-4c55-a0f5-85751321d583',
  'x-ms-request-id',
  '15972410-f9ac-486d-a82e-287408f0e139',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1171;da_age=1171;rd_age=1171;brd_age=11964;ra_notif_age=1641;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-05645269385292018"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '284a4e63-0901-4a83-8f4f-748672f91c29',
  'x-ms-request-id',
  'da92fd25-707f-4333-9553-b61945da8db2',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1181;da_age=1181;rd_age=1181;brd_age=11974;ra_notif_age=1651;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018","deletedDate":1651104338,"scheduledPurgeDate":1651709138,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/0ce945276ea74316b0ddce80e514e70f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/0ce945276ea74316b0ddce80e514e70f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/0ce945276ea74316b0ddce80e514e70f","x5t":"5yWK2gac93DSzzXUJsyj5AJI9Hc","cer":"MIIDKDCCAhCgAwIBAgIQJk3HK7mCSOqaLi0MMcYrCTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzIzWhcNMjMwNDI4MDAwMzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDH/d5WytI0VkNKcM53ULoFzwZLSEad5pd4pUryb8ZcrMXPyJ7Fn3g3tnK+q0Eg5hMxBtjssXBhf/Jw92D4Cu4L64IJkaKDeRP9kZ0FGeIdEgD7Snnr9iP2qRvUR+vIUbGEgPfmnOGXZ52Jg+Z7tcShrVm/9Ta/I+JLYMFwJcCsGmwoniHZqyzjfa4RidUMO20BwddeitqhSpi1kR9Vhnkc+SIfc+yb07KVZgEtvVRly3HfEdCdHC/O7mDPGNCmGGY+pgUcGMF8gWrKOVodWkeHZh82FnViVtP9btFqxXA/2tRPJZkIXTJ0JQIQVNNT+o2a36B8+WnoI02F8Gwt+h7tAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTnHpZOtgbEgnPYdFaRpWbUibbHeDAdBgNVHQ4EFgQU5x6WTrYGxIJz2HRWkaVm1Im2x3gwDQYJKoZIhvcNAQELBQADggEBABES0w1WfIRgvReTx4rflaDe6ORSjSm5ZRb7xpaHHyg1vOFldPAY5VVgVf9ZXNUCk+MbWK6IY5VrvBooFqgfmJrc41YoY7PPxcHfHDqM24lGwcj4CyoiWu5Dalo925QNJxh+rkV5Hee17Yev2PsOGbXNv1NgWMSK09zWigqPwd0IJHpuNFZOrmj4/nt/4hpegJOYQWoc4AHra4pv4cd3ozzgFcvvvEECvKU6qkl8gUZML9ZkdqywpX2742lOIcwNQXH9x27CENkefStNGoCMOvhhLiGSctWIIyY5uDVgG6y/eYJyQl76ULdUdl6TS3HG/bmd63HgDJcRY+t4pmxDxxk=","attributes":{"enabled":true,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104203,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104197,"updated":1651104197}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '25648c10-5b91-4040-87e0-3bfd51002e78',
  'x-ms-request-id',
  'f0fb8fb8-4347-4d7b-8171-1434e7d2dedc',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1191;da_age=1191;rd_age=1191;brd_age=11984;ra_notif_age=1661;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:58 GMT',
  'Content-Length',
  '2799'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-05645269385292018')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e3ef9460-3f74-4aec-bf38-fe7e80b1cae1',
  'x-ms-request-id',
  '2d59b150-dfae-4a79-b32c-baf90081b11a',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1191;da_age=1191;rd_age=1191;brd_age=11984;ra_notif_age=1661;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cancreateacertificate-9308648851533552')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreateacertificate-9308648851533552","deletedDate":1651104358,"scheduledPurgeDate":1651709158,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreateacertificate-9308648851533552/ef366032fbc649caac4e31498bd8882a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cancreateacertificate-9308648851533552/ef366032fbc649caac4e31498bd8882a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cancreateacertificate-9308648851533552/ef366032fbc649caac4e31498bd8882a","x5t":"M7mgFhWDkjtqAcKTleQVDNo2v-8","cer":"MIIDKDCCAhCgAwIBAgIQSDycNaHXRdq84h4W7Yp8fjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzE5WhcNMjMwNDI4MDAwMzE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6rwcYkp6lZYT5XA3SIqqDfVE0/aBnFQ9hbpEwq1CPH8ygvCIJGiq0/VtNsRzL5OByFITrZPgXGoPrBZI1q6E2KiX1qsRFG3UlNJ9ej8dwBo0q9HbjAgh6xgLpMoqXQ4mundKpPOP+cPJ1AmumBmeOL67iru6Xkz/DzY7oDKyxxh+k1xl7E3vt5idmVkg0ObrZu9OkZGbou5ADttdVcfikKLFkXb8rNxc/QgcLng3V+MrBy5oPDb1So/iEz+GUkiec7oGAAUXheQTkQNp8HpW6GQP4Lxu/IH++OxZIM0IOq/8tjWr+aprX+c2BYZggJGai1qg0b9mGOer6qeyEyDhRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSru7yoyxQe3+dVX1k681H0hWQaoTAdBgNVHQ4EFgQUq7u8qMsUHt/nVV9ZOvNR9IVkGqEwDQYJKoZIhvcNAQELBQADggEBAKd5BzETmoG6b9rYFk1D2pTmpANAZyaDoYcJ7rW/BHpiopW6ljL2X9CgSJbBnEKO4CdADjGXjI9Q9BiPWAZU7IW+rteYKVW6J3KkZzhLeoiHHVuTvuBvPtKjyGc+C06rbkDOT64jconQDo5u4bbitooM4jC0+JfO+w75tShbqNYERnib+e5cC7izDa01dXrrfoqpkl1hd7pBN5xhwbUPVjhiSDzvKLs5rH2nIk6gvjK6gz2vENu5TEXDphWHB2bXDCUmuW8QDgtnt8sJ7lD+vGSvqlkhnBo27GwdDA0lP8QV16p9rko6jXEzvON5jP9jpqcMkwEPegLT9bSD56Bc/MA=","attributes":{"enabled":true,"nbf":1651103599,"exp":1682640199,"created":1651104200,"updated":1651104200,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreateacertificate-9308648851533552/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104196,"updated":1651104196}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreateacertificate-9308648851533552/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6870236e-90b9-406c-9bc5-41e8ac528610',
  'x-ms-request-id',
  'd522b8fe-69a9-492c-8e11-8a976ec3c4cc',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1191;da_age=1191;rd_age=1191;brd_age=11984;ra_notif_age=1661;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:58 GMT',
  'Content-Length',
  '2751'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreateacertificate-9308648851533552')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreateacertificate-9308648851533552"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '142',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6139dd3b-7bd1-4454-a224-20d5c5b4d92d',
  'x-ms-request-id',
  'cdebdabe-7e0b-44e6-8502-4577cd610a4a',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1191;da_age=1191;rd_age=1191;brd_age=11984;ra_notif_age=1661;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreateacertificate-9308648851533552')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreateacertificate-9308648851533552"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '142',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e112c601-97ad-41ea-9d58-d5d15c7fb955',
  'x-ms-request-id',
  '99504cfd-e6cb-4366-b4aa-a63e5e909d80',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1191;da_age=1191;rd_age=1191;brd_age=11984;ra_notif_age=1661;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:05:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreateacertificate-9308648851533552')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreateacertificate-9308648851533552","deletedDate":1651104358,"scheduledPurgeDate":1651709158,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreateacertificate-9308648851533552/ef366032fbc649caac4e31498bd8882a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cancreateacertificate-9308648851533552/ef366032fbc649caac4e31498bd8882a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cancreateacertificate-9308648851533552/ef366032fbc649caac4e31498bd8882a","x5t":"M7mgFhWDkjtqAcKTleQVDNo2v-8","cer":"MIIDKDCCAhCgAwIBAgIQSDycNaHXRdq84h4W7Yp8fjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzE5WhcNMjMwNDI4MDAwMzE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6rwcYkp6lZYT5XA3SIqqDfVE0/aBnFQ9hbpEwq1CPH8ygvCIJGiq0/VtNsRzL5OByFITrZPgXGoPrBZI1q6E2KiX1qsRFG3UlNJ9ej8dwBo0q9HbjAgh6xgLpMoqXQ4mundKpPOP+cPJ1AmumBmeOL67iru6Xkz/DzY7oDKyxxh+k1xl7E3vt5idmVkg0ObrZu9OkZGbou5ADttdVcfikKLFkXb8rNxc/QgcLng3V+MrBy5oPDb1So/iEz+GUkiec7oGAAUXheQTkQNp8HpW6GQP4Lxu/IH++OxZIM0IOq/8tjWr+aprX+c2BYZggJGai1qg0b9mGOer6qeyEyDhRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSru7yoyxQe3+dVX1k681H0hWQaoTAdBgNVHQ4EFgQUq7u8qMsUHt/nVV9ZOvNR9IVkGqEwDQYJKoZIhvcNAQELBQADggEBAKd5BzETmoG6b9rYFk1D2pTmpANAZyaDoYcJ7rW/BHpiopW6ljL2X9CgSJbBnEKO4CdADjGXjI9Q9BiPWAZU7IW+rteYKVW6J3KkZzhLeoiHHVuTvuBvPtKjyGc+C06rbkDOT64jconQDo5u4bbitooM4jC0+JfO+w75tShbqNYERnib+e5cC7izDa01dXrrfoqpkl1hd7pBN5xhwbUPVjhiSDzvKLs5rH2nIk6gvjK6gz2vENu5TEXDphWHB2bXDCUmuW8QDgtnt8sJ7lD+vGSvqlkhnBo27GwdDA0lP8QV16p9rko6jXEzvON5jP9jpqcMkwEPegLT9bSD56Bc/MA=","attributes":{"enabled":true,"nbf":1651103599,"exp":1682640199,"created":1651104200,"updated":1651104200,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreateacertificate-9308648851533552/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104196,"updated":1651104196}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreateacertificate-9308648851533552/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7e70ecdf-3883-4280-9fc0-87be478c707c',
  'x-ms-request-id',
  '93623861-d8e4-4ab1-8b58-ad2966ee40c4',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1201;da_age=1201;rd_age=1201;brd_age=11994;ra_notif_age=1671;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:08 GMT',
  'Content-Length',
  '2751'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cancreateacertificate-9308648851533552')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd83310bd-2ff2-4d58-a194-a484be4a2c7f',
  'x-ms-request-id',
  'c0ffd94d-7e6c-4ee6-8ca0-dc97439b1e4b',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1201;da_age=1201;rd_age=1201;brd_age=11995;ra_notif_age=1671;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806","deletedDate":1651104368,"scheduledPurgeDate":1651709168,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806/5f46e0d7651e49eba2e77dd2fb4640b8","attributes":{"enabled":false,"nbf":1651103648,"exp":1682640248,"created":1651104248,"updated":1651104248,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806"},"attributes":{"enabled":true,"created":1651104248,"updated":1651104248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c6ccd3b6-f26c-48a6-a0d9-1106fe6682d5',
  'x-ms-request-id',
  '91457009-4291-45c6-aba6-1118484a421e',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1202;da_age=1202;rd_age=1202;brd_age=11995;ra_notif_age=1671;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:08 GMT',
  'Content-Length',
  '1482'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4fdf396e-7234-4312-972a-5139478a8dc9',
  'x-ms-request-id',
  '1f56508f-e1c2-47be-bbc5-e66b57038c77',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1202;da_age=1202;rd_age=1202;brd_age=11995;ra_notif_age=1671;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3f8d7753-d7dc-4ef7-9e63-64f8d6808f1a',
  'x-ms-request-id',
  '7cadecd2-5244-42b4-95ab-e73fad99f4fa',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1202;da_age=1202;rd_age=1202;brd_age=11995;ra_notif_age=1671;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806","deletedDate":1651104368,"scheduledPurgeDate":1651709168,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806/5f46e0d7651e49eba2e77dd2fb4640b8","attributes":{"enabled":false,"nbf":1651103648,"exp":1682640248,"created":1651104248,"updated":1651104248,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806"},"attributes":{"enabled":true,"created":1651104248,"updated":1651104248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3ed6b7ee-36a8-4000-88bf-3531feb2be1f',
  'x-ms-request-id',
  '94b7ab21-7747-4ecc-b3bb-bce82b37ccb9',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1212;da_age=1212;rd_age=1212;brd_age=12005;ra_notif_age=1681;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:18 GMT',
  'Content-Length',
  '1482'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-31136341314581806')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '092a3b63-8265-4e9b-a39b-9ecbe563fb37',
  'x-ms-request-id',
  'ec2b8963-015f-4055-8a71-686ffeb24be2',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1212;da_age=1212;rd_age=1212;brd_age=12005;ra_notif_age=1681;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-candisableacertificate-023132532376494375')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificate-023132532376494375","deletedDate":1651104379,"scheduledPurgeDate":1651709179,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-023132532376494375/a56ff4ed14bd4006a2c9b90740fb3237","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-023132532376494375/a56ff4ed14bd4006a2c9b90740fb3237","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-023132532376494375/a56ff4ed14bd4006a2c9b90740fb3237","x5t":"uBfmo-WIMOJGncsRXn67lfTj2Ec","cer":"MIIDKDCCAhCgAwIBAgIQQb2ttAHdRJ6kI1Ets+1oZzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzIzWhcNMjMwNDI4MDAwMzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXbFsJEoSUXwr0mEwSFDy0XVmsCsJZR7DlUJ6DbdAK/MUMPWpmS5dAZ98i1YBpu8BEgvuSW+eGRviFdgce+UIeb87dnLoo1PQWridT7JVHaaaz99v/ojr3oh+/3CQgmW0niJvWzdSyvWqMGue648e6DPsP++MlfXs8kivmpGtB3esloDDXijgcDonFa8Ac8fW+AsBSJwn3MVa8g6dHAAtfa30+6MS2rcyLKW3tY9U7S+e3UoeJQqt173gqTFSVF9Yxvvl/SavMpkpzs2SKfKYxq74YqYK888wyJloLayijiqFtHzbZrl4LHaCA9uo7wOyXcYdR6W8BjVhU9zF9d5ohAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQy8/c/MOjR7bxrxLh5QdZ2rxQ1fjAdBgNVHQ4EFgQUMvP3PzDo0e28a8S4eUHWdq8UNX4wDQYJKoZIhvcNAQELBQADggEBAGDcU7GuFopvCx/Rfnxf2NzWu+/uF+8dEraP+nyYg2zNLqIUbK/BnO7d7y9CEKQeH2kSt9GahNTGGopRmeNkB54a8+5Mpx9uVFfPMvNBMRgovBDEbPvvs+VUiC3KsuXtQnBbbUYA5cDjq93CtSfmC7fv1erXp3vKhHfVafshHfG+AeW4tYxL65Gnx4WsJ1x9J8a/7Usd+URYCj607HSRm8rKzp0J9OdKYfBbEzXxcoqNcZ78vmFY8KLRNnkLAWrT3w4IujIuomRba5kLcRAPrE3hu1VFTpdfLGeowYiZu/kqAJZ7JbHBdhOalsSRulQWH67g92A2o59Dd++OY+B9r7Y=","attributes":{"enabled":false,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104210,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-023132532376494375/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104200,"updated":1651104200}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-023132532376494375/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b48c7f5c-58f7-4d12-a23b-78d6875e6af3',
  'x-ms-request-id',
  '9172a3df-cc1a-48c9-ae48-773be950228c',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1212;da_age=1212;rd_age=1212;brd_age=12005;ra_notif_age=1682;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:18 GMT',
  'Content-Length',
  '2770'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-023132532376494375')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-023132532376494375"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '102b2e89-3e5d-4d03-9b58-87554821df2b',
  'x-ms-request-id',
  '274e5f2c-adb5-4b62-976c-75837edc8fa9',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1212;da_age=1212;rd_age=1212;brd_age=12005;ra_notif_age=1682;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-023132532376494375')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-023132532376494375"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0734e8e3-96aa-4e64-bac6-73716816f103',
  'x-ms-request-id',
  'd6bea378-dd59-4edc-8a9e-8e1407d0252f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1212;da_age=1212;rd_age=1212;brd_age=12005;ra_notif_age=1682;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-023132532376494375')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificate-023132532376494375","deletedDate":1651104379,"scheduledPurgeDate":1651709179,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-023132532376494375/a56ff4ed14bd4006a2c9b90740fb3237","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-023132532376494375/a56ff4ed14bd4006a2c9b90740fb3237","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-023132532376494375/a56ff4ed14bd4006a2c9b90740fb3237","x5t":"uBfmo-WIMOJGncsRXn67lfTj2Ec","cer":"MIIDKDCCAhCgAwIBAgIQQb2ttAHdRJ6kI1Ets+1oZzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzIzWhcNMjMwNDI4MDAwMzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXbFsJEoSUXwr0mEwSFDy0XVmsCsJZR7DlUJ6DbdAK/MUMPWpmS5dAZ98i1YBpu8BEgvuSW+eGRviFdgce+UIeb87dnLoo1PQWridT7JVHaaaz99v/ojr3oh+/3CQgmW0niJvWzdSyvWqMGue648e6DPsP++MlfXs8kivmpGtB3esloDDXijgcDonFa8Ac8fW+AsBSJwn3MVa8g6dHAAtfa30+6MS2rcyLKW3tY9U7S+e3UoeJQqt173gqTFSVF9Yxvvl/SavMpkpzs2SKfKYxq74YqYK888wyJloLayijiqFtHzbZrl4LHaCA9uo7wOyXcYdR6W8BjVhU9zF9d5ohAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQy8/c/MOjR7bxrxLh5QdZ2rxQ1fjAdBgNVHQ4EFgQUMvP3PzDo0e28a8S4eUHWdq8UNX4wDQYJKoZIhvcNAQELBQADggEBAGDcU7GuFopvCx/Rfnxf2NzWu+/uF+8dEraP+nyYg2zNLqIUbK/BnO7d7y9CEKQeH2kSt9GahNTGGopRmeNkB54a8+5Mpx9uVFfPMvNBMRgovBDEbPvvs+VUiC3KsuXtQnBbbUYA5cDjq93CtSfmC7fv1erXp3vKhHfVafshHfG+AeW4tYxL65Gnx4WsJ1x9J8a/7Usd+URYCj607HSRm8rKzp0J9OdKYfBbEzXxcoqNcZ78vmFY8KLRNnkLAWrT3w4IujIuomRba5kLcRAPrE3hu1VFTpdfLGeowYiZu/kqAJZ7JbHBdhOalsSRulQWH67g92A2o59Dd++OY+B9r7Y=","attributes":{"enabled":false,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104210,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-023132532376494375/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104200,"updated":1651104200}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-023132532376494375/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd1022a32-7f6a-415a-b269-a100e484280e',
  'x-ms-request-id',
  'cdd337a5-58c1-49f6-b4c6-3da58005f0cb',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1222;da_age=1222;rd_age=1222;brd_age=12015;ra_notif_age=1692;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:28 GMT',
  'Content-Length',
  '2770'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candisableacertificate-023132532376494375')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '22116166-4468-4364-8f8a-9f7abbb18c29',
  'x-ms-request-id',
  '32ec570f-2f99-4ff6-80fb-eb4b415a61b1',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1222;da_age=1222;rd_age=1222;brd_age=12015;ra_notif_age=1692;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-candisableacertificateversion-5846770454674455')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificateversion-5846770454674455","deletedDate":1651104389,"scheduledPurgeDate":1651709189,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-5846770454674455/587e0fa40ad546deb7082ae5191b0635","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-5846770454674455/587e0fa40ad546deb7082ae5191b0635","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-5846770454674455/587e0fa40ad546deb7082ae5191b0635","x5t":"6ITba8Exgv_GIajiPzCJLLkJrJ4","cer":"MIIDKDCCAhCgAwIBAgIQe8i3iysmRpuQnmgAVDzl+DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzM1WhcNMjMwNDI4MDAwMzM1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJsv25CD2iTUgP7EnMIKvOzQMc06vHq2JDbfR7O8hLs+NdMIXJlN8YVqBSU2i8avEOu2Z1L5+UyqZd4u5enEnA+bnRx7AmCzdZLh6nKDApD878PrRhyUOdfRqqLKGg46dI4u2S0tCKstwRQGuwJucGZo6bu3bP7Vv+Yzsrgo4MFg6TezbmlqO2wYtpgSjnoCekV4F60CKVvWj8Ke16r5yPfyPoJG/YyaaG7eLb84WaCOfn6jhI7rE89QPNL8i5SwrgMieWqJOD9+tC2KYH9bEpFXUQvWRmVcMHaNe/IGqRl4Mo3xoOl6d7WGzClKySGhCyDf3UW/EEfjG7xnEKkG+BAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQWE35ura+xZgxRlUV0O3F7dPgn6zAdBgNVHQ4EFgQUFhN+bq2vsWYMUZVFdDtxe3T4J+swDQYJKoZIhvcNAQELBQADggEBAMb9TERLVUCapNr/PtplL0aGOIyfcYUNGzdWdGuGIrssJqsfhw8G4ErAWczrjpoQVWOhoH9ZQ7ERF3OtZVVxGsNeyH/c6iXVJV7oSgc3eBWs+Xfb+U/ogUMxH8rCEa4plu04zmG3bJb/y8WDrzRhpmtUwCAje13ISf4L9DUYuqr02I/aw39IGAgcn2oC5LctVvx4dHKrNn7yezM6vy9nd8yf8HBYNA/8PD06wOOOglavRFchbAgfUjC8OfcL4dTa3/cz5lYEUD56hq+StZVqMApHfrCaMDQwtSKByT4YBbARFt8vOrkYOEP8lwKQew5FpbbwAWKZhtbY5sOUQSejZoQ=","attributes":{"enabled":false,"nbf":1651103615,"exp":1682640215,"created":1651104215,"updated":1651104222,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-5846770454674455/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104211,"updated":1651104211}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-5846770454674455/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd120879d-21bf-4258-bbc3-09065173801f',
  'x-ms-request-id',
  'a6cfe50f-0609-44d6-8fe9-8ee01ee796b9',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1222;da_age=1222;rd_age=1222;brd_age=12015;ra_notif_age=1692;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:28 GMT',
  'Content-Length',
  '2800'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-5846770454674455')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-5846770454674455"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b74468ac-81eb-44f0-94fd-805488f7162b',
  'x-ms-request-id',
  '3f5e7842-c498-432e-b289-5bbc76a23473',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1222;da_age=1222;rd_age=1222;brd_age=12015;ra_notif_age=1692;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-5846770454674455')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-5846770454674455"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2af24615-c8f5-41dc-b510-d5fe82f04d4a',
  'x-ms-request-id',
  '27c19564-c3ab-47f2-be6b-3681179c713b',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1222;da_age=1222;rd_age=1222;brd_age=12015;ra_notif_age=1692;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-5846770454674455')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificateversion-5846770454674455","deletedDate":1651104389,"scheduledPurgeDate":1651709189,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-5846770454674455/587e0fa40ad546deb7082ae5191b0635","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-5846770454674455/587e0fa40ad546deb7082ae5191b0635","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-5846770454674455/587e0fa40ad546deb7082ae5191b0635","x5t":"6ITba8Exgv_GIajiPzCJLLkJrJ4","cer":"MIIDKDCCAhCgAwIBAgIQe8i3iysmRpuQnmgAVDzl+DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzM1WhcNMjMwNDI4MDAwMzM1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJsv25CD2iTUgP7EnMIKvOzQMc06vHq2JDbfR7O8hLs+NdMIXJlN8YVqBSU2i8avEOu2Z1L5+UyqZd4u5enEnA+bnRx7AmCzdZLh6nKDApD878PrRhyUOdfRqqLKGg46dI4u2S0tCKstwRQGuwJucGZo6bu3bP7Vv+Yzsrgo4MFg6TezbmlqO2wYtpgSjnoCekV4F60CKVvWj8Ke16r5yPfyPoJG/YyaaG7eLb84WaCOfn6jhI7rE89QPNL8i5SwrgMieWqJOD9+tC2KYH9bEpFXUQvWRmVcMHaNe/IGqRl4Mo3xoOl6d7WGzClKySGhCyDf3UW/EEfjG7xnEKkG+BAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQWE35ura+xZgxRlUV0O3F7dPgn6zAdBgNVHQ4EFgQUFhN+bq2vsWYMUZVFdDtxe3T4J+swDQYJKoZIhvcNAQELBQADggEBAMb9TERLVUCapNr/PtplL0aGOIyfcYUNGzdWdGuGIrssJqsfhw8G4ErAWczrjpoQVWOhoH9ZQ7ERF3OtZVVxGsNeyH/c6iXVJV7oSgc3eBWs+Xfb+U/ogUMxH8rCEa4plu04zmG3bJb/y8WDrzRhpmtUwCAje13ISf4L9DUYuqr02I/aw39IGAgcn2oC5LctVvx4dHKrNn7yezM6vy9nd8yf8HBYNA/8PD06wOOOglavRFchbAgfUjC8OfcL4dTa3/cz5lYEUD56hq+StZVqMApHfrCaMDQwtSKByT4YBbARFt8vOrkYOEP8lwKQew5FpbbwAWKZhtbY5sOUQSejZoQ=","attributes":{"enabled":false,"nbf":1651103615,"exp":1682640215,"created":1651104215,"updated":1651104222,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-5846770454674455/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104211,"updated":1651104211}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-5846770454674455/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '60e09118-dbc3-4cbd-8936-674888874532',
  'x-ms-request-id',
  'e5141d6c-b60c-4671-9f44-ac9e70dbb9db',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1232;da_age=1232;rd_age=1232;brd_age=12025;ra_notif_age=1702;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:38 GMT',
  'Content-Length',
  '2800'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-5846770454674455')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e602b5c1-ca70-436e-acde-1abc1c91b5de',
  'x-ms-request-id',
  'ddbb964b-d6ba-4bf4-a66e-27c94e658f82',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1232;da_age=1232;rd_age=1232;brd_age=12025;ra_notif_age=1702;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cangetacertificate-8643230698468862')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificate-8643230698468862","deletedDate":1651104399,"scheduledPurgeDate":1651709199,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificate-8643230698468862/1d2912b901624427be7601ad0557ab13","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificate-8643230698468862/1d2912b901624427be7601ad0557ab13","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificate-8643230698468862/1d2912b901624427be7601ad0557ab13","x5t":"ZhleYqAb8S2NrllUISuQjzflizI","cer":"MIIDKDCCAhCgAwIBAgIQLCQVt1/UQo2Qk2fWtF2FizANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzQ2WhcNMjMwNDI4MDAwMzQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDa3kvCOFr8J4bMOsNEsIYc+wihxdSrEtMW09SIYu3rgjhvwskCnnkD06L03JORbcwW7JogZqgfYp01QfJ5Zg6DxSG6ikycI8sjUeU9KwaGLrakO1Syl+E+FaGdKlbnEnX5/ZqEYchZE0ZHwJCl29MdKQi7NDAI8T24EFCb60EVlVgJZGDloqpC30Rz8YdBUyTrNPtQSY5t9mQLX1M6sPJHD2cNHcSFvZ6BEDQ4b523uyZi1Nb//XFQ5jNjPB2UWvn4xYwxFANvkYQLQ9tZvAANaDprJ7LjZYZ0rC1D4MqgZg7YPAfgL4Qhr+gUWfCdShDvFBFHWfarLzDqS43Ewyk5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBT9Nt1tro+Tzlj0j6cUWw4Zpci9ZjAdBgNVHQ4EFgQU/Tbdba6Pk85Y9I+nFFsOGaXIvWYwDQYJKoZIhvcNAQELBQADggEBAJ0zrqH655CFgIOciiG1KnIbY3KqfZ4c2jl5tY5/w+FLUV9rt7fhcQlTTN1AsMOE8xiCrob/uX+LLoAOgQSfnctChcLcepomrwCRJSZyY19T2DXn3amlvi3InjfTv2Q0XwvAYF5i3yq9biwzkBc1zqvhiWoroNKyMa1IgH9OGyZQNYRpQFSMJMAyy2gVDYkqRPVk243aUxA16gqMf/HVcM8bRZL0o+OpKkj1+oniZ63v8NV13y3omoxD9tCdHqKdLqX/5ors1S/Gv6vHSjsHP27M0T7hDrpbuGknbzFvoNoRZk7Fs3vVYFwGa5iFxkGIlcsZdVK0JJ/QWIxv+DZEH7I=","attributes":{"enabled":true,"nbf":1651103626,"exp":1682640226,"created":1651104226,"updated":1651104226,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificate-8643230698468862/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104223,"updated":1651104223}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificate-8643230698468862/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f1641a98-c7ed-46eb-a9bf-ac47e186ff1e',
  'x-ms-request-id',
  '52cb9d97-cead-4e9a-a357-3836b9a06a46',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1232;da_age=1232;rd_age=1232;brd_age=12026;ra_notif_age=1702;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:39 GMT',
  'Content-Length',
  '2733'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificate-8643230698468862')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificate-8643230698468862"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '337632ee-cbf4-43ff-869a-8073a92183ac',
  'x-ms-request-id',
  '45b20fe5-ee1d-4537-a949-24f5012fd121',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1233;da_age=1233;rd_age=1233;brd_age=12026;ra_notif_age=1702;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificate-8643230698468862')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificate-8643230698468862"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6db56632-bc12-4013-b746-9e99fb933957',
  'x-ms-request-id',
  '17013c68-cc21-433a-bc82-8d5b5f78d8a4',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1233;da_age=1233;rd_age=1233;brd_age=12026;ra_notif_age=1702;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificate-8643230698468862')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificate-8643230698468862","deletedDate":1651104399,"scheduledPurgeDate":1651709199,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificate-8643230698468862/1d2912b901624427be7601ad0557ab13","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificate-8643230698468862/1d2912b901624427be7601ad0557ab13","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificate-8643230698468862/1d2912b901624427be7601ad0557ab13","x5t":"ZhleYqAb8S2NrllUISuQjzflizI","cer":"MIIDKDCCAhCgAwIBAgIQLCQVt1/UQo2Qk2fWtF2FizANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzQ2WhcNMjMwNDI4MDAwMzQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDa3kvCOFr8J4bMOsNEsIYc+wihxdSrEtMW09SIYu3rgjhvwskCnnkD06L03JORbcwW7JogZqgfYp01QfJ5Zg6DxSG6ikycI8sjUeU9KwaGLrakO1Syl+E+FaGdKlbnEnX5/ZqEYchZE0ZHwJCl29MdKQi7NDAI8T24EFCb60EVlVgJZGDloqpC30Rz8YdBUyTrNPtQSY5t9mQLX1M6sPJHD2cNHcSFvZ6BEDQ4b523uyZi1Nb//XFQ5jNjPB2UWvn4xYwxFANvkYQLQ9tZvAANaDprJ7LjZYZ0rC1D4MqgZg7YPAfgL4Qhr+gUWfCdShDvFBFHWfarLzDqS43Ewyk5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBT9Nt1tro+Tzlj0j6cUWw4Zpci9ZjAdBgNVHQ4EFgQU/Tbdba6Pk85Y9I+nFFsOGaXIvWYwDQYJKoZIhvcNAQELBQADggEBAJ0zrqH655CFgIOciiG1KnIbY3KqfZ4c2jl5tY5/w+FLUV9rt7fhcQlTTN1AsMOE8xiCrob/uX+LLoAOgQSfnctChcLcepomrwCRJSZyY19T2DXn3amlvi3InjfTv2Q0XwvAYF5i3yq9biwzkBc1zqvhiWoroNKyMa1IgH9OGyZQNYRpQFSMJMAyy2gVDYkqRPVk243aUxA16gqMf/HVcM8bRZL0o+OpKkj1+oniZ63v8NV13y3omoxD9tCdHqKdLqX/5ors1S/Gv6vHSjsHP27M0T7hDrpbuGknbzFvoNoRZk7Fs3vVYFwGa5iFxkGIlcsZdVK0JJ/QWIxv+DZEH7I=","attributes":{"enabled":true,"nbf":1651103626,"exp":1682640226,"created":1651104226,"updated":1651104226,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificate-8643230698468862/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104223,"updated":1651104223}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificate-8643230698468862/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f3aa5fda-1a7c-4ebb-b1bb-626a79c81241',
  'x-ms-request-id',
  'b861f878-2fc0-4f02-8042-a4f825cfb411',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1243;da_age=1243;rd_age=1243;brd_age=12036;ra_notif_age=1712;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:49 GMT',
  'Content-Length',
  '2733'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cangetacertificate-8643230698468862')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3559cdbb-5da1-427f-91f4-acb0b89edfc0',
  'x-ms-request-id',
  '1a638bcc-5dce-4308-88fb-8df2b02fb131',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1243;da_age=1243;rd_age=1243;brd_age=12036;ra_notif_age=1712;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266","deletedDate":1651104410,"scheduledPurgeDate":1651709210,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/8fae27411a414092af3284f15ce02384","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/8fae27411a414092af3284f15ce02384","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/8fae27411a414092af3284f15ce02384","x5t":"FM3E1HIDH_l1dw2_rqpgD3uCtYM","cer":"MIIDKDCCAhCgAwIBAgIQQA4hpKamTnqISR0aIhE8tTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzUxWhcNMjMwNDI4MDAwMzUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCuU3+XTHSt8FLjOSn+9esOLOzjN/sHiS04I1DvU5HzqUdAavKtzkYry6WHqcgUcYws7jqf7v1CVpSdUhglg7igo+gr0uy9RJOLSeuZ5Muu8WkyonNh4ImAS06Kr42z0pxzvEDeAaKJGFlpYE19QtOgFHm5p2pKsI9QRfpF3a60PEdvQF1nzsVZjiFbwYOQL57St5FwLZQ6m/Ak63ttML9bAXCHBREvLC1wKz3I23hK+p1pOv/skvoicXSDfjbFHVZiq9ZUzxMMG+bCPLeAOXloNd6rUyxVTrMMha2YWFguV/YB+Z6bAvpUWPFreSmz8rzPv/NxtbkwwGqago9yAs2xAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRywzKT2UhCIApoQasEs0+UtFcxTTAdBgNVHQ4EFgQUcsMyk9lIQiAKaEGrBLNPlLRXMU0wDQYJKoZIhvcNAQELBQADggEBAGYfDVcgPB7S0t2kHs784D2GjYPfXSkzp1BqnxHmLpGRPyZmp0yvePt5HQRe5/lPgvZloJQo3zkRVq61dc2VeHMsNEJpq7XvcgNdZt6nrr+Pp2aS0X+bphwLrr4H4xKqAkUK9sS/GJrRrwKhA/C5TkR7uWpAus8F+rtc13bXTIGCcJaphNrDRDlQ7JOWWQe91F4IQgf4NZgg34e3Lf2Git5RYxn/KlQGLCVYLry+zXEu4RQzB0F2dY9EvZ4i+USuLRDyEt0NlnQTASUAHoL7+7na17PmpkBWHgc2D6njNpDa56cSKbhMfurK+xUKtSsXEq6jiUZ6IiN4YlDoC/rg8Jw=","attributes":{"enabled":true,"nbf":1651103631,"exp":1682640231,"created":1651104232,"updated":1651104232,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104224,"updated":1651104224}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2cf5394b-92c6-472a-9843-b1e62395d235',
  'x-ms-request-id',
  'ed045505-2882-4349-a03f-d118851c4721',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1243;da_age=1243;rd_age=1243;brd_age=12036;ra_notif_age=1713;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:49 GMT',
  'Content-Length',
  '2849'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '158',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8128c66d-a9b2-429f-83c7-fac21a49db8d',
  'x-ms-request-id',
  '6f651227-aeb6-4022-b04a-de6e084729fe',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1243;da_age=1243;rd_age=1243;brd_age=12036;ra_notif_age=1713;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '158',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4f933bce-25ec-4513-8226-0eabdc195c5c',
  'x-ms-request-id',
  '90a632a4-b15c-4772-bff0-1fe97ed042c4',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1243;da_age=1243;rd_age=1243;brd_age=12036;ra_notif_age=1713;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266","deletedDate":1651104410,"scheduledPurgeDate":1651709210,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/8fae27411a414092af3284f15ce02384","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/8fae27411a414092af3284f15ce02384","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/8fae27411a414092af3284f15ce02384","x5t":"FM3E1HIDH_l1dw2_rqpgD3uCtYM","cer":"MIIDKDCCAhCgAwIBAgIQQA4hpKamTnqISR0aIhE8tTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzUxWhcNMjMwNDI4MDAwMzUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCuU3+XTHSt8FLjOSn+9esOLOzjN/sHiS04I1DvU5HzqUdAavKtzkYry6WHqcgUcYws7jqf7v1CVpSdUhglg7igo+gr0uy9RJOLSeuZ5Muu8WkyonNh4ImAS06Kr42z0pxzvEDeAaKJGFlpYE19QtOgFHm5p2pKsI9QRfpF3a60PEdvQF1nzsVZjiFbwYOQL57St5FwLZQ6m/Ak63ttML9bAXCHBREvLC1wKz3I23hK+p1pOv/skvoicXSDfjbFHVZiq9ZUzxMMG+bCPLeAOXloNd6rUyxVTrMMha2YWFguV/YB+Z6bAvpUWPFreSmz8rzPv/NxtbkwwGqago9yAs2xAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRywzKT2UhCIApoQasEs0+UtFcxTTAdBgNVHQ4EFgQUcsMyk9lIQiAKaEGrBLNPlLRXMU0wDQYJKoZIhvcNAQELBQADggEBAGYfDVcgPB7S0t2kHs784D2GjYPfXSkzp1BqnxHmLpGRPyZmp0yvePt5HQRe5/lPgvZloJQo3zkRVq61dc2VeHMsNEJpq7XvcgNdZt6nrr+Pp2aS0X+bphwLrr4H4xKqAkUK9sS/GJrRrwKhA/C5TkR7uWpAus8F+rtc13bXTIGCcJaphNrDRDlQ7JOWWQe91F4IQgf4NZgg34e3Lf2Git5RYxn/KlQGLCVYLry+zXEu4RQzB0F2dY9EvZ4i+USuLRDyEt0NlnQTASUAHoL7+7na17PmpkBWHgc2D6njNpDa56cSKbhMfurK+xUKtSsXEq6jiUZ6IiN4YlDoC/rg8Jw=","attributes":{"enabled":true,"nbf":1651103631,"exp":1682640231,"created":1651104232,"updated":1651104232,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104224,"updated":1651104224}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4ba7ec91-4fbe-4850-9c42-33763bb95881',
  'x-ms-request-id',
  '98d73635-e3fd-443f-bd8c-57ccf3938c23',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1253;da_age=1253;rd_age=1253;brd_age=12046;ra_notif_age=1723;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:59 GMT',
  'Content-Length',
  '2849'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-43309620124185266')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f5b178d2-a5ef-446c-9baa-dbd54eb26854',
  'x-ms-request-id',
  '0e82f418-dd38-485e-a52b-9bacbb1f3893',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1253;da_age=1253;rd_age=1253;brd_age=12046;ra_notif_age=1723;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987","deletedDate":1651104420,"scheduledPurgeDate":1651709220,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/dbc8e1971aac4a3486d926c40a7e134f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/dbc8e1971aac4a3486d926c40a7e134f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/dbc8e1971aac4a3486d926c40a7e134f","x5t":"3h-2LJAF7bNgUAo_DtBFOe3iheU","cer":"MIIDKDCCAhCgAwIBAgIQe3AHsAwWTKacxO52bMPUPzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzU4WhcNMjMwNDI4MDAwMzU4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDhQqACcVI5oFOxD8c7cF8NSev/PtKZoTfJJR1DMFBKfdCO+KkIrKK/sF5cLZlnQuRjGnqZkSMP+cqbs7ptgFMA33sxiMKIvWhAH6BdS0E1A6dH3yoqGYEp3iWkubyCy3V/X9IIHXvnOhz3/kbrAZ+B1atHS3VaY2oJqWitdTsJ3P9YWPiEEXhTnCXSyJAoZT5CLynRreUCuPjpT9huxIL/irtC0iKEnzE0nGbw0ePMpDSynTSio4/EXC3+UCl+m0TDkc/Fvt++u9sHIarr+jIXkp55j94CdvqQT5E7Sspu8tGXaaOYI5iDzWuJRKmQYcJOhiQFs8fRLtagCDmlRum5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR7JvT2SSHdNLLputvTEI3wEEt+GDAdBgNVHQ4EFgQUeyb09kkh3TSy6brb0xCN8BBLfhgwDQYJKoZIhvcNAQELBQADggEBAKmG18/4+PkykzKRgEgwdCi3Rxqb5fRIiBzub9Rxmn0WvWFHKmaF7VX0dj4Dab6nzbjk3n5xNQ/woRg/gMt09RmmPim3tNV8WXg6YnzFLuPXzaIAs2oQeudMQC8+QCECMZU0tHxoS0YuF0r9PLgdTUkppZgHitu0mAvGN1BGLdFKRLvOT+w83xhdC+X/5OBgvGS+NpuWOTz/IVzDEY28TKqWOUUlWiUOU8yOVHdo3TFz5mbyGP0khEGoLyNlhj6i/x9aIyt6t/wrvZGcOnYcmlXSxrt1CnmJFTSZ3OarkMHF4QIZWzrrPLLr+oKosG4opwkiWIbFrO3gHD3EImjbwZI=","attributes":{"enabled":true,"nbf":1651103638,"exp":1682640238,"created":1651104239,"updated":1651104239,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104235,"updated":1651104235}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2432929f-6ef5-4b7d-ac5f-7a0dacd17528',
  'x-ms-request-id',
  '2da12979-7ace-49c7-ba09-17c9771f01ec',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1253;da_age=1253;rd_age=1253;brd_age=12046;ra_notif_age=1723;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:59 GMT',
  'Content-Length',
  '2907'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '168',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f80e0492-65c3-491a-ae72-fcbe891551b8',
  'x-ms-request-id',
  '8aa07eed-f7d2-4149-9625-8cc28b6c5edc',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1253;da_age=1253;rd_age=1253;brd_age=12046;ra_notif_age=1723;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '168',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b97e7b3c-41c9-4fd8-899d-18eef7e99705',
  'x-ms-request-id',
  '58e431d3-75dd-443a-8706-c87beb3d3ff2',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1253;da_age=1253;rd_age=1253;brd_age=12046;ra_notif_age=1723;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:06:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987","deletedDate":1651104420,"scheduledPurgeDate":1651709220,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/dbc8e1971aac4a3486d926c40a7e134f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/dbc8e1971aac4a3486d926c40a7e134f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/dbc8e1971aac4a3486d926c40a7e134f","x5t":"3h-2LJAF7bNgUAo_DtBFOe3iheU","cer":"MIIDKDCCAhCgAwIBAgIQe3AHsAwWTKacxO52bMPUPzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzU4WhcNMjMwNDI4MDAwMzU4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDhQqACcVI5oFOxD8c7cF8NSev/PtKZoTfJJR1DMFBKfdCO+KkIrKK/sF5cLZlnQuRjGnqZkSMP+cqbs7ptgFMA33sxiMKIvWhAH6BdS0E1A6dH3yoqGYEp3iWkubyCy3V/X9IIHXvnOhz3/kbrAZ+B1atHS3VaY2oJqWitdTsJ3P9YWPiEEXhTnCXSyJAoZT5CLynRreUCuPjpT9huxIL/irtC0iKEnzE0nGbw0ePMpDSynTSio4/EXC3+UCl+m0TDkc/Fvt++u9sHIarr+jIXkp55j94CdvqQT5E7Sspu8tGXaaOYI5iDzWuJRKmQYcJOhiQFs8fRLtagCDmlRum5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR7JvT2SSHdNLLputvTEI3wEEt+GDAdBgNVHQ4EFgQUeyb09kkh3TSy6brb0xCN8BBLfhgwDQYJKoZIhvcNAQELBQADggEBAKmG18/4+PkykzKRgEgwdCi3Rxqb5fRIiBzub9Rxmn0WvWFHKmaF7VX0dj4Dab6nzbjk3n5xNQ/woRg/gMt09RmmPim3tNV8WXg6YnzFLuPXzaIAs2oQeudMQC8+QCECMZU0tHxoS0YuF0r9PLgdTUkppZgHitu0mAvGN1BGLdFKRLvOT+w83xhdC+X/5OBgvGS+NpuWOTz/IVzDEY28TKqWOUUlWiUOU8yOVHdo3TFz5mbyGP0khEGoLyNlhj6i/x9aIyt6t/wrvZGcOnYcmlXSxrt1CnmJFTSZ3OarkMHF4QIZWzrrPLLr+oKosG4opwkiWIbFrO3gHD3EImjbwZI=","attributes":{"enabled":true,"nbf":1651103638,"exp":1682640238,"created":1651104239,"updated":1651104239,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104235,"updated":1651104235}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '73624781-deea-456f-ae43-0745afb38448',
  'x-ms-request-id',
  '5edfe949-bc49-44db-96fb-6d9d910ced7d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1263;da_age=1263;rd_age=1263;brd_age=12056;ra_notif_age=1733;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:10 GMT',
  'Content-Length',
  '2907'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-48579071069587987')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0b27e42a-76a2-438c-9d35-2251562183ba',
  'x-ms-request-id',
  '0fbbb18a-7dab-40b6-8bc4-df8ba1cd37f1',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1263;da_age=1263;rd_age=1263;brd_age=12056;ra_notif_age=1733;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019","deletedDate":1651104430,"scheduledPurgeDate":1651709230,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/51f6956b86e84283951fa98b41e9d645","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/51f6956b86e84283951fa98b41e9d645","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/51f6956b86e84283951fa98b41e9d645","x5t":"wPEGUw91Ag9W_kIGYJyB2NrcrxI","cer":"MIIDKDCCAhCgAwIBAgIQQG8+O7fERL2Bg8ojoZYMPTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1NDE1WhcNMjMwNDI4MDAwNDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDMscnjodCKrnwO3KUvhLp00AG3MJV08Oc36UEDi5CFwP6Tv6ej4zyaLcWVweHgdvun8hylZz4jTdWOgRadb6m9UWthh4s1ovlI2OIwbgGzfTnTRqGwYcdYlbmXiN5JIVm9YnbqbZbAIf+dwFFDcMNyCi/Iov4nzSzCH/0rceq/NlFROsPR7pZn+e4lrAnZjs7nnJITpW0AZZ72sdWwjKMi+3nbsODGO9GE713Lkq6wr9tzXKxSIeKJuFkYz5nfOIpvLOUvUXt2vXTxWbUXXAiSONGCbeQdfXUQ+/V5fH49RoUWzWYMD7pTSw4Udk8EKlzGRYjJ52wVNIYGQ0RX1J9BAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBREdEOXHRS5hr+I7Any24pLCmfKeTAdBgNVHQ4EFgQURHRDlx0UuYa/iOwJ8tuKSwpnynkwDQYJKoZIhvcNAQELBQADggEBAKK75ncYt/jWCzbYn4qgC9fottxqJeoNvDhp50FFRzcESSJByx7f+qrLSx14dQMzylwVwUeF6h0WZiRmY/RK39bJaI/XFecACVYRPOHtZBlgYMuD8w89uLn1E62fDDvpURl50130v6tVdaeJbwtHqNiANaKAMFB9KPCwv5cPN5OUhh74pVl8cxdW4Ps3VsxUXXXaoxlz7yjTd4Y0Gxn8NcEBPRK2yoJ2KdHwSEtj/kNv6yehWkhaB8ECWvk1JwDYdLZ+OB3ywE+sCwlaiEjhskARs1Mui5QwrKLhHKMsUADB52Oz/W2fRPo927DIrHJPAYyFZNrB7TKRfZTwojtuoBU=","attributes":{"enabled":true,"nbf":1651103655,"exp":1682640255,"created":1651104255,"updated":1651104255,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyOtherCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104250,"updated":1651104250}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '08b74fd0-3d1a-48d2-a57d-8c60b770b87d',
  'x-ms-request-id',
  '61147ab7-087c-4db7-8e6a-7720ac097edc',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1263;da_age=1263;rd_age=1263;brd_age=12057;ra_notif_age=1733;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:10 GMT',
  'Content-Length',
  '2798'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdateacertificatespolicy-8816059145264019"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3f2e783a-37f0-471d-b9dd-56521deec424',
  'x-ms-request-id',
  'd54e07ea-7e51-431a-aa07-34a45202dec8',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1263;da_age=1263;rd_age=1263;brd_age=12057;ra_notif_age=1733;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdateacertificatespolicy-8816059145264019"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b4bb2989-1d41-4801-875e-a4e4ebc99b9b',
  'x-ms-request-id',
  'cff5371c-868a-4204-a3ff-ea15ae7b2daa',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1264;da_age=1264;rd_age=1264;brd_age=12057;ra_notif_age=1733;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019","deletedDate":1651104430,"scheduledPurgeDate":1651709230,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/51f6956b86e84283951fa98b41e9d645","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/51f6956b86e84283951fa98b41e9d645","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/51f6956b86e84283951fa98b41e9d645","x5t":"wPEGUw91Ag9W_kIGYJyB2NrcrxI","cer":"MIIDKDCCAhCgAwIBAgIQQG8+O7fERL2Bg8ojoZYMPTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1NDE1WhcNMjMwNDI4MDAwNDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDMscnjodCKrnwO3KUvhLp00AG3MJV08Oc36UEDi5CFwP6Tv6ej4zyaLcWVweHgdvun8hylZz4jTdWOgRadb6m9UWthh4s1ovlI2OIwbgGzfTnTRqGwYcdYlbmXiN5JIVm9YnbqbZbAIf+dwFFDcMNyCi/Iov4nzSzCH/0rceq/NlFROsPR7pZn+e4lrAnZjs7nnJITpW0AZZ72sdWwjKMi+3nbsODGO9GE713Lkq6wr9tzXKxSIeKJuFkYz5nfOIpvLOUvUXt2vXTxWbUXXAiSONGCbeQdfXUQ+/V5fH49RoUWzWYMD7pTSw4Udk8EKlzGRYjJ52wVNIYGQ0RX1J9BAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBREdEOXHRS5hr+I7Any24pLCmfKeTAdBgNVHQ4EFgQURHRDlx0UuYa/iOwJ8tuKSwpnynkwDQYJKoZIhvcNAQELBQADggEBAKK75ncYt/jWCzbYn4qgC9fottxqJeoNvDhp50FFRzcESSJByx7f+qrLSx14dQMzylwVwUeF6h0WZiRmY/RK39bJaI/XFecACVYRPOHtZBlgYMuD8w89uLn1E62fDDvpURl50130v6tVdaeJbwtHqNiANaKAMFB9KPCwv5cPN5OUhh74pVl8cxdW4Ps3VsxUXXXaoxlz7yjTd4Y0Gxn8NcEBPRK2yoJ2KdHwSEtj/kNv6yehWkhaB8ECWvk1JwDYdLZ+OB3ywE+sCwlaiEjhskARs1Mui5QwrKLhHKMsUADB52Oz/W2fRPo927DIrHJPAYyFZNrB7TKRfZTwojtuoBU=","attributes":{"enabled":true,"nbf":1651103655,"exp":1682640255,"created":1651104255,"updated":1651104255,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyOtherCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104250,"updated":1651104250}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'dfbf6cda-80b5-4cd9-817b-b8c9b361a27f',
  'x-ms-request-id',
  '9541a492-e473-474b-8f09-be95253d89a8',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1274;da_age=1274;rd_age=1274;brd_age=12067;ra_notif_age=1743;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:20 GMT',
  'Content-Length',
  '2798'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-canupdateacertificatespolicy-8816059145264019')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7f8674da-6030-41f4-904c-7ce9eed61af5',
  'x-ms-request-id',
  'b9820f61-f8c0-4923-bad3-c0a433819b13',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1274;da_age=1274;rd_age=1274;brd_age=12067;ra_notif_age=1743;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477","deletedDate":1651104441,"scheduledPurgeDate":1651709241,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/06db62a6b3544c409bb89ad86d277990","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/06db62a6b3544c409bb89ad86d277990","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/06db62a6b3544c409bb89ad86d277990","x5t":"rlguidTH9vvnCLnZAAiSePmuyfE","cer":"MIIDKDCCAhCgAwIBAgIQXaolnKmiTwK8MSNlrsRz/zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzIzWhcNMjMwNDI4MDAwMzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC2A4IaacphBDb2/DLOYPXhvBvey1sZ8lhBiAXYqod+jjqQe/gYSClG0lShdYDS4y+2PdjX4oHtxqiJWNMTj1Gz1qIhsMNTYopszobbwiNlOQT2DLLGX+gYqtonVrNCEauhoHgPojOCQ5cSPupMXT5U50jTxkh4bF3ejBmYO4IXymFKo2kSHxssLLMKW6aBtktMB7Mfy4HDOKTARJoDh++HC2IqKWijcLQnNj+cPip3XV7oR+OtFbIVxKeE0qtrg+k83wh4rJHs4H3hHJVxJzMNjbSHB52uVBBVePsoG143LeTZLekHKPTwEw+SYuziKf3DAbuOpZkSp9vYdvQYfEpVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRGqgCploAq2Sa+YdhymjrCygOOBjAdBgNVHQ4EFgQURqoAqZaAKtkmvmHYcpo6wsoDjgYwDQYJKoZIhvcNAQELBQADggEBADFMLYDNNONF8MTD476bSA8ZoBNv/VK2DWl9V+SoQ2OTTqwd7Svj98ZFj4DZhFM4Czopz0ycrREc1CApfIqWHHs+eUSMsN4zsl6ZBk4nI8jeYPG4KUNtYt+pLTytQ8Z3r5wPg8301SSzY1ipFWFOL2dZV2OfGWftA3+u6jDXGRy7mtiJZinwMbByj4WtD802CK3kyfuPKmlO5k5JR4e0D9lpfTZnKNgkBVXmoDvf2xU3XnzPh58v8c/OSZzINsPA8J3OWrMPJT8baaAhCoXLaFgqP9O3UIkkOGCMA1LAeyTY+GtXpnCB8W1TXZRBmrgjfkYivW91BFzlSWmqNCozDfU=","attributes":{"enabled":true,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104203,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104198,"updated":1651104198}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c537e553-e6e7-471b-ab9f-5640b7793d8d',
  'x-ms-request-id',
  'e477c368-9756-4e7d-ac06-57a0b8197647',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1274;da_age=1274;rd_age=1274;brd_age=12067;ra_notif_age=1743;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:20 GMT',
  'Content-Length',
  '2805'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ef76c127-b99f-4c4e-bb2a-7e51db1de36b',
  'x-ms-request-id',
  '99896b57-3606-4147-8bef-2d0254272422',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1274;da_age=1274;rd_age=1274;brd_age=12067;ra_notif_age=1744;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c50ef37c-b8a6-424a-9e74-66ff931a250d',
  'x-ms-request-id',
  '9cf56796-62a5-4629-9be6-419e9a13e181',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1274;da_age=1274;rd_age=1274;brd_age=12067;ra_notif_age=1744;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477","deletedDate":1651104441,"scheduledPurgeDate":1651709241,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/06db62a6b3544c409bb89ad86d277990","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/06db62a6b3544c409bb89ad86d277990","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/06db62a6b3544c409bb89ad86d277990","x5t":"rlguidTH9vvnCLnZAAiSePmuyfE","cer":"MIIDKDCCAhCgAwIBAgIQXaolnKmiTwK8MSNlrsRz/zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1MzIzWhcNMjMwNDI4MDAwMzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC2A4IaacphBDb2/DLOYPXhvBvey1sZ8lhBiAXYqod+jjqQe/gYSClG0lShdYDS4y+2PdjX4oHtxqiJWNMTj1Gz1qIhsMNTYopszobbwiNlOQT2DLLGX+gYqtonVrNCEauhoHgPojOCQ5cSPupMXT5U50jTxkh4bF3ejBmYO4IXymFKo2kSHxssLLMKW6aBtktMB7Mfy4HDOKTARJoDh++HC2IqKWijcLQnNj+cPip3XV7oR+OtFbIVxKeE0qtrg+k83wh4rJHs4H3hHJVxJzMNjbSHB52uVBBVePsoG143LeTZLekHKPTwEw+SYuziKf3DAbuOpZkSp9vYdvQYfEpVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRGqgCploAq2Sa+YdhymjrCygOOBjAdBgNVHQ4EFgQURqoAqZaAKtkmvmHYcpo6wsoDjgYwDQYJKoZIhvcNAQELBQADggEBADFMLYDNNONF8MTD476bSA8ZoBNv/VK2DWl9V+SoQ2OTTqwd7Svj98ZFj4DZhFM4Czopz0ycrREc1CApfIqWHHs+eUSMsN4zsl6ZBk4nI8jeYPG4KUNtYt+pLTytQ8Z3r5wPg8301SSzY1ipFWFOL2dZV2OfGWftA3+u6jDXGRy7mtiJZinwMbByj4WtD802CK3kyfuPKmlO5k5JR4e0D9lpfTZnKNgkBVXmoDvf2xU3XnzPh58v8c/OSZzINsPA8J3OWrMPJT8baaAhCoXLaFgqP9O3UIkkOGCMA1LAeyTY+GtXpnCB8W1TXZRBmrgjfkYivW91BFzlSWmqNCozDfU=","attributes":{"enabled":true,"nbf":1651103603,"exp":1682640203,"created":1651104203,"updated":1651104203,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104198,"updated":1651104198}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '53b8d66c-6a2e-4361-aeaa-f7231bdd6eaf',
  'x-ms-request-id',
  'e38b74c2-cb30-49d8-a01e-84cca7236773',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1284;da_age=1284;rd_age=1284;brd_age=12077;ra_notif_age=1754;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:30 GMT',
  'Content-Length',
  '2805'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-canupdatethetagsofacertificate-1045226937052477')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '011b050e-37fa-4d02-bb40-0fb0103ff703',
  'x-ms-request-id',
  '604fff7e-2dd1-4b20-b64a-6fb58d102cf3',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1284;da_age=1284;rd_age=1284;brd_age=12077;ra_notif_age=1754;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-supportstracing-18371722303621052')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-supportstracing-18371722303621052","deletedDate":1651104451,"scheduledPurgeDate":1651709251,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-18371722303621052/b94d64fa02c743bf92752600d1ad04d4","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-supportstracing-18371722303621052/b94d64fa02c743bf92752600d1ad04d4","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-supportstracing-18371722303621052/b94d64fa02c743bf92752600d1ad04d4","x5t":"0vuk5xP3OUabQ-kVWjlRj-tzrTQ","cer":"MIIDKDCCAhCgAwIBAgIQINWXaCVUTO6+dkox95Z0MjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1NDE1WhcNMjMwNDI4MDAwNDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3wkq0ugdNX9FcMGAlbI19I4Vaaa0eDiQ+FGXceVpMRe+5dNgWDD0blJq98j0o74TPzt9nPS3u7yjlDpIr8+X2WmqpztTQHq+//TxtW5XLU1wvhoueP7/e8YC+5ckqzAcN3zps01sShLi8XycXycMico0WZYpSs3loiAuB3SgDiSahFYAqVmfnJQTuS6c6vR5Z8IYzEov/9/YwFc8ZstvZ4lpUHKN+GOSP6s1eKpnxwCkt64JqMRhVQWOcSeAzYZtimvMgCdfptw8kdA+HQSzrj27DihgLSSAhEoMcVzxdU5SCpjs/yaqB9TQxo553pY3g0tZKYa69DRfL9pt543M9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQLn7aXh7fp+giJAIZ7S2j4vAkDZTAdBgNVHQ4EFgQUC5+2l4e36foIiQCGe0to+LwJA2UwDQYJKoZIhvcNAQELBQADggEBADoFYpxG/pNiJyToWAb+Go9EvS1YO2JzNn6ZXjXPBlAkUgPXliL9qoiuI58vk6CmYhEkjZ4HQYMFY3Iu/YlMkjx3sDJNjE32e0uHJHK2pg7J77Ex4ksk5Oel6aRs8veGOQ6CMHLfU4eNdgGUITOH87TpNDrTQ9n7Ofr/MCQLLNeXwS6BqJ7W7GGCJJiOoRtY6MTOIbF9tfgMLZ5ToF4+3eGZ929Ff8WV07tuOEmXY3sP0fDdRJ5dZDSLmuILl2pyVW8aNQplemWpSr8IzlewffDIiTjToPBGcSqh9Adc1M0HkhAZnTvkDaTg4A/lUmOrH98vTq5A3XC+XoaJugD5Uxw=","attributes":{"enabled":true,"nbf":1651103655,"exp":1682640255,"created":1651104255,"updated":1651104255,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-18371722303621052/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104252,"updated":1651104252}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-18371722303621052/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8d8aa9c2-4c79-435c-900f-801484c6c2ba',
  'x-ms-request-id',
  '6a6c49af-0e1d-4f86-be9c-cf54ee5e60ed',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1284;da_age=1284;rd_age=1284;brd_age=12077;ra_notif_age=1754;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:31 GMT',
  'Content-Length',
  '2721'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-18371722303621052')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-18371722303621052"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e3355d1f-1fd8-413f-a85f-6b7cadbe0603',
  'x-ms-request-id',
  'b887ccca-0727-4deb-b375-59b39324e173',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1284;da_age=1284;rd_age=1284;brd_age=12077;ra_notif_age=1754;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-18371722303621052')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-18371722303621052"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '137',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6d688673-0ac3-4a41-8ed8-dff8e83eae33',
  'x-ms-request-id',
  '3f1bd734-59ef-4b0e-92ac-5831dbd08441',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1284;da_age=1284;rd_age=1284;brd_age=12077;ra_notif_age=1754;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-18371722303621052')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-supportstracing-18371722303621052","deletedDate":1651104451,"scheduledPurgeDate":1651709251,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-18371722303621052/b94d64fa02c743bf92752600d1ad04d4","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-supportstracing-18371722303621052/b94d64fa02c743bf92752600d1ad04d4","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-supportstracing-18371722303621052/b94d64fa02c743bf92752600d1ad04d4","x5t":"0vuk5xP3OUabQ-kVWjlRj-tzrTQ","cer":"MIIDKDCCAhCgAwIBAgIQINWXaCVUTO6+dkox95Z0MjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM1NDE1WhcNMjMwNDI4MDAwNDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3wkq0ugdNX9FcMGAlbI19I4Vaaa0eDiQ+FGXceVpMRe+5dNgWDD0blJq98j0o74TPzt9nPS3u7yjlDpIr8+X2WmqpztTQHq+//TxtW5XLU1wvhoueP7/e8YC+5ckqzAcN3zps01sShLi8XycXycMico0WZYpSs3loiAuB3SgDiSahFYAqVmfnJQTuS6c6vR5Z8IYzEov/9/YwFc8ZstvZ4lpUHKN+GOSP6s1eKpnxwCkt64JqMRhVQWOcSeAzYZtimvMgCdfptw8kdA+HQSzrj27DihgLSSAhEoMcVzxdU5SCpjs/yaqB9TQxo553pY3g0tZKYa69DRfL9pt543M9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQLn7aXh7fp+giJAIZ7S2j4vAkDZTAdBgNVHQ4EFgQUC5+2l4e36foIiQCGe0to+LwJA2UwDQYJKoZIhvcNAQELBQADggEBADoFYpxG/pNiJyToWAb+Go9EvS1YO2JzNn6ZXjXPBlAkUgPXliL9qoiuI58vk6CmYhEkjZ4HQYMFY3Iu/YlMkjx3sDJNjE32e0uHJHK2pg7J77Ex4ksk5Oel6aRs8veGOQ6CMHLfU4eNdgGUITOH87TpNDrTQ9n7Ofr/MCQLLNeXwS6BqJ7W7GGCJJiOoRtY6MTOIbF9tfgMLZ5ToF4+3eGZ929Ff8WV07tuOEmXY3sP0fDdRJ5dZDSLmuILl2pyVW8aNQplemWpSr8IzlewffDIiTjToPBGcSqh9Adc1M0HkhAZnTvkDaTg4A/lUmOrH98vTq5A3XC+XoaJugD5Uxw=","attributes":{"enabled":true,"nbf":1651103655,"exp":1682640255,"created":1651104255,"updated":1651104255,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-18371722303621052/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104252,"updated":1651104252}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-18371722303621052/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ee618fd1-fff8-47ba-8750-acffe1a7ace0',
  'x-ms-request-id',
  '12b20409-9671-458b-bf1b-fb618f6b08c1',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1294;da_age=1294;rd_age=1294;brd_age=12087;ra_notif_age=1764;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:41 GMT',
  'Content-Length',
  '2721'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-supportstracing-18371722303621052')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b50b113f-8c17-4cef-8001-c819a8f108f3',
  'x-ms-request-id',
  'c70e7ff7-6e00-459e-a0d1-56ed5bcb56ab',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1294;da_age=1294;rd_age=1294;brd_age=12087;ra_notif_age=1764;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation165110425326909196","attributes":{"enabled":false,"nbf":1651103650,"exp":1682640250,"created":1651104251,"updated":1651104251},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431","x5t":"Sf9XpYQzmrwX3UUp4J04nq31aRs","attributes":{"enabled":true,"nbf":1651103334,"exp":1682639934,"created":1651103939,"updated":1651103939},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370","x5t":"s-QCH9V1jCKOGBOZ40OJkrNnhgA","attributes":{"enabled":true,"nbf":1651103322,"exp":1682639922,"created":1651103922,"updated":1651103922},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371","x5t":"s-QCH9V1jCKOGBOZ40OJkrNnhgA","attributes":{"enabled":true,"nbf":1651103322,"exp":1682639922,"created":1651103928,"updated":1651103928},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260","x5t":"dtPlhOiDHX0C8K3HeuIuAu4v29U","attributes":{"enabled":true,"nbf":1651017376,"exp":1682553976,"created":1651017976,"updated":1651017976},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261","x5t":"dtPlhOiDHX0C8K3HeuIuAu4v29U","attributes":{"enabled":true,"nbf":1651017376,"exp":1682553976,"created":1651017981,"updated":1651017981},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910","x5t":"dSyNsUDMOxBiTV4H_jqe4xUGEto","attributes":{"enabled":true,"nbf":1650912052,"exp":1682448652,"created":1650912652,"updated":1650912652},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911","x5t":"dSyNsUDMOxBiTV4H_jqe4xUGEto","attributes":{"enabled":true,"nbf":1650912052,"exp":1682448652,"created":1650912657,"updated":1650912657},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955","attributes":{"enabled":false,"nbf":1650912069,"exp":1682448669,"created":1650912670,"updated":1650912670},"subject":""}],"nextLink":"https://keyvault_name.vault.azure.net:443/certificates?api-version=7.3&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJV05sY25ScFptbGpZWFJsTDAxRlVrZEZRMFZTVkVsR1NVTkJWRVZPUVUxRkxVTkJUazFGVWtkRlFWTkZURVpUU1VkT1JVUkRSVkpVU1VaSlEwRlVSUzAyTmpnd05EYzRNemN4TnpJNE16RXpJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6501cf1b-c9b5-4e49-9545-6ede737ff316',
  'x-ms-request-id',
  '28006ea7-d269-475b-b9fd-f4da0d46a1c1',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1294;da_age=1294;rd_age=1294;brd_age=12087;ra_notif_age=1764;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:41 GMT',
  'Content-Length',
  '3077'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/crudcertoperation165110425326909196')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/crudcertoperation165110425326909196","deletedDate":1651104461,"scheduledPurgeDate":1651709261,"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation165110425326909196/596d2cb91e5e46e5814ee895e4d8cf3d","attributes":{"enabled":false,"nbf":1651103650,"exp":1682640250,"created":1651104251,"updated":1651104251,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation165110425326909196/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104251,"updated":1651104251}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '58144634-7fd0-469b-a49c-ece6dff2fbae',
  'x-ms-request-id',
  '3160678d-47ce-4774-80ed-838b7c54d473',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1294;da_age=1294;rd_age=1294;brd_age=12088;ra_notif_age=1764;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:41 GMT',
  'Content-Length',
  '1119'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/crudcertoperation165110425326909196')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: crudcertoperation165110425326909196"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '119',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '37b700c4-71a4-4375-bc8f-16188cd537ac',
  'x-ms-request-id',
  '134d422f-868d-4632-9dd8-acdace8d2898',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1295;da_age=1295;rd_age=1295;brd_age=12088;ra_notif_age=1764;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/crudcertoperation165110425326909196')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: crudcertoperation165110425326909196"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '119',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'dbece9c9-4304-4ed3-96b1-78f3d4d94f6e',
  'x-ms-request-id',
  '3dcf95d7-0584-4dc1-917b-a0105c0b4c45',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1295;da_age=1295;rd_age=1295;brd_age=12088;ra_notif_age=1764;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/crudcertoperation165110425326909196')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/crudcertoperation165110425326909196","deletedDate":1651104461,"scheduledPurgeDate":1651709261,"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation165110425326909196/596d2cb91e5e46e5814ee895e4d8cf3d","attributes":{"enabled":false,"nbf":1651103650,"exp":1682640250,"created":1651104251,"updated":1651104251,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation165110425326909196/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651104251,"updated":1651104251}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '57bc1140-fab0-41d7-a027-394998bdd132',
  'x-ms-request-id',
  'cd31b268-18c2-4c7c-80fc-882564ba8d6f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1305;da_age=1305;rd_age=1305;brd_age=12098;ra_notif_age=1774;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:51 GMT',
  'Content-Length',
  '1119'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/crudcertoperation165110425326909196')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '89eee6fc-b4f1-45c1-9d5d-e43ac1980887',
  'x-ms-request-id',
  'e4bb2857-6569-45e9-b9f7-985053bfdb23',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1305;da_age=1305;rd_age=1305;brd_age=12098;ra_notif_age=1774;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431","deletedDate":1651104472,"scheduledPurgeDate":1651709272,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431/3b2a2be786de402e9a4e3ccb709d9ab7","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431/3b2a2be786de402e9a4e3ccb709d9ab7","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431/3b2a2be786de402e9a4e3ccb709d9ab7","x5t":"Sf9XpYQzmrwX3UUp4J04nq31aRs","cer":"MIIDKDCCAhCgAwIBAgIQP6tDIHX2SkqpyaJ4bbzr9zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0ODU0WhcNMjMwNDI3MjM1ODU0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWRcmRPHxVNeA2251/RUS0WtgPUENTwpkzJCDPRG+A+b3CQeadSv+9WtYO83rX+XtcaotqO6NnJVijFDE70N8wnSBS2xbzv55sJ3Ei6/8r71+N4pgxsJYnDc5oc2qL5ez3eZCzyx2/rVTdHZAtvQIiCDeK4K+NaV809qYfGisrrTlPUhwoDRiyV0MOF/52BXKqjbvMh6IWBqYEXlVhKbNl+nlf8HJIRblX+XZzMyW3Ba5/BufYBbdb9u+9usJjwVT1Ra51HQHa+Xl5BDFx4uZ5RIMn9Xs+mEWgEGUYY1T5TBW/R/iwt8C4tAHx7zhUkNtt1E7RVmWTo+ED34dOwpVJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYYQ0vj5svkAoYoWHT/i8oiZ+qjDAdBgNVHQ4EFgQUGGENL4+bL5AKGKFh0/4vKImfqowwDQYJKoZIhvcNAQELBQADggEBAKrUmq4cvqL1Z//18+ED7tTUjU6ti1B24ZXX/71XPov2ABa2v4UidqN14DA0yI3yb2NrBFujCSSqVJJuqDRGt9WaXZwq7EEPjBQt2L1k54KQEJ4zrkx/2AU2jc7lX9ZpTNy22nOulEKhIQA+c4ExgMxrg4tYWMpHahb4xNydS/tH0MV8i1ArH7wlQzBwRXhAJ+Nx9dGURnmLA71KOCnTszUUq/jjcHzFHoPGbkbaz4kjw0GYIEIRw4ZIg60JFdutG6qA5TAPwN5J0s8zzVEx73Aqnd3BxWkC9oERJePbl3w90tyYgalZcct68bEaPN+1k4oEkn1qb6CsRlOjKn+Ky68=","attributes":{"enabled":true,"nbf":1651103334,"exp":1682639934,"created":1651103939,"updated":1651103939,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1651103939,"updated":1651103939}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c604553b-d0c8-4eb4-be43-642fd7b8f880',
  'x-ms-request-id',
  '11195d06-87be-4fe2-a53a-3d696ba6d582',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1305;da_age=1305;rd_age=1305;brd_age=12098;ra_notif_age=1774;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:51 GMT',
  'Content-Length',
  '2788'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bf514915-ef2e-4021-b8d1-a4df682059c0',
  'x-ms-request-id',
  '00edf41a-159a-4b80-a07b-ce2a7322953e',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1305;da_age=1305;rd_age=1305;brd_age=12098;ra_notif_age=1775;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '607d28c7-886d-45f5-83cc-3dbb74684c61',
  'x-ms-request-id',
  'ee816952-1b9e-4611-95bf-ddb9ac75c159',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1305;da_age=1305;rd_age=1305;brd_age=12098;ra_notif_age=1775;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:07:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431","deletedDate":1651104472,"scheduledPurgeDate":1651709272,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431/3b2a2be786de402e9a4e3ccb709d9ab7","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431/3b2a2be786de402e9a4e3ccb709d9ab7","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431/3b2a2be786de402e9a4e3ccb709d9ab7","x5t":"Sf9XpYQzmrwX3UUp4J04nq31aRs","cer":"MIIDKDCCAhCgAwIBAgIQP6tDIHX2SkqpyaJ4bbzr9zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0ODU0WhcNMjMwNDI3MjM1ODU0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWRcmRPHxVNeA2251/RUS0WtgPUENTwpkzJCDPRG+A+b3CQeadSv+9WtYO83rX+XtcaotqO6NnJVijFDE70N8wnSBS2xbzv55sJ3Ei6/8r71+N4pgxsJYnDc5oc2qL5ez3eZCzyx2/rVTdHZAtvQIiCDeK4K+NaV809qYfGisrrTlPUhwoDRiyV0MOF/52BXKqjbvMh6IWBqYEXlVhKbNl+nlf8HJIRblX+XZzMyW3Ba5/BufYBbdb9u+9usJjwVT1Ra51HQHa+Xl5BDFx4uZ5RIMn9Xs+mEWgEGUYY1T5TBW/R/iwt8C4tAHx7zhUkNtt1E7RVmWTo+ED34dOwpVJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYYQ0vj5svkAoYoWHT/i8oiZ+qjDAdBgNVHQ4EFgQUGGENL4+bL5AKGKFh0/4vKImfqowwDQYJKoZIhvcNAQELBQADggEBAKrUmq4cvqL1Z//18+ED7tTUjU6ti1B24ZXX/71XPov2ABa2v4UidqN14DA0yI3yb2NrBFujCSSqVJJuqDRGt9WaXZwq7EEPjBQt2L1k54KQEJ4zrkx/2AU2jc7lX9ZpTNy22nOulEKhIQA+c4ExgMxrg4tYWMpHahb4xNydS/tH0MV8i1ArH7wlQzBwRXhAJ+Nx9dGURnmLA71KOCnTszUUq/jjcHzFHoPGbkbaz4kjw0GYIEIRw4ZIg60JFdutG6qA5TAPwN5J0s8zzVEx73Aqnd3BxWkC9oERJePbl3w90tyYgalZcct68bEaPN+1k4oEkn1qb6CsRlOjKn+Ky68=","attributes":{"enabled":true,"nbf":1651103334,"exp":1682639934,"created":1651103939,"updated":1651103939,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1651103939,"updated":1651103939}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8cf0da3d-3433-4c1a-b0ec-b93f1d98ac0a',
  'x-ms-request-id',
  '5f349c3b-4865-4cd2-975d-f986cf1ce104',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1315;da_age=1315;rd_age=1315;brd_age=12108;ra_notif_age=1785;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:01 GMT',
  'Content-Length',
  '2788'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144431')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd67695cd-3b83-4ed9-96ce-329301e9f33b',
  'x-ms-request-id',
  '78009d4c-39ad-4a3d-8c6b-6032c82fa5b8',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1315;da_age=1315;rd_age=1315;brd_age=12108;ra_notif_age=1785;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370","deletedDate":1651104482,"scheduledPurgeDate":1651709282,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/11117b972ce34c6a8913a3f86be74144","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/11117b972ce34c6a8913a3f86be74144","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/11117b972ce34c6a8913a3f86be74144","x5t":"s-QCH9V1jCKOGBOZ40OJkrNnhgA","cer":"MIIDKDCCAhCgAwIBAgIQNkbQ5EsISai9fiAFYxbgGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0ODQyWhcNMjMwNDI3MjM1ODQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDX/cT2l4B84Y7wF+BE8WbzeQJSx1aXjMksV1XoAgOcs/zfjfjDBLc5RVCdO/Cizf2FdN+ycYnObftRvoMpuDIvpB79lixhPNfmIc9ClNZ6S9F7yBfh5RY+KWigbkDOzfzb1QOpLe5qIu1f8lar81eOgGufXLbEsl5SEwle9sjf7u2yQgN4J4MlFE1yj/5+eIfAfbTHnfg8uD1GyaNBlGZwvQvS83+cY7RbJdstxW3c92mQmkoqRBKq4XfFyYUb3Sbyul44Lklpg/uCCuFuxQKJh39BR5A9q6BluLS5YlbcrhZTPB1MKI6O1+Z01F8iaYfhwJqiblI1mZZQp/Fn3BF9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSnBp95mhZrhl+vSgqdlQ5SWyYz1zAdBgNVHQ4EFgQUpwafeZoWa4Zfr0oKnZUOUlsmM9cwDQYJKoZIhvcNAQELBQADggEBAFJgB4hkHHKzS3fBMmjvk4OgOcQ4KD6hUujOh3wxfAgrxfDkShZ88enu8YukLhVt6kfpEATxbLbPOIE+33hxIJSfR6PoWLZYzdoaO/JSSjeUAnJDY94+9/zytG1K3APugX69hHsNp/Tm0ZIFw2QF0yKb9Fumw8EVLYgFPAtdiv4Hh+Z1gzVkoefZMUO6y1ioH/HJFYd7mJW5ij32t8Gvc0nLskz1HT/FBVdr2isqceFlNafEj+35toWi2eaFYcktvI3fNPAamgKgY26Ggmn+0vuyztMiThrhpktWWzjbUCU+TwKLt/dqdeMMEeQktDi2mFB6uUcm2PtQczoPxy9JRw0=","attributes":{"enabled":true,"nbf":1651103322,"exp":1682639922,"created":1651103922,"updated":1651103922,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651103917,"updated":1651103917}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '641f7a82-07d8-4ddf-a0d6-62a78077b0f0',
  'x-ms-request-id',
  '63ba248e-1938-42fa-8f1d-d53ffb2ce4f0',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1315;da_age=1315;rd_age=1315;brd_age=12108;ra_notif_age=1785;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:01 GMT',
  'Content-Length',
  '2997'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '183',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '96cc6a5f-f6ca-46cc-8bf4-e43335044171',
  'x-ms-request-id',
  '28a02a4f-66d3-414e-9249-e505f6e22e48',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1315;da_age=1315;rd_age=1315;brd_age=12108;ra_notif_age=1785;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '183',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '207bb6f3-f7d7-44eb-97d6-439b83bb4e05',
  'x-ms-request-id',
  '1b4e6145-921d-4eb0-be8a-4c4801efe68c',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1315;da_age=1315;rd_age=1315;brd_age=12108;ra_notif_age=1785;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370","deletedDate":1651104482,"scheduledPurgeDate":1651709282,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/11117b972ce34c6a8913a3f86be74144","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/11117b972ce34c6a8913a3f86be74144","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/11117b972ce34c6a8913a3f86be74144","x5t":"s-QCH9V1jCKOGBOZ40OJkrNnhgA","cer":"MIIDKDCCAhCgAwIBAgIQNkbQ5EsISai9fiAFYxbgGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0ODQyWhcNMjMwNDI3MjM1ODQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDX/cT2l4B84Y7wF+BE8WbzeQJSx1aXjMksV1XoAgOcs/zfjfjDBLc5RVCdO/Cizf2FdN+ycYnObftRvoMpuDIvpB79lixhPNfmIc9ClNZ6S9F7yBfh5RY+KWigbkDOzfzb1QOpLe5qIu1f8lar81eOgGufXLbEsl5SEwle9sjf7u2yQgN4J4MlFE1yj/5+eIfAfbTHnfg8uD1GyaNBlGZwvQvS83+cY7RbJdstxW3c92mQmkoqRBKq4XfFyYUb3Sbyul44Lklpg/uCCuFuxQKJh39BR5A9q6BluLS5YlbcrhZTPB1MKI6O1+Z01F8iaYfhwJqiblI1mZZQp/Fn3BF9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSnBp95mhZrhl+vSgqdlQ5SWyYz1zAdBgNVHQ4EFgQUpwafeZoWa4Zfr0oKnZUOUlsmM9cwDQYJKoZIhvcNAQELBQADggEBAFJgB4hkHHKzS3fBMmjvk4OgOcQ4KD6hUujOh3wxfAgrxfDkShZ88enu8YukLhVt6kfpEATxbLbPOIE+33hxIJSfR6PoWLZYzdoaO/JSSjeUAnJDY94+9/zytG1K3APugX69hHsNp/Tm0ZIFw2QF0yKb9Fumw8EVLYgFPAtdiv4Hh+Z1gzVkoefZMUO6y1ioH/HJFYd7mJW5ij32t8Gvc0nLskz1HT/FBVdr2isqceFlNafEj+35toWi2eaFYcktvI3fNPAamgKgY26Ggmn+0vuyztMiThrhpktWWzjbUCU+TwKLt/dqdeMMEeQktDi2mFB6uUcm2PtQczoPxy9JRw0=","attributes":{"enabled":true,"nbf":1651103322,"exp":1682639922,"created":1651103922,"updated":1651103922,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651103917,"updated":1651103917}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '9919ccec-db1f-4231-b388-631eea53785b',
  'x-ms-request-id',
  '660863b2-35d0-4b16-86ed-5de198749185',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1325;da_age=1325;rd_age=1325;brd_age=12118;ra_notif_age=1795;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:11 GMT',
  'Content-Length',
  '2997'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191370')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1e2c1ca4-f660-4afa-b7ad-73d64e916b33',
  'x-ms-request-id',
  '5be710a0-6f7d-4f65-a8bc-fcd98cbb9d65',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1325;da_age=1325;rd_age=1325;brd_age=12118;ra_notif_age=1795;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371","deletedDate":1651104492,"scheduledPurgeDate":1651709292,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371/d9428ca13b25441fa12a531ce03ddf2e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371/d9428ca13b25441fa12a531ce03ddf2e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371/d9428ca13b25441fa12a531ce03ddf2e","x5t":"s-QCH9V1jCKOGBOZ40OJkrNnhgA","cer":"MIIDKDCCAhCgAwIBAgIQNkbQ5EsISai9fiAFYxbgGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0ODQyWhcNMjMwNDI3MjM1ODQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDX/cT2l4B84Y7wF+BE8WbzeQJSx1aXjMksV1XoAgOcs/zfjfjDBLc5RVCdO/Cizf2FdN+ycYnObftRvoMpuDIvpB79lixhPNfmIc9ClNZ6S9F7yBfh5RY+KWigbkDOzfzb1QOpLe5qIu1f8lar81eOgGufXLbEsl5SEwle9sjf7u2yQgN4J4MlFE1yj/5+eIfAfbTHnfg8uD1GyaNBlGZwvQvS83+cY7RbJdstxW3c92mQmkoqRBKq4XfFyYUb3Sbyul44Lklpg/uCCuFuxQKJh39BR5A9q6BluLS5YlbcrhZTPB1MKI6O1+Z01F8iaYfhwJqiblI1mZZQp/Fn3BF9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSnBp95mhZrhl+vSgqdlQ5SWyYz1zAdBgNVHQ4EFgQUpwafeZoWa4Zfr0oKnZUOUlsmM9cwDQYJKoZIhvcNAQELBQADggEBAFJgB4hkHHKzS3fBMmjvk4OgOcQ4KD6hUujOh3wxfAgrxfDkShZ88enu8YukLhVt6kfpEATxbLbPOIE+33hxIJSfR6PoWLZYzdoaO/JSSjeUAnJDY94+9/zytG1K3APugX69hHsNp/Tm0ZIFw2QF0yKb9Fumw8EVLYgFPAtdiv4Hh+Z1gzVkoefZMUO6y1ioH/HJFYd7mJW5ij32t8Gvc0nLskz1HT/FBVdr2isqceFlNafEj+35toWi2eaFYcktvI3fNPAamgKgY26Ggmn+0vuyztMiThrhpktWWzjbUCU+TwKLt/dqdeMMEeQktDi2mFB6uUcm2PtQczoPxy9JRw0=","attributes":{"enabled":true,"nbf":1651103322,"exp":1682639922,"created":1651103928,"updated":1651103928,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1651103928,"updated":1651103928}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7159f547-dfd5-4fd9-a02f-63fe8b11463f',
  'x-ms-request-id',
  'ca3be1b2-275d-4ca6-9a7d-9da4015f1b18',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1325;da_age=1325;rd_age=1325;brd_age=12118;ra_notif_age=1795;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:12 GMT',
  'Content-Length',
  '2813'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '183',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c104cc30-16ec-48fd-9099-ec08ecd98351',
  'x-ms-request-id',
  '0b056770-a599-4fd1-a57c-bdbf59ce7eaf',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1325;da_age=1325;rd_age=1325;brd_age=12119;ra_notif_age=1795;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '183',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '423f68e8-b359-4015-b5bd-c7b8f97cef2b',
  'x-ms-request-id',
  'ad1594d7-f6c1-4472-90f4-02f32e762c7d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1325;da_age=1325;rd_age=1325;brd_age=12119;ra_notif_age=1795;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371","deletedDate":1651104492,"scheduledPurgeDate":1651709292,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371/d9428ca13b25441fa12a531ce03ddf2e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371/d9428ca13b25441fa12a531ce03ddf2e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371/d9428ca13b25441fa12a531ce03ddf2e","x5t":"s-QCH9V1jCKOGBOZ40OJkrNnhgA","cer":"MIIDKDCCAhCgAwIBAgIQNkbQ5EsISai9fiAFYxbgGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI3MjM0ODQyWhcNMjMwNDI3MjM1ODQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDX/cT2l4B84Y7wF+BE8WbzeQJSx1aXjMksV1XoAgOcs/zfjfjDBLc5RVCdO/Cizf2FdN+ycYnObftRvoMpuDIvpB79lixhPNfmIc9ClNZ6S9F7yBfh5RY+KWigbkDOzfzb1QOpLe5qIu1f8lar81eOgGufXLbEsl5SEwle9sjf7u2yQgN4J4MlFE1yj/5+eIfAfbTHnfg8uD1GyaNBlGZwvQvS83+cY7RbJdstxW3c92mQmkoqRBKq4XfFyYUb3Sbyul44Lklpg/uCCuFuxQKJh39BR5A9q6BluLS5YlbcrhZTPB1MKI6O1+Z01F8iaYfhwJqiblI1mZZQp/Fn3BF9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSnBp95mhZrhl+vSgqdlQ5SWyYz1zAdBgNVHQ4EFgQUpwafeZoWa4Zfr0oKnZUOUlsmM9cwDQYJKoZIhvcNAQELBQADggEBAFJgB4hkHHKzS3fBMmjvk4OgOcQ4KD6hUujOh3wxfAgrxfDkShZ88enu8YukLhVt6kfpEATxbLbPOIE+33hxIJSfR6PoWLZYzdoaO/JSSjeUAnJDY94+9/zytG1K3APugX69hHsNp/Tm0ZIFw2QF0yKb9Fumw8EVLYgFPAtdiv4Hh+Z1gzVkoefZMUO6y1ioH/HJFYd7mJW5ij32t8Gvc0nLskz1HT/FBVdr2isqceFlNafEj+35toWi2eaFYcktvI3fNPAamgKgY26Ggmn+0vuyztMiThrhpktWWzjbUCU+TwKLt/dqdeMMEeQktDi2mFB6uUcm2PtQczoPxy9JRw0=","attributes":{"enabled":true,"nbf":1651103322,"exp":1682639922,"created":1651103928,"updated":1651103928,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1651103928,"updated":1651103928}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b50e9335-70cb-43d1-8036-0968251b1f0f',
  'x-ms-request-id',
  '2efedeb9-1ed4-49c2-94af-177e6c34de7d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1335;da_age=1335;rd_age=1335;brd_age=12129;ra_notif_age=1805;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:22 GMT',
  'Content-Length',
  '2813'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0270409552521191371')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'cdc13eae-cead-4c77-b9c7-80ac7d1f8e06',
  'x-ms-request-id',
  '6d2be680-588c-4731-b36a-6d1d4dd8348d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1335;da_age=1335;rd_age=1335;brd_age=12129;ra_notif_age=1805;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260","deletedDate":1651104503,"scheduledPurgeDate":1651709303,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/d5246091824c4eb5987e2b4449e4b381","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/d5246091824c4eb5987e2b4449e4b381","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/d5246091824c4eb5987e2b4449e4b381","x5t":"dtPlhOiDHX0C8K3HeuIuAu4v29U","cer":"MIIDKDCCAhCgAwIBAgIQBk5BvjOmSe2AS99x6wol+DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI2MjM1NjE2WhcNMjMwNDI3MDAwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXjGfgk5alTLtAC5KBuCrIOVdLty7joe7X1K36eFOgToYfYs7aLhGVHmwdFviWbizLsGig5Sw9wIGjOUpXg0/roYESCSlZdu/wzIAOpwr5ikqsq9MmtIzHWXdaK7FolRHhr2+EBp7ZRwa0zVcnxyqhAZav3v680MkcX9q4x5FsXB5/eLQQGA8GlDGpVB5AJCPHFSu9l0Ash1Rw2yK2xSSDa1nZQrsPd9jtL9YsM1CDpReyvUfd87OFr0tSEC+eZej2XsQNfW16gv3Qd/3XDNIldzw+EpS2KxjABye2jUfdDqZVAudUCnIjjx/ZlIW08MADhDCLqHWrwNE0SO7ruo2pAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRMqHK7q1LcAh2C84kbQT8RwptrnTAdBgNVHQ4EFgQUTKhyu6tS3AIdgvOJG0E/EcKba50wDQYJKoZIhvcNAQELBQADggEBAMR5bkJMEnLyczn3U2i/cXAa6XKevvelYxALgvWafxUqvX1GDcB5tpjbZ1QOulLKTnTPlmPEIXa8rRsz5cMIHVLIFMgBD+/nM3G2NS6/SgaOMB1f+MsNr3544gjpe/6k9AilxrCLBU1sWOts9E417F66oKesocv7Lyts/9RxhXQUucIi8n4IX0zVHgsqXEbGLRvMkvWkzWaZVu2xobUxjFexxAV+Iqnq8mk1kVCzghgCUNVTxDmdJIupJ2kiPB56Wn5noOdHUJB9ULxsDj/z2Vk0hNP46lq0zBnUIUje9UYBBJ0KqiTY3HTQ9ElF7k/IFItii9jXNPhrjDxaSdnt0ew=","attributes":{"enabled":true,"nbf":1651017376,"exp":1682553976,"created":1651017976,"updated":1651017976,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651017970,"updated":1651017970}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '57580cf6-c0e6-4a55-b7b9-83e14d5c5f4c',
  'x-ms-request-id',
  '751aded1-2f5d-4cb2-8281-3a1c88a0a9b0',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1336;da_age=1336;rd_age=1336;brd_age=12129;ra_notif_age=1805;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:22 GMT',
  'Content-Length',
  '2991'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6f9244fb-3f68-4711-bdd6-9530c853c1a1',
  'x-ms-request-id',
  '4119e945-f35b-4604-a411-37a3074ed045',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1336;da_age=1336;rd_age=1336;brd_age=12129;ra_notif_age=1806;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0e0c1554-fda2-4dd3-98a4-52141f50c5ac',
  'x-ms-request-id',
  'c5a1ba18-14f6-4b25-9d10-edeb1e5a50f5',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1336;da_age=1336;rd_age=1336;brd_age=12129;ra_notif_age=1806;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260","deletedDate":1651104503,"scheduledPurgeDate":1651709303,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/d5246091824c4eb5987e2b4449e4b381","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/d5246091824c4eb5987e2b4449e4b381","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/d5246091824c4eb5987e2b4449e4b381","x5t":"dtPlhOiDHX0C8K3HeuIuAu4v29U","cer":"MIIDKDCCAhCgAwIBAgIQBk5BvjOmSe2AS99x6wol+DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI2MjM1NjE2WhcNMjMwNDI3MDAwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXjGfgk5alTLtAC5KBuCrIOVdLty7joe7X1K36eFOgToYfYs7aLhGVHmwdFviWbizLsGig5Sw9wIGjOUpXg0/roYESCSlZdu/wzIAOpwr5ikqsq9MmtIzHWXdaK7FolRHhr2+EBp7ZRwa0zVcnxyqhAZav3v680MkcX9q4x5FsXB5/eLQQGA8GlDGpVB5AJCPHFSu9l0Ash1Rw2yK2xSSDa1nZQrsPd9jtL9YsM1CDpReyvUfd87OFr0tSEC+eZej2XsQNfW16gv3Qd/3XDNIldzw+EpS2KxjABye2jUfdDqZVAudUCnIjjx/ZlIW08MADhDCLqHWrwNE0SO7ruo2pAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRMqHK7q1LcAh2C84kbQT8RwptrnTAdBgNVHQ4EFgQUTKhyu6tS3AIdgvOJG0E/EcKba50wDQYJKoZIhvcNAQELBQADggEBAMR5bkJMEnLyczn3U2i/cXAa6XKevvelYxALgvWafxUqvX1GDcB5tpjbZ1QOulLKTnTPlmPEIXa8rRsz5cMIHVLIFMgBD+/nM3G2NS6/SgaOMB1f+MsNr3544gjpe/6k9AilxrCLBU1sWOts9E417F66oKesocv7Lyts/9RxhXQUucIi8n4IX0zVHgsqXEbGLRvMkvWkzWaZVu2xobUxjFexxAV+Iqnq8mk1kVCzghgCUNVTxDmdJIupJ2kiPB56Wn5noOdHUJB9ULxsDj/z2Vk0hNP46lq0zBnUIUje9UYBBJ0KqiTY3HTQ9ElF7k/IFItii9jXNPhrjDxaSdnt0ew=","attributes":{"enabled":true,"nbf":1651017376,"exp":1682553976,"created":1651017976,"updated":1651017976,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1651017970,"updated":1651017970}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4d775929-3696-4377-bd40-e21bb4d2ae33',
  'x-ms-request-id',
  '32a20e88-1997-4d56-b9f6-3dc76d9fadaf',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1346;da_age=1346;rd_age=1346;brd_age=12139;ra_notif_age=1816;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:32 GMT',
  'Content-Length',
  '2991'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934260')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '53aa5f14-b2ee-4351-84d4-3df0eb4eec71',
  'x-ms-request-id',
  '2884a5fa-6ccc-4542-b681-e62c461b8288',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1346;da_age=1346;rd_age=1346;brd_age=12139;ra_notif_age=1816;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261","deletedDate":1651104513,"scheduledPurgeDate":1651709313,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261/49cb0878c4e44e9b8d0a76087a1065af","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261/49cb0878c4e44e9b8d0a76087a1065af","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261/49cb0878c4e44e9b8d0a76087a1065af","x5t":"dtPlhOiDHX0C8K3HeuIuAu4v29U","cer":"MIIDKDCCAhCgAwIBAgIQBk5BvjOmSe2AS99x6wol+DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI2MjM1NjE2WhcNMjMwNDI3MDAwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXjGfgk5alTLtAC5KBuCrIOVdLty7joe7X1K36eFOgToYfYs7aLhGVHmwdFviWbizLsGig5Sw9wIGjOUpXg0/roYESCSlZdu/wzIAOpwr5ikqsq9MmtIzHWXdaK7FolRHhr2+EBp7ZRwa0zVcnxyqhAZav3v680MkcX9q4x5FsXB5/eLQQGA8GlDGpVB5AJCPHFSu9l0Ash1Rw2yK2xSSDa1nZQrsPd9jtL9YsM1CDpReyvUfd87OFr0tSEC+eZej2XsQNfW16gv3Qd/3XDNIldzw+EpS2KxjABye2jUfdDqZVAudUCnIjjx/ZlIW08MADhDCLqHWrwNE0SO7ruo2pAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRMqHK7q1LcAh2C84kbQT8RwptrnTAdBgNVHQ4EFgQUTKhyu6tS3AIdgvOJG0E/EcKba50wDQYJKoZIhvcNAQELBQADggEBAMR5bkJMEnLyczn3U2i/cXAa6XKevvelYxALgvWafxUqvX1GDcB5tpjbZ1QOulLKTnTPlmPEIXa8rRsz5cMIHVLIFMgBD+/nM3G2NS6/SgaOMB1f+MsNr3544gjpe/6k9AilxrCLBU1sWOts9E417F66oKesocv7Lyts/9RxhXQUucIi8n4IX0zVHgsqXEbGLRvMkvWkzWaZVu2xobUxjFexxAV+Iqnq8mk1kVCzghgCUNVTxDmdJIupJ2kiPB56Wn5noOdHUJB9ULxsDj/z2Vk0hNP46lq0zBnUIUje9UYBBJ0KqiTY3HTQ9ElF7k/IFItii9jXNPhrjDxaSdnt0ew=","attributes":{"enabled":true,"nbf":1651017376,"exp":1682553976,"created":1651017981,"updated":1651017981,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1651017981,"updated":1651017981}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4e7c04c7-d82a-4ca6-94fd-334288abc981',
  'x-ms-request-id',
  '14a9c185-c38c-4498-9ca1-2749e10f741a',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1346;da_age=1346;rd_age=1346;brd_age=12139;ra_notif_age=1816;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:32 GMT',
  'Content-Length',
  '2808'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '77af57f1-b0a9-4dd5-8e33-d6a292c9d23f',
  'x-ms-request-id',
  'adfdc853-afa5-4ba9-8a3e-1c005eb36762',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1346;da_age=1346;rd_age=1346;brd_age=12139;ra_notif_age=1816;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4a33dd24-2f26-46e0-ab54-40c4c4cdd9ba',
  'x-ms-request-id',
  '7bf94f51-1a12-47ca-8de0-e28bbed8d5f2',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1346;da_age=1346;rd_age=1346;brd_age=12139;ra_notif_age=1816;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261","deletedDate":1651104513,"scheduledPurgeDate":1651709313,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261/49cb0878c4e44e9b8d0a76087a1065af","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261/49cb0878c4e44e9b8d0a76087a1065af","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261/49cb0878c4e44e9b8d0a76087a1065af","x5t":"dtPlhOiDHX0C8K3HeuIuAu4v29U","cer":"MIIDKDCCAhCgAwIBAgIQBk5BvjOmSe2AS99x6wol+DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI2MjM1NjE2WhcNMjMwNDI3MDAwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXjGfgk5alTLtAC5KBuCrIOVdLty7joe7X1K36eFOgToYfYs7aLhGVHmwdFviWbizLsGig5Sw9wIGjOUpXg0/roYESCSlZdu/wzIAOpwr5ikqsq9MmtIzHWXdaK7FolRHhr2+EBp7ZRwa0zVcnxyqhAZav3v680MkcX9q4x5FsXB5/eLQQGA8GlDGpVB5AJCPHFSu9l0Ash1Rw2yK2xSSDa1nZQrsPd9jtL9YsM1CDpReyvUfd87OFr0tSEC+eZej2XsQNfW16gv3Qd/3XDNIldzw+EpS2KxjABye2jUfdDqZVAudUCnIjjx/ZlIW08MADhDCLqHWrwNE0SO7ruo2pAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRMqHK7q1LcAh2C84kbQT8RwptrnTAdBgNVHQ4EFgQUTKhyu6tS3AIdgvOJG0E/EcKba50wDQYJKoZIhvcNAQELBQADggEBAMR5bkJMEnLyczn3U2i/cXAa6XKevvelYxALgvWafxUqvX1GDcB5tpjbZ1QOulLKTnTPlmPEIXa8rRsz5cMIHVLIFMgBD+/nM3G2NS6/SgaOMB1f+MsNr3544gjpe/6k9AilxrCLBU1sWOts9E417F66oKesocv7Lyts/9RxhXQUucIi8n4IX0zVHgsqXEbGLRvMkvWkzWaZVu2xobUxjFexxAV+Iqnq8mk1kVCzghgCUNVTxDmdJIupJ2kiPB56Wn5noOdHUJB9ULxsDj/z2Vk0hNP46lq0zBnUIUje9UYBBJ0KqiTY3HTQ9ElF7k/IFItii9jXNPhrjDxaSdnt0ew=","attributes":{"enabled":true,"nbf":1651017376,"exp":1682553976,"created":1651017981,"updated":1651017981,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1651017981,"updated":1651017981}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '48318cd2-7726-4f75-903e-9a5c4dbcde81',
  'x-ms-request-id',
  '66b046ba-8813-44cc-96e8-4ba6dbf54531',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1356;da_age=1356;rd_age=1356;brd_age=12149;ra_notif_age=1826;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:42 GMT',
  'Content-Length',
  '2808'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-270423287058934261')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1f29e5b9-24f6-4939-bda8-2af3fe7ef3f9',
  'x-ms-request-id',
  'd6342ac4-667f-4100-8f68-c8876395101c',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1356;da_age=1356;rd_age=1356;brd_age=12149;ra_notif_age=1826;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910","deletedDate":1651104523,"scheduledPurgeDate":1651709323,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/84a7abafd5bc4486955613c5b3cdfd0d","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/84a7abafd5bc4486955613c5b3cdfd0d","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/84a7abafd5bc4486955613c5b3cdfd0d","x5t":"dSyNsUDMOxBiTV4H_jqe4xUGEto","cer":"MIIDKDCCAhCgAwIBAgIQZZpFzT0sRH+aE9heBKc+zzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI1MTg0MDUyWhcNMjMwNDI1MTg1MDUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLENY/exvblJtdI4KOhgsODOUTZAbxRyWv7FH4VEcbdrDe88oETjcNiNgH+5ohdBxtkn/k1/qHtqFbZi1nW/MDNO96QNr15v9ENJ+ybGLERHLbaH2igY4nFSmX4W01rsnmzW7QsoS96dPDJrYmWA0Ygl2K3juvoflTud35SqRZm14/4m2yYx675Ipv/LQhmLburE/f8SlVdh/Q+T5+438f2LtsNXJ9ZGrMSynD4Za1NEqEbP5feGRB9mO8EkB5wELiuMTjrqo2DkS5SAsTQx/ZGGFZPOdDj7dqiD43dRWx8PlF923WxwWlez8s7uuM/RXtkl9aUQm+urKCg9oHzcnFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRVC7WX0DJd+EgfY6Ct2+eq+nyU/jAdBgNVHQ4EFgQUVQu1l9AyXfhIH2Ogrdvnqvp8lP4wDQYJKoZIhvcNAQELBQADggEBAE0QPcRJzTNCXTKsChEyIWLq8HK4koZcESvFuk91WaxRZ2xnDFFggjM5rfFC3/WQprx0LcKlCEaQODpkqRNmpHQj/uAGXtYMzXekYJMKCiHGWw/pg88BjA3+FGJ+vKwbr1d0I1LvDxDYfdeCBBluS2mCoLyqtfZwNQAw2ENi9XViCuaFVNXBSYlkAOm9vryowvEWLdA0bx/an2rqXX1mTeHS1E5ur1qUfJM33Zwm09Fxs9XAXnQAI4PQpLBE8JKAQjKqMFFU9yK/0KKE0/nOqRjQvYef8LLlUd8Ul+hkmEwkzforcKD4Uhs18+b7tg9yUaZ+AhE5rsSi19g8KzOfGkk=","attributes":{"enabled":true,"nbf":1650912052,"exp":1682448652,"created":1650912652,"updated":1650912652,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1650912646,"updated":1650912646}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f1e38a4e-1337-454e-a653-4c3a0d3b51c5',
  'x-ms-request-id',
  'b3e0bcf1-e1d2-40cb-9acf-f6b9a9d04467',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1356;da_age=1356;rd_age=1356;brd_age=12149;ra_notif_age=1826;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:42 GMT',
  'Content-Length',
  '2985'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ebd6cf19-ea04-418e-9b5b-b7c87792caf8',
  'x-ms-request-id',
  'b9ea41cf-7c35-4725-a85b-8cb3dda3415e',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1356;da_age=1356;rd_age=1356;brd_age=12150;ra_notif_age=1826;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1b3c2d73-5b6d-40fc-8cb9-ce9fb64cc062',
  'x-ms-request-id',
  'cf9e6d3a-d02b-4069-9bcc-741a281b3696',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1356;da_age=1356;rd_age=1356;brd_age=12150;ra_notif_age=1826;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910","deletedDate":1651104523,"scheduledPurgeDate":1651709323,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/84a7abafd5bc4486955613c5b3cdfd0d","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/84a7abafd5bc4486955613c5b3cdfd0d","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/84a7abafd5bc4486955613c5b3cdfd0d","x5t":"dSyNsUDMOxBiTV4H_jqe4xUGEto","cer":"MIIDKDCCAhCgAwIBAgIQZZpFzT0sRH+aE9heBKc+zzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI1MTg0MDUyWhcNMjMwNDI1MTg1MDUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLENY/exvblJtdI4KOhgsODOUTZAbxRyWv7FH4VEcbdrDe88oETjcNiNgH+5ohdBxtkn/k1/qHtqFbZi1nW/MDNO96QNr15v9ENJ+ybGLERHLbaH2igY4nFSmX4W01rsnmzW7QsoS96dPDJrYmWA0Ygl2K3juvoflTud35SqRZm14/4m2yYx675Ipv/LQhmLburE/f8SlVdh/Q+T5+438f2LtsNXJ9ZGrMSynD4Za1NEqEbP5feGRB9mO8EkB5wELiuMTjrqo2DkS5SAsTQx/ZGGFZPOdDj7dqiD43dRWx8PlF923WxwWlez8s7uuM/RXtkl9aUQm+urKCg9oHzcnFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRVC7WX0DJd+EgfY6Ct2+eq+nyU/jAdBgNVHQ4EFgQUVQu1l9AyXfhIH2Ogrdvnqvp8lP4wDQYJKoZIhvcNAQELBQADggEBAE0QPcRJzTNCXTKsChEyIWLq8HK4koZcESvFuk91WaxRZ2xnDFFggjM5rfFC3/WQprx0LcKlCEaQODpkqRNmpHQj/uAGXtYMzXekYJMKCiHGWw/pg88BjA3+FGJ+vKwbr1d0I1LvDxDYfdeCBBluS2mCoLyqtfZwNQAw2ENi9XViCuaFVNXBSYlkAOm9vryowvEWLdA0bx/an2rqXX1mTeHS1E5ur1qUfJM33Zwm09Fxs9XAXnQAI4PQpLBE8JKAQjKqMFFU9yK/0KKE0/nOqRjQvYef8LLlUd8Ul+hkmEwkzforcKD4Uhs18+b7tg9yUaZ+AhE5rsSi19g8KzOfGkk=","attributes":{"enabled":true,"nbf":1650912052,"exp":1682448652,"created":1650912652,"updated":1650912652,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1650912646,"updated":1650912646}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3e895bc0-dbe0-4881-8c3a-b7263f16d36f',
  'x-ms-request-id',
  'b1b4371c-3058-4722-80b0-bb9f1f700302',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1366;da_age=1366;rd_age=1366;brd_age=12160;ra_notif_age=1836;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:53 GMT',
  'Content-Length',
  '2985'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '70753686-d97e-4135-9e4d-2200316bdbf6',
  'x-ms-request-id',
  'c7b233d5-7d18-4142-9ee9-10a97e394000',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1367;da_age=1367;rd_age=1367;brd_age=12160;ra_notif_age=1836;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911","deletedDate":1651104533,"scheduledPurgeDate":1651709333,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911/71863a1864f64975a37065d38200003e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911/71863a1864f64975a37065d38200003e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911/71863a1864f64975a37065d38200003e","x5t":"dSyNsUDMOxBiTV4H_jqe4xUGEto","cer":"MIIDKDCCAhCgAwIBAgIQZZpFzT0sRH+aE9heBKc+zzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI1MTg0MDUyWhcNMjMwNDI1MTg1MDUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLENY/exvblJtdI4KOhgsODOUTZAbxRyWv7FH4VEcbdrDe88oETjcNiNgH+5ohdBxtkn/k1/qHtqFbZi1nW/MDNO96QNr15v9ENJ+ybGLERHLbaH2igY4nFSmX4W01rsnmzW7QsoS96dPDJrYmWA0Ygl2K3juvoflTud35SqRZm14/4m2yYx675Ipv/LQhmLburE/f8SlVdh/Q+T5+438f2LtsNXJ9ZGrMSynD4Za1NEqEbP5feGRB9mO8EkB5wELiuMTjrqo2DkS5SAsTQx/ZGGFZPOdDj7dqiD43dRWx8PlF923WxwWlez8s7uuM/RXtkl9aUQm+urKCg9oHzcnFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRVC7WX0DJd+EgfY6Ct2+eq+nyU/jAdBgNVHQ4EFgQUVQu1l9AyXfhIH2Ogrdvnqvp8lP4wDQYJKoZIhvcNAQELBQADggEBAE0QPcRJzTNCXTKsChEyIWLq8HK4koZcESvFuk91WaxRZ2xnDFFggjM5rfFC3/WQprx0LcKlCEaQODpkqRNmpHQj/uAGXtYMzXekYJMKCiHGWw/pg88BjA3+FGJ+vKwbr1d0I1LvDxDYfdeCBBluS2mCoLyqtfZwNQAw2ENi9XViCuaFVNXBSYlkAOm9vryowvEWLdA0bx/an2rqXX1mTeHS1E5ur1qUfJM33Zwm09Fxs9XAXnQAI4PQpLBE8JKAQjKqMFFU9yK/0KKE0/nOqRjQvYef8LLlUd8Ul+hkmEwkzforcKD4Uhs18+b7tg9yUaZ+AhE5rsSi19g8KzOfGkk=","attributes":{"enabled":true,"nbf":1650912052,"exp":1682448652,"created":1650912657,"updated":1650912657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1650912657,"updated":1650912657}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '35eff030-ed38-47bc-8c1e-690b4b50c79e',
  'x-ms-request-id',
  '97c533b5-86e1-4b1c-8a4e-4ea3c521229d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1367;da_age=1367;rd_age=1367;brd_age=12160;ra_notif_age=1836;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:53 GMT',
  'Content-Length',
  '2803'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6a2f9b8b-942b-459f-b5c8-fbe9cb850ab6',
  'x-ms-request-id',
  'aa12d766-b515-4d82-9e20-dd0f4d2fe4e6',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1367;da_age=1367;rd_age=1367;brd_age=12160;ra_notif_age=1836;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0b63685a-b9b2-44a6-a42d-065b55fcfc21',
  'x-ms-request-id',
  '6c9d5697-b467-4c35-a7b1-7acf283f0e83',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1367;da_age=1367;rd_age=1367;brd_age=12160;ra_notif_age=1836;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:08:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911","deletedDate":1651104533,"scheduledPurgeDate":1651709333,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911/71863a1864f64975a37065d38200003e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911/71863a1864f64975a37065d38200003e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911/71863a1864f64975a37065d38200003e","x5t":"dSyNsUDMOxBiTV4H_jqe4xUGEto","cer":"MIIDKDCCAhCgAwIBAgIQZZpFzT0sRH+aE9heBKc+zzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjIwNDI1MTg0MDUyWhcNMjMwNDI1MTg1MDUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLENY/exvblJtdI4KOhgsODOUTZAbxRyWv7FH4VEcbdrDe88oETjcNiNgH+5ohdBxtkn/k1/qHtqFbZi1nW/MDNO96QNr15v9ENJ+ybGLERHLbaH2igY4nFSmX4W01rsnmzW7QsoS96dPDJrYmWA0Ygl2K3juvoflTud35SqRZm14/4m2yYx675Ipv/LQhmLburE/f8SlVdh/Q+T5+438f2LtsNXJ9ZGrMSynD4Za1NEqEbP5feGRB9mO8EkB5wELiuMTjrqo2DkS5SAsTQx/ZGGFZPOdDj7dqiD43dRWx8PlF923WxwWlez8s7uuM/RXtkl9aUQm+urKCg9oHzcnFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRVC7WX0DJd+EgfY6Ct2+eq+nyU/jAdBgNVHQ4EFgQUVQu1l9AyXfhIH2Ogrdvnqvp8lP4wDQYJKoZIhvcNAQELBQADggEBAE0QPcRJzTNCXTKsChEyIWLq8HK4koZcESvFuk91WaxRZ2xnDFFggjM5rfFC3/WQprx0LcKlCEaQODpkqRNmpHQj/uAGXtYMzXekYJMKCiHGWw/pg88BjA3+FGJ+vKwbr1d0I1LvDxDYfdeCBBluS2mCoLyqtfZwNQAw2ENi9XViCuaFVNXBSYlkAOm9vryowvEWLdA0bx/an2rqXX1mTeHS1E5ur1qUfJM33Zwm09Fxs9XAXnQAI4PQpLBE8JKAQjKqMFFU9yK/0KKE0/nOqRjQvYef8LLlUd8Ul+hkmEwkzforcKD4Uhs18+b7tg9yUaZ+AhE5rsSi19g8KzOfGkk=","attributes":{"enabled":true,"nbf":1650912052,"exp":1682448652,"created":1650912657,"updated":1650912657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1650912657,"updated":1650912657}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '20db8e79-c8ff-4c15-b8bd-5afa3c01cf54',
  'x-ms-request-id',
  '60f60457-7d12-45ce-a216-8d3d099dde9a',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1377;da_age=1377;rd_age=1377;brd_age=12170;ra_notif_age=1847;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:03 GMT',
  'Content-Length',
  '2803'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3c478223-1efa-410e-b172-928e53368a8f',
  'x-ms-request-id',
  'c220136b-289a-449d-a6ef-58e63752bfa6',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1377;da_age=1377;rd_age=1377;brd_age=12170;ra_notif_age=1847;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955","deletedDate":1651104544,"scheduledPurgeDate":1651709344,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955/25000cd70d7643b390ea0f7f57481036","attributes":{"enabled":false,"nbf":1650912069,"exp":1682448669,"created":1650912670,"updated":1650912670,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{"enabled":true,"created":1650912670,"updated":1650912670}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '15d0097a-8c4e-4def-b9de-9cb7590c550d',
  'x-ms-request-id',
  '2fd7c5fb-e703-428b-b776-ecdba0fb9195',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1377;da_age=1377;rd_age=1377;brd_age=12170;ra_notif_age=1847;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:04 GMT',
  'Content-Length',
  '1405'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '79574e5a-6d80-4537-abc8-55dec24e5981',
  'x-ms-request-id',
  '539574c2-3f66-4a11-afea-6cdbd5bf84d5',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1377;da_age=1377;rd_age=1377;brd_age=12170;ra_notif_age=1847;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4e696019-283b-4b2a-8337-003d01332cd2',
  'x-ms-request-id',
  'f9cd06c1-04c3-4cd7-8133-7a0abebe0c53',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1377;da_age=1377;rd_age=1377;brd_age=12170;ra_notif_age=1847;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955","deletedDate":1651104544,"scheduledPurgeDate":1651709344,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955/25000cd70d7643b390ea0f7f57481036","attributes":{"enabled":false,"nbf":1650912069,"exp":1682448669,"created":1650912670,"updated":1650912670,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{"enabled":true,"created":1650912670,"updated":1650912670}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8d1a6da8-ef42-42f6-a7d3-27bd84a6095c',
  'x-ms-request-id',
  'd35b9f8c-36f7-48d6-b95e-db0ff375510f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1387;da_age=1387;rd_age=1387;brd_age=12180;ra_notif_age=1857;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:14 GMT',
  'Content-Length',
  '1405'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6030164f-f823-4e17-9474-e7d61713c894',
  'x-ms-request-id',
  '2d252733-33e0-45d5-858f-d87a9a2ab1ce',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1387;da_age=1387;rd_age=1387;brd_age=12180;ra_notif_age=1857;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313","attributes":{"enabled":false,"nbf":1651017393,"exp":1682553993,"created":1651017993,"updated":1651017993},"subject":""}],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '73d9d0f6-f41b-45e9-bba8-50d24a508e0d',
  'x-ms-request-id',
  '3dbb4836-727e-4f28-be37-d0a1410ceb3a',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1387;da_age=1387;rd_age=1387;brd_age=12180;ra_notif_age=1857;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:14 GMT',
  'Content-Length',
  '279'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313","deletedDate":1651104554,"scheduledPurgeDate":1651709354,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313/21d5eb703a3840abb182e48031d46665","attributes":{"enabled":false,"nbf":1651017393,"exp":1682553993,"created":1651017993,"updated":1651017993,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{"enabled":true,"created":1651017994,"updated":1651017994}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '9da04880-ed1f-4050-b4bf-c37a5695f5d6',
  'x-ms-request-id',
  '7b16e9c4-d4cc-4197-a0fb-caed568c79a5',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1387;da_age=1387;rd_age=1387;brd_age=12180;ra_notif_age=1857;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:14 GMT',
  'Content-Length',
  '1401'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '82baba41-eca2-4c51-af57-39e77d79a521',
  'x-ms-request-id',
  '5b05e94d-57f8-40e0-83f8-6b8420d5fda8',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1387;da_age=1387;rd_age=1387;brd_age=12180;ra_notif_age=1857;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fd9a89b8-3cf1-419e-8b72-6a56d4e9f9e5',
  'x-ms-request-id',
  '6639c822-f8e4-49a4-8b54-e7b31a9f9e45',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1387;da_age=1387;rd_age=1387;brd_age=12180;ra_notif_age=1857;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ab2a580d-cc01-45ab-86f7-3fec8a99db2f',
  'x-ms-request-id',
  '5d2f802f-4dcb-42e5-9b98-28b06886049b',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1397;da_age=1397;rd_age=1397;brd_age=12190;ra_notif_age=1867;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313","deletedDate":1651104554,"scheduledPurgeDate":1651709354,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313/21d5eb703a3840abb182e48031d46665","attributes":{"enabled":false,"nbf":1651017393,"exp":1682553993,"created":1651017993,"updated":1651017993,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{"enabled":true,"created":1651017994,"updated":1651017994}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '15c2fb93-1216-4227-a5fe-6bcaf3f2a9d7',
  'x-ms-request-id',
  '87b8f687-e5d9-41a6-826a-8f647c37d08e',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1407;da_age=1407;rd_age=1407;brd_age=12200;ra_notif_age=1877;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:34 GMT',
  'Content-Length',
  '1401'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-6680478371728313')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c63ef7d7-556f-4118-b4be-a5d39dc99654',
  'x-ms-request-id',
  'eed34cd4-5b74-4458-bf57-9858d83be393',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1407;da_age=1407;rd_age=1407;brd_age=12201;ra_notif_age=1877;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candeleteacertificate-3190372610538623","deletedDate":1650912219,"scheduledPurgeDate":1651517019,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificate-3190372610538623","attributes":{"enabled":false,"nbf":1650911618,"exp":1682448218,"created":1650912219,"updated":1650912219,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candeleteacertificate-5483402023339023","deletedDate":1651017538,"scheduledPurgeDate":1651622338,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificate-5483402023339023","attributes":{"enabled":false,"nbf":1651016938,"exp":1682553538,"created":1651017538,"updated":1651017538,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candeleteacertificate-9661962357074698","deletedDate":1651103206,"scheduledPurgeDate":1651708006,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificate-9661962357074698","attributes":{"enabled":false,"nbf":1651102606,"exp":1682639206,"created":1651103206,"updated":1651103206,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candeleteacertificate-9781421252461691","deletedDate":1651104237,"scheduledPurgeDate":1651709037,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificate-9781421252461691","attributes":{"enabled":false,"nbf":1651103636,"exp":1682640236,"created":1651104237,"updated":1651104237,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-08811715693804012","deletedDate":1651017549,"scheduledPurgeDate":1651622349,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-08811715693804012","attributes":{"enabled":false,"nbf":1651016949,"exp":1682553549,"created":1651017549,"updated":1651017549,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-2833141546711677","deletedDate":1650912230,"scheduledPurgeDate":1651517030,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-2833141546711677","attributes":{"enabled":false,"nbf":1650911629,"exp":1682448229,"created":1650912230,"updated":1650912230,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-11322327139389055","deletedDate":1651103242,"scheduledPurgeDate":1651708042,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-11322327139389055","x5t":"jVBPwbivb3hloaCe46Ql1kxNhiM","attributes":{"enabled":true,"nbf":1651102636,"exp":1682639236,"created":1651103236,"updated":1651103236,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-2896645539530398","deletedDate":1651104274,"scheduledPurgeDate":1651709074,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-2896645539530398","x5t":"_1IDH-JfKazHQq8jbVrVvfMHC2I","attributes":{"enabled":true,"nbf":1651103672,"exp":1682640272,"created":1651104272,"updated":1651104272,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-36945435606505206","deletedDate":1650912257,"scheduledPurgeDate":1651517057,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-36945435606505206","x5t":"ebm6w5q3-eXKpU4l9XR8lvY36YY","attributes":{"enabled":true,"nbf":1650911649,"exp":1682448249,"created":1650912249,"updated":1650912249,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-5302434217842491","deletedDate":1651017576,"scheduledPurgeDate":1651622376,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-5302434217842491","x5t":"wrUoJDw19J7tybCFdUuMZUn_1aw","attributes":{"enabled":true,"nbf":1651016971,"exp":1682553571,"created":1651017572,"updated":1651017572,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-0051594570609909685","deletedDate":1651103263,"scheduledPurgeDate":1651708063,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-0051594570609909685","x5t":"yvxi0OhYca-Q5c-UknrrRf6BYBE","attributes":{"enabled":true,"nbf":1651102656,"exp":1682639256,"created":1651103257,"updated":1651103257,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-20096540646388528","deletedDate":1651017597,"scheduledPurgeDate":1651622397,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-20096540646388528","x5t":"xBTx3yW4X6euYR-0xAnFPF-XCe4","attributes":{"enabled":true,"nbf":1651016990,"exp":1682553590,"created":1651017590,"updated":1651017590,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-2715566009636652","deletedDate":1650912279,"scheduledPurgeDate":1651517079,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-2715566009636652","x5t":"D7iINIHKKMZlZ_qhghnyyZeqVd4","attributes":{"enabled":true,"nbf":1650911671,"exp":1682448271,"created":1650912272,"updated":1650912272,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-3298259010774247","deletedDate":1651104295,"scheduledPurgeDate":1651709095,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-3298259010774247","x5t":"xoJMadKQqpZDg42k2kK6lB491gY","attributes":{"enabled":true,"nbf":1651103689,"exp":1682640289,"created":1651104290,"updated":1651104290,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-77974317025101090","deletedDate":1651017651,"scheduledPurgeDate":1651622451,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-77974317025101090","x5t":"yY9CWNsTUTaBqVmcEt7RuEghDhc","attributes":{"enabled":true,"nbf":1651017035,"exp":1682553635,"created":1651017635,"updated":1651017635,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-77974317025101091","deletedDate":1651017661,"scheduledPurgeDate":1651622461,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-77974317025101091","x5t":"C_dCXfj6dz64-zEdx8gRergcsWo","attributes":{"enabled":true,"nbf":1651017044,"exp":1682553644,"created":1651017644,"updated":1651017644,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-78581071205279820","deletedDate":1651017715,"scheduledPurgeDate":1651622515,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-78581071205279820","x5t":"cgE7FGZUpjvYZOJ7qAN6M0ec4VE","attributes":{"enabled":true,"nbf":1651017098,"exp":1682553698,"created":1651017698,"updated":1651017698,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-78581071205279821","deletedDate":1651017725,"scheduledPurgeDate":1651622525,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-78581071205279821","x5t":"0EcQaJkgr_oUEiOrAfA69VYjWUg","attributes":{"enabled":true,"nbf":1651017108,"exp":1682553708,"created":1651017708,"updated":1651017708,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-031932043744139715","deletedDate":1651103801,"scheduledPurgeDate":1651708601,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-031932043744139715","x5t":"wvgAUa6sHbheoowC3nmjdtFvqCE","attributes":{"enabled":true,"nbf":1651103197,"exp":1682639797,"created":1651103797,"updated":1651103797,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-8559709817440289","deletedDate":1651017833,"scheduledPurgeDate":1651622633,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-8559709817440289","x5t":"Lzx8I-BAoKCJ2EAtZ1oUdrCYRXc","attributes":{"enabled":true,"nbf":1651017229,"exp":1682553829,"created":1651017829,"updated":1651017829,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-8626866080607496","deletedDate":1650912507,"scheduledPurgeDate":1651517307,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-8626866080607496","x5t":"uu1NAXJEVFPe5rg50JQ5dGdO_QM","attributes":{"enabled":true,"nbf":1650911902,"exp":1682448502,"created":1650912502,"updated":1650912502,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-6776814733750633","deletedDate":1650912485,"scheduledPurgeDate":1651517285,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-6776814733750633","x5t":"pexz-GHg5KOZYlxLb72btU-ohDI","attributes":{"enabled":true,"nbf":1650911878,"exp":1682448478,"created":1650912478,"updated":1650912478,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-8141453288822744","deletedDate":1651103780,"scheduledPurgeDate":1651708580,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-8141453288822744","x5t":"t_fAUIZwKv571HiBPvpHK7AB5Vo","attributes":{"enabled":true,"nbf":1651103175,"exp":1682639775,"created":1651103775,"updated":1651103775,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-8686539963186204","deletedDate":1651017812,"scheduledPurgeDate":1651622612,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-8686539963186204","x5t":"uJlYQDII5l0ptdsZErI1zLCYVwg","attributes":{"enabled":true,"nbf":1651017206,"exp":1682553806,"created":1651017806,"updated":1651017806,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-00016691735855234313","deletedDate":1651017959,"scheduledPurgeDate":1651622759,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-00016691735855234313","x5t":"CUgIBSh7TEWmgrP-aEP4EG8bKR0","attributes":{"enabled":true,"nbf":1651017355,"exp":1682553955,"created":1651017955,"updated":1651017955,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedcertificates?api-version=7.3&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJV05sY25ScFptbGpZWFJsTDB4U1QxSkZRMDlXUlZKRFJWSlVTVVpKUTBGVVJVNUJUVVV0UTBGT1VrVkRUMVpGVWtGRVJVeEZWRVZFUTBWU1ZFbEdTVU5CVkVWWFNWUklVa1ZSVlVWVFZFOVFWRWxQVGxOVVNVMUZUMVZVTFRNeE9EWXlPRGd4T1RrM01UUWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'dd6bd3b5-05a3-426c-8d49-ed63b31f3a8c',
  'x-ms-request-id',
  '18d5ecce-d05d-49f2-866a-a1e6c519d97e',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1407;da_age=1407;rd_age=1407;brd_age=12201;ra_notif_age=1877;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:34 GMT',
  'Content-Length',
  '13968'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candeleteacertificate-3190372610538623')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '191b8aaf-7841-4371-af85-bcd8e3c67bbf',
  'x-ms-request-id',
  '365b7950-a139-48f2-ae31-e1ef25050022',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12201;ra_notif_age=1877;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candeleteacertificate-5483402023339023')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '82de6bdd-cb37-4dcd-8bdf-2555f30b9d2f',
  'x-ms-request-id',
  '97b7e41f-1162-41b2-a26e-cdd5e8b9201f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12201;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candeleteacertificate-9661962357074698')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '605d6e0d-46e6-4863-872b-a6ceef485406',
  'x-ms-request-id',
  '70aea6b1-3518-4d9b-af94-d42c5abf4d05',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12201;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candeleteacertificate-9781421252461691')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '026e6220-95b0-449c-be4d-c6819b73e496',
  'x-ms-request-id',
  '8439777c-43a4-41e5-82b2-ab7ddc403b5b',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12201;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-08811715693804012')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '780cffd4-ea9c-47b4-9ba8-ef300fc7ecd9',
  'x-ms-request-id',
  '6b9fd2f8-3eeb-49cf-91a1-2844195735e5',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12201;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-2833141546711677')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bf31fd05-4255-4679-8955-707b77433649',
  'x-ms-request-id',
  '6fece35a-9de4-4e02-b438-3924d3fbc7d5',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12201;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-11322327139389055')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fb0ec25f-fb0a-4804-8dad-ac8fbee3d3d6',
  'x-ms-request-id',
  '6f22850b-3426-4a93-9e6c-36b43c03b161',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12201;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-2896645539530398')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b4a06a99-e347-4551-a298-468ab55a4e00',
  'x-ms-request-id',
  '8f5828e3-5eba-406c-b9ad-46173fe825e0',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12202;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-36945435606505206')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5057d114-916f-4877-80b3-8224a205d302',
  'x-ms-request-id',
  'ff49dd35-ef5b-4ea0-b3d5-cfb794521e69',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1408;da_age=1408;rd_age=1408;brd_age=12202;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-5302434217842491')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '271e43e8-24f4-4541-94fd-bc8b15e89929',
  'x-ms-request-id',
  '339e63cb-6350-4d4c-a77f-3e6a94b9cff1',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-0051594570609909685')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6f3970ab-52ba-4256-af15-efe73a3f7592',
  'x-ms-request-id',
  'd75fe44f-b9d3-4054-8b2f-c0540f045e86',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1878;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-20096540646388528')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5376e53c-dff2-4230-ab4a-551216b4c434',
  'x-ms-request-id',
  '57d77e5c-8f13-497e-94c7-f4f6f9deb9a2',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-2715566009636652')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f02eab39-1fc3-4df5-88e9-71f5bf0e8563',
  'x-ms-request-id',
  'c5246a9f-7670-42dd-a1b2-4a9b5f0d1c15',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-3298259010774247')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'da7a745a-3bb2-44bc-b4f4-b3f38afabf84',
  'x-ms-request-id',
  'ea53f16c-37b0-47bc-9366-069ad1c7b95a',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificates-77974317025101090')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '79771ac6-c8d8-490e-bd5f-66340ab5c343',
  'x-ms-request-id',
  '516185d1-92ac-45de-b0ae-12fc1e78838a',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificates-77974317025101091')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '453cfa0e-bd4e-4ac6-8e1a-e012eeea04ff',
  'x-ms-request-id',
  'b9d9b6ea-3053-4983-8c15-5aa9fce03893',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-78581071205279820')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c09e55ca-2537-4437-8794-5ff14d743bec',
  'x-ms-request-id',
  '47286f76-330e-42ea-8be0-19286e62b95f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-78581071205279821')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'caf4237b-b672-499b-97d8-eb6060574942',
  'x-ms-request-id',
  'c2172933-a3ef-42b7-8a69-4b679e99fbf3',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12202;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-031932043744139715')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'a791d171-22f1-42b9-a51d-320f3296478a',
  'x-ms-request-id',
  '1d4aa326-3682-48f7-b1be-138b87108c8d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1409;da_age=1409;rd_age=1409;brd_age=12203;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-8559709817440289')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6dffd569-b2be-4f2a-9936-954a3d0acd0f',
  'x-ms-request-id',
  'a9b5af66-131a-4430-971c-6ed1d06fc8a8',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12203;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-8626866080607496')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '01f02d82-d485-46c8-87a9-168261887f49',
  'x-ms-request-id',
  '13837b74-7eed-4c1e-9553-37dbde599a2a',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12203;ra_notif_age=1879;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-6776814733750633')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '17004210-6914-4cb1-8283-99901565e31d',
  'x-ms-request-id',
  'a9cc3b62-6be9-4d67-8a7d-b0ea37228250',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12203;ra_notif_age=1880;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-8141453288822744')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '96e9b5a3-b89b-49fd-bebb-2a77991b2c27',
  'x-ms-request-id',
  'e4602cc0-599d-40db-9001-dee2600ff643',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12203;ra_notif_age=1880;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-8686539963186204')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0d26c5bc-63d3-4b77-b498-c7bc1ddbfe0a',
  'x-ms-request-id',
  '80c991b6-5fe7-4298-82cf-a01bc02a0069',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12203;ra_notif_age=1880;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-00016691735855234313')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2450ba84-5cc9-464f-a114-64ee56d2e9f0',
  'x-ms-request-id',
  'd3f7d88d-f36f-4d94-8715-374be3e76b34',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12203;ra_notif_age=1880;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-3186288199714","deletedDate":1650912635,"scheduledPurgeDate":1651517435,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-3186288199714","x5t":"ld7-PrtYtyzwYrkuhpI-ymdXrR0","attributes":{"enabled":true,"nbf":1650912028,"exp":1682448628,"created":1650912628,"updated":1650912628,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144430","deletedDate":1651104130,"scheduledPurgeDate":1651708930,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144430","x5t":"Sf9XpYQzmrwX3UUp4J04nq31aRs","attributes":{"enabled":true,"nbf":1651103334,"exp":1682639934,"created":1651103934,"updated":1651103934,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1d71c136-11de-49de-b69e-2db4a4420828',
  'x-ms-request-id',
  '3f6b2d49-0cdb-4a60-8097-37dfc4f2ac4d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12203;ra_notif_age=1880;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:37 GMT',
  'Content-Length',
  '1223'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-3186288199714')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f6ec65a2-6a28-451e-9d18-7bee41a51156',
  'x-ms-request-id',
  'e26415a0-d2b5-4a88-9e42-697d4561be3d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12203;ra_notif_age=1880;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-44593405215144430')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b9c9bb41-58bd-4112-b84f-3c5ccdf908bc',
  'x-ms-request-id',
  '962f6f0e-32b9-4cd0-b698-73e1f8131866',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1410;da_age=1410;rd_age=1410;brd_age=12204;ra_notif_age=1880;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:09:37 GMT'
]);
