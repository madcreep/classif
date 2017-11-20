import { Component, Input, ViewChild, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { SortableComponent } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { EosDictionaryNode } from '../core/eos-dictionary-node';
import { EosDictService } from '../services/eos-dict.service';
import { IDictionaryViewParameters } from 'eos-dictionaries/core/eos-dictionary.interfaces';


@Component({
    selector: 'eos-node-list',
    templateUrl: 'node-list.component.html',
})
export class NodeListComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<any> = new Subject();

    @Input() nodes: EosDictionaryNode[];
    @Input() length: any;
    @Output() checked: EventEmitter<any> = new EventEmitter<any>(); // changes in checkboxes
    @Output() reordered: EventEmitter<EosDictionaryNode[]> = new EventEmitter<EosDictionaryNode[]>(); // user order event
    @ViewChild(SortableComponent) sortableComponent: SortableComponent;

    params: IDictionaryViewParameters;

    constructor(private _dictSrv: EosDictService) { }

    ngOnInit() {
        this._dictSrv.viewParameters$
            .takeUntil(this.ngUnsubscribe)
            .subscribe((params) => this.params = params);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    checkState() {
        this.checked.emit();
    }

    toggleItem() {
        this.reordered.emit(this.nodes);
    }

    writeValues(nodes: EosDictionaryNode[]) {
        if (nodes && nodes.length) {
            this.sortableComponent.writeValue(nodes);
        }
    }
}
