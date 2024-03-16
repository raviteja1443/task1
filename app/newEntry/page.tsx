"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";

import axios from "axios";

const formSchema = z.object({
  Name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  Email: z.string().email().min(2, {
    message: "Enter a valid email address",
  }),
  age: z
    .string()
    .min(0, {
      message: "age must be a positive number",
    })
    .max(100),
  Date: z.date({
    required_error: "A date of birth is required.",
  }),
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, Callout } from "@radix-ui/themes";
import { useState } from "react";

export function NewEntry() {
  const [isSubmitting, setisSubmitting] = useState(false);
  // const [iserror, setisError] = useState(false);
  const [error, setError] = useState(undefined);

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Email: "",
      age: "",
      Date: new Date(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      setisSubmitting(true);

      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      const { Name, Email, age, Date } = values;
      const Age = parseInt(age);
      // const date = Date.toLocaleString();

      const data = { Name, Email, Age, Date };
      await axios.post("api/Entries", data);
      // const age =
      // console.log(Name, Email, Age, date, values);

      router.push("/");
      router.refresh();

      // console.log(data);
    } catch (err) {
      setError(err.response.data.error);
      // console.log();

      // console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }
  const { toast } = useToast();

  return (
    <Card className="content-center sm:w-7/12 md:w-8/12 w-full">
      {
        error && (
          <Callout.Root color="red" className="mb-2">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )
        // toast({
        //   description: "Your message has been sent.",
        // })
      }

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="enter email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="Age" type="number" {...field} />
                </FormControl>
                <FormDescription>Age should be positive</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
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
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {/* <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-6/12"
          >
            {isSubmitting ? "submitting" : "Submit"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default NewEntry;
