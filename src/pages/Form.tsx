"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    language: z.enum(['C++', 'Javascript', 'Java', 'Python']),
    source_code: z.string(),
    stdin: z.string()
})

export default function ProfileForm() {
    const navigate = useNavigate();
    const { toast } = useToast()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            language: "C++",
            source_code: "",
            stdin: ""
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(" lenght of source code is", values.source_code.length);
        try {
            const response = await axios.post('http://127.0.0.1:3000/submissions', values);
            
            console.log(response);
            toast({
                description: "Code has been submitted successfully.",
            })
            navigate('/submissions')
        } catch (error) {
            toast({
                description: "There was a problem with your request.",
                // action: <ToastAction altText="Try again">Try again</ToastAction>
            })
            console.log(error);

        }
        console.log(values)
    }

    return (
        <div className="w-1/2 mx-auto my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Language</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="C++">C++</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Java">Java</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="source_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Source Code</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="write your code here"
                                        // className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stdin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stdin</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Give your input here"
                                        // className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant="default" >Submit</Button>
                </form>
            </Form>
        </div>

    )
}
