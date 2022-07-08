let nock = require('nock');

module.exports.hash = "5bbc3f3648bb07e23d4d50bb5168c844";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistsecretproperties-0')
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
  '44644e80-cdf0-4a2b-a9d3-026aed456457',
  'x-ms-request-id',
  '425f5f2f-cc47-4eae-ac54-2f2c94dface6',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:45:58 GMT'
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
  'c57ba0d7-ae77-4ca4-b279-3b6850c8e000',
  'x-ms-ests-server',
  '2.1.12651.7 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ao5L0y25L6dJn8WlzRXd-ng; expires=Thu, 26-May-2022 22:45:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJvGQXvw8vBoZVDBpLCyctNZwdIl881ILQZGm0IPGExr-ydL12O7_ORI7m0duMr7U3w9r1V5kkYsPv2Cw91PfLfmWup_n9nz1rcaFqCHLfqbq39_m7gTgf-ybsxav4g3wQnINldJndw1MPWeln87fWM-uKRvsdOXkQFGKimeLyncgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:45:59 GMT',
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
  'f12f391a-3eb1-4191-a06b-da9bb7e10500',
  'x-ms-ests-server',
  '2.1.12707.9 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtIbPeZYUVFBthvFtVO3Wjc; expires=Thu, 26-May-2022 22:45:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHRDV56t-DvIE61WmlREO6pME6m08jEK6W8HQf_KSYmBLCAK1gojK8IXiYTIRHzW_TqY3ECBRkLvBaNpdaz7hNIBt4zniSYaROdelqWhgoLGeQ4gbWI5GMP3Veq74eQzZ-cDVQn296uA7P6MDMivKCrRu2uQuaZuVzmJGUsHN4jAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:45:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ef3d950f-d61c-4973-9feb-fb1f1742e731&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '14cef94c-74e1-47af-9a49-e351552c7400',
  'x-ms-ests-server',
  '2.1.12651.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aj1k7kEcAPFPsIKWvHUrsHhPlvakAQAAACdt-tkOAAAA; expires=Thu, 26-May-2022 22:45:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:45:59 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistsecretproperties-0', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretproperties-0/f1036d35723b45b4b0c1ef16c36857ed","attributes":{"enabled":true,"created":1651013160,"updated":1651013160,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '44644e80-cdf0-4a2b-a9d3-026aed456457',
  'x-ms-request-id',
  'da236da4-2cc3-42dc-bd5f-09aba1237c59',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1772;da_age=1772;rd_age=1772;brd_age=7329;ra_notif_age=8411;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:45:59 GMT',
  'Content-Length',
  '303'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistsecretproperties-1', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretproperties-1/f4df559a10484e92b26d0ae745ae5827","attributes":{"enabled":true,"created":1651013160,"updated":1651013160,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '1231f6d3-2f85-4e9e-a9ac-0136e07486c6',
  'x-ms-request-id',
  '2ca06efd-b28f-4aa4-ab2b-392350ec5cf1',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1772;da_age=1772;rd_age=1772;brd_age=7329;ra_notif_age=8411;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:45:59 GMT',
  'Content-Length',
  '303'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-902186075425828","managed":true,"attributes":{"enabled":true,"nbf":1650912074,"exp":1682448674,"created":1650912674,"updated":1650912674,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrestoreakeywithrequestOptionstimeout-7108088220443354","managed":true,"attributes":{"enabled":true,"nbf":1650912107,"exp":1682448707,"created":1650912708,"updated":1650912708,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canabortcreatingacertificate-5883448267733953","managed":true,"attributes":{"enabled":true,"nbf":1650911569,"exp":1682448169,"created":1650912170,"updated":1650912170,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cancreateacertificate-45938262336400504","managed":true,"attributes":{"enabled":true,"nbf":1650911569,"exp":1682448169,"created":1650912169,"updated":1650912169,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-3025637443188376","managed":true,"attributes":{"enabled":false,"nbf":1650911631,"exp":1682448231,"created":1650912231,"updated":1650912231,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-7659523499740168","managed":true,"attributes":{"enabled":false,"nbf":1650911572,"exp":1682448172,"created":1650912172,"updated":1650912179,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-39443727842967213","managed":true,"attributes":{"enabled":false,"nbf":1650911584,"exp":1682448184,"created":1650912184,"updated":1650912191,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificate-5464973539136055","managed":true,"attributes":{"enabled":true,"nbf":1650911596,"exp":1682448196,"created":1650912196,"updated":1650912196,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pem-file","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-9494217347034617","managed":true,"attributes":{"enabled":true,"nbf":1650911611,"exp":1682448211,"created":1650912211,"updated":1650912211,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-6645145257067986","managed":true,"attributes":{"enabled":true,"nbf":1650911596,"exp":1682448196,"created":1650912196,"updated":1650912196,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatewithrequestOptionstimeout-039921875168805965","managed":true,"attributes":{"enabled":true,"nbf":1650911619,"exp":1682448219,"created":1650912220,"updated":1650912220,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canretrievethelatestversionofacertificatevalue-6868786414946368","managed":true,"attributes":{"enabled":true,"nbf":1650911629,"exp":1682448229,"created":1650912229,"updated":1650912229,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canupdateacertificatespolicy-7446048648528778","managed":true,"attributes":{"enabled":true,"nbf":1650911638,"exp":1682448238,"created":1650912238,"updated":1650912238,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canupdatecertificatewithrequestOptionstimeout-9850265219688603","managed":true,"attributes":{"enabled":true,"nbf":1650911596,"exp":1682448196,"created":1650912196,"updated":1650912196,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canupdatethetagsofacertificate-0838940541659654","managed":true,"attributes":{"enabled":true,"nbf":1650911572,"exp":1682448172,"created":1650912172,"updated":1650912172,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-supportstracing-9805158881504268","managed":true,"attributes":{"enabled":true,"nbf":1650911638,"exp":1682448238,"created":1650912238,"updated":1650912238,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/crudcertoperation165091223566309635","managed":true,"attributes":{"enabled":false,"nbf":1650911633,"exp":1682448233,"created":1650912234,"updated":1650912234,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":"https://keyvault_name.vault.azure.net:443/secrets?api-version=7.3&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExMjghTURBd01EVXlJWE5sWTNKbGRDOURVbFZFVTBWRFVrVlVUa0ZOUlMxRFFVNUhSVlJCVTBWRFVrVlVMVFExT1RnM016YzNPRGsxTWpJM05UTWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '0d8563e8-5104-49ba-9e79-e87051d4481e',
  'x-ms-request-id',
  '8caad8e0-3bea-4c33-8f56-66502a911661',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1772;da_age=1772;rd_age=1772;brd_age=7329;ra_notif_age=8412;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:45:59 GMT',
  'Content-Length',
  '6373'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets')
  .query(true)
  .reply(200, {"value":[{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-73440002799117470","managed":true,"attributes":{"enabled":true,"nbf":1650911695,"exp":1682448295,"created":1650912295,"updated":1650912295,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-73440002799117471","managed":true,"attributes":{"enabled":true,"nbf":1650911705,"exp":1682448305,"created":1650912306,"updated":1650912306,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-63649970389777420","managed":true,"attributes":{"enabled":true,"nbf":1650911759,"exp":1682448359,"created":1650912359,"updated":1650912359,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-63649970389777421","managed":true,"attributes":{"enabled":true,"nbf":1650911771,"exp":1682448371,"created":1650912371,"updated":1650912371,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-557070845686914","managed":true,"attributes":{"enabled":true,"nbf":1650911844,"exp":1682448444,"created":1650912444,"updated":1650912444,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag03"}},{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretproperties-0","attributes":{"enabled":true,"created":1651013160,"updated":1651013160,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistsecretproperties-1","attributes":{"enabled":true,"created":1651013160,"updated":1651013160,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-7248107557364418","managed":true,"attributes":{"enabled":true,"nbf":1650911867,"exp":1682448467,"created":1650912467,"updated":1650912467,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-18093595927134576","managed":true,"attributes":{"enabled":true,"nbf":1650911859,"exp":1682448459,"created":1650912460,"updated":1650912460,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-2565946420730221","managed":true,"attributes":{"enabled":true,"nbf":1650911933,"exp":1682448533,"created":1650912533,"updated":1650912533,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-2633857963536981","managed":true,"attributes":{"enabled":true,"nbf":1650911924,"exp":1682448524,"created":1650912525,"updated":1650912525,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-206465948168775840","managed":true,"attributes":{"enabled":true,"nbf":1650912065,"exp":1682448665,"created":1650912665,"updated":1650912665,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-206465948168775841","managed":true,"attributes":{"enabled":true,"nbf":1650912065,"exp":1682448665,"created":1650912669,"updated":1650912669,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234910","managed":true,"attributes":{"enabled":true,"nbf":1650912052,"exp":1682448652,"created":1650912652,"updated":1650912652,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-64673314285234911","managed":true,"attributes":{"enabled":true,"nbf":1650912052,"exp":1682448652,"created":1650912657,"updated":1650912657,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canmergeaselfsignedcertificate-29114300303856955","managed":true,"attributes":{"enabled":false,"nbf":1650912069,"exp":1682448669,"created":1650912670,"updated":1650912670,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
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
  '8d4fc947-780a-4e21-901b-e6e2d364a963',
  'x-ms-request-id',
  'd715533c-9ca6-4a45-8bca-455d2a7ce8d7',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1772;da_age=1772;rd_age=1772;brd_age=7330;ra_notif_age=8412;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:00 GMT',
  'Content-Length',
  '5688'
]);
