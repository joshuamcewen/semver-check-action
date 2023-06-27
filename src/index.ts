import { getInput } from "@actions/core";
import semver from "semver";
import process from "process";

const red = (value: string) => `\u001b[31m${value}\u001b[39m`;
const green = (value: string) => `\u001b[32m${value}\u001b[39m`;
const magenta = (value: string) => `\u001b[35m${value}\u001b[39m`;
const cyan = (value: string) => `\u001b[36m${value}\u001b[39m`;

export const run = () => {
  const currentVersion = getInput("current_version");

  const nextPatchVersion = semver.inc(currentVersion, "patch") || "";
  const nextMinorVersion = semver.inc(currentVersion, "minor") || "";
  const nextMajorVersion = semver.inc(currentVersion, "major") || "";

  const validVersions = [nextPatchVersion, nextMinorVersion, nextMajorVersion];
  const branchVersion = getInput("branch_version");

  if (!validVersions.includes(branchVersion)) {
    console.log(`Current branch version ${red(branchVersion)} is not one of:`);
    console.log(`• ${magenta("Patch")} version: ${magenta(nextPatchVersion)}`);
    console.log(`• ${cyan("Minor")} version: ${cyan(nextMinorVersion)}`);
    console.log(`• ${green("Major")} version: ${green(nextMajorVersion)}`);
    process.exit(1);
    return;
  }

  process.exit(0);
};