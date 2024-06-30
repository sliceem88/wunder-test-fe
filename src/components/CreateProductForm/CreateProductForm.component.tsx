"use client";

import {
  TextField,
  Flex,
  Button,
  Select,
  Separator,
  Blockquote,
} from "@radix-ui/themes";
import ky from "ky";
import { FormEvent, useState } from "react";
import type { ResponseType } from "../../types/response";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateProductForm() {
  const [value, setValue] = useState("food");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("type", value);

    try {
      const response: ResponseType = await ky
        .post("http://localhost:9980/product", { body: formData })
        .json();

      if (response.errorStatus) {
        return toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      toast.success(response.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.refresh();
    } catch (error) {
      toast.error("Error on product save, try later", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Flex direction="column" gap="3">
        <Blockquote color="indigo">Product Creation form</Blockquote>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex gap="3" align="center" justify="between">
            <Flex gap="3">
              <TextField.Root
                size="2"
                placeholder="Product name"
                type="text"
                name="name"
                required
              />
              <TextField.Root
                size="2"
                placeholder="Product Price"
                type="number"
                name="price"
                required
              />
              <Select.Root
                defaultValue="apple"
                value={value}
                onValueChange={setValue}
              >
                <Select.Trigger variant="soft" color="indigo" />
                <Select.Content color="indigo">
                  <Select.Group>
                    <Select.Item value="food">Food</Select.Item>
                    <Select.Item value="car_parts">Car Parts</Select.Item>
                    <Select.Item value="liqued">Liqued</Select.Item>
                    <Select.Item value="sweets">Sweets</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
            <Button color="indigo" variant="soft" type="submit">
              Add product
            </Button>
          </Flex>
        </form>
        <Separator my="2" size="4" />
      </Flex>
    </>
  );
}
