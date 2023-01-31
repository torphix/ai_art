
export class ModelSession{
    id: string;
    

    constructor(id:string){
        this.id = id;
    }


    updateModel(
        id:string = this.id,
    ){
        this.id = id
    }
}