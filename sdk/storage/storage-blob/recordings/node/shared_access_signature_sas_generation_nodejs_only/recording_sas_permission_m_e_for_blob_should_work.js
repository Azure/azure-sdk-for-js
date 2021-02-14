let nock = require('nock');

module.exports.hash = "58d57de6cc67c92cf42feb8a516bbf13";

module.exports.testInfo = {"uniqueName":{"container":"container160396129657301673","blob":"blob160396129798701207"},"newDate":{"now":"2020-10-29T08:48:16.571Z","tmr":"2020-10-29T08:48:16.573Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396129657301673')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:17 GMT',
  'ETag',
  '"0x8D87BE7619D6520"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a084de7-901e-0043-6ad0-adb3a1000000',
  'x-ms-client-request-id',
  '9118d740-5c6b-4e2a-aef6-cea7b9b4c087',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396129657301673/blob160396129798701207')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:18 GMT',
  'ETag',
  '"0x8D87BE761CF62C3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a084ec7-901e-0043-35d0-adb3a1000000',
  'x-ms-client-request-id',
  'bd518fc5-333a-4266-9b82-679a47e76789',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-29T08:48:18.1568195Z',
  'Date',
  'Thu, 29 Oct 2020 08:48:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160396129657301673/blob160396129798701207')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D87BE761CF62C3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a084f8c-901e-0043-6ed0-adb3a1000000',
  'x-ms-client-request-id',
  '7ce06a09-4360-4ff5-9dea-d38a9ada66a6',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-29T08:48:18.1568195Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 29 Oct 2020 08:48:18 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 29 Oct 2020 08:48:17 GMT'
]);
