export interface InputValue {
    inputParsedValue: string;
    caretPosition: number;
}

export interface SelectedIndex {
    operator: string
    index? :number;
}

export interface LookupAndIndex {
    lookup:any[];
    index:number;
}

export interface DropdwonObject {
    lookup: any[];
    filteredLookup: any[];
    sIndex: number;
    searchText: string;
}
