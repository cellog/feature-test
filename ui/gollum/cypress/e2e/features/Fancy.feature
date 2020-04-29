Feature: Fancy Stuff
  Background: Startup
    Given I am logged in
    And I am awesome
    
  Scenario: Table sorting
    Given I am viewing project "[PRELOAD] Seeding Project v5"
    When I choose the Project Roster tab
    Then Permissions should be visible