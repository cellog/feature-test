Feature: Feature 4

  Background: Startup
    Given I am viewing the Gherkenizer
    Given I am logged in

  Scenario: Making a New Spec
    When I choose the New Spec button
    Then A text editor dialog opens

  Scenario: Saving the Spec
    When I choose the Save button
    Then a PR is opened in Gitlab in some repo somewhere.
