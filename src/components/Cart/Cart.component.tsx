"use client";
import { Box, Flex, Text, Card, Heading, Button } from "@radix-ui/themes";
import { useCartStorage } from "../../store/cartStore";
import { TrashIcon, EraserIcon } from "@radix-ui/react-icons";

export default function Cart() {
  const removeProducts = useCartStorage((state) => state.removeAllProducts);
  const removeRules = useCartStorage((state) => state.removeAllRules);
  const total = useCartStorage((state) => state.totalPrice);
  const rules = useCartStorage((state) => state.rules);
  const products = useCartStorage((state) => state.products);
  const isDiscount = rules.length
    ? "Product price with Discount"
    : "Product price";

  return (
    <Flex direction="column">
      <Heading>
        Your cart has {products.length} products, and {rules.length} rules
        applied
      </Heading>
      <Box py="2">
        <Flex gap="10px" maxWidth='520px' wrap='wrap'>
          {products.map((product) => {
            return (
              <Card key={product.id}>
                <Flex gap="3" align="center">
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      Name: {product.name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {isDiscount}: {product.price}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      Product type: {product.type}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Box>
      <Heading>Total with cart rules: {total}</Heading>
      <Flex gap="10px">
        <Button onClick={removeProducts}>
          <TrashIcon /> Remove all products
        </Button>
        <Button onClick={removeRules}>
          <EraserIcon /> Remove all rules
        </Button>
      </Flex>
      <Box py="2">
        <Flex gap="10px">
          {rules.map((rule) => {
            return (
              <Card key={rule.id}>
                <Flex gap="3" align="center">
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      Name: {rule.name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      Rule price: {rule.discount}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      Rule type: {rule.type}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      Rule group: {rule.group}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
}
