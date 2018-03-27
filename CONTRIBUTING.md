<!--
# Copyright (C) 2017 Resin.io, UNI Passau, FBK.
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Public License 2.0
# which accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-2.0/
# 
# SPDX-License-Identifier: EPL-2.0
# 
# Contributors:
#     Resin.io, UNI Passau, FBK - initial API and implementation
-->

### Contributing

To manage versioning and auto generate our [`CHANGELOG.md`](/CHANGELOG.md) we use [versionist](https://github.com/resin-io/versionist). Therefore we need to adhere to some conventions when contributing.

## Commit Messages

Every PR must contain one commit that follows the commit conventions.

Commit message template

```
<subject> (required)

<message> (not required)

<footers> (required)
```

eg:
```
Fixed problem x

problem x was reported in issue #1. Fixed by doing Y.

Change-Type: patch
```

This footer can be any of the following:
  * `Change-Type: patch`
  * `Change-Type: minor`
  * `Change-Type: major`

You have the flexibility to use this tag in as many commits as you see fit; in
the end, the resulting change type for the scope of the PR will be folded
down to the biggest one as marked in the commits (`major`>`minor`>`patch`)

Commits marked with the `Change-Type` tag will have their subject added as an
entry in the generated CHANGELOG.md. If you want to override
this default behavior and add your own changelog entry instead, you can use the
optional `Changelog-Entry: <custom changelog entry>` tag in `Change-Type`-tagged commits.

## Adding Services

TODO: All services should be versioned and tagged when pulling from dockerhub.

## Creating a Release

Releasing a new version:

```
npm run versionist
```

```
git tag <new-version>
```

```
git push origin v1.3.0
```

Announce on [gitter](https://gitter.im/Agile-IoT) :tada
