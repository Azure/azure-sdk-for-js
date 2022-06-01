// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import {
  toAccessControlItem,
  toAccessControlItemString,
  toAcl,
  toAclString,
  toBlobEndpointUrl,
  toContainerPublicAccessType,
  toDfsEndpointUrl,
  toPermissions,
  toPermissionsString,
  toProperties,
  toPublicAccessType,
  toRolePermissions,
  toRolePermissionsString,
} from "../src/transforms";

describe("transforms", () => {
  it("toBlobEndpointUrl", () => {
    assert.deepStrictEqual(
      toBlobEndpointUrl("http://account.blob.core.windows.net"),
      "http://account.blob.core.windows.net"
    );
    assert.deepStrictEqual(
      toBlobEndpointUrl("http://account.dfs.core.windows.net"),
      "http://account.blob.core.windows.net"
    );
    assert.deepStrictEqual(toBlobEndpointUrl("http://127.0.0.1:10000"), "http://127.0.0.1:10000");
    assert.deepStrictEqual(
      toBlobEndpointUrl("http://account.blob.core.windows.net/abc"),
      "http://account.blob.core.windows.net/abc"
    );
    assert.deepStrictEqual(
      toBlobEndpointUrl("http://account.dfs.core.windows.net/abc"),
      "http://account.blob.core.windows.net/abc"
    );
    assert.deepStrictEqual(
      toBlobEndpointUrl("http://127.0.0.1:10000/abc"),
      "http://127.0.0.1:10000/abc"
    );
    assert.deepStrictEqual(toBlobEndpointUrl("http://localhost"), "http://localhost");
    assert.deepStrictEqual(toBlobEndpointUrl("invalidurl"), "invalidurl");
  });

  it("toDfsEndpointUrl", () => {
    assert.deepStrictEqual(
      toDfsEndpointUrl("http://account.blob.core.windows.net"),
      "http://account.dfs.core.windows.net"
    );
    assert.deepStrictEqual(
      toDfsEndpointUrl("http://account.dfs.core.windows.net"),
      "http://account.dfs.core.windows.net"
    );
    assert.deepStrictEqual(toDfsEndpointUrl("http://127.0.0.1:10000"), "http://127.0.0.1:10000");
    assert.deepStrictEqual(
      toDfsEndpointUrl("http://account.blob.core.windows.net/abc"),
      "http://account.dfs.core.windows.net/abc"
    );
    assert.deepStrictEqual(
      toDfsEndpointUrl("http://account.dfs.core.windows.net/abc"),
      "http://account.dfs.core.windows.net/abc"
    );
    assert.deepStrictEqual(
      toDfsEndpointUrl("http://127.0.0.1:10000/abc"),
      "http://127.0.0.1:10000/abc"
    );
    assert.deepStrictEqual(toDfsEndpointUrl("http://localhost"), "http://localhost");
    assert.deepStrictEqual(toDfsEndpointUrl("invalidurl"), "invalidurl");
  });

  it("toContainerPublicAccessType", () => {
    assert.deepStrictEqual(toContainerPublicAccessType("filesystem"), "container");
    assert.deepStrictEqual(toContainerPublicAccessType("file"), "blob");
    assert.deepStrictEqual(toContainerPublicAccessType(), undefined);
  });

  it("toPublicAccessType", () => {
    assert.deepStrictEqual(toPublicAccessType("container"), "filesystem");
    assert.deepStrictEqual(toPublicAccessType("blob"), "file");
    assert.deepStrictEqual(toPublicAccessType(), undefined);
  });

  it("toProperties", () => {
    assert.deepStrictEqual(toProperties(undefined), undefined);
    assert.deepStrictEqual(toProperties({ val: "Val" }), "val=VmFs");
    assert.deepStrictEqual(toProperties({ num: "200" }), "num=MjAw");
    assert.deepStrictEqual(toProperties({ val: "Val", num: "200" }), "val=VmFs,num=MjAw");
  });

  it("toRolePermissions", () => {
    assert.deepStrictEqual(toRolePermissions("rwx"), { read: true, write: true, execute: true });
    assert.deepStrictEqual(toRolePermissions("---"), { read: false, write: false, execute: false });
    assert.deepStrictEqual(toRolePermissions("r-x"), { read: true, write: false, execute: true });
    assert.deepStrictEqual(toRolePermissions("-w-"), { read: false, write: true, execute: false });

    assert.deepStrictEqual(toRolePermissions("RWX"), { read: true, write: true, execute: true });
    assert.deepStrictEqual(toRolePermissions("---"), { read: false, write: false, execute: false });
    assert.deepStrictEqual(toRolePermissions("R-X"), { read: true, write: false, execute: true });
    assert.deepStrictEqual(toRolePermissions("-W-"), { read: false, write: true, execute: false });

    assert.deepStrictEqual(toRolePermissions("rwx", true), {
      read: true,
      write: true,
      execute: true,
    });
    assert.deepStrictEqual(toRolePermissions("---", true), {
      read: false,
      write: false,
      execute: false,
    });
    assert.deepStrictEqual(toRolePermissions("r-x", true), {
      read: true,
      write: false,
      execute: true,
    });
    assert.deepStrictEqual(toRolePermissions("-w-", true), {
      read: false,
      write: true,
      execute: false,
    });

    assert.deepStrictEqual(toRolePermissions("rwt", true), {
      read: true,
      write: true,
      execute: true,
    });
    assert.deepStrictEqual(toRolePermissions("--t", true), {
      read: false,
      write: false,
      execute: true,
    });
    assert.deepStrictEqual(toRolePermissions("r-t", true), {
      read: true,
      write: false,
      execute: true,
    });
    assert.deepStrictEqual(toRolePermissions("-wt", true), {
      read: false,
      write: true,
      execute: true,
    });
  });

  it("toPermissions", () => {
    assert.deepStrictEqual(toPermissions(undefined), undefined);

    assert.deepStrictEqual(toPermissions("rwxrwxrwx"), {
      owner: { read: true, write: true, execute: true },
      group: { read: true, write: true, execute: true },
      other: { read: true, write: true, execute: true },
      stickyBit: false,
      extendedAcls: false,
    });

    assert.deepStrictEqual(toPermissions("RWXRWxrwx"), {
      owner: { read: true, write: true, execute: true },
      group: { read: true, write: true, execute: true },
      other: { read: true, write: true, execute: true },
      stickyBit: false,
      extendedAcls: false,
    });

    assert.deepStrictEqual(toPermissions("---------"), {
      owner: { read: false, write: false, execute: false },
      group: { read: false, write: false, execute: false },
      other: { read: false, write: false, execute: false },
      stickyBit: false,
      extendedAcls: false,
    });

    assert.deepStrictEqual(toPermissions("---------+"), {
      owner: { read: false, write: false, execute: false },
      group: { read: false, write: false, execute: false },
      other: { read: false, write: false, execute: false },
      stickyBit: false,
      extendedAcls: true,
    });

    assert.deepStrictEqual(toPermissions("--------t"), {
      owner: { read: false, write: false, execute: false },
      group: { read: false, write: false, execute: false },
      other: { read: false, write: false, execute: true },
      stickyBit: true,
      extendedAcls: false,
    });

    assert.deepStrictEqual(toPermissions("---R-x--T"), {
      owner: { read: false, write: false, execute: false },
      group: { read: true, write: false, execute: true },
      other: { read: false, write: false, execute: true },
      stickyBit: true,
      extendedAcls: false,
    });
  });

  it("toAccessControlItem", () => {
    assert.deepStrictEqual(toAccessControlItem("default:user:xxx:rwx"), {
      defaultScope: true,
      accessControlType: "user",
      entityId: "xxx",
      permissions: { read: true, write: true, execute: true },
    });

    assert.deepStrictEqual(toAccessControlItem("DEFAULT:USER:XXX:RWX"), {
      defaultScope: true,
      accessControlType: "user",
      entityId: "xxx",
      permissions: { read: true, write: true, execute: true },
    });

    assert.deepStrictEqual(toAccessControlItem("user:xxx:---"), {
      defaultScope: false,
      accessControlType: "user",
      entityId: "xxx",
      permissions: { read: false, write: false, execute: false },
    });

    assert.deepStrictEqual(toAccessControlItem("user:xxx:rw-"), {
      defaultScope: false,
      accessControlType: "user",
      entityId: "xxx",
      permissions: { read: true, write: true, execute: false },
    });

    assert.deepStrictEqual(toAccessControlItem("user:xxx:-w-"), {
      defaultScope: false,
      accessControlType: "user",
      entityId: "xxx",
      permissions: { read: false, write: true, execute: false },
    });
  });

  it("toAcl", () => {
    assert.deepStrictEqual(toAcl(), []);
    assert.deepStrictEqual(toAcl("default:user:xxx:rwx,user:xxx:rw-"), [
      {
        defaultScope: true,
        accessControlType: "user",
        entityId: "xxx",
        permissions: { read: true, write: true, execute: true },
      },
      {
        defaultScope: false,
        accessControlType: "user",
        entityId: "xxx",
        permissions: { read: true, write: true, execute: false },
      },
    ]);
    assert.deepStrictEqual(toAcl("user:xxx:---,user:xxx:-w-"), [
      {
        defaultScope: false,
        accessControlType: "user",
        entityId: "xxx",
        permissions: { read: false, write: false, execute: false },
      },
      {
        defaultScope: false,
        accessControlType: "user",
        entityId: "xxx",
        permissions: { read: false, write: true, execute: false },
      },
    ]);
  });

  it("toAccessControlItemString", () => {
    assert.deepStrictEqual(
      toAccessControlItemString({
        defaultScope: true,
        accessControlType: "user",
        entityId: "xxx",
        permissions: { read: true, write: true, execute: true },
      }),
      "default:user:xxx:rwx"
    );

    assert.deepStrictEqual(
      toAccessControlItemString({
        defaultScope: false,
        accessControlType: "user",
        entityId: "xxx",
        permissions: { read: false, write: false, execute: false },
      }),
      "user:xxx:---"
    );

    assert.deepStrictEqual(
      toAccessControlItemString({
        defaultScope: false,
        accessControlType: "user",
        entityId: "xxx",
        permissions: { read: true, write: true, execute: false },
      }),
      "user:xxx:rw-"
    );

    assert.deepStrictEqual(
      toAccessControlItemString({
        defaultScope: false,
        accessControlType: "user",
        entityId: "xxx",
        permissions: { read: false, write: true, execute: false },
      }),
      "user:xxx:-w-"
    );
  });

  it("toAclString", () => {
    assert.deepStrictEqual(toAclString([]), "");
    assert.deepStrictEqual(
      toAclString([
        {
          defaultScope: true,
          accessControlType: "user",
          entityId: "xxx",
          permissions: { read: true, write: true, execute: true },
        },
        {
          defaultScope: false,
          accessControlType: "user",
          entityId: "xxx",
          permissions: { read: true, write: true, execute: false },
        },
        {
          defaultScope: false,
          accessControlType: "user",
          entityId: "xxx",
          permissions: { read: false, write: false, execute: false },
        },
        {
          defaultScope: false,
          accessControlType: "user",
          entityId: "xxx",
          permissions: { read: false, write: true, execute: false },
        },
      ]),
      "default:user:xxx:rwx,user:xxx:rw-,user:xxx:---,user:xxx:-w-"
    );
  });

  it("toRolePermissionsString", () => {
    assert.deepStrictEqual(
      toRolePermissionsString({ read: true, write: true, execute: true }),
      "rwx"
    );
    assert.deepStrictEqual(
      toRolePermissionsString({ read: false, write: false, execute: false }),
      "---"
    );
    assert.deepStrictEqual(
      toRolePermissionsString({ read: true, write: false, execute: true }),
      "r-x"
    );
    assert.deepStrictEqual(
      toRolePermissionsString({ read: false, write: false, execute: true }),
      "--x"
    );
    assert.deepStrictEqual(
      toRolePermissionsString({ read: false, write: false, execute: true }, true),
      "--t"
    );
    assert.deepStrictEqual(
      toRolePermissionsString({ read: false, write: true, execute: false }, true),
      "-wt"
    );
  });

  it("toPermissionsString", () => {
    assert.deepStrictEqual(
      toPermissionsString({
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: true, execute: true },
        other: { read: true, write: true, execute: true },
        stickyBit: false,
        extendedAcls: false,
      }),
      "rwxrwxrwx"
    );

    assert.deepStrictEqual(
      toPermissionsString({
        owner: { read: false, write: false, execute: false },
        group: { read: false, write: false, execute: false },
        other: { read: false, write: false, execute: false },
        stickyBit: false,
        extendedAcls: false,
      }),
      "---------"
    );

    assert.deepStrictEqual(
      toPermissionsString({
        owner: { read: false, write: false, execute: false },
        group: { read: false, write: false, execute: false },
        other: { read: false, write: false, execute: false },
        stickyBit: false,
        extendedAcls: true,
      }),
      "---------+"
    );

    assert.deepStrictEqual(
      toPermissionsString({
        owner: { read: false, write: false, execute: false },
        group: { read: false, write: false, execute: false },
        other: { read: false, write: false, execute: true },
        stickyBit: true,
        extendedAcls: false,
      }),
      "--------t"
    );

    assert.deepStrictEqual(
      toPermissionsString({
        owner: { read: false, write: false, execute: false },
        group: { read: true, write: false, execute: true },
        other: { read: false, write: false, execute: true },
        stickyBit: true,
        extendedAcls: false,
      }),
      "---r-x--t"
    );
  });
});
