/**
 * UBIGEO Data - Normalized Peruvian Locations
 * Departamentos, Provincias y Distritos del Perú
 */

import departamentosData from './departamentos.json';
import provinciasData from './provincias.json';
import distritosData from './distritos.json';

export interface Department {
    id: string;
    name: string;
}

export interface Province {
    id: string;
    name: string;
    department_id: string;
}

export interface District {
    id: string;
    name: string;
    province_id: string;
    department_id: string;
}

// Type-safe data exports
export const departments: Department[] = departamentosData as Department[];
export const provinces: Province[] = provinciasData as Province[];
export const districts: District[] = distritosData as District[];

/**
 * Helper functions for cascading selects
 */

export const getProvincesByDepartment = (departmentId: string): Province[] => {
    return provinces.filter(p => p.department_id === departmentId);
};

export const getDistrictsByProvince = (provinceId: string): District[] => {
    return districts.filter(d => d.province_id === provinceId);
};

export const getDepartmentById = (id: string): Department | undefined => {
    return departments.find(d => d.id === id);
};

export const getProvinceById = (id: string): Province | undefined => {
    return provinces.find(p => p.id === id);
};

export const getDistrictById = (id: string): District | undefined => {
    return districts.find(d => d.id === id);
};
