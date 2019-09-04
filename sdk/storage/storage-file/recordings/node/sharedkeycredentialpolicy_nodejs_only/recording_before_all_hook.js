let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156758488943009996"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156758488943009996')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:49 GMT',
  'ETag',
  '"0x8D7310FF4BDFF90"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3bc0b1f0-101a-0129-19f8-6237fa000000',
  'x-ms-client-request-id',
  '80c6b8e1-b4f9-4c98-8c81-a4cebef21fd2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:14:49 GMT',
  'Connection',
  'close' ]);

