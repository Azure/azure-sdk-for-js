let nock = require('nock');

module.exports.hash = "9bcada1e1c90bd5e6d1bdb8e5fa637b4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160247303378304306","directory":"directory160247303414603572","file":"file160247303447805870"},"newDate":{"now":"2020-10-12T03:23:53.125Z","tmr":"2020-10-12T03:23:53.125Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjQ3MjczMywibmJmIjoxNjAyNDcyNzMzLCJleHAiOjE2MDI1NTk0MzMsImFpbyI6IkUyUmdZTmk5OE5xV1pEYXhXajk1ZTY3TFMyYmNCUUE9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJyU1k3VXBBSERVV2o3bEVIVnpvSkFBIiwidmVyIjoiMS4wIn0.HGFjcj33xfmtJMEtJQZSWwfFIGtC2aqQOj5j-m-5X-4WOXuRuWDbK12cLx3GbKdZpNsF4iUpkkHSHzpMGS0j4jwb0UWSjhb-ak5-GWRcBZOgmySN-hdmuess1ZPVKS_ypo6TCgUwXhxVjHXbDUm3MaizGNYkRBcLgMxxDInEqHbBxADOyPO3qj8jzIJf7okmxvW1nc8awKuHYj99X2dqx_6NZkUN1YpU0m4Lv_TMeNqZYposssC-uSL7VFl5Zj0KAyphPaX_kh9-UIAmEfYUn6m7mmeGSworKbnp2QNpDXA0NMLDo7bWU84NNW9PhsuDBoPhxbbg6MvOeTEu24gYWQ"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1318',
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
  '523b26ad-0790-450d-a3ee-5107573a0900',
  'x-ms-ests-server',
  '2.1.11140.10 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AgqPwKQnGtZFuxTMFm025R500ISJAQAAAEjDFdcOAAAA; expires=Wed, 11-Nov-2020 03:23:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 12 Oct 2020 03:23:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-12T02:23:53Z</Start><Expiry>2020-10-17T03:23:53Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-12T02:23:53Z</SignedStart><SignedExpiry>2020-10-17T03:23:53Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>jInP+/FisOZA2e7EoAwLHGNy+s5iA6x2x4647UpLQew=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8bfa1-401e-0038-2c47-a0e960000000',
  'x-ms-client-request-id',
  '3c60bd16-306e-43a0-bd72-2593c5b1e0b8',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303378304306')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:53 GMT',
  'ETag',
  '"0x8D86E5E3F3D25C1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8bfc1-401e-0038-4547-a0e960000000',
  'x-ms-client-request-id',
  '241d2903-3065-4ef4-b959-a988adaa3471',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303378304306/directory160247303414603572')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:54 GMT',
  'ETag',
  '"0x8D86E5E3F726659"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73e65af6-e01f-0021-2547-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '3ed56ba8-ff38-47b3-8eb2-d7ac724dab9a',
  'Date',
  'Mon, 12 Oct 2020 03:23:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160247303378304306/directory160247303414603572/file160247303447805870')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 12 Oct 2020 03:23:54 GMT',
  'ETag',
  '"0x8D86E5E3FA61625"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73e65af7-e01f-0021-2647-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '63642f26-8148-4f58-8096-d1df0e616de0',
  'Date',
  'Mon, 12 Oct 2020 03:23:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem160247303378304306')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"Mon, 12 Oct 2020 03:23:54 GMT","etag":"0x8D86E5E3F726659","group":"1ce13278-a083-4d15-8796-de39717793e1","isDirectory":"true","lastModified":"Mon, 12 Oct 2020 03:23:54 GMT","name":"directory160247303414603572","owner":"1ce13278-a083-4d15-8796-de39717793e1","permissions":"rwxr-x---"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73e65af8-e01f-0021-2747-a069db000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '97027f4f-4117-4c56-8325-8cbd3a63bfdd',
  'Date',
  'Mon, 12 Oct 2020 03:23:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160247303378304306')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43e8c082-401e-0038-5447-a0e960000000',
  'x-ms-client-request-id',
  'f50aa96c-675c-4591-93b6-7f1173773750',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 03:23:54 GMT'
]);
