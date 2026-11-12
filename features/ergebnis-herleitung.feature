# Abgeleitet aus contracts/stories/STORY-042-ergebnis-herleitung.yaml
# evidenz: I-3, R-4 · dimension: Selbstbeschreibung
Feature: Ergebnis-Herleitung

  Scenario: Herleitung öffnen und widersprechen
    Given ich bin auf der Profilseite
    When ich an einer Kompetenz auf "Warum?" tippe
    Then sehe ich die Herleitung
    And ich kann der Einschätzung widersprechen
