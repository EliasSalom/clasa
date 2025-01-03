import {Box, Button, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {FC} from "react";

const InputPanel:FC = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data); // Pass data to the preview panel
    };

    return (
        <Box sx={{ padding: 3, maxWidth:"30%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Width (cm)"
                    {...register('width', { required: true })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Height (cm)"
                    {...register('height', { required: true })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Depth (cm)"
                    {...register('depth', { required: true })}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Update Preview
                </Button>
            </form>
        </Box>
    );
};

export default InputPanel;