// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import * as os from "os";
import * as child_process from "child_process";
import { diag } from "@opentelemetry/api";

export class FileAccessControl {
  private static ICACLS_PATH = `${process.env.systemdrive}/windows/system32/icacls.exe`;
  private static POWERSHELL_PATH = `${process.env.systemdrive}/windows/system32/windowspowershell/v1.0/powershell.exe`;
  private static ACLED_DIRECTORIES: { [id: string]: boolean } = {};
  private static ACL_IDENTITY: string | null = null;
  private static OS_FILE_PROTECTION_CHECKED = false;
  public static OS_PROVIDES_FILE_PROTECTION = false;
  public static USE_ICACLS = os.type() === "Windows_NT";

  // Check if file access control could be enabled
  public static checkFileProtection() {
    if (
      !FileAccessControl.OS_PROVIDES_FILE_PROTECTION &&
      !FileAccessControl.OS_FILE_PROTECTION_CHECKED
    ) {
      FileAccessControl.OS_FILE_PROTECTION_CHECKED = true;
      // Node's chmod levels do not appropriately restrict file access on Windows
      // Use the built-in command line tool ICACLS on Windows to properly restrict
      // access to the temporary directory used for disk retry mode.
      if (FileAccessControl.USE_ICACLS) {
        // This should be async - but it's currently safer to have this synchronous
        // This guarantees we can immediately fail setDiskRetryMode if we need to
        try {
          FileAccessControl.OS_PROVIDES_FILE_PROTECTION = fs.existsSync(
            FileAccessControl.ICACLS_PATH
          );
        } catch (e: any) {
          // Ignore error
        }
        if (!FileAccessControl.OS_PROVIDES_FILE_PROTECTION) {
          diag.warn(
            "Could not find ICACLS in expected location! This is necessary to use disk retry mode on Windows."
          );
        }
      } else {
        // chmod works everywhere else
        FileAccessControl.OS_PROVIDES_FILE_PROTECTION = true;
      }
    }
  }

  public static async applyACLRules(directory: string): Promise<void> {
    if (FileAccessControl.USE_ICACLS) {
      if (FileAccessControl.ACLED_DIRECTORIES[directory] === undefined) {
        // Avoid multiple calls race condition by setting ACLED_DIRECTORIES to false for this directory immediately
        // If batches are being failed faster than the processes spawned below return, some data won't be stored to disk
        // This is better than the alternative of potentially infinitely spawned processes
        FileAccessControl.ACLED_DIRECTORIES[directory] = false;
        try {
          // Restrict this directory to only current user and administrator access
          let identity = await this._getACLIdentity();
          await this._runICACLS(this._getACLArguments(directory, identity));
          FileAccessControl.ACLED_DIRECTORIES[directory] = true;
        } catch (ex: any) {
          FileAccessControl.ACLED_DIRECTORIES[directory] = false; // false is used to cache failed (vs undefined which is "not yet tried")
          throw ex;
        }
      } else {
        if (!FileAccessControl.ACLED_DIRECTORIES[directory]) {
          throw new Error("Setting ACL restrictions did not succeed (cached result)");
        }
      }
    }
  }

  public static applyACLRulesSync(directory: string) {
    if (FileAccessControl.USE_ICACLS) {
      // For performance, only run ACL rules if we haven't already during this session
      if (FileAccessControl.ACLED_DIRECTORIES[directory] === undefined) {
        this._runICACLSSync(this._getACLArguments(directory, this._getACLIdentitySync()));
        FileAccessControl.ACLED_DIRECTORIES[directory] = true; // If we get here, it succeeded. _runIACLSSync will throw on failures
        return;
      } else if (!FileAccessControl.ACLED_DIRECTORIES[directory]) {
        // falsy but not undefined
        throw new Error("Setting ACL restrictions did not succeed (cached result)");
      }
    }
  }

  private static _runICACLS(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      var aclProc = child_process.spawn(FileAccessControl.ICACLS_PATH, args, <any>{
        windowsHide: true,
      });
      aclProc.on("error", (e: Error) => reject(e));
      aclProc.on("close", (code: number) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`Setting ACL restrictions did not succeed (ICACLS returned code ${code})`)
          );
        }
      });
    });
  }

  private static _runICACLSSync(args: string[]) {
    // Some very old versions of Node (< 0.11) don't have this
    if (child_process.spawnSync) {
      var aclProc = child_process.spawnSync(FileAccessControl.ICACLS_PATH, args, <any>{
        windowsHide: true,
      });
      if (aclProc.error) {
        throw aclProc.error;
      } else if (aclProc.status !== 0) {
        throw new Error(
          `Setting ACL restrictions did not succeed (ICACLS returned code ${aclProc.status})`
        );
      }
    } else {
      throw new Error("Could not synchronously call ICACLS under current version of Node.js");
    }
  }

  private static _getACLIdentity(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (FileAccessControl.ACL_IDENTITY) {
        resolve(FileAccessControl.ACL_IDENTITY);
      }
      var psProc = child_process.spawn(
        FileAccessControl.POWERSHELL_PATH,
        ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"],
        <any>{
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"], // Needed to prevent hanging on Win 7
        }
      );
      let data = "";
      psProc.stdout.on("data", (d: string) => (data += d));
      psProc.on("error", (e: Error) => reject(e));
      psProc.on("close", (code: number) => {
        FileAccessControl.ACL_IDENTITY = data && data.trim();
        if (code === 0) {
          resolve(FileAccessControl.ACL_IDENTITY);
        } else {
          reject(new Error(`Getting ACL identity did not succeed (PS returned code ${code})`));
        }
      });
    });
  }

  private static _getACLIdentitySync() {
    if (FileAccessControl.ACL_IDENTITY) {
      return FileAccessControl.ACL_IDENTITY;
    }
    // Some very old versions of Node (< 0.11) don't have this
    if (child_process.spawnSync) {
      var psProc = child_process.spawnSync(
        FileAccessControl.POWERSHELL_PATH,
        ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"],
        <any>{
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"], // Needed to prevent hanging on Win 7
        }
      );
      if (psProc.error) {
        throw psProc.error;
      } else if (psProc.status !== 0) {
        throw new Error(`Getting ACL identity did not succeed (PS returned code ${psProc.status})`);
      }
      FileAccessControl.ACL_IDENTITY = psProc.stdout && psProc.stdout.toString().trim();
      return FileAccessControl.ACL_IDENTITY;
    } else {
      throw new Error("Could not synchronously get ACL identity under current version of Node.js");
    }
  }

  private static _getACLArguments(directory: string, identity: string) {
    return [
      directory,
      "/grant",
      "*S-1-5-32-544:(OI)(CI)F", // Full permission for Administrators
      "/grant",
      `${identity}:(OI)(CI)F`, // Full permission for current user
      "/inheritance:r",
    ]; // Remove all inherited permissions
  }
}
