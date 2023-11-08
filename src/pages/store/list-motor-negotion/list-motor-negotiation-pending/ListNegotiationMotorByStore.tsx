import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { columns } from '../negotiation-table/NegotiationTableStore';
import NegotiationInforModalByStore from '../negotiation-infor-modal/NegotiationInforModalByStore';
import {
    INegotiation,
    ISelectRowNegotiation,
} from '../../../../models/Negotiation/Negotiation';
import {
    clearNegotiation, getNegotiationRequest,
} from '../../../../services/features/negotiation/negotiationSlice';

const ListNegotiationMotorByStore = () => {
    const dispatch = useAppDispatch();
    const { negotiations, loading } = useAppSelector(
        (state) => state.negotiation,
    );

    const [selectedRow, setSelectedRow] =
        useState<ISelectRowNegotiation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(clearNegotiation());
        dispatch(getNegotiationRequest());
    }, [dispatch]);

    const loadingData = () => {
        dispatch(clearNegotiation());
        dispatch(getNegotiationRequest());
    };

    const pendingNegotiation = useMemo(() => {
        return (negotiations ?? []).filter(
            (nego: INegotiation) => nego.negotiations[0].status === 'PENDING',
        );
    }, [negotiations]);

    const rows = useMemo(() => {
        return pendingNegotiation.map((nego: INegotiation) => ({
            id: nego.negotiations[0].negotiationId,
            motorName: nego.motor.motorName,
            images: nego.motor.motorbikeImages[0].imageLink,
            certificateNumber: nego.motor.certificateNumber,
            year: format(new Date(nego.motor.year), 'dd/MM/yyyy'),
            price: nego.negotiations[0].price,
            startTime: format(new Date(nego.negotiations[0].startTime), 'dd/MM/yyyy'),
            endTime: format(new Date(nego.negotiations[0].endTime), 'dd/MM/yyyy'),
            ownerName: nego.receiver?.userName,
            ownerPhone: nego.receiver?.phone,
            ownerAddress: nego.receiver?.address,
            noteNegotiation: nego?.negotiations[0]?.description,
            negotiationStatus: nego.negotiations[0].status,
            motorStatus: nego.motor?.motorStatus.title,
        }));
    }, [pendingNegotiation]);

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as ISelectRowNegotiation);
        setIsModalOpen(true);
    };

    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách thương lượng
                </Typography>
                <Typography fontSize="12px" gutterBottom color="red">
                    <strong>Lưu ý: </strong>Vui lòng nhấn đúp vào 1 hàng để xem
                    thông tin cửa hàng đang thương lượng và cập nhật trạng thái
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                    loading={loading}
                    autoHeight
                    localeText={{
                        noRowsLabel: 'Không có dữ liệu',
                    }}
                />
            </Paper>
            <NegotiationInforModalByStore
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedRow}
                loadingData={loadingData}
            />
        </Container>
    );
};

export default ListNegotiationMotorByStore;
