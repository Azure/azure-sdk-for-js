let nock = require('nock');

module.exports.hash = "7a16e9b4d6f972bde76536e576920314";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P6_node","RowKey":"R6","testField":true,"testField@odata.type":"Edm.Boolean"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.3369978Z'"`,
  'Location',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d803b-7002-00b5-53cd-5c8c40000000',
  'x-ms-client-request-id',
  'a76659fe-4784-42ee-9326-292ffe4740d9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')",
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A10.3369978Z'\"","PartitionKey":"P6_node","RowKey":"R6","Timestamp":"2021-06-09T01:17:10.3369978Z","testField":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.3369978Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8055-7002-00b5-6ccd-5c8c40000000',
  'x-ms-client-request-id',
  'a0e51d9e-c3d6-481c-8ae0-e7ccac6aaf66',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8066-7002-00b5-7dcd-5c8c40000000',
  'x-ms-client-request-id',
  'fd45f7d5-4df3-478f-a523-2bb08ab8daac',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);
