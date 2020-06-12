let nock = require('nock');

module.exports.hash = "ea33b6634f85bfb8e09cc8331175b0da";

module.exports.testInfo = {"uniqueName":{"container":"container159195940625401543","blob":"blob159195940654404885"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940625401543')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:45 GMT',
  'ETag',
  '"0x8D80EBF4C5305DE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c545ed-501e-0046-7da8-407927000000',
  'x-ms-client-request-id',
  'bbf9f248-32e9-4cb0-8354-4bbaf3f91d89',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940625401543/blob159195940654404885', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:45 GMT',
  'ETag',
  '"0x8D80EBF4C8031B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c5464c-501e-0046-54a8-407927000000',
  'x-ms-client-request-id',
  '5a82a6ad-1e20-46d9-8cc2-40adae60e234',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-12T10:56:45.7937331Z',
  'Date',
  'Fri, 12 Jun 2020 10:56:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940625401543/blob159195940654404885', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c546fa-501e-0046-7aa8-407927000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '7f0365a9-5f29-4bfe-8e5b-807809c239df',
  'Date',
  'Fri, 12 Jun 2020 10:56:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195940625401543/blob159195940654404885')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:56:45 GMT',
  'ETag',
  '"0x8D80EBF4C8031B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c5477c-501e-0046-75a8-407927000000',
  'x-ms-client-request-id',
  '26600c91-25e3-4a33-be31-c334cefe304e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-12T10:56:46.3991668Z',
  'x-ms-snapshot',
  '2020-06-12T10:56:46.3981668Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Fri, 12 Jun 2020 10:56:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159195940625401543/blob159195940654404885')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c547e7-501e-0046-59a8-407927000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ed75f162-6b43-44e4-8c47-43af4a7b3dd8',
  'Date',
  'Fri, 12 Jun 2020 10:56:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195940625401543')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0c5484f-501e-0046-3da8-407927000000',
  'x-ms-client-request-id',
  '60696aae-cab7-433e-a1c1-ff5432c0f597',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:56:46 GMT'
]);
