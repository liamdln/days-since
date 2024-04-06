import React, { useContext, useState } from 'react'
import Counter from "./counter"
import { cn } from "@/lib/utils";
import moment from "moment"
import { Button } from "../ui/button";
import { BoardContext } from "@/context/boards";

type Props = {
    date: moment.Moment;
    description: string;
    backgroundUrl?: string;
    className?: string;
}

function Board({ description, date, backgroundUrl, className }: Props) {

    const days = moment().diff(date, "days")

    return (
        <div style={
            backgroundUrl ? {
                backgroundImage: `url('${backgroundUrl}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            } : {}}
            className={cn("h-full w-full flex justify-center items-center rounded-md", className)}
        >
            <div className={cn("text-center", backgroundUrl ? "bg-card/75 p-6 rounded-lg" : null)}>
                <h1>It has been</h1>
                <div className="flex justify-center my-1">
                    <Counter value={`${days}`} className="text-5xl" />
                </div>
                <p className="flex flex-wrap">{days === 1 ? <>day</> : <>days</>} since {description}</p>
            </div>
        </div>
    )
}

export default Board