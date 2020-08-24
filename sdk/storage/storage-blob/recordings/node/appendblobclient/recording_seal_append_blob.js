let nock = require('nock');

module.exports.hash = "0865dad13f92ecd375536136402a0046";

module.exports.testInfo = {"uniqueName":{"container":"container159826023912504802","blob":"blob159826023946808504"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826023912504802')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:47 GMT',
  'ETag',
  '"0x8D8480D735416A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090bd8a2-101e-0115-41f6-79ba5a000000',
  'x-ms-client-request-id',
  'de4b011c-2f10-449c-b51a-41bbc285eb2e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 09:09:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826023912504802/blob159826023946808504')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:48 GMT',
  'ETag',
  '"0x8D8480D7360EA83"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090bd907-101e-0115-0ff6-79ba5a000000',
  'x-ms-client-request-id',
  'b5cb475d-b79c-4235-8b79-10b578b67d46',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 24 Aug 2020 09:09:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159826023912504802/blob159826023946808504')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:48 GMT',
  'ETag',
  '"0x8D8480D73DA2804"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-sealed',
  'true',
  'x-ms-request-id',
  '090bd9b4-101e-0115-1df6-79ba5a000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'de81fecd-68c9-4eb7-b2bf-53b706e059a7',
  'Date',
  'Mon, 24 Aug 2020 09:09:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159826023912504802/blob159826023946808504')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:48 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8480D73DA2804"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090bdfc5-101e-0115-60f6-79ba5a000000',
  'x-ms-client-request-id',
  '3babdebb-b0bd-405b-aecb-a33c170d662a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Mon, 24 Aug 2020 09:09:48 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-blob-sealed',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,x-ms-blob-sealed,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Aug 2020 09:09:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159826023912504802/blob159826023946808504')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Aug 2020 09:09:48 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8480D73DA2804"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be012-101e-0115-20f6-79ba5a000000',
  'x-ms-client-request-id',
  '63240e00-2524-418e-8942-bb15a1797b10',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Mon, 24 Aug 2020 09:09:48 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-server-encrypted',
  'true',
  'x-ms-blob-sealed',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,x-ms-blob-sealed,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Aug 2020 09:09:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159826023912504802')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '090be04c-101e-0115-55f6-79ba5a000000',
  'x-ms-client-request-id',
  '7f9ad570-f71a-4a63-ab5d-1e4e15102295',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 24 Aug 2020 09:09:48 GMT'
]);
