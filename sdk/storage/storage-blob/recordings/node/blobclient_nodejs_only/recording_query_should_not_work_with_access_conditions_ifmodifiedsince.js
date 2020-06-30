let nock = require('nock');

module.exports.hash = "583676491f682ef93e26eab4a83ffaf0";

module.exports.testInfo = {"uniqueName":{"container":"container159352260282403157","blob":"blob159352260352500221"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352260282403157')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:10:02 GMT',
  'ETag',
  '"0x8D81CF6E666AE87"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0559b95e-101e-001a-0bdf-4e2c7f000000',
  'x-ms-client-request-id',
  '751772e0-893e-402a-95c6-1bcf0efd54ab',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:10:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352260282403157/blob159352260352500221', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:10:03 GMT',
  'ETag',
  '"0x8D81CF6E6F6A8E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0559b9f6-101e-001a-06df-4e2c7f000000',
  'x-ms-client-request-id',
  '4b33cd0e-f601-41e2-9f74-6175b42c9712',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-30T13:10:03.5382498Z',
  'Date',
  'Tue, 30 Jun 2020 13:10:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352260282403157/blob159352260352500221', "100,200,300,400\n150,250,350,450\n")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'v9C7YWQTetukQaGSOQcgRQ==',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:10:04 GMT',
  'ETag',
  '"0x8D81CF6E7437745"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0559ba37-101e-001a-41df-4e2c7f000000',
  'x-ms-client-request-id',
  '10cb6730-2836-43e2-9c8b-5415306ae037',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'gema9E3+zEY=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-30T13:10:04.0426069Z',
  'Date',
  'Tue, 30 Jun 2020 13:10:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/container159352260282403157/blob159352260352500221', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><QueryType>SQL</QueryType><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(304, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'ConditionNotMet',
  'x-ms-request-id',
  '0559ba65-101e-001a-5ddf-4e2c7f000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '798c0c9b-b35b-43c6-9d1a-3087b47ed179',
  'Date',
  'Tue, 30 Jun 2020 13:10:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159352260282403157')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0559baac-101e-001a-19df-4e2c7f000000',
  'x-ms-client-request-id',
  '44fbbc7c-57ea-4cf9-a07b-fda5cfafdac6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:10:04 GMT'
]);
