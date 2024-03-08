import { cn } from "@/lib/utils"

type Props = {
    value: string
    className?: string
}

function Counter({ value, className }: Props) {
  return (
    <div className="py-1 bg-[black] w-full">
        <span className={cn(className, "font-digi text-destructive")}>{ value }</span>
    </div>
  )
}

export default Counter