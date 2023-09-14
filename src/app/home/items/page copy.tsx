// "use client";
// import Image from "next/image";

// import { Button } from "@nextui-org/button";
// import { Card, CardBody } from "@nextui-org/card";
// import { useState } from "react";
// import InlineTextInputField from "@/app/components/input-fields/inline-text-input-fields";
// import Label from "@/app/components/input-fields/label";
// // import ProductSize from './components/ProductSize'

// // import shoe from "@/public/images/shoe.webp";

// export default function Item() {
//   const [itemcode, setItemcode] = useState("");
//   const [extraitemcode, setExtraitemcode] = useState("");
//   const [password, setPassword] = useState("admin");
//   return (
//     <div className="flex ml-3 flex-col w-3/4">
//       <span className="text-3xl font-black leading-none text-gray-900 select-none">
//         Add <span className="text-indigo-600">item</span>
//       </span>
//       <div className="flex flex-col w-3/4 mt-3">
//         <div className="flex flex-wrap w-full">
//           <div className="flex">
//             <InlineTextInputField
//               label="Code"
//               id="itemcode"
//               name="itemcode"
//               autoComplete=""
//               placeholder=""
//               value={itemcode}
//               onChange={(e) => setItemcode(e.target.value)}
//             />
//           </div>
//           <div className="flex justify-end items-end ml-auto">
//             <InlineTextInputField
//               label="Extra Code"
//               id="extraitemcode"
//               name="extraitemcode"
//               autoComplete=""
//               placeholder=""
//               value={extraitemcode}
//               onChange={(e) => setExtraitemcode(e.target.value)}
//             />
//           </div>
//         </div>
//         <InlineTextInputField
//           label="Password"
//           id="password"
//           name="password"
//           autoComplete=""
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           labelWidth="w-1/4"
//         />
//         <InlineTextInputField
//           label="Password"
//           id="password"
//           name="password"
//           autoComplete=""
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <InlineTextInputField
//           label="Password"
//           id="password"
//           name="password"
//           autoComplete=""
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// }
