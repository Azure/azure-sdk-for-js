let nock = require('nock');

module.exports.testInfo = {"share":"share156775314082500216"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775314082500216')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:01 GMT',
  'ETag',
  '"0x8D73297B26B7994"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9c89d609-901a-005a-5b80-649164000000',
  'x-ms-client-request-id',
  '8fb953f9-5e78-45f8-b5c1-efcd21b99709',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:00 GMT',
  'Connection',
  'close' ]);

