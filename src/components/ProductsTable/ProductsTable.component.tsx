import ky from "ky";
import { Table, Flex, Blockquote } from "@radix-ui/themes";
import type { ResponseProductType } from "../../types/product";
import ActionHandlerButton from '../ActionHandlerButton/ActionHandlerButton.component'; 

export default async function ProductsTable() {
  const products: ResponseProductType = await ky
    .get("http://localhost:9980/product")
    .json();

  if (products.errorStatus) {
    return null;
  }

  return (
    <Flex direction="column">
      <Blockquote color="amber">Products Table</Blockquote>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Add to cart</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.data.map((product) => {
            return (
              <Table.Row key={product.id}>
                <Table.RowHeaderCell>{product.name}</Table.RowHeaderCell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.type.replace("_", " ")}</Table.Cell>
                <Table.Cell>
                  <ActionHandlerButton id={product.id} type='product'/>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
