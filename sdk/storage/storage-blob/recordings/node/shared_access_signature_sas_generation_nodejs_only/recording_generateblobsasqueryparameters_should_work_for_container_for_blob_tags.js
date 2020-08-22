let nock = require('nock');

module.exports.hash = "41c4cc376067b33b41bfb216b122df61";

module.exports.testInfo = {"uniqueName":{"container":"container159220845863804244","blob":"blob159220845999306367"},"newDate":{"now":"2020-06-15T08:07:38.637Z","tmr":"2020-06-15T08:07:38.638Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159220845863804244')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 08:07:39 GMT',
  'ETag',
  '"0x8D811032C44A734"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc394a50-e01e-000e-2bec-426410000000',
  'x-ms-client-request-id',
  '8435a8d2-93ec-48e8-97ea-8328b2d77ebd',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 08:07:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159220845863804244/blob159220845999306367')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 08:07:40 GMT',
  'ETag',
  '"0x8D811032C7557B4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc394b45-e01e-000e-1aec-426410000000',
  'x-ms-client-request-id',
  '7b6c1663-0e54-4f7e-84ea-424b2d71eefc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T08:07:40.1386932Z',
  'Date',
  'Mon, 15 Jun 2020 08:07:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159220845863804244/blob159220845999306367', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc394c2c-e01e-000e-7cec-426410000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '29bb852f-37d8-43a3-af11-8fc5a400b510',
  'Date',
  'Mon, 15 Jun 2020 08:07:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159220845863804244/blob159220845999306367')
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
  'Mon, 15 Jun 2020 08:07:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D811032C7557B4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc394e09-e01e-000e-4cec-426410000000',
  'x-ms-client-request-id',
  '123993e9-2cba-4b71-89ee-5eae76ae1ebe',
  'x-ms-version',
  '2019-12-12',
  'x-ms-tag-count',
  '2',
  'x-ms-version-id',
  '2020-06-15T08:07:40.1386932Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Mon, 15 Jun 2020 08:07:40 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 08:07:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159220845863804244')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc394f08-e01e-000e-49ec-426410000000',
  'x-ms-client-request-id',
  'a86cabc8-41f7-4865-8b4a-8f7e15c18e11',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 08:07:40 GMT'
]);
