import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

// import subcomponents
import '../column-resizer'
import { TWStyles } from '../../../tailwind'
import { MutableElement } from '../mutable-element'
import { ColumnRemovedEvent, ColumnRenameEvent } from '../../lib/events'
import { classMap } from 'lit/directives/class-map.js'

// tl;dr <th/>, table-cell
@customElement('outerbase-th')
export class TH extends MutableElement {
    static styles = TWStyles
    protected override get classMap() {
        return {
            'table-cell relative whitespace-nowrap h-[38px]': true, // h-[38px] was added to preserve the height when toggling to <input />
            'bg-yellow-100 dark:bg-yellow-900': this.dirty,
            'first:border-l border-b border-t border-theme-border dark:border-theme-border-dark': true,
            'px-cell-padding-x py-cell-padding-y pr-2': true,
            'bg-theme-column dark:bg-theme-column-dark': true,
            // prevent double borders
            'first:border-l': this.withResizer, // omit regular border
            'border-l': !this.withResizer, // use regular border
        }
    }

    @property({ attribute: 'table-height', type: Number })
    public tableHeight?: number

    @property({ attribute: 'with-resizer', type: Boolean })
    public withResizer = false

    @property({ attribute: 'name', type: String })
    public override value = ''

    @property({ attribute: 'is-last', type: Boolean })
    protected isLastColumn = false

    protected override render() {
        const deleteBtn = this.value
            ? html`<span
                  class="h-5 w-5 pl-1.5 hover:bg-red-50 dark:hover:bg-red-950 rounded-full text-red-400 dark:text-red-900 hover:text-red-700 active:text-red-500 dark:active:text-red-600 cursor-pointer"
                  @click=${this.removeColumn}
                  >x</span
              >`
            : null

        const body = this.isEditing
            ? html`<input .value=${this.value} @input=${this.onChange} @keydown=${this.onKeyDown} class=${classMap({
                  'z-10 absolute top-0 bottom-0 right-0 left-0 bg-blue-50 dark:bg-blue-950 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900':
                      true,
              })} @blur=${this.onBlur}></input>`
            : html`<span class="flex items-center justify-between">${this.value} ${deleteBtn}</span>`

        // TODO `delete` is appearing when SSR w/o hydration; it shouldn't since there's no JS available to click it
        return this.withResizer
            ? html`<slot></slot>
                  ${body}
                  <column-resizer .column=${this} height="${ifDefined(this.tableHeight)}"></column-resizer>`
            : html`<slot></slot>${body}`
    }

    protected dispatchChangedEvent() {
        if (!this.originalValue) throw new Error('misisng OG value')
        this.dispatchEvent(
            new ColumnRenameEvent({
                name: this.originalValue,
                data: { name: this.value },
            })
        )
    }

    protected removeColumn() {
        if (!this.originalValue) throw new Error('misisng OG value')

        this.dispatchEvent(
            new ColumnRemovedEvent({
                name: this.originalValue,
            })
        )
    }
}
