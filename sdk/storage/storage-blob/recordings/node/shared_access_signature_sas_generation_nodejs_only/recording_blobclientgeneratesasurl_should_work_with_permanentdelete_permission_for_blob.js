let nock = require('nock');

module.exports.hash = "e2dad9d3939d24e2791f988d8811bfb3";

module.exports.testInfo = {"uniqueName":{"container":"container163256817398401092","blob":"blob163256817527208488"},"newDate":{"now":"2021-09-25T11:09:33.983Z","tmr":"2021-09-25T11:09:33.984Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256817398401092')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:09:35 GMT',
  'ETag',
  '"0x8D98014F54EDB50"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38948-801e-0093-10fd-b101c8000000',
  'x-ms-client-request-id',
  '00e45aa6-e184-4fed-b902-d14515c0e60f',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sat, 25 Sep 2021 11:09:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163256817398401092/blob163256817527208488')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 25 Sep 2021 11:09:35 GMT',
  'ETag',
  '"0x8D98014F57A39DD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea389b4-801e-0093-6afd-b101c8000000',
  'x-ms-client-request-id',
  'ca511ff6-181b-44bb-932f-fc300f3219d0',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-25T11:09:35.5765213Z',
  'Date',
  'Sat, 25 Sep 2021 11:09:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163256817398401092/blob163256817527208488')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38a25-801e-0093-4afd-b101c8000000',
  'x-ms-client-request-id',
  '40822693-8285-43fe-af8f-c15d9b2184d4',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sat, 25 Sep 2021 11:09:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163256817398401092')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ea38bb1-801e-0093-7ffd-b101c8000000',
  'x-ms-client-request-id',
  'de1273e9-e132-4a62-8ed3-cbcc1a5cd329',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Sat, 25 Sep 2021 11:09:36 GMT'
]);
