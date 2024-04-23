# scrollable-element

## Usage

You do **not** have to build or compile this project in order to use it.
However, we provide you with every option to do so. We believe this provides the best integration into your existing build/bundle processe(s).

### Generic Web Components

#### Quick Demo

`example.html` in the root of this project is a raw, buildless HTML file that utilizes the `<outerbase-scrollable />` component. **You can open this file in any browser for a peek.**

#### Add to your project

Place `scrollable-element.bundle.js` (found in `dist/web-components/scrollable-element.bundle.js`) somewhere accessible to your website. Then update your HTML to include the following:

```html
<script src="/path/to/scrollable-element.bundle.js"></script>
```

### NPM Modules

#### Include the prebuilt + bundled version via NPM

_In your terminal, type_

```sh
pnpm add @outerbase/scrollable-element
```

_in your js/ts file(s)_

```ts
import '@outerbase/dist/web-components/scrollable-element.bundle.js'
```

## React Components

You may also use these components as React components.

```ts
import * as React from 'react'
import { createComponent } from '@lit/react'
import { ScrollableElement } from '@outerbase/scrollable-element'

export const Scrollable = createComponent({
    tagName: 'outerbase-scrollable',
    elementClass: ScrollableElement,
    react: React,

    events: {
        onScroll: 'scroll' as ScrollEvent,
    },
})
```

## Usage on the Web

```sh
npm add --save-peer @outerbase/scrollable-element
```

```html
<script type="module" src="./node_modules/@outerbase/scrollable-element/dist/web-components/scrollable-element.bundle.js" defer></script>
```

## Developing locally

```sh
pnpm install --frozen-lockfile
pnpm dev
```
