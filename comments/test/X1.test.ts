import "mocha"
import { strict as assert } from "assert";
import { X1 } from "../src/X1";
import {describe, it} from "node:test";

describe("X1", () => {
    it("t1", () => {
        const a = 7;
        const b = 12;

        // Expected: sum of squares from 7 to 12
        let expected = 0;
        for (let i = a; i <= b; i++) {
            expected += i * i;
        }

        const actual = X1.m(a, b);

        assert.equal(actual, expected);
    });
});