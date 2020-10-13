let nock = require('nock');

module.exports.hash = "708c30541215078483a545a7ed48f8e4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160247302507606970","directory":"directory160247302565004091","file":"file160247302685708932"},"newDate":{"now":"2020-10-12T03:23:43.407Z","tmr":"2020-10-12T03:23:43.407Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjQ3MjcyMywibmJmIjoxNjAyNDcyNzIzLCJleHAiOjE2MDI1NTk0MjMsImFpbyI6IkUyUmdZTkRvZGVYK24yUXlUMExWVVduL2c1OFpBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJib3RfZTQweDgwMndRcjVPUzhvSUFBIiwidmVyIjoiMS4wIn0.RT6XgNmlirKmhblrikE1hvjSizUDh2ccTYy8-TcoHolmbmZljOaXd6SoTU-5Rg-pJjJ5L_cphNBOJbAYdKr2uc7ljiYJIBGb5DG4eeAn_bmDc-pkLE0Pg8t85YNN7qsLLsBY3g72bomugAbpJrNzcxmbdhecDbWlnfBd-uNLrUx5UU2GG-fIvcJwNcdXR4FF9NMQL1_foedvRa7duby8bT_2tlDbVhWxj90gOyICqJuTrt8xRSUsuwHB7iv65Tk-QpY-kzujWrjN2nVvArtBwrOKYTRXlMMYL1rKAQ7AR350Te7A5m12a0llU_jt9obto2p5a7v65-qgz2b39Sefig"}, [
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
  '7b7f8b6e-318d-4df3-b042-be4e4bca0800',
  'x-ms-ests-server',
  '2.1.11140.10 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhvzNso4ngZCiGwSF8LBR0B00ISJAQAAAD_DFdcOAAAA; expires=Wed, 11-Nov-2020 03:23:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 12 Oct 2020 03:23:43 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-12T02:23:43Z</Start><Expiry>2020-10-17T03:23:43Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-12T02:23:43Z</SignedStart><SignedExpiry>2020-10-17T03:23:43Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>ZuqeCQNc3LpN4vWJ1cnifrexezH8dlKLHU5Ijw6sthE=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8bab2-401e-0038-3347-a0e960000000',
  'x-ms-client-request-id',
  'dd9c1cfb-5830-4fe2-904c-9e0d255c20ad',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247302507606970')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:45 GMT',
  'ETag',
  '"0x8D86E5E3A1870AF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8bafd-401e-0038-6a47-a0e960000000',
  'x-ms-client-request-id',
  '62a9dfc2-ef9a-4448-9dc7-8629ac1b0f6e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:45 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247302507606970/directory160247302565004091')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:46 GMT',
  'ETag',
  '"0x8D86E5E3AE70DA5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2fddc4bc-a01f-0052-5a47-a03148000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8af339dc-14d3-48cc-bfa0-3298bbbf56fc',
  'Date',
  'Mon, 12 Oct 2020 03:23:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247302507606970/directory160247302565004091/file160247302685708932')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:47 GMT',
  'ETag',
  '"0x8D86E5E3B1F72ED"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2fddc4bd-a01f-0052-5b47-a03148000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '094ff7ff-143d-4b8f-809b-f855520d822c',
  'Date',
  'Mon, 12 Oct 2020 03:23:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160247302507606970/directory160247302565004091')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:46 GMT',
  'ETag',
  '"0x8D86E5E3AE70DA5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '1ce13278-a083-4d15-8796-de39717793e1',
  'x-ms-group',
  '1ce13278-a083-4d15-8796-de39717793e1',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '2fddc4be-a01f-0052-5c47-a03148000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '6a74a75d-f110-47b2-865b-45f1f65b5ae3',
  'Date',
  'Mon, 12 Oct 2020 03:23:46 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160247302507606970/directory160247302565004091')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:46 GMT',
  'ETag',
  '"0x8D86E5E3AE70DA5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '73e65ae4-e01f-0021-1c47-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '6c997777-5fea-418c-85d6-2b674886ed0e',
  'Date',
  'Mon, 12 Oct 2020 03:23:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160247302507606970')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8bce1-401e-0038-6647-a0e960000000',
  'x-ms-client-request-id',
  'be941dbf-93b1-4624-acb4-0b99a15078f6',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:48 GMT'
]);
