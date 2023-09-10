import { publicProcedure, router } from './trpc';
import z from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
 
const inputType = z.object({
    title: z.string(),
    description: z.string()
})

const signupInputType = z.object({
    email: z.string(),
    password: z.string()
})

const appRouter = router({
    createTodo : publicProcedure
        .input(inputType)
        .mutation(async (opts) => {
            console.log("Create todo API call")
            const title = opts.input.title;
            const desc = opts.input.description;
            // Do DB stuff

            return {
                id: "1",
                todo: {title, desc}
            }
    }),

    signUp : publicProcedure
        .input(signupInputType) 
        .mutation(async (opts) => {
            const email = opts.input.email;
            const password = opts.input.password;
            console.log(opts.ctx);
            // Do validation
            
            const token = "123231223";
            return {
                status:true,
                token
            }
        })
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        return  {
            username:"123"
        }
    }
});
   
server.listen(3000);