import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";




export class TodosController {

    //*DI
    constructor() {

    }



    public getTodos = async (req: Request, res: Response) => {
        const todo = await prisma.todo.findMany()
        return res.json(todo)
    }

    public getTodosById = async (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not number' });

        const todo = await prisma.todo.findFirst(
            {
                where: { id }
            });

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: ` TODO with id ${id} not fount` })
    }



    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });



        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        res.json(todo);
    }


    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
        
        if(error){
            return res.status(400).json({error})
        }
        
        const todo = await prisma.todo.findFirst(
            {
                where: { id }
            });

        if (!todo) return res.status(404).json({ error: `todo with id: ${id} not found` });


        const updateTodo = await prisma.todo.update(
            {
                where: { id },
                data: updateTodoDto!.value
            });

        res.json(updateTodo);

    }

    public deleteTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not number' });

        const todo = await prisma.todo.findFirst(
            {
                where: { id }
            });

        if (!todo) return res.status(404).json({ error: `todo with id: ${id} not found` });

        const deletedTodo = await prisma.todo.delete(
            {
                where: { id }
            });


        (deletedTodo)
            ? res.json(deletedTodo)
            : res.status(400).json({ error: `Todod with id ${id} not found` })

    }



}