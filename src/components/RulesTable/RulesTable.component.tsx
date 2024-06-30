import ky from "ky";
import { Table, Flex, Blockquote } from "@radix-ui/themes";
import type { ResponseRuleType } from "../../types/rule";
import ActionHandlerButton from "../ActionHandlerButton/ActionHandlerButton.component";

export default async function RulesTable() {
  const rules: ResponseRuleType = await ky
    .get("http://localhost:9980/rule")
    .json();

  if (rules.errorStatus) {
    return null;
  }

  return (
    <Flex direction="column">
      <Blockquote color="amber">Rules Table</Blockquote>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Product Group</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Apply Rule to cart</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rules.data.map((rule) => {
            return (
              <Table.Row key={rule.id}>
                <Table.RowHeaderCell>{rule.name}</Table.RowHeaderCell>
                <Table.Cell>{rule.discount}</Table.Cell>
                <Table.Cell>{rule.type.replace("_", " ")}</Table.Cell>
                <Table.Cell>{rule.group.replace("_", " ")}</Table.Cell>
                <Table.Cell>
                  <ActionHandlerButton id={rule.id} type='rule' />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
