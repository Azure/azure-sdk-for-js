import { CredentialUnavailable } from "../client/errors";

/**
 * The record to use to find the cached tokens in the cache
 */
export interface AuthenticationRecord {
  /**
   * The associated authority, if used
   */
  authority?: string;

  /**
   * The home account Id
   */
  homeAccountId: string;

  /**
   * The login environment, eg "login.windows.net"
   */
  environment: string;

  /**
   * The associated tenant ID
   */
  tenantId: string;

  /**
   * The username of the logged in account
   */
  username: string;
}

export class AuthenticationRequired extends CredentialUnavailable {}
