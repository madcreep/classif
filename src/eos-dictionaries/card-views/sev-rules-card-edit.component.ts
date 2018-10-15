import { Component, Injector } from '@angular/core';
import { BaseCardEditComponent } from './base-card-edit.component';

@Component({
    selector: 'eos-sev-rules-card-edit',
    templateUrl: 'sev-rules-card-edit.component.html',
    styleUrls: ['./sev-rules-card-edit.component.scss'],
})
export class SevRulesCardEditComponent extends BaseCardEditComponent {
    constructor(injector: Injector) {
        super(injector);
    }
    get typeDoc(): number {
        return this.getValue('rec.TYPE_DOC');
    }
    get ruleKind(): number {
        return this.getValue('rec.RULE_KIND');
    }
    get isBunchRK(): boolean {
        return this.getValue('rec.BUNCHS_RK');
    }
    get isBunchRKPD(): boolean {
        return this.getValue('rec.BUNCHS_RKPD');
    }
    get isBunchWithType(): boolean {
        return this.getValue('rec.BUNCHS_RK_KIND') === 1;
    }
    get adrSubjDoc(): boolean {
        return this.getValue('rec.ADR_SUBJ_DOC');
    }
    get addressees(): boolean {
        return this.getValue('rec.ADDRESSEES');
    }
    get files(): boolean {
        return this.getValue('rec.FILES');
    }
    get resolutionFiles(): boolean {
        return this.getValue('rec.RESOLUTION_FILES');
    }
    get items(): boolean {
        return this.getValue('rec.ITEMS');
    }
    get resolution(): boolean {
        return this.getValue('rec.Resolution');
    }
    get orders(): boolean {
        return this.getValue('rec.orders');
    }
    get forwardingDocs(): boolean {
        return this.getValue('rec.forwardingDocs');
    }
    get consideration(): boolean {
        return this.getValue('rec.Consideration');
    }
    get executors(): boolean {
        return this.getValue('rec.executors');
    }
    get executorFiles(): boolean {
        return this.getValue('rec.executorFiles');
    }
    get editSet(): boolean {
        return this.getValue('rec.editSet');
    }
    get reportExecution(): boolean {
        return this.getValue('rec.reportExecution');
    }
    get executorsProject(): boolean {
        return this.getValue('rec.executorsProject');
    }
    get dateExecutionProject(): boolean {
        return this.getValue('rec.dateExecutionProject');
    }
    get visas(): boolean {
        return this.getValue('rec.VISAS');
    }
    get visasInfo(): boolean {
        return this.getValue('rec.visasInfo');
    }
    get signatures(): boolean {
        return this.getValue('rec.signatures');
    }
    get signaturesInfo(): boolean {
        return this.getValue('rec.signaturesInfo');
    }
    get visaForward(): boolean {
        return this.getValue('rec.visaForward');
    }
    get signatureForward(): boolean {
        return this.getValue('rec.signatureForward');
    }
}
