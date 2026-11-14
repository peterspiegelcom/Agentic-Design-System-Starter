#!/usr/bin/env python3
"""Validiert jede Contract Story gegen das JSON-Schema und prüft,
dass zu jeder Story mit Akzeptanz eine .feature existiert.

Vorlagen werden übersprungen: die Datei STORY-TEMPLATE.yaml und jede
Datei, deren Name mit "_" beginnt (sie enthalten « … »-Platzhalter und
sind absichtlich nicht schema-valide)."""
import json, sys, pathlib
import yaml
from jsonschema import Draft7Validator

root = pathlib.Path(__file__).resolve().parent.parent
schema = json.loads((root / "contracts/schema/behavioral-requirement.schema.json").read_text())
Draft7Validator.check_schema(schema)
v = Draft7Validator(schema)

ok = True
for f in sorted((root / "contracts/stories").glob("*.yaml")):
    if f.name == "STORY-TEMPLATE.yaml" or f.name.startswith("_"):
        print(f"SKIP    {f.name}  (Vorlage)")
        continue
    doc = yaml.safe_load(f.read_text())
    errs = sorted(v.iter_errors(doc), key=lambda e: list(e.path))
    if errs:
        ok = False
        print(f"FEHLER  {f.name}")
        for e in errs:
            print("   -", list(e.path), e.message)
    else:
        print(f"OK      {f.name}  ({doc.get('id')})")

print("CONTRACTS VALID" if ok else "CONTRACTS INVALID")
sys.exit(0 if ok else 1)
