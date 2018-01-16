import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EosStorageService } from 'app/services/eos-storage.service';

import { RECENT_URL } from 'app/consts/common.consts';

import { EosDictService } from '../services/eos-dict.service';
import { EosDictionaryNode } from '../core/eos-dictionary-node';
import { IDictionaryViewParameters, IFieldView } from 'eos-dictionaries/interfaces';
import { createElement } from '@angular/core/src/view/element';
import { HintConfiguration } from '../long-title-hint/hint-configuration.interface';

@Component({
    selector: 'eos-node-list-item',
    templateUrl: 'node-list-item.component.html'
})

export class NodeListItemComponent implements OnInit, OnChanges {
    @ViewChild('item') item: ElementRef;
    @Input('node') node: EosDictionaryNode;
    @Input('params') params: IDictionaryViewParameters;
    @Input('length') length: any = {};
    @Input('customFields') customFields: IFieldView[];
    @Output('mark') mark: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output('onHoverItem') onHoverItem: EventEmitter<HintConfiguration> = new EventEmitter<HintConfiguration>();

    viewFields: IFieldView[];

    customValues: any = {};

    constructor(
        private _storageSrv: EosStorageService,
        private _dictSrv: EosDictService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.viewFields = this.node.getListView();
    }

    ngOnChanges() {
        if (this.customFields) {
            this.customFields.forEach((_field) => {
                this.customValues[_field.key] = this.node.getValue(_field);
            });
        }
    }

    selectNode(): void {
        if (!this.node.isDeleted && this.node.id !== '') {
            this._dictSrv.openNode(this.node.id);
        }
    }

    markNode() {
        this.mark.emit(this.node.marked);
    }

    viewNode() {
        if (!this._dictSrv.isRoot(this.node.id)) {
            this._storageSrv.setItem(RECENT_URL, this._router.url);
            console.log('node', this.node)
            const _path = this.node.getPath();
            _path.push('view')
            this._router.navigate(_path);
        }
    }
    /**
     * @param el
     * @description Draw hint for a long title
     */
    public showHint(el: HTMLElement) {
        const span = document.createElement('span'),
            body = document.getElementsByTagName('body');
        span.style.position = 'absolute';
        span.style.top = '-5000px';
        span.style.left = '-5000px';
        span.style.padding = '20px';
        span.innerText = el.innerText;
        body[0].appendChild(span);
        if (span.clientWidth > el.clientWidth) {
            this.onHoverItem.emit({
                top: el.offsetTop - el.offsetParent.scrollTop,
                left: el.offsetLeft,
                text: el.innerText,
                show: true,
                node: this.node
            });
        } else {
            this.onHoverItem.emit({
                show: false,
                node: this.node
            })
        }
        body[0].removeChild(span)
    }

    /**
     * @param node EosDictionaryNode
     * @description Navigate to param node. Open element as node
     */
    public openAsFolder(node: EosDictionaryNode) {
        this._router.navigate([`${this._router.url}/${node.id}`]);
    }

}
