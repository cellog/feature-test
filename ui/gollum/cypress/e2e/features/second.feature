Feature: Feature 2

  Background: Startup
    Given I am viewing project "fredy"
    Given I am logged in
    Given I am viewing project "[PRELOAD] Seeding Project v5"

  Scenario: Viewing Project Roster tab
    When I choose the Project Roster tab
    Then Permissions should be visible

  Scenario: Table sorting
    When I choose the Project Roster tab
    Then Row 1 should be "akdubpyucj"
