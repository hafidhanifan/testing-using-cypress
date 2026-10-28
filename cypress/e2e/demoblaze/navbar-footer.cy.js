describe("Module navigation and footer testing base on test case", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/");
  });

  it("should showing navigation in every page", () => {
    cy.get("#navbarExample").should("be.visible");
    cy.get(".card-title").contains("a", "Samsung galaxy s6").click();
    cy.get("#navbarExample").should("be.visible");
  });

  it("should navigate to the correct section and display the accessible information when the navbar is clicked", () => {
    cy.get("#navbarExample").contains("a.nav-link", "Home").click();
    cy.get("#contcont").should("be.visible");

    cy.get("#navbarExample").contains("a.nav-link", "Contact").click();
    cy.contains("New message").should("be.visible");

    cy.get("#navbarExample").contains("a.nav-link", "About us").click();
    cy.contains("About us").should("be.visible");
    cy.wait(500);
    cy.get("#videoModal .modal-footer").contains("button", "Close").click();
    cy.get("#videoModal").should("not.be.visible");

    cy.get("#navbarExample").contains("a.nav-link", "Cart").click();
    cy.contains("Cart").should("be.visible");

    cy.get("#navbarExample").contains("a.nav-link", "Log in").click();
    cy.contains("Log in").should("be.visible");

    cy.get("#navbarExample").contains("a.nav-link", "Sign up").click();
    cy.contains("Sign up").should("be.visible");
  });

  it("should display footer information on Home and Cart pages", () => {
    cy.get("#fotcont").should("be.visible");
    cy.get("#fotcont").should("contain", "About Us");
    cy.get("#fotcont").should("contain", "Get in Touch");
    cy.get("#navbarExample").contains("a.nav-link", "Cart").click();
    cy.contains("Products").should("be.visible");
    cy.get("#fotcont").should("be.visible");
    cy.get("#fotcont").should("contain", "About Us");
    cy.get("#fotcont").should("contain", "Get in Touch");
  });
});
