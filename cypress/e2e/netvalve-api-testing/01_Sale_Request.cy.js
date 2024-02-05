/// <reference types="cypress" />
import keys from "../../fixtures/keys.json"
import api from "../../fixtures/api.json"

describe('Netvalve - API Testing - Sale Endpoint', () => {

    const successResponseCode = "GTW_1000";

    it('01 - Sale API - Valid Transaction', () => {
        var randomOrderId = Cypress.getRandomNumber(6);
        var successMessage = "Transaction Approved/ Request Successful.";

        cy.request({
            method: "POST",
            url: api.postSaleUrl,
            body: {
                amount: 7,
                cardExpireMonth: "12",
                cardExpireYear: "2025",
                cardHolderName: "John Doe",
                cardNumber: "6011000993026909",
                clientOrderId: randomOrderId,
                currency: "EUR",
                customerAddress: "Test Address",
                customerCity: "Dubai",
                customerCountryCode: "VA",
                customerEmail: "test@test.com",
                customerIp: "123.123.123.123",
                customerName: "Netvalve",
                customerLastName: "Test",
                customerPhone: "800-1234567",
                customerState: "VA",
                customerZipCode: "85284",
                netvalveMidId: "64ade011-1331-4871-88a3-83bde0a6dc65"
            },
            headers: {
                "netvalve-client-id": keys.clientId,
                "netvalve-api-key": keys.apiKey
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.responseCode).to.eq(successResponseCode)
            expect(response.body.responseMessage).to.eq(successMessage);
            expect(response.body.responseCodeType).to.eq("APPROVED");
        })
    });

    it('Invalid card number', () => {
        var randomOrderId = Cypress.getRandomNumber(5);
        cy.request({
            method: "POST",
            url: api.postSaleUrl,
            failOnStatusCode: false,
            body: {
                amount: 7,
                cardExpireMonth: "12",
                cardExpireYear: "2025",
                cardHolderName: "John Doe",
                cardNumber: "111111111111",
                clientOrderId: randomOrderId,
                currency: "EUR",
                customerAddress: "Test Address",
                customerCity: "Dubai",
                customerCountryCode: "VA",
                customerEmail: "test@test.com",
                customerIp: "123.123.123.123",
                customerName: "Netvalve",
                customerLastName: "Test",
                customerPhone: "800-1234567",
                customerState: "VA",
                customerZipCode: "85284",
                netvalveMidId: "64ade011-1331-4871-88a3-83bde0a6dc65"
            },
            headers: {
                "netvalve-client-id": keys.clientId,
                "netvalve-api-key": keys.apiKey
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body[0].responseCode).to.eq("GTW_2034")
            expect(response.body[0].responseMessage).to.eq("Validation error for field = cardNumber  Message:- Card Number Invalid.");
            expect(response.body[0].responseCodeType).to.eq("SOFT DECLINE");
        })
    });
})