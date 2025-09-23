import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getCars, createCar, updateCar, deleteCar } from '../Api/garageApi';
import { CARS_PER_PAGE } from '../Utils/constants.ts';
import { getCars, getCar, createCar, updateCar, deleteCar } from '../Api/garageApi.ts';

interface Car {
  id: number;
  name: string;
  color: string;
}

interface CarData {
  name: string;
  color: string;
}

interface FetchCarsParams {
  page?: number;
  limit?: number;
}

interface EditCarParams {
  id: number;
  carData: CarData;
}

interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  selectedCarId: number | null;
  loading: boolean;
  error: string | null;
  generatingCars: boolean;
}

export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async ({ page = 1, limit = CARS_PER_PAGE }: FetchCarsParams) => {
    const response = await getCars(page, limit);
    return response;
  }
);

export const addCar = createAsyncThunk(
  'garage/addCar',
  async (carData: CarData) => {
    const response = await createCar(carData);
    return response;
  }
);

export const editCar = createAsyncThunk(
  'garage/editCar',
  async ({ id, carData }: EditCarParams) => {
    const response = await updateCar(id, carData);
    return response;
  }
);

export const removeCar = createAsyncThunk(
  'garage/removeCar',
  async (carId: number) => {
    await deleteCar(carId);
    return carId;
  }
);

export const generateRandomCars = createAsyncThunk(
  'garage/generateRandomCars',
  async (carsData: CarData[], { dispatch }) => {
    const promises = carsData.map(carData => createCar(carData));
    const results = await Promise.allSettled(promises);
    
    const successfulCars = results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<any>).value);
    
    dispatch(fetchCars({ page: 1 }));
    
    return {
      created: successfulCars.length,
      total: carsData.length,
    };
  }
);

const garageSlice = createSlice({
  name: 'garage',
  initialState: {
    cars: [],
    totalCount: 0,
    currentPage: 1,
    selectedCarId: null,
    loading: false,
    error: null,
    generatingCars: false,
  } as GarageState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    
    setSelectedCar: (state, action) => {
      state.selectedCarId = action.payload;
    },
    
    clearSelectedCar: (state) => {
      state.selectedCarId = null;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      
      .addCase(addCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(addCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      
      .addCase(editCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCar.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cars.findIndex(car => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
        state.selectedCarId = null;
      })
      .addCase(editCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      
      .addCase(removeCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter(car => car.id !== action.payload);
        state.totalCount -= 1;
        
        if (state.selectedCarId === action.payload) {
          state.selectedCarId = null;
        }
      })
      .addCase(removeCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      
      .addCase(generateRandomCars.pending, (state) => {
        state.generatingCars = true;
        state.error = null;
      })
      .addCase(generateRandomCars.fulfilled, (state, action) => {
        state.generatingCars = false;
        
      })
      .addCase(generateRandomCars.rejected, (state, action) => {
        state.generatingCars = false;
        state.error = action.error.message || null;
      });
  },
});

export const {setCurrentPage, setSelectedCar, clearSelectedCar,clearError,} = garageSlice.actions;

export default garageSlice.reducer;