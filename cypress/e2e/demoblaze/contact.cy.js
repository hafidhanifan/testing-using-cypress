describe("Module concact testing base on test case", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/");
  });

  it("should showing modal form contact", () => {
    cy.get("#navbarExample").contains("a.nav-link", "Contact").click();
    cy.contains("New message").should("be.visible");
  });

  it("should show an error when inputting an invalid email format", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert");
    });

    cy.get("#navbarExample").contains("a.nav-link", "Contact").click();
    cy.contains("New message").should("be.visible");
    cy.get("#recipient-email").type("user.gmail.com");
    cy.get("#recipient-name").type("user");
    cy.get("#message-text").type("user messages");
    cy.get(".modal-footer").contains("button", "Send message").click();
    cy.get("#exampleModal").should("be.visible");
    cy.get("#errors").should("not.be.empty");
    cy.get("@windowAlert").should("not.have.been.called");
  });

  it("should show an error when all the form fields are empty", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert");
    });

    cy.get("#navbarExample").contains("a.nav-link", "Contact").click();
    cy.contains("New message").should("be.visible");
    cy.get(".modal-footer").contains("button", "Send message").click();
    cy.get("#exampleModal").should("be.visible");
    cy.get("#errors").should("not.be.empty");
    cy.get("@windowAlert").should("not.have.been.called");
  });

  it("should send a message successfully and show success alert", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert");
    });

    cy.get("#navbarExample").contains("a.nav-link", "Contact").click();
    cy.contains("New message").should("be.visible");
    cy.get("#recipient-email").type("user@gmail.com");
    cy.get("#recipient-name").type("user");
    cy.get("#message-text").type("user messages");
    cy.get(".modal-footer").contains("button", "Send message").click();
    cy.get("@windowAlert").should(
      "have.been.calledWith",
      "Thanks for the message!!",
    );
  });

  it("should close the modal when close button is clicked", () => {
    cy.get("#navbarExample").contains("a.nav-link", "Contact").click();
    cy.contains("New message").should("be.visible");
    cy.wait(500);
    cy.get(".modal-footer").contains("button", "Close").click();
    cy.get("#exampleModal").should("not.be.visible");
  });
});
