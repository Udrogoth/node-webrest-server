import { error } from "console";
import { Request, Response } from "express"


const todos = [
    { id: 1, text: 'buy Milk', completedAt: new Date() },
    { id: 2, text: 'buy Bread', completedAt: null },
    { id: 3, text: 'buy Butter', completedAt: new Date() },
];

export class TodosController {

    constructor() {

    }



    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }

    public getTodosById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not number' });
        const todo = todos.find(todo => todo.id === id);
        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: ` TODO with id ${id} not fount` })
    }



    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body;


        if (!text) return res.status(400).json({ error: 'not found text' });

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null,
        };
        todos.push(newTodo);
        res.json(newTodo);
    }


    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(404).json({ error: 'ID argument in  not a number' });


        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `todo with id: ${id} not found` });

        const { text, completedAt } = req.body;
        todo.text = text || todo.text;
        (completedAt === null)
            ? todo.completedAt
            : todo.completedAt = new Date(completedAt || todo.completedAt)



        if (!text) return res.status(404).json({ error: 'text property is required' });



        res.json(todo);

    }

    public deleteTodoById = (req: Request, res: Response) => {

        /*
        validar si es un numero valido
        si existe

        */
        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not number' });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `todo with id: ${id} not found` });

        todos.splice(todos.indexOf(todo), 1);


        res.json(todo)

    }



}