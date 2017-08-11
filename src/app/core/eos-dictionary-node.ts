export class EosDictionaryNode {
    id: string;
    code: string;
    title: string;
    parentId?: string;
    parent?: EosDictionaryNode;
    children?: EosDictionaryNode[];
    description: string;
    isNode: boolean;
    hasSubnodes: boolean;
    isExpanded?: boolean;
    isDeleted: boolean;
    selected: boolean;
    data: any;

    constructor(data: any) {
        Object.assign(this, data);
        this.selected = !!this.selected;
        this.isDeleted = !!this.isDeleted;
    }

    hasParent(parent: EosDictionaryNode): boolean {
        if (this.parent) {
            if (this.parent.id === parent.id) {
                return true;
            } else {
                return this.parent.hasParent(parent);
            }
        } else {
            return false;
        }
    }
}
