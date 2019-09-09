let nock = require('nock');

module.exports.testInfo = {"share":"share156775324141106730"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775324141106730')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:41 GMT',
  'ETag',
  '"0x8D73297EE62020E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54260c0e-801a-00b2-2380-6408f2000000',
  'x-ms-client-request-id',
  '265d3672-2068-47bd-9564-fb61306c8780',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775324141106730')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9ae62f9-001a-0125-6c80-64a0f2000000',
  'x-ms-client-request-id',
  '9378089f-3488-45ac-a824-99d48f60a8e1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:43 GMT',
  'Connection',
  'close' ]);

