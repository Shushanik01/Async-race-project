import { API_BASE_URL, CARS_PER_PAGE } from '../Utils/constants.ts';

export const getCars = async (page: number = 1, limit: number = CARS_PER_PAGE) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/garage?_page=${page}&_limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    
    const data = await response.json();
    const totalCount = response.headers.get('X-Total-Count');
    
    return {
      data,
      totalCount: parseInt(totalCount || '0') || 0,
    };
  } catch (error: any) {
    throw new Error(`Error fetching cars: ${error.message}`);
  }
};

export const getCar = async (id: string | number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${id}`);
    
    if (!response.ok) {
      throw new Error('Car not found');
    }
    
    return await response.json();
  } catch (error: any) {
    throw new Error(`Error fetching car: ${error.message}`);
  }
};

export const createCar = async (carData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create car');
    }
    
    return await response.json();
  } catch (error: any) {
    throw new Error(`Error creating car: ${error.message}`);
  }
};

export const updateCar = async (id: string | number, carData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update car');
    }
    
    return await response.json();
  } catch (error: any) {
    throw new Error(`Error updating car: ${error.message}`);
  }
};

export const deleteCar = async (id: string | number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete car');
    }
    
    return { success: true };
  } catch (error: any) {
    throw new Error(`Error deleting car: ${error.message}`);
  }
};