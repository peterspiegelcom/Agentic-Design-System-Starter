Agentic Design System — Starter

CI

Behavioral Requirements (Contract Stories) mit lauffähiger Build-&-Verifikations-Pipeline — die Methode aus Agentic Design Systems zum Anklicken. Von Peter Spiegel · peter-spiegel.com

Ein durchsetzbarer Vertrag für das Bauen mit KI. Die Idee: Anforderungen, Verhalten und Akzeptanz leben in einem maschinenlesbaren Artefakt — der Behavioral Requirement (oder Contract Story). Kein separates Pflichtenheft, keine verstreuten Tickets.

Die drei Ebenen
Evidenz (RE) — evidence/ : Atomic Research, Kette Experiment → Fact → Insight → Recommendation. Jede Story verweist darauf.
Verträge — contracts/ + tokens/
UI Contract : tokens/tokens.json (W3C-DTCG) + Komponenten via Code Connect.
UX Contract : contracts/stories/*.yaml — Verhalten, Zustände, Akzeptanz.
Baseline : contracts/quality-and-context.yaml — Qualität & Nutzungskontext, einmal global. Jede Story erbt daraus.
Build & Verifikation — features/ (abgeleitetes Gherkin) + CI (Playwright, axe).
Fluss

Register (Recommendation) → Story (contracts/stories) → Build-Agent liest Story → CI führt features/*.feature aus → Mensch sichert das Verhalten fachlich ab → Abweichungen zurück in Token / Komponente / Story.

Eine Story ist gleichzeitig …

User Story (story) · UX Contract (verhalten, zustaende) · ausführbares Testprotokoll (akzeptanz) · Traceability (evidenz, dimension) · Kontext (baseline, nutzergruppe — geerbt, nicht wiederholt).

Qualität & Kontext — einmal global

Qualitätsattribute und Nutzungskontext stehen nicht in jeder Story. Der Barrierefreiheits-Standard, das Performance-Budget, die DSGVO, die Nutzergruppen und ihre Umgebung liegen querliegend in einer Datei: contracts/quality-and-context.yaml (Grundlage: ISO 9241-11 Nutzungskontext, ISO 9241-110 Dialogprinzipien, WCAG 2.1 AA als Floor).

Eine Story deklariert nur, woran sie hängt, und erbt den Rest:

yaml
baseline: quality-and-context   # erbt den universellen Floor (WCAG AA, DSGVO, Performance)
nutzergruppe: [primaer]         # erbt zusätzlich die Anforderungen dieser Gruppe

Der Floor gilt für alle Gruppen — Behinderung verteilt sich über jede Gruppe. Gruppenspezifisch ist nur, was den Inhalt betrifft: Sprache, Leseniveau, Vorlesen. Ändert sich ein Standard, ändert sich diese eine Datei — nicht jede Story.

Evidenz ist ein Verweis, kein Abzug

evidenz zeigt auf eine Recommendation (ID), nicht auf deren Inhalt. Das Register füllt sich nach und nach — Facts, Konfidenz und Validierung wachsen darunter weiter, ohne dass die Story angefasst wird. Referenziere die Recommendation als stabilen Anker (viele-zu-viele erlaubt); alles Wachsende bleibt im Register und wird live gelesen.

Disziplin

verhalten bleibt kurz, akzeptanz trägt den testbaren Biss. Romane in verhalten = Wasserfall 2.0. Die Story bleibt eine Story — nur vollständig.

Build & Verifikation ausführen
bash
npm ci
npx playwright install --with-deps chromium
npm test                 # Verhalten (features) + axe-A11y-Check
npm run test:contracts   # Contract Stories gegen das JSON-Schema validieren

features/ergebnis-herleitung.feature ist der lesbare Vertrag; tests/ergebnis-herleitung.spec.ts ist sein ausführbarer Spiegel (1:1, mit Mapping-Kommentaren je Given/When/Then). Wer die .feature literal ausführen will, kann playwright-bdd ergänzen — das Prinzip bleibt gleich.

Layout
contracts/
  quality-and-context.yaml   Baseline: Qualität & Nutzungskontext (global, geerbt)
  stories/                   UX Contract — Contract Stories (+ STORY-TEMPLATE.yaml)
  schema/                    JSON-Schema, gegen das jede Story validiert
tokens/      UI Contract (Design Tokens, W3C-DTCG)
evidence/    Evidenzregister (Atomic Research)
features/    Gherkin — der Vertrag, menschlich lesbar
tests/       ausführbarer Spiegel (Playwright) + axe-A11y
app/         minimale App unter Test
scripts/     Contract-Validator
.github/     CI: Verträge validieren + Verhalten & Barrierefreiheit prüfen

Die CI (.github/workflows/ci.yml) läuft zweigleisig: Verträge validieren (Schema) und Verhalten & Barrierefreiheit prüfen (Playwright + axe).

Eine neue Contract Story schreiben

Stories leben als .yaml unter contracts/stories/. Du schreibst sie nicht von Hand aus — du beschreibst sie, die KI formt sie gegen das Schema, du gibst fachlich frei. contracts/stories/STORY-TEMPLATE.yaml ist der blanko Startpunkt.

Beschreiben — in normalen Worten: wer, was, wozu; gewünschtes Verhalten; woran man Erfolg erkennt; welche Recommendation aus dem Register sie umsetzt; für welche Nutzergruppe.
Formen lassen — Claude Code schreibt daraus eine valide .yaml nach contracts/schema/behavioral-requirement.schema.json.
Fachlich prüfen — verhalten kurz halten, akzeptanz auf den testbaren Biss abklopfen.
Committen — die CI validiert die Struktur und führt die Akzeptanz aus.
Prompt-Vorlage für Claude Code
Schreib eine neue Contract Story als
contracts/stories/STORY-<nr>-<slug>.yaml,
valide gegen contracts/schema/behavioral-requirement.schema.json.

Zweck: Als <Rolle> will ich <Ziel>, damit <Nutzen>.
Verhalten (kurz, EARS „Wenn …, soll das System …"): <…>
Zustände: <…>
Nutzergruppe(n): primaer / sekundaer   # erbt Qualität & Kontext aus der Baseline
Akzeptanz (Given / When / Then): <…>
Evidenz (Recommendation-ID aus dem Register): R-<nr>
Dimension (ISO 9241-110): <…>

Setze baseline: quality-and-context und nutzergruppe entsprechend.
Qualität/Kontext NICHT wiederholen — nur echte Abweichungen nach nicht_funktional.
Halte `verhalten` kurz; der testbare Biss gehört in `akzeptanz`.
Leite anschließend features/<slug>.feature aus der Akzeptanz ab.

Die Recommendation-ID verbindet die Story zurück ins Evidenzregister — der Anker bleibt stabil, während die Evidenz darunter weiter wächst.
