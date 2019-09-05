let nock = require('nock');

module.exports.testInfo = {"share":"share156775326469202492"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775326469202492')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:04 GMT',
  'ETag',
  '"0x8D73297FC3E6E42"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c0bd63c3-001a-00bc-7180-642142000000',
  'x-ms-client-request-id',
  '2382ab38-b5a9-4ae7-8436-9a5782731d2f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775326469202492')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6035ed0-a01a-00b5-2180-646491000000',
  'x-ms-client-request-id',
  '80cda5eb-3cff-409e-889d-d5648e1ad53e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:04 GMT',
  'Connection',
  'close' ]);

