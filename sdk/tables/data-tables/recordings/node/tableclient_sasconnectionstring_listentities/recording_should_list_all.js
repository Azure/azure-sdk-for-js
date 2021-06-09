let nock = require('nock');

module.exports.hash = "b9e319e034f6ed35a190c49bc59ccc0b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.3795894Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-06-09T01:17:08.3795894Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.4116124Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-06-09T01:17:08.4116124Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.7188333Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-06-09T01:17:08.7188333Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.7508569Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-06-09T01:17:08.7508569Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.7848811Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-06-09T01:17:08.7848811Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.8149028Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-06-09T01:17:08.8149028Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.8549317Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-06-09T01:17:08.8549317Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.8979628Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-06-09T01:17:08.8979628Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.9409939Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-06-09T01:17:08.9409939Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.9740178Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-06-09T01:17:08.9740178Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A09.0180501Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-06-09T01:17:09.0180501Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A09.0570783Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-06-09T01:17:09.0570783Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.4436349Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-06-09T01:17:08.4436349Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.4786596Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-06-09T01:17:08.4786596Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.5086815Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-06-09T01:17:08.5086815Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.5417056Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-06-09T01:17:08.5417056Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.5717274Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-06-09T01:17:08.5717274Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.6057515Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-06-09T01:17:08.6057515Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.6387754Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-06-09T01:17:08.6387754Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.6707986Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-06-09T01:17:08.6707986Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A08.3345567Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-06-09T01:17:08.3345567Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7e0f-7002-00b5-3ecd-5c8c40000000',
  'x-ms-client-request-id',
  '100cc722-36a1-4ea5-baa5-8f6b5b5f4754',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:08 GMT'
]);
