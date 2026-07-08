import { Order, OrderService } from "./OrderService";


export class ShippingCalculator {

    async calculateShipping(orderId: number, orderService: OrderService): Promise<number> {
        try {

            const order: Order = await orderService.getOrder(orderId);

            switch (order.shippingType) {
                case "STANDARD":
                    return order.weightKg * 0.5;

                case "EXPRESS":
                    return order.weightKg * 0.8 + order.distanceKm * 0.1;

                case "OVERNIGHT":
                    return order.weightKg * 1.2 + 25;

                default:
                    throw new Error(`Unknown shipping type: ${order.shippingType}`);
            }

        } catch (e) {
            console.log(e);
            return -1;
        }
    }
}