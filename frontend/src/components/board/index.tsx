import React, { useState } from 'react'
import Counter from "./counter"
import { cn } from "@/lib/utils";
import moment from "moment"

type Props = {
    date: moment.Moment
    description: string;
    backgroundUrl?: string
}

function Board({ description, date, backgroundUrl }: Props) {

    const days = moment().diff(date, "days")

    return (
        <div style={
            backgroundUrl ? {
                backgroundImage: `url('${backgroundUrl}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            } : {}}
            className={cn("h-full w-full flex justify-center items-center")}
        >
            <div className={cn("text-center", backgroundUrl ? "bg-card/75 p-6 rounded-lg" : null)}>
                <h1>It has been</h1>
                <div className="flex justify-center my-1">
                    <Counter value={`${days}`} className="text-5xl" />
                </div>
                <p>{days === 1 ? <>day</> : <>days</>} since {description}</p>
            </div>
        </div>
    )
}

export default Board