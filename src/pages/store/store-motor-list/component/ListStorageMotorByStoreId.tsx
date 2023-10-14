import React, { useMemo, useState } from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns } from './table/Table';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import { getMotorByOwnerId } from '../../../../services/features/motorbike/motorbikeSlice';
import PostMotorModalByStore from './PostMotorModalByStore';
import EditMotorModalByStore from './EditMotorModalByStore';
import ReportIcon from '@mui/icons-material/Report';

interface ListMotorProps {
    loadData: () => void;
}

const ListStorageMotorByStoreId: React.FC<ListMotorProps> = ({ loadData }) => {
    const dispatch = useAppDispatch();
    const { motorbikesByOwner } = useAppSelector((state) => state.motorbikes);
    const { account } = useAppSelector((state) => state.account);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isOpenSubmitEditDialog, setIsOpenSubmitEditDialog] = useState(false);
    const [isOpenCancelEditDialog, setIsOpenCancelEditDialog] = useState(false);

    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isOpenSubmitPostDialog, setIsOpenSubmitPostDialog] = useState(false);
    const [isOpenCancelPostDialog, setIsOpenCancelPostDialog] = useState(false);

    const [selectedRow, setSelectedRow] = useState<IMotorbike | null>(null);

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const openEditModal = () => {
        setIsDetailModalOpen(false);
        setIsEditModalOpen(true);
        setSelectedRow(selectedRow);
    };

    const handleCloseDialog = () => {
        setIsEditModalOpen(false);
        setIsOpenSubmitEditDialog(false);
        setIsOpenCancelEditDialog(false);
        setIsPostModalOpen(false);
        setIsOpenSubmitPostDialog(false);
        setIsOpenCancelPostDialog(false);
    };

    const handleOpenSubmitEditDialog = () => {
        setIsOpenSubmitEditDialog(true);
    };
    const handleCloseSubmitEditDialog = () => {
        setIsOpenSubmitEditDialog(false);
    };
    const handleOpenCancelEditDialog = () => {
        setIsOpenCancelEditDialog(true);
    };
    const handleCloseCancelEditDialog = () => {
        setIsOpenCancelEditDialog(false);
    };

    const handleOpenSubmitPostDialog = () => {
        setIsOpenSubmitPostDialog(true);
    };
    const handleCloseSubmitPostDialog = () => {
        setIsOpenSubmitPostDialog(false);
    };
    const handleOpenCancelPostDialog = () => {
        setIsOpenCancelPostDialog(true);
    };
    const handleCloseCancelPostDialog = () => {
        setIsOpenCancelPostDialog(false);
    };

    const openPostModal = () => {
        setIsDetailModalOpen(false);
        setIsPostModalOpen(true);
    };

    React.useEffect(() => {
        dispatch(getMotorByOwnerId({ ownerId: Number(account?.userId) }));
    }, [dispatch, account?.userId]);

    const motorbikesByOwnerStorage =
        motorbikesByOwner &&
        motorbikesByOwner?.filter(
            (motor) => motor?.motorStatus.motorStatusId === 3,
        );

    const rows = useMemo(() => {
        return (motorbikesByOwnerStorage ?? []).map((motor: IMotorbike) => ({
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
            motorStatus: motor.motorStatus?.title,
        }));
    }, [motorbikesByOwnerStorage]);

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
                <div style={{ marginBottom: '8px' }}>
                    <Typography sx={{ color: '#e81c1c', fontSize: '14px' }}>
                        *** Lưu ý{' '}
                        <ReportIcon color="warning" fontSize="small" />
                        <ReportIcon color="warning" fontSize="small" />
                        <ReportIcon color="warning" fontSize="small" />: Bạn
                        phải chỉnh sửa xe để thay đổi trạng thái cửa hàng cho xe
                        trước rồi mới được đăng bài.
                    </Typography>
                </div>
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
                        <>
                            <Typography variant="subtitle1" textAlign="center">
                                Tên xe: {selectedRow.motorName}
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={openEditModal} color="info">
                        Sửa thông tin
                    </Button>
                    {selectedRow && selectedRow.storeId !== null && (
                        <Button onClick={openPostModal} color="warning">
                            Đăng bài
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            <EditMotorModalByStore
                open={isEditModalOpen}
                openSubmit={isOpenSubmitEditDialog}
                openCancel={isOpenCancelEditDialog}
                onOpenSubmitDialog={handleOpenSubmitEditDialog}
                onCloseSubmitDialog={handleCloseSubmitEditDialog}
                onOpenCancelDialog={handleOpenCancelEditDialog}
                onCloseCancelDialog={handleCloseCancelEditDialog}
                onClose={handleCloseDialog}
                selectedRow={selectedRow}
                loadData={loadData}
            />

            <PostMotorModalByStore
                open={isPostModalOpen}
                openSubmit={isOpenSubmitPostDialog}
                openCancel={isOpenCancelPostDialog}
                onOpenSubmitDialog={handleOpenSubmitPostDialog}
                onCloseSubmitDialog={handleCloseSubmitPostDialog}
                onOpenCancelDialog={handleOpenCancelPostDialog}
                onCloseCancelDialog={handleCloseCancelPostDialog}
                onClose={handleCloseDialog}
                selectedRow={selectedRow}
                loadData={loadData}
            />
        </Container>
    );
};

export default ListStorageMotorByStoreId;
