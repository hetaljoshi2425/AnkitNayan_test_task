import React, { useState } from "react";
import {
    Button,
    Select,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import styles from "./AddDialog.module.css";
import { NodeModel } from "../../Utils/Types/types";

type Props = {
    tree: NodeModel[];
    onClose: () => void;
    onSubmit: (e: any) => void;
};

export const AddDialog: React.FC<Props> = (props) => {
    const [addField, setAddField] = useState<any>({ text: "", fileType: "folder", parent: 0 })

    const handleChange = (e: any) => {
        setAddField({ ...addField, [e.target.name]: e.target.value })
    }

    return (
        <Dialog open={true} onClose={props.onClose} className={styles.nodeModel} sx={{
            '& .MuiPaper-elevation': {
                width: "450px",
            }
        }}>
            <DialogTitle sx={{
                borderBottom: '1px solid #c1c1c1',
            }}>
                Add New Node
            </DialogTitle>
            <DialogContent className={styles.content}>
                <div>
                    <TextField fullWidth label="Text" name="text" onChange={handleChange} value={addField.text} />
                </div>
                <div>
                    <FormControl className={styles.select}>
                        <InputLabel>Parent</InputLabel>
                        <Select label="Parent" name="parent" onChange={handleChange} value={addField.parent}>
                            <MenuItem value={0}>(root)</MenuItem>
                            {props.tree
                                .filter((node) => node.droppable === true)
                                .map((node) => (
                                    <MenuItem key={node.id} value={node.id}>
                                        {node.text}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={styles.select}>
                        <InputLabel>File type</InputLabel>
                        <Select
                            label="FileType"
                            name="fileType"
                            onChange={handleChange}
                            value={addField.fileType}
                        >
                            <MenuItem value="folder">Folder</MenuItem>
                            <MenuItem value="text">File</MenuItem>
                            <MenuItem value="image">Image</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions sx={{
                borderTop: '1px solid #c1c1c1',
            }}>
                <Button variant="outlined" onClick={props.onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    disabled={addField.text === ""}
                    onClick={() =>
                        props.onSubmit({
                            text: addField.text,
                            parent: addField.parent,
                            droppable: addField.fileType === 'folder' && true,
                            data: {
                                fileType: addField.fileType !== 'folder' && addField.fileType
                            }
                        })
                    }
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog >
    );
};
