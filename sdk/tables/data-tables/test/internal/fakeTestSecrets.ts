// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Centralized location for test/fake secrets so that suppressions
// are easier to maintain properly
export const expectedSharedKeyLiteHeader =
  "SharedKeyLite accountName:mzKy4ZjXbTEueNQp2cxou+kKrfCnWpdau5I6kJIO58g=";
export const expectedSas1 =
  "sv=2019-02-02&se=2021-12-12T01%3A00%3A00Z&sp=r&sig=lZxPmk%2BpMuu2MRXxeTZoBV6m3eobZKuIkYcHLDdDt2Q%3D&tn=testTable";
export const expectedSas2 =
  "sv=2019-02-02&se=2021-12-12T01%3A00%3A00Z&sp=ad&sig=bf2oeXb%2FVL9hzbd5ZWngdNJoR%2BkyDp0vPZz%2FDGJt1d4%3D&tn=testTable";
export const expectedSas3 =
  "sv=2019-02-02&se=2022-12-12T00%3A00%3A00Z&sp=r&sig=Jm1wKNTA0%2FHH8u9S8dSjqdZKtFKYr7whXnxDy3RKsxU%3D&tn=testTable";
export const expectedSas4 =
  "sv=2019-02-02&si=MyAccessPolicy&sig=bXpQx%2FOSDR8oGiqi1QJekrwS5MBf%2Bdi6x%2FClf9QVKgg%3D&tn=testTable";
export const expectedSas5 =
  "sv=2019-02-02&ss=t&srt=sco&se=2021-12-12T01%3A00%3A00Z&sp=rl&sig=Yuhy3%2BSpfj%2BFWmSoxa1GAxtX6IOKvX6qGnHIKn%2FLHD0%3D";
export const expectedSas6 =
  "sv=2019-02-02&ss=t&srt=sco&se=2021-12-12T01%3A00%3A00Z&sp=da&sig=TmE8AOQFacynVIVR5ljBYqY3Y3K6olfdDMLl09iRvvs%3D";
export const expectedSas7 =
  "sv=2019-02-02&ss=t&srt=sco&se=2022-12-12T00%3A00%3A00Z&sp=rl&sig=y42pmN9E%2FgA2O3nGn25lx%2B%2BqQmhvh0WqFi4%2BkOPitwA%3D";
export const expectedSas8 =
  "sv=2019-02-02&se=2021-12-12T01%3A00%3A00Z&sp=r&sig=FmE9Q8KiLIJUxmY2k8NHCSwApy2Y1VY17Mls1dIIJcI%3D&tn=testTable&srk=1&spk=P1";
export const expectedSas9 =
  "sv=2019-02-02&se=2021-12-12T01%3A00%3A00Z&sp=r&sig=h0xXlQhXumE5Litei9gWdY3ECCORubPLUFqcbWa6Tus%3D&tn=testTable&epk=P1&erk=1";
