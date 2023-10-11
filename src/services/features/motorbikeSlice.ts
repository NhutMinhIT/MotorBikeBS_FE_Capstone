import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMotorbike, IMotorbikeDetail } from '../../models/Motorbike/Motorbike';
import {
    getAllOnExChangeEndPoint,
    getAllOnStoreExChangeEndPoint,
    getMotorByIdEndPoint,
    getMotorByOwnerIdEndPoint,
    getMotorByStoreIdEndPoint,
    postMotorRegisterEndPoint,
    updateMotorStatusEndPoint,
} from '../config/api-config';

interface MotorbikeState {
    loading: boolean;
    motorbikes: IMotorbike[] | null;
    motorbikesByOwner: IMotorbike[] | null;
    motorbike: IMotorbike | null;
    motorbikeByStoreId: IMotorbikeDetail[] | null;
    error: string[] | unknown;
}

const initialState: MotorbikeState = {
    loading: false,
    motorbikes: null,
    motorbikesByOwner: null,
    motorbike: null,
    motorbikeByStoreId: null,
    error: null,
};

export const getAllOnExchange = createAsyncThunk<IMotorbike[], void>(
    'motorbikes/getAllOnExchange',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllOnExChangeEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const getAllOnStoreExchange = createAsyncThunk<IMotorbike[], void>(
    'motorbikes/getAllOnStoreExchange',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllOnStoreExChangeEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const getMotorByStoreId = createAsyncThunk<
    IMotorbikeDetail[],
    { storeId: number }
>('motorbikes/getMotorByStoreId', async ({ storeId }, thunkAPI) => {
    // const {storeId} = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getMotorByStoreIdEndPoint}?storeId=${storeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const getMotorByOwnerId = createAsyncThunk<
    IMotorbike[],
    { ownerId: number }
>('motorbikes/getMotorByOwnerId', async ({ ownerId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getMotorByOwnerIdEndPoint}?ownerId=${ownerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const getMotorId = createAsyncThunk<IMotorbike, { motorId: number }>(
    'motorbikes/getMotorById',
    async ({ motorId }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(
                `${getMotorByIdEndPoint}/${motorId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const createMotorbike = createAsyncThunk<IMotorbike, Object>(
    'motorbikes/createMotorbike',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(postMotorRegisterEndPoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const updateMotorStatus = createAsyncThunk<
    IMotorbike,
    { motorId: number; statusId: number }
>('motorbike/updateMotorStatus', async ({ motorId, statusId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        console.log(token);
        const response = await axios.put(
            `${updateMotorStatusEndPoint}?motorId=${motorId}&statusId=${statusId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const motorbikeSlice = createSlice({
    name: 'motorbikes',
    initialState,
    reducers: {
        clearMotor: (state) => {
            state.motorbikes = [];
            state.motorbikeByStoreId = [];
            state.motorbikesByOwner = [];
            state.motorbike = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOnExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOnExchange.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikes = action.payload;
            state.error = null;
        });
        builder.addCase(getAllOnExchange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getAllOnStoreExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOnStoreExchange.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikesByOwner = action.payload;
            state.error = null;
        });
        builder.addCase(getAllOnStoreExchange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorByStoreId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikeByStoreId = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorByOwnerId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorByOwnerId.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikesByOwner = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorByOwnerId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorId.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbike = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createMotorbike.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createMotorbike.fulfilled, (state, action) => {
            state.loading = false;
            // state.motorbike = action.payload;
            state.error = null;
        });
        builder.addCase(createMotorbike.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateMotorStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMotorStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbike = action.payload;
            state.error = null;
        });
        builder.addCase(updateMotorStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { clearMotor } = motorbikeSlice.actions;
export default motorbikeSlice.reducer;
