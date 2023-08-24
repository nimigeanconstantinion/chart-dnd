import React from "react";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

import { useDrop } from 'react-dnd';
import { CardProps } from "./card";
import {WrapperCard} from "./CardStyle";



export interface RecursiveComponentProps {
    id: string,
    name: string,
    children?: RecursiveComponentProps[];
  }
  

  const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

const RecursiveComponent: React.FC<RecursiveComponentProps> = ({ id, name, children }) => {
   
    
  const [{isOver}, drop] = useDrop(() => ({
    accept:"card",
    drop: (item:CardProps) => addCardToArr(item),
    collect: (monitor) => ({
        isOver: !!monitor.isOver(),
    })
})) 
   
const addCardToArr = (item: CardProps)=>{
    console.log("Sunt in drop");
    let adr:RecursiveComponentProps={
        id:item.id,
        name:item.name,
        children:new Array<RecursiveComponentProps>()
    }
    children?.push(adr);
    console.log(children);
}
   
    return (
    
      <>
      
      <TreeNode
            label={
            <WrapperCard ref = {drop} >
            ID: {id} | Name: {name}
            </WrapperCard>}
           
            >	
           
            {children && children.map((child) => <RecursiveComponent key={child.id} {...child} />)}
        </TreeNode>
      
      </>
        
    );
  };
  
  export default RecursiveComponent;
  