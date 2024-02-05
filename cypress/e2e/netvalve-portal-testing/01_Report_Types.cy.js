/// <reference types="cypress" />
import reportsPage from "../../fixtures/objects/reportsPage.json"

describe('Netvalve Portal - E2E Testing', () => {

    beforeEach(() => {
        cy.login();
    })

    it("01 - Report Types - Approval rate", () => {

        cy.get(reportsPage.reportsMenuBtn).click();
        cy.get(reportsPage.approvalRateType).click({ force: true });

        cy.get(reportsPage.approvalRateChart).should("be.visible");
        cy.get(reportsPage.approvalRateTable).should("be.visible");
        cy.get(reportsPage.downloadOrExportBtn).trigger("mouseover");

        cy.get(reportsPage.pdfReportBtn).should("be.visible");
        cy.get(reportsPage.excelReportBtn).should("be.visible");
    })

    it('02 - Report Types - Batch', () => {
        cy.get(reportsPage.reportsMenuBtn).click();
        cy.get(reportsPage.batchType).click({ force: true });

        cy.get(reportsPage.batchLineChart).should("be.visible");
        cy.get(reportsPage.batchTable).should("be.visible");
        cy.get(reportsPage.downloadOrExportBtn).trigger("mouseover");

        cy.get(reportsPage.pdfReportBtn).should("be.visible");
        cy.get(reportsPage.excelReportBtn).should("be.visible");
    });

    it('03 - Report Types - Transactions Export', () => {
        cy.get(reportsPage.reportsMenuBtn).click();
        cy.get(reportsPage.transactionsExportType).click({ force: true });

        cy.get(reportsPage.downloadOrExportBtn).trigger("mouseover");
        cy.get(reportsPage.excelReportBtn).should("be.visible");
    });

});

