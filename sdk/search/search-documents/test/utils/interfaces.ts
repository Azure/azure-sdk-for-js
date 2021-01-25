// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GeographyPoint } from "../../src/index";

export interface Hotel {
  hotelId: string;
  hotelName?: string | null;
  description?: string | null;
  descriptionFr?: string | null;
  category?: string | null;
  tags?: string[] | null;
  parkingIncluded?: boolean | null;
  smokingAllowed?: boolean | null;
  lastRenovationDate?: Date | null;
  rating?: number | null;
  location?: GeographyPoint | null;
  address?: {
    streetAddress?: string | null;
    city?: string | null;
    stateProvince?: string | null;
    postalCode?: string | null;
    country?: string | null;
  } | null;
  rooms?: Array<{
    description?: string | null;
    descriptionFr?: string | null;
    type?: string | null;
    baseRate?: number | null;
    bedOptions?: string | null;
    sleepsCount?: number | null;
    smokingAllowed?: boolean | null;
    tags?: string[] | null;
  }> | null;
}
