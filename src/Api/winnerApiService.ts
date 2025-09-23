import { API_BASE_URL } from "../Utils/constants.ts";

interface Winner {
    id: number;
    wins: number;
    time: number;
}

interface WinnersResponse {
    data: Winner[];
    totalCount: number;
}

export const getWinners = async (page: number = 1, limit: number = 10, sort: string = 'id', order: string = 'ASC'): Promise<WinnersResponse> => {
    try {
        const params = new URLSearchParams({
            _page: page.toString(),
            _limit: limit.toString(),
            _sort: sort,
            _order: order
        });
        
        const response = await fetch(`${API_BASE_URL}/winners?${params}`);
        if (!response.ok) return { data: [], totalCount: 0 };
        
        const data = await response.json();
        const totalCount = response.headers.get('X-Total-Count') || data.length;
        
        return { data, totalCount: parseInt(totalCount.toString()) };
    } catch (error) {
        console.error('Error fetching winners:', error);
        return { data: [], totalCount: 0 };
    }
};

export const saveWinner = async (carId: number, raceTimeInSeconds: number): Promise<Winner | null> => {
    try {
      
        const existingResponse = await fetch(`${API_BASE_URL}/winners/${carId}`);
        
        if (existingResponse.ok) {
           
            const existing = await existingResponse.json();
            const response = await fetch(`${API_BASE_URL}/winners/${carId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    wins: existing.wins + 1,
                    time: Math.min(existing.time, raceTimeInSeconds)
                })
            });
            return response.ok ? await response.json() : null;
        } else {
            
            const response = await fetch(`${API_BASE_URL}/winners`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: carId,
                    wins: 1,
                    time: raceTimeInSeconds
                })
            });
            return response.ok ? await response.json() : null;
        }
    } catch (error) {
        console.error('Error saving winner:', error);
        return null;
    }
};

export const deleteWinner = async (carId: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/winners/${carId}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting winner:', error);
        return false;
    }
};