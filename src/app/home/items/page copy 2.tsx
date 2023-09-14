// "use client";
// import Image from "next/image";

// import { Button } from "@nextui-org/button";
// import { Card, CardBody } from "@nextui-org/card";
// import { useState } from "react";
// import InlineTextInputField from "@/app/components/input-fields/inline-text-input-fields";
// import Label from "@/app/components/input-fields/label";
// import { Input } from "@nextui-org/react";
// // import ProductSize from './components/ProductSize'

// // import shoe from "@/public/images/shoe.webp";

// export default function Item() {
//   const [itemcode, setItemcode] = useState("");
//   const [extraitemcode, setExtraitemcode] = useState("");
//   const [password, setPassword] = useState("admin");

//   const submitButtonHandler = () => {
//     console.log("itemcode", itemcode);
//   };

//   return (
//     <div className="flex ml-3 flex-col w-3/4">
//       <span className="text-3xl font-black leading-none text-gray-900 select-none">
//         Add <span className="text-indigo-600">item</span>
//       </span>
//       <div className="flex flex-col w-3/4 mt-3">
//         <Input
//           type="text"
//           variant="flat"
//           label="Email"
//           color="default"
//           className="h-1 ml-2 w-full"
//           value={itemcode}
//           onChange={(e) => setItemcode(e.target.value)}
//         />
//         <Input
//           type="text"
//           variant="flat"
//           label="Email"
//           color="default"
//           className="h-1 ml-2 w-full"
//           value={itemcode}
//           onChange={(e) => setItemcode(e.target.value)}
//         />
//         <div className="-mx-3 flex flex-wrap">
//           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//             <Input
//               type="text"
//               variant="flat"
//               label="Email"
//               color="default"
//               className="h-1 ml-2 w-full"
//               value={itemcode}
//               onChange={(e) => setItemcode(e.target.value)}
//             />
//           </div>
//           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//             <Input
//               type="text"
//               variant="flat"
//               label="Email"
//               color="default"
//               className="h-1 ml-2 w-full"
//               value={itemcode}
//               onChange={(e) => setItemcode(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="-mx-3 flex flex-wrap">
//           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//             <Input
//               type="text"
//               variant="flat"
//               label="Email"
//               color="default"
//               className="h-1 ml-2 w-full"
//               value={itemcode}
//               onChange={(e) => setItemcode(e.target.value)}
//             />
//           </div>
//           <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
//             <Input
//               type="text"
//               variant="flat"
//               label="Email"
//               color="default"
//               className="h-1 ml-2 w-full"
//               value={itemcode}
//               onChange={(e) => setItemcode(e.target.value)}
//             />
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
