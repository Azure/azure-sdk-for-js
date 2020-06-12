let nock = require('nock');

module.exports.hash = "82a9338d67ceb4b736c6cb55f3326590";

module.exports.testInfo = {"uniqueName":{"container":"container159195610801707420","blob":"blob159195610832605651"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159195610801707420')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 12 Jun 2020 10:01:47 GMT',
  'ETag',
  '"0x8D80EB79E6C315B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5523c08a-901e-0051-1da0-40b825000000',
  'x-ms-client-request-id',
  '1724ff35-2998-4ee5-a689-c5463727adaa',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:01:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159195610801707420')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54356e5c-801e-0072-69a0-4022e6000000',
  'x-ms-client-request-id',
  '4bc734fd-621e-499d-9616-97f3070a3dbe',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 12 Jun 2020 10:01:47 GMT'
]);
