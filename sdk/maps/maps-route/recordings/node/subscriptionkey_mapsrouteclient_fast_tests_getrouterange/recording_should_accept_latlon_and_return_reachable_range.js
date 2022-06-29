let nock = require('nock');

module.exports.hash = "9b7519af99da16e2a354b4a17184a010";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/range/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","reachableRange":{"center":{"latitude":50.97452,"longitude":5.86605},"boundary":[{"latitude":52.03715,"longitude":5.73477},{"latitude":52.04947,"longitude":5.67936},{"latitude":51.99502,"longitude":5.55635},{"latitude":51.94848,"longitude":5.37949},{"latitude":52.11457,"longitude":5.14785},{"latitude":52.07826,"longitude":5.0023},{"latitude":52.00131,"longitude":5.0172},{"latitude":51.82432,"longitude":4.80009},{"latitude":51.79288,"longitude":4.64903},{"latitude":51.64071,"longitude":4.55302},{"latitude":51.58383,"longitude":4.28928},{"latitude":51.4586,"longitude":4.03075},{"latitude":50.95697,"longitude":3.87467},{"latitude":50.86077,"longitude":4.02418},{"latitude":50.55842,"longitude":4.135},{"latitude":50.49095,"longitude":4.00293},{"latitude":50.33994,"longitude":4.47394},{"latitude":50.26973,"longitude":4.62286},{"latitude":50.24469,"longitude":4.89991},{"latitude":50.08234,"longitude":5.07193},{"latitude":50.00511,"longitude":5.22006},{"latitude":50.08708,"longitude":5.44606},{"latitude":49.83451,"longitude":5.51192},{"latitude":49.86207,"longitude":5.72069},{"latitude":49.85041,"longitude":5.73252},{"latitude":50.05474,"longitude":5.91736},{"latitude":50.02852,"longitude":6.08767},{"latitude":50.09254,"longitude":6.08538},{"latitude":50.08942,"longitude":6.2758},{"latitude":50.08797,"longitude":6.43644},{"latitude":50.00492,"longitude":6.6107},{"latitude":49.9985,"longitude":6.7403},{"latitude":50.32042,"longitude":6.62289},{"latitude":50.36904,"longitude":6.79277},{"latitude":50.31434,"longitude":7.29876},{"latitude":50.2921,"longitude":7.51112},{"latitude":50.52308,"longitude":7.62998},{"latitude":50.99717,"longitude":7.85555},{"latitude":51.20234,"longitude":7.40494},{"latitude":51.3644,"longitude":7.57318},{"latitude":51.51458,"longitude":7.65464},{"latitude":51.59279,"longitude":7.23798},{"latitude":51.67601,"longitude":7.11425},{"latitude":51.68029,"longitude":6.8068},{"latitude":51.77462,"longitude":6.58217},{"latitude":51.78891,"longitude":6.40998},{"latitude":51.85032,"longitude":6.24131},{"latitude":51.84264,"longitude":6.21842},{"latitude":51.97178,"longitude":5.99319},{"latitude":52.09144,"longitude":5.94975}]}}, [ 'Cache-Control',
  'no-transform, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '2196',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 0DDF93A3FC964BCD91D6901C2AA7D2B3 Ref B: TYBEDGE0812 Ref C: 2022-06-29T08:18:12Z',
  'Date',
  'Wed, 29 Jun 2022 08:18:12 GMT' ]);
