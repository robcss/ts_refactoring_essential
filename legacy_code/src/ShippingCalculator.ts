type ShippingType = "STANDARD" | "EXPRESS" | "OVERNIGHT";

interface Order {
    orderId: number;
    shippingType: ShippingType | string;
    weightKg: number;
    distanceKm: number;
    fragile: boolean;
}

export class ShippingCalculator {

    async calculateShipping(orderId: number): Promise<number> {
        try {
            const response = await fetch(
                `https://codemanship.co.uk/api/orders.php?orderId=${orderId}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const json = await response.json();
            const order: Order = json;

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