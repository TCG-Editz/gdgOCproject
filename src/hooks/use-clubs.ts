"use client";

import { useState, useEffect, useCallback } from 'react';
import { initialClubs, type Club } from '../lib/data';

const CLUBS_STORAGE_KEY = 'oncampus-clubs';
const CLUBS_VERSION_KEY = 'oncampus-clubs-version';

// Simple checksum function to detect data changes
const generateChecksum = (data: any) => JSON.stringify(data).length;

export const useClubs = () => {
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedClubs = localStorage.getItem(CLUBS_STORAGE_KEY);
      const storedVersion = localStorage.getItem(CLUBS_VERSION_KEY);

      const newVersion = String(generateChecksum(initialClubs));

      // If version changed or no stored clubs → refresh with new data
      if (!storedClubs || storedVersion !== newVersion) {
        localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(initialClubs));
        localStorage.setItem(CLUBS_VERSION_KEY, newVersion);
        setClubs(initialClubs);
      } else {
        setClubs(JSON.parse(storedClubs));
      }
    } catch (error) {
      console.error("Failed to load clubs from localStorage", error);
      setClubs(initialClubs);
    }
    setIsInitialized(true);
  }, []);

  const addClub = useCallback(
    (newClubData: Omit<Club, 'id' | 'imageId'> & { imageId?: string }) => {
      if (!isInitialized) return;

      setClubs(prevClubs => {
        const newClub: Club = {
          ...newClubData,
          id: new Date().toISOString(),
          imageId: newClubData.imageId || `club-${Math.floor(Math.random() * 5) + 1}`,
        };
        const updatedClubs = [...prevClubs, newClub];
        localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(updatedClubs));
        return updatedClubs;
      });
    },
    [isInitialized]
  );

  const removeClub = useCallback(
    (clubId: string) => {
      if (!isInitialized) return;

      setClubs(prevClubs => {
        const updatedClubs = prevClubs.filter(c => c.id !== clubId);
        localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(updatedClubs));
        return updatedClubs;
      });
    },
    [isInitialized]
  );

  const safeClubs = isInitialized ? clubs : [];

  return { clubs: safeClubs, addClub, removeClub, isInitialized };
};
