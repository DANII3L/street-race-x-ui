import React, { useState } from 'react';

export interface FilterField {
    key: string;
    placeholder: string;
    type?: 'text' | 'number';
}

interface SearchFiltersProps {
    fields: FilterField[];
    onSearch: (filters: Record<string, string>) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ fields, onSearch }) => {
    const [internalFilters, setInternalFilters] = useState<Record<string, string>>(() => {
        return fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {});
    });

    const handleInputChange = (key: string, value: string) => {
        setInternalFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(internalFilters);
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {fields.map((field) => (
                <input
                    key={field.key}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={internalFilters[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs text-white focus:border-race-accent focus:outline-none w-full sm:w-64"
                />
            ))}
            <button
                type="submit"
                className="w-full sm:w-auto rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
                Volver a buscar
            </button>
        </form>
    );
};