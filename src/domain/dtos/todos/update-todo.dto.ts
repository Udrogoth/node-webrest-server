

export class UpdateTodoDto {
    constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: string
    ) { }


    get value() {
        const returnObj: { [key: string]: any } = {};
        if (this.text) returnObj.text = this.text;
        if (this.text) returnObj.completedAt = this.completedAt;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { id, text, completedAt } = props;
        if (!id || isNaN(Number(id))) {
            return ['id must be a valid number'];
        }
        let newCompletedAt = completedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === 'invalid Date') {
                return ['Completed must be a valid date']
            }
        }
        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }


}