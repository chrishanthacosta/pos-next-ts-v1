// "use client";
// import Image from "next/image";

// import { Button } from "@nextui-org/button";
// import { Card, CardBody } from "@nextui-org/card";
// import { useEffect, useState } from "react";
// import InlineTextInputField from "@/app/components/input-fields/inline-text-input-fields";
// import Label from "@/app/components/input-fields/label";
// import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
// import {
//   BsFillExclamationOctagonFill,
//   BsFillPlusCircleFill,
// } from "react-icons/bs";
// import { AiFillEdit, AiFillCopy, AiFillSave } from "react-icons/ai";
// import { ImBin } from "react-icons/im";
// import { GiCancel } from "react-icons/gi";
// import AddnewPopup from "@/app/components/addnewpopup/addnew-popup";
// // import ProductSize from './components/ProductSize'

// // import shoe from "@/public/images/shoe.webp";

// export default function Item() {
//   //get pathname
//   let pathname: string = "";

//   try {
//     pathname = window.location.href;
//   } catch (error) {}

//   if (pathname) {
//     const r: number = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//   }

//   const [itemcode, setItemcode] = useState("");
//   const [extraitemcode, setExtraitemcode] = useState("");
//   const [barcode, setBarcode] = useState("");
//   const [itemname, setItemname] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [salesprice, setSalesprice] = useState("");
//   const [autosalesprice, setAutosalesprice] = useState(false);
//   const [pricechange, setPricechange] = useState(false);
//   const [cost, setCost] = useState("");
//   const [markup, setMarkup] = useState("");
//   const [stockcontrol, setStockcontrol] = useState(false);
//   const [currentstock, setCurrentstock] = useState("");
//   const [stocklimit, setStocklimit] = useState("");
//   const [unit, setUnit] = useState("");
//   const [netweight, setNetweight] = useState("");
//   const [grossweight, setGrossweight] = useState("");
//   const [location, setLocation] = useState("");

//   const [categoryOptionValue, setCategoryOptionValue] = useState<
//     { value: number; name: string }[]
//   >([
//     {
//       value: 0,
//       name: "No Data",
//     },
//   ]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // const submitButtonHandler = () => {
//   //   console.log("category", category);
//   // };

//   //fetch category details
//   const fetchCategories = async () => {
//     const fetchData = async () => {
//       const response = await fetch(pathname + "/api/addnew-baseinfo");
//       const res = await response.json();

//       //create option array
//       const optionArray: { value: number; name: string }[] = res.categories.map(
//         (c: any) => {
//           return { value: c.categoryid, name: c.categoryname };
//         }
//       );
//       setCategoryOptionValue(optionArray);
//       // setStaffid(selRowData?.staffid ?? "");
//     };
//     // call the function
//     fetchData().catch(console.error);
//   };

//   const subCategoryOptionValue = [
//     { value: "sub1", label: "Sub 1" },
//     { value: "sub2", label: "Sub 2" },
//   ];
//   const brandOptionValue = [
//     { value: "brand1", label: "Brand 1" },
//     { value: "brand2", label: "Brand 2" },
//   ];
//   const unitOptionValue = [
//     { value: "unit1", label: "Unit 1" },
//     { value: "unit2", label: "Unit 2" },
//   ];
//   return (
//     <div className="flex ml-3 flex-col w-3/4">
//       <span className="text-3xl font-black leading-none text-gray-900 select-none">
//         Add <span className="text-indigo-600">item</span>
//       </span>
//       {/* <button
//         onClick={submitButtonHandler}
//         className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
//       >
//         Submit
//       </button> */}
//       <div>
//         <div className="w-full flex flex-col gap-4 mt-3 border-b pb-3 border-gray-400">
//           <div className="flex flex-wrap">
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
//               <Input
//                 type="text"
//                 variant="flat"
//                 label="Code"
//                 size="sm"
//                 value={itemcode}
//                 onChange={(e) => setItemcode(e.target.value)}
//               />
//             </div>
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
//               <Input
//                 type="text"
//                 variant="flat"
//                 label="Extra Code"
//                 size="sm"
//                 value={extraitemcode}
//                 onChange={(e) => setExtraitemcode(e.target.value)}
//               />
//             </div>
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
//               <Input
//                 type="text"
//                 variant="flat"
//                 label="Barcode"
//                 size="sm"
//                 value={barcode}
//                 onChange={(e) => setBarcode(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="flex flex-wrap">
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 w-full">
//               <Input
//                 type="text"
//                 variant="flat"
//                 label="Name"
//                 size="sm"
//                 value={itemname}
//                 onChange={(e) => setItemname(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="flex flex-wrap">
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3 flex items-center justify-center">
//               <AddnewPopup title="Category" />
//               {/* <span className="text-gray-500">
//                 <BsFillPlusCircleFill className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
//               </span> */}
//               <Select
//                 label="Category"
//                 size="sm"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 {categoryOptionValue.map((c) => (
//                   <SelectItem key={c.value} value={c.value}>
//                     {c.name}
//                   </SelectItem>
//                 ))}
//               </Select>
//               {category ? (
//                 <AddnewPopup
//                   title="Category"
//                   id={category}
//                   optionArray={categoryOptionValue}
//                 />
//               ) : null}

