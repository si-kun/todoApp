"use client"
import React, { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface InputDateProps {
    handleEndDate:(date: Date) => void
}

const InputDate = ({handleEndDate}: InputDateProps) => {

    const [open,setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col space-y-1.5">
    <Label htmlFor="date">
      締め切り日
    </Label>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date)
            handleEndDate(date!)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  </div>
  )
}

export default InputDate