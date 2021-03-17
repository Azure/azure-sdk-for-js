let nock = require('nock');

module.exports.hash = "c7be8fd8843b9e9838652a8cf6be155e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '455ac60e-81c7-40ca-a727-eb46539d4d07',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:05 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  'd4a899f4-ff9e-44c4-8b0c-232ca754ef00',
  'x-ms-ests-server',
  '2.1.11496.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDAgAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:56:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:56:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoTFUKxQHVYyDlDwqs2eh0kFPQKyCkTOK+LPdQGLvCbvGXYonuyX6Xcr9Zp8kLfMQG2HZWtUv5KX9D6xGWkFlrfUh03SHBZoEVNB9dNEXEVi7bUM2Ucrv4KXh/7cR0weOFrHtdo9uiF4JTypQlhhMczPrPx+xA3DELCTgr1X2orR+C3gUB6aO5lJZyTyltvAfj48QuNz31bnvJPK4VgQqGXFjj7F3i8pFXYet7pggwL3ALHcl8PkrusO+Phy7D+JUTyoFIBkdKD5douP4BAJsVosAB9edRoWxipTbc77kGq+8qRnGYL8kjV2hl9Slm1Ge4Kkv9aaV9d2H+jErDvLTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI5d4A6deFRygm/EgUt4X0fwQvjYFK2J99HXA2frX1vk3uPFq1Q/aL5VvphSvjMKuw1+2R76ldJyCPdJE7EKLo/8YIXLuqJpQtxSLzFpMElbOGiKCH1q4LYtCZj5GNObgR5E82Kxtx5vb191m7tTjgVDFv67lpZl1+wvWUQYUdBDN1ZvfSFLaLk73zFWz3yB8cIGseMNunDblBF/FBjjtVXyCJPAe2m0HqmkasrI3EM2Er2HpwUyVZ6OQiQs2WJzLxsAgozc057oHThixC43WBLls3J2hbVsw1dz5T6vAfCDEaR2enb8dckTxkFB2yEEZ6gONkYFZ4RlfvBoC9lYBLc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c347461e95954ec9ba61de644fc31051"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending?api-version=7.2&request_id=c347461e95954ec9ba61de644fc31051',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4596e12e-8fff-4bd2-8091-adaf44956325',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:06 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoTFUKxQHVYyDlDwqs2eh0kFPQKyCkTOK+LPdQGLvCbvGXYonuyX6Xcr9Zp8kLfMQG2HZWtUv5KX9D6xGWkFlrfUh03SHBZoEVNB9dNEXEVi7bUM2Ucrv4KXh/7cR0weOFrHtdo9uiF4JTypQlhhMczPrPx+xA3DELCTgr1X2orR+C3gUB6aO5lJZyTyltvAfj48QuNz31bnvJPK4VgQqGXFjj7F3i8pFXYet7pggwL3ALHcl8PkrusO+Phy7D+JUTyoFIBkdKD5douP4BAJsVosAB9edRoWxipTbc77kGq+8qRnGYL8kjV2hl9Slm1Ge4Kkv9aaV9d2H+jErDvLTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI5d4A6deFRygm/EgUt4X0fwQvjYFK2J99HXA2frX1vk3uPFq1Q/aL5VvphSvjMKuw1+2R76ldJyCPdJE7EKLo/8YIXLuqJpQtxSLzFpMElbOGiKCH1q4LYtCZj5GNObgR5E82Kxtx5vb191m7tTjgVDFv67lpZl1+wvWUQYUdBDN1ZvfSFLaLk73zFWz3yB8cIGseMNunDblBF/FBjjtVXyCJPAe2m0HqmkasrI3EM2Er2HpwUyVZ6OQiQs2WJzLxsAgozc057oHThixC43WBLls3J2hbVsw1dz5T6vAfCDEaR2enb8dckTxkFB2yEEZ6gONkYFZ4RlfvBoC9lYBLc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c347461e95954ec9ba61de644fc31051"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '43621aa7-83c0-488f-9fda-fe1ee7bc97e2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:05 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoTFUKxQHVYyDlDwqs2eh0kFPQKyCkTOK+LPdQGLvCbvGXYonuyX6Xcr9Zp8kLfMQG2HZWtUv5KX9D6xGWkFlrfUh03SHBZoEVNB9dNEXEVi7bUM2Ucrv4KXh/7cR0weOFrHtdo9uiF4JTypQlhhMczPrPx+xA3DELCTgr1X2orR+C3gUB6aO5lJZyTyltvAfj48QuNz31bnvJPK4VgQqGXFjj7F3i8pFXYet7pggwL3ALHcl8PkrusO+Phy7D+JUTyoFIBkdKD5douP4BAJsVosAB9edRoWxipTbc77kGq+8qRnGYL8kjV2hl9Slm1Ge4Kkv9aaV9d2H+jErDvLTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI5d4A6deFRygm/EgUt4X0fwQvjYFK2J99HXA2frX1vk3uPFq1Q/aL5VvphSvjMKuw1+2R76ldJyCPdJE7EKLo/8YIXLuqJpQtxSLzFpMElbOGiKCH1q4LYtCZj5GNObgR5E82Kxtx5vb191m7tTjgVDFv67lpZl1+wvWUQYUdBDN1ZvfSFLaLk73zFWz3yB8cIGseMNunDblBF/FBjjtVXyCJPAe2m0HqmkasrI3EM2Er2HpwUyVZ6OQiQs2WJzLxsAgozc057oHThixC43WBLls3J2hbVsw1dz5T6vAfCDEaR2enb8dckTxkFB2yEEZ6gONkYFZ4RlfvBoC9lYBLc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c347461e95954ec9ba61de644fc31051"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4d934da4-2772-433a-a0ec-25dbc9be5237',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:06 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoTFUKxQHVYyDlDwqs2eh0kFPQKyCkTOK+LPdQGLvCbvGXYonuyX6Xcr9Zp8kLfMQG2HZWtUv5KX9D6xGWkFlrfUh03SHBZoEVNB9dNEXEVi7bUM2Ucrv4KXh/7cR0weOFrHtdo9uiF4JTypQlhhMczPrPx+xA3DELCTgr1X2orR+C3gUB6aO5lJZyTyltvAfj48QuNz31bnvJPK4VgQqGXFjj7F3i8pFXYet7pggwL3ALHcl8PkrusO+Phy7D+JUTyoFIBkdKD5douP4BAJsVosAB9edRoWxipTbc77kGq+8qRnGYL8kjV2hl9Slm1Ge4Kkv9aaV9d2H+jErDvLTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI5d4A6deFRygm/EgUt4X0fwQvjYFK2J99HXA2frX1vk3uPFq1Q/aL5VvphSvjMKuw1+2R76ldJyCPdJE7EKLo/8YIXLuqJpQtxSLzFpMElbOGiKCH1q4LYtCZj5GNObgR5E82Kxtx5vb191m7tTjgVDFv67lpZl1+wvWUQYUdBDN1ZvfSFLaLk73zFWz3yB8cIGseMNunDblBF/FBjjtVXyCJPAe2m0HqmkasrI3EM2Er2HpwUyVZ6OQiQs2WJzLxsAgozc057oHThixC43WBLls3J2hbVsw1dz5T6vAfCDEaR2enb8dckTxkFB2yEEZ6gONkYFZ4RlfvBoC9lYBLc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c347461e95954ec9ba61de644fc31051"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c7db4422-529b-49f3-8469-1d20a8db3eee',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:07 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoTFUKxQHVYyDlDwqs2eh0kFPQKyCkTOK+LPdQGLvCbvGXYonuyX6Xcr9Zp8kLfMQG2HZWtUv5KX9D6xGWkFlrfUh03SHBZoEVNB9dNEXEVi7bUM2Ucrv4KXh/7cR0weOFrHtdo9uiF4JTypQlhhMczPrPx+xA3DELCTgr1X2orR+C3gUB6aO5lJZyTyltvAfj48QuNz31bnvJPK4VgQqGXFjj7F3i8pFXYet7pggwL3ALHcl8PkrusO+Phy7D+JUTyoFIBkdKD5douP4BAJsVosAB9edRoWxipTbc77kGq+8qRnGYL8kjV2hl9Slm1Ge4Kkv9aaV9d2H+jErDvLTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI5d4A6deFRygm/EgUt4X0fwQvjYFK2J99HXA2frX1vk3uPFq1Q/aL5VvphSvjMKuw1+2R76ldJyCPdJE7EKLo/8YIXLuqJpQtxSLzFpMElbOGiKCH1q4LYtCZj5GNObgR5E82Kxtx5vb191m7tTjgVDFv67lpZl1+wvWUQYUdBDN1ZvfSFLaLk73zFWz3yB8cIGseMNunDblBF/FBjjtVXyCJPAe2m0HqmkasrI3EM2Er2HpwUyVZ6OQiQs2WJzLxsAgozc057oHThixC43WBLls3J2hbVsw1dz5T6vAfCDEaR2enb8dckTxkFB2yEEZ6gONkYFZ4RlfvBoC9lYBLc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c347461e95954ec9ba61de644fc31051"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '941befad-115c-4479-a1c7-0e1e00d30591',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:10 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoTFUKxQHVYyDlDwqs2eh0kFPQKyCkTOK+LPdQGLvCbvGXYonuyX6Xcr9Zp8kLfMQG2HZWtUv5KX9D6xGWkFlrfUh03SHBZoEVNB9dNEXEVi7bUM2Ucrv4KXh/7cR0weOFrHtdo9uiF4JTypQlhhMczPrPx+xA3DELCTgr1X2orR+C3gUB6aO5lJZyTyltvAfj48QuNz31bnvJPK4VgQqGXFjj7F3i8pFXYet7pggwL3ALHcl8PkrusO+Phy7D+JUTyoFIBkdKD5douP4BAJsVosAB9edRoWxipTbc77kGq+8qRnGYL8kjV2hl9Slm1Ge4Kkv9aaV9d2H+jErDvLTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI5d4A6deFRygm/EgUt4X0fwQvjYFK2J99HXA2frX1vk3uPFq1Q/aL5VvphSvjMKuw1+2R76ldJyCPdJE7EKLo/8YIXLuqJpQtxSLzFpMElbOGiKCH1q4LYtCZj5GNObgR5E82Kxtx5vb191m7tTjgVDFv67lpZl1+wvWUQYUdBDN1ZvfSFLaLk73zFWz3yB8cIGseMNunDblBF/FBjjtVXyCJPAe2m0HqmkasrI3EM2Er2HpwUyVZ6OQiQs2WJzLxsAgozc057oHThixC43WBLls3J2hbVsw1dz5T6vAfCDEaR2enb8dckTxkFB2yEEZ6gONkYFZ4RlfvBoC9lYBLc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c347461e95954ec9ba61de644fc31051"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a274100f-055a-4174-85d7-f9e98a5a5931',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:12 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoTFUKxQHVYyDlDwqs2eh0kFPQKyCkTOK+LPdQGLvCbvGXYonuyX6Xcr9Zp8kLfMQG2HZWtUv5KX9D6xGWkFlrfUh03SHBZoEVNB9dNEXEVi7bUM2Ucrv4KXh/7cR0weOFrHtdo9uiF4JTypQlhhMczPrPx+xA3DELCTgr1X2orR+C3gUB6aO5lJZyTyltvAfj48QuNz31bnvJPK4VgQqGXFjj7F3i8pFXYet7pggwL3ALHcl8PkrusO+Phy7D+JUTyoFIBkdKD5douP4BAJsVosAB9edRoWxipTbc77kGq+8qRnGYL8kjV2hl9Slm1Ge4Kkv9aaV9d2H+jErDvLTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI5d4A6deFRygm/EgUt4X0fwQvjYFK2J99HXA2frX1vk3uPFq1Q/aL5VvphSvjMKuw1+2R76ldJyCPdJE7EKLo/8YIXLuqJpQtxSLzFpMElbOGiKCH1q4LYtCZj5GNObgR5E82Kxtx5vb191m7tTjgVDFv67lpZl1+wvWUQYUdBDN1ZvfSFLaLk73zFWz3yB8cIGseMNunDblBF/FBjjtVXyCJPAe2m0HqmkasrI3EM2Er2HpwUyVZ6OQiQs2WJzLxsAgozc057oHThixC43WBLls3J2hbVsw1dz5T6vAfCDEaR2enb8dckTxkFB2yEEZ6gONkYFZ4RlfvBoC9lYBLc=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","request_id":"c347461e95954ec9ba61de644fc31051"}, [
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
  'x-ms-request-id',
  '21c7152c-2d31-42a3-b4e4-52a7656af033',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:14 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","x5t":"ps-hWYNfbsHknTFpwIpeRdvxOCI","cer":"MIIDKDCCAhCgAwIBAgIQAzjhDmrEStqnr25To4VX5TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NjE0WhcNMjIwMjE2MTg1NjE0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDOhMVQrFAdVjIOUPCqzZ6HSQU9ArIKRM4r4s91AYu8Ju8Zdiie7Jfpdyv1mnyQt8xAbYdla1S/kpf0PrEZaQWWt9SHTdIcFmgRU0H100RcRWLttQzZRyu/gpeH/txHTB44Wse12j26IXglPKlCWGExzM+s/H7EDcMQsJOCvVfaitH4LeBQHpo7mUlnJPKW28B+PjxC43PfVue8k8rhWBCoZcWOPsXeLykVdh63umCDAvcAsdyXw+Su6w74+HLsP4lRPKgUgGR0oPl2i4/gEAmxWiwAH151GhbGKlNtzvuQar7ypGcZgvySNXaGX1KWbUZ7gqS/1ppX13Yf6MSsO8tNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRzSrQuzHrLCdsPw1Dg31mkLd8GDTAdBgNVHQ4EFgQUc0q0Lsx6ywnbD8NQ4N9ZpC3fBg0wDQYJKoZIhvcNAQELBQADggEBAIbKOdYA99k+g092boV41kXOup9Z0NZRb2epeeTmUyo6upyyrMUwJocoMgQPtgY2iQV+hjz6pASbaJERNEzEzGOJ0cf5lrb4oE5svuMl9adKGYo94+b2pCvFzogaNNTJdnmtaOiRkt2iDJB9iWQiF15FXD6FoJOCCSpV0OWDdbYWCZUghrNfx3l6namewOZJR2hEftunVjJD3W1DsxZGdUlORIUaM5B8wMf9+sGpDfpEY/zYvng3k2dwxMBNeklJ/z9yd23gSXqnGclZHyk50690GXGI7wdavGizUL5BMTsnEJyRyIZZKVkaxtMbRY3a8gM3iRLW6GPtcnyvyuaNhlw=","attributes":{"enabled":true,"nbf":1613501174,"exp":1645037774,"created":1613501774,"updated":1613501774,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501766,"updated":1613501766}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  'x-ms-request-id',
  'c428991b-27d8-4f7c-b777-3f2630734a7f',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:14 GMT',
  'Content-Length',
  '2744'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo16YRXIdfmFRLw6VwMrGF7eDoYCjB4zJs73v7/FuXD3LxTftTx8+Z29er0jQK9nAMUamu3ZMWpd0H4QKuZ/Zn0SD8q2OWv3OOfBpJLXG/Xuwks9QZHcK+NOkVjgygG6RpL/oFSQLmI554Mk7zMXi0CgYyTuhTeUDcbecnsutwY1HSsnXGfgzHnFbhwlc5GW6KKc4I6Bn/r1pVJik88CSsG2fKk1QKCtefQtK6YKqAnqLYk0N5LugMVJJ51uZ0U1m+jjrX33vPBfQIpLY8sEvZhtxOJz3sKFLTgLOsQ7utYArV1M12fIttqXyFXeIdy2u2pcpbue94ahAzeNSB7qgoQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD0oauXnpe3sWeMDBA3tVRKEVhjb9e8oal0/KqQX3EuTcANLpj7L/JUcADucIylu+M3wCSS7/4sKVyT37uZ+IofxfkWTbnAaTbmCMSb6yLfkscSef7GC9KB/tyq7bMF1urioz+F8IAxS//p9j6n7Q65JH2J0GyjIOCT2CJRWIy3amHNUtegWy3V2tsk3JZrzrM/GesDm+HcoTwYmbUBO3THxa7JRefmdoB3keuFS7hugKJ8jvBFrBetMrwTR7YU1MU5CMJRDdRe+FxEn+AMxS8Eh2PPxKM5vIZMsAlSVpjg7E38bqf5jDp+RfZnafjSUF69I56SxAoGmMzBPVtO5UPY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c05e1de4c12a4cb2a74821955a218e0b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending?api-version=7.2&request_id=c05e1de4c12a4cb2a74821955a218e0b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4e646743-c5b4-4dc5-831d-26abe3986998',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:15 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo16YRXIdfmFRLw6VwMrGF7eDoYCjB4zJs73v7/FuXD3LxTftTx8+Z29er0jQK9nAMUamu3ZMWpd0H4QKuZ/Zn0SD8q2OWv3OOfBpJLXG/Xuwks9QZHcK+NOkVjgygG6RpL/oFSQLmI554Mk7zMXi0CgYyTuhTeUDcbecnsutwY1HSsnXGfgzHnFbhwlc5GW6KKc4I6Bn/r1pVJik88CSsG2fKk1QKCtefQtK6YKqAnqLYk0N5LugMVJJ51uZ0U1m+jjrX33vPBfQIpLY8sEvZhtxOJz3sKFLTgLOsQ7utYArV1M12fIttqXyFXeIdy2u2pcpbue94ahAzeNSB7qgoQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD0oauXnpe3sWeMDBA3tVRKEVhjb9e8oal0/KqQX3EuTcANLpj7L/JUcADucIylu+M3wCSS7/4sKVyT37uZ+IofxfkWTbnAaTbmCMSb6yLfkscSef7GC9KB/tyq7bMF1urioz+F8IAxS//p9j6n7Q65JH2J0GyjIOCT2CJRWIy3amHNUtegWy3V2tsk3JZrzrM/GesDm+HcoTwYmbUBO3THxa7JRefmdoB3keuFS7hugKJ8jvBFrBetMrwTR7YU1MU5CMJRDdRe+FxEn+AMxS8Eh2PPxKM5vIZMsAlSVpjg7E38bqf5jDp+RfZnafjSUF69I56SxAoGmMzBPVtO5UPY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c05e1de4c12a4cb2a74821955a218e0b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '881a27a1-ec68-45a8-90de-3d76a0282e34',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:15 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo16YRXIdfmFRLw6VwMrGF7eDoYCjB4zJs73v7/FuXD3LxTftTx8+Z29er0jQK9nAMUamu3ZMWpd0H4QKuZ/Zn0SD8q2OWv3OOfBpJLXG/Xuwks9QZHcK+NOkVjgygG6RpL/oFSQLmI554Mk7zMXi0CgYyTuhTeUDcbecnsutwY1HSsnXGfgzHnFbhwlc5GW6KKc4I6Bn/r1pVJik88CSsG2fKk1QKCtefQtK6YKqAnqLYk0N5LugMVJJ51uZ0U1m+jjrX33vPBfQIpLY8sEvZhtxOJz3sKFLTgLOsQ7utYArV1M12fIttqXyFXeIdy2u2pcpbue94ahAzeNSB7qgoQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD0oauXnpe3sWeMDBA3tVRKEVhjb9e8oal0/KqQX3EuTcANLpj7L/JUcADucIylu+M3wCSS7/4sKVyT37uZ+IofxfkWTbnAaTbmCMSb6yLfkscSef7GC9KB/tyq7bMF1urioz+F8IAxS//p9j6n7Q65JH2J0GyjIOCT2CJRWIy3amHNUtegWy3V2tsk3JZrzrM/GesDm+HcoTwYmbUBO3THxa7JRefmdoB3keuFS7hugKJ8jvBFrBetMrwTR7YU1MU5CMJRDdRe+FxEn+AMxS8Eh2PPxKM5vIZMsAlSVpjg7E38bqf5jDp+RfZnafjSUF69I56SxAoGmMzBPVtO5UPY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c05e1de4c12a4cb2a74821955a218e0b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '41310dd8-cafb-4526-a472-aad0b068a4ed',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:15 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo16YRXIdfmFRLw6VwMrGF7eDoYCjB4zJs73v7/FuXD3LxTftTx8+Z29er0jQK9nAMUamu3ZMWpd0H4QKuZ/Zn0SD8q2OWv3OOfBpJLXG/Xuwks9QZHcK+NOkVjgygG6RpL/oFSQLmI554Mk7zMXi0CgYyTuhTeUDcbecnsutwY1HSsnXGfgzHnFbhwlc5GW6KKc4I6Bn/r1pVJik88CSsG2fKk1QKCtefQtK6YKqAnqLYk0N5LugMVJJ51uZ0U1m+jjrX33vPBfQIpLY8sEvZhtxOJz3sKFLTgLOsQ7utYArV1M12fIttqXyFXeIdy2u2pcpbue94ahAzeNSB7qgoQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD0oauXnpe3sWeMDBA3tVRKEVhjb9e8oal0/KqQX3EuTcANLpj7L/JUcADucIylu+M3wCSS7/4sKVyT37uZ+IofxfkWTbnAaTbmCMSb6yLfkscSef7GC9KB/tyq7bMF1urioz+F8IAxS//p9j6n7Q65JH2J0GyjIOCT2CJRWIy3amHNUtegWy3V2tsk3JZrzrM/GesDm+HcoTwYmbUBO3THxa7JRefmdoB3keuFS7hugKJ8jvBFrBetMrwTR7YU1MU5CMJRDdRe+FxEn+AMxS8Eh2PPxKM5vIZMsAlSVpjg7E38bqf5jDp+RfZnafjSUF69I56SxAoGmMzBPVtO5UPY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c05e1de4c12a4cb2a74821955a218e0b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7cc76245-5f0e-4bc5-9140-ecb1cc267644',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:17 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo16YRXIdfmFRLw6VwMrGF7eDoYCjB4zJs73v7/FuXD3LxTftTx8+Z29er0jQK9nAMUamu3ZMWpd0H4QKuZ/Zn0SD8q2OWv3OOfBpJLXG/Xuwks9QZHcK+NOkVjgygG6RpL/oFSQLmI554Mk7zMXi0CgYyTuhTeUDcbecnsutwY1HSsnXGfgzHnFbhwlc5GW6KKc4I6Bn/r1pVJik88CSsG2fKk1QKCtefQtK6YKqAnqLYk0N5LugMVJJ51uZ0U1m+jjrX33vPBfQIpLY8sEvZhtxOJz3sKFLTgLOsQ7utYArV1M12fIttqXyFXeIdy2u2pcpbue94ahAzeNSB7qgoQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD0oauXnpe3sWeMDBA3tVRKEVhjb9e8oal0/KqQX3EuTcANLpj7L/JUcADucIylu+M3wCSS7/4sKVyT37uZ+IofxfkWTbnAaTbmCMSb6yLfkscSef7GC9KB/tyq7bMF1urioz+F8IAxS//p9j6n7Q65JH2J0GyjIOCT2CJRWIy3amHNUtegWy3V2tsk3JZrzrM/GesDm+HcoTwYmbUBO3THxa7JRefmdoB3keuFS7hugKJ8jvBFrBetMrwTR7YU1MU5CMJRDdRe+FxEn+AMxS8Eh2PPxKM5vIZMsAlSVpjg7E38bqf5jDp+RfZnafjSUF69I56SxAoGmMzBPVtO5UPY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c05e1de4c12a4cb2a74821955a218e0b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e67af1bb-ff95-434a-97ee-eaf75948a7b2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:19 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo16YRXIdfmFRLw6VwMrGF7eDoYCjB4zJs73v7/FuXD3LxTftTx8+Z29er0jQK9nAMUamu3ZMWpd0H4QKuZ/Zn0SD8q2OWv3OOfBpJLXG/Xuwks9QZHcK+NOkVjgygG6RpL/oFSQLmI554Mk7zMXi0CgYyTuhTeUDcbecnsutwY1HSsnXGfgzHnFbhwlc5GW6KKc4I6Bn/r1pVJik88CSsG2fKk1QKCtefQtK6YKqAnqLYk0N5LugMVJJ51uZ0U1m+jjrX33vPBfQIpLY8sEvZhtxOJz3sKFLTgLOsQ7utYArV1M12fIttqXyFXeIdy2u2pcpbue94ahAzeNSB7qgoQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD0oauXnpe3sWeMDBA3tVRKEVhjb9e8oal0/KqQX3EuTcANLpj7L/JUcADucIylu+M3wCSS7/4sKVyT37uZ+IofxfkWTbnAaTbmCMSb6yLfkscSef7GC9KB/tyq7bMF1urioz+F8IAxS//p9j6n7Q65JH2J0GyjIOCT2CJRWIy3amHNUtegWy3V2tsk3JZrzrM/GesDm+HcoTwYmbUBO3THxa7JRefmdoB3keuFS7hugKJ8jvBFrBetMrwTR7YU1MU5CMJRDdRe+FxEn+AMxS8Eh2PPxKM5vIZMsAlSVpjg7E38bqf5jDp+RfZnafjSUF69I56SxAoGmMzBPVtO5UPY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c05e1de4c12a4cb2a74821955a218e0b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3183807c-7cd7-4fa2-b1b8-ffb5b2ca576b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:22 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo16YRXIdfmFRLw6VwMrGF7eDoYCjB4zJs73v7/FuXD3LxTftTx8+Z29er0jQK9nAMUamu3ZMWpd0H4QKuZ/Zn0SD8q2OWv3OOfBpJLXG/Xuwks9QZHcK+NOkVjgygG6RpL/oFSQLmI554Mk7zMXi0CgYyTuhTeUDcbecnsutwY1HSsnXGfgzHnFbhwlc5GW6KKc4I6Bn/r1pVJik88CSsG2fKk1QKCtefQtK6YKqAnqLYk0N5LugMVJJ51uZ0U1m+jjrX33vPBfQIpLY8sEvZhtxOJz3sKFLTgLOsQ7utYArV1M12fIttqXyFXeIdy2u2pcpbue94ahAzeNSB7qgoQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD0oauXnpe3sWeMDBA3tVRKEVhjb9e8oal0/KqQX3EuTcANLpj7L/JUcADucIylu+M3wCSS7/4sKVyT37uZ+IofxfkWTbnAaTbmCMSb6yLfkscSef7GC9KB/tyq7bMF1urioz+F8IAxS//p9j6n7Q65JH2J0GyjIOCT2CJRWIy3amHNUtegWy3V2tsk3JZrzrM/GesDm+HcoTwYmbUBO3THxa7JRefmdoB3keuFS7hugKJ8jvBFrBetMrwTR7YU1MU5CMJRDdRe+FxEn+AMxS8Eh2PPxKM5vIZMsAlSVpjg7E38bqf5jDp+RfZnafjSUF69I56SxAoGmMzBPVtO5UPY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c05e1de4c12a4cb2a74821955a218e0b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e7631c60-7c8b-4339-8a8f-cb2f3ad64c23',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:23 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo16YRXIdfmFRLw6VwMrGF7eDoYCjB4zJs73v7/FuXD3LxTftTx8+Z29er0jQK9nAMUamu3ZMWpd0H4QKuZ/Zn0SD8q2OWv3OOfBpJLXG/Xuwks9QZHcK+NOkVjgygG6RpL/oFSQLmI554Mk7zMXi0CgYyTuhTeUDcbecnsutwY1HSsnXGfgzHnFbhwlc5GW6KKc4I6Bn/r1pVJik88CSsG2fKk1QKCtefQtK6YKqAnqLYk0N5LugMVJJ51uZ0U1m+jjrX33vPBfQIpLY8sEvZhtxOJz3sKFLTgLOsQ7utYArV1M12fIttqXyFXeIdy2u2pcpbue94ahAzeNSB7qgoQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD0oauXnpe3sWeMDBA3tVRKEVhjb9e8oal0/KqQX3EuTcANLpj7L/JUcADucIylu+M3wCSS7/4sKVyT37uZ+IofxfkWTbnAaTbmCMSb6yLfkscSef7GC9KB/tyq7bMF1urioz+F8IAxS//p9j6n7Q65JH2J0GyjIOCT2CJRWIy3amHNUtegWy3V2tsk3JZrzrM/GesDm+HcoTwYmbUBO3THxa7JRefmdoB3keuFS7hugKJ8jvBFrBetMrwTR7YU1MU5CMJRDdRe+FxEn+AMxS8Eh2PPxKM5vIZMsAlSVpjg7E38bqf5jDp+RfZnafjSUF69I56SxAoGmMzBPVtO5UPY=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","request_id":"c05e1de4c12a4cb2a74821955a218e0b"}, [
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
  'x-ms-request-id',
  'a62f0055-3559-49cd-8951-0c14439dffd6',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:26 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","x5t":"-5aex8DkCP3QVQa9mqQofK6AViI","cer":"MIIDKDCCAhCgAwIBAgIQSAftWWm1TfKX7j+cdcDGWzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NjI0WhcNMjIwMjE2MTg1NjI0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjXphFch1+YVEvDpXAysYXt4OhgKMHjMmzve/v8W5cPcvFN+1PHz5nb16vSNAr2cAxRqa7dkxal3QfhAq5n9mfRIPyrY5a/c458Gkktcb9e7CSz1Bkdwr406RWODKAbpGkv+gVJAuYjnngyTvMxeLQKBjJO6FN5QNxt5yey63BjUdKydcZ+DMecVuHCVzkZboopzgjoGf+vWlUmKTzwJKwbZ8qTVAoK159C0rpgqoCeotiTQ3ku6AxUknnW5nRTWb6OOtffe88F9AiktjywS9mG3E4nPewoUtOAs6xDu61gCtXUzXZ8i22pfIVd4h3La7alylu573hqEDN41IHuqChAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTnJT2GPEL/yF4wLtUVDyj7TE+iSDAdBgNVHQ4EFgQU5yU9hjxC/8heMC7VFQ8o+0xPokgwDQYJKoZIhvcNAQELBQADggEBAFmekWyuCHD6SELAq71nfhKMsjHYDB3GfYWNafYBbVSKuV5PmdrT0xkT/N/ECD81HURNqREX4CiNAlbGKEDUpcvuB5XAmqrDYGbPx+5Bkt0yBDpa/r7+t5cd4PgBSfQiHQ7A57wrptHpbeHhLYwW2jTSr1zTW03pR9BOYtl8sW8h0QZmvaUbaCX6AYbyWofiwW3nhj6Uz0EVOn6955IpqUrqZbfOB+l3eSDqbJyDxTq7t4zuxwIcl/NFwQtd4mVG1Sbht6nusuTQVJgrYmDKYEMG5QFG1e/9jIGexMr2wL44nQnUgrhnOhhH3IH8jq8UsJcwujIkxVp8K0zuvVgEmMo=","attributes":{"enabled":true,"nbf":1613501184,"exp":1645037784,"created":1613501784,"updated":1613501784,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501775,"updated":1613501775}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'x-ms-request-id',
  '0818289c-00cc-49ae-bb0a-04e0771ddf82',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:25 GMT',
  'Content-Length',
  '2744'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1613501786,"scheduledPurgeDate":1614106586,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","x5t":"ps-hWYNfbsHknTFpwIpeRdvxOCI","cer":"MIIDKDCCAhCgAwIBAgIQAzjhDmrEStqnr25To4VX5TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NjE0WhcNMjIwMjE2MTg1NjE0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDOhMVQrFAdVjIOUPCqzZ6HSQU9ArIKRM4r4s91AYu8Ju8Zdiie7Jfpdyv1mnyQt8xAbYdla1S/kpf0PrEZaQWWt9SHTdIcFmgRU0H100RcRWLttQzZRyu/gpeH/txHTB44Wse12j26IXglPKlCWGExzM+s/H7EDcMQsJOCvVfaitH4LeBQHpo7mUlnJPKW28B+PjxC43PfVue8k8rhWBCoZcWOPsXeLykVdh63umCDAvcAsdyXw+Su6w74+HLsP4lRPKgUgGR0oPl2i4/gEAmxWiwAH151GhbGKlNtzvuQar7ypGcZgvySNXaGX1KWbUZ7gqS/1ppX13Yf6MSsO8tNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRzSrQuzHrLCdsPw1Dg31mkLd8GDTAdBgNVHQ4EFgQUc0q0Lsx6ywnbD8NQ4N9ZpC3fBg0wDQYJKoZIhvcNAQELBQADggEBAIbKOdYA99k+g092boV41kXOup9Z0NZRb2epeeTmUyo6upyyrMUwJocoMgQPtgY2iQV+hjz6pASbaJERNEzEzGOJ0cf5lrb4oE5svuMl9adKGYo94+b2pCvFzogaNNTJdnmtaOiRkt2iDJB9iWQiF15FXD6FoJOCCSpV0OWDdbYWCZUghrNfx3l6namewOZJR2hEftunVjJD3W1DsxZGdUlORIUaM5B8wMf9+sGpDfpEY/zYvng3k2dwxMBNeklJ/z9yd23gSXqnGclZHyk50690GXGI7wdavGizUL5BMTsnEJyRyIZZKVkaxtMbRY3a8gM3iRLW6GPtcnyvyuaNhlw=","attributes":{"enabled":true,"nbf":1613501174,"exp":1645037774,"created":1613501774,"updated":1613501774,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501766,"updated":1613501766}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  'x-ms-request-id',
  'e15a93a8-ba7d-494f-ae83-ef96e72c90a1',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:26 GMT',
  'Content-Length',
  '2973'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '12bbd138-af9e-42bc-a144-d1ad6644dcdf',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6675c73e-91e1-40f1-bde4-175675d38232',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4cde6d86-98a1-4991-82b0-df760fad7449',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7b4b6fee-519a-45fc-9b3b-8530f1f0f772',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e9c1a2a0-6904-4e40-9508-e8b7e239cd7c',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1613501786,"scheduledPurgeDate":1614106586,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/e9abf49bcf90482c836f486482067247","x5t":"ps-hWYNfbsHknTFpwIpeRdvxOCI","cer":"MIIDKDCCAhCgAwIBAgIQAzjhDmrEStqnr25To4VX5TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NjE0WhcNMjIwMjE2MTg1NjE0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDOhMVQrFAdVjIOUPCqzZ6HSQU9ArIKRM4r4s91AYu8Ju8Zdiie7Jfpdyv1mnyQt8xAbYdla1S/kpf0PrEZaQWWt9SHTdIcFmgRU0H100RcRWLttQzZRyu/gpeH/txHTB44Wse12j26IXglPKlCWGExzM+s/H7EDcMQsJOCvVfaitH4LeBQHpo7mUlnJPKW28B+PjxC43PfVue8k8rhWBCoZcWOPsXeLykVdh63umCDAvcAsdyXw+Su6w74+HLsP4lRPKgUgGR0oPl2i4/gEAmxWiwAH151GhbGKlNtzvuQar7ypGcZgvySNXaGX1KWbUZ7gqS/1ppX13Yf6MSsO8tNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRzSrQuzHrLCdsPw1Dg31mkLd8GDTAdBgNVHQ4EFgQUc0q0Lsx6ywnbD8NQ4N9ZpC3fBg0wDQYJKoZIhvcNAQELBQADggEBAIbKOdYA99k+g092boV41kXOup9Z0NZRb2epeeTmUyo6upyyrMUwJocoMgQPtgY2iQV+hjz6pASbaJERNEzEzGOJ0cf5lrb4oE5svuMl9adKGYo94+b2pCvFzogaNNTJdnmtaOiRkt2iDJB9iWQiF15FXD6FoJOCCSpV0OWDdbYWCZUghrNfx3l6namewOZJR2hEftunVjJD3W1DsxZGdUlORIUaM5B8wMf9+sGpDfpEY/zYvng3k2dwxMBNeklJ/z9yd23gSXqnGclZHyk50690GXGI7wdavGizUL5BMTsnEJyRyIZZKVkaxtMbRY3a8gM3iRLW6GPtcnyvyuaNhlw=","attributes":{"enabled":true,"nbf":1613501174,"exp":1645037774,"created":1613501774,"updated":1613501774,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501766,"updated":1613501766}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  'x-ms-request-id',
  '30633893-4645-4859-b3ea-41b36f9335e0',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:33 GMT',
  'Content-Length',
  '2973'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
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
  'x-ms-request-id',
  '6fc60989-008d-4295-a227-c6124f7a2059',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1613501794,"scheduledPurgeDate":1614106594,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","x5t":"-5aex8DkCP3QVQa9mqQofK6AViI","cer":"MIIDKDCCAhCgAwIBAgIQSAftWWm1TfKX7j+cdcDGWzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NjI0WhcNMjIwMjE2MTg1NjI0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjXphFch1+YVEvDpXAysYXt4OhgKMHjMmzve/v8W5cPcvFN+1PHz5nb16vSNAr2cAxRqa7dkxal3QfhAq5n9mfRIPyrY5a/c458Gkktcb9e7CSz1Bkdwr406RWODKAbpGkv+gVJAuYjnngyTvMxeLQKBjJO6FN5QNxt5yey63BjUdKydcZ+DMecVuHCVzkZboopzgjoGf+vWlUmKTzwJKwbZ8qTVAoK159C0rpgqoCeotiTQ3ku6AxUknnW5nRTWb6OOtffe88F9AiktjywS9mG3E4nPewoUtOAs6xDu61gCtXUzXZ8i22pfIVd4h3La7alylu573hqEDN41IHuqChAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTnJT2GPEL/yF4wLtUVDyj7TE+iSDAdBgNVHQ4EFgQU5yU9hjxC/8heMC7VFQ8o+0xPokgwDQYJKoZIhvcNAQELBQADggEBAFmekWyuCHD6SELAq71nfhKMsjHYDB3GfYWNafYBbVSKuV5PmdrT0xkT/N/ECD81HURNqREX4CiNAlbGKEDUpcvuB5XAmqrDYGbPx+5Bkt0yBDpa/r7+t5cd4PgBSfQiHQ7A57wrptHpbeHhLYwW2jTSr1zTW03pR9BOYtl8sW8h0QZmvaUbaCX6AYbyWofiwW3nhj6Uz0EVOn6955IpqUrqZbfOB+l3eSDqbJyDxTq7t4zuxwIcl/NFwQtd4mVG1Sbht6nusuTQVJgrYmDKYEMG5QFG1e/9jIGexMr2wL44nQnUgrhnOhhH3IH8jq8UsJcwujIkxVp8K0zuvVgEmMo=","attributes":{"enabled":true,"nbf":1613501184,"exp":1645037784,"created":1613501784,"updated":1613501784,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501775,"updated":1613501775}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'x-ms-request-id',
  '2f4146ef-cb07-4d54-a703-4eabfd8ec911',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:34 GMT',
  'Content-Length',
  '2973'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c6050feb-b3ed-49bc-b40d-257c2c33765c',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'baefb5fa-8d41-42ec-a5da-f968b8731db6',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b73c6a91-ad42-414d-a795-0c9cf55a6117',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ceeea8ba-3d49-4604-8e22-6eaf02c4de91',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '58d50575-1892-46f4-a091-e27171decb28',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e6d5b390-950c-4577-bb41-b73a271c8266',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1613501794,"scheduledPurgeDate":1614106594,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/c2787d7ccd9a45c08494f45d7fbba6b8","x5t":"-5aex8DkCP3QVQa9mqQofK6AViI","cer":"MIIDKDCCAhCgAwIBAgIQSAftWWm1TfKX7j+cdcDGWzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NjI0WhcNMjIwMjE2MTg1NjI0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjXphFch1+YVEvDpXAysYXt4OhgKMHjMmzve/v8W5cPcvFN+1PHz5nb16vSNAr2cAxRqa7dkxal3QfhAq5n9mfRIPyrY5a/c458Gkktcb9e7CSz1Bkdwr406RWODKAbpGkv+gVJAuYjnngyTvMxeLQKBjJO6FN5QNxt5yey63BjUdKydcZ+DMecVuHCVzkZboopzgjoGf+vWlUmKTzwJKwbZ8qTVAoK159C0rpgqoCeotiTQ3ku6AxUknnW5nRTWb6OOtffe88F9AiktjywS9mG3E4nPewoUtOAs6xDu61gCtXUzXZ8i22pfIVd4h3La7alylu573hqEDN41IHuqChAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTnJT2GPEL/yF4wLtUVDyj7TE+iSDAdBgNVHQ4EFgQU5yU9hjxC/8heMC7VFQ8o+0xPokgwDQYJKoZIhvcNAQELBQADggEBAFmekWyuCHD6SELAq71nfhKMsjHYDB3GfYWNafYBbVSKuV5PmdrT0xkT/N/ECD81HURNqREX4CiNAlbGKEDUpcvuB5XAmqrDYGbPx+5Bkt0yBDpa/r7+t5cd4PgBSfQiHQ7A57wrptHpbeHhLYwW2jTSr1zTW03pR9BOYtl8sW8h0QZmvaUbaCX6AYbyWofiwW3nhj6Uz0EVOn6955IpqUrqZbfOB+l3eSDqbJyDxTq7t4zuxwIcl/NFwQtd4mVG1Sbht6nusuTQVJgrYmDKYEMG5QFG1e/9jIGexMr2wL44nQnUgrhnOhhH3IH8jq8UsJcwujIkxVp8K0zuvVgEmMo=","attributes":{"enabled":true,"nbf":1613501184,"exp":1645037784,"created":1613501784,"updated":1613501784,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501775,"updated":1613501775}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'x-ms-request-id',
  'ac926f82-b028-4f70-a811-08691cfa7c7c',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:44 GMT',
  'Content-Length',
  '2973'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
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
  'x-ms-request-id',
  '6935d58c-4639-4acf-8905-67a74b925ad9',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:56:44 GMT'
]);
