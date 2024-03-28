# scrollable-element

## Usage in React

```ts
import * as React from 'react'
import { createComponent } from '@lit/react'
import { Scroller } from 'scrollable-element'

export const ScrollableElement = createComponent({
    tagName: 'scrollable-element',
    elementClass: Scroller,
    react: React,

    events: {
        onScroll: 'scroll' as ScrollEvent,
        // etc...
    },
})
```

## Usage on the Web

```sh
npm add --save-peer @outerbase/scrollable-element
```

```html
<script type="module" src="./node_modules/@outerbase/scrollable-element/bundled/scrollable-element.js" defer></script>
```
