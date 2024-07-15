import { Router } from "express";
import { TodosController } from "./controllers";


export class TodoRoutes{

    static get routes(): Router {
        
        const router = Router();
        const todosController = new TodosController();

        router.get('/', todosController.getTodos)
        router.get('/:id', todosController.getTodosById)

        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodoById);
        return router;
    }
}