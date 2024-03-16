import Image from "next/image";
import prisma from "@/prisma/PrismaClient";
import { Table } from "@radix-ui/themes";

import React from "react";

import { Entry } from "@prisma/client";

export default async function Home() {
  const entries = await prisma.entry.findMany({});

  const headings: { label: string; value: keyof Entry; classnames?: string }[] =
    [
      {
        label: "Name",
        value: "Name",
      },
      {
        label: "Email",
        value: "Email",
      },
      {
        label: "Age",
        value: "Age",
        // classnames: "hidden md:table-cell",
      },
      {
        label: "Date",
        value: "date",
      },
    ];

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {headings.map((heading) => {
            return (
              <Table.ColumnHeaderCell key={heading.label}>
                {heading.label}{" "}
              </Table.ColumnHeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {entries.map((entry) => (
          <Table.Row key={entry.id}>
            <Table.Cell>{entry.Name}</Table.Cell>
            <Table.Cell>{entry.Email}</Table.Cell>

            <Table.Cell>{entry.Age}</Table.Cell>
            <Table.Cell>{entry.date?.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
