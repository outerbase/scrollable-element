import { customElement, property } from 'lit/decorators.js'

import { Menu } from './index.js'
import { classMap } from 'lit/directives/class-map.js'
import { CaretDown } from '../../lib/icons/caret-down.js'
import { html } from 'lit'
import { MenuSelectedEvent, Theme } from '../../types.js'
import { ChangeEvent } from '../../lib/events.js'

@customElement('outerbase-input-menu')
export class InputMenu extends Menu {
    @property({ type: Object })
    protected _classMap = {}

    @property({ type: String })
    protected value = ''

    protected override get menuPositionClasses() {
        return 'left-0 right-0 top-8'
    }

    onMenuSelection(event: Event) {
        // event.stopPropagation()
        const { value } = event as MenuSelectedEvent
        this.value = value
    }

    protected onKeyDown(event: KeyboardEvent) {
        if (this.open) return super.onKeyDown(event)

        const { code } = event
        if (code === 'Space' || code === 'ArrowLeft' || code === 'ArrowRight') {
            return
        } else if (code === 'ArrowDown') {
            this.open = true
        } else super.onKeyDown(event)
    }

    public override connectedCallback() {
        super.connectedCallback()
        this.addEventListener('menu-selection', this.onMenuSelection)
    }

    public override disconnectedCallback() {
        super.disconnectedCallback()
        this.removeEventListener('menu-selection', this.onMenuSelection)
    }

    protected override willUpdate(_changedProperties: Map<PropertyKey, unknown>): void {
        super.willUpdate(_changedProperties)

        if (_changedProperties.has('value') && this.dispatchEvent) {
            this.dispatchEvent(new ChangeEvent(this.value))
        }
    }

    protected override render() {
        const triggerClasses = {
            'absolute right-1': true,
            'border border-transparent': true,
            'bg-neutral-50 dark:bg-neutral-950': true,

            'hover:bg-neutral-100 dark:hover:bg-neutral-900 active:border-neutral-200 dark:active:border-neutral-800': true,
            'p-0.5 rounded-md': true,
        }

        return html`
            <slot></slot>
            <input
            id="trigger"
            @keydown=${this.onKeyDown}
            .value=${this.value}
            @input=${(event: InputEvent) => {
                const { value } = event.target as HTMLInputElement
                this.value = value
            }}
                class=${classMap({
                    'relative w-full': true,
                    dark: this.theme == Theme.dark,
                    ...this._classMap,
                })}
                tabindex="0"
                type="text"
                autocomplete="off"
                required
            >
                <div class=${classMap(triggerClasses)} @click=${(event: MouseEvent) => {
                    const trigger = this.shadowRoot?.querySelector('#trigger') as HTMLElement | null
                    trigger?.focus()
                    this.onTrigger(event)
                }} aria-haspopup="menu">${CaretDown(16)}</div>
                ${this.listElement}
            </input>
        `
    }
}