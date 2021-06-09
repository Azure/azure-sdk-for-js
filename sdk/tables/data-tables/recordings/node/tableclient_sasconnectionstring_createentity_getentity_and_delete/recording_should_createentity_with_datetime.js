let nock = require('nock');

module.exports.hash = "795979f2f183314fc16f0af92f247461";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P7_node","RowKey":"R7","testField":"2020-09-17T00:00:00.99999Z","testField@odata.type":"Edm.DateTime"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.4370699Z'"`,
  'Location',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P7_node',RowKey='R7')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d807f-7002-00b5-15cd-5c8c40000000',
  'x-ms-client-request-id',
  'e9f07c1a-e6be-437d-a435-28a617e1ef7f',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P7_node',RowKey='R7')",
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P7_node',RowKey='R7')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A10.4370699Z'\"","PartitionKey":"P7_node","RowKey":"R7","Timestamp":"2021-06-09T01:17:10.4370699Z","testField@odata.type":"Edm.DateTime","testField":"2020-09-17T00:00:00.99999Z"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.4370699Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d808f-7002-00b5-23cd-5c8c40000000',
  'x-ms-client-request-id',
  '553acb4a-65e0-41ff-a974-e5c5c5640e0d',
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
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P7_node',RowKey='R7')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d80a0-7002-00b5-33cd-5c8c40000000',
  'x-ms-client-request-id',
  '73a3e1d7-116b-4d0d-9de2-898bd18337cf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);
