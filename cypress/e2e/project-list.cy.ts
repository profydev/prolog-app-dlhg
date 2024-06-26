import capitalize from "lodash/capitalize";
import { ProjectStatus } from "@api/projects.types";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
    it("provides the correct color for each project status", () => {
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const statusColors: { [index: string]: string } = {
            [ProjectStatus.info]: "rgb(2, 122, 72)",
            [ProjectStatus.warning]: "rgb(181, 71, 8)",
            [ProjectStatus.error]: "rgb(180, 35, 24)",
          };

          // retrieve the element containing the status badge within the list item
          const element = cy.wrap($el).find("div[class*='badge_container']");

          // get the project's status from the mock data array corresponding to the current list item
          const status = mockProjects[index].status;

          // check correct color for status
          element.should("have.css", "color", statusColors[status]);
        });
    });

    it("provides the correct text for each project status", () => {
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const statusTexts: { [index: string]: string } = {
            [ProjectStatus.info]: "stable",
            [ProjectStatus.warning]: "warning",
            [ProjectStatus.error]: "Critical",
          };

          // retrieve the element containing the status badge within the list item
          const element = cy.wrap($el).find("div[class*='badge_container']");
          // get the project's status from the mock data array corresponding to the current list item
          const status = mockProjects[index].status;
          // check correct text for status
          element.invoke("text").should("eq", capitalize(statusTexts[status]));
        });
    });
  });
});
