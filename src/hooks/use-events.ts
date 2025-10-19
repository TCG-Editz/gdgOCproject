"use client";

import { useState, useEffect, useCallback } from 'react';
import { initialEvents, type CampusEvent } from '../lib/data';

const EVENTS_STORAGE_KEY = 'oncampus-events';
const EVENTS_VERSION_KEY = 'oncampus-events-version';

// simple checksum based on JSON length
const generateChecksum = (data: any) => JSON.stringify(data).length;

export const useEvents = () => {
    const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
            const storedVersion = localStorage.getItem(EVENTS_VERSION_KEY);
            const newVersion = String(generateChecksum(initialEvents));

            // if no events stored OR version changed → reload from defaults
            if (!storedEvents || storedVersion !== newVersion) {
                localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(initialEvents));
                localStorage.setItem(EVENTS_VERSION_KEY, newVersion);
                setEvents(initialEvents);
            } else {
                setEvents(JSON.parse(storedEvents));
            }
        } catch (error) {
            console.error("Failed to access or parse events from localStorage", error);
            setEvents(initialEvents);
        }
        setIsInitialized(true);
    }, []);

    const addEvent = useCallback((newEventData: Omit<CampusEvent, 'id'>) => {
        if (!isInitialized) return;

        setEvents(prevEvents => {
            const newEvent: CampusEvent = {
                ...newEventData,
                id: new Date().toISOString(),
                imageId: newEventData.imageId || `event-${Math.floor(Math.random() * 3) + 1}`,
            };
            const updatedEvents = [...prevEvents, newEvent];
            localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
            return updatedEvents;
        });
    }, [isInitialized]);
    
    const removeEvent = useCallback((eventId: string) => {
        if (!isInitialized) return;

        setEvents(prevEvents => {
            const updatedEvents = prevEvents.filter(e => e.id !== eventId);
            localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
            return updatedEvents;
        });
    }, [isInitialized]);

    const safeEvents = isInitialized ? events : [];

    return { events: safeEvents, addEvent, removeEvent, isInitialized };
};
