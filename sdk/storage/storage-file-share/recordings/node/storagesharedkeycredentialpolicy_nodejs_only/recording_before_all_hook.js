let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156816855279902838"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156816855279902838')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:33 GMT',
  'ETag',
  '"0x8D7365EE74EE79D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41be3948-801a-006c-1847-68cd2f000000',
  'x-ms-client-request-id',
  '0adb0d10-33d0-40bc-9d49-2951217b3770',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:32 GMT' ]);

