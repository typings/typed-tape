import { Readable } from 'stream';
import { EventEmitter } from 'events';

/**
 * Create a new test with an optional name string. cb(t) fires with the new test object t once all preceeding tests have finished. Tests execute serially.
 */
declare function tape (name: string, options: tape.Options, cb: tape.TestCase): tape.Test;
declare function tape (name: string, cb: tape.TestCase): tape.Test;
declare function tape (options: tape.Options, cb: tape.TestCase): tape.Test;
declare function tape (cb: tape.TestCase): tape.Test;

declare module tape {
  export interface TestCase {
    (test: Test): any;
  }

  export interface Options extends Object {
    skip?: boolean;
    timeout?: number;
  }

  /**
   * Tap compat.
   */
  export const test: typeof tape;

  /**
   * Generate a new test that will be skipped over.
   */
  export function skip (cb: tape.TestCase): tape.Test;
  export function skip (name: string, cb: tape.TestCase): tape.Test;
  export function skip (name: string, options: tape.Options, cb: tape.TestCase): tape.Test;

  /**
   * Like test(name, cb) except if you use .only this is the only test case that will run for the entire process, all other test cases using tape will be ignored
   */
  export function only (name: string, cb: tape.TestCase): tape.Test;
  export function only (name: string, options: tape.Options, cb: tape.TestCase): tape.Test;

  /**
   * Create a new test harness instance, which is a function like test(), but with a new pending stack and test state.
   */
  export function createHarness (): typeof tape;

  /**
   * Create a stream of output, bypassing the default output stream that writes messages to console.log().
   */
  export function createStream (opts?: any): Readable;

  export function onFinish (cb: (err?: Error) => any): void;

  export class Test extends EventEmitter {
    name: string;
    assertCount: number;
    pendingCount: number;

    /**
     * Run the test suite.
     */
    run (): void;

    /**
     * Create a subtest with a new test handle st from cb(st) inside the current test  cb(st) will only fire when t finishes. Additional tests queued up after t will not be run until all subtests finish.
     */
    test (name: string, cb: tape.TestCase): void;

    /**
     * Emit a TAP comment.
     */
    comment (message: string): void;

    /**
     * Declare that n assertions should be run. end() will be called automatically after the nth assertion. If there are any more assertions after the nth, or after end() is called, they will generate errors.
     */
    plan (n: number): void;

    /**
     * Timeout this test after `ms` milliseconds.
     */
    timeoutAfter (ms: number): void;

    /**
     * Declare the end of a test explicitly.
     */
    end (err?: any): void;

    /**
     * Generate a failing assertion with a message msg.
     */
    fail (msg?: string): void;

    /**
     * Generate a passing assertion with a message msg.
     */
    pass (msg?: string): void;

    /**
     * Generate an assertion that will be skipped over.
     */
    skip (msg?: string): void;

    /**
     * Assert that value is truthy with an optional description message msg.
     */
    ok (value: any, msg?: string): void;
    true (value: any, msg?: string): void;
    assert (value: any, msg?: string): void;

    /**
     * Assert that value is falsy with an optional description message msg.
     */
    notOk (value: any, msg?: string): void;
    false (value: any, msg?: string): void;
    notok (value: any, msg?: string): void;

    /**
     * Assert that err is falsy. If err is non-falsy, use its err.message as the description message.
     */
    error (err: any, msg?: string): void;
    ifError (err: any, msg?: string): void;
    ifErr (err: any, msg?: string): void;
    iferror (err: any, msg?: string): void;

    /**
     * Assert that actual === expected with an optional description msg.
     */
    equal (actual: any, expected: any, msg?: string): void;
    equals (actual: any, expected: any, msg?: string): void;
    isEqual (actual: any, expected: any, msg?: string): void;
    is (actual: any, expected: any, msg?: string): void;
    strictEqual (actual: any, expected: any, msg?: string): void;
    strictEquals (actual: any, expected: any, msg?: string): void;

    /**
     * Assert that actual !== expected with an optional description msg.
     */
    notEqual (actual: any, expected: any, msg?: string): void;
    notEquals (actual: any, expected: any, msg?: string): void;
    notStrictEqual (actual: any, expected: any, msg?: string): void;
    notStrictEquals (actual: any, expected: any, msg?: string): void;
    isNotEqual (actual: any, expected: any, msg?: string): void;
    isNot (actual: any, expected: any, msg?: string): void;
    not (actual: any, expected: any, msg?: string): void;
    doesNotEqual (actual: any, expected: any, msg?: string): void;
    isInequal (actual: any, expected: any, msg?: string): void;

    /**
     * Assert that actual and expected have the same structure and nested values using node's deepEqual() algorithm with strict comparisons (===) on leaf nodes and an optional description msg.
     */
    deepEqual (actual: any, expected: any, msg?: string): void;
    deepEquals (actual: any, expected: any, msg?: string): void;
    isEquivalent (actual: any, expected: any, msg?: string): void;
    same (actual: any, expected: any, msg?: string): void;

    /**
     * Assert that actual and expected do not have the same structure and nested values using node's deepEqual() algorithm with strict comparisons (===) on leaf nodes and an optional description msg.
     */
    notDeepEqual (actual: any, expected: any, msg?: string): void;
    notEquivalent (actual: any, expected: any, msg?: string): void;
    notDeeply (actual: any, expected: any, msg?: string): void;
    notSame (actual: any, expected: any, msg?: string): void;
    isNotDeepEqual (actual: any, expected: any, msg?: string): void;
    isNotDeeply (actual: any, expected: any, msg?: string): void;
    isNotEquivalent (actual: any, expected: any, msg?: string): void;
    isInequivalent (actual: any, expected: any, msg?: string): void;

    /**
     * Assert that actual and expected have the same structure and nested values using node's deepEqual() algorithm with loose comparisons (==) on leaf nodes and an optional description msg.
     */
    deepLooseEqual (actual: any, expected: any, msg?: string): void;
    looseEqual (actual: any, expected: any, msg?: string): void;
    looseEquals (actual: any, expected: any, msg?: string): void;

    /**
     * Assert that actual and expected do not have the same structure and nested values using node's deepEqual() algorithm with loose comparisons (==) on leaf nodes and an optional description msg.
     */
    notDeepLooseEqual(actual: any, expected: any, msg?: string): void;
    notLooseEqual (actual: any, expected: any, msg?: string): void;
    notLooseEquals (actual: any, expected: any, msg?: string): void;

    /**
     * Assert that the function call fn() throws an exception.
     */
    throws (fn: () => any, msg?: string): void;
    throws (fn: () => any, expected: RegExp | Function, msg?: string): void;

    /**
     * Assert that the function call fn() does not throw an exception.
     */
    doesNotThrow(fn: () => void, msg?: string): void;
    doesNotThrow(fn: () => void, expected: any, msg?: string): void;

    static skip (cb: tape.TestCase): tape.Test;
    static skip (name: string, cb: tape.TestCase): tape.Test;
    static skip (name: string, options: tape.Options, cb: tape.TestCase): tape.Test;
  }
}

export = tape;
