let nock = require('nock');

module.exports.hash = "4dd736c0146c2e8d3e14ef02e0b8fe19";

module.exports.testInfo = {"uniqueName":{"container":"container160258096362605197","blob":"blob160258096391204771"},"newDate":{"now":"2020-10-13T09:22:43.032Z","tmr":"2020-10-13T09:22:43.032Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MDY2MywibmJmIjoxNjAyNTgwNjYzLCJleHAiOjE2MDI2NjczNjMsImFpbyI6IkUyUmdZRGpYdmxabUg4ZEZ3Y1BSaTArV3pVMFdCd0E9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiI4OXNsLW9tX2kwaWw5VmJkVkRjREFBIiwidmVyIjoiMS4wIn0.kOUZWhYXQ7uuU1vzaYamF9YoSElqPbd1VPoE37hzz9_P5bVAi3nQIUGYJeMTvNWcKp_vQheOaPthEpmzuH_Hw4FW8daYI-AfW9Yhp4_rVz5QWsQMUZo4fv_YQ9EW1yXeZRl7Fi3KTNu_sYS8pqJegGAzeITUyg1NyDYRIc4LnHXOmYRnodH6ApE3Fl-pDyhSybMNkwRJDcyP5QepyfMSHWWhgC384ckDDJN0fEKa_JMEepsV1ocDQ3LMPwJ0WShqRgmnxIq6PFdZ_N-MYveWIlt0uxdW1Up2X3-KdkwGL1V8zl49Y32ynxg4kQOD-SdoSGbS6xjZrjRoQJuVMLLNOA"}, [
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
  'fa25dbf3-bf89-488b-a5f5-56dd54370300',
  'x-ms-ests-server',
  '2.1.11154.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmfZHrktbJlJkLSlugIqand00ISJAQAAAONoF9cOAAAA; expires=Thu, 12-Nov-2020 09:22:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 09:22:42 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T08:22:43Z</Start><Expiry>2020-10-14T09:22:43Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-13T08:22:43Z</SignedStart><SignedExpiry>2020-10-14T09:22:43Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>umwRkcStQf36joDjRLZXO5cPuDdBBrIrGCmuKRCj9+0=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b17-401e-0058-4342-a112ee000000',
  'x-ms-client-request-id',
  '2bb45cff-2a98-4c00-ab22-35e3ac33c978',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096362605197')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:43 GMT',
  'ETag',
  '"0x8D86F598A686C60"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b1b-401e-0058-4642-a112ee000000',
  'x-ms-client-request-id',
  'e4fa9259-3eab-4b8d-94bb-130c51f144a5',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096362605197/blob160258096391204771')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:44 GMT',
  'ETag',
  '"0x8D86F598A945AA3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b23-401e-0058-4b42-a112ee000000',
  'x-ms-client-request-id',
  'c516fd57-bcc3-4975-b606-75097701fb64',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-13T09:22:44.0686013Z',
  'Date',
  'Tue, 13 Oct 2020 09:22:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160258096362605197/blob160258096391204771')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86F598A945AA3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b28-401e-0058-4e42-a112ee000000',
  'x-ms-client-request-id',
  '9f821443-1274-4726-bcc6-33448e286c49',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-13T09:22:44.0686013Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Tue, 13 Oct 2020 09:22:44 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 09:22:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258096362605197')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b2a-401e-0058-5042-a112ee000000',
  'x-ms-client-request-id',
  'dbce053e-20cd-4372-87e6-893ca6c2656c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:44 GMT'
]);
