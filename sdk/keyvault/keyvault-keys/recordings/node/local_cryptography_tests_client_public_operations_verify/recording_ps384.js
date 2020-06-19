let nock = require('nock');

module.exports.hash = "22964b2a9590bf6d05c2d411c750d477";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS384-/create')
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
  'westus',
  'x-ms-request-id',
  'a99be82c-be1c-45eb-9f93-46b16c133411',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:56 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '57127453-c9c7-4146-b336-9a1ee9065800',
  'x-ms-ests-server',
  '2.1.10732.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AltU2pUvfjJHvussLdPRd7w_aSJHAQAAABNHf9YOAAAA; expires=Sun, 19-Jul-2020 23:53:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 19 Jun 2020 23:53:56 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS384-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS384-/154b52ca08734e54889824433e91e1a2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wdOf80O6JLihF9GarevnPfCCm7xMumhi2S2KLtbAkXlv3LNMzfYe_kahik0-2HFXiLYdf_FFu_y4LHJliGQ8KJkjaj0TyIVPEzmcjcjJSlBlsb3tBK88up5sLfWAKlyGwvJx85u6nSrxe2H7Cx8COZERIRAXzkGTZIERqTsiDgz6pL68HFE_QAOaAufqv-xTYYvcha-toae5j7dzIfyeVdLAsI2sA7dDtv9dz-YXDsJrMWNZumvHe1eLisjEXKfY1cBdAWVM7wumGIJRmR_L0jSSeXE2kp4vb_IBVYaOnHEoZyrox47MbgpK-5_Gyaotz5eiz0j60701XeyUYn7Bnw","e":"AQAB"},"attributes":{"enabled":true,"created":1592610836,"updated":1592610836,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bb7c08fe-c90f-4371-a359-b7a523cb90c5',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:56 GMT',
  'Content-Length',
  '717'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS384-/154b52ca08734e54889824433e91e1a2/sign')
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
  'westus',
  'x-ms-request-id',
  'e4922760-c37a-4ab6-9181-32f1b668a539',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:56 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  'f8ad51ad-1db5-4e5f-9322-b3eddc785600',
  'x-ms-ests-server',
  '2.1.10732.8 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AltU2pUvfjJHvussLdPRd7w_aSJHAgAAABNHf9YOAAAA; expires=Sun, 19-Jul-2020 23:53:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 19 Jun 2020 23:53:56 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS384-/154b52ca08734e54889824433e91e1a2/sign', {"alg":"PS384","value":"0l4LGQIGx3h4tKvtYkm0UpyuXVNh_uavUS2WlYfyU1tD4dronxAsDyxnAN80h55g"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS384-/154b52ca08734e54889824433e91e1a2","value":"pZSJksam12z6XJh9vTTbRcfin9iEwIiNYd_s25dAVo1hFH6GKthNsivtCQ7jnkIFY0AQ0n5U-Lw4fbaspXmQ0gU1Cr8RsQEO8IH-umTL4-5RXgYeM1Xg1IFjzdGLWwTIRglC9IodJF1ju5L6vVYeaSQKrQw0AFodoOXJOYm6R27gEVBYryZsZuPgmBY6n74ghY0Seq81u--cJOwqW5Ne6gad_w36pfA9J5yCiffkOKf510Hx1ikBr1p68VLQ0rUdULuMOVYw3NHb8cQZZVkvAqDxfI-jtjkdf_M6Y82XeYtejxleGt0aabumU5nKUIet48RslQEUSgDH5nBQqnx7qA"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1ae3491e-e19c-4735-be0b-4e6804d6bc75',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:56 GMT',
  'Content-Length',
  '487'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-PS384-/154b52ca08734e54889824433e91e1a2')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS384-/154b52ca08734e54889824433e91e1a2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wdOf80O6JLihF9GarevnPfCCm7xMumhi2S2KLtbAkXlv3LNMzfYe_kahik0-2HFXiLYdf_FFu_y4LHJliGQ8KJkjaj0TyIVPEzmcjcjJSlBlsb3tBK88up5sLfWAKlyGwvJx85u6nSrxe2H7Cx8COZERIRAXzkGTZIERqTsiDgz6pL68HFE_QAOaAufqv-xTYYvcha-toae5j7dzIfyeVdLAsI2sA7dDtv9dz-YXDsJrMWNZumvHe1eLisjEXKfY1cBdAWVM7wumGIJRmR_L0jSSeXE2kp4vb_IBVYaOnHEoZyrox47MbgpK-5_Gyaotz5eiz0j60701XeyUYn7Bnw","e":"AQAB"},"attributes":{"enabled":true,"created":1592610836,"updated":1592610836,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '10dfb130-dd6a-43e0-9f2f-b9f965db6713',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:56 GMT',
  'Content-Length',
  '717'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-PS384-","deletedDate":1592610837,"scheduledPurgeDate":1600386837,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS384-/154b52ca08734e54889824433e91e1a2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wdOf80O6JLihF9GarevnPfCCm7xMumhi2S2KLtbAkXlv3LNMzfYe_kahik0-2HFXiLYdf_FFu_y4LHJliGQ8KJkjaj0TyIVPEzmcjcjJSlBlsb3tBK88up5sLfWAKlyGwvJx85u6nSrxe2H7Cx8COZERIRAXzkGTZIERqTsiDgz6pL68HFE_QAOaAufqv-xTYYvcha-toae5j7dzIfyeVdLAsI2sA7dDtv9dz-YXDsJrMWNZumvHe1eLisjEXKfY1cBdAWVM7wumGIJRmR_L0jSSeXE2kp4vb_IBVYaOnHEoZyrox47MbgpK-5_Gyaotz5eiz0j60701XeyUYn7Bnw","e":"AQAB"},"attributes":{"enabled":true,"created":1592610836,"updated":1592610836,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a9585d79-0bc5-4ede-a868-d5c37ac4c89a',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:57 GMT',
  'Content-Length',
  '888'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8b88834c-d5b7-4ee6-89b8-4899b923a281',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '12f3ab24-676e-4f81-a4b1-00594fd59703',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd5536500-dd8b-435c-aaa6-d632fa68967c',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ac8aaa88-9c07-4611-9a1c-72369843e358',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e3da2146-4c4e-445e-a282-633dd5c3339d',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '03d8b2e1-8faf-4740-8021-89f2fdd2ff36',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '80c65577-0cae-4036-bd43-747c9921f3f0',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6065915d-cf83-4639-be96-0b3ee524d28e',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bfa4cbca-abe7-41ed-b5c5-e89eb83e55d1',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5c7950e6-3bd2-416e-8726-1c1927792ae4',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '111',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '373679c3-523b-4f14-aa4b-b2611d8f16a6',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-PS384-","deletedDate":1592610837,"scheduledPurgeDate":1600386837,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS384-/154b52ca08734e54889824433e91e1a2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wdOf80O6JLihF9GarevnPfCCm7xMumhi2S2KLtbAkXlv3LNMzfYe_kahik0-2HFXiLYdf_FFu_y4LHJliGQ8KJkjaj0TyIVPEzmcjcjJSlBlsb3tBK88up5sLfWAKlyGwvJx85u6nSrxe2H7Cx8COZERIRAXzkGTZIERqTsiDgz6pL68HFE_QAOaAufqv-xTYYvcha-toae5j7dzIfyeVdLAsI2sA7dDtv9dz-YXDsJrMWNZumvHe1eLisjEXKfY1cBdAWVM7wumGIJRmR_L0jSSeXE2kp4vb_IBVYaOnHEoZyrox47MbgpK-5_Gyaotz5eiz0j60701XeyUYn7Bnw","e":"AQAB"},"attributes":{"enabled":true,"created":1592610836,"updated":1592610836,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '71a9ac9d-d150-4bf3-8a69-8332c14f2fbe',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:17 GMT',
  'Content-Length',
  '888'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-PS384-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5c516cc1-0fad-4d8e-9481-c0723bd767f6',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:17 GMT'
]);
