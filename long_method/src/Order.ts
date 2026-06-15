export class Order {
    private items: OrderItem[];
    private customer: Customer;

    constructor(items: OrderItem[], customer: Customer) {
        this.items = items;
        this.customer = customer;
    }

    public summarise(): OrderSummary {
        // Validation
        if (this.items == null) {
            throw new Error("Items cannot be null");
        }
        if (this.items.length === 0) {
            throw new Error("Order must contain items");
        }

        // Subtotal calculation
        let subtotal = 0.0;
        for (const item of this.items) {
            subtotal += item.getPrice() * item.getQuantity();
        }

        // Discount rules
        let discount = 0.0;
        if (this.customer.isLoyal()) {
            discount = subtotal * 0.10;
        } else if (subtotal > 100) {
            discount = subtotal * 0.05;
        }

        // Tax calculation
        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * 0.20;

        // Total calculation
        const total = taxableAmount + tax;

        return new OrderSummary(subtotal, discount, tax, total);
    }
}

export class Customer {
    private loyal: boolean;

    constructor(loyal: boolean) {
        this.loyal = loyal;
    }

    public isLoyal(): boolean {
        return this.loyal;
    }
}

export class OrderItem {
    private price: number;
    private quantity: number;

    constructor(price: number, quantity: number) {
        this.price = price;
        this.quantity = quantity;
    }

    public getPrice(): number {
        return this.price;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}

export class OrderSummary {
    private subtotal: number;
    private discount: number;
    private tax: number;
    private total: number;

    constructor(subtotal: number, discount: number, tax: number, total: number) {
        this.subtotal = subtotal;
        this.discount = discount;
        this.tax = tax;
        this.total = total;
    }

    public getSubtotal(): number {
        return this.subtotal;
    }

    public getDiscount(): number {
        return this.discount;
    }

    public getTax(): number {
        return this.tax;
    }

    public getTotal(): number {
        return this.total;
    }
}