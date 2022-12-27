import { useState } from "react";
import { DndProvider } from "react-dnd";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
    Tree,
    MultiBackend,
    DragLayerMonitorProps,
    getDescendants,
    getBackendOptions
} from "@minoru/react-dnd-treeview";
import { AddDialog } from "../AddDialog/AddDialog";
import styles from "./Sidebar.module.css";
import SampleData from "../../sample_data.json";
import { TreeNode } from "../TreeView/TreeNode";
import { CustomData, NodeModel } from "../../Utils/Types/types";
import { CustomDragPreview } from "../TreeView/DragPreview";

const getLastId = (treeData: NodeModel[]) => {
    const reversedArray = [...treeData].sort((a, b) => {
        if (a.id < b.id) {
            return 1;
        } else if (a.id > b.id) {
            return -1;
        }
        return 0;
    });

    if (reversedArray.length > 0) {
        return reversedArray[0].id;
    }

    return 0;
};
const Sidebar = () => {
    const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>(SampleData);
    const handleDrop = (newTree: any) => setTreeData(newTree);
    const [open, setOpen] = useState<boolean>(false);
    const handleDelete = (id: NodeModel["id"]) => {
        const deleteIds = [
            id,
            ...getDescendants(treeData, id).map((node) => node.id)
        ];
        const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

        setTreeData(newTree);
    };

    const handleCopy = (id: NodeModel["id"]) => {
        const lastId = getLastId(treeData);
        const targetNode: any = treeData.find((n) => n.id === id);
        const descendants = getDescendants(treeData, id);
        const partialTree = descendants.map((node: any) => ({
            ...node,
            id: node.id + lastId,
            parent: node.parent + lastId
        }));

        setTreeData([
            ...treeData,
            {
                ...targetNode,
                id: targetNode.id + lastId
            },
            ...partialTree
        ]);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSubmit = (newNode: any) => {
        const lastId = getLastId(treeData) + 1;
        setTreeData([
            ...treeData,
            {
                ...newNode,
                id: lastId
            }
        ]);
        setOpen(false);
    };

    return (
        <div>
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <Button className={styles.addNodeBtn} onClick={handleOpenDialog} startIcon={<AddIcon />}>
                    Add Node
                </Button>
                {open && (
                    <AddDialog
                        tree={treeData}
                        onClose={handleCloseDialog}
                        onSubmit={handleSubmit}
                    />
                )}
                <Tree
                    tree={treeData}
                    rootId={0}
                    render={(node: any, options) => (
                        <TreeNode
                            node={node}
                            {...options}
                            onDelete={handleDelete}
                            onCopy={handleCopy}
                        />
                    )}
                    dragPreviewRender={(
                        monitorProps: DragLayerMonitorProps<CustomData>
                    ) => <CustomDragPreview monitorProps={monitorProps} />}
                    onDrop={handleDrop}
                    classes={{
                        root: styles.treeRoot,
                        draggingSource: styles.draggingSource,
                        dropTarget: styles.dropTarget
                    }}
                />
            </DndProvider>
        </div>
    )
}

export default Sidebar