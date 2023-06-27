"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const assert_1 = __importDefault(require("assert"));
const action_1 = require("../action");
const process_1 = __importDefault(require("process"));
const core = __importStar(require("@actions/core"));
(0, node_test_1.describe)("action", () => {
    (0, node_test_1.it)("prints valid versions and exits with exit code 1 when invalid version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        const mockError = node_test_1.mock.fn();
        // @ts-ignore
        core.error = mockError;
        process_1.default.env["INPUT_CURRENT-VERSION"] = "0.0.1";
        process_1.default.env["INPUT_BRANCH-VERSION"] = "0.0.1";
        (0, action_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [1]);
        assert_1.default.equal(mockError.mock.calls.length, 4);
        assert_1.default.deepEqual(mockError.mock.calls.map((call) => call.arguments[0]), [
            "Current branch version \x1B[31m0.0.1\x1B[39m is not one of:",
            "• \x1B[35mPatch\x1B[39m version: \x1B[35m0.0.2\x1B[39m",
            "• \x1B[36mMinor\x1B[39m version: \x1B[36m0.1.0\x1B[39m",
            "• \x1B[32mMajor\x1B[39m version: \x1B[32m1.0.0\x1B[39m",
        ]);
    });
    (0, node_test_1.it)("prints error and exits with exit code 1 when badly formatted current version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        const mockError = node_test_1.mock.fn();
        // @ts-ignore
        core.error = mockError;
        process_1.default.env["INPUT_CURRENT-VERSION"] = "bad-current-version";
        process_1.default.env["INPUT_BRANCH-VERSION"] = "0.0.1";
        (0, action_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [1]);
        assert_1.default.equal(mockError.mock.calls.length, 1);
        assert_1.default.deepEqual(mockError.mock.calls[0].arguments, [
            "Current version (\x1B[31mbad-current-version\x1B[39m) is not a valid.",
        ]);
    });
    (0, node_test_1.it)("prints error and exits with exit code 1 when badly formatted branch version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        const mockError = node_test_1.mock.fn();
        // @ts-ignore
        core.error = mockError;
        process_1.default.env["INPUT_CURRENT-VERSION"] = "0.0.1";
        process_1.default.env["INPUT_BRANCH-VERSION"] = "bad-branch-version";
        (0, action_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [1]);
        assert_1.default.equal(mockError.mock.calls.length, 1);
        assert_1.default.deepEqual(mockError.mock.calls[0].arguments, [
            "Branch version (\x1B[31mbad-branch-version\x1B[39m) is not a valid.",
        ]);
    });
    (0, node_test_1.it)("exits with exit code 0 when valid patch version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        process_1.default.env["INPUT_CURRENT-VERSION"] = "0.0.1";
        process_1.default.env["INPUT_BRANCH-VERSION"] = "0.0.2";
        (0, action_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [0]);
    });
    (0, node_test_1.it)("exits with exit code 0 when valid minor version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        process_1.default.env["INPUT_CURRENT-VERSION"] = "0.0.1";
        process_1.default.env["INPUT_BRANCH-VERSION"] = "0.1.0";
        (0, action_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [0]);
    });
    (0, node_test_1.it)("exits with exit code 0 when valid major version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        process_1.default.env["INPUT_CURRENT-VERSION"] = "0.0.1";
        process_1.default.env["INPUT_BRANCH-VERSION"] = "1.0.0";
        (0, action_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [0]);
    });
});
