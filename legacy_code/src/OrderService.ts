export type ShippingType = "STANDARD" | "EXPRESS" | "OVERNIGHT";

export interface Order {
    orderId: number;
    shippingType: ShippingType | string;
    weightKg: number;
    distanceKm: number;
    fragile: boolean;
}


export class OrderService {
   async getOrder(orderId: number): Promise<Order> {
        const response = await fetch(
            `https://codemanship.co.uk/api/orders.php?orderId=${orderId}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const order: Order = await response.json();

        return order
    }
}