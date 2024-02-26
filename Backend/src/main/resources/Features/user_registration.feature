Feature: User Registration

  Scenario Outline: User successfully registers
    Given a user with username "john_doe" and password "password123"
    When the user registers
    Then the registration is successful

    Examples:
      | username  | password    |
      | john_doe   | password123 |

