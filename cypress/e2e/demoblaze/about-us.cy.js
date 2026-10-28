describe("Module about us testing base on test case", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com/");
  });

  it("should showing modal about us and company video", () => {
    cy.get("#navbarExample").contains("a.nav-link", "About us").click();
    cy.get("#videoModal").should("be.visible");
  });

  it("should test video player controls (Play, Pause, Mute, Skip)", () => {
    cy.get("#navbarExample").contains("a.nav-link", "About us").click();
    cy.get("#videoModal").should("be.visible");
    cy.wait(500);

    cy.get("#videoModal video")
      .should("be.visible")
      .then(($video) => {
        const video = $video[0];
        video.play();
        expect(video.paused).to.be.false;
        video.pause();
        expect(video.paused).to.be.true;
        video.muted = true;
        expect(video.muted).to.be.true;
        video.muted = false;
        expect(video.muted).to.be.false;
        video.currentTime = 10;
        expect(video.currentTime).to.be.closeTo(10, 0.5);
        expect(typeof video.requestFullscreen).to.equal("function");
        if (document.pictureInPictureEnabled) {
          expect(typeof video.requestPictureInPicture).to.equal("function");
        }
      });
  });

  it("should close the modal when close button is clicked and user still can explore the website", () => {
    cy.get("#navbarExample").contains("a.nav-link", "About us").click();
    cy.contains("About us").should("be.visible");
    cy.wait(500);
    cy.get("#videoModal .modal-footer").contains("button", "Close").click();
    cy.get("#videoModal").should("not.be.visible");
  });

  it("allow user to continue exploring the website after closed the modal", () => {
    cy.get("#navbarExample").contains("a.nav-link", "About us").click();
    cy.contains("About us").should("be.visible");
    cy.wait(500);
    cy.get("#videoModal .modal-footer").contains("button", "Close").click();
    cy.get("#videoModal").should("not.be.visible");
    cy.get(".card-title").contains("a", "Samsung galaxy s6").click();
    cy.get(".product-deatil").should("be.visible");
  });
});
