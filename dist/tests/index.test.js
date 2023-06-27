"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const assert_1 = __importDefault(require("assert"));
const index_1 = require("../index");
const process_1 = __importDefault(require("process"));
(0, node_test_1.describe)("action", () => {
    (0, node_test_1.it)("prints valid versions and exits with exit code 1 when invalid version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        const mockLog = node_test_1.mock.fn();
        console.log = mockLog;
        process_1.default.env.INPUT_CURRENT_VERSION = "0.0.1";
        process_1.default.env.INPUT_BRANCH_VERSION = "0.0.1";
        (0, index_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [1]);
        assert_1.default.equal(mockLog.mock.calls.length, 4);
        assert_1.default.deepEqual(mockLog.mock.calls.map((call) => call.arguments[0]), [
            "Current branch version \x1B[31m0.0.1\x1B[39m is not one of:",
            "• \x1B[35mPatch\x1B[39m version: \x1B[35m0.0.2\x1B[39m",
            "• \x1B[36mMinor\x1B[39m version: \x1B[36m0.1.0\x1B[39m",
            "• \x1B[32mMajor\x1B[39m version: \x1B[32m1.0.0\x1B[39m",
        ]);
        node_test_1.mock.reset();
    });
    (0, node_test_1.it)("exits with exit code 0 when valid patch version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        process_1.default.env.INPUT_CURRENT_VERSION = "0.0.1";
        process_1.default.env.INPUT_BRANCH_VERSION = "0.0.2";
        (0, index_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [0]);
    });
    (0, node_test_1.it)("exits with exit code 0 when valid minor version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        process_1.default.env.INPUT_CURRENT_VERSION = "0.0.1";
        process_1.default.env.INPUT_BRANCH_VERSION = "0.1.0";
        (0, index_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [0]);
    });
    (0, node_test_1.it)("exits with exit code 0 when valid major version", () => {
        const mockExit = node_test_1.mock.fn();
        process_1.default.exit = mockExit;
        process_1.default.env.INPUT_CURRENT_VERSION = "0.0.1";
        process_1.default.env.INPUT_BRANCH_VERSION = "1.0.0";
        (0, index_1.run)();
        assert_1.default.equal(mockExit.mock.calls.length, 1);
        assert_1.default.deepEqual(mockExit.mock.calls[0].arguments, [0]);
    });
});
