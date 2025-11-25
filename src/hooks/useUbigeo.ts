/**
 * useUbigeo Hook
 * Custom hook for cascading UBIGEO selection (Department → Province → District)
 */

import { useState, useCallback, useMemo } from 'react';
import {
    departments,
    getProvincesByDepartment,
    getDistrictsByProvince,
    getDepartmentById,
    getProvinceById,
    getDistrictById,
} from '../data/ubigeo';
import type { Department, Province, District } from '../data/ubigeo';

export interface UbigeoState {
    selectedDeptId: string;
    selectedProvId: string;
    selectedDistId: string;
    selectedDeptName: string;
    selectedProvName: string;
    selectedDistName: string;
}

export interface UseUbigeoReturn {
    // State
    state: UbigeoState;

    // Available options for selects
    departments: Department[];
    availableProvinces: Province[];
    availableDistricts: District[];

    // Handlers
    onDeptChange: (deptId: string) => void;
    onProvChange: (provId: string) => void;
    onDistChange: (distId: string) => void;

    // Utility
    reset: () => void;
    isProvinceDisabled: boolean;
    isDistrictDisabled: boolean;
}

const initialState: UbigeoState = {
    selectedDeptId: '',
    selectedProvId: '',
    selectedDistId: '',
    selectedDeptName: '',
    selectedProvName: '',
    selectedDistName: '',
};

export const useUbigeo = (): UseUbigeoReturn => {
    const [state, setState] = useState<UbigeoState>(initialState);

    // Memoized available provinces based on selected department
    const availableProvinces = useMemo(() => {
        if (!state.selectedDeptId) return [];
        return getProvincesByDepartment(state.selectedDeptId);
    }, [state.selectedDeptId]);

    // Memoized available districts based on selected province
    const availableDistricts = useMemo(() => {
        if (!state.selectedProvId) return [];
        return getDistrictsByProvince(state.selectedProvId);
    }, [state.selectedProvId]);

    // Handler: Department selection
    const onDeptChange = useCallback((deptId: string) => {
        const dept = getDepartmentById(deptId);
        setState({
            selectedDeptId: deptId,
            selectedProvId: '',
            selectedDistId: '',
            selectedDeptName: dept?.name || '',
            selectedProvName: '',
            selectedDistName: '',
        });
    }, []);

    // Handler: Province selection
    const onProvChange = useCallback((provId: string) => {
        const prov = getProvinceById(provId);
        setState(prev => ({
            ...prev,
            selectedProvId: provId,
            selectedDistId: '',
            selectedProvName: prov?.name || '',
            selectedDistName: '',
        }));
    }, []);

    // Handler: District selection
    const onDistChange = useCallback((distId: string) => {
        const dist = getDistrictById(distId);
        setState(prev => ({
            ...prev,
            selectedDistId: distId,
            selectedDistName: dist?.name || '',
        }));
    }, []);

    // Reset all selections
    const reset = useCallback(() => {
        setState(initialState);
    }, []);

    return {
        state,
        departments,
        availableProvinces,
        availableDistricts,
        onDeptChange,
        onProvChange,
        onDistChange,
        reset,
        isProvinceDisabled: !state.selectedDeptId,
        isDistrictDisabled: !state.selectedProvId,
    };
};
