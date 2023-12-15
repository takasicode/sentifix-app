import React, { useEffect, useState } from "react";
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
import { MdUploadFile } from "react-icons/md";

import { useForm } from "react-hook-form";

import axios from "axios";
import { Modal } from "../ui/modal";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;

  loading: boolean;
  mutate: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
 
  loading,
  mutate,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm({
    defaultValues: {
      files: null,
    },
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  

  const onSubmit = (data: { files: File | null }) => {
    if (data.files === null) {
      // Handle the case where no file was selected
      console.log("No file selected");
    } else {
      const selectedFile = data.files as File;
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
          onClose()
          mutate();
        });
    }
  };

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
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
                      field.onChange(e.target.files ? e.target.files[0] : null)
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
    </Modal>
  );
};

export default UploadModal;
