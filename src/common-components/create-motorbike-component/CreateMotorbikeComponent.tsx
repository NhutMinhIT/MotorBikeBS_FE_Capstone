import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextareaAutosize,
    SelectChangeEvent,
} from '@mui/material';

import './style/style.scss';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import {
    getMotorModel,
    getMotorType,
} from '../../services/features/motorbike/motorFields';
import { createMotorbike } from '../../services/features/motorbike/motorbikeSlice';
import { toast } from 'react-toastify';

interface CreateDialogProps {
    open: boolean;
    openSubmit: boolean;
    openCancel: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
    loadData: () => void;
}

interface ICreateMotorbike {
    certificateNumber: string;
    registrationImage: FileList;
    motorName: string;
    modelId: number;
    odo: number;
    year: Date;
    price: number;
    description: string;
    motorTypeId: number;
    images: FileList;
}

const CreateMotorbikeComponent: React.FC<CreateDialogProps> = ({
    open,
    openSubmit,
    openCancel,
    onOpenCancelDialog,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose,
    loadData,
}) => {
    const dispatch = useAppDispatch();
    const { motorModels, motorTypes } = useAppSelector(
        (state) => state.motorFields,
    );

    const [model, setModel] = useState('');
    const [motorType, setMotorType] = useState('');

    const handleChangeModel = (event: SelectChangeEvent) => {
        setModel(event.target.value);
    };

    console.log(model);
    const handleChangeType = (event: SelectChangeEvent) => {
        setMotorType(event.target.value);
    };

    useEffect(() => {
        dispatch(getMotorModel());
        dispatch(getMotorType());
    }, [dispatch]);

    const form = useForm<ICreateMotorbike>({
        defaultValues: {
            certificateNumber: '',
            registrationImage: undefined,
            motorName: '',
            modelId: undefined,
            odo: undefined,
            year: new Date(),
            price: undefined,
            description: '',
            motorTypeId: undefined,
            images: undefined,
        },
    });

    const { formState, handleSubmit, register } = form;
    const { errors } = formState;

    const handleCloseDialog = () => {
        onClose();
    };
    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();
    };

    const onSubmit = (data: ICreateMotorbike) => {
        const formData = new FormData();
        const year = new Date(data.year);
        formData.append('certificateNumber', data.certificateNumber);
        if (data.registrationImage && data.registrationImage.length > 0) {
            formData.append('registrationImage', data.images[0]);
        }
        formData.append('motorName', data.motorName);
        formData.append('modelId', data.modelId.toString());
        formData.append('odo', data.odo.toString());
        formData.append('year', year.toISOString());
        formData.append('price', data.price.toString());
        formData.append('description', data.description);
        formData.append('motorTypeId', data.motorTypeId.toString());
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }
        }
        console.log(data);
        dispatch(createMotorbike(formData))
            .unwrap()
            .then((data) => {
                loadData();
                toast.success('Thêm xe thành công.');
                handleCloseDialog();
            });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Thêm Xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box textAlign="center">
                        <form encType="multipart/form-data" noValidate>
                            <Box flexGrow={12} className="table-content">
                                <Box flexGrow={10}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Số đăng ký xe
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            label="Số đăng ký xe"
                                                            type="text"
                                                            {...register(
                                                                'certificateNumber',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập số đăng ký xe',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.certificateNumber
                                                            }
                                                            helperText={
                                                                errors
                                                                    .certificateNumber
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Thêm ảnh đăng ký xe
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <input
                                                            id="registrationImage"
                                                            type="file"
                                                            {...register(
                                                                'registrationImage',
                                                                {
                                                                    required:
                                                                        'Bạn chưa chọn ảnh đăng ký xe',
                                                                },
                                                            )}
                                                            multiple
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}
                                                        className="header-table"
                                                    >
                                                        Tên xe
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextField
                                                            label="Tên xe"
                                                            type="text"
                                                            {...register(
                                                                'motorName',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập tên xe',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.motorName
                                                            }
                                                            helperText={
                                                                errors.motorName
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Model
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Model
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                label="Model"
                                                                value={model}
                                                                {...register(
                                                                    'modelId',
                                                                    {
                                                                        required:
                                                                            'Bạn chưa chọn model xe',
                                                                    },
                                                                )}
                                                                onChange={
                                                                    handleChangeModel
                                                                }
                                                            >
                                                                {motorModels &&
                                                                    motorModels.map(
                                                                        (
                                                                            motorModel,
                                                                        ) => (
                                                                            <MenuItem
                                                                                key={
                                                                                    motorModel.modelId
                                                                                }
                                                                                value={
                                                                                    motorModel.modelId
                                                                                }
                                                                            >
                                                                                {
                                                                                    motorModel.modelName
                                                                                }
                                                                            </MenuItem>
                                                                        ),
                                                                    )}
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Số Km đã đi
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        {/* <TextField
                                                            label="Số Km đã đi"
                                                            type="text"
                                                            {...register(
                                                                'odo',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập số km đã đi',
                                                                },
                                                            )}
                                                            error={!!errors.odo}
                                                            helperText={
                                                                errors.odo
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        /> */}
                                                        <TextField
                                                            label="Số Km đã đi"
                                                            type="text"
                                                            {...register(
                                                                'odo',
                                                                {
                                                                    validate: (
                                                                        value,
                                                                    ) => {
                                                                        if (
                                                                            !value
                                                                        ) {
                                                                            return 'Bạn chưa nhập số Km đã đi';
                                                                        }
                                                                        if (
                                                                            isNaN(
                                                                                value,
                                                                            )
                                                                        ) {
                                                                            return 'Số Km đã đi phải là một số';
                                                                        }
                                                                        return true;
                                                                    },
                                                                },
                                                            )}
                                                            error={!!errors.odo}
                                                            helperText={
                                                                errors.odo
                                                                    ? errors.odo
                                                                          .message
                                                                    : ''
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Đăng ký mới
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextField
                                                            label="Đăng ký mới"
                                                            type="date"
                                                            {...register(
                                                                'year',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập đăng ký mới',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.year
                                                            }
                                                            helperText={
                                                                errors.year
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Giá
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        {/* <TextField
                                                            label="Giá"
                                                            type="text"
                                                            {...register(
                                                                'price',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập giá xe',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.price
                                                            }
                                                            helperText={
                                                                errors.price
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        /> */}
                                                        <TextField
                                                            label="Giá"
                                                            type="text"
                                                            {...register(
                                                                'price',
                                                                {
                                                                    validate: (
                                                                        value,
                                                                    ) => {
                                                                        if (
                                                                            !value
                                                                        ) {
                                                                            return 'Bạn chưa nhập giá xe';
                                                                        }
                                                                        if (
                                                                            isNaN(
                                                                                value,
                                                                            )
                                                                        ) {
                                                                            return 'Giá phải là một số';
                                                                        }
                                                                        return true;
                                                                    },
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.price
                                                            }
                                                            helperText={
                                                                errors.price
                                                                    ? errors
                                                                          .price
                                                                          .message
                                                                    : ''
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Mô tả
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextareaAutosize
                                                            aria-label="Mô tả của xe"
                                                            {...register(
                                                                'description',
                                                            )}
                                                            style={{
                                                                width: '350px',
                                                                height: '50px',
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Loại xe
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <FormControl fullWidth>
                                                            <InputLabel id="motor-type">
                                                                Loại xe
                                                            </InputLabel>
                                                            <Select
                                                                labelId="motor-type"
                                                                label="Loại xe"
                                                                value={
                                                                    motorType
                                                                }
                                                                {...register(
                                                                    'motorTypeId',
                                                                    {
                                                                        required:
                                                                            'Bạn chưa chọn loại xe',
                                                                    },
                                                                )}
                                                                onChange={
                                                                    handleChangeType
                                                                }
                                                            >
                                                                {motorTypes &&
                                                                    motorTypes.map(
                                                                        (
                                                                            motorType,
                                                                        ) => (
                                                                            <MenuItem
                                                                                value={
                                                                                    motorType.motorTypeId
                                                                                }
                                                                            >
                                                                                {
                                                                                    motorType.title
                                                                                }
                                                                            </MenuItem>
                                                                        ),
                                                                    )}
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Thêm ảnh xe
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <input
                                                            id="images"
                                                            type="file"
                                                            {...register(
                                                                'images',
                                                                {
                                                                    required:
                                                                        'Bạn chưa chọn ảnh cho xe',
                                                                },
                                                            )}
                                                            multiple
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenSubmitDialog}
                            >
                                Thêm xe
                            </Button>
                        </form>
                    </Box>
                    <DialogActions>
                        <Button
                            onClick={handleOpenCancelDialog}
                            color="error"
                            variant="outlined"
                        >
                            Hủy bỏ
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            {/* Dialog Đặt lịch */}
            <Dialog open={openSubmit}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận Thêm xe</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn thêm xe không ?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={onCloseSubmitDialog}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="outlined"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Dialog Hủy */}
            <Dialog open={openCancel}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận hủy bỏ</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn hủy bỏ thêm xe không ?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={onCloseCancelDialog}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        color="success"
                        variant="outlined"
                        onClick={handleCloseDialog}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateMotorbikeComponent;
