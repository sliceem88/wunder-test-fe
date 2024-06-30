"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useCartStorage } from "../../store/cartStore";

export default function ActionHandlerButton({ id, type }: { id: number, type: string}) {
  const addProduct = useCartStorage((state) => state.addProduct);
  const addRule = useCartStorage((state) => state.addRule);

  const handleClick = () => {
    if(type === 'product') {
        addProduct(id);
    } else {
        addRule(id);
    }
  };

  return (
    <div onClick={handleClick}>
      <IconButton radius="full">
        <PlusIcon />
      </IconButton>
    </div>
  );
}
