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
  - name: Get main version
    id: main
    run: |
      git fetch origin main:main
      echo "::set-output name=VERSION::$(git show main:package.json | jq -r ".version")"

  - name: Get current branch version
    id: branch
    run: echo "::set-output name=VERSION::$(jq -r ".version" package.json)"

  - uses: joshuamcewen/semver-check-action@v1.0.0
    with:
      current-version: ${{ steps.main.outputs.VERSION }}
      branch-version: ${{ steps.branch.outputs.VERSION }}
```