//               {/* <span className={category ? "text-gray-500" : "hidden"}>
//                 <AiFillEdit className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
//               </span> */}
//               {/* <Input
//                 type="text"
//                 variant="flat"
//                 label="Category"
//                 size="sm"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               /> */}
//             </div>
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3  flex items-center justify-center">
//               {category ? <AddnewPopup title="Subcategory" /> : null}

//               {/* <span className={category ? "text-gray-500" : "hidden"}>
//                 <BsFillPlusCircleFill className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
//               </span> */}
//               <Select
//                 label="Subcategory"
//                 size="sm"
//                 value={subcategory}
//                 onChange={(e) => setSubcategory(e.target.value)}
//               >
//                 {subCategoryOptionValue.map((c) => (
//                   <SelectItem key={c.value} value={c.value}>
//                     {c.label}
//                   </SelectItem>
//                 ))}
//               </Select>
//               <span className={subcategory ? "text-gray-500" : "hidden"}>
//                 <AiFillEdit className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
//               </span>
//               {/* <Input
//                 type="text"
//                 variant="flat"
//                 label="Subcategory"
//                 size="sm"
//                 value={subcategory}
//                 onChange={(e) => setSubcategory(e.target.value)}
//               /> */}
//             </div>
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3  flex items-center justify-center">
//               <AddnewPopup title="Brand" />

