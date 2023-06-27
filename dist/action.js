"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// @ts-ignore
const _pnp_cjs_1 = require("../.pnp.cjs");
(0, _pnp_cjs_1.setup)();
const core_1 = require("@actions/core");
const semver_1 = __importDefault(require("semver"));
const process_1 = __importDefault(require("process"));
const red = (value) => `\u001b[31m${value}\u001b[39m`;
const green = (value) => `\u001b[32m${value}\u001b[39m`;
const magenta = (value) => `\u001b[35m${value}\u001b[39m`;
const cyan = (value) => `\u001b[36m${value}\u001b[39m`;
const run = () => {
    const currentVersion = (0, core_1.getInput)("current-version");
    if (!semver_1.default.valid(currentVersion)) {
        (0, core_1.error)(`Current version (${red(currentVersion)}) is not a valid.`);
        process_1.default.exit(1);
        return;
    }
    const branchVersion = (0, core_1.getInput)("branch-version");
    if (!semver_1.default.valid(branchVersion)) {
        (0, core_1.error)(`Branch version (${red(branchVersion)}) is not a valid.`);
        process_1.default.exit(1);
        return;
    }
    const nextPatchVersion = semver_1.default.inc(currentVersion, "patch") || "";
    const nextMinorVersion = semver_1.default.inc(currentVersion, "minor") || "";
    const nextMajorVersion = semver_1.default.inc(currentVersion, "major") || "";
    const validVersions = [nextPatchVersion, nextMinorVersion, nextMajorVersion];
    if (!validVersions.includes(branchVersion)) {
        (0, core_1.error)(`Current branch version ${red(branchVersion)} is not one of:`);
        (0, core_1.error)(`• ${magenta("Patch")} version: ${magenta(nextPatchVersion)}`);
        (0, core_1.error)(`• ${cyan("Minor")} version: ${cyan(nextMinorVersion)}`);
        (0, core_1.error)(`• ${green("Major")} version: ${green(nextMajorVersion)}`);
        process_1.default.exit(1);
        return;
    }
    (0, core_1.info)(`${green(branchVersion)} is valid.`);
    process_1.default.exit(0);
};
exports.run = run;
