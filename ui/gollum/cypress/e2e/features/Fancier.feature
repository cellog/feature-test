Feature: Fancier
  Background:
    Given I am logged in
    And I am viewing a project containing workflows
    
  Scenario: Navigating to the New Workflow Builder Page
    Given I am on page 2
    When I activate a button with text "Hi"
    Then I get happy