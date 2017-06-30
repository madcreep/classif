export class EosDictionaryNode {
    id: number;
    code: string;
    title: string;
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
    }
}
