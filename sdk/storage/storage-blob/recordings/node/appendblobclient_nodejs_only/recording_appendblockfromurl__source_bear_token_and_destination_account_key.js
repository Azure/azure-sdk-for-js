let nock = require('nock');

module.exports.hash = "64a8d777408d63ac22c980408ab35ebc";

module.exports.testInfo = {"uniqueName":{"container":"container162546561973503756","blob":"blob162546562088600936","blockblob":"blockblob162546562205700341"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546561973503756')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:41 GMT',
  'ETag',
  '"0x8D93F7C09154882"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc646746-601e-002d-5564-71c899000000',
  'x-ms-client-request-id',
  '62e57b2b-ad8b-4004-9e7c-bb8441827759',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:13:40 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546561973503756/blob162546562088600936')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:42 GMT',
  'ETag',
  '"0x8D93F7C09C8616D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '90028e87-301e-0029-3e64-71b647000000',
  'x-ms-client-request-id',
  '4baef9fc-1685-41f5-9170-e9cbce682fcc',
  'x-ms-version',
  '2020-10-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:13:41 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546561973503756/blockblob162546562205700341', "Hello World!")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:43 GMT',
  'ETag',
  '"0x8D93F7C0A7A8122"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '542d149a-c01e-0030-0b64-71b723000000',
  'x-ms-client-request-id',
  '077b9424-d753-4954-8adf-905facde9953',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:13:42 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546561973503756/blob162546562088600936')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:44 GMT',
  'ETag',
  '"0x8D93F7C0B2834A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '542d149f-c01e-0030-0f64-71b723000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'acff1395-fa4c-402a-8907-de14695b62f4',
  'Date',
  'Mon, 05 Jul 2021 06:13:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546561973503756/blob162546562088600936')
  .reply(200, "Hello World!", [
  'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:13:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D93F7C0B2834A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1cb8f64-401e-0021-3964-71bb8d000000',
  'x-ms-client-request-id',
  'e686adf7-0971-4a8b-87b6-8c3ec05785f4',
  'x-ms-version',
  '2020-10-02',
  'x-ms-creation-time',
  'Mon, 05 Jul 2021 06:13:42 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:13:45 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546561973503756')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ade62b0f-401e-001f-4d64-713b27000000',
  'x-ms-client-request-id',
  '0251b975-2cba-490a-a06c-4ec4cbe88cdb',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:13:45 GMT',
  'Connection',
  'close'
]);
