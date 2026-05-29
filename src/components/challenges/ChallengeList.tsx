import React from 'react';
import { ChallengeCard } from './ChallengeCard';
import { type ChallengeItem } from '../../types';

interface ChallengeListProps {
    challenges: ChallengeItem[];
    currentUserId: string;
    onRespond: (challengeId: string, aceptar: 'aceptado' | 'rechazado') => void;
    onComplete: (challengeId: string, ganadorId: string) => void;
    actionLoadingId: string | null;
}

export const ChallengeList: React.FC<ChallengeListProps> = ({
    challenges,
    currentUserId,
    onRespond,
    onComplete,
    actionLoadingId
}) => {
    if (challenges.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-race-card/40">
                <p className="text-sm text-zinc-500">No registras actividad ni desafíos en tu bitácora de piloto.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
                <ChallengeCard
                    key={challenge.props.id}
                    challenge={challenge}
                    currentUserId={currentUserId}
                    onRespond={onRespond}
                    onComplete={onComplete}
                    actionLoadingId={actionLoadingId}
                />
            ))}
        </div>
    );
};