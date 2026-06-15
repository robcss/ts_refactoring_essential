import { describe, it } from "mocha";
import assert from "assert";

import { Order, OrderItem, Customer, OrderSummary } from "../src/Order";

describe("OrderTest", () => {
    it("summarise_calculatesCorrectSummary_forNonLoyalCustomer_underThreshold", () => {
        const order = new Order(
            [
                new OrderItem(10.0, 2), // 20
                new OrderItem(5.0, 2),  // 10
            ],
            new Customer(false)
        );

        const summary = order.summarise();

        assert.strictEqual(summary.getSubtotal(), 30.0);
        assert.strictEqual(summary.getDiscount(), 0.0);
        assert.strictEqual(summary.getTax(), 6.0);
        assert.strictEqual(summary.getTotal(), 36.0);
    });

    it("summarise_appliesLoyalCustomerDiscount", () => {
        const order = new Order(
            [new OrderItem(50.0, 1)],
            new Customer(true)
        );

        const summary = order.summarise();

        assert.strictEqual(summary.getSubtotal(), 50.0);
        assert.strictEqual(summary.getDiscount(), 5.0);
        assert.strictEqual(summary.getTax(), 9.0);
        assert.strictEqual(summary.getTotal(), 54.0);
    });

    it("summarise_appliesBulkDiscount_forNonLoyalCustomer_overThreshold", () => {
        const order = new Order(
            [new OrderItem(120.0, 1)],
            new Customer(false)
        );

        const summary = order.summarise();

        assert.strictEqual(summary.getSubtotal(), 120.0);
        assert.strictEqual(summary.getDiscount(), 6.0);
        assert.strictEqual(summary.getTax(), 22.8);
        assert.strictEqual(summary.getTotal(), 136.8);
    });

    // -------------------------
    // Guard conditions
    // -------------------------

    it("summarise_throwsException_whenItemsIsNull", () => {
        const order = new Order(null as any, new Customer(false));

        assert.throws(
            () => order.summarise(),
            (err: any) => {
                return (
                    err instanceof Error &&
                    err.message === "Items cannot be null"
                );
            }
        );
    });

    it("summarise_throwsException_whenItemsIsEmpty", () => {
        const order = new Order([], new Customer(false));

        assert.throws(
            () => order.summarise(),
            (err: any) => {
                return (
                    err instanceof Error &&
                    err.message === "Order must contain items"
                );
            }
        );
    });

    // -------------------------
    // Boundary test
    // -------------------------

    it("summarise_noDiscount_whenNonLoyalCustomer_atThreshold", () => {
        const order = new Order(
            [new OrderItem(100.0, 1)],
            new Customer(false)
        );

        const summary = order.summarise();

        assert.strictEqual(summary.getSubtotal(), 100.0);
        assert.strictEqual(summary.getDiscount(), 0.0);
        assert.strictEqual(summary.getTax(), 20.0);
        assert.strictEqual(summary.getTotal(), 120.0);
    });
});