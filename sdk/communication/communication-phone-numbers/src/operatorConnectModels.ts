// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

/**
 * Consent status
 */
export type ConsentStatus = "active" | "removed" | "suspended";


/**
 * Options that could be used for creating consent.
 */
export interface GrantConsentOptions extends OperationOptions {
  /** Id of operator to which consent is given */
  operatorId: string;
  /** Contact of person that made the change */
  consentedBy: ConsentContact;
  /** Status of the consent */
  status?: ConsentStatus;
  /** List of 2 character codes of available countries in ISO 3166-1 format */
  countryCodes?: string[];
  /** Array of Contact */
  contacts?: ConsentContact[];
  /** User company name */
  companyName?: string;
}

/**
 * Options that could be used for updating consent.
 */
export interface UpdateConsentOptions extends OperationOptions {
  /** Id of operator to which consent is given */
  operatorId: string;
  /** Contact of person that made the change */
  lastModifiedBy: ConsentContact;
  /** Status of the consent */
  status?: ConsentStatus;
  /** List of 2 character codes of available countries in ISO 3166-1 format */
  countryCodes?: string[];
  /** Array of Contact */
  contacts?: ConsentContact[];
  /** User company name */
  companyName?: string;
}

/**
 * Options that could be used for revoking consent.
 */
export interface RevokeConsentOptions extends OperationOptions {
  /** Id of operator to which consent is given */
  operatorId: string;
  /** Contact of person that made the change */
  lastModifiedBy: ConsentContact;
}

/**
 * Contant details of person consenting operator relations.
 */
export interface ConsentContact {
  /** Full name of the contact */
  fullName: string;
  /** Email address of the contact */
  email: string;
  /** Phone number of the contact with a leading + and country code */
  phoneNumber?: string;
}

/**
 * Consent details.
 */
export interface Consent {
  /** Unique GUID that represents the operator record */
  operatorId: string;
  /** Status of the consent */
  status: ConsentStatus;
  /** Contact information of user that granted the consent to operator */
  consentedBy: ConsentContact;
  /** Date/Time when the consent was provided */
  consentedOn: Date;
  /** Contact information of user that last modified the consent */
  lastModifiedBy: ConsentContact;
  /** Date/Time when the consent was last updated */
  lastModifiedOn: Date;
  /** List of 2 character codes of available countries in ISO 3166-1 format */
  countryCodes: string[];
  /** List of contact information */
  contacts: ConsentContact[];
  /** User company name */
  companyName: string;
}

/** 
 * Avaliable offers of operator. 
 */
export interface OperatorOffering {
  /** The type of offer that operator is advertising */
  offerType: string;
  /** List of 2 character codes of available countries in ISO 3166-1 format */
  availableCountryCodes: string[];
}

/** 
 * Operator details. 
 */
export interface Operator {
  /** Unique GUID that represents the operator record */
  operatorId: string;
  /** Public facing brand name of the operator */
  friendlyName: string;
  /** Count of phone numbers acquired from the operator */
  acquiredNumbersCount: number;
  offerings: OperatorOffering[];
  /** URL of the Operator's Operator Connect offerings */
  landingPageUrl?: string;
  /** URL of the Operator's logo */
  logoUrl?: string;
  /** URL of the Operator's thumbnail logo */
  logoThumbnailUrl?: string;
}

/**
 * Options that could be used for retrieving consent data.
 */
export interface GetConsentOptions extends OperationOptions {
  /** Unique GUID that represents the operator record */
  operatorId: string;
}

/**
 * Options that could be used for retrieving paged data.
 */
export interface PagedOperationOptions extends OperationOptions {
  /** An optional option for how many entries to skip, for pagination purposes. The default value is 0. */
  skip?: number;
  /** An optional option for how many entries to return, for pagination purposes. The default will return the entire list. */
  top?: number;
}
