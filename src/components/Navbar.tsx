import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="border-b border-zinc-800 bg-race-card px-6 py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-race-card/95">
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <span className="text-2xl font-black tracking-wider text-race-accent">STREET RACE X</span>
                </div>

                <nav className="hidden md:flex items-center space-x-1 text-sm font-bold uppercase tracking-wider">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className={`px-4 py-2 rounded transition border-b-2 cursor-pointer ${isActive('/dashboard')
                            ? 'border-race-accent text-white bg-zinc-800/50'
                            : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                            }`}
                    >
                        Paddock
                    </button>
                    <button
                        onClick={() => navigate('/challenges')}
                        className={`px-4 py-2 rounded transition border-b-2 cursor-pointer ${isActive('/challenges')
                            ? 'border-race-accent text-white bg-zinc-800/50'
                            : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                            }`}
                    >
                        Mis Retos
                    </button>
                    <button
                        onClick={() => navigate('/vehicles')}
                        className={`px-4 py-2 rounded transition border-b-2 cursor-pointer ${isActive('/vehicles')
                            ? 'border-race-accent text-white bg-zinc-800/50'
                            : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                            }`}
                    >
                        Mi Garaje
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className={`px-4 py-2 rounded transition border-b-2 cursor-pointer ${isActive('/profile')
                            ? 'border-race-accent text-white bg-zinc-800/50'
                            : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
                            }`}
                    >
                        Mi Perfil
                    </button>
                </nav>
            </div>

            <div className="flex items-center space-x-5">
                <div className="flex md:hidden space-x-1">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className={`p-2 text-xs font-bold uppercase rounded ${isActive('/dashboard') ? 'bg-race-accent text-white' : 'text-zinc-400'}`}
                        title="Paddock"
                    >
                        🏁
                    </button>
                    <button
                        onClick={() => navigate('/challenges')}
                        className={`p-2 text-xs font-bold uppercase rounded ${isActive('/challenges') ? 'bg-race-accent text-white' : 'text-zinc-400'}`}
                        title="Mis Retos"
                    >
                        ⚔️
                    </button>
                    <button
                        onClick={() => navigate('/vehicles')}
                        className={`p-2 text-xs font-bold uppercase rounded ${isActive('/vehicles') ? 'bg-race-accent text-white' : 'text-zinc-400'}`}
                        title="Mi Garaje"
                    >
                        🚗
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className={`p-2 text-xs font-bold uppercase rounded ${isActive('/profile') ? 'bg-race-accent text-white' : 'text-zinc-400'}`}
                        title="Mi Perfil"
                    >
                        👤
                    </button>
                </div>

                <div className="text-right hidden sm:block cursor-pointer" onClick={() => navigate('/profile')}>
                    <p className="text-sm font-bold text-zinc-200 hover:text-white transition">{user?.username}</p>
                    <p className="text-[10px] text-race-accent font-black uppercase tracking-widest">RANGO {user?.rango || 'D'}</p>
                </div>

                <button
                    onClick={logout}
                    className="rounded border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 hover:text-white transition cursor-pointer text-zinc-300"
                >
                    Salir
                </button>
            </div>
        </header>
    );
};