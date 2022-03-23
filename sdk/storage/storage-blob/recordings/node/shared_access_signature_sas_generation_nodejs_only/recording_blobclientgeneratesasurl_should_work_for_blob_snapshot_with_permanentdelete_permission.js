let nock = require('nock');

module.exports.hash = "b9129ffa20caebadc0100274f974de77";

module.exports.testInfo = {"uniqueName":{"container":"container163256817675202547","blob":"blob163256817701801114"},"newDate":{"now":"2021-09-25T11:09:36.751Z","tmr":"2021-09-25T11:09:36.752Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256817675202547')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:09:37 GMT',
  'ETag',
  '"0x8D98014F65ACCC9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38c17-801e-0093-4dfd-b101c8000000',
  'x-ms-client-request-id',
  '6f323b72-a465-48d4-a57d-adb6d009e1c6',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sat, 25 Sep 2021 11:09:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256817675202547/blob163256817701801114')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:09:37 GMT',
  'ETag',
  '"0x8D98014F684090D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38c97-801e-0093-3cfd-b101c8000000',
  'x-ms-client-request-id',
  '2869b37e-d47a-4088-9290-9795a368dd43',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-25T11:09:37.3185293Z',
  'Date',
  'Sat, 25 Sep 2021 11:09:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256817675202547/blob163256817701801114')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:09:37 GMT',
  'ETag',
  '"0x8D98014F684090D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38cf3-801e-0093-08fd-b101c8000000',
  'x-ms-client-request-id',
  '62c88c42-19ee-4362-a17c-e92755c8ff27',
  'x-ms-version',
  '2020-12-06',
  'x-ms-version-id',
  '2021-09-25T11:09:37.6053691Z',
  'x-ms-snapshot',
  '2021-09-25T11:09:37.6043691Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sat, 25 Sep 2021 11:09:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256817675202547/blob163256817701801114')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:09:37 GMT',
  'ETag',
  '"0x8D98014F6D8104D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38d4a-801e-0093-4cfd-b101c8000000',
  'x-ms-client-request-id',
  'd93bd2cd-e486-4dd2-b09b-4d1c2263c9ed',
  'x-ms-version',
  '2020-12-06',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Sat, 25 Sep 2021 11:09:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163256817675202547/blob163256817701801114')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38e02-801e-0093-69fd-b101c8000000',
  'x-ms-client-request-id',
  'ec714c59-fe33-4ebd-9df6-5224754111ed',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Sat, 25 Sep 2021 11:09:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163256817675202547')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38e7d-801e-0093-4dfd-b101c8000000',
  'x-ms-client-request-id',
  '67080dcc-a8ff-47ce-b96a-7235d234ce07',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sat, 25 Sep 2021 11:09:37 GMT'
]);
