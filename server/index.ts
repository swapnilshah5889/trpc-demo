import { publicProcedure, router } from './trpc';
import z from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
 
const inputType = z.object({
    title: z.string(),
    description: z.string()
})

const appRouter = router({
    createTodo : publicProcedure
        .input(inputType)
        .mutation(async (opts) => {
            const title = opts.input.title;
            const desc = opts.input.description;
            // Do DB stuff

            return {
                id: "1",
                todo: {title, desc}
            }
        })
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
});
   
server.listen(3000);