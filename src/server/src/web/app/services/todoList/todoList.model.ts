interface ITodoListArgs {
    id: Number;
    title: String;
    createdAt: Date;
    updatedAt: Date;
}

export class TodoList {
    id: Number;
    title: String;
    createdAt: Date;
    updatedAt: Date;

    constructor(jsObj: ITodoListArgs) {
        this.id = jsObj.id;
        this.title = jsObj.title;
        this.createdAt = jsObj.createdAt;
        this.updatedAt = jsObj.updatedAt;
    }

}