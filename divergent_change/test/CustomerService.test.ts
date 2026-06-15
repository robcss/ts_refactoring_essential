import { strict as assert } from "assert";
import { CustomerService } from "../src/CustomerService";
import {describe, it} from "node:test";

describe("CustomerService", () => {
    const service = new CustomerService();

    // -------------------------
    // isValidEmail tests
    // -------------------------

    describe("isValidEmail", () => {
        it("should return false when email is null", () => {
            assert.equal(service.isValidEmail(null), false);
        });

        it("should return false when email is empty", () => {
            assert.equal(service.isValidEmail(""), false);
        });

        it("should return false when missing @ symbol", () => {
            assert.equal(service.isValidEmail("invalid.email.com"), false);
        });

        it("should return false when missing local part", () => {
            assert.equal(service.isValidEmail("@domain.com"), false);
        });

        it("should return false when missing domain", () => {
            assert.equal(service.isValidEmail("user@"), false);
        });

        it("should return true when email is valid (with tag)", () => {
            assert.equal(
                service.isValidEmail("user.name+tag@example.com"),
                true
            );
        });

        it("should return true when simple valid email", () => {
            assert.equal(service.isValidEmail("user@example.com"), true);
        });
    });

    // -------------------------
    // formatDisplayName tests
    // -------------------------

    describe("formatDisplayName", () => {
        it("should trim and uppercase last name", () => {
            const result = service.formatDisplayName(" John ", " smith ");
            assert.equal(result, "John SMITH");
        });

        it("should handle empty strings", () => {
            const result = service.formatDisplayName("", "");
            assert.equal(result, " ");
        });

        it("should handle single character names", () => {
            const result = service.formatDisplayName("A", "b");
            assert.equal(result, "A B");
        });
    });

    // -------------------------
    // calculateLoyaltyPoints tests
    // -------------------------

    describe("calculateLoyaltyPoints", () => {
        it("should return zero when no purchases", () => {
            assert.equal(service.calculateLoyaltyPoints(0), 0);
        });

        it("should calculate correctly for positive values", () => {
            assert.equal(service.calculateLoyaltyPoints(5), 50);
        });

        it("should handle large numbers", () => {
            assert.equal(service.calculateLoyaltyPoints(10_000), 100_000);
        });

        it("should allow negative values but still multiply", () => {
            assert.equal(service.calculateLoyaltyPoints(-5), -50);
        });
    });

    // -------------------------
    // determineAccountStatus tests
    // -------------------------

    describe("determineAccountStatus", () => {
        it("should return INACTIVE when days over 365", () => {
            assert.equal(service.determineAccountStatus(366), "INACTIVE");
        });

        it("should return DORMANT when between 31 and 365", () => {
            assert.equal(service.determineAccountStatus(100), "DORMANT");
        });

        it("should return ACTIVE when 30 days or less", () => {
            assert.equal(service.determineAccountStatus(30), "ACTIVE");
            assert.equal(service.determineAccountStatus(0), "ACTIVE");
        });

        it("should treat negative days as active", () => {
            assert.equal(service.determineAccountStatus(-10), "ACTIVE");
        });
    });
});