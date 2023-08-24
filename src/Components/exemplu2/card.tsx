import type { CSSProperties, FC } from 'react';
import { useDrag } from 'react-dnd';


const style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
  }

export interface CardProps {
   
    id:string
    name: string,

  }
  

export const Card :React.FC<CardProps> = (({id, name}) =>{

  const [{isDragging}, drag] = useDrag(()=>({
    type:"card",
    item: {id:id,name:name},
    collect:(monitor) =>({

        isDragging: !!monitor.isDragging(),
    }),

}));


  return(

    
    <div style={{ border:"1px solid black", width:"200px"}} ref={drag}>
            ID: {id} | Name: {name}
    </div>
    
    
  )

});


