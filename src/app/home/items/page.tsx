"use client";
import Image from "next/image";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useEffect, useState } from "react";
import InlineTextInputField from "@/app/components/input-fields/inline-text-input-fields";
import Label from "@/app/components/input-fields/label";
import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import {
  BsFillExclamationOctagonFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { AiFillEdit, AiFillCopy, AiFillSave } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { GiCancel } from "react-icons/gi";
import AddnewPopup from "@/app/components/addnewpopup/addnew-popup";
import { useSelector } from "react-redux";
import { inputFieldValidation } from "@/app/utils/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Item() {
  const router = useRouter();
  //get pathname
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const updateBaseinfo = useSelector(
    (state: any) => state.baseinfoupdateReducer.baseinfoUpdate
  );

  const [itemcode, setItemcode] = useState("");
  const [extraitemcode, setExtraitemcode] = useState("");
  const [barcode, setBarcode] = useState("");
  const [itemname, setItemname] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [cost, setCost] = useState("");
  const [stockcontrol, setStockcontrol] = useState(false);
  const [currentstock, setCurrentstock] = useState("");
  const [stocklimit, setStocklimit] = useState("");
  const [unit, setUnit] = useState("");
  const [netweight, setNetweight] = useState("");
  const [grossweight, setGrossweight] = useState("");
  const [location, setLocation] = useState("");

  //retail price
  const [retailsalesprice, setRetailsalesprice] = useState("");
  const [retailautosalesprice, setRetailautosalesprice] = useState(false);
  const [retailmarkup, setRetailmarkup] = useState("");
  const [retailpricechange, setRetailpricechange] = useState(true);

  //smallwhole price
  const [smallwholesalesprice, setSmallwholesalesprice] = useState("");
  const [smallwholeautosalesprice, setSmallwholeautosalesprice] =
    useState(false);
  const [smallwholemarkup, setSmallwholemarkup] = useState("");
  const [smallwholepricechange, setSmallwholepricechange] = useState(true);

  //largewhole price
  const [largewholesalesprice, setLargewholesalesprice] = useState("");
  const [largewholeautosalesprice, setLargewholeautosalesprice] =
    useState(false);
  const [largewholemarkup, setLargewholemarkup] = useState("");
  const [largewholepricechange, setLargewholepricechange] = useState(true);

  const [categoryOptionValue, setCategoryOptionValue] = useState<
    { value: number; name: string }[]
  >([
    {
      value: 0,
      name: "No Data",
    },
  ]);
  const [brandOptionValue, setBrandOptionValue] = useState<
    { value: number; name: string }[]
  >([
    {
      value: 0,
      name: "No Data",
    },
  ]);
  const [unitOptionValue, setUnitOptionValue] = useState<
    { value: number; name: string }[]
  >([
    {
      value: 0,
      name: "No Data",
    },
  ]);
  const [subCategoryOptionValue, setSubCategoryOptionValue] = useState<
    { value: number; name: string }[]
  >([
    {
      value: 0,
      name: "No Data",
    },
  ]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchUnits();
  }, [updateBaseinfo]);

  useEffect(() => {
    if (category) {
      fetchSubcatgories();
      setSubcategory("");
    }
  }, [category, updateBaseinfo]);

  // const submitButtonHandler = () => {
  //   console.log("category", category);
  // };

  //fetch category details
  const fetchCategories = async () => {
    const fetchData = async () => {
      const response = await fetch(
        pathname + "/api/addnew-baseinfo?title=Category&category=0"
      );
      const res = await response.json();

      //create option array
      const optionArray: { value: number; name: string }[] = res.fetchData.map(
        (c: any) => {
          return { value: c.categoryid, name: c.categoryname };
        }
      );
      setCategoryOptionValue(optionArray);
    };
    // call the function
    fetchData().catch(console.error);
  };

  //fetch brand details
  const fetchBrands = async () => {
    const fetchData = async () => {
      const response = await fetch(
        pathname + "/api/addnew-baseinfo?title=Brand&category=0"
      );
      const res = await response.json();

      //create option array
      const optionArray: { value: number; name: string }[] = res.fetchData.map(
        (c: any) => {
          return { value: c.brandid, name: c.brandname };
        }
      );
      setBrandOptionValue(optionArray);
    };
    // call the function
    fetchData().catch(console.error);
  };

  //fetch unit details
  const fetchUnits = async () => {
    const fetchData = async () => {
      const response = await fetch(
        pathname + "/api/addnew-baseinfo?title=Unit&category=0"
      );
      const res = await response.json();

      //create option array
      const optionArray: { value: number; name: string }[] = res.fetchData.map(
        (c: any) => {
          return { value: c.unitid, name: c.unit };
        }
      );
      setUnitOptionValue(optionArray);
    };
    // call the function
    fetchData().catch(console.error);
  };

  //fetch unit details
  const fetchSubcatgories = async () => {
    const fetchData = async () => {
      const response = await fetch(
        pathname + "/api/addnew-baseinfo?title=Subcategory&category=" + category
      );
      const res = await response.json();

      //create option array
      const optionArray: { value: number; name: string }[] = res.fetchData.map(
        (c: any) => {
          return { value: c.subcategoryid, name: c.subcategoryname };
        }
      );
      setSubCategoryOptionValue(optionArray);
    };
    // call the function
    fetchData().catch(console.error);
  };

  const saveItem = async () => {
    const validation = inputFieldValidation({
      itemname,
      category,
      brand,
      cost,
      unit,
      retailsalesprice,
    });
    if (validation == 0) {
      console.log("subcategory", subcategory);
      const response = await fetch(pathname + "/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          extraitemcode,
          barcode,
          itemname,
          category,
          subcategory,
          brand,
          retailsalesprice,
          retailautosalesprice,
          retailpricechange,
          retailmarkup,
          smallwholesalesprice,
          smallwholeautosalesprice,
          smallwholepricechange,
          smallwholemarkup,
          largewholesalesprice,
          largewholeautosalesprice,
          largewholepricechange,
          largewholemarkup,
          cost,
          stockcontrol,
          currentstock,
          stocklimit,
          unit,
          netweight,
          grossweight,
          location,
        }),
      });
      const res = await response.json();
      if (res == "SUCCESS") {
        toast.success(`item created successfully!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/home/products");
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return res;
    }
  };
  // const subCategoryOptionValue = [
  //   { value: "sub1", label: "Sub 1" },
  //   { value: "sub2", label: "Sub 2" },
  // ];
  // const brandOptionValue = [
  //   { value: "brand1", label: "Brand 1" },
  //   { value: "brand2", label: "Brand 2" },
  // ];
  // const unitOptionValue = [
  //   { value: "unit1", label: "Unit 1" },
  //   { value: "unit2", label: "Unit 2" },
  // ];
  return (
    <div className="flex ml-3 flex-col w-full bg-slate-200">
      <span className="text-3xl font-black leading-none text-gray-900 select-none  pt-3">
        Add <span className="text-indigo-600">item</span>
      </span>
      <div>
        <div className="w-full flex flex-col gap-4 mt-2 pb-2 pt-2 border border-gray-400 border-solid rounded-lg">
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Code"
                size="sm"
                value={itemcode}
                onChange={(e) => setItemcode(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Extra Code"
                size="sm"
                value={extraitemcode}
                onChange={(e) => setExtraitemcode(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Barcode"
                size="sm"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 w-full">
              <Input
                type="text"
                variant="flat"
                label="Name"
                size="sm"
                value={itemname}
                onChange={(e) => setItemname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3 flex items-center justify-center">
              <AddnewPopup title="Category" />
              <Select
                label="Category"
                size="sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptionValue.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.name}
                  </SelectItem>
                ))}
              </Select>
              {category ? (
                <AddnewPopup
                  title="Category"
                  id={category}
                  optionArray={categoryOptionValue}
                />
              ) : null}
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3  flex items-center justify-center">
              {category ? (
                <AddnewPopup title="Subcategory" pid={category} />
              ) : null}
              <Select
                label="Subcategory"
                size="sm"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                {subCategoryOptionValue.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.name}
                  </SelectItem>
                ))}
              </Select>
              {subcategory ? (
                <AddnewPopup
                  title="Subcategory"
                  id={subcategory}
                  optionArray={subCategoryOptionValue}
                />
              ) : null}
              {/* <span className={subcategory ? "text-gray-500" : "hidden"}>
                <AiFillEdit className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
              </span> */}
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3  flex items-center justify-center">
              <AddnewPopup title="Brand" />
              <Select
                label="Brand"
                size="sm"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {brandOptionValue.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.name}
                  </SelectItem>
                ))}
              </Select>
              {brand ? (
                <AddnewPopup
                  title="Brand"
                  id={brand}
                  optionArray={brandOptionValue}
                />
              ) : null}
              {/* <span className={brand ? "text-gray-500" : "hidden"}>
                <AiFillEdit className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
              </span> */}
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Net weight"
                size="sm"
                value={netweight}
                onChange={(e) => setNetweight(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Gross weight"
                size="sm"
                value={grossweight}
                onChange={(e) => setGrossweight(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Location"
                size="sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Cost"
                size="sm"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3 flex items-center justify-center">
              <AddnewPopup title="Unit" />
              {/* <span className="text-gray-500">
                <BsFillPlusCircleFill className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
              </span> */}
              <Select
                label="Unit"
                size="sm"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {unitOptionValue.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.name}
                  </SelectItem>
                ))}
              </Select>
              {unit ? (
                <AddnewPopup
                  title="Unit"
                  id={unit}
                  optionArray={unitOptionValue}
                />
              ) : null}
              {/* <span className={unit ? "text-gray-500" : "hidden"}>
                <AiFillEdit className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500" />
              </span> */}
            </div>
            {/* <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Gross weight"
                size="sm"
                value={grossweight}
                onChange={(e) => setGrossweight(e.target.value)}
              />
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/3">
              <Input
                type="text"
                variant="flat"
                label="Location"
                size="sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div> */}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-3 border-b pb-1 border-gray-400">
          <div className="flex flex-wrap">
            <div className="flex flex-wrap w-full sm:w-1/2 border border-gray-400 border-solid rounded-lg">
              <div
                className={`flex flex-col w-full ${
                  retailautosalesprice ? "sm:w-1/2" : "sm:w-1/3"
                } flex-wrap`}
              >
                <div className="mt-1 ml-1">
                  <span className="inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-blue-200 text-xs font-semibold text-blue-600 uppercase">
                    Retail price
                  </span>
                </div>
                <div className="flex flex-wrap m-1">
                  <div
                    className={`mb-6 md:mb-0 gap-4 w-full ${
                      retailautosalesprice ? "sm:w-1/2" : "sm:w-1/1"
                    }`}
                  >
                    <Input
                      type="text"
                      variant="flat"
                      label="Sales price"
                      size="sm"
                      value={retailsalesprice}
                      onChange={(e) => setRetailsalesprice(e.target.value)}
                    />
                  </div>
                  <div
                    className={
                      retailautosalesprice
                        ? "mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2"
                        : "hidden"
                    }
                  >
                    <Input
                      type="text"
                      variant="flat"
                      label="Markup %"
                      size="sm"
                      value={retailmarkup}
                      onChange={(e) => setRetailmarkup(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col w-full px-1 mt-2 ${
                  retailautosalesprice ? "sm:w-1/2" : "sm:w-2/3"
                }`}
              >
                <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-1/5 flex items-center">
                  <Checkbox
                    isSelected={retailautosalesprice}
                    onValueChange={setRetailautosalesprice}
                  >
                    Automatic
                  </Checkbox>
                </div>
                <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-4/5 flex items-center">
                  <Checkbox
                    isSelected={retailpricechange}
                    onValueChange={setRetailpricechange}
                  >
                    Allow price change at the moment of the sale
                  </Checkbox>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full sm:w-1/2 border border-gray-400 border-solid rounded-lg">
              <div
                className={`flex flex-col w-full ${
                  smallwholeautosalesprice ? "sm:w-1/2" : "sm:w-1/3"
                } flex-wrap`}
              >
                <div className="mt-1 ml-1">
                  <span className="inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-blue-200 text-xs font-semibold text-blue-600 uppercase">
                    Small wholesale price
                  </span>
                </div>
                <div className="flex flex-wrap m-1">
                  <div
                    className={`mb-6 md:mb-0 gap-4 w-full ${
                      smallwholeautosalesprice ? "sm:w-1/2" : "sm:w-1/1"
                    }`}
                  >
                    <Input
                      type="text"
                      variant="flat"
                      label="Sales price"
                      size="sm"
                      value={smallwholesalesprice}
                      onChange={(e) => setSmallwholesalesprice(e.target.value)}
                    />
                  </div>
                  <div
                    className={
                      smallwholeautosalesprice
                        ? "mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2"
                        : "hidden"
                    }
                  >
                    <Input
                      type="text"
                      variant="flat"
                      label="Markup %"
                      size="sm"
                      value={smallwholemarkup}
                      onChange={(e) => setSmallwholemarkup(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col w-full px-1 mt-2 ${
                  smallwholeautosalesprice ? "sm:w-1/2" : "sm:w-2/3"
                }`}
              >
                <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-1/5 flex items-center">
                  <Checkbox
                    isSelected={smallwholeautosalesprice}
                    onValueChange={setSmallwholeautosalesprice}
                  >
                    Automatic
                  </Checkbox>
                </div>
                <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-4/5 flex items-center">
                  <Checkbox
                    isSelected={smallwholepricechange}
                    onValueChange={setSmallwholepricechange}
                  >
                    Allow price change at the moment of the sale
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-wrap w-full sm:w-1/2 border border-gray-400 border-solid rounded-lg">
              <div
                className={`flex flex-col w-full ${
                  largewholeautosalesprice ? "sm:w-1/2" : "sm:w-1/3"
                } flex-wrap`}
              >
                <div className="mt-1 ml-1">
                  <span className="inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-blue-200 text-xs font-semibold text-blue-600 uppercase">
                    Large wholesale price
                  </span>
                </div>
                <div className="flex flex-wrap m-1">
                  <div
                    className={`mb-6 md:mb-0 gap-4 w-full ${
                      largewholeautosalesprice ? "sm:w-1/2" : "sm:w-1/1"
                    }`}
                  >
                    <Input
                      type="text"
                      variant="flat"
                      label="Sales price"
                      size="sm"
                      value={largewholesalesprice}
                      onChange={(e) => setLargewholesalesprice(e.target.value)}
                    />
                  </div>
                  <div
                    className={
                      largewholeautosalesprice
                        ? "mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2"
                        : "hidden"
                    }
                  >
                    <Input
                      type="text"
                      variant="flat"
                      label="Markup %"
                      size="sm"
                      value={largewholemarkup}
                      onChange={(e) => setLargewholemarkup(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col w-full px-1 mt-2 ${
                  largewholeautosalesprice ? "sm:w-1/2" : "sm:w-2/3"
                }`}
              >
                <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-1/5 flex items-center">
                  <Checkbox
                    isSelected={largewholeautosalesprice}
                    onValueChange={setLargewholeautosalesprice}
                  >
                    Automatic
                  </Checkbox>
                </div>
                <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-4/5 flex items-center">
                  <Checkbox
                    isSelected={largewholepricechange}
                    onValueChange={setLargewholepricechange}
                  >
                    Allow price change at the moment of the sale
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-2 pb-2 pt-2  border border-gray-400 border-solid rounded-lg">
          <div className="flex flex-wrap">
            <div className="mb-6 md:mb-0 gap-4 w-full px-3 flex sm:w-1/5">
              <div className="flex items-center">
                <input
                  checked={stockcontrol}
                  onChange={(e) => setStockcontrol(e.target.checked)}
                  type="checkbox"
                  className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
                />
              </div>
              <h1 className="flex items-center font-semibold">Control stock</h1>
            </div>
            <div
              className={`flex flex-wrap w-full sm:w-4/5 ${
                stockcontrol ? "" : "pointer-events-none"
              }`}
            >
              <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2">
                <Input
                  type="text"
                  variant="flat"
                  label="Current stock"
                  size="sm"
                  value={currentstock}
                  onChange={(e) => setCurrentstock(e.target.value)}
                />
              </div>
              <div className="mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2">
                <Input
                  type="text"
                  variant="flat"
                  label="Stock limit"
                  size="sm"
                  value={stocklimit}
                  onChange={(e) => setStocklimit(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-2">
          <div className="flex flex-wrap">
            <div className="px-1">
              <Button
                color="primary"
                startContent={<AiFillSave />}
                onClick={saveItem}
              >
                Save
              </Button>
            </div>
            <div>
              <Button color="default" startContent={<GiCancel />}>
                Cancel
              </Button>
            </div>
            <div className={itemcode ? "ml-auto" : "hidden"}>
              <Button
                color="default"
                startContent={<BsFillExclamationOctagonFill />}
              >
                Disable product
              </Button>
            </div>
            <div className={itemcode ? "px-3" : "hidden"}>
              <Button color="default" startContent={<AiFillCopy />}>
                Copy
              </Button>
            </div>
            <div className={itemcode ? "px-3" : "hidden"}>
              <Button color="default" startContent={<ImBin />}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <button
              onClick={submitButtonHandler}
              className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Submit
            </button> */
}
