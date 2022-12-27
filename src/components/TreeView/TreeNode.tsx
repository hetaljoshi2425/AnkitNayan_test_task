import React from "react";
import Typography from "@mui/material/Typography";
import { ArrowRight } from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import styles from "./TreeNode.module.css";
import { IconType } from "./IconType";
import { CustomData, NodeModel } from "../../Utils/Types/types";

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onDelete: (id: NodeModel["id"]) => void;
  onCopy: (id: NodeModel["id"]) => void;
};

export const TreeNode: React.FC<Props> = (props: any) => {
  const { id, droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
    >
      <div
        className={`${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : ""
          }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRight />
          </div>
        )}
      </div>
      <div>
        <IconType droppable={droppable} fileType={data?.fileType} />
      </div>
      <div className={styles.labelGridItem}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
