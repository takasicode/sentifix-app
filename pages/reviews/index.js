import React from "react";
import Layout from "@/components/Layout";
import { date, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { MdUploadFile } from "react-icons/md";
import axios from "axios";

export default function Reviews() {
  const form = useForm({
    defaultValues: {
      files: "",
    },
  });

  const onSubmit = (data) => {
    console.log(typeof data.files);
    console.log(data);
    const selectedFile = data.files;
    let formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("/python/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data);
      });
  };

  return (
    <Layout title="Reviews">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Review Table</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="green">
                <MdUploadFile size={20} className="me-4" /> Upload File
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload File</DialogTitle>
                <DialogDescription>Upload File</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  encType="multipart/formData"
                >
                  <FormField
                    control={form.control}
                    name="files"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) =>
                              field.onChange(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
