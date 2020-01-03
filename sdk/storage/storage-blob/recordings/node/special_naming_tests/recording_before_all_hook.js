let nock = require('nock');

module.exports.testInfo = {"1container-with-dash":"1container-with-dash156816856896007000"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156816856896007000')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:49 GMT',
  'ETag',
  '"0x8D7365EF0ECDB68"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ec3bb11-601e-004f-7047-68a2e4000000',
  'x-ms-client-request-id',
  'f1fb39f6-44e8-488a-8063-cadbe883a3fd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:48 GMT' ]);

