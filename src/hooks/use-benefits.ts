"use client";

import { useState, useEffect, useCallback } from 'react';
import { initialBenefits, type Benefit } from '../lib/data';

const BENEFITS_STORAGE_KEY = 'oncampus-benefits';
const BENEFITS_VERSION_KEY = 'oncampus-benefits-version';

// Simple checksum based on JSON length
const generateChecksum = (data: any) => JSON.stringify(data).length;

export const useBenefits = () => {
    const [benefits, setBenefits] = useState<Benefit[]>(initialBenefits);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedBenefits = localStorage.getItem(BENEFITS_STORAGE_KEY);
            const storedVersion = localStorage.getItem(BENEFITS_VERSION_KEY);
            const newVersion = String(generateChecksum(initialBenefits));

            // If no benefits stored OR version changed → reload from defaults
            if (!storedBenefits || storedVersion !== newVersion) {
                localStorage.setItem(BENEFITS_STORAGE_KEY, JSON.stringify(initialBenefits));
                localStorage.setItem(BENEFITS_VERSION_KEY, newVersion);
                setBenefits(initialBenefits);
            } else {
                setBenefits(JSON.parse(storedBenefits));
            }
        } catch (error) {
            console.error("Failed to access or parse benefits from localStorage", error);
            setBenefits(initialBenefits);
        }
        setIsInitialized(true);
    }, []);

    const addBenefit = useCallback((newBenefitData: Omit<Benefit, 'id' | 'imageId'> & { imageId?: string, redirectUrl?: string }) => {
        if (!isInitialized) return;

        setBenefits(prevBenefits => {
            const newBenefit: Benefit = {
                ...newBenefitData,
                id: new Date().toISOString(),
                imageId: newBenefitData.imageId || `benefit-${Math.floor(Math.random() * 5) + 1}`,
                redirectUrl: newBenefitData.redirectUrl,
            };
            const updatedBenefits = [...prevBenefits, newBenefit];
            localStorage.setItem(BENEFITS_STORAGE_KEY, JSON.stringify(updatedBenefits));
            return updatedBenefits;
        });
    }, [isInitialized]);

    const removeBenefit = useCallback((benefitId: string) => {
        if (!isInitialized) return;

        setBenefits(prevBenefits => {
            const updatedBenefits = prevBenefits.filter(b => b.id !== benefitId);
            localStorage.setItem(BENEFITS_STORAGE_KEY, JSON.stringify(updatedBenefits));
            return updatedBenefits;
        });
    }, [isInitialized]);

    const safeBenefits = isInitialized ? benefits : [];

    return { benefits: safeBenefits, addBenefit, removeBenefit, isInitialized };
};
