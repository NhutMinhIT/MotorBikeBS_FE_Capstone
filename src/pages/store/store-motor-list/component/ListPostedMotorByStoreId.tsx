import React, { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns } from './table/Table';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import {
    cancelPosting,
    clearMotor,
    getMotorByStoreId,
} from '../../../../services/features/motorbike/motorbikeSlice';
import { toast } from 'react-toastify';
import { createBillInStock } from '../../../../services/features/bill/billSlice';
import '../style/style.scss';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';

interface ListMotorProps {
    loadData: () => void;
}

const ListPostedMotorByStoreId: React.FC<ListMotorProps> = ({ loadData }) => {
    const dispatch = useAppDispatch();
    const { motorbikeByStoreId, loading } = useAppSelector(
        (state) => state.motorbikes,
    );
    const { user } = useAppSelector((state) => state.users);

    const formatPrice = useFormatCurrency();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [isConfirmCancelPost, setIsConfirmCancelPost] = useState(false);
    const [isConfirmSale, setIsConfirmSale] = useState(false);

    const [selectedRow, setSelectedRow] = useState<IMotorbike | null>(null);

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const openCancelPostModal = () => {
        setIsDetailModalOpen(false);
        setIsConfirmCancelPost(true);
        setSelectedRow(selectedRow);
    };

    const openSaleModal = () => {
        setIsDetailModalOpen(false);
        setIsConfirmSale(true);
        setSelectedRow(selectedRow);
    };

    const handleCloseDialog = () => {
        setIsDetailModalOpen(false);
        setIsConfirmCancelPost(false);
        setIsConfirmSale(false);
    };

    const handleSubmitConfirmSaleMotor = () => {
        dispatch(
            createBillInStock({
                newUser: 0,
                motorId: Number(selectedRow?.id),
            }),
        )
            .unwrap()
            .then(() => {
                toast.success('Đã chuyển qua xe đã bán!');
                loadData();
                handleCloseDialog();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmitConfirmCancelPost = () => {
        dispatch(
            cancelPosting({
                motorId: Number(selectedRow?.id),
            }),
        )
            .unwrap()
            .then(() => {
                toast.success('Hủy đăng bài thành công!');
                loadData();
                handleCloseDialog();
            })
            .catch((error) => {
                toast.error(error?.error[0]);
            });
    };

    React.useEffect(() => {
        dispatch(clearMotor());
        dispatch(
            getMotorByStoreId({
                storeId: Number(user?.storeDesciptions[0]?.storeId),
            }),
        );
    }, [dispatch, user]);

    const motorbikesByStoreStorage =
        motorbikeByStoreId &&
        motorbikeByStoreId?.filter(
            (motor) => motor?.motorStatus.motorStatusId !== 3,
        );

    const rows = useMemo(() => {
        return (motorbikesByStoreStorage ?? []).map((motor: IMotorbike) => ({
            id: motor.motorId,
            storeId: motor?.storeId,
            certificateNumber: motor?.certificateNumber,
            images: motor.motorbikeImages[0]?.imageLink,
            motorName: motor?.motorName,
            odo: motor?.odo,
            year: motor?.year,
            price: motor?.price,
            modelName: motor.model?.modelName,
            motorTypeName: motor.motorType?.title,
            motorStatuss: motor.motorStatus?.title,
        }));
    }, [motorbikesByStoreStorage]);

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IMotorbike);
        setIsDetailModalOpen(true);
    };

    return (
        <Container maxWidth="xl">
            <div
                style={{
                    marginBottom: '32px',
                    width: '100%',
                }}
            >
                <DataGrid
                    sx={{
                        '& .css-gl260s-MuiDataGrid-columnHeadersInner': {
                            background: '#ccc',
                        },
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                    autoHeight
                    localeText={{
                        noRowsLabel: 'Không có dữ liệu',
                    }}
                    loading={loading}
                />
            </div>

            <Dialog open={isDetailModalOpen} onClose={closeDetailModal}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Thông tin xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <Box flexGrow={12} className="table-content">
                            <Box flexGrow={10}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Tên xe
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow.motorName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Số đăng ký
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {
                                                        selectedRow.certificateNumber
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Số Km
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow.odo}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Năm đăng ký
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {new Date(
                                                        selectedRow.year,
                                                    ).toLocaleDateString(
                                                        'vi-VN',
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Model
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow?.modelName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Loại xe
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow?.motorTypeName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Năm đăng ký
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {formatPrice(
                                                        selectedRow.price,
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    {selectedRow && selectedRow?.motorStatuss === 'POSTING' && (
                        <Button onClick={openSaleModal} color="secondary">
                            Đã bán Tại cửa hàng
                        </Button>
                    )}
                    {selectedRow &&
                        selectedRow?.motorStatuss === 'CONSIGNMENT' && (
                            <Button color="secondary">Đã bán kí gởi</Button>
                        )}
                    {selectedRow &&
                        selectedRow?.motorStatuss === 'LIVELIHOOD' && (
                            <Button color="secondary">
                                Đã bán không kí gởi
                            </Button>
                        )}
                    <Button onClick={openCancelPostModal} color="warning">
                        Hủy đăng bài
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isConfirmSale}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Xác nhận bán xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" textAlign="center">
                        Bạn có chắc chắn đã bán xe này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleSubmitConfirmSaleMotor} color="info">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isConfirmCancelPost}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Xác nhận hủy đăng bài
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" textAlign="center">
                        Bạn có chắc chắn hủy đăng bài không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error">
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={handleSubmitConfirmCancelPost}
                        color="info"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ListPostedMotorByStoreId;
