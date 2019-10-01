// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { StoredProcedures, StoredProcedure } from "../StoredProcedure";
import { Trigger, Triggers } from "../Trigger";
import { UserDefinedFunction, UserDefinedFunctions } from "../UserDefinedFunction";
import { ClientContext } from "../../ClientContext";
import { Container } from "../Container/Container";

export class Scripts {
  /**
   * @param container The parent {@link Container}.
   * @hidden
   */
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Used to read, replace, or delete a specific, existing {@link StoredProcedure} by id.
   *
   * Use `.storedProcedures` for creating new stored procedures, or querying/reading all stored procedures.
   * @param id The id of the {@link StoredProcedure}.
   */
  public storedProcedure(id: string): StoredProcedure {
    return new StoredProcedure(this.container, id, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Trigger} by id.
   *
   * Use `.triggers` for creating new triggers, or querying/reading all triggers.
   * @param id The id of the {@link Trigger}.
   */
  public trigger(id: string): Trigger {
    return new Trigger(this.container, id, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link UserDefinedFunction} by id.
   *
   * Use `.userDefinedFunctions` for creating new user defined functions, or querying/reading all user defined functions.
   * @param id The id of the {@link UserDefinedFunction}.
   */
  public userDefinedFunction(id: string): UserDefinedFunction {
    return new UserDefinedFunction(this.container, id, this.clientContext);
  }

  private $sprocs: StoredProcedures;
  /**
   * Operations for creating new stored procedures, and reading/querying all stored procedures.
   *
   * For reading, replacing, or deleting an existing stored procedure, use `.storedProcedure(id)`.
   */
  public get storedProcedures(): StoredProcedures {
    if (!this.$sprocs) {
      this.$sprocs = new StoredProcedures(this.container, this.clientContext);
    }
    return this.$sprocs;
  }

  private $triggers: Triggers;
  /**
   * Operations for creating new triggers, and reading/querying all triggers.
   *
   * For reading, replacing, or deleting an existing trigger, use `.trigger(id)`.
   */
  public get triggers(): Triggers {
    if (!this.$triggers) {
      this.$triggers = new Triggers(this.container, this.clientContext);
    }
    return this.$triggers;
  }

  private $udfs: UserDefinedFunctions;
  /**
   * Operations for creating new user defined functions, and reading/querying all user defined functions.
   *
   * For reading, replacing, or deleting an existing user defined function, use `.userDefinedFunction(id)`.
   */
  public get userDefinedFunctions(): UserDefinedFunctions {
    if (!this.$udfs) {
      this.$udfs = new UserDefinedFunctions(this.container, this.clientContext);
    }
    return this.$udfs;
  }
}
