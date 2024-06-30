import { Flex, Box } from "@radix-ui/themes";
import CreateProductForm from "../components/CreateProductForm/CreateProductForm.component";
import CreateRuleForm from "../components/CreateRuleForm/CreateRuleForm.component";
import ProductsTable from "../components/ProductsTable/ProductsTable.component";
import RulesTable from "../components/RulesTable/RulesTable.component";
import Cart from "../components/Cart/Cart.component";

export default async function Home() {
  return (
    <Flex justify="center" gap='50px'>
      <Flex gap="50px" justify="center" width="800px" direction="column">
        <Box>
          <CreateProductForm />
          <CreateRuleForm />
        </Box>
        <ProductsTable />
        <RulesTable />
      </Flex>
      <Cart />
    </Flex>
  );
}
