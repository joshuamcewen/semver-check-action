import { describe, it, mock, afterEach } from "node:test";
import assert from "assert";
import { run } from "../index";
import process from "process";

describe("action", () => {
  it("prints valid versions and exits with exit code 1 when invalid version", () => {
    const mockExit = mock.fn();
    process.exit = mockExit as never;

    const mockLog = mock.fn();
    console.log = mockLog as never;

    process.env.INPUT_CURRENT_VERSION = "0.0.1";
    process.env.INPUT_BRANCH_VERSION = "0.0.1";

    run();
    assert.equal(mockExit.mock.calls.length, 1);
    assert.deepEqual(mockExit.mock.calls[0].arguments, [1]);

    assert.equal(mockLog.mock.calls.length, 4);
    assert.deepEqual(
      mockLog.mock.calls.map((call) => call.arguments[0]),
      [
        "Current branch version \x1B[31m0.0.1\x1B[39m is not one of:",
        "• \x1B[35mPatch\x1B[39m version: \x1B[35m0.0.2\x1B[39m",
        "• \x1B[36mMinor\x1B[39m version: \x1B[36m0.1.0\x1B[39m",
        "• \x1B[32mMajor\x1B[39m version: \x1B[32m1.0.0\x1B[39m",
      ]
    );

    mock.reset();
  });

  it("exits with exit code 0 when valid patch version", () => {
    const mockExit = mock.fn();
    process.exit = mockExit as never;

    process.env.INPUT_CURRENT_VERSION = "0.0.1";
    process.env.INPUT_BRANCH_VERSION = "0.0.2";

    run();
    assert.equal(mockExit.mock.calls.length, 1);
    assert.deepEqual(mockExit.mock.calls[0].arguments, [0]);
  });

  it("exits with exit code 0 when valid minor version", () => {
    const mockExit = mock.fn();
    process.exit = mockExit as never;

    process.env.INPUT_CURRENT_VERSION = "0.0.1";
    process.env.INPUT_BRANCH_VERSION = "0.1.0";

    run();
    assert.equal(mockExit.mock.calls.length, 1);
    assert.deepEqual(mockExit.mock.calls[0].arguments, [0]);
  });

  it("exits with exit code 0 when valid major version", () => {
    const mockExit = mock.fn();
    process.exit = mockExit as never;

    process.env.INPUT_CURRENT_VERSION = "0.0.1";
    process.env.INPUT_BRANCH_VERSION = "1.0.0";

    run();
    assert.equal(mockExit.mock.calls.length, 1);
    assert.deepEqual(mockExit.mock.calls[0].arguments, [0]);
  });
});
