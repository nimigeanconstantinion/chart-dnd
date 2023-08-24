
export default interface BKNode{
    id:string,
    label:string,
    descriere:string,
    parinte?:BKNode,
    subordinates:BKNode[],
    generator?:Generator,
    customFields?:CustomFields[],

}

interface Generator{
    id:number,
    pattern:string,
    minValue:string,
    maxValue:string,
    nextValue:string,
    generationType:string,
    generatedOn:string
}

interface CustomFields{
    id:string,
    customKey:string,
    value:string,
    type:string
}