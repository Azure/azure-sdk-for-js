// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BillingBenefitsRPContext,
  BillingBenefitsRPOptionalParams,
  createBillingBenefitsRP,
} from "./api/index.js";
import {
  ApplicableMaccsOperations,
  _getApplicableMaccsOperations,
} from "./classic/applicableMaccs/index.js";
import { BenefitOperations, _getBenefitOperations } from "./classic/benefit/index.js";
import {
  ConditionalCreditContributorsOperations,
  _getConditionalCreditContributorsOperations,
} from "./classic/conditionalCreditContributors/index.js";
import {
  ConditionalCreditsOperations,
  _getConditionalCreditsOperations,
} from "./classic/conditionalCredits/index.js";
import {
  ContributorsOperations,
  _getContributorsOperations,
} from "./classic/contributors/index.js";
import { CreditsOperations, _getCreditsOperations } from "./classic/credits/index.js";
import { DiscountOperations, _getDiscountOperations } from "./classic/discount/index.js";
import { DiscountsOperations, _getDiscountsOperations } from "./classic/discounts/index.js";
import {
  FreeServicesOperations,
  _getFreeServicesOperations,
} from "./classic/freeServices/index.js";
import { MaccsOperations, _getMaccsOperations } from "./classic/maccs/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  ReservationOrderAliasOperations,
  _getReservationOrderAliasOperations,
} from "./classic/reservationOrderAlias/index.js";
import { SavingsPlanOperations, _getSavingsPlanOperations } from "./classic/savingsPlan/index.js";
import {
  SavingsPlanOrderOperations,
  _getSavingsPlanOrderOperations,
} from "./classic/savingsPlanOrder/index.js";
import {
  SavingsPlanOrderAliasOperations,
  _getSavingsPlanOrderAliasOperations,
} from "./classic/savingsPlanOrderAlias/index.js";
import {
  SellerResourceOperations,
  _getSellerResourceOperations,
} from "./classic/sellerResource/index.js";
import { SourcesOperations, _getSourcesOperations } from "./classic/sources/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { BillingBenefitsRPOptionalParams } from "./api/billingBenefitsRPContext.js";

export class BillingBenefitsRP {
  private _client: BillingBenefitsRPContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: BillingBenefitsRPOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: BillingBenefitsRPOptionalParams,
  );
  /** Azure Benefits RP let users create and manage benefits. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | BillingBenefitsRPOptionalParams,
    options?: BillingBenefitsRPOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBillingBenefitsRP(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.freeServices = _getFreeServicesOperations(this._client);
    this.sources = _getSourcesOperations(this._client);
    this.applicableMaccs = _getApplicableMaccsOperations(this._client);
    this.sellerResource = _getSellerResourceOperations(this._client);
    this.benefit = _getBenefitOperations(this._client);
    this.discount = _getDiscountOperations(this._client);
    this.reservationOrderAlias = _getReservationOrderAliasOperations(this._client);
    this.savingsPlan = _getSavingsPlanOperations(this._client);
    this.savingsPlanOrder = _getSavingsPlanOrderOperations(this._client);
    this.savingsPlanOrderAlias = _getSavingsPlanOrderAliasOperations(this._client);
    this.maccs = _getMaccsOperations(this._client);
    this.conditionalCreditContributors = _getConditionalCreditContributorsOperations(this._client);
    this.conditionalCredits = _getConditionalCreditsOperations(this._client);
    this.credits = _getCreditsOperations(this._client);
    this.contributors = _getContributorsOperations(this._client);
    this.discounts = _getDiscountsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for freeServices */
  public readonly freeServices: FreeServicesOperations;
  /** The operation groups for sources */
  public readonly sources: SourcesOperations;
  /** The operation groups for applicableMaccs */
  public readonly applicableMaccs: ApplicableMaccsOperations;
  /** The operation groups for sellerResource */
  public readonly sellerResource: SellerResourceOperations;
  /** The operation groups for benefit */
  public readonly benefit: BenefitOperations;
  /** The operation groups for discount */
  public readonly discount: DiscountOperations;
  /** The operation groups for reservationOrderAlias */
  public readonly reservationOrderAlias: ReservationOrderAliasOperations;
  /** The operation groups for savingsPlan */
  public readonly savingsPlan: SavingsPlanOperations;
  /** The operation groups for savingsPlanOrder */
  public readonly savingsPlanOrder: SavingsPlanOrderOperations;
  /** The operation groups for savingsPlanOrderAlias */
  public readonly savingsPlanOrderAlias: SavingsPlanOrderAliasOperations;
  /** The operation groups for maccs */
  public readonly maccs: MaccsOperations;
  /** The operation groups for conditionalCreditContributors */
  public readonly conditionalCreditContributors: ConditionalCreditContributorsOperations;
  /** The operation groups for conditionalCredits */
  public readonly conditionalCredits: ConditionalCreditsOperations;
  /** The operation groups for credits */
  public readonly credits: CreditsOperations;
  /** The operation groups for contributors */
  public readonly contributors: ContributorsOperations;
  /** The operation groups for discounts */
  public readonly discounts: DiscountsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
