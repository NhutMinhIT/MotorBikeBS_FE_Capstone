import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns } from './table/TableStoreList';
import { getAllStore } from '../../../../services/features/storeSlice';
import { IStore } from '../../../../models/Store/Store';
import StoreModal from '../ModalComponent/StoreModalComponent';

const StoreListActive = () => {
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector((state) => state.store);
    const [selectedRow, setSelectedRow] = useState<IStore | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadData = () => {
        dispatch(getAllStore())
    }

    useEffect(() => {
        dispatch(getAllStore());
    }, [dispatch]);

    const VerifiedStores = useMemo(() => {
        return (stores ?? []).filter((store: IStore) => store.status === 'ACTIVE');
    }, [stores]);

    const rows = useMemo(() => {
        return VerifiedStores.map((store: IStore) => ({
            id: store.userId,
            storeId: store.storeId,
            storeName: store.storeName,
            taxCode: store.taxCode,
            storePhone: store.storePhone,
            storeEmail: store.storeEmail,
            address: store.address,
            storeCreatedAt: store.storeCreatedAt,
            storeUpdatedAt: store.storeUpdatedAt,
            status: store.status,
        }));
    }, [VerifiedStores]);
    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IStore);
        setIsModalOpen(true);
    };
    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng đã xác thực
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                />
            </Paper>
            <StoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedRow} loadData={loadData} />
        </Container>
    );
};

export default StoreListActive;