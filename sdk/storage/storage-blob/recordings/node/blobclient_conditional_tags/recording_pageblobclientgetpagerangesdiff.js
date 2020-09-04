let nock = require('nock');

module.exports.hash = "652551f9a2481ea517af854f23dd49e7";

module.exports.testInfo = {"uniqueName":{"container":"container159549961554908996","blob":"blob159549961585309613","pageBlob":"pageBlob159549961644802052"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961554908996')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:14 GMT',
  'ETag',
  '"0x8D82EF1FD5E9240"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b62-901e-002b-10da-60cd6c000000',
  'x-ms-client-request-id',
  '74c446a9-3679-42be-b76e-3357789f06e8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961554908996/blob159549961585309613', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:14 GMT',
  'ETag',
  '"0x8D82EF1FD8CF2F8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b75-901e-002b-1bda-60cd6c000000',
  'x-ms-client-request-id',
  '12d56b6b-87a0-4e32-b5b8-d2e5be896dde',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:14.8794104Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961554908996/blob159549961585309613', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b87-901e-002b-2cda-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '83b68b71-0329-48c8-a98f-afbe6a16a2e4',
  'Date',
  'Thu, 23 Jul 2020 10:20:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961554908996/pageBlob159549961644802052')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:15 GMT',
  'ETag',
  '"0x8D82EF1FDE86A0A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429b97-901e-002b-38da-60cd6c000000',
  'x-ms-client-request-id',
  '152e757c-0815-486d-8e52-786eb796eee6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:15.4788362Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961554908996/pageBlob159549961644802052')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:15 GMT',
  'ETag',
  '"0x8D82EF1FDE86A0A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429ba0-901e-002b-3fda-60cd6c000000',
  'x-ms-client-request-id',
  '069352f3-cf09-4e02-803b-76e868eb1dea',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-23T10:20:15.7800484Z',
  'x-ms-snapshot',
  '2020-07-23T10:20:15.7790484Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 23 Jul 2020 10:20:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961554908996/pageBlob159549961644802052', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Content-MD5',
  'VpBzljOcorCZvRIkX5Nt3A==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:16 GMT',
  'ETag',
  '"0x8D82EF1FE42814B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '10429bb0-901e-002b-4cda-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8989470d-5615-46c0-bead-85ce88611f29',
  'Date',
  'Thu, 23 Jul 2020 10:20:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159549961554908996/pageBlob159549961644802052')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429bc2-901e-002b-5bda-60cd6c000000\nTime:2020-07-23T10:20:16.3637473Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429bc2-901e-002b-5bda-60cd6c000000',
  'x-ms-client-request-id',
  '26f67efb-aa5c-4612-8332-e6f80bf75fa2',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:20:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159549961554908996/pageBlob159549961644802052')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><PageList><PageRange><Start>0</Start><End>511</End></PageRange></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:16 GMT',
  'ETag',
  '"0x8D82EF1FE42814B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429bc9-901e-002b-62da-60cd6c000000',
  'x-ms-client-request-id',
  'a0f6c77e-175b-46ed-90af-cabd6065a0f0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-blob-content-length',
  '512',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-blob-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 23 Jul 2020 10:20:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549961554908996')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429be2-901e-002b-78da-60cd6c000000',
  'x-ms-client-request-id',
  '0939dbfe-7cde-4f62-88b1-45b78dc330ca',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:16 GMT'
]);
