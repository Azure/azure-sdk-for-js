import * as coreHttp from "@azure/core-http";
import { RecordSets, Zones, DnsResourceReference } from "./operations";
import { DnsManagementClientContext } from "./dnsManagementClientContext";
import { DnsManagementClientOptionalParams } from "./models";

export class DnsManagementClient extends DnsManagementClientContext {
  /**
   * Initializes a new instance of the DnsManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Specifies the Azure subscription ID, which uniquely identifies the Microsoft
   *                       Azure subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: DnsManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.recordSets = new RecordSets(this);
    this.zones = new Zones(this);
    this.dnsResourceReference = new DnsResourceReference(this);
  }

  recordSets: RecordSets;
  zones: Zones;
  dnsResourceReference: DnsResourceReference;
}
