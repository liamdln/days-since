import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useContext, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "moment";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, setDefaultOptions } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { enGB } from "date-fns/locale"
import { BoardContext } from "@/context/boards";
import { v4 as uuidv4 } from 'uuid';
import { Board } from "@/context/boards/types";

setDefaultOptions({ locale: enGB })

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    board?: Board | null;
}

function BoardInfo({ open, setOpen, board }: Props) {

    const boardContext = useContext(BoardContext)

    useEffect(() => {
        form.setValue("description", board?.description ?? "")
        form.setValue("backgroundImageUrl", board?.backgroundUrl ?? "")
        form.setValue("date", board?.date ? moment(board.date).toDate() : moment().toDate())
    }, [open])

    const schema = z.object({
        description: z.string().min(1, { message: "Required" }),
        backgroundImageUrl: z.string(),
        date: z.date({ required_error: "A date is required." }).max(moment().toDate())
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (values: z.infer<typeof schema>) => {
        if (boardContext.boards.length >= 4) return;
        const newBoard: Board = {
            uuid: board?.uuid ?? uuidv4(),
            description: values.description,
            backgroundUrl: values.backgroundImageUrl,
            date: values.date.toISOString()
        }
        if (board?.uuid) {
            boardContext.editBoard(newBoard)
        } else {
            boardContext.setBoards([...boardContext.boards, newBoard])
        }
        setOpen(false)
   }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-screen-xl">
                <DialogHeader>
                    <DialogTitle>{board?.uuid ? `Board ${board.uuid}` : "Add a Board"}</DialogTitle>
                    <DialogDescription>
                        {board?.uuid ? <>Description: <em>{board.description}</em></> : "Create a board to display on the main page."}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="backgroundImageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Background Image URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > moment().toDate() || date < moment("1900-01-01").toDate()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default BoardInfo