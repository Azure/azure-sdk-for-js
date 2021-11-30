let nock = require('nock');

module.exports.hash = "9c43f4290e0fc69dbf44b39e8b255751";

module.exports.testInfo = {"uniqueName":{"container":"container162546567780309550","blockblob":"blockblob162546567897506903","srcblob/%2+%2F":"srcblob/%2+%2F162546567897601333","newblockblob":"newblockblob162546568131802000"},"newDate":{"expiry":"2021-07-05T06:14:40.160Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546567780309550')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:39 GMT',
  'ETag',
  '"0x8D93F7C2BB5153C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e29b9dc0-201e-002a-7f65-716ee4000000',
  'x-ms-client-request-id',
  '865b75c3-bfbb-4d91-bd7e-ef139db348ce',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:38 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546567780309550/srcblob%2F%252%2B%252F162546567897601333', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:40 GMT',
  'ETag',
  '"0x8D93F7C2C69B3F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd544264e-301e-0008-6065-7176b8000000',
  'x-ms-client-request-id',
  'e72ee41a-148a-4ed4-a684-1debc538a0cb',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:39 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546567780309550/blockblob162546567897506903', "HelloWorld")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:41 GMT',
  'ETag',
  '"0x8D93F7C2D1B1076"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e6487b1-001e-0007-4565-71dd0f000000',
  'x-ms-client-request-id',
  'ffd397bf-923b-4e51-bea6-e4daaac725c9',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:41 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546567780309550/newblockblob162546568131802000')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc6468ed-601e-002d-7365-71c899000000',
  'x-ms-client-request-id',
  '06eed280-acdb-4ca7-b932-41e97e8aaed8',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:41 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546567780309550/newblockblob162546568131802000')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5fd4729-901e-0015-2865-710902000000',
  'x-ms-client-request-id',
  '248b7077-a308-443d-8a17-e6b5f01f7511',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:43 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162546567780309550/newblockblob162546568131802000', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:45 GMT',
  'ETag',
  '"0x8D93F7C2F5DA972"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ade62cba-401e-001f-6f65-713b27000000',
  'x-ms-client-request-id',
  '1e417f35-9fb7-4ca3-b4b7-af95b852ec4e',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 05 Jul 2021 06:14:44 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162546567780309550/newblockblob162546568131802000')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks></BlockList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 05 Jul 2021 06:14:45 GMT',
  'ETag',
  '"0x8D93F7C2F5DA972"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e29b9e27-201e-002a-5865-716ee4000000',
  'x-ms-client-request-id',
  '2bc5193d-486a-4a95-8984-1714153d7308',
  'x-ms-version',
  '2020-10-02',
  'x-ms-blob-content-length',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 05 Jul 2021 06:14:45 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162546567780309550')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f50c2b1-701e-0031-2965-71506f000000',
  'x-ms-client-request-id',
  '100362b5-0434-4d0a-885e-ca8529740fc2',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Mon, 05 Jul 2021 06:14:47 GMT',
  'Connection',
  'close'
]);
