/// <reference types="cypress" />

describe("The App componet", () => {
  context("Should ", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("render the search bar component", () => {
      cy.get(".search-box").should("have.length", 1);
    });

    it("render the episodes list component", () => {
      cy.get(".episodes-container").should("have.length", 1);
    });

    it("not render the episodes component initially ", () => {
      cy.get(".container").should("have.length", 0);
    });
  });

  context("Should fetch movies given the name of the movie", () => {
    it("fetches all movies that go by the name Girls", () => {
      cy.server();
      cy.route("GET", "**/http://api.tvmaze.com/search/shows?q=?**").as(
        "create"
      );
      cy.visit("/");

      cy.get(".search-txt").type("Girls {enter}");

      cy.wait("@create");

      cy.get(".container").should("have.length", 10);
      cy.get(".container").each($el => {
        expect($el.text()).to.include( "Girls");
      });
    });
  });

  context("Should return the screen to the way it was  ", ()=> {
    it("if no series was found", () => {
      cy.server();
      cy.route("GET", "**/http://api.tvmaze.com/search/shows?q=?**").as(
        "create"
      );
      cy.visit("/");

      cy.get(".search-txt").type("12sd32 {enter}");
      cy.wait("@create");
      cy.get(".episodes-container").should("have.text", "Search for a series")
      cy.get(".container").should("have.length", 0);
    })
  })
});
