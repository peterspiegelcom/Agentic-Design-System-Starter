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
