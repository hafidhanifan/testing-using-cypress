describe("Module carousel testing base on test case", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/");
  });

  it("carousel should slide automatically", () => {
    cy.get("#carouselExampleIndicators").should("be.visible");
    cy.get(".carousel-item").first().should("have.class", "active");
    cy.wait(5500);
    cy.get(".carousel-item").first().should("not.have.class", "active");
    cy.get(".carousel-item").eq(1).should("have.class", "active");
  });

  it("carousel should slide manualy", () => {
    cy.get("#carouselExampleIndicators").should("be.visible");
    cy.get(".carousel-item").first().should("have.class", "active");
    cy.get(".carousel-control-next").click();
    cy.get(".carousel-item").first().should("not.have.class", "active");
    cy.get(".carousel-item").eq(1).should("have.class", "active");
    cy.get(".carousel-control-prev").click();
    cy.get(".carousel-item").first().should("have.class", "active");
    cy.get(".carousel-item").eq(1).should("not.have.class", "active");
  });

  it("should not scroll the page down when carousel control is clicked rapidly", () => {
    cy.window().its("scrollY").should("equal", 0);
    cy.get(".carousel-control-next").click().click().click().click().click();
    cy.wait(500);
    cy.window().its("scrollY").should("equal", 0);
  });

  it("should continue to auto-play normally when the user switches pages", () => {
    cy.get("#carouselExampleIndicators").should("be.visible");
    cy.get(".card-title").contains("a", "Samsung galaxy s6").click();
    cy.get(".product-deatil").should("be.visible");
    cy.get("#navbarExample").contains("a.nav-link", "Home").click();
    cy.get(".carousel-item").first().should("have.class", "active");
    cy.wait(5500);
    cy.get(".carousel-item").first().should("not.have.class", "active");
    cy.get(".carousel-item").eq(1).should("have.class", "active");
  });
});
