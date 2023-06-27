"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core_1 = require("@actions/core");
const semver_1 = __importDefault(require("semver"));
const process_1 = __importDefault(require("process"));
const red = (value) => `\u001b[31m${value}\u001b[39m`;
const green = (value) => `\u001b[32m${value}\u001b[39m`;
const magenta = (value) => `\u001b[35m${value}\u001b[39m`;
const cyan = (value) => `\u001b[36m${value}\u001b[39m`;
const run = () => {
    const currentVersion = (0, core_1.getInput)("current_version");
    const nextPatchVersion = semver_1.default.inc(currentVersion, "patch") || "";
    const nextMinorVersion = semver_1.default.inc(currentVersion, "minor") || "";
    const nextMajorVersion = semver_1.default.inc(currentVersion, "major") || "";
    const validVersions = [nextPatchVersion, nextMinorVersion, nextMajorVersion];
    const branchVersion = (0, core_1.getInput)("branch_version");
    if (!validVersions.includes(branchVersion)) {
        console.log(`Current branch version ${red(branchVersion)} is not one of:`);
        console.log(`• ${magenta("Patch")} version: ${magenta(nextPatchVersion)}`);
        console.log(`• ${cyan("Minor")} version: ${cyan(nextMinorVersion)}`);
        console.log(`• ${green("Major")} version: ${green(nextMajorVersion)}`);
        process_1.default.exit(1);
        return;
    }
    process_1.default.exit(0);
};
exports.run = run;