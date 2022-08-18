import { STATUSES } from "../constants/statuses";
import React from "react";
import withNavbar from "../hocs/withNavbar";
import OrderSection from "../components/OrderSection";

const SECTIONS = [
  { header: "New Orders", status: STATUSES.NEW },
  { header: "In Progress Orders", status: STATUSES.IN_PROGRESS },
  { header: "Completed Orders", status: STATUSES.COMPLETED },
  { header: "Picked-up Orders", status: STATUSES.PICKED_UP },
  { header: "Canceled Orders", status: STATUSES.CANCELED },
];

const OrderOverviewScreen = () => {
  // might have to sort by order number
  const orders = [
    {
      items: [
        { name: "Drink #1", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
        { name: "Super loonngggggg nameeee", quantity: 2 },
      ],
      orderNumber: 1,
      notes: "notes",
      status: "PICKED_UP",
    },
    {
      items: [
        { name: "Drink #1", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
      ],
      orderNumber: 2,
      status: "IN_PROGRESS",
    },
    {
      items: [
        { name: "Drink #1", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
      ],
      orderNumber: 3,
      status: "COMPLETED",
    },
    {
      items: [
        { name: "Drink #1", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
      ],
      orderNumber: 4,
      notes: "notes",
      status: "CANCELED",
    },
    {
      items: [
        { name: "Drink #1", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
      ],
      orderNumber: 4,
      status: "PICKED_UP",
    },
    {
      items: [
        { name: "Drink #1", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
      ],
      orderNumber: 4,
      status: "NEW",
    },
    {
      items: [
        { name: "Drink #1", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
      ],
      orderNumber: 4,
      status: "PICKED_UP",
    },
    {
      items: [
        { name: "Drink #1", quantity: 2 },
        { name: "Drink #2", quantity: 2 },
      ],
      orderNumber: 4,
      status: "CANCELED",
    },
  ];

  return (
    <div>
      {SECTIONS.map(({ header, status }) => {
        return (
          <OrderSection
            key={`section-${header}`}
            header={header}
            orders={orders.filter(
              ({ status: orderStatus }) => status === orderStatus
            )}
          />
        );
      })}
    </div>
  );
};

export default withNavbar(OrderOverviewScreen);
