import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { useAuthStore } from '../context/authStore';

export const LoginPage = () => {
    const navigate = useNavigate();
    const setSession = useAuthStore((state) => state.setSession);
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [estadoGeo, setEstadoGeo] = useState('');
    const [pais, setPais] = useState('');

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            if (isLogin) {
                const res = await AuthService.login(email, password);

                if (res.ok) {
                    setSession(res.user, res.token);
                    navigate('/dashboard');
                } else {
                    setError('No se pudo iniciar sesión. Verifica los datos.');
                }
            } else {
                const payload = {
                    username,
                    email,
                    password,
                    foto_perfil: "",
                    zona_localidad: localidad,
                    zona_ciudad: ciudad,
                    zona_estado: estadoGeo,
                    zona_pais: pais
                };

                const res = await AuthService.register(payload);

                if (res.ok) {
                    setSuccessMessage(`${res.message}. Por favor ingresa tus credenciales.`);
                    setUsername('');
                    setLocalidad('');
                    setCiudad('');
                    setEstadoGeo('');
                    setPais('');
                    setIsLogin(true);
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-race-dark px-4">
            <div className="w-full max-w-md space-y-6 rounded-xl bg-race-card p-8 border border-zinc-850">
                <div className="text-center">
                    <h1 className="text-3xl font-black tracking-wider text-race-accent">STREET RACE X</h1>
                    <p className="mt-1 text-xs text-zinc-400 font-medium">Gestión Profesional de Competidores</p>
                </div>

                <div className="flex border-b border-zinc-800 text-sm font-bold uppercase tracking-wider">
                    <button
                        type="button"
                        onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}
                        className={`w-1/2 pb-2 cursor-pointer ${isLogin ? 'text-race-accent border-b-2 border-race-accent' : 'text-zinc-500'}`}
                    >
                        Ingresar
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}
                        className={`w-1/2 pb-2 cursor-pointer ${!isLogin ? 'text-race-accent border-b-2 border-race-accent' : 'text-zinc-500'}`}
                    >
                        Registrarse
                    </button>
                </div>
                {error && <div className="rounded bg-red-500/10 p-3 text-xs text-red-500 border border-red-500/20">{error}</div>}
                {successMessage && <div className="rounded bg-green-500/10 p-3 text-xs text-green-500 border border-green-500/20">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-sm text-white focus:border-race-accent focus:outline-none" required />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-sm text-white focus:border-race-accent focus:outline-none" required />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-sm text-white focus:border-race-accent focus:outline-none" required />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Localidad</label>
                                    <input type="text" value={localidad} onChange={(e) => setLocalidad(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-sm text-white focus:border-race-accent focus:outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ciudad</label>
                                    <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-sm text-white focus:border-race-accent focus:outline-none" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Estado / Dpto</label>
                                    <input type="text" value={estadoGeo} onChange={(e) => setEstadoGeo(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-sm text-white focus:border-race-accent focus:outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">País</label>
                                    <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 p-3 text-sm text-white focus:border-race-accent focus:outline-none" required />
                                </div>
                            </div>
                        </>
                    )}

                    <button type="submit" disabled={loading} className="w-full rounded bg-race-accent p-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-red-700 disabled:opacity-50 cursor-pointer">
                        {loading ? 'Cargando...' : isLogin ? 'Entrar al Paddock' : 'Registrar Piloto'}
                    </button>
                </form>
            </div>
        </div>
    );
};