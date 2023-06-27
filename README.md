# SemVer Check Action

This action is intended for validating version increments as part of CI. It does this by taking two version as inputs, a `current_version` and a `branch_version` and asserts that the `branch_version` in one major, minor or patch increment above the `current_version`.

## Inputs

### `current_version`
**Required** Version for default/integrated branch.

### `branch_version`
**Required** Version for branch under CI.

## Example Usage

```yaml
uses: joshuamcewen/semver-check-action@0.0.1
with:
  current-version: '0.0.1'
  branch-version: '0.0.2'
```

### Pulling from package.json
```yaml
uses: joshuamcewen/semver-check-action@0.0.1
with:
  current-version: $(jq -r ".version" | git show main:package.json)
  branch-version: $(jq -r ".version" | package.json)
```
