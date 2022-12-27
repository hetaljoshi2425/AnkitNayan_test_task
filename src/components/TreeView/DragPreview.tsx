import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import { IconType } from "./IconType";
import styles from "./DragPreview.module.css";
import { CustomData } from "../../Utils/Types/types";

type Props = {
    monitorProps: DragLayerMonitorProps<CustomData>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
    const item: any = props.monitorProps.item;
    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <IconType droppable={item?.droppable} fileType={item?.data?.fileType} />
            </div>
            <div className={styles.label}>{item.text}</div>
        </div>
    );
};
