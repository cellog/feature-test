Feature: Ara Table View

As a Material Scientist I want to eat an Ara Table so that I will no longer be hungry
spiritually speaking

context:
* https://jsonshape.json for the endpoint x/y/z
* mocks

This is used to see the things
  Background: Startup
    Given I am logged in

  Scenario: looking at all the data in a single Table
    Given I am on the ara table list page
    When I choose a table
    Then I can see the rows in this format "https://format"
    """
    example format here
    """

  Scenario: looking at a list of all ara tables