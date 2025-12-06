 //  "use client";
 import './accordion.css'; // Adjust path as needed
 import * as React from "react"; 
 //import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';
 import * as AccordionPrimitive from "@radix-ui/react-accordion@1.2.3";
 import { ChevronDownIcon } from "lucide-react@0.487.0";
 
 function Accordion(props) {
   return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
 }
 
 function AccordionItem({ className, ...props }) {
   return (
     <AccordionPrimitive.Item
       data-slot="accordion-item"
       className={`accordion-item ${className || ''}`}
       {...props}
     />
   );
 }
 
 function AccordionTrigger({ className, children, ...props }) {
   return (
     <AccordionPrimitive.Header className="accordion-header">
       <AccordionPrimitive.Trigger
         data-slot="accordion-trigger"
         className={`accordion-trigger ${className || ''}`}
         {...props}
       >
         {children}
         <ChevronDownIcon className="accordion-chevron" />
       </AccordionPrimitive.Trigger>
     </AccordionPrimitive.Header>
   );
 }
 
 function AccordionContent({ className, children, ...props }) {
   return (
     <AccordionPrimitive.Content
       data-slot="accordion-content"
       className="accordion-content"
       {...props}
     >
       <div className={`accordion-content-inner ${className || ''}`}>
         {children}
       </div>
     </AccordionPrimitive.Content>
   );
 }
 
 export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };