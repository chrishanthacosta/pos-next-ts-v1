"use client";

export const ItemTable = ({ itemRowObjects }: { itemRowObjects: any[] }) => {
  // const [reloadTable, setReloadTable] = useState(false);

  const tableHeads = [
    "#",
    "code",
    "extra code",
    "name",
    "category",
    "subcategory",
    "brand",
    "sales price",
    "cost",
    "markup",
    "current stock",
    "stock limit",
    "unit",
    "net weight",
    "gross weight",
    "location",
    "",
  ];
  // const tableHeads = [
  //   {lable: "#",px:4},
  //   "code",
  //   "extra code",
  //   "name",
  //   "category",
  //   "subcategory",
  //   "brand",
  //   "sales price",
  //   "cost",
  //   "markup",
  //   "current stock",
  //   "stock limit",
  //   "unit",
  //   "net weight",
  //   "gross weight",
  //   "location",
  //   "",
  // ];

  return (
    <div className="md:px-2 py-2 w-fit">
      <div className="shadow overflow-y-scroll rounded border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-purple-400">
            <tr>
              {tableHeads.map((head) => (
                <th
                  key={head}
                  className="text-left py-5 px-12 uppercase text-sm font-bold"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {itemRowObjects.map((tableRow: any, index: number) => (
              <tr className="even:bg-purple-gray-50/50" key={tableRow.itemcode}>
                <td className="text-left py-3 px-4 font-bold">{index + 1}</td>
                <td className="text-left py-3 px-4">
                  {tableRow.itemcode.toString().padStart(5, "0")}
                </td>
                <td className="text-left py-3 px-4">
                  {tableRow.extraitemcode}
                </td>
                <td className="text-left py-3 px-4">{tableRow.itemname}</td>
                <td className="text-left py-3 px-4">{tableRow.category}</td>
                <td className="text-left py-3 px-4">{tableRow.subcategory}</td>
                <td className="text-left py-3 px-4">{tableRow.brand}</td>
                <td className="text-left py-3 px-4">{tableRow.salesprice}</td>
                <td className="text-left py-3 px-4">{tableRow.cost}</td>
                <td className="text-left py-3 px-4">{tableRow.markup}</td>
                <td className="text-left py-3 px-4">{tableRow.currentstock}</td>
                <td className="text-left py-3 px-4">{tableRow.stocklimit}</td>
                <td className="text-left py-3 px-4">{tableRow.unit}</td>
                <td className="text-left py-3 px-4">{tableRow.netweight}</td>
                <td className="text-left py-3 px-4">{tableRow.grossweight}</td>
                <td className="text-left py-3 px-4">{tableRow.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
