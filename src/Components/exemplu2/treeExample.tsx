import React, {useEffect, useState} from 'react';
import RecursiveComponent, {RecursiveComponentProps} from './recursiveComp';
import {Tree, TreeNode} from 'react-organizational-chart';
import styled from 'styled-components';
import Api from "../../Api";
import ResponseImpl from "../../ResponseImpl";
import BKNode from "../Utils";

const TheApp: React.FC = () => {

    const [load, setLoad] = useState(0);
    const [dtt, setDtt] = useState<RecursiveComponentProps>({
        id: '0',
        name: "",
        children: new Array<RecursiveComponentProps>()
    });
    const [indx, setIndx] = useState<number>(0);

    const [ch, setCh] = useState(0);

    const [ad, setAd] = useState(0);

    const StyledNode = styled.div`
      padding: 5px;
      border-radius: 8px;
      display: inline-block;
      border: 1px solid red;
    `;
    const data: RecursiveComponentProps = {
        id: '0',
        name: 'Parent',
        children: [
            {
                id: '2',
                name: 'Child 1',
                children: [
                    {
                        id: '3',
                        name: 'Grandchild 1',
                        children: [],
                    },
                    {
                        id: '4',
                        name: 'Grandchild 2',
                        children: [],
                    },
                ],
            },
            {
                id: '5',
                name: 'Child 2',
                children: [],
            },
        ],
    };


    useEffect(() => {

        handleIndexare();
        console.log(indx);
        loadTree();


    }, [])

    useEffect(() => {
        console.log("Am incarcat dtt");
        setCh(prevState => {
                return prevState = prevState + 1
            }
        );
    }, [dtt])
  
    useEffect(() => {
        console.log("Am schimbat");

    }, [ch])


    // let addNode=async ():Promise<void>=>{
    //    await dtt.children?.push({id:2,name:'Root 1',children:new Array<RecursiveComponentProps>()});
    //   setLoad(1);
    // }
    //

    useEffect(() => {
        console.log("Adaug la index=" + indx);
    }, [indx]);

    let loadTree = async (): Promise<void> => {
        let api = new Api();
        try {
            let response: BKNode[] = await api.getTree();
            let btree: RecursiveComponentProps = {
                id: '0',
                name: "Base",
                children: new Array<RecursiveComponentProps>()

            }
            await handleIndexare();
            if (response.length > 0) {

                response.map((n, index) => {


                    if (n.id != null && n.id != undefined) {

                        btree.children?.push(nodeToRecursiveProp(n, indx));
                        handleIndexare();
                    }
                })
                // bkTree.push({id:'00',label:'Base',subordinates:new Array<BKNode>()})
                // response.map(n=>{
                //   let v=n as BKNode;
                //   if(v.id!=null&&v.id!=undefined){
                //       bkTree.push()

                console.log("Am venit din fend")
                console.log(btree);

                setDtt(btree);
            }
        } catch (e) {

        }
    }

    const handleIndexare = () => {
        // Simulăm indexarea și actualizăm starea numărului
        console.log("-----------  " + indx);
        const numarIndexat = indx + 1;

        setIndx((prevState) => prevState + 1);
    };


    let nodeToRecursiveProp = (nod: BKNode, ind: number): RecursiveComponentProps => {
        handleIndexare();
        let toR: RecursiveComponentProps = {
            id: nod.id,
            name: nod.label,
            children: new Array<RecursiveComponentProps>()
        }

        nod.subordinates.map((s, index) => {
            handleIndexare()

            toR.children!.push(nodeToRecursiveProp(s, indx));

        })
        return toR;
    }


    return (

        <>
            {
                indx && ch > 0 && dtt.children!.length > 0 ? (
                    <Tree
                        label={<StyledNode>Recursive Component Example</StyledNode>}
                    >

                        <RecursiveComponent key={indx} {...dtt} />
                    </Tree>

                ) : ""
            }

        </>


    )
};

export default TheApp;