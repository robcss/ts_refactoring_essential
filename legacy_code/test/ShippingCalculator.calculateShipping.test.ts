
import { strict as assert } from "assert";
import { describe, it } from "node:test";
import { ShippingCalculator } from "../src/ShippingCalculator";
import { Order, OrderService } from "../src/OrderService";

// {"orderId":1001,"shippingType":"STANDARD","weightKg":5,"distanceKm":120,"fragile":false}

class FakeOrderService extends OrderService {
    order: Order;

    constructor(order: Order) {
        super();
        this.order = order
    }

    getOrder(orderId: number): Promise<Order> {
        return this.order as unknown as Promise<Order>
    }

}

describe("ShippingCalculator.calculateShipping", () => {

    it("", async () => {

        const calculator = new ShippingCalculator()
        
        const order: Order = {orderId: 1001, shippingType: "STANDARD", weightKg: 5, distanceKm: 120, fragile: false }
        
        const orderService = new FakeOrderService(order)

        const shippingCost = await calculator.calculateShipping(1001, orderService)

        assert.equal(shippingCost, 2.5);
    });
});