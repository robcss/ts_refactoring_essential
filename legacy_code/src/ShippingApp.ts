import {ShippingCalculator} from "./ShippingCalculator";

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        console.log("Usage: ts-node ShippingApp.ts <orderId>");
        return;
    }

    const orderId = Number.parseInt(args[0], 10);

    if (Number.isNaN(orderId)) {
        console.log("orderId must be a number");
        return;
    }

    const calculator = new ShippingCalculator();

    try {
        const cost = await calculator.calculateShipping(orderId);

        console.log(`Order ID: ${orderId}`);
        console.log(`Shipping cost: ${cost}`);
    } catch (e) {
        console.log(`Failed to calculate shipping for order ${orderId}`);
        console.error(e);
    }
}

main();