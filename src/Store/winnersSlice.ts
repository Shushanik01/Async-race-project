import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWinners, saveWinner, deleteWinner } from '../Api/winnerApiService.ts';

interface Winner {
  id: number;
  wins: number;
  time: number;
}

interface FetchWinnersParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

interface AddWinnerParams {
  carId: number;
  raceTime: number;
}

interface WinnersState {
  winners: Winner[];
  totalCount: number;
  currentPage: number;
  sortBy: string;
  sortOrder: string;
  loading: boolean;
  error: string | null;
}

const WINNERS_PER_PAGE = 10;
const SORT_OPTIONS = {
  ID: 'id',
  WINS: 'wins', 
  TIME: 'time'
};
const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC'
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async ({ page = 1, limit = WINNERS_PER_PAGE, sort = SORT_OPTIONS.ID, order = SORT_ORDER.ASC }: FetchWinnersParams) => {
    const response = await getWinners(page, limit, sort, order);
    return response;
  }
);

export const addWinner = createAsyncThunk(
  'winners/addWinner',
  async ({ carId, raceTime }: AddWinnerParams) => {
    const response = await saveWinner(carId, raceTime);
    return response;
  }
);

export const removeWinner = createAsyncThunk(
  'winners/removeWinner',
  async (winnerId: number) => {
    await deleteWinner(winnerId);
    return winnerId;
  }
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState: {
    winners: [],
    totalCount: 0,
    currentPage: 1,
    sortBy: SORT_OPTIONS.ID,
    sortOrder: SORT_ORDER.ASC,
    loading: false,
    error: null,
  } as WinnersState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSorting: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchWinners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      
      .addCase(addWinner.fulfilled, (state, action) => {
      
        state.error = null;
      })
      .addCase(addWinner.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      
      .addCase(removeWinner.fulfilled, (state, action) => {
        state.winners = state.winners.filter(
          winner => winner.id !== action.payload
        );
        state.totalCount -= 1;
      })
      .addCase(removeWinner.rejected, (state, action) => {
        state.error = action.error.message || null;
      });
  },
});

export const { setCurrentPage, setSorting, clearError } = winnersSlice.actions;
export default winnersSlice.reducer;