let nock = require('nock');

module.exports.hash = "db7c5313e92cc211fcf08816145afde5";

module.exports.testInfo = {"uniqueName":{"container":"container160639411727305145","blob":"blob160639411868007361"},"newDate":{"now":"2020-11-26T12:35:17.271Z","tmr":"2020-11-26T12:35:17.273Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639411727305145')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 12:35:18 GMT',
  'ETag',
  '"0x8D89207BBBDF4AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70871bd6-701e-004b-26f0-c3a9ae000000',
  'x-ms-client-request-id',
  '00286240-1a71-4cfb-a346-cd2cc2f9b884',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 12:35:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639411727305145/blob160639411868007361')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 12:35:18 GMT',
  'ETag',
  '"0x8D89207BBF23841"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70871cc0-701e-004b-73f0-c3a9ae000000',
  'x-ms-client-request-id',
  '1b858186-4bad-4486-836a-4c18fae96741',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-26T12:35:18.8565057Z',
  'Date',
  'Thu, 26 Nov 2020 12:35:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160639411727305145/blob160639411868007361')
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
  'Thu, 26 Nov 2020 12:35:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D89207BBF23841"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70871d87-701e-004b-24f0-c3a9ae000000',
  'x-ms-client-request-id',
  '1f9d34e1-2c2b-4f74-8fb3-160b04ceb555',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-11-26T12:35:18.8565057Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 26 Nov 2020 12:35:18 GMT',
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
  'Thu, 26 Nov 2020 12:35:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160639411727305145')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70871e49-701e-004b-4ff0-c3a9ae000000',
  'x-ms-client-request-id',
  '594311aa-c7cd-4e7f-9c50-e9f97b6bcd80',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 12:35:19 GMT'
]);