//               {/* <span className="text-gray-500">
//                 <BsFillPlusCircleFill className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
//               </span> */}
//               <Select
//                 label="Brand"
//                 size="sm"
//                 value={brand}
//                 onChange={(e) => setBrand(e.target.value)}
//               >
//                 {brandOptionValue.map((c) => (
//                   <SelectItem key={c.value} value={c.value}>
//                     {c.label}
//                   </SelectItem>
//                 ))}
//               </Select>
//               <span className={brand ? "text-gray-500" : "hidden"}>
//                 <AiFillEdit className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
//               </span>
//               {/* <Input
//                 type="text"
//                 variant="flat"
//                 label="Brand"
//                 size="sm"
//                 value={brand}
//                 onChange={(e) => setBrand(e.target.value)}
//               /> */}
//             </div>
//           </div>
//           <div className="flex flex-wrap">
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
//               <Input
//                 type="text"
//                 variant="flat"
//                 label="Net weight"
//                 size="sm"
//                 value={netweight}
//                 onChange={(e) => setNetweight(e.target.value)}
//               />
//             </div>
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
//               <Input
//                 type="text"
//                 variant="flat"
//                 label="Gross weight"
//                 size="sm"
//                 value={grossweight}
//                 onChange={(e) => setGrossweight(e.target.value)}
//               />
//             </div>
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
//               <Input
//                 type="text"
//                 variant="flat"
//                 label="Location"
//                 size="sm"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-full flex flex-col gap-4 mt-3 border-b pb-3 border-gray-400">
//           <div className="flex flex-wrap">
//             <div
//               className={`flex w-full ${
//                 autosalesprice ? "sm:w-1/2" : "sm:w-1/3"
//               } flex-wrap`}
//             >
//               <div
//                 className={`mb-6 md:mb-0 gap-4 w-full px-3 ${
//                   autosalesprice ? "sm:w-1/2" : "sm:w-1/1"
//                 }`}
//               >
//                 <Input
//                   type="text"
//                   variant="flat"
//                   label="Sales price"
//                   size="sm"
//                   value={salesprice}
//                   onChange={(e) => setSalesprice(e.target.value)}
//                 />
//               </div>
//               <div
//                 className={
//                   autosalesprice
//                     ? "mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2"
//                     : "hidden"
//                 }
//               >
//                 <Input
//                   type="text"
//                   variant="flat"
//                   label="Markup %"
//                   size="sm"
//                   value={markup}
//                   onChange={(e) => setMarkup(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div
//               className={`flex flex-wrap w-full px-3 ${
//                 autosalesprice ? "sm:w-1/2" : "sm:w-2/3"
//               }`}
//             >
//               <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-1/5 flex items-center">
//                 <Checkbox
//                   isSelected={autosalesprice}
//                   onValueChange={setAutosalesprice}
//                 >
//                   Automatic
//                 </Checkbox>
//               </div>
//               <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-4/5 flex items-center">
//                 <Checkbox
//                   isSelected={pricechange}
//                   onValueChange={setPricechange}
//                 >
//                   Allow price change at the moment of the sale
//                 </Checkbox>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap">
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
//               <Input
//                 type="text"
//                 variant="flat"
//                 label="Cost"
//                 size="sm"
//                 value={cost}
//                 onChange={(e) => setCost(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-full flex flex-col gap-4 mt-3 border-b pb-3 border-gray-400">
//           <div className="flex flex-wrap">
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 flex sm:w-1/5">
//               <div className="flex items-center">
//                 <input
//                   checked={stockcontrol}
//                   onChange={(e) => setStockcontrol(e.target.checked)}
//                   type="checkbox"
//                   className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
//                 />
//               </div>
//               <h1 className="flex items-center font-semibold">Control stock</h1>
//             </div>
//             <div
//               className={`flex flex-wrap w-full sm:w-4/5 ${
//                 stockcontrol ? "" : "pointer-events-none"
//               }`}
//             >
//               <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2">
//                 <Input
//                   type="text"
//                   variant="flat"
//                   label="Current stock"
//                   size="sm"
//                   value={currentstock}
//                   onChange={(e) => setCurrentstock(e.target.value)}
//                 />
//               </div>
//               <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2">
//                 <Input
//                   type="text"
//                   variant="flat"
//                   label="Stock limit"
//                   size="sm"
//                   value={stocklimit}
//                   onChange={(e) => setStocklimit(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap">
//             <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3 flex items-center justify-center">
//               <AddnewPopup title="Unit" />
//               {/* <span className="text-gray-500">
//                 <BsFillPlusCircleFill className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
//               </span> */}
//               <Select
//                 label="Unit"
//                 size="sm"
//                 value={unit}
//                 onChange={(e) => setUnit(e.target.value)}
//               >
//                 {unitOptionValue.map((c) => (
//                   <SelectItem key={c.value} value={c.value}>
//                     {c.label}
//                   </SelectItem>
//                 ))}
//               </Select>
//               <span className={unit ? "text-gray-500" : "hidden"}>
//                 <AiFillEdit className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="w-full flex flex-col gap-4 mt-3">
//           <div className="flex flex-wrap mt-16">
//             <div className="px-3">
//               <Button color="primary" startContent={<AiFillSave />}>
//                 Save
//               </Button>
//             </div>
//             <div>
//               <Button color="default" startContent={<GiCancel />}>
//                 Cancel
//               </Button>
//             </div>
//             <div className="ml-auto">
//               <Button
//                 color="default"
//                 startContent={<BsFillExclamationOctagonFill />}
//               >
//                 Disable product
//               </Button>
//             </div>
//             <div className="px-3">
//               <Button color="default" startContent={<AiFillCopy />}>
//                 Copy
//               </Button>
//             </div>
//             <div className="px-3">
//               <Button color="default" startContent={<ImBin />}>
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// {
//   /* <button
//               onClick={submitButtonHandler}
//               className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
//             >
//               Submit
//             </button> */
// }
