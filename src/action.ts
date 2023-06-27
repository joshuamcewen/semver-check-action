// @ts-ignore
import { setup } from "../.pnp.cjs";
setup();

import { getInput, error, info } from "@actions/core";
import semver from "semver";
import process from "process";

const red = (value: string) => `\u001b[31m${value}\u001b[39m`;
const green = (value: string) => `\u001b[32m${value}\u001b[39m`;
const magenta = (value: string) => `\u001b[35m${value}\u001b[39m`;
const cyan = (value: string) => `\u001b[36m${value}\u001b[39m`;

export const run = () => {
  const currentVersion = getInput("current-version");
  if (!semver.valid(currentVersion)) {
    error(`Current version (${red(currentVersion)}) is not a valid.`);
    process.exit(1);
    return;
  }

  const branchVersion = getInput("branch-version");
  if (!semver.valid(branchVersion)) {
    error(`Branch version (${red(branchVersion)}) is not a valid.`);
    process.exit(1);
    return;
  }

  const nextPatchVersion = semver.inc(currentVersion, "patch") || "";
  const nextMinorVersion = semver.inc(currentVersion, "minor") || "";
  const nextMajorVersion = semver.inc(currentVersion, "major") || "";

  const validVersions = [nextPatchVersion, nextMinorVersion, nextMajorVersion];

  if (!validVersions.includes(branchVersion)) {
    error(`Current branch version ${red(branchVersion)} is not one of:`);
    error(`• ${magenta("Patch")} version: ${magenta(nextPatchVersion)}`);
    error(`• ${cyan("Minor")} version: ${cyan(nextMinorVersion)}`);
    error(`• ${green("Major")} version: ${green(nextMajorVersion)}`);
    process.exit(1);
    return;
  }

  info(`${green(branchVersion)} is valid.`);
  process.exit(0);
};
