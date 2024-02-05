import keys from "../../fixtures/keys.json"
import api from "../../fixtures/api.json"

describe('Netvalve - API Testing - Authorization Endpoint', () => { 

    const successResponseCode = "GTW_1000";
    
    it('Authorization API - Valid Authorization', () => {

        var randomOrderId = Cypress.getRandomNumber(6);
        var successMessage = "Transaction Approved/ Request Successful.";
        var transactionId;

        cy.request({
            method: "POST",
            url: api.postAuthorizeUrl,
            body: {
                amount: 10,
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
            transactionId = response.body.transactionID;
            cy.log(transactionId);
            expect(response.status).to.eq(200);
            expect(response.body.responseCode).to.eq(successResponseCode)
            expect(response.body.responseMessage).to.eq(successMessage);
            expect(response.body.responseCodeType).to.eq("APPROVED");

            // Get the previous authorization by ID to check if its' status is actually "Authorised" in the response
            cy.request({
                method: "GET",
                url: api.baseApiUrl,
                qs:{
                    id: transactionId
                },
                headers: {
                    "netvalve-client-id": keys.clientId,
                    "netvalve-api-key": keys.apiKey
                }      
            }).then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                expect(getResponse.body.status).to.eq("Authorised");
            })
        })
    });
    });

