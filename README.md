# Agentic Design System — Starter

[![CI](https://github.com/peterspiegelcom/Agentic-Design-System-Starter/actions/workflows/ci.yml/badge.svg)](https://github.com/peterspiegelcom/Agentic-Design-System-Starter/actions/workflows/ci.yml)

> Behavioral Requirements (Contract Stories) mit lauffähiger Build-&-Verifikations-Pipeline — die Methode aus [*Agentic Design Systems*](https://peter-spiegel.medium.com/86829290139e) zum Anklicken. Von Peter Spiegel · peter-spiegel.com

Ein durchsetzbarer Vertrag für das Bauen mit KI. Die Idee: Anforderungen,
Verhalten und Akzeptanz leben in **einem** maschinenlesbaren Artefakt — der
*Behavioral Requirement* (oder *Contract Story*). Kein separates Pflichtenheft,
keine verstreuten Tickets.

## Die drei Ebenen

1. **Evidenz (RE)** — `evidence/` : Atomic Research, Kette
   Experiment → Fact → Insight → Recommendation. Jede Story verweist darauf.
2. **Verträge** — `contracts/` + `tokens/`
   - **UI Contract** : `tokens/tokens.json` (W3C-DTCG) + Komponenten via Code Connect.
   - **UX Contract** : `contracts/stories/*.yaml` — Verhalten, Zustände, A11y, Akzeptanz.
3. **Build & Verifikation** — `features/` (abgeleitetes Gherkin) + CI (Playwright, axe).

## Fluss

Register (Recommendation) → Story (`contracts/stories`) → Build-Agent liest Story
→ CI führt `features/*.feature` aus → Mensch sichert das Verhalten fachlich ab
→ Abweichungen zurück in Token / Komponente / Story.

## Eine Story ist gleichzeitig …

User Story (`story`) · UX Contract (`verhalten`, `zustaende`, `nicht_funktional`) ·
ausführbares Testprotokoll (`akzeptanz`) · Traceability (`evidenz`, `dimension`).

## Evidenz ist ein Verweis, kein Abzug

`evidenz` zeigt auf eine Recommendation (ID), nicht auf deren Inhalt. Das Register füllt sich nach und nach — Facts, Konfidenz und Validierung wachsen darunter weiter, ohne dass die Story angefasst wird. Referenziere die Recommendation als stabilen Anker (viele-zu-viele erlaubt); alles Wachsende bleibt im Register und wird live gelesen.

## Disziplin

`verhalten` bleibt kurz, `akzeptanz` trägt den testbaren Biss. Romane in `verhalten`
= Wasserfall 2.0. Die Story bleibt eine Story — nur vollständig.

## Build & Verifikation ausführen

```bash
npm ci
npx playwright install --with-deps chromium
npm test                 # Verhalten (features) + axe-A11y-Check
npm run test:contracts   # Contract Stories gegen das JSON-Schema validieren
```

`features/ergebnis-herleitung.feature` ist der lesbare Vertrag;
`tests/ergebnis-herleitung.spec.ts` ist sein **ausführbarer Spiegel** (1:1, mit
Mapping-Kommentaren je Given/When/Then). Wer die `.feature` *literal* ausführen
will, kann `playwright-bdd` ergänzen — das Prinzip bleibt gleich.

## Layout

```
contracts/   UX Contract (Stories) + JSON-Schema
tokens/      UI Contract (Design Tokens, W3C-DTCG)
evidence/    Evidenzregister (Atomic Research)
features/    Gherkin — der Vertrag, menschlich lesbar
tests/       ausführbarer Spiegel (Playwright) + axe-A11y
app/         minimale App unter Test
scripts/     Contract-Validator
.github/     CI: Verträge validieren + Verhalten & Barrierefreiheit prüfen
```

Die CI (`.github/workflows/ci.yml`) läuft zweigleisig: **Verträge validieren**
(Schema) und **Verhalten & Barrierefreiheit prüfen** (Playwright + axe).


## Eine neue Contract Story schreiben

Stories leben als .yaml unter contracts/stories/. Du schreibst sie nicht von
Hand aus — du beschreibst sie, die KI formt sie gegen das Schema, du gibst
fachlich frei.
Beschreiben — in normalen Worten: wer, was, wozu; gewünschtes Verhalten;
woran man Erfolg erkennt; welche Recommendation aus dem Register sie umsetzt.
Formen lassen — Claude Code schreibt daraus eine valide .yaml nach
contracts/schema/behavioral-requirement.schema.json.
Fachlich prüfen — verhalten kurz halten, akzeptanz auf den testbaren
Biss abklopfen.
Committen — die CI validiert die Struktur und führt die Akzeptanz aus.
Prompt-Vorlage für Claude Code
Schreib eine neue Contract Story als
contracts/stories/STORY-<nr>-<slug>.yaml,
valide gegen contracts/schema/behavioral-requirement.schema.json.

Zweck: Als <Rolle> will ich <Ziel>, damit <Nutzen>.
Verhalten (kurz, EARS „Wenn …, soll das System …"): <…>
Zustände: <…>
Barrierefreiheit / NFA: <…>
Akzeptanz (Given / When / Then): <…>
Evidenz (Recommendation-ID aus dem Register): R-<nr>
Dimension (ISO 9241-110): <…>

Halte `verhalten` kurz; der testbare Biss gehört in `akzeptanz`.
Leite anschließend features/<slug>.feature aus der Akzeptanz ab.
​
Die Recommendation-ID verbindet die Story zurück ins Evidenzregister — der Anker
bleibt stabil, während die Evidenz darunter weiter wächst.
