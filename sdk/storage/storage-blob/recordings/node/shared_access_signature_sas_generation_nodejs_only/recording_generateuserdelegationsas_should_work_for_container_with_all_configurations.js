let nock = require('nock');

module.exports.hash = "209dd93b01f0a4f09ea58ad8f79a8df9";

module.exports.testInfo = {"uniqueName":{"container":"container160258096026907061"},"newDate":{"now":"2020-10-13T09:22:38.240Z","tmr":"2020-10-13T09:22:38.241Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MDY1OCwibmJmIjoxNjAyNTgwNjU4LCJleHAiOjE2MDI2NjczNTgsImFpbyI6IkUyUmdZTkR6dHIvNmd5VnIxYVVqUDgyZWJUSDBBd0E9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJrOUcwSUtBVVQwYW9BVWxzeVZVREFBIiwidmVyIjoiMS4wIn0.YPfCvGQunwpbHNkOlRCOipmlD0Md1-rgOVzuo4JAOEd9Dn9b1v3bacJEveaQbHITj94w1JrrRvLioNwNAuJpvJlgf0m_gF-jbG2uOt3zQROYtm2Jw5dGHTC4Xe068RfuwgO7ISJ9rU0YlVqH8bbzBtDHh7mLUsWaESFheDfbU5KQdTFwcyROgZaiX22iisMh6zwuaNBzcfd9ZfO91ZlfN0HP1TStDBO9BU9HIYjv3XLD5FMootDhF1-6Iu3kSBR_uRSJoFAsYidctHOUf-U6sVEVnwOEpgRvLGf1Bn6f1B0GiCO985TozdjYPjIK_BmGNzdAejO_qvsHA1_xP0kbhw"}, [
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
  '20b4d193-14a0-464f-a801-496cc9550300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApkHxKp7wu9Ooc5FX62maoF00ISJAQAAAN5oF9cOAAAA; expires=Thu, 12-Nov-2020 09:22:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 09:22:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T08:22:38Z</Start><Expiry>2020-10-14T09:22:38Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-13T08:22:38Z</SignedStart><SignedExpiry>2020-10-14T09:22:38Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>KzXXFNV+drIuvpWlreZ6Y25HQVQWG5fk0TRVrGmlzQA=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95ade-401e-0058-1a42-a112ee000000',
  'x-ms-client-request-id',
  '519464e7-c21e-4f1a-b0bc-e52bd7edaec1',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096026907061')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:40 GMT',
  'ETag',
  '"0x8D86F5988681FA3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95ae6-401e-0058-1f42-a112ee000000',
  'x-ms-client-request-id',
  'e0d335da-08d6-4c5c-b7e7-ffec561ae4c7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160258096026907061')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160258096026907061\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95ae9-401e-0058-2142-a112ee000000',
  'x-ms-client-request-id',
  '45f2a232-54e7-4d82-9633-ba2df28b90ee',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 09:22:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258096026907061')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95aee-401e-0058-2542-a112ee000000',
  'x-ms-client-request-id',
  '11e8dcd6-b377-4bf6-9fc2-69ab21dcfded',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:40 GMT'
]);
